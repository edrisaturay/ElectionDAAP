const Election  = artifacts.require("./Election.sol")

contract("Election", function(accounts){

    it("Initiates with two candidates", function(){
        return Election.deployed().then(function (instance) {
            return instance.candidatesCount()
        }).then(function(count){
            assert.equal(count, 2)
        })
    })

    let electionInstance 

    it("it initializes the candidates with the correct values", function(){
        return Election.deployed().then(function (instance) {
            electionInstance = instance
            return electionInstance.candidates(1)
        }).then(function(candidate){
            assert.equal(candidate[0], 1, "Contains the correct id")
            assert.equal(candidate[1], "Nisha N Turay", "Contains the correct name")
            assert.equal(candidate[2], 0, "Contains the correct vote count")
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0], 2, "Contains the correct id")
            assert.equal(candidate[1], "Edrisa A Turay", "Contains the correct name")
            assert.equal(candidate[2], 0, "Contains the correct vote count")
        })
    })

    it("allows a voter to cast a vote", function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance
            candidateId = 1
            return electionInstance.vote(candidateId, {from: accounts[0]})
        }).then()
    })
})