import React, { useState } from 'react';
import '../assets/scss/SignIn.scss';
import { handleInputChange } from '../utils/globalFunc';

const SignInPage = ({ gotoRegister }) => {

    const [state, setState] = useState({
        contact_no: "",
        password: "",
    })

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className='signin-form-wrapper'>
            <form onSubmit={handleSubmit} className="signin-form">
                <h1 className="logo">Babel Chat</h1>
                <div className="form-group">
                    <label htmlFor="contactNo" className="label">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNo"
                        value={state.contact_no}
                        onChange={(e) => handleInputChange(setState, 'contact_no', e.target.value, 'text')}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={state.password}
                        onChange={(e) => handleInputChange(setState, 'password', e.target.value, 'text')}
                        className="input"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Sign In</button>
                <div className="register-link">
                    <span>Or </span>
                    <span className="link-text" onClick={gotoRegister} >create an account</span>
                </div>
            </form>
        </div>
    );
}

export default SignInPage;
