import React from 'react';
import AppContainer from './App.container';
import { Subscribe } from 'unstated';
import consecutive from 'consecutive';

export const Results = props => {
  const next = consecutive();
  return (
    <Subscribe to={[AppContainer]}>
      {app => {
        if (app.state.results.length === 0) return null;

        return (
          <div>
            <h3>Results</h3>
            {app.state.lastSubmission.map(submittedUrl => {
              const foundResult = app.state.results.find(
                result => result.url === submittedUrl
              );
              if (foundResult) {
                if (foundResult.loading)
                  return (
                    <div key={`result-${next()}`}>
                      Loading {submittedUrl}...
                    </div>
                  );
                return (
                  <div
                    key={`result-${next()}`}
                    style={{ marginBottom: '10px' }}
                  >
                    <div>Url: {foundResult.url}</div>
                    <div>Title: {foundResult.data.title}</div>
                    <div>Description: {foundResult.data.description}</div>
                    <div>Favicon: {foundResult.data.favicon}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Results;
