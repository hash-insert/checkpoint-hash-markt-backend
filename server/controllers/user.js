import Customer from "../model/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//     // returns hash
//     console.log(hash);
//     });
//   });

const registerCustomer = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let customer = {
      name,
      email,
      password: hashPassword,
    };
    await Customer.create(customer);
    if (customer) {
      let token = jwt.sign(
        { userid: customer._id },
        process.env.JWT_secret_key,
        { expiresIn: "10h" }
      );
      console.log(token);
    }

    res.cookie("hash", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", //For HTTPS on the production
      sameSite: "strict", //prevent CSRF Attacks
      maxAge: 7 * 24 * 60 * 60,
    });

    res.send("customer succesfully signed up");
  } catch (error) {
    res.send("failed customer register process");
    next();
  }
};

const customerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await Customer.findOne({ email });

    if (!loginUser) {
      res.status(404);
      next(new Error("user not found"));
    }

    const matchpassword = await bcrypt.compare(password, loginUser.password);
    if (!matchpassword) {
      res.status(404);
      next(new Error("invalid credentials"));
    }

    if (loginUser && matchpassword) {
      let token = jwt.sign(
        { userid: loginUser._id },
        process.env.JWT_secret_key,
        { expiresIn: "10h" }
      );
      res.cookie("hash", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", //For HTTPS on the production
        sameSite: "strict", //prevent CSRF Attacks
        maxAge: 7 * 24 * 60 * 60,
      });
      res.json({
        id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
      });
    }
  } catch (error) {
    res.send("error in login endpoint");
  }
};

const logoutCostumer=(req,res,next)=> {
  try {
    res.cookie("hash","",{
      httpOnly:true,
      expires:new Date(0),
     })
     res.status(200).json({msg:"Logging Out customer"})
  } catch (error) {
    console.log("error in logout endpoint")
    next(err)
  }

}

const getCustomer = async (req, res, next) => {
  try {
    const users = await Customer.find();
    res.send(users);
  } catch (error) {
    res.send("customers not found");
    next();
  }
};

const getCustomerByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getcustomer = await Customer.findOne({ _id: id });
    if (getcustomer) {
      res.send(getcustomer.name);
    }
  } catch (error) {
    console.log("error getting customer with id ");
    next(error);
  }
};

export { registerCustomer, getCustomerByID, getCustomer,customerLogin,logoutCostumer};
