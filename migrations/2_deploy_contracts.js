var Med = artifacts.require("./Med.sol");

module.exports = function(deployer) {
  deployer.deploy(Med,["0x30e85e867e3d2451e8ac5d066d1119a403d432a1"]);
};