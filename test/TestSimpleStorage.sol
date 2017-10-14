pragma solidity ^0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Waitlist.sol";

contract TestSimpleStorage {

  function testItCreatesAList() {
    Waitlist waitlist = Waitlist(DeployedAddresses.Waitlist());

//     simpleStorage.set(89);

//     uint expected = 89;

//     Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  }

}
