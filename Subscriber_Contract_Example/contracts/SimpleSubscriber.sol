pragma solidity ^0.4.24;
import "./ERC20.sol";
import "./ZapBridge.sol"


contract Subscriber {

	address public owner;
	ZapBridge public coordinator;
	ERC20 token;
	uint256 id;
	Event ReceiveResponse(uint256 indexed _id, bytes32[] indexed _response);


	constructor(address _coordinator) {
		owner = msg.sender;
		coordinator = ZapBridge(_coordinator);
		address zapTokenAddress = coordinator.getContract("ZAP_TOKEN");
		token = ERC20(zapTokenAddress);
	}

	//Set provider that contract will receive data (only owner)
	function setProvider(address _provider, bytes32 _endpoint){
		require(msg.sender == owner);
		endpoint = _endpoint;
		provider = _provider;
	}

	//This function call can be ommitted if owner call delegateBond directly to Bondage
	function bond(byte32 _endpoint, int256 dots){
		address BondageAddress = coordinator.getContract("BONDAGE")
		return ZapBridge(BondageAddress).bond(provider,endpoint,dots)
	}

	//Query offchain or onchain provider.
	function queryProvider(string queryString, bytes32[] params) returns (uint256) {

		address dispatchAddress = coordinator.getContract("DISPATCH");
		id = ZapBridge(dispatchAddress).query(provider,queryString,endpoint,params);
		return id;
	}

    //Implementing callback that provider will call
    //Available callback options  are  bytes32[], int[], positional 1,2,3,4 string responses
	function callback(uint256 _id, bytes32[] _response) external{
		require(_id==id);
		emit ReceiveResponse(_id, _response);

        //Implement your logic with _response
	}

}
