import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import {BASE_URL} from "../../API.js"

const Signup = () => {
	const [data, setData] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [formError, setformError] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setformError(validate(data))
        setisSubmit(true)
        if(Object.keys(formError).length === 0 && isSubmit){
            try {
                const url = `${BASE_URL}/auth/register`;
                const res = await axios.post(url, data);
                navigate("/login");
                console.log(res);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                }
            }
        }
        console.log(formError)
	};

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (values.phone.length !== 10) {
            errors.phone = "Mobile  must be 10 number";
        }

       if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

		if(values.Cpassword!== values.password){
            errors.Cpassword = "Cpassword Not Match"
        }
        return errors;
    }

	return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="signup_form_left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sign in
						</button>
					</Link>
				</div>
				<div className="signup_form_right">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>

						<input
							type="text"
							placeholder="Name"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className="long_input"
						/>
						<input
							type="number"
							placeholder="phone"
							name="phone"
							onChange={handleChange}
							value={data.phone}
							required
							className="long_input"
						/>
						<p style={{color: 'red'}}>{formError.phone}</p>

						<input
							type="string"
							placeholder="email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="long_input"
						/>
						<p style={{color: 'red'}}>{formError.email}</p>

						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="long_input"
						/>
						<p style={{color: 'red'}}>{formError.password}</p>

						<input
							type="password"
							placeholder="Confirm Password"
							name="Cpassword"
							onChange={handleChange}
							value={data.Cpassword}
							required
							className="long_input"
						/>
						<p style={{color: 'red'}}>{formError.Cpassword}</p>
						
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;