const lungoNFT = artifacts.require("LungoNFT");

module.exports = function (deployer) {
  deployer.deploy(lungoNFT);
};
