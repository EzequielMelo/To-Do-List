import { datas } from "../Data"

// eslint-disable-next-line react/prop-types
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
                  {data.icon}
                </div>
                <div className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem] text-grey whitespace-pre`}>
                  {data.text}
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default SideBarData
