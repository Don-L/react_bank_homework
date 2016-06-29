var React = require('react');

var BankAccount = React.createClass({

  getInitialState: function () {
    return { notesHidden: true,
            editNotes: false,
            currentNote: '', };
  },

  render: function () {
    var notesElement = <p onClick={this.notesClicked}>CLICK TO ADD NOTES</p>;
    if (this.props.data.notes) {
      notesElement = <p onClick={this.notesClicked}>{this.props.data.notes}</p>;
    };

    if (this.state.notesHidden === false) {
      if (this.state.editNotes === false) {
        return (
          <div key={this.props.data.owner} >
          <p onClick={this.accClicked}>Account holder: {this.props.data.owner}</p>
          <p>Balance: £{parseFloat(this.props.data.amount).toFixed(2)}</p>
          {notesElement}
          <br/>
          </div>
        );
      } else {
        return (
          <div key={this.props.data.owner} >
          <p onClick={this.accClicked}>Account holder: {this.props.data.owner}</p>
          <p>Balance: £{parseFloat(this.props.data.amount).toFixed(2)}</p>
          <form onSubmit={this.handleNoteSubmit}>
            <input
              type='text'
              onChange={this.changeCurrentNote}
              defaultValue={this.props.data.notes}
              >
            </input>
            <input type='submit'/>
          </form>
          <br/>
          </div>
        );
      }
    } else {
      return (
        <div key={this.props.data.owner} onClick={this.accClicked}>
        <p>Account holder: {this.props.data.owner}</p>
        <p>Balance: £{parseFloat(this.props.data.amount).toFixed(2)}</p>
        <br/>
        </div>
      );
    }
  },

  accClicked: function (e) {
    e.preventDefault();
    if (this.state.notesHidden === true) {
      this.setState({ notesHidden: false });
    } else {
      this.setState({ notesHidden: true });
      this.setState({ editNotes: false });
    };
  },

  notesClicked: function (e) {
    e.preventDefault();
    if (this.state.editNotes === true) {
      this.setState({ editNotes: false });
    } else {
      this.setState({ editNotes: true });
    };
  },

  changeCurrentNote: function (e) {
    this.setState({ currentNote: e.target.value });
  },

  handleNoteSubmit: function (e) {
    e.preventDefault();
    this.props.updateNotes(this.props.data, this.state.currentNote);
    this.setState({ editNotes: false });
  }

});

module.exports = BankAccount;
