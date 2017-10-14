pragma solidity ^0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Waitlist.sol";

contract TestWaitlist {

  function testItCreatesAList() public {
    // Waitlist waitlist = Waitlist(DeployedAddresses.Waitlist());

    // Assert.equal(waitlist.get().length, 0, "It should return an empty list.");
  }

}
