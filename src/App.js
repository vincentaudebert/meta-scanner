import React from 'react';
import ScannerForm from './Form/Form.formik';
import AppContainer from './App.container';
import { Subscribe } from 'unstated';
import Results from './Results';

const App = () => (
  <div>
    <h2>Meta scanner</h2>
    <Subscribe to={[AppContainer]}>
      {app => <ScannerForm app={app} />}
    </Subscribe>
    <Results />
  </div>
);

export default App;
