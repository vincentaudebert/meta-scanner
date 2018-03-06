import { withFormik } from 'formik';
import InnerForm from './Form';

const mapPropsToValues = props => ({ email: '', password: '' });
const validate = (values, props) => {
  const errors = {};
  if (!values.urls) {
    errors.urls = 'Required';
  }
  return errors;
};

const handleSubmit = (
  values,
  {
    props,
    setSubmitting,
    setErrors /* setValues, setStatus, and other goodies */
  }
) => {
  const { urls } = values;
  console.log(urls);
  setSubmitting(false);
  // fetch(url, {
  //   method: 'get'
  // })
  //   .then(response => {
  //     if (response.ok) {
  //       response.text().then(html => {
  //         const $ = cheerio.load(html);
  //         const title = $('head > title').text();
  //         const description = $('head > meta[name="description"]').attr(
  //           'content'
  //         );
  //         const favicon = $('head > link[rel="shortcut icon"]').attr('href');
  //         console.log(title, description);
  //         console.log(favicon);
  //       });
  //     } else {
  //       console.log('Mauvaise réponse du réseau');
  //     }
  //   })
  //   .catch(function(error) {
  //     console.log(
  //       "Il y a eu un problème avec l'opération fetch: " + error.message
  //     );
  //   });
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
