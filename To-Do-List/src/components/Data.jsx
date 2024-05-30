import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx"
import { FiLogOut } from "react-icons/fi"
import { FaCheckDouble } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";

export const datas = [
  {
    id: 1,
    icon: <AiOutlineHome />,
    text: "Inicio",
    href: "/inicio"
  },
  {
    id: 2,
    icon: <FaListUl />,
    text: "Tablero en uso",
    href: "/inicio"
  },
  {
    id: 3,
    icon: <RxDashboard />,
    text: "Mis Tableros",
    href: "/mis-tableros"
  },
  {
    id: 4,
    icon: <FaCheckDouble />,
    text: "Completadas",
    href: "/completadas"
  },
  {
    id: 5,
    icon: <FiLogOut />,
    text: "Salir",
    href: "/salir"
  },
];