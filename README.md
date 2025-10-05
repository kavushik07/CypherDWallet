# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# CypherD Web3 Wallet

A mock Web3 wallet application built with React frontend and Flask backend, featuring wallet creation, ETH transfers, USD conversion, and real-world notifications.

This project uses **React + Vite** for a minimal, high-performance frontend setup with HMR and ESLint support.

---

## 🚀 Features

- **Wallet Management**: Create new wallets using 12-word mnemonic phrases
- **Balance Display**: View ETH balance 
- **Send Transfers**: Send ETH or USD amounts with real-time price conversion
- **Transaction History**: View complete transaction history
- **Secure Signing**: Digital signature verification for all transactions

---

## 🛠️ Tech Stack

### Frontend
- React 19.1.1
- Vite 7.1.7
- Ethers.js 6.15.0
- Modern CSS with dark theme
- ESLint support

### Backend
- Flask 3.1.2
- Mongodb Database
- Web3.py for signature verification
- Skip API for USD/ETH conversion
---

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- MySQL Server
- Git

---

## 🚀 Setup Instructions
🎯 How to Use
1. Create Wallet

Click "Create New Wallet" to generate a 12-word recovery phrase

Save your recovery phrase securely!

2. View Balance

Displayed in ETH and USD

New wallets receive a random starting balance (1-10 ETH)

3. Send Transfers

Enter recipient address (Ethereum format)

Enter amount in ETH or USD

Toggle ETH/USD using buttons

Click "Send ETH" and sign the transaction

4. Transaction History

Displays all transactions

Green ↓ for received, red ↑ for sent

🔒 Security Features

Digital signatures for transactions

Signature verification in backend

1% slippage protection on USD transfers

Database transactions are atomic
