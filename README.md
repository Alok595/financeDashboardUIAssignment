# 💰 CapitalView – Finance Dashboard UI

## 📌 Overview

**CapitalView** is a responsive and interactive **Finance Dashboard UI** built using React.js. It allows users to manage financial data, track spending, and interact with wallet features in a clean and intuitive interface.

This project focuses on **frontend design, component structure, and UI interactions** using mock data.

---

## 🚀 Features

### 🏠 Landing Page

* Introductory page with clean UI
* Entry point into the dashboard

---

### 📊 Dashboard Overview

* Summary cards:

  * Balance
  * Income
  * Expenses
* 📈 Balance over time (line chart)
* 🥧 Spending breakdown (category-based)
* 📌 Additional widgets:

  * Top spending
  * Savings rate
  * Recent activity

---

### 💳 Wallet Module

* View all cards in a visual layout

* Card details:

  * Masked number
  * Network (Visa, Mastercard, RuPay)
  * Balance

* 💸 Actions (UI simulation using modals):

  * Send money
  * Receive money
  * Transfer money
  * Split payments

* 📊 Wallet insights:

  * Budget tracker
  * Spending chart
  * Recent transactions
  * Card summary table

---

### 📄 Transactions Section

* Displays structured transaction table:

  * Date
  * Category
  * Amount
  * Type (Income / Expense)

* Features:

  * 🔍 Search by category
  * Clean tabular UI

---

### 👤 Role-Based UI (UI Only)

* Role switch dropdown available
* Currently:

  * UI is present
  * Functional restrictions are not enforced

> ⚠️ Note: Role-based logic can be extended using conditional rendering based on role state.

---

## 🧠 State Management Approach

* Used **React useState (local state)** instead of Context/Redux
* State is managed at component level and passed via props

### Why this approach?

* Keeps the app simple and easy to understand
* Suitable for small-to-medium scale UI applications
* Avoids unnecessary complexity

---

## 🎨 UI/UX Highlights

* Clean and modern dashboard layout
* Fully responsive design
* Smooth animations using Framer Motion
* Clear visual hierarchy for financial data
* Modular component structure

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Animations:** Framer Motion
* **Data:** Static mock data

---

## 📁 Project Structure

```
src/
│── components/
│   ├── Wallet/
│   │   ├── SendModal.jsx
│   │   ├── TransferModal.jsx
│   │   ├── WalletCardItem.jsx
│   │   ├── WalletCardDetail.jsx
│   │   ├── WalletBudgetItem.jsx
│   │   ├── WalletRecentTransaction.jsx
│   │   ├── WalletSpendingChart.jsx
│   │
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── About.jsx
│
│── pages/
│   ├── LandingPage.jsx
│   ├── DashBoard.jsx
│   ├── Wallet.jsx
│
│── Data/
│   ├── FinanceData.js
│   ├── WalletData.js
│
│── utils/
│   ├── Formatters.js
│
│── App.jsx
│── main.jsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Alok595/financeDashboardUIAssignment.git
cd capitalview
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🧩 Approach

### 1. Component-Based Architecture

* Divided UI into reusable components
* Wallet and Dashboard built as separate modules

---

### 2. Data Handling

* Used static mock data
* Organized data for charts, tables, and cards

---

### 3. Interaction Design

* Used modals for actions (Send, Transfer)
* Clear action buttons for wallet operations

---

### 4. Simplicity First

* Focused on readability and usability
* Avoided over-engineering (no heavy state libraries)




## 📝 Conclusion

This project demonstrates:

* Strong frontend fundamentals
* Clean UI/UX design thinking
* Modular component structure
* Real-world dashboard layout implementation

---

## 🙌 Author

Alok Ranjan
