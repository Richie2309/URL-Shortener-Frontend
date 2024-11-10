import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    general: '',
    username: '',
    email: '',
    password: ''
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordCriteria(criteria);
    return Object.values(criteria).every(Boolean); // Return true if all criteria are met
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '', general: '' }); // Clear specific field error on change

    if (name === "password") {
      validatePassword(value); // Validate password on each change
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!formData.username || !formData.email || !formData.password) {
      setError({
        general: '',
        username: !formData.username ? 'Username cannot be empty' : '',
        email: !formData.email ? 'Email cannot be empty' : '',
        password: !formData.password ? 'Password cannot be empty' : ''
      });
      return;
    }

    // Check if the password meets criteria
    if (!validatePassword(formData.password)) {
      setError({ ...error, password: 'Password does not meet criteria' });
      return;
    }

    try {
      const response = await API.post('/auth/signup', formData);
      if (response.data) {
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error during registration:", error.response);
      setError({ ...error, general: error.response?.data?.error || 'Registration failed' });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error.general && (
            <div className="text-red-500 text-sm mb-4">
              {error.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.username ? 'ring-red-500' : 'ring-gray-300'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
              {error.username && (
                <div className="text-red-500 text-sm mt-1">
                  {error.username}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.email ? 'ring-red-500' : 'ring-gray-300'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              {error.email && (
                <div className="text-red-500 text-sm mt-1">
                  {error.email}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.password ? 'ring-red-500' : 'ring-gray-300'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              {error.password && (
                <div className="text-red-500 text-sm mt-1">
                  {error.password}
                </div>
              )}

              {/* Password criteria */}
              <div className="text-xs mt-2">
                <p className={`text-gray-500 ${passwordCriteria.length ? 'text-green-500' : ''}`}>
                  At least 8 characters
                </p>
                <p className={`text-gray-500 ${passwordCriteria.upper ? 'text-green-500' : ''}`}>
                  At least one uppercase letter
                </p>
                <p className={`text-gray-500 ${passwordCriteria.lower ? 'text-green-500' : ''}`}>
                  At least one lowercase letter
                </p>
                <p className={`text-gray-500 ${passwordCriteria.number ? 'text-green-500' : ''}`}>
                  At least one number
                </p>
                <p className={`text-gray-500 ${passwordCriteria.special ? 'text-green-500' : ''}`}>
                  At least one special character
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
