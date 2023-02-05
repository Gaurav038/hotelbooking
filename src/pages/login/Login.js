import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css"
import {BASE_URL} from "../../API.js"


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async(e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details}); 
            navigate("/")
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE", payload: error.response.data}); 
        }
    }

    return (
    <div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleClick}>
						<h1>Login to Your Account</h1>
						<input
							type="name"
							placeholder="Name"
              id="username"
              onChange={handleChange}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							id="password"
							onChange={handleChange}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error.message}</div>}
						<button type="submit" className="green_btn">
							LogIn
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>


    );
}

export default Login