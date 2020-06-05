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
    $.getJSON("Election.json")

    return App.bindEvents();
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