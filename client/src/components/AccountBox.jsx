var React = require('react');
var BankAccount = require('./BankAccount.jsx');

var AccountBox = React.createClass({
  render: function () {
    var accComps = this.props.accounts.map(function (account) {
      return <BankAccount
                key={account.owner}
                data={account}
                updateNotes={this.props.updateNotes}/>;
            }.bind(this)
  );
    return (<div key={this.props.accounts[0].owner}>
            <h2>{this.props.accounts[0].type} Accounts</h2>
            <h4>Total: £{parseFloat(this.props.total).toFixed(2)}</h4>
            {accComps}
            </div>);
  },
});

module.exports = AccountBox;
