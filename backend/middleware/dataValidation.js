import { registerSchema, signinSchema } from '../validation/validationSchema.js'

const registerDataValidation = (req,res,next) => {
  
  const {success, error} = registerSchema.safeParse(req.body);
  if (success){
    next();
  }
  else {
    console.error(error);
    res.status(400).json({
      status : false, 
      error
    });
  }
}

const signinDataValidation = (req, res, next) => {
  const {success , error } = signinSchema.safeParse(req.body);
  if (success) {
    next();
  }
  else {
    res.status(400).json({
      status : false,
      error
    });
  }
}

export {
  registerDataValidation,
  signinDataValidation
}