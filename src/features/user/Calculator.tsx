import Result from "./Result";
import {useState} from "react";
import toast from "react-hot-toast";
import axiosInstance from "../shared/AxiosInstance";

function Calculator(){
    const [input, setInput] = useState({
        principal: '0',
        term: '0',
        interest: '0'
    });

    const [loanBreakdown, setLoanBreakdown] = useState(undefined)

    const handleSubmitEvent = async (e: any) => {
        e.preventDefault();
        if (input.principal !== '0' || input.term !== '0' || input.interest !== '0') {
            const response = await axiosInstance.post("/api/v1/loan-breakdowns",
                {
                    principal: Number(input.principal),
                    term: Number(input.term),
                    interest: Number(input.interest)
                }
        );
            setLoanBreakdown(response.data);
        } else {
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

    const clearInputs = ()=> {
        setInput({
            principal: '0',
            term: '0',
            interest: '0'
        })
        setLoanBreakdown(undefined);
    }

    return (
        <>
            <form onSubmit={handleSubmitEvent} className="border p-5 rounded-lg bg-white">
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                        Principal
                    </label>
                    <input onChange={handleInput} value={input.principal} type="number" name="principal"
                           className="shadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500 block w-full p-2.5"
                           placeholder="100000" required/>
                </div>

                <div className="w-full flex space-x-4">
                    <div className="mb-4 w-1/2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                            Loan Term (Months)
                        </label>
                        <input onChange={handleInput} value={input.term} type="number" name="term" placeholder="6"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div className="mb-4 w-1/2">
                        <label  className="block mb-2 text-sm font-medium text-gray-900">
                            Interest (%)
                        </label>
                        <input onChange={handleInput} value={input.interest} type="number" name="interest" placeholder="15"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:border-blue-500 block w-full p-2.5 "
                               required/>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button type="submit"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Calculate
                    </button>
                    <button onClick={clearInputs} type="button"
                            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none  inline-flex items-center">
                        Clear Inputs
                    </button>
                </div>
            </form>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded"/>
                <div className="absolute px-4 bg-slate-50 -translate-x-1/2 left-1/2 ">
                   RESULTS
                </div>
            </div>
            {loanBreakdown && <Result loanBreakdown={loanBreakdown} />}
        </>
    )
}

export default Calculator;