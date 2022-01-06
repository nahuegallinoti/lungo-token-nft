const lungoToken = artifacts.require("LungoToken");

module.exports = function (deployer) {
  deployer.deploy(lungoToken, 'LungoToken', 'LUN', 1000000000)
};
