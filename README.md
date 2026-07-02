# MulaFlow Frontend

MulaFlow is a personal expense tracking frontend built with React and Vite. It gives users a simple dashboard for recording expenses, reviewing spending totals, filtering transactions, and configuring spending reminder alerts.

The app is designed to work with a JWT-protected backend API. Users can create an account, sign in, manage expenses, view dashboard insights, and receive reminder-style alerts based on their spending activity.

## Features

- Landing page for MulaFlow with calls to sign in or create an account
- User registration and login
- JWT-based protected routes
- Automatic auth token attachment for protected API calls
- Automatic logout/redirect when protected API calls return unauthorized responses
- Dashboard summary for total expenses, highest expense, and monthly spending
- Recent expense list with chart visualization
- Expense creation form
- Paginated expenses page
- Category filtering and sorting controls
- Expense deletion
- Reminder settings page for enabling spending reminders
- Alerts page for viewing and marking reminders as read
- Responsive app shell with sidebar navigation
- Reusable UI primitives for buttons, cards, inputs, selects, badges, and tables

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Axios
- Recharts
- Lucide React
- Tailwind CSS Vite plugin
- ESLint

## Project Structure

```text
src/
  api/
    authApi.js        # Login and registration requests
    axios.js          # Shared Axios instance and auth interceptors
    expenseApi.js     # Expense CRUD, filters, stats, and pagination
    reminder.js       # Reminder and alert API calls
  components/
    ui/               # Reusable UI components
    expenses/         # Expense-specific components
    DashboardLayout.jsx
    Navbar.jsx
  constants/
    currency.js       # App currency constant
    expenses.js       # Expense category options
  hooks/
    userReminder.js   # Reminder polling hook
  pages/
    LandingPage.jsx
    Login.jsx
    Register.jsx
    Dashboard.jsx
    Expenses.jsx
    AddExpense.jsx
    AddReminder.jsx
    AlertsPage.jsx
  routes/
    ProtectedRoute.jsx
  App.jsx             # App routing
  main.jsx            # React entry point
  index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended
- npm
- A running MulaFlow backend API

### Install Dependencies

```bash
npm install
```

### Configure the Backend API

The shared Axios client is configured in:

```text
src/api/axios.js
```

By default, it points to:

```text
http://localhost:2727/api
```

Update the `baseURL` if your backend runs somewhere else, for example:

```js
const api = axios.create({
  baseURL: "https://your-backend.example.com/api",
});
```

### Start the Development Server

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the app for production into the `dist/` folder.

```bash
npm run preview
```

Serves the production build locally for preview.

```bash
npm run lint
```

Runs ESLint against the project.

## Application Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/dashboard` | Protected | Spending dashboard and quick expense entry |
| `/expenses` | Protected | Paginated expense management |
| `/expenses/new` | Protected | Add a new expense |
| `/reminders/new` | Protected | Configure spending reminder settings |
| `/alerts` | Protected | View reminder alerts |

Protected routes require a `token` value in `localStorage`.

## Backend API Contract

The frontend expects the backend API to expose these endpoints under the configured `baseURL`.

### Auth

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/login` | Authenticate a user |
| `POST` | `/auth/register` | Create a user account |

The login response should include a token:

```json
{
  "token": "jwt-token",
  "name": "User Name",
  "email": "user@example.com"
}
```

### Expenses

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/expenses` | Get expenses |
| `POST` | `/expenses` | Create an expense |
| `PUT` | `/expenses/{id}` | Update an expense |
| `DELETE` | `/expenses/{id}` | Delete an expense |
| `GET` | `/expenses/category/{category}` | Get expenses by category |
| `GET` | `/expenses/above/{amount}` | Get expenses above an amount |
| `GET` | `/expenses/range?start=&end=` | Get expenses by date range |
| `GET` | `/expenses/total` | Get total expense amount |
| `GET` | `/expenses/highest` | Get highest expense |
| `GET` | `/expenses/monthly?month=&year=` | Get monthly total |
| `GET` | `/expenses/page?page=&size=&sort=` | Get paginated expenses |

### Reminders and Alerts

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/reminders/settings?enabled=&intervalMinutes=` | Save reminder settings |
| `GET` | `/reminders` | Get all reminders |
| `GET` | `/reminders/unread` | Get unread reminders |
| `PATCH` | `/reminders/{id}/read` | Mark one reminder as read |
| `PATCH` | `/reminders/read-all` | Mark all reminders as read |

## Authentication Flow

After a successful login, the app stores these values in `localStorage`:

```text
token
name
email
```

The Axios request interceptor attaches the token as:

```text
Authorization: Bearer <token>
```

Auth routes such as `/auth/login` and `/auth/register` do not receive the saved token. This prevents stale tokens from interfering with sign-in or account creation.

If a protected API request returns `401` or `403`, the app clears stored auth data and redirects the user to `/login`.

## Currency and Categories

The current display currency is configured in:

```text
src/constants/currency.js
```

The app currently uses:

```text
RWF
```

Expense categories are configured in:

```text
src/constants/expenses.js
```

## Deployment

Build the production bundle with:

```bash
npm run build
```

Deploy the generated `dist/` folder to any static hosting platform, such as Render, Netlify, Vercel, GitHub Pages, or an Nginx server.

Before deploying, make sure `src/api/axios.js` points to the deployed backend API URL.

## Troubleshooting

### Registration returns 404

Check the failed request URL in the browser Network tab. The frontend expects registration at:

```text
POST <baseURL>/auth/register
```

If your backend uses a different route, update `src/api/authApi.js`.

### Protected pages redirect to login

Confirm that `localStorage` contains a valid `token`, and confirm that the backend accepts it as a Bearer token.

### API requests go to the wrong server

Check `baseURL` in `src/api/axios.js`.

### Import casing issues

The auth API file is named:

```text
src/api/authApi.js
```

Use the same casing in imports, especially when deploying to case-sensitive environments.
