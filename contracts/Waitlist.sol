pragma solidity ^0.4.2;

contract Waitlist {
  address[] public waitingList;
  bytes32 listName;
  address public owner;
  uint current;

  function Waitlist(bytes32 waitlistName) public {
    listName = waitlistName;
    owner = msg.sender;
    current = 0;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier notOwner() {
    require(msg.sender != owner);
    _;
  }

  function addToWaitingList() notOwner {
    waitingList.push(msg.sender);
  }

  function getWaitingList() onlyOwner constant returns(address[]) {
    return waitingList;
  }

  function pop() onlyOwner returns(address) {
    require(waitingList.length < current);
    address user = waitingList[current];
    current++;
    return user;
  }

  function getCurrent () constant returns(uint) {
    return current;
  }

}
