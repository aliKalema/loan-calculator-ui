import DoughnutChart from "./DoughnutChart";
import printJS from "print-js";
import {LoanBreakdown} from "../shared/types/LoanBreakdown";

export interface ResultProp{
    loanBreakdown: LoanBreakdown | undefined;
}

function Result({loanBreakdown}:ResultProp){
    const handlePrint = () => {
        printJS({
            printable: "printable",
            type: "html",
            style: "h1 { color: blue; }",
        });
    };
    return (
        <>
            <div className="flex justify-end items-center">
                <div className="">
                    <button onClick={handlePrint} type="button"  className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                        Print
                    </button>
                </div>
            </div>

            <div className=" rounded bg-white border p-6 md:p-12 rounded-lg mb-12" id="printable">
                <div className="flex justify-between items-center mb-4">
                    <div className="">
                        {loanBreakdown && (
                            <DoughnutChart
                                totalInterest={loanBreakdown.totalInterest}
                                totalPayment={loanBreakdown.totalPayment}
                            />
                        )}
                    </div>

                    <div className="">
                        <div className="w-full">
                            <table>
                                <tbody>
                                <tr className="bg-white ">
                                    <td className="px-6 font-semibold text-lg">
                                        Amount Borrowed:
                                    </td>
                                    <td className="px-6 ">
                                        {loanBreakdown?.loanRequest.principal}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-6 font-semibold text-lg">
                                        Annual Interest Rate:
                                    </td>
                                    <td className="px-6 ">
                                        {loanBreakdown?.loanRequest.interest}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-6 font-semibold text-lg">
                                        Number of Months Payment:
                                    </td>
                                    <td className="px-6 ">
                                        {loanBreakdown?.loanRequest.term}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <hr className="my-5"/>
                                    </td>
                                </tr>
                                <tr className="bg-white ">
                                    <td className="px-6 font-semibold text-lg">
                                        Monthly Payments:
                                    </td>
                                    <td className="px-6 ">
                                        {loanBreakdown?.monthlyPayment}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-6 font-semibold text-lg">
                                        Total Payment
                                    </td>
                                    <td className="px-6 ">
                                        {loanBreakdown?.totalPayment}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-6 font-semibold text-lg">
                                        Total Interest
                                    </td>
                                    <td className="px-6 ">
                                        {loanBreakdown?.totalInterest}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="sm:rounded-lg">
                        <table className="w-full text-sm text-left  text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Month
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Principal Paid
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Interest Paid
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remaining Balance
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            { loanBreakdown && loanBreakdown.paymentSchedule.map((payment, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {payment.month}
                                    </th>
                                    <td className="px-6 py-4">{payment.principalPaid}</td>
                                    <td className="px-6 py-4">{payment.interestPaid}</td>
                                    <td className="px-6 py-4">{payment.remainingBalance}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Result;