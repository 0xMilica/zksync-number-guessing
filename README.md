# Number Guessing
Demonstration of creating Full Stack application on zkSync  
Consisting of:
1. Solidity Smart Contracts
2. React Frontend Application

# Deployments on zkSync
The Smart Contracts are deployed on zkSync's Goerli Testnet on the next addresses:

- [RewardToken](https://goerli.explorer.zksync.io/address/0x86ECC9B797aF1A3a6c607ea446F66Eb241eb17f7#transactions): `0x86ECC9B797aF1A3a6c607ea446F66Eb241eb17f7`  
- [NumberGuessing](https://goerli.explorer.zksync.io/address/0x251b578a6e95f9950Df3c44DCd54cBD5Fb67be47#transactions): `0x251b578a6e95f9950Df3c44DCd54cBD5Fb67be47`

# Project requirements
You'll need next software installed on your machine before starting:
* Installed [Node.js 18](https://nodejs.org/en/)
* Installed [yarn](https://yarnpkg.com/) package manager
* Installed [GIT](https://git-scm.com/) version control system

# Running the project
**_Steps should be followed in the given order._**

## General:
1. Clone the repo: `git clone https://github.com/0xMilica/zksync-number-guessing`
2. Navigate to the folder: `cd zksync-number-guessing`

## Smart Contracts:
3. Create an .env file from the template: `cp .env.example .env`
4. Fill the .env values with your own
5. Install dependencies: `yarn`
6. Compile the contracts: `yarn compile`
7. Run the tests: `yarn test`

## Frontend
The frontend is hosted at [https://zksync-number-guessing.netlify.app/](https://zksync-number-guessing.netlify.app/)  
If instead, you wish to run it locally, follow the next steps:

8. Navigate to the Frontend folder: `cd frontend`
9. Install dependencies: `npm i`
10. Start the application in development mode: `npm run start`
11. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
