import { Link } from "react-router-dom"
import { datas } from "./Data"
import PropTypes from 'prop-types'; 

const SideBarData = ({ toggle, onItemClick }) => {
  return (
    <div className=''>
      {datas.map(data => {
        return(
            <div className={`${ toggle ? "last:w-[3.6rem]" : "last:w-[15rem]"} sidebar last:absolute left-4 bottom-4`}
             key={data.id}
             onClick={() => onItemClick(data)}            
            >
                <div className="mr-8 text-[1.7rem] text-grey">
                  <Link to={data.href}>{data.icon}</Link>
                </div>
                <div className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem] text-grey whitespace-pre`}>
                  <Link to={data.href}>{data.text}</Link>
                </div>
            </div>
        )
      })}
    </div>
  )
}

SideBarData.propTypes = {
  toggle: PropTypes.bool,
  onItemClick: PropTypes.func,
}

export default SideBarData
