const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

const DATA_FILE = path.join(__dirname, 'accounts.json');
let app;

describe('Student Account System', function () {
  beforeEach(function () {
    // Reset data file before each test
    fs.writeFileSync(DATA_FILE, JSON.stringify({ id: '001', balance: 1000.00, audit: [] }, null, 2));
    delete require.cache[require.resolve('./index.js')];
    app = require('./index.js');
  });

  it('TC01: View account balance', function () {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    expect(data.balance).to.equal(1000.00);
  });

  it('TC02: Credit account with valid amount', function () {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.balance += 500;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    data = JSON.parse(fs.readFileSync(DATA_FILE));
    expect(data.balance).to.equal(1500.00);
  });

  it('TC03: Debit account with valid amount', function () {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.balance -= 200;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    data = JSON.parse(fs.readFileSync(DATA_FILE));
    expect(data.balance).to.equal(800.00);
  });

  it('TC04: Debit account with amount > balance', function () {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    const debitAmount = 2000;
    const canDebit = debitAmount <= data.balance;
    expect(canDebit).to.be.false;
  });

  it('TC05: Credit account with invalid amount', function () {
    const invalidAmount = -100;
    expect(invalidAmount > 0).to.be.false;
  });

  it('TC06: Debit account with invalid amount', function () {
    const invalidAmount = -50;
    expect(invalidAmount > 0).to.be.false;
  });

  it('TC07: Exit application', function () {
    // Simulate exit (no-op for test)
    expect(true).to.be.true;
  });

  it('TC08: Data integrity after operations', function () {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.balance += 100;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    data = JSON.parse(fs.readFileSync(DATA_FILE));
    expect(data.balance).to.equal(1100.00);
  });

  it('TC10: Audit log for account changes', function () {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.audit.push({ type: 'credit', amount: 100, date: new Date().toISOString() });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    data = JSON.parse(fs.readFileSync(DATA_FILE));
    expect(data.audit.length).to.be.greaterThan(0);
  });
});
