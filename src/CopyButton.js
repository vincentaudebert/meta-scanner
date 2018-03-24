import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class CopyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.copied = this.copied.bind(this);
  }

  copied() {
    this.setState({ copied: true });
  }

  render() {
    const { toCopy } = this.props;

    return (
      <CopyToClipboard text={toCopy} onCopy={this.copied}>
        <button
          className={`btn btn--small${this.state.copied ? ' btn--green' : ''}`}
        >
          Copy
        </button>
      </CopyToClipboard>
    );
  }
}

export default CopyButton;
