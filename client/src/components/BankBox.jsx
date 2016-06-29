var React = require('react');
var SampleAccounts = require('./sample_accounts.js');
var AccountBox = require('./AccountBox.jsx');

var BankBox = React.createClass({

  getInitialState: function () {
    return { accounts: SampleAccounts, total: 0, persTot: 0, busTot: 0 };
  },

  updateNotes: function (account, note) {
    var newAccs = [];
    for (var entry of this.state.accounts) {
      if (entry === account) {
        entry.notes = note;
      }

      newAccs.push(entry);
    }

    this.setState({ accounts: newAccs });
  },

  addInterest: function () {
    var currentAccs = this.state.accounts;
    var newAccs = currentAccs.map(function (account) {
      return { owner: account.owner, amount: account.amount * 1.1, type: account.type, notes: account.notes };
    }
  );
    this.setState({ accounts: newAccs });
    this.getTotal(newAccs, 'Personal'),
    this.getTotal(newAccs, 'Business'),
    this.getTotal(newAccs);
  },

  componentDidMount: function () {
    var bigTotal = this.getTotal(this.state.accounts);
    var personal = this.getTotal(this.state.accounts, 'Personal');
    var business = this.getTotal(this.state.accounts, 'Business');
  },

  getTotal: function (accounts, string) {
    var newTotal = 0;
    if (!string) {
      for (var account of accounts) {
        newTotal += account.amount;
      }

      newTotal = parseFloat(newTotal).toFixed(2);
      this.setState({ total: newTotal });
    } else {
        var accounts = this.filterAccounts(accounts, string);
        for (account of accounts) {
          newTotal += account.amount;
        }

        if (string === 'Personal') {
          this.setState({ persTot: newTotal });
        } else {
            this.setState({ busTot: newTotal });
          };
      }
  },

  filterAccounts: function (accounts, typeString) {
    var newAccounts = accounts.filter(function (account) {
      return account.type === typeString;
    }
  );
    return newAccounts;
  },

  render: function () {
    var personal = this.filterAccounts(this.state.accounts, 'Personal');
    var business = this.filterAccounts(this.state.accounts, 'Business');
    return (<div>
            <h1>Bank Box</h1>
            <h2>Total in bank: £{this.state.total}</h2>
            <AccountBox
               updateNotes={this.updateNotes}
               accounts={this.filterAccounts(this.state.accounts, 'Personal')}
                        total={this.state.persTot}/>
                      <AccountBox
                        updateNotes={this.updateNotes}
                        accounts={this.filterAccounts(this.state.accounts, 'Business')}
                        total={this.state.busTot}/>
                      <button onClick={this.addInterest}>ADD 10% INTEREST</button>
            </div>
       );
     }
});

module.exports = BankBox;
