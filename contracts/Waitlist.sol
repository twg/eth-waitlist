pragma solidity ^0.4.15;

contract Waitlist {
  address[] public waitingList;
  address public owner;
  uint current;

  function Waitlist() public {
    owner = msg.sender;
    current = 0;
  }

  // Modifiers
  modifier onlyOwner() { require(msg.sender == owner); _; }
  modifier notOwner() { require(msg.sender != owner); _; }

  function add() notOwner {
    waitingList.push(msg.sender);
  }

  function get() onlyOwner constant returns(address[]) {
    return waitingList;
  }

  function pop() onlyOwner returns(address) {
    require(waitingList.length > current);
    address user = waitingList[current];
    current++;
    return user;
  }

  function getCurrent () constant returns(uint) {
    return current;
  }

}
