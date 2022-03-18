// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MerkleTest {
    // Our rootHash
    bytes32 public root = 0x10e0767982dfd71d50c3ba77901437b8d20283e3f9677b5dfe7896c1a439447e;
    IERC20 token = IERC20(0x139360Ca9620CF4A748B81844b84aDe0747360ed);

    mapping(address => bool) IwhitelistClaimed;
    mapping(address => uint256) _balances;

    function claimToken(
        bytes32[] calldata _merkleProof,
        uint256 _id,
        uint256 amount
    ) public {
        require(IwhitelistClaimed[msg.sender] == false, "already claimed");
        require(checkValidity(_merkleProof, _id, amount), "invalid proof");
        require(token.transfer(msg.sender, amount));
        IwhitelistClaimed[msg.sender] = true;
    }

    function checkValidity(
        bytes32[] calldata _merkleProof,
        uint256 _id,
        uint256 amount
    ) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _id, amount));
        require(MerkleProof.verify(_merkleProof, root, leaf), "Incorrect proof");
        return true; // Or you can mint tokens here
    }

    function balanceOf(address addr) public view returns (uint256) {
        return _balances[addr];
    }
    // transaction receipt:
    //https://kovan.etherscan.io/tx/0x4b54be89a6b8e2d2b87ad9af6b4728aaf1c47a50e094d4a82774c9abeca96b0d
}
