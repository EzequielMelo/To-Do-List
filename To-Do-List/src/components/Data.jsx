import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx"
import { FiLogOut } from "react-icons/fi"
import { FaCheckDouble } from "react-icons/fa6";
import { TbListCheck } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";


export const datas = [
    {
    id: 1,
    icon: <AiOutlineHome />,
    text: "Inicio",
    href: "/inicio"
    },
    {
    id: 2,
    icon: <MdOutlineDashboardCustomize />,
    text: "Nuevo Tablero",
    href: "/inicio"
    },
    {
    id: 3,
    icon: <TbListCheck />,
    text: "Nueva Lista",
    },
    {
    id: 4,
    icon: <FaCheckDouble />,
    text: "Completadas",
    href: "/completadas"
    },
    {
    id: 5,
    icon: <RxDashboard />,
    text: "Mis Tableros",
    href: "/mis-tableros"
    },
    {
    id: 6,
    icon: <FiLogOut />,
    text: "Salir",
    href: "/salir"
    },
    
];