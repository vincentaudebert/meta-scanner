import { Container } from 'unstated';

const DEFAULT_STATE = {
  history: [],
  results: [],
  lastSubmission: []
};

export default class AppContainer extends Container {
  state = DEFAULT_STATE;

  addToHistory(url) {
    const { history } = this.state;
    history.push(url);
    this.setState({ history });
  }

  addToLastSubmission(url) {
    const { lastSubmission } = this.state;
    lastSubmission.push(url);
    this.setState({ lastSubmission });
  }

  newSubmission() {
    this.setState({ lastSubmission: [] });
  }

  reset() {
    this.setState(DEFAULT_STATE);
  }

  addToResults(url) {
    const newResult = {
      url,
      loading: true,
      done: false,
      error: ''
    };
    const { results } = this.state;
    results.push(newResult);
    this.setState({ results });
  }

  updateResult(url, data, error) {
    const { results } = this.state;
    const foundResult = results.find(result => result.url === url);
    if (foundResult) {
      foundResult.loading = false;
      if (error) foundResult.error = error;
      if (data) foundResult.data = data;
    }
    this.setState({
      results
    });
  }

  setDoneResult(url, done) {
    const { results } = this.state;
    const foundResult = results.find(result => result.url === url);
    if (foundResult) {
      foundResult.done = done;
    }
    this.setState({
      results
    });
  }
}
