#!/usr/bin/env node
/**
 * Node.js Accounting Application
 * Migrated from COBOL legacy code
 * Preserves business logic, data integrity, and menu options
 */
const readline = require('readline');
const fs = require('fs');
const DATA_FILE = 'accounts.json';

// Load or initialize account data
let accounts = {};
if (fs.existsSync(DATA_FILE)) {
  accounts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
} else {
  accounts = { id: '001', balance: 1000.00, audit: [] };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      viewBalance();
      break;
    case '2':
      creditAccount();
      break;
    case '3':
      debitAccount();
      break;
    case '4':
      exitApp();
      break;
    default:
      console.log('Invalid choice. Try again.');
      showMenu();
  }
}

function viewBalance() {
  console.log(`Current balance: ${accounts.balance.toFixed(2)}`);
  showMenu();
}

function creditAccount() {
  rl.question('Enter amount to credit: ', (amt) => {
    const amount = parseFloat(amt);
    if (isNaN(amount) || amount <= 0) {
      console.log('Error: invalid amount');
      showMenu();
      return;
    }
    accounts.balance += amount;
    logAudit('credit', amount);
    saveData();
    console.log('Account credited successfully.');
    showMenu();
  });
}

function debitAccount() {
  rl.question('Enter amount to debit: ', (amt) => {
    const amount = parseFloat(amt);
    if (isNaN(amount) || amount <= 0) {
      console.log('Error: invalid amount');
      showMenu();
      return;
    }
    if (amount > accounts.balance) {
      console.log('Error: cannot debit more than balance');
      showMenu();
      return;
    }
    accounts.balance -= amount;
    logAudit('debit', amount);
    saveData();
    console.log('Account debited successfully.');
    showMenu();
  });
}

function logAudit(type, amount) {
  accounts.audit.push({ type, amount, date: new Date().toISOString() });
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(accounts, null, 2));
}

function exitApp() {
  rl.close();
  console.log('Application terminated.');
}

showMenu();
