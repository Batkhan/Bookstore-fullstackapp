import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({username: "",email: "",password: ""}) 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await axios.post('/api/register', form);
            alert("Registration is successful. You can now log in");
            navigate("/login");
        }
        catch(err) {
            alert("Registration failed: " + err.response.data.message);
        }
    };
    return (
        <div>
            <h2>REGISTER</h2>
            <form onSubmit={handleRegister} >
                <label>UserId or Email</label>
                <input type = "text" name = "email" value={form.email} onChange={handleChange} required />

                <label>Username</label>
                <input type = "text" name = "username" value={form.username} onChange={handleChange} required />
    
                <label>Password</label>
                <input type = "password" name = "password" value={form.password} onChange={handleChange} required />
                <button type = "submit">Register</button>
            </form>
            <p>Already have an account <a href="/login">Login here </a></p>
        </div>
    );
};

export default Register;