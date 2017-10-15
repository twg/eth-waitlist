pragma solidity ^0.4.15;

contract Waitlist {
  address[] public list;
  address public owner;
  uint nextInQueue;

  function Waitlist() public {
    owner = msg.sender;
    nextInQueue = 0;
  }

  // Modifiers
  modifier onlyOwner() { require(msg.sender == owner); _; }
  modifier notOwner() { require(msg.sender != owner); _; }

  function join() notOwner public {
    list.push(msg.sender);
  }

  function get() constant public returns(address[]) {
    return list;
  }

  function pop() onlyOwner public returns(address) {
    require(list.length > nextInQueue);
    address user = list[nextInQueue];
    nextInQueue++;
    return user;
  }

  function getNextInQueue() constant public returns(uint) {
    return nextInQueue;
  }

}
