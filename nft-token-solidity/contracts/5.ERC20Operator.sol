// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Operator {

  mapping (address=>uint) public balances;
  ERC20 private myERC20;

  constructor (address erc20Address)
  {
    myERC20 = ERC20(erc20Address);
  }

  function deposit(uint amount) public
  {
    myERC20.transferFrom(address(msg.sender), address(this), amount);
    balances[msg.sender] += amount;
  }

  function retrieveTokens() public
  {
    myERC20.transfer(address(msg.sender), balances[msg.sender]);
    balances[msg.sender] = 0;
  }

//TODO implementar

  function approve(address spender, uint amount) public
  {
    myERC20.approve(spender, amount);
  }

}