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
