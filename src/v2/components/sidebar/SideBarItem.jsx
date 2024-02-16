

export const SideBarItem = ({ text, icon, onClick, styleOptions }) => {

    return (
        <>
            <div onClick={onClick} className={`flex flex-row justify-center lg:justify-start items-center transition-colors duration-200 w-full gap-x-2 h-12 font-bold text-slate-300 hover:bg-gray-700 hover:cursor-pointer ${styleOptions ? styleOptions : null}`}>
                <img src={icon} alt="pvp" className={`w-6 h-6 mx-3 ${styleOptions ? styleOptions : null}`}></img>
                <p className="hidden lg:flex">{text}</p>
            </div>
        </>
    )
}