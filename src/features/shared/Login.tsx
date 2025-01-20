import {useContext, useState} from "react";
import toast from "react-hot-toast";
import {useAuth} from "./AuthProvider";
import axios from "axios";
import {AuthResponse} from "./types/AuthResponse";
import {useNavigate} from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const { authToken, handleLogin, handleLogout } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const handleSubmitEvent = async (e: any) => {
        e.preventDefault();
        if (input.username !== "" || input.password !== "") {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
                    username: input.username,
                    password: input.password,
                });
                const authResponse: AuthResponse = response.data;
                if(authResponse.authValid && authResponse.accessToken){
                    handleLogin(authResponse.accessToken, authResponse.user);
                    navigate("/user");
                }
                else{
                    toast.error("Invalid Username or password.");
                }
                console.log("Login successful!");
            } catch (err) {
                toast.error("Invalid Username or password.");
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
                                            <p className="mb-4">Please login to your account</p>
                                            <div className="mb-3">
                                                <label>
                                                    Username
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <input  name="username" id="username" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                                            </div>

                                            <div className="relative mb-3">
                                                <label>
                                                    Password
                                                    <span className="text-red-500">*</span>

                                                </label>

                                                <input name="password" id="password" onChange={handleInput} type={showPassword ? 'text' : 'password'} className="pe-10 appearance-none block w-full text-gray-700 w-full border border-gray-200  rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" required/>
                                                <button type="button" onClick={handlePasswordVisibility} className="absolute end-0 top-8 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none">
                                                    {showPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(59 130 246)"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(59 130 246)"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <div>
                                                    <button type="submit"
                                                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mb-3">
                                                        Login
                                                    </button>
                                                </div>

                                                {/* <!--Forgot password link--> */}
                                                <button className="hover:text-blue-600 hover:underlined" onClick={()=>{navigate('/signup')}}>Create Account</button>
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