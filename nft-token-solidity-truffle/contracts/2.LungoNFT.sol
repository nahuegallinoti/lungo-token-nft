// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract LungoNFT is ERC721, ERC721Enumerable {
  uint public supply;

  mapping (uint256 => string) private uris;

  constructor() ERC721("Lungo NFT", "LNG") {}

  function mint() public payable
  {
    require(msg.value == 0.02 ether, "Only 0.02 ether is allowed to mint");
    _mint(msg.sender, supply);
    supply += 1;    
    uris[0] = "https://ipfs.io/ipfs/QmV6fLGmeDLGm1bC8E7Mwz2SvBuyVB2hDqBJCKkqiJtVo4";
    uris[1] = "https://ipfs.io/ipfs/QmV6fLGmeDLGm1bC8E7Mwz2SvBuyVB2hDqBJCKkqiJtVo4";
    uris[2] = "https://ipfs.io/ipfs/QmV6fLGmeDLGm1bC8E7Mwz2SvBuyVB2hDqBJCKkqiJtVo4";
  }


  function generateUri(uint256 tokenId) private view returns (string memory)
  {

    uint256 modulus = 3;
    uint256 result = (tokenId +  modulus) % modulus;

    return uris[result];

  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    
    string memory uriGenerated = generateUri(tokenId);

    return uriGenerated;
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