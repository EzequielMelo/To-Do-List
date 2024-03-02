import { RxDashboard } from "react-icons/rx"
import { FiLogOut } from "react-icons/fi"
import { RiHistoryFill } from "react-icons/ri";
import { FaCheckDouble } from "react-icons/fa6";
import { TbListCheck } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";


export const datas = [
    {
    id: 1,
    icon: <MdOutlineDashboardCustomize />,
    text: "Nuevo Tablero",
    href: "/nuevo-tablero"
    },
    {
    id: 2,
    icon: <TbListCheck />,
    text: "Nueva Lista",
    },
    {
    id: 3,
    icon: <FaCheckDouble />,
    text: "Completadas",
    href: "/completadas"
    },
    {
    id: 4,
    icon: <RiHistoryFill />,
    text: "Historial",
    href: "/historial"
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