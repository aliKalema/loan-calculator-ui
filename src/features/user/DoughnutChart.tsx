import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProp{
    totalInterest: number;
    totalPayment: number;
}

const options: ChartOptions<"doughnut"> = {
    plugins: {
        tooltip: {
            enabled: true,
        },
    },
    cutout: "70%",
};

function DoughnutChart({ totalInterest, totalPayment}: DoughnutChartProp){
    const data = {
        labels: ['Total Interest', 'Total Payment'],
        datasets: [
            {
                label: '',
                data: [totalInterest, totalPayment],
                backgroundColor: [
                    'rgb(22 163 74)',
                    'rgb(37 99 235)'
                ],
                borderColor: [
                    'rgb(22 101 52)',
                    'rgb(30 58 138)'
                ],
                borderWidth: 1,
            },
        ],
    };
    return(
    <div style={{ position: "relative", width: "250px", height: "250px" }}>
        <Doughnut data={data} options={options} />;
    </div>
    );
}

export default DoughnutChart;