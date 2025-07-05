import Validator from "validatorjs";

export const registerValidation = (req, res, next) => {
  const validateRule = {
    fullName: "required|string|min:3",
    email: "required|email",
    password: "required|min:6",
    phone_number: "required|digits:10",
    city: "required|string",
  };

  const validation = new Validator(req.body, validateRule);

  if (validation.fails()) {
    // Send validation errors back for better feedback
    return res.status(412).json({ message: "Validation Failed", errors: validation.errors.all() });
  }
  next();
};

export const loginValidation = (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|min:6",
  };

  const validation = new Validator(req.body, validateRule);

  if (validation.fails()) {
    return res.status(412).json({ message: "Validation Failed", errors: validation.errors.all() });
  }
  next();
};
