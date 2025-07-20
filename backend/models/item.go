package models

type Item struct {
	ID        int     `db:"id" json:"id"`
	Name      string  `db:"name" json:"name"`
	Type      string  `db:"type" json:"type"`
	Price     float64 `db:"price" json:"price"`
	CreatedAt string  `db:"created_at" json:"created_at"`
}
