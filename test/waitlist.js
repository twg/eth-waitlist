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
            var joiningUser = accounts[1];

            return waitlist.join({ from: joiningUser }).then(function() {
                return waitlist.get();
            }).then(function(list) {
                assert.equal(list.length, 1, "The waitlist should have one account.");
                return waitlist.pop();
            }).then(function({ logs }) {
                assert.equal(logs[0].event, 'NextInQueue');
                assert.equal(logs[0].args._value, joiningUser);
                return waitlist.getNextInQueue();
            }).then(function(nextInQueue) {
                assert.equal(nextInQueue, 1, "Current spot should be zero.");
            });
        });
    });

    describe('should prevent an admin from', function() {

        it('poping if the list is empty', function() {
            return waitlist.get().then(function(list) {
                assert.equal(list.length, 0, "The waitlist should be empty.");
                return waitlist.pop();
            }).catch(function(error) {
                assert.include(error.message, "VM Exception while processing transaction");
                return waitlist.getNextInQueue();
            }).then(function(nextInQueue) {
                assert.equal(nextInQueue, 0, "Current spot should be zero.");
            });
        });
    })

    describe('should allow a user to', function() {

        it('join a list', function() {
            return waitlist.join({ from: accounts[1] }).then(function() {
                return waitlist.get({ from: accounts[1] });
            }).then(function(list) {
                assert.equal(list.length, 1, "The waitlist should have one account.");
                return waitlist.getNextInQueue();
            }).then(function(nextInQueue) {
                assert.equal(nextInQueue, 0, "Current spot should be zero.");
            });
        });
    });

});