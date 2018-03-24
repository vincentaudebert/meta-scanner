import React from 'react';
import AppContainer from './App.container';
import { Subscribe } from 'unstated';
import consecutive from 'consecutive';
import CopyButton from './CopyButton';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export const Results = props => {
  const next = consecutive();
  return (
    <Subscribe to={[AppContainer]}>
      {app => {
        if (app.state.results.length === 0) return null;
        return (
          <div>
            <h3>Results</h3>
            <Accordion accordion={false}>
              {app.state.lastSubmission.map(submittedUrl => {
                const foundResult = app.state.results.find(
                  result => result.url === submittedUrl
                );
                let itemBody;
                if (foundResult) {
                  if (foundResult.loading)
                    itemBody = (
                      <div className="u-margin-bottom-s">
                        Loading {submittedUrl}...
                      </div>
                    );
                  else if (foundResult.error !== '')
                    itemBody = (
                      <div className="u-margin-bottom-s">
                        Error for {submittedUrl}: {foundResult.error}
                      </div>
                    );
                  else
                    itemBody = (
                      <div className="u-margin-bottom-s">
                        <div>
                          <CopyButton toCopy={foundResult.url} /> <b>Url:</b>{' '}
                          {foundResult.url}
                        </div>
                        <div>
                          <CopyButton toCopy={foundResult.data.title} />{' '}
                          <b>Title:</b> {foundResult.data.title}
                        </div>
                        <div>
                          <CopyButton toCopy={foundResult.data.description} />{' '}
                          <b>Description:</b> {foundResult.data.description}
                        </div>
                        <div>
                          <CopyButton toCopy={foundResult.data.favicon} />{' '}
                          <b>Favicon:</b> {foundResult.data.favicon}{' '}
                          <img alt="favicon" src={foundResult.data.favicon} />
                        </div>
                      </div>
                    );
                  return (
                    <AccordionItem expanded={true} key={`result-${next()}`}>
                      <AccordionItemTitle>{submittedUrl}</AccordionItemTitle>
                      <AccordionItemBody>{itemBody}</AccordionItemBody>
                    </AccordionItem>
                  );
                }
                return null;
              })}
            </Accordion>
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Results;
