# 🍕 Pizza Shop Billing System

A full-stack web application for managing pizza shop items and generating customer invoices, including tax and print-ready receipts.

---

## 📦 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Go (Golang) using Gin
- **Database**: PostgreSQL
- **Architecture**: MVC (Model-View-Controller)

---

## 🚀 Features

### 🧾 Item Management
- Add, edit, delete pizza items, toppings, and beverages
- Categorize items by type

### 🧾 Invoice Management
- Create customer invoices with multiple items
- Auto calculate subtotal, tax , and total
- List past invoices

### 🖨️ Printable Invoice
- Print-friendly layout for customers

---

## 🛠️ Project Structure

pizza-billing-system/
-├── backend/ # Go server code
-├── frontend/ # React client code
-├── db/ # PostgreSQL SQL schema & backup
-├── docs/ # Screenshots, PDFs, diagrams
-└── README.md

## 📂 Backend Setup (Go + PostgreSQL)

### 1. Install Dependencies
```bash
go mod tidy
```
### 2. Environment
```bash
dsn := "host=localhost port=5432 user=postgres password=yourpassword dbname=pizza_billing sslmode=disable"
```
### 3. Run Server
```bash
go run main.go
```
Backend will start on: http://localhost:8080

## 🧾 API Endpoints
| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/items`     | Get all items  |
| POST   | `/items`     | Add new item   |
| PUT    | `/items/:id` | Update item    |
| DELETE | `/items/:id` | Delete item    |
| GET    | `/invoices`  | List invoices  |
| POST   | `/invoices`  | Create invoice |

## 🎨 Frontend Setup (React)

### 1. Navigate to Frontend
```bash
cd frontend
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Run Frontend
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

## 🧰 Database
Create PostgreSQL DB: pizza_billing

Execute SQL from db/schema.sql to create tables

Optional: Use pgAdmin for GUI management

## 📄 Documentation
See /docs folder for:

✅ Database table structure (Excel or PDF)

✅ UI annotated screenshots

✅ ER diagram

## 📚 Author
Developer: Supun Gunawardana

Project: Pizza Shop Billing System – Technical Assessment

## 📃 License
This project is for educational and assessment purposes only.

---

Would you like:
- A `schema.sql` file to match the tables?
- Example `.env` or `.gitignore` setup?
- Frontend README too?

Let me know how far you want to polish this for submission or upload.
