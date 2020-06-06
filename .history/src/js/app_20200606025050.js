App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",


  init: function() {
    return App.initWeb3()
  },

  initWeb3: function() {
    
    if(typeof web3 !== "undefined") {
      // If web3 instance is already provided by metamask
      App.web3Provider = web3.currentProvider
      ethereum.enable()
      web3 = new Web3(web3.currentProvider)
      
    }else{
      App.web3Provider = new Web3.providers.HttpProvider("http://localohst:7475")
      ethereum.enable()
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract()
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new Truffle Contract from the artifact
      App.contracts.Election = TruffleContract(election)
      // Connect the provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider)
      return App.render();
    })
  },

  listenForEvents: function() {
    App.contracts.Election.deployed().then(function (instance) {
      // Restart the browser if you're unable to receive this event
      // This is a known issue with Metamask
      instance.votedEvent({})
    })
  },
  render: function() {
    let electionInstance
    let loader = $("#loader")
    let content = $("#content")

    loader.show()
    content.hide()

    // Load account data 
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account
        $("#account-address").text("Your account: " + account)
      }
    })

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance
      return electionInstance.candidatesCount()
    }).then(function(candidatesCount) {
      let candidatesResultsElement = $("#candidates-result")
      let candidatesSelectElement = $("#candidates-select")
      candidatesResultsElement.empty()
      candidatesSelectElement.empty()

      // Loop through the candidates and add them to the table
      for(let i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          let id = candidate[0]
          let name = candidate[1]
          let voteCount = candidate[2]

          // Render the candidate result
          let candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResultsElement.append(candidateTemplate)

          // Render the ballot option
          var candidateOption = "<option value='"+ id +"'>"+ name +"</option>"
          candidatesSelectElement.append(candidateOption)
        })
      }
      return electionInstance.voters(App.account)
      

    }).then(function(hasVoted) {
      // User has voted. don't allow to vote again
      if(hasVoted) {
        $("#voting-form").hide()
      }

      loader.hide()
      content.show()

    }).catch(function(error) {
      console.warn(error)
    })

  },

  castVote: function() {
    let candidateId = $("#candidates-select").val()
    App.contracts.Election.deployed().then(function(instance) {
      
      return instance.vote(candidateId, {from: App.account})
    }).then(function(result) {
      //Wait for the votes to update
      $("#content").hide()
      $("#loader").show()
    }).catch(function(error) {
      console.error(error)
    })
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
