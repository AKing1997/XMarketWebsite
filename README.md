# XRealEstate DApp

**XRealEstate** is a decentralized application (DApp) designed for the tokenization of real-world assets, specifically real estate properties. The platform integrates a **DigitalIdentity** system for user verification and token requests, ensuring that only verified users can buy, sell, or create Real Estate Tokens. These tokens represent ownership or partial ownership of real estate assets, facilitated through blockchain technology.

## Main Features

- **Real-World Asset Tokenization as NFTs**: Real estate properties are tokenized as NFTs (Non-Fungible Tokens), representing digital ownership of physical assets. Users can create, buy, and sell these assets on the platform.
- **DigitalIdentity for Verification**: To ensure secure and legitimate transactions, all users must verify their identity through the **DigitalIdentity** system. Only verified users can interact with the platform, including creating, buying, or selling real estate assets.
- **Real Estate Marketplace**: The platform includes a marketplace where users can list tokenized real estate assets (as NFTs) for sale, or buy available assets from other users.
- **Secure Transactions**: The use of blockchain technology ensures secure, transparent, and tamper-proof transactions.
- **Tron Wallet Integration**: Uses TronWeb to connect Tron wallets, enabling transactions with TRX cryptocurrency for the buying and selling of real estate assets.
  
## Technologies Used

This project utilizes several key dependencies:

- **React**: The main library for building the user interface.
- **Material UI (MUI)**: For UI components and visual styling.
- **TronWeb**: To integrate with the Tron blockchain and handle wallet operations.
- **Chart.js**: For interactive charts and data visualization.
- **React Router**: For managing routes within the application.
- **TypeScript**: To enable static typing and ensure code robustness.

## Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

## How to Run the Project Locally

Follow the steps below to run the project locally:

1. Clone the project repository:

    ```bash
    git clone https://github.com/AKing1997/XRealEstateWebsite.git
    ```

2. Navigate into the project directory:

    ```bash
    cd XRealEstateWebsite
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Start the application:

    ```bash
    npm start
    ```

5. Open the application in your browser:

    ```bash
    http://localhost:5001
    ```

## Project Structure

- **src/**: Contains the entire application source code.
  - **components/**: Reusable React components.
  - **pages/**: Main pages of the application.
  - **services/**: Services like TronWeb connection and authentication logic.
  - **styles/**: Global and custom styles.

## Important Dependencies

The project includes several important dependencies for its functionality, such as:

- **@emotion/react** and **@emotion/styled**: For styling management in the application.
- **@mui/icons-material** and **@mui/material**: For using Material UI icons and components.
- **@tronweb3/tronwallet-adapter**: To connect Tron-based wallets, including support for Ledger and WalletConnect.
- **Chart.js** and **react-chartjs-2**: For dynamic charts.
- **React Router Dom**: For app navigation.
- **tronweb**: A library for interacting with the Tron blockchain.

## Contributions

If you would like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.