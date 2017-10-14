var Waitlist = artifacts.require("./Waitlist.sol");

contract('Waitlist', function(accounts) {

    it("should create an empty list.", function() {
        return Waitlist.deployed().then(function(instance) {
            return instance.get.call();
        }).then(function(waitingList) {
            assert.equal(waitingList.length, 0, "The waitlist should be empy.");
        });
    });

    // if('should add a user to the list', function() {
    //   return Waitlist.deployed().then(function(instance) {
    //     return instance.put.call();
    // }).then(function(waitingList) {
    //     assert.equal(waitingList.length, 0, "The waitlist should be empy.");
    // });

});