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
      web3 = new Web3(web3.currentProvider)
    }else{
      App.web3Provider = new Web3.providers.HttpProvider("http://localohst:7475")
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
    })

    return App.render();
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
    App.contracts.Election.deployed().then( function(instance) {
      electionInstance = instance
      return electionInstance.candidatesCount()
    }).then(function(candidatesCount) {
      var candidatesResultsElement = $("#candidates-result")
      candidatesResultsElement.empty()

      // Loop through the candidates and add them to the table
      for(let i = 0; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          let id = candidate[0]
        })
      }
    })

  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
