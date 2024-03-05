import { Router } from 'express';
import { registerDataValidation, signinDataValidation } from '../middleware/dataValidation.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index.js';

const router = Router();

router.post('/register', registerDataValidation, async (req, res)=>{

  // data is valid so now the verification, if similar user name exists
  const userExist = await User.findOne({
    username : req.body.username
  });

  //if the user exist then give error otherwise create a new user 
  if(userExist){
    // error that the user exits
    res.status(409).json({
      success : false, 
      error : "username already exits."
    });

  }
  else {

    try{
      // create a new user here 
      await User.create({
        username : req.body.username,
        password : req.body.password,
        isAdmin : req.body.isAdmin
      });
      
      res.json({
        success : true, 
        message : "user created successfully."
      })
    }
    catch(e){
      console.error(e);
      res.status(500).json({
        success : false,
        error : e
      })
    }

  } 

});


router.post('/signin', signinDataValidation, async (req,res) => {
  try {
    // find if the ID and the password match then pass the jwt token
    const user = await User.findOne({
      username : req.body.username,
    });
    // console.log(user.name | null);
    if(user){

      if(req.body.password !== user.password){
        res.json( {
          status : false,
          error : "Password does not match."
        });
        
      }
      else {
        // if the password matches
        const payload = {
          id : user.id,
          name : user.username,
          role : user.isAdmin ? "admin": "user"
        }

        try {
          //successfull login
          const jwtToken = jwt.sign(payload, jwtSecret);

          res.json({
            status : true,
            token : "Bearer " + jwtToken
          });

        } catch (error) {
          res.status(500).json({
            status : false,
            error : "Server Error."
          })
        }
      }
    }
    else {
      res.json({
        status : false,
        error : "user does not exits."
      })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status : false,
      error : "server side error."
    })
  }
});

export default router;