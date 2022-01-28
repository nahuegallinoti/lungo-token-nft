// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract LungoNFT is ERC721, ERC721Enumerable {
  uint public supply;
  constructor() ERC721("Lungo NFT", "LNG") {}

  function mint() public
  {
    _mint(msg.sender, supply);
    supply += 1;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    return "https://ipfs.io/ipfs/QmYyJNTadRaMuTBo796oARMXJ8CVNxDLy8v83GUnf1pcJL";
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

}