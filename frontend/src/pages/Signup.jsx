import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/signup", formData);
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
        } catch (error) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            // alert("Error signing up:", error);
        } finally{
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <p className="text-center text-gray-600 mb-8">Join us and enjoy all our features!</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className="block text-gray-700 text-lg font-semibold">First Name</label>
                        <input required
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-gray-700 text-lg font-semibold">Last Name</label>
                        <input required
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-lg font-semibold">Email</label>
                        <input required
                            type="email"
                            id="username"
                            name="username"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-12 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-lg font-semibold">Password</label>
                        <input required
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full h-12 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-12 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">Already have an account? <Link to="/signin" className="text-blue-500 font-semibold hover:underline">Sign In</Link></p>
            </div>
        </div>
    );
};

export default Signup;
