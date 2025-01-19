# Pincode Search App

This is a simple web application to search Indian post/pincode locations by code or name. It includes a backend built with Node.js, MySQL, and a frontend built using HTML, Bootstrap, and JavaScript.

## Features
- Search pincode locations by code or name.
- Save favourite pincode locations to a database.
- View saved favourites in the "Favourites" page.

## Technologies Used
- **Backend:**
  - Node.js
  - MySQL (or MariaDB)
  - Express.js
  - Axios
- **Frontend:**
  - HTML
  - Bootstrap 5
  - Vanilla JavaScript
- **Database:**
  - MySQL

## Getting Started

### 1. Clone the repository

Clone the repository to your local machine
## cd backend
npm install

Create a new MySQL database. You can name it pincode_db:
1. ```sh CREATE DATABASE pincode_db;```
2. ```sh USE pincode_db;```
3. ```sh
   CREATE TABLE favourites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      branchType VARCHAR(255),
      deliveryStatus VARCHAR(255),
      district VARCHAR(255),
      region VARCHAR(255),
      state VARCHAR(255)
  );
```
4. Open the backend/index.js file and configure your MySQL credentials
5. npm start

## cd frontend
simply go live
