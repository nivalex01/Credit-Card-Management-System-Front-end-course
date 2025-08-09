# Credit-Card-Management-System-Front-end-course
A client-side web application for managing credit card expenses, tracking transactions, and providing financial insights.   Built as part of the Front-end course course at Ruppin Academic Center.

## 📌 Overview
Our Credit Card Management System allows users to:
- Track and analyze credit card transactions
- View dynamic charts and statistics
- Set financial savings goals
- Receive personalized financial tips

The system is fully implemented using **HTML**, **CSS**, and **JavaScript**, with data stored in `localStorage` and visualized using [Chart.js](https://www.chartjs.org/).

---

## 📂 Features

1. **Home Page**  
   - Introduction to the system and quick navigation to features.

2. **Register Page**  
   - User registration with form validation:  
     - Email format check  
     - Strong password (8 chars, uppercase, lowercase, special char)  
     - Minimum age 16  
     - Valid credit card number (16 digits) and expiry date (MM/YY)

3. **Login Page**  
   - Email & password authentication  
   - Stores logged-in user in `localStorage`

4. **Dashboard**  
   - Personalized greeting with current date & time  
   - Displays:
     - Last transaction
     - Upcoming bill
     - Previous month’s total
     - Next month’s projected total
   - Quick access to “My Payments” page

5. **My Payments Page**  
   - Filter transactions by month and/or card number  
   - View detailed tables  
   - Interactive **Bar**, **Pie**, and **Doughnut** charts

6. **Transactions Upload**  
   - Upload CSV file with transaction data:
     ```
     Date, BusinessName, Category, Amount, cardNumber
     ```

7. **Add New Credit Card**  
   - Add extra cards to user profile  
   - View transactions per card

8. **Financial Tips Page**  
   - Generates personalized saving tips based on current month expenses

9. **Saving Planner**  
   - Set savings goal and track progress visually with Chart.js

10. **Logout**  
    - Clear logged-in user from storage

---

## Installation / Running Locally
```bash
git clone https://github.com/YourUsername/credit-card-management.git
cd credit-card-management
Open HomePage.html in your browser
```


---
## 🛠 Technical Details
- **Storage**: All data is stored in `localStorage`:
  - `listOfUsers` – registered users
  - `loggedInUser` – active sessions
  - `transactions` – transaction objects
  - `savingsData` – savings goal tracking
- **CSV Parsing**: Converts CSV to JSON for storage
- **Charts**: Implemented with Chart.js for statistics visualization
- **Dynamic DOM Updates**: Pages are rendered and updated based on user data

---

## 📸 Screenshots
**HomePage:** 
<img width="2541" height="1256" alt="image" src="https://github.com/user-attachments/assets/55af48c4-8cac-42f6-a55a-38b6c0ba9d00" />

**RegisterPage:**
<img width="1481" height="713" alt="image" src="https://github.com/user-attachments/assets/c60fe8c9-6895-42fe-bf54-4dfd3fd76abe" />

**DashBoardPage:**
<img width="1498" height="677" alt="image" src="https://github.com/user-attachments/assets/d78eb490-a84f-4ffc-902d-fca9247273ca" />

**PaymentsPage:**
<img width="1493" height="740" alt="image" src="https://github.com/user-attachments/assets/05017855-de82-4de0-82fc-8b73aadf39d4" />


---

## 📄 CSV Example
```csv
Date,BusinessName,Category,Amount,cardNumber
2025-02-10,Supermarket,Food,45.90,1234123412341234
2025-02-11,Clothing Store,Clothing,120.00,1234567812345678
