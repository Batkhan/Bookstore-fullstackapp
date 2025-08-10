import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const[form,setform] = useState({identifier: "", password: ""});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setform({...form, [e.target.name]:e.target.value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('/api/login', form)
            const {token,user} = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", user.role);
            alert("Login Successful");

            if (user.role === 'admin') {
                navigate("/add")
            }
            else {
                navigate("/api/books");
            }
        }
        catch(err) {
            alert("login failed" + err.response.data.message);
        }
    }


    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin} >
                <label>UserId or Email</label>
                <input type = "text" name= "identifier" value = {form.identifier} onChange={handleChange} required />

                <label>Password</label>
                <input type = "password" name= "password" value={form.password} onChange={handleChange} required />

                <button type="submit">Login</button>
            </form>
            <p>Don't Have an Account, <a href="/register">Click here to register</a></p>
        </div>
    )
};

export default Login;