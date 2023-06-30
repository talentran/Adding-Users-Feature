import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
});

const [networkState, setNetworkState] = useState({
    isLoading: false,
    isSuccess: false,
    error: '',
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    });
};

const validateForm = () => {
    let countErrors = 0;

    if (formData.password.trim().length < 4) {
        countErrors += 1;

        setValidationErrors({
            ...validationErrors,
            password:
                'Password should be equal or more than 4 characters length',
        });
    }

    if (formData.password !== formData.confirmPassword) {
        countErrors += 1;

        setValidationErrors({
            ...validationErrors,
            confirmPassword: 'Both passwords should be equal',
        });
    }

    return countErrors === 0;
};

const createNewUser = async () => {
    try {
        setNetworkState({
            isLoading: true,
            isSuccess: false,
            error: '',
        });

        await axios.post('/users', {
            email: formData.email,
            password: formData.password,
        });

        setNetworkState({
            isLoading: false,
            isSuccess: true,
            error: '',
        });

        resetFormData();
    } catch (e) {
        console.error(e);
        setNetworkState({
            isLoading: false,
            isSuccess: false,
            error: 'Network Error',
        });
    }
};

const resetFormData = () => {
    setFormData({
        email: '',
        password: '',
        confirmPassword: '',
    });
};

const submitHandle = (e) => {
    e.preventDefault();

    if (validateForm()) {
        createNewUser();
    }
};

useEffect(() => {
    resetFormData();
}, [networkState.isSuccess, networkState.isLoading, networkState.error]);

return (
    <form onSubmit={submitHandle}>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                value={formData.email}
                id="email"
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                value={formData.password}
                id="password"
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                value={formData.confirmPassword}
                id="confirmPassword"
                onChange={handleChange}
            />
        </div>
        {validationErrors.email && <p>{validationErrors.email}</p>}
        {validationErrors.password && <p>{validationErrors.password}</p>}
        {validationErrors.confirmPassword && (
            <p>{validationErrors.confirmPassword}</p>
        )}
        {networkState.isSuccess && <p>User was succesfully created!</p>}
        {networkState.error && <p>{networkState.error}</p>}
        <button type="submit" disabled={networkState.isLoading}>
            Submit
        </button>
    </form>
);
};

export default Signup;