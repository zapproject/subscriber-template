pragma solidity ^0.4.24;

contract ZapBridge{
	function getContract(string contractName) public view returns (address); //coordinator
	function calcZapForDots(address, bytes32, uint256) external view returns (uint256); //bondage
	function delegateBond(address holderAddress, address oracleAddress, bytes32 endpoint, uint256 numDots) external returns (uint256 boundZap); //bondage
	function query(address, string, bytes32, bytes32[]) external returns (uint256); //dispatch
}
