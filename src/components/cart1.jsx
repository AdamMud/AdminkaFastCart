



export default function Cart1(props) {
    return(
        <div className="flex lg:w-[167px] w-[200px] h-[84px] rounded-[10px] items-center justify-around" style={props.style}>
            <img src={props.img} alt="" />
            <div>
                <p className="text-[gray]">{props.name}</p>
                <h1 className="text-black font-semibold text-[30px]">${props.price}</h1>
            </div>
        </div>
    )
}