package main

import (
	"pizza-billing/config"
	"pizza-billing/routes"
)

func main() {
	config.ConnectDB()
	r := routes.SetupRoutes()
	r.Run(":8080")
}
