# United Airlines DApp

## Description
The United Airlines Decentralized Application (DApp) allows users to book flights, check in, buy insurance, track baggage, check flight status, and provides an admin panel for managing flight details. This is built using Solidity for smart contracts and Web3.js for the front-end interaction with the blockchain.
read READ.md


## Features
- **Book Flights**: Allows users to book a flight.
- **Check-In**: Users can check in for their flights.
- **Buy Insurance**: Users can buy insurance for their flight in different tiers (Basic, Pro, Full).
- **Baggage Tracking**: Users can track the status of their baggage.
- **Flight Status**: Check the status of flights.
- **Admin Panel**: Admin can update flight statuses, baggage statuses, and departure times.

## Installation Instructions

### Prerequisites
- You will need **Node.js** and **npm** installed. Download Node.js from [here](https://nodejs.org/).
- You will also need **Ganache** for local Ethereum blockchain development. Download Ganache from [here](https://www.trufflesuite.com/ganache).

### Steps to Run the Project Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dyslex-qrogrammer/united-airlines-dapp.git
==============================
How to run the United Airlines DAp
If they are NOT installed, install them like this:

    npm install -g truffle
    npm install -g ganache-cli
    npm install -g http-server

1. Clone the repository
    git clone https://github.com/dyslex-qrogrammer/united-airlines-dapp.git
    cd united-airlines-dapp

2. Start Ganache (local blockchain)
Open a FIRST terminal and run:
    ganache-cli --port 8545 --networkId 1337

- Leave this terminal OPEN.
- You should see 10 test accounts with 1000 ETH each.

3. Compile & deploy the smart contract
Open a SECOND terminal and run (from the project folder):

    cd ~/united-airlines-dapp

    truffle migrate --reset --network development

This will:
- Compile `contracts/AirlineContracts.sol`
- Deploy it to the Ganache blockchain on http://127.0.0.1:8545
- Create / update `build/contracts/AirlineContracts.json`
- 
4. Copy the contract ABI to the client folder
Still in the SECOND terminal:
    cd ~/united-airlines-dapp
    cp build/contracts/AirlineContracts.json client/
This makes sure the front-end (app.js) uses the latest deployed contract info.

5. Start the web server for the front-end
Open a THIRD terminal and run:
    cd ~/united-airlines-dapp/client
    http-server -p 8080
You should see something like:
- "Available on: http://127.0.0.1:8080"
  
6. Open the DApp in your browser
In your browser, go to:
    http://127.0.0.1:8080
You should now see the United Airlines DApp UI.


7. Using the DApp
1) Click the "Connect" / "Connect to Ganache" button.
   - This should show the active account (from Ganache).

2) Book a flight:
   - Enter a flight ID (any number, e.g. 1).
   - Click "Book Flight".

3) Check in:
   - After booking, click "Check In".

4) Buy insurance:
   - Select a tier (Basic / Pro / Full).
   - Click "Buy Insurance".

5) Track baggage:
   - Click the "Track Baggage" button.
   - It will show the bag status for the active account.

6) Check flight status:
   - Click the "Flight Status" button.
   - It will show the flight status for the active account.

7) Admin actions (only work from the admin account — the first Ganache account that deployed the contract):
   - Enter a passenger address.
   - Set baggage status / flight status / departure time.
   - Click the corresponding admin button to update.

--------------------------------
If something breaks
- Make sure Ganache is running on port 8545.
- Make sure you ran:
    truffle migrate --reset --network development
    cp build/contracts/AirlineContracts.json client/

- Then restart the web server:
    cd ~/united-airlines-dapp/client
    http-server -p 8080
