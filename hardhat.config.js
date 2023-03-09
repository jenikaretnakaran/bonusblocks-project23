require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    //   Mumbai : {
    //     url: process.env.PROVIDER_URL,
    //     accounts:[`${process.env.PRIVATE_KEY}`]
    //   },
    // localhost: {
    //   url: process.env.PROVIDER_URL,
    //   accounts: [`${process.env.PRIVATE_KEY}`]
    // },
    Goerli : {
      url: process.env.PROVIDER_URL,
      accounts:[`${process.env.PRIVATE_KEY}`]
    }
  }
};
