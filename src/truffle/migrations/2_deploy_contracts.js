const Syodo = artifacts.require("./Syodo.sol");

module.exports = function(deployer) {
  deployer.deploy(Syodo);
};
