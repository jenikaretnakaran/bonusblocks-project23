const { expect } = require("chai");

describe("RewardToken", () => {
  let owner, Token, hardhatToken;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    Token = await ethers.getContractFactory("RewardToken");
    hardhatToken = await Token.deploy();
  });

//Check for the name of the deployed token contract matches the expected value.
  it("should have the correct Token name", async () => {
    expect(await hardhatToken.name()).to.equal("Reward");
  });

//check for the symbol of the deployed token contract matches the expected value
  it("should have the correct Token symbol", async () => {
    expect(await hardhatToken.symbol()).to.equal("TRWD");
  });

//check for the total supply of the deployed token contract matches the expected value.
  it("should have the correct Token Totalsupply", async () => {
    expect(await hardhatToken.totalSupply()).to.equal(
      ethers.utils.parseUnits("5000000000000000", 18)
    );
  });

//check for the total supply of the deployed token contract has increased by the expected amount
  it("should mint correct number of tokens", async () => {

    // Mint some tokens using the mintTokens function and the owner's account.
    await hardhatToken
      .connect(owner)
      .mintTokens(1000);
    expect(await hardhatToken.totalSupply()).to.equal(
      ethers.utils.parseUnits("5000000000001000", 18)
    );
  });
});
