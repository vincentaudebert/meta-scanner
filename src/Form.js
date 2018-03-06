import Formsy from 'formsy-react';
import React from 'react';
import UrlInput from './Input';
import cheerio from 'cheerio';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = { canSubmit: false };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model) {
    const { url } = model;
    fetch(url, {
      method: 'get'
    })
      .then(response => {
        if (response.ok) {
          response.text().then(html => {
            const $ = cheerio.load(html);
            const title = $('head > title').text();
            const description = $('head > meta[name="description"]').attr(
              'content'
            );
            const favicon = $('head > link[rel="shortcut icon"]').attr('href');
            console.log(title, description);
            console.log(favicon);
          });
        } else {
          console.log('Mauvaise réponse du réseau');
        }
      })
      .catch(function(error) {
        console.log(
          "Il y a eu un problème avec l'opération fetch: " + error.message
        );
      });
  }

  render() {
    return (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <UrlInput
          name="url"
          validations="isUrl"
          validationError="This is not a valid url"
          required
        />
        <button type="submit" disabled={!this.state.canSubmit}>
          Submit
        </button>
      </Formsy>
    );
  }
}
