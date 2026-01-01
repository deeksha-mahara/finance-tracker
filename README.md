# 💰 Personal Finance Tracker

![Project Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

> A modern, intuitive dashboard to track expenses, manage budgets, and visualize financial habits.


---

## 🌟 Key Features

* **📊 Interactive Dashboard:** Visual breakdown of income vs. expenses using dynamic charts.
* **💸 Transaction Management:** Easily add, edit, and delete transactions.
* **🏷️ Smart Categorization:** Organize spending by category (Food, Rent, Entertainment, etc.).
* **📉 Budget Goals:** Set monthly limits and get visual alerts when approaching them.
* **🌓 Dark/Light Mode:** Aesthetic UI that adapts to system preferences.
* **📱 Responsive Design:** Works seamlessly on desktop and mobile.

---

## 🛠️ Tech Stack

* [Tailwind CSS / SCSS]
*  [Recharts] (for data visualization)
*  [JavaScript]



---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* [Database] instance running (local or cloud)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/finance-tracker.git](https://github.com/your-username/finance-tracker.git)
    cd finance-tracker
    ```

2.  **Install dependencies**
    ```bash
    # For Frontend
    cd client
    npm install

    # For Backend
    cd ../server
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your variables:
    ```env
    PORT=5000
    MONGO_URI=your_database_string
    JWT_SECRET=your_secret_key
    ```

4.  **Run the application**
    ```bash
    # Run both client and server (if using a script like concurrently)
    npm run dev
    ```

---

## 🗺️ Roadmap
- [x] Monthly summary chart
- [ ] **Export Data:** Download reports as CSV/PDF
      
---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
</div>
