const Election  = artifacts.require("./Election.sol")

contract("Election", function(accounts){

    it("Initiates with two candidates", function(){
        return Election.deployed().then(function (instance) {
            return instance.candidatesCount()
        }).then(function(count){
            assert.equal(count, 2)
        })
    })

    it("it initializes the candidates with the correct values", function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance
            return electionInstance.candidates(1)
        }).then(function(candidate){
            assert.equal(candidate[0], 1, "Contains the correct id")
            assert.equal(candidate[1], 1, "Contains the correct id")
            assert.equal(candidate[0], 1, "Contains the correct id")
        })
    })
})