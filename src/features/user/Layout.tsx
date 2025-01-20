import Calculator from "./Calculator";
import History from "./History";
import {useState} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../shared/AuthProvider";
import {User} from "../shared/types/User";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
const MySwal = withReactContent(Swal);
function Layout(props: TabPanelProps){
    const navigate = useNavigate();
    const { authToken, handleLogin, handleLogout } = useAuth();

    const { children, value, index, ...other } = props;
    const [activeTab, setActiveTab] = useState("Calculator");
    const logout = async () => {
        const result = await MySwal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
            handleLogout();
            navigate('/login');
        } else {
            console.log("Logout canceled");
        }
    };

    const loggedInUser  = ()=>{
        const user = localStorage.getItem("user");
        if(user)
            return JSON.parse(user);
    }

    const initials =  () =>{
        const user: User = loggedInUser();
        return `${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`;
    }

    // Function to handle tab switching
    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="border-gray-200 mb-4">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b-2">
                    <div className="flex items-center space-x-3">
                    <span
                        className="self-center text-slate-700 text-2xl font-semibold whitespace-nowrap">LOAN CALCULATOR</span>
                    </div>
                    <div className="flex items-center md:order-2 space-x-3 space-x-2 md:space-x-8">
                        <button  onClick={logout} type="button" className="font-medium text-red-600 hover:underline cursor-pointer">logout</button>

                        <button type="button"
                                className="flex text-sm bg-blue-600 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300">
                            <div
                                className="w-9 h-9 rounded-full  flex justify-center items-center space-x-1 text-white fon-bold text-lg">
                                <span>{initials()}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className=" flex-1">
                <div className="max-w-screen-xl mx-auto h-full">
                    <div className="h-full flex flex-col">
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                            <li className="me-2">
                                <button
                                    onClick={() => handleTabClick("Calculator")}
                                    className={`inline-block p-4 ${
                                        activeTab === "Calculator"
                                            ? "text-blue-600 bg-gray-100 rounded-t-lg active"
                                            : "hover:text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    Calculator
                                </button>
                            </li>
                            <li className="me-2">
                                <button
                                    onClick={() => handleTabClick("History")}
                                    className={`inline-block p-4 ${
                                        activeTab === "History"
                                            ? "text-blue-600 bg-gray-100 rounded-t-lg active"
                                            : "hover:text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    History
                                </button>
                            </li>
                        </ul>
                        <div className="p-4 flex-1">
                            {activeTab === "Calculator" && <Calculator />}
                            {activeTab === "History" && <History />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;