import { useState} from "react";
import { BiChevronLeft } from "react-icons/bi"
import UserProfile from "./components/UserProfile";
import SideBarData from "./components/SideBarData";


// eslint-disable-next-line react/prop-types
const Sidebar = ({ onSidebarItemClick }) => {
    const [toggle, setToggle] = useState(false)
    const [clickedItem, setClickedItem] = useState(null)

    const handleItemClick = (item) => {
        setClickedItem(item);
        if (onSidebarItemClick) {
            onSidebarItemClick(item); // Llama a la función proporcionada por el padre
        }
    };
    
    return(
       <div className= {`${toggle ? "w-[5.8rem]" : ""} sidebar-container`}>
        <UserProfile toggle={toggle} />
        <SideBarData toggle={toggle} onItemClick={handleItemClick} />
        <div className="absolute top-[7rem] flex justify-center items-center
        -left-5 w-10 h-10 bg-glass rounded-full cursor-pointer" 
        onClick={() => setToggle(!toggle)}>
            <BiChevronLeft className={`${toggle ? "rotate-180" : ""} text-3xl transition-all duration-300 text-grey`}/>
        </div>
       </div> 
    )
}

export default Sidebar