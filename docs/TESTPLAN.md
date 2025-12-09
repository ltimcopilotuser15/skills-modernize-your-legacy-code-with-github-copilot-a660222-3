# Student Account System Test Plan

This test plan covers the business logic implemented in the COBOL student account management application. Use this plan to validate the system with business stakeholders and as a basis for future unit and integration tests in Node.js.

| Test Case ID | Test Case Description                | Pre-conditions                | Test Steps                                                                 | Expected Result                                 | Actual Result | Status (Pass/Fail) | Comments |
|--------------|--------------------------------------|-------------------------------|----------------------------------------------------------------------------|-------------------------------------------------|--------------|--------------------|----------|
| TC01         | View account balance                 | Account exists                | 1. Start app<br>2. Select 'View Balance'                                   | Current balance is displayed                    |              |                    |          |
| TC02         | Credit account with valid amount     | Account exists                | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter valid amount        | Balance increases by credited amount            |              |                    |          |
| TC03         | Debit account with valid amount      | Account exists, sufficient balance | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter valid amount         | Balance decreases by debited amount             |              |                    |          |
| TC04         | Debit account with amount > balance  | Account exists, insufficient balance | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter amount > balance     | Error message: cannot debit more than balance   |              |                    |          |
| TC05         | Credit account with invalid amount   | Account exists                | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter invalid amount      | Error message: invalid amount                   |              |                    |          |
| TC06         | Debit account with invalid amount    | Account exists                | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter invalid amount       | Error message: invalid amount                   |              |                    |          |
| TC07         | Exit application                    | Application running           | 1. Start app<br>2. Select 'Exit'                                            | Application terminates gracefully               |              |                    |          |
| TC08         | Data integrity after operations      | Account exists                | 1. Perform credit/debit<br>2. View balance<br>3. Restart app<br>4. View balance | Balance reflects all previous valid operations  |              |                    |          |
| TC09         | Unique account ID enforcement        | Creating new account          | 1. Attempt to create account with existing ID                               | Error message: account ID must be unique        |              |                    |          |
| TC10         | Audit log for account changes        | Account exists                | 1. Perform credit/debit<br>2. Check audit log                               | All changes are logged                          |              |                    |          |
| TC11         | Authorized operations only           | User not authorized           | 1. Attempt sensitive operation as unauthorized user                         | Error message: operation not permitted          |              |                    |          |

---
Fill in the Actual Result, Status, and Comments after executing each test case.
