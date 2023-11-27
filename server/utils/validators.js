module.exports.validateRegisterInput = (
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    let regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    if (regex.test(email) === false) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};