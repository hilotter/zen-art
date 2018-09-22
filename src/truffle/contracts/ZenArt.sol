pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Holder.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract ZenArt is ERC721Full, ERC721Mintable, ERC721Burnable, ERC721Holder, Ownable {
  constructor() public
    ERC721Full("ZenArt", "ZAT")
  {
  }

  uint128 private paperFee = 0 ether;

  function mintPaper (
    string _tokenURI
  )
    external
    payable
    onlyBeforeMintingFinished
    returns (bool)
  {
    require(msg.value == paperFee);
    require(msg.sender != address(0));

    uint256 tokenId = uint256(keccak256(abi.encodePacked(_tokenURI)));
    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, _tokenURI);
    return true;
  }

  function setPaperFee(uint128 _fee) external onlyOwner {
    paperFee = _fee;
  }

  function getPaperFee() external view returns (uint128) {
    return paperFee;
  }
}
