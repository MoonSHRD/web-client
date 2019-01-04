export const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

export const makeHandleSubmit = (form, fn) => event => {
  event.preventDefault();

  form.validateFields((err, values) => {
    try {
      fn(err, values);
    } catch (e) {
      console.error(e);
    }
  });
};
