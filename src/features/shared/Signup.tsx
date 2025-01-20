import {useContext, useState} from "react";
import toast from "react-hot-toast";
import {useAuth} from "./AuthProvider";
import axios from "axios";
import {AuthResponse} from "./types/AuthResponse";
import {useNavigate} from "react-router-dom";

function Login(){
    const navigate = useNavigate();

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        email: ""
    });

    const handleSubmitEvent = async (e: any) => {
        e.preventDefault();
        if (input.firstName !== "" || input.lastName !== "" || input.email !== "" || input.phone !== "" || input.username !== "") {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    username: input.username,
                    phone: input.phone,
                    email: input.email
                });
                const authResponse: AuthResponse = response.data;
                navigate(`/set-password?email=${input.email}`);
            } catch (err) {
                toast.error("Something Went wrong");
                console.error(err);
            }
        }
        else{
            toast.error('Please provide valid inputs')
        }
    };

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section className="h-screen bg-neutral-200">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg">
                            <div className="g-0 lg:flex lg:flex-wrap">

                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">

                                        <div className="text-center">
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                               LOAN CALCULATOR
                                            </h4>
                                        </div>

                                        <form onSubmit={handleSubmitEvent}>
                                            <h2 className="text-2xl font-semibold">Sign Up</h2>
                                            <p className="mb-4">Please fill the form below to create your account</p>
                                            <div className="mb-3">
                                                <label>
                                                    Username
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <input  name="username" id="username" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                                            </div>

                                            <div className="flex space-x-4">
                                                <div className="mb-3">
                                                    <label>
                                                        First Name
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <input  name="firstName" id="firstName" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                                                </div>

                                                <div className="mb-3">
                                                    <label>
                                                        Last Name
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <input  name="lastName" id="lastName" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                                                </div>
                                            </div>

                                            <div className="flex space-x-4">
                                                <div className="mb-3">
                                                    <label>
                                                        Email
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <input  name="email" id="email" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                                                </div>

                                                <div className="mb-3">
                                                    <label>
                                                        Phone Number
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <input  name="phone" id="phone" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                                                </div>
                                            </div>

                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <div>
                                                    <button type="submit"
                                                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mb-3">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-sky-500 to-blue-500"
                                    // style={{
                                    //     background:
                                    //         "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                    // }}
                                >
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            We are more than just a company
                                        </h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Login;