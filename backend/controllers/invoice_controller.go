package controllers

import (
	"net/http"
	"pizza-billing/config"
	"pizza-billing/models"

	"github.com/gin-gonic/gin"
)

func CreateInvoice(c *gin.Context) {
	var invoice models.Invoice
	if err := c.ShouldBindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	tx := config.DB.MustBegin()

	err := tx.QueryRow(
		"INSERT INTO invoices (customer_name, tax, total) VALUES ($1, $2, $3) RETURNING id, created_at",
		invoice.CustomerName, invoice.Tax, invoice.Total,
	).Scan(&invoice.ID, &invoice.CreatedAt)
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create invoice"})
		return
	}

	for i := range invoice.Items {
		err := tx.QueryRow(`
			INSERT INTO invoice_items (invoice_id, item_id, quantity, price, subtotal)
			VALUES ($1, $2, $3, $4, $5) RETURNING id`,
			invoice.ID, invoice.Items[i].ItemID, invoice.Items[i].Quantity,
			invoice.Items[i].Price, invoice.Items[i].Subtotal,
		).Scan(&invoice.Items[i].ID)

		if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert invoice items"})
			return
		}
	}

	err = tx.Commit()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusCreated, invoice)
}

func GetInvoices(c *gin.Context) {
	var invoices []models.Invoice

	err := config.DB.Select(&invoices, "SELECT * FROM invoices")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch invoices"})
		return
	}

	for i, invoice := range invoices {
		var items []models.InvoiceItem
		err := config.DB.Select(&items, "SELECT * FROM invoice_items WHERE invoice_id = $1", invoice.ID)
		if err != nil {
			continue
		}
		invoices[i].Items = items
	}

	c.JSON(http.StatusOK, invoices)
}
