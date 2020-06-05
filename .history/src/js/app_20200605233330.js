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
      App.web3Provider
    }

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

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
