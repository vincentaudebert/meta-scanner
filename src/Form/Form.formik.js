import { withFormik } from 'formik';
import InnerForm from './Form';
import cheerio from 'cheerio';
import { extractRootUrl } from './utils';

const mapPropsToValues = props => ({
  urls: 'https://www.google.fr\nhttps://vincentaudebert.github.io'
});
const validate = (values, props) => {
  const errors = {};

  const { urls } = values;
  if (!urls) {
    if (!errors.urls) errors.urls = [];
    errors.urls.push('Field is required');
  }
  const splitUrls = urls.split('\n');
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  splitUrls.forEach(url => {
    if (url !== '' && !urlRegex.test(url)) {
      if (!errors.urls) errors.urls = [];
      errors.urls.push(`Invalid URL: ${url}`);
    }
  });
  return errors;
};

const getUrlPromise = url => {
  return fetch(url, {
    method: 'get'
  });
};

const handleSubmit = (
  values,
  {
    props,
    setSubmitting,
    setErrors /* setValues, setStatus, and other goodies */
  }
) => {
  const { app } = props;
  const { urls } = values;
  setSubmitting(false);
  app.newSubmission();
  const splitUrls = urls.split('\n');
  splitUrls.forEach(url => {
    app.addToLastSubmission(url);
    app.addToResults(url);
    const urlPromise = getUrlPromise(url);
    urlPromise
      .then(response => {
        if (response.ok) {
          response.text().then(html => {
            const $ = cheerio.load(html);
            const title = $('head > title').text();

            let description = $('head > meta[name="description"]').attr(
              'content'
            );
            if (!description) {
              description = $('head > meta[property="og:description"]').attr(
                'content'
              );
            }

            let favicon = $('head > link[rel="shortcut icon"]').attr('href');
            if (favicon.indexOf('://') === -1) {
              const rootUrl = extractRootUrl(url);
              favicon = `${rootUrl}${favicon}`;
            }

            const metadata = {
              title,
              description,
              favicon
            };
            app.updateResult(url, metadata);
          });
        } else {
          app.updateResult(url, undefined, 'Bad network response');
        }
      })
      .catch(error => {
        app.updateResult(
          url,
          undefined,
          `An error occurred while fetching ${error.message}`
        );
      });
  });
};

// Wrap our form with the using withFormik HoC
const ScannerForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues,
  // Add a custom validation function (this can be async too!)
  validate,
  // Submission handler
  handleSubmit
})(InnerForm);

export default ScannerForm;
