import React from 'react';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <textarea
        name="urls"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.urls}
      />
      {touched.urls && errors.urls && <div>{errors.urls}</div>}
    </div>
    <div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </div>
  </form>
);

export default InnerForm;
