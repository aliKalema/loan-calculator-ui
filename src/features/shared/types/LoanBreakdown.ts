import {LoanRequest} from "./LoanRequest";
import {PaymentDetail} from "./PaymentDetail";

export interface LoanBreakdown{
    id: number;
    loanRequest: LoanRequest;
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    paymentSchedule: PaymentDetail[];
}