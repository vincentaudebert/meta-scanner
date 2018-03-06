import React from 'react';
import ScannerForm from './Form';

export default class App extends React.Component {
  render() {
    // add loading state + results
    return (
      <div>
        <h2>Meta scanner</h2>
        <ScannerForm />
      </div>
    );
  }
}
