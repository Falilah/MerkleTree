// import { messagePrefix } from "@ethersproject/hash";
// import { Signer } from "ethers";
//@ts-ignore
import { ethers } from "hardhat";

async function main() {
  const deployer = await ethers.getSigners();
  const deployerAddr = await ethers.getSigner(deployer[0].address);

  console.log("Deploying contracts with the account:", deployer[0].address);

  console.log("Account balance:", await deployerAddr.getBalance());

  const merkle = await ethers.getContractFactory("MerkleTest");
  const merkleDeploy = await merkle.deploy();
  await merkleDeploy.deployed();
  console.log("contract address is", merkleDeploy.address);
}

//account use to deploy 0x27E936b199a8EEb3980c468fc1802f1Ef78b1625
//Tokencontract addr 0x139360Ca9620CF4A748B81844b84aDe0747360ed
//merkle conreactAddress 0xe431582ff3a0038966f20bcab6585f5aff656a72

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
