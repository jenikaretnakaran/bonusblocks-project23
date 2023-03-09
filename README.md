# BONUS BLOCKS
## SALARY CLAIMING DAPP FOR EMPLOYEES

BONUS BLOCKS is a decentralized application (dApp) that allows employees to claim their salary and incentives in a stable cryptocurrency with full transparency. All financial transactions made through the dApp are recorded on the blockchain and can be easily tracked using a block explorer. This ensures the security and immutability of payment records, preventing any tampering or fraud.

For more details Please read documentation file

## SETTING UP:

Step 1: Download the repository using the command
```
git@github.com:jenikaretnakaran/bonus_blocks_1.0.git

```
Step 2: Move to downloaded directory & Install the dependencies for testing using the command:
```
npm install

```
Step 3: Move to frontend-react directory & Install the dependencies for Front-end using the command:
```
npm install

```

## Connect to Ethereum Network
Step 1: Create an Infura account
[Infura](https://app.infura.io/register)
Step 2: Obtain the endpoint URL
```
Create Newkey
Network:Web3 API
Project Name:------

```
Step 3: Copy the endpoint URL and paste it in .env file
Create a .env file if you don't have one
```
PROVIDER_URL= "https://goerli.infura.io/v3/<YOUR_API_KEY> "
```
######## Settingup Admin account
Step 1: Setup admin account with some GoerliETH for transactions
Step 2: Export Private Key from Metamask wallet
Step 3: Copy private key and paste it in .env file
```
PRIVATE_KEY= " "
```
## Configure hardhat.config.js file
Step 1: Give Network Details like this
 ```
 Goerli : {
      url: process.env.PROVIDER_URL,
      accounts:[`${process.env.PRIVATE_KEY}`]
    }

```
## Test Smart Contracts
Using Hardhat Environment
Step 1: Deploy the contract
```
npx hardhat run scripts/deploy.js --network Goerli
npx hardhat run scripts/deploy_salary.js --network Goerli
npx hardhat run scripts/deploy_reward.js --network Goerli

```

Step 2: Test the contract
```
npx hardhat test

```
NOTE:Transfer tokens from deployer wallet to payrollcontractaddress for transactions

## Start the development server

Step 1: Copy the contract addresses and paste it in frontend folder **Addresses** folder
Step 2: Copy contractABI from artifacts and paste it in frontend folder **contracts**
Step 3: Go to frontend React directory
        Open the terminal and start the development server 
```
npm start
```

## Settingup Employee accounts 
Step 1: Setup Employee account with some GoerliETH for transactions


# WORKFLOW

## ADMIN
**Connect admin wallet**
```
Step 1: Make sure Admin wallet is connected
Step 2: Go http://localhost:3000 and click on ConnectWallet dropdown and select admin

```
**Add new employee data**
```
Step 1: Click on Employee Registration and fill up the form details

Eg: 
    Salary: 1000
    Address: 0x..............................
    Joining Date:11/11/2022
```

**Update employee data**
```
Step 1: On adminpage navbar click on Employeedata option and then click on Update button next to the corresponding employee
Step 2: Fill up the update form and Submit

```

## EMPLOYEE
**Connect Employee Wallet**
```
Step 1: Make sure Employee wallet is connected
Step 2: Go http://localhost:3000 and click on ConnectWallet dropdown and select Employee

```
**Claiming Salary**
```
Step 1: Click on SalaryClaim option in navbar and Click Claim button

```

***Claiming Bonus**
NOTE: A salary can only be claimed after a gap of 30 seconds between each claim. A bonus can only be claimed after a gap of 90 seconds between each claim

```
Step 1: Click on BonusClaim option in navbar and Click Claim button

```

**Check Transactions**
```
Step 1: Click on transactions option in homepage navbar and then click on the block explorer link 

```




