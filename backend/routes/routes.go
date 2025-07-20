package routes

import (
	"pizza-billing/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	// Routes
	r.GET("/items", controllers.GetItems)
	r.POST("/items", controllers.CreateItem)
	r.PUT("/items/:id", controllers.UpdateItem)
	r.DELETE("/items/:id", controllers.DeleteItem)

	r.POST("/invoices", controllers.CreateInvoice)
	r.GET("/invoices", controllers.GetInvoices)

	return r
}
