// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

// ----------------------------------------------------------------------------
// Sample token contract
//
// Symbol        : LUN
// Name          : Lungo Token
// Total supply  : 1000000000
// Decimals      : 18
// Owner Account : 0x5970Ce3208422CA7bf971ABf43FFb742693777ED
//
// ----------------------------------------------------------------------------

contract LungoToken is ERC20 {
    using SafeMath for uint256;
        
    address payable public owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol){
      owner = payable(msg.sender);
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    //transfer owner to new owner
    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Only owner can transfer ownership");
        owner = payable(newOwner);
        emit OwnershipTransferred(msg.sender, newOwner);
    }

     function mint(address account, uint256 amount) public {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) public {
    require(msg.sender == account, 'Only the owner can burn tokens');
    _burn(account, amount);
  }
  
  function withdrawLiquidity() public {
    require(msg.sender == owner, 'Only the owner can withdraw liquidity');
    owner.transfer(address(this).balance);    

  }

  receive() external payable {
    require(msg.value >= 0);

  }

}