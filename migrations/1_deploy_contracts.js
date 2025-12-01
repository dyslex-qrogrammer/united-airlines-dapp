const AirlineContracts = artifacts.require("AirlineContracts");

module.exports = function (deployer) {
  deployer.deploy(AirlineContracts);
};
