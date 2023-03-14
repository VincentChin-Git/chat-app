import React, { useState } from 'react';
import '../assets/scss/Register.scss';
import { alertObj, axiosPost, handleInputChange } from '../utils/globalFunc';

const RegisterPage = ({ gotoSignIn }) => {
    const [state, setState] = useState({
        name: "",
        contact_no: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await axiosPost('newProfile', state);
        if (res.status === 'error') {
            alert('Error');
        }
        else if (res.status === 'duplicate') {
            alert('Duplicate account found, please register with another contact number.');
        }
        else if (res.status === 'success') {
            gotoSignIn();
        }
    };

    return (
        <div className='register-form-wrapper'>
            <form onSubmit={handleSubmit} className="register-form">
                <h1 className="logo">Babel Chat</h1>
                <div className="form-group">
                    <label htmlFor="name" className="label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={state.name}
                        onChange={(e) => handleInputChange(setState, 'name', e.target.value, 'text')}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact_no" className="label">Contact Number:</label>
                    <input
                        type="text"
                        id="contact_no"
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
                        onChange={(e) => handleInputChange(setState, 'password', e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Register</button>
                <div className="signin-link">
                    <span>Already have an account? </span>
                    <span className="link-text" onClick={gotoSignIn} >Login here</span>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
