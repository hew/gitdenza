const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const GDZ = await hre.ethers.getContractFactory("GitDenza");
  const gdz = await GDZ.deploy();
  await gdz.deployed();
  console.log("GitDenza deployed to:", gdz.address);

  let config = `export const nftaddress = "${gdz.address}"`

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
