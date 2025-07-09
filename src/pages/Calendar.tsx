import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";

import { useNavigate } from "react-router-dom";

const Calendar = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-quaternary text-white px-4 md:px-10 py-12 flex relative">
            <BackgroundGradient />
            <Navbar onClick={() => navigate('/home')} />
            

        </div>
    );
};

export default Calendar;
