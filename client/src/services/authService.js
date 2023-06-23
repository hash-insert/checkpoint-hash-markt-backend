import axios from 'axios';
const URL = 'http://localhost:8000';
const Signup = `${URL}/api/auth/signin`
const login = `${URL}/api/auth/login`

const Backsignup = async (name, email, password) => {
    try {
      console.log(name,password,email)
      const response = await axios.post(Signup, { name, email, password });
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
const backLogin =async (email, password)=>{
  try{
    const response = await axios.post(login, {email,password})
    console.log(response.data)
    return response.data
  }
  catch(err){
    console.log(err)
  }
}
  export {Backsignup, backLogin}