const operatorToken = artifacts.require("ERC20Operator");

module.exports = function (deployer) {
  deployer.deploy(operatorToken, "0xC5C2ca67644B6b097C64D592C6741baa70f827AA");
};
