export const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

export const makeHandleSubmit = (form, fn) => event => {
  event.preventDefault();

  form.validateFields((err, values) => {
    try {
      fn(err, values);
    } catch (e) {
      // antd form hides errors
      console.error(e);
    }
  });
};

export const getFieldErrors = (form, values, errors) => {
  const fields = {};

  Object.keys(errors).forEach(k => {
    if (errors[k]) {
      fields[k] = {
        value: values[k],
        errors: [new Error(errors[k])],
      };
    }
  });

  return fields;
};
