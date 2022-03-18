import { messagePrefix } from "@ethersproject/hash";
import { Signer } from "ethers";
//@ts-ignore
import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const deployer = await ethers.getSigners();
  const deployerAddr = await ethers.getSigner(deployer[0].address);

  console.log("Deploying contracts with the account:", deployer[0].address);

  console.log("Account balance:", await deployerAddr.getBalance());

  const merkletree = await ethers.getContractFactory("MerkleTree");
  const deploymerkletree = await merkletree
    .connect(deployerAddr)
    .deploy("Merkletree", "MT");

  await deploymerkletree.deployed();
  console.log("merkletree address", deploymerkletree.address);
}
//account use to deploy 0x27E936b199a8EEb3980c468fc1802f1Ef78b1625
//contract addr 0x139360Ca9620CF4A748B81844b84aDe0747360ed

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
