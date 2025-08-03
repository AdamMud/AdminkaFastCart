



export default function Cart2(props) {
    return(
        <div className="flex justify-between  ">
            <div className="flex gap-[5px] items-center">
                <img src={props.img} alt="" />
                <div>
                    <h1 className="text-[20px] font-semibold">{props.name}</h1>
                    <p className="text-[gray]">{props.des}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <h1 className="text-[#10B981] font-semibold text-[20px]">{props.price}</h1>
                <p className="text-[gray]">{props.des2}</p>
            </div>
        </div>
    )
}
