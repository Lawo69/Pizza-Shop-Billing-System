package models

type Invoice struct {
	ID           int           `db:"id" json:"id"`
	CustomerName string        `db:"customer_name" json:"customer_name"`
	CreatedAt    string        `db:"created_at" json:"created_at"`
	Tax          float64       `db:"tax" json:"tax"`
	Total        float64       `db:"total" json:"total"`
	Items        []InvoiceItem `json:"items"` // No db tag!
}

type InvoiceItem struct {
	ID        int     `db:"id" json:"id"`
	InvoiceID int     `db:"invoice_id" json:"invoice_id"`
	ItemID    int     `db:"item_id" json:"item_id"`
	Quantity  int     `db:"quantity" json:"quantity"`
	Price     float64 `db:"price" json:"price"`
	Subtotal  float64 `db:"subtotal" json:"subtotal"`
}
