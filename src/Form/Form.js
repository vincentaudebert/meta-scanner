import React from 'react';
import consecutive from 'consecutive';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const next = consecutive();
  return (
    <form onSubmit={handleSubmit} className="u-margin-bottom-s">
      <div>
        <textarea
          className="textarea"
          name="urls"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.urls}
        />
        {touched.urls &&
          errors.urls &&
          errors.urls.length > 0 &&
          errors.urls.map(errorUrl => <div key={next()}>{errorUrl}</div>)}
      </div>
      <div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InnerForm;
