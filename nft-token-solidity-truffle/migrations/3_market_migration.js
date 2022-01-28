const marketNFT = artifacts.require("MarketNFT");

module.exports = function (deployer) {
  deployer.deploy(marketNFT);
};
