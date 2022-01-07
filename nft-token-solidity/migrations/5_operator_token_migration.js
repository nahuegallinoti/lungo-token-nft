const operatorToken = artifacts.require("ERC20Operator");

module.exports = function (deployer) {
  deployer.deploy(operatorToken, "0xfB13B339a00A821034e0010080870fCEC9D289CA");
};
