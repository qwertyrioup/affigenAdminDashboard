import { Button, TextField } from "@mui/material";
import {useState} from 'react'
import { BaseUrl } from "../requests";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux";


const Login = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post(`${BaseUrl}/auth/signin`, {email: email, password: password})
      if(res.data.isAdmin === true) {
        dispatch(loginSuccess(res.data))
        setError(false)
      } else {
        setError(true)
        setMessage("You are not Admin !")
      }

      
    } catch (error) {
      dispatch(loginFailure())
      setError(true)
      setMessage("Please Verify Your Credentials !")
      
    }
  }
  
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#2a3447",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 300,
          height: 375,
          backgroundColor: "#d3d3d3 ",
          boxShadow: "1px 2px 9px #000000",
          margin: "4em",
          padding: "1em",
        }}
      >
        <form onSubmit={(e)=> handleLogin(e)} style={{display: 'flex', flexDirection: 'column', gap: 25, paddingBottom: 25}} >
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15}} >
            <h1 style={{textAlign: 'center', color: '#2a3447', fontFamily: 'Montserrat'}} >Login with your credentials</h1>
          </div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15}} >
            <TextField
              id="outlined-helperText"
              label="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: 200, padding: 0, fontFamily: 'Montserrat' }}
              helperText=""
            />
             <TextField
              id="outlined-helperText"
              label="password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: 200, padding: 0 }}
              helperText=""
            />
          </div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15}} >
            <Button type="submit" style={{ backgroundColor: "#2a3447", fontFamily: 'Montserrat' }} variant="contained">
              Login
            </Button>
          </div>
          {error && <div><p style={{color: 'red', fontFamily: 'Montserrat', textAlign: 'center', marginBottom: 25}} >{message}</p></div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
