import React, { useState } from 'react';
import '../assets/scss/SignIn.scss';
import { axiosPost, handleInputChange, handleStateChange } from '../utils/globalFunc';

const SignInPage = ({ gotoRegister, setStateApp }) => {

    const [state, setState] = useState({
        contact_no: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await axiosPost('loginProfile', state);
        if (res.status === 'error') {
            alert('Error');
        }
        else if (res.status === 'success') {
            handleStateChange(setStateApp, {
                ...res.data,
                contact_no: state.contact_no,
                route: 'home'
            })
        }
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
                        onChange={(e) => handleInputChange(setState, 'contact_no', e.target.value, 'pureNumber')}
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
