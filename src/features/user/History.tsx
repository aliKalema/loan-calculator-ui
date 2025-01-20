import Result from "./Result";
import {useEffect, useState} from "react";
import axiosInstance from "../shared/AxiosInstance";
import {LoanBreakdown} from "../shared/types/LoanBreakdown";

function History(){
    const [selectedLoan, selectLoan] = useState<LoanBreakdown | null>(null);
    const [loans , setLoans] = useState<LoanBreakdown[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeList, setActiveList] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await  axiosInstance.get("/api/v1/loan-breakdowns");
                setLoans(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(()=>{
            if(loans && loans.length>0){
                selectLoan(loans[0]);
                setActiveList(loans[0].id);
            }
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="flex h-full max-h-full">
            <div className="border-r-2 border-gray-300 w-1/4 ">
                <ul className="w-full">
                    { loans && loans.length > 0 ? loans.map((loan: LoanBreakdown) => (
                    <li className="mb-1" key={loan.id} onClick={() => {
                        selectLoan(loan);
                        setActiveList(loan.id);
                    }}>
                        <input type="radio" className="hidden peer"/>
                        <label
                            className='flex items-center border-b w-full p-2 text-gray-500 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-200' >
                            <div className="border-b">
                                <div className="flex space-x-4 items-center">
                                    <div className="text-slate-500 font-medium text-lg">Principal: {loan.loanRequest.principal}</div>
                                </div>
                                <div className="py-1 font-light flex space-x-4 justify-between">
                                    <div className="">
                                        <b>Interest Rate: </b>
                                        {loan.loanRequest.interest}
                                    </div>
                                    <div className="">
                                        <b>Term: </b>
                                        {loan.loanRequest.term}
                                    </div>
                                </div>
                            </div>
                        </label>
                    </li>
                    )):
                        <li className="p-4 text-gray-500 text-center">
                            You have no loan history
                        </li>
                    }
                </ul>
            </div>

            <div className="w-3/4 px-3">
                {selectedLoan && <Result loanBreakdown={selectedLoan}/>}
            </div>

        </div>
)
}
export default History;