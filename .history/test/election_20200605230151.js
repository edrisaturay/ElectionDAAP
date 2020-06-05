const Election  = artifacts.require("./Election.sol")

contract("Election", function(accounts){
    it("Initiates with two candidates", function(){
        return Election.deployed().then(function (instance) {
            return instance.candidatescount()
        }).then(function(count)){
            assert.equal(count, 2)
        }
    })
})