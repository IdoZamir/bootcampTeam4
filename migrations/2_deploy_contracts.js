var Med = artifacts.require("./Med.sol");

module.exports = function(deployer) {
  deployer.deploy(Med,["0x3b5a83504c6484ac1d461fcbf978e0c2ace0f106"]);
};