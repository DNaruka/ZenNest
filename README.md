# ZenNest

## Overview

ZenNest is a comprehensive property management system designed to streamline operations for property managers and landlords. It provides a centralized hub for managing properties, tenants, leases, and maintenance requests efficiently, simplifying property management tasks, enhancing communication, and improving overall management efficiency.

## Problem

Managing multiple properties can be overwhelming for small to medium-sized property managers and individual landlords. Existing solutions are often expensive or overly complex. ZenNest offers an intuitive and affordable property management system that consolidates essential functionalities in one place.

## User Profile

ZenNest is intended for:

- Property managers
- Landlords
- Real estate professionals managing small to medium-sized property portfolios
- Individual landlords managing a few properties

## Features

- **Dashboard**: Displays key metrics such as properties, tenants, active leases, and maintenance requests.
- **Property Management**: Add, view, and modify property details, including photos, descriptions, and rental rates.
- **Tenant Management**: Add new tenants, view, edit, or remove tenant details.
- **Lease Management**: Maintain and edit lease agreements, track lease dates, and manage rent payments.
- **Maintenance Requests**: Tenants can submit maintenance requests; property managers can track and resolve them.
- **Communication Tools**: Send notifications and updates to tenants directly from the system.
- **Reporting**: Generate reports on occupancy rates, rent collection, and maintenance expenses.

## Tech Stack

### Frontend

- **React.js**: Building the user interface components.
- **Chakra UI**: Modular and accessible component library.
- **React Router**: Managing navigation within the application.
- **Axios**: Making HTTP requests to the backend API.
- **Vite**: Build tool for faster development and bundling.

### Backend

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **JWT (jsonwebtoken)**: For user authentication and authorization.
- **MySQL**: Database management for storing and retrieving application data.
- **Knex.js**: SQL query builder for relational databases.
- **dotenv**: Managing environment variables.

## APIs

No external APIs are needed for basic operations, but integration with email service providers like SendGrid for notifications and payment gateways for rent collection are considered for future enhancements.

## File Structure

### Frontend

- **`src/`**
    - **`App.js`**: Main application component.
    - **`components/`**: Reusable UI components.
    - **`pages/`**: Different pages/routes of the application.
    - **`hooks/`**: Custom React hooks.
- **`public/`**: Contains static assets like HTML files.
- **`vite.config.js`**: Configuration for Vite.
- **`.eslintrc.cjs`**: ESLint configuration for code linting.

### Backend

- **`server.js`**: Main entry point for the Node.js server.
- **`routes/`**: Contains route definitions for various API endpoints.
- **`models/`**: Knex.js models defining the database schema
- **`controllers/`**: Contains business logic for handling requests and responses.
- **`middlewares/`**: Custom middleware functions for authentication and error handling.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. **Clone the repository**:
    
    ```bash
    git clone <https://github.com/DNaruka/ZenNest.git>
    ```
    
2. **Install dependencies**:
    
    ```bash
    cd ZenNest
    npm install
    ```
    
3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add the necessary environment variables (e.g., database connection details, JWT secret).
4. **Run the server**:
    
    ```bash
    npm start
    ```
    

### Running the Frontend

1. **Clone the repository**:
    
    ```bash
    git clone <https://github.com/DNaruka/zennest-ui.git>
    ```
    
2. **Install dependencies**:
    
    ```bash
    cd zennest-ui
    npm install
    ```
    
3. **Run the development server**:
    
    ```bash
    npm run dev
    ```
    

## Future Enhancements

- Integration with email service providers for notifications.
- Payment gateways for rent collection.
- Advanced reporting and analytics features.

## Mockups

Initial mockups are done roughly on paper, further design refinements will be made using Figma.
