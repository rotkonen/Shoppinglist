# Shoppinglist

## Description:

This project originated from my thesis, and I have been working on it continuously since then. The idea is to create a shopping list application using Angular for the frontend and Node.js for the backend. In the future, I plan to integrate APIs from different stores to allow adding a variety of items.

## Features

- User signup and login functionality. (working)
- Add items to your shopping list. (currently under development)
- Remove items from your shopping list. (currently under development)
- Edit existing items on your shopping list. (currently under development)
- Mark items as picked up. (currently under development)
- Responsive design implemented using Angular framework. (currently under development)

# Technologies Used:

## Front-end

- **Angular**: A robust framework for building client applications.

## Back-end

- **MongoDB**: A NoSQL database for storing shopping list items.
- **Express.js**: A minimal and flexible Node.js web application framework.

## Installation

### Prerequisites

- Node.js
- Angular CLI
- MongoDB

### Steps

### Back-end
1. Clone the repository:
    ```bash
    git clone https://github.com/rotkonen/Shoppinglist.git
    ```
2. Navigate to the project directory:
    ```bash
    cd .\Backend\
    ```
3. Install back-end dependencies:
    ```bash
    npm install
    ```
4. Add a env. file with the following:
    ```bash
    Your own DATABASE_URL = "mongodb+srv://<username>:<password>@beyondthebasics.abcde.mongodb.net/test"
    Your own JWT_SECRET = "Your_own_JWT_SECRET"
    Port = 3000
    ```
5. Start the Backend server:
    ```bash
    node server.js
    ```
6. The server will be running at `http://localhost:3000`.

### Front-end
1. Navigate to the Angular project directory:
    ```bash
    cd .\ShoppingListApp
    ```
3. Install front-end dependencies:
    ```bash
    npm install
    ```
4. Start the Angular development server:
    ```bash
    ng serve
    ```
5. The app will be running at `http://localhost:4200`.