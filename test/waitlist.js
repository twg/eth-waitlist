var Waitlist = artifacts.require("./Waitlist.sol");

contract('Waitlist', function(accounts) {
    var waitlist;

    beforeEach(function() {
        return Waitlist.new().then(function(instance) {
            waitlist = instance;
        });
    });

    describe('should allow an admin to', function() {

        it("create an empty list.", function() {
            return waitlist.get().then(function(list) {
                assert.equal(list.length, 0, "The waitlist should be empty.");
                return waitlist.getNextInQueue();
            }).then(function(nextInQueue) {
                assert.equal(nextInQueue, 0, "Current spot should be zero.");
            });
        });

        it('pop a user from a list', function() {
            return waitlist.join({ from: accounts[1] }).then(function() {
                return waitlist.get();
            }).then(function(list) {
                assert.equal(list.length, 1, "The waitlist should have one account.");
                return waitlist.getNextInQueue();
            }).then(function(nextInQueue) {
                assert.equal(nextInQueue, 0, "Current spot should be zero.");
            });
        });

    })

    describe('should allow a user to', function() {

        it('join a list', function() {
            return waitlist.join({ from: accounts[1] }).then(function() {
                return waitlist.get();
            }).then(function(list) {
                assert.equal(list.length, 1, "The waitlist should have one account.");
                return waitlist.getNextInQueue();
            }).then(function(nextInQueue) {
                assert.equal(nextInQueue, 0, "Current spot should be zero.");
            });
        });
    });

});