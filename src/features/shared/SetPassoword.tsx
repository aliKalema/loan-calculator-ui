import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import {EmailVerificationResponse} from "./types/EmailVerificationResponse";

function SetPassoword(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    const navigate = useNavigate();

    const [input, setInput] = useState({
        token: "",
        password: "",
        confirm: "",
    });

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitEvent = async (e: any) => {
        e.preventDefault();
        if ( input.token !== "" || input.password !== "" || input.confirm !== "") {
            console.log(input.password,"-", input.confirm)
            if( input.confirm.trim() !==  input.password.trim()){
                toast.error("Password Do not Match")
                return;
            }
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/set-password`, {
                    token: input.token,
                    password: input.password.trim(),
                });
                const verificationResponse: EmailVerificationResponse = response.data;
                if(verificationResponse.verified){
                    toast.success("Password Set Successfully");
                    navigate('/login');
                }
                else{
                    toast.error(verificationResponse.message);
                }

            } catch (err) {
                toast.error("Invalid Username or password.");
                console.error(err);
            }
            return;
        }
        toast.error('Please provide valid inputs');
        return;

    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">

                    Loan Calculator
                </a>
                <div
                    className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md  sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Set Password
                    </h2>
                    <p>
                        Your pin has been sent to {email}
                    </p>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmitEvent}>
                        <div className="mb-3">
                            <label>
                                Pin
                                <span className="text-red-500">*</span>
                            </label>
                            <input  name="token" id="token" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                        </div>

                        <div className="mb-3">
                            <label>
                                Password
                                <span className="text-red-500">*</span>
                            </label>
                            <input type="password" name="password" id="password" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                        </div>
                        <div className="mb-3">
                            <label>
                                Confirm Password
                                <span className="text-red-500">*</span>
                            </label>
                            <input  type="password" name="confirm" id="confirm" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500" onChange={handleInput} required/>
                        </div>

                        <button type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Set
                            password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SetPassoword;