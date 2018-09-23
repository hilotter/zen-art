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

  struct Paper {
    string ipfsHash;
    address publisher;
  }

  Paper[] public papers;
  mapping (string => uint256) ipfsHashToTokenId;

  uint128 private paperFee = 0 ether;

  function mintPaper (
    string _ipfsHash,
    string _tokenURI
  )
    external
    payable
    onlyBeforeMintingFinished
    returns (bool)
  {
    require(msg.value == paperFee);
    require(msg.sender != address(0));
    require(ipfsHashToTokenId[_ipfsHash] == 0);

    Paper memory _paper = Paper({ipfsHash: _ipfsHash, publisher: msg.sender});
    uint256 tokenId = papers.push(_paper) - 1;
    ipfsHashToTokenId[_ipfsHash] = tokenId;
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

  function getBalanceContract() external constant returns(uint){
    return address(this).balance;
  }

  function withdraw(uint256 _amount) external onlyOwner {
    require(_amount <= address(this).balance);

    msg.sender.transfer(_amount);
  }
}
