const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("ethers");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("PayrollContract", () => {
  let superadmin, employee, employee2, Payroll, hardhatPayroll;
  let salaryToken, hardhatToken, tokenAddress;
  let salary, employeeAddress, joiningDate;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    superadmin = signers[0];
    employee = signers[1];
    employee2 = signers[2];

    //deploying payroll contract
    Payroll = await ethers.getContractFactory("payroll");
    hardhatPayroll = await Payroll.deploy();
    await hardhatPayroll.deployed();

    //deploying salary token contract
    salaryToken = await ethers.getContractFactory("SalaryToken");
    hardhatToken = await salaryToken.deploy();
    await hardhatToken.deployed();
    tokenAddress = hardhatToken.address;
    await hardhatToken.transfer(hardhatPayroll.address,ethers.utils.parseUnits("50000", 18));

    //deploying reward token contract
    rewardToken = await ethers.getContractFactory("RewardToken");
    hardhatReward = await rewardToken.deploy();
    await hardhatReward.deployed();
    rewardAddress = hardhatReward.address;
    await hardhatReward.transfer(hardhatPayroll.address,ethers.utils.parseUnits("50000", 18));


    salary = 1000;
    employeeAddress = employee.address;
    joiningDate = 1234567890;

    // Add an employee to the contract
    await hardhatPayroll
      .connect(superadmin)
      .addEmployee(salary, employeeAddress, joiningDate);
  });

  //-------------Checks addEmployee function----------//

  it("should add employee to the contract by superadmin", async () => {
    let salary2 = 1200;
    let employeeAddress2 = employee2.address;
    let joiningDate2 = 1234567890;

    // Call the addEmployee function
    await hardhatPayroll
      .connect(superadmin)
      .addEmployee(salary2, employeeAddress2, joiningDate2);

    // Get the employee details after the addEmployee operation
    let employeeDetails = await hardhatPayroll.employeeList(2);

    // Verify that the employee details are correct
    expect(employeeDetails.id).to.equal(2);
    expect(employeeDetails.salary).to.equal(salary2);
    expect(employeeDetails.salaryAddress).to.equal(employeeAddress2);
    expect(employeeDetails.joiningDate).to.equal(joiningDate2);
  });

  //--------------Checks upgradeStatus function-----------//
  it("should upgrade the salary and restricted status of the employee", async () => {
    // Get the employee details before the upgradeStatus operation
    let beforeUpgrade = await hardhatPayroll.employeeList(1);
    console.log("Before Upgrade: ", beforeUpgrade.salary);

    // Call the upgradeStatus function
    await hardhatPayroll.connect(superadmin).upgradeStatus(1, 1500, true);

    // Get the employee details after the upgradeStatus operation
    let afterUpgrade = await hardhatPayroll.employeeList(1);
    console.log("After Upgrade: ", afterUpgrade.salary);

    //Get the employee status after upgradeStatus Operation
    let whitelist = await hardhatPayroll.isWhiteListed(employeeAddress);

    // Verify that the employee salary and status has been upgraded
    expect(afterUpgrade.salary).to.equal(1500);
    expect(whitelist).to.equal(true);
  });

  //--------------Checks ClaimSalary function-----------//
  it("should claim the correct amount of salary by employee", async () => {
  
    // Increasing the time so that the employee is eligible for salary
    await ethers.provider.send("evm_increaseTime", [31]);
    await ethers.provider.send("evm_mine", []);

    // Get the initial and final token balances of the employee
    const initialBalance = await hardhatToken.balanceOf(employee.address);
    console.log(initialBalance);
    await hardhatPayroll.ClaimSalary(1, tokenAddress);
    const finalBalance = await hardhatToken.balanceOf(employee.address);
    console.log(finalBalance);

    // Verify that the employee received the expected number of tokens
    expect(finalBalance).to.equal(initialBalance.add(ethers.utils.parseUnits("1000", 18)));
  });

   //--------------Checks ClaimReward function-----------//
   it("should claim the correct amount of reward by employee", async () => {
  
    // Increasing the time so that the employee is eligible for salary
    await ethers.provider.send("evm_increaseTime", [91]);
    await ethers.provider.send("evm_mine", []);

    // Get the initial and final token balances of the employee
    const initialBalance = await hardhatReward.balanceOf(employee.address);
    console.log(initialBalance);
    await hardhatPayroll.ClaimReward(1, rewardAddress);
    const finalBalance = await hardhatReward.balanceOf(employee.address);
    console.log(finalBalance);

    // Verify that the employee received the expected number of tokens
    expect(finalBalance).to.equal(initialBalance.add(ethers.utils.parseUnits("100", 18)));
  });

  //--------------Checks BalanceAndSupply function-----------//
  it("should return correct value of totalSupply and balanceof contract", async () => {
    const totalSupply = await hardhatPayroll.balanceAndSupply(tokenAddress);
    console.log(totalSupply);
    // Verify that the totalsupply to be same as in tokencontract
    expect(totalSupply).to.equal(ethers.utils.parseUnits("5000000000000000", 18));
  })
});
