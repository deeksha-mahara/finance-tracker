const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const list = document.getElementById('transactions');
const form = document.getElementById('transactionForm');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const category = document.getElementById('category');
const date = document.getElementById('date');

// Set today's date by default
date.valueAsDate = new Date();

// 1. Get Transactions from LocalStorage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Chart Instance
let myChart;

// 2. Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please fill in all fields');
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: type.value === 'income' ? +amount.value : -Math.abs(amount.value),
    category: category.value,
    date: date.value,
    type: type.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();
  updateChart();

  text.value = '';
  amount.value = '';
}

// 3. Generate ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// 4. Add Transaction to DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    <div class="info">
      <span class="fw-bold">${transaction.text}</span>
      <small style="display:block; color:#aaa; font-size:0.8rem">${transaction.date} | ${transaction.category}</small>
    </div>
    <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">×</button>
  `;

  list.appendChild(item);
}

// 5. Update Balance, Income, Expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  balanceEl.innerText = `₹${total}`;
  incomeEl.innerText = `+₹${income}`;
  expenseEl.innerText = `-₹${expense}`;
}

// 6. Remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

// 7. Update Local Storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 8. Update Chart (Visual Analytics)
function updateChart() {
  const ctx = document.getElementById('financeChart').getContext('2d');
  
  // Group expenses by category
  const categories = {};
  transactions.forEach(t => {
    if (t.type === 'expense') {
      categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount);
    }
  });

  const labels = Object.keys(categories);
  const data = Object.values(categories);

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Expenses',
        data: data,
        backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#2ecc71', '#95a5a6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: 'white' } }
      }
    }
  });
}

// 9. Export to CSV (Pro Feature)
document.getElementById('exportBtn').addEventListener('click', () => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Date,Description,Category,Type,Amount\n"
    + transactions.map(e => `${e.date},${e.text},${e.category},${e.type},${e.amount}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "finance_data.csv");
  document.body.appendChild(link);
  link.click();
});

// Init
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateChart();
}

init();
form.addEventListener('submit', addTransaction);