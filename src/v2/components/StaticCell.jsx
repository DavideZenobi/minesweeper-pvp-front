
export const StaticCell = ({ cell, size }) => {

    // Problemas con tailwindcss
    const outerDivSize = `w-[${size + 1}px] h-[${size + 1}px]`;
    const innerDivSize = `w-[${size}px] h-[${size}px]`;

    return (
        <>
            {cell.isOpen
                ?
                <div className={`w-[17px] h-[17px] flex items-center justify-center pointer-events-none`}>
                    <div className={`w-[16px] h-[16px] flex items-center justify-center bg-blue-300`}>
                        {cell.isMine
                            ?   <p className="text-red-600 text-center font-bold text-sm m-0">M</p>
                            :   cell.neighborMines === 0
                                ?   null
                                :   <p className="text-center font-bold text-sm m-0">{cell.neighborMines}</p>
                        }
                    </div>
                </div>
                :
                <div className={`w-[17px] h-[17px] flex items-center justify-center pointer-events-none`}>
                    <div className={`w-[16px] h-[16px] bg-gradient-to-b from-cyan-400 to-cyan-600`}>
                        {cell.isFlagged
                            ?   <p className="text-yellow-300 font-bold m-0 text-center text-sm">F</p>
                            :   null
                        }
                    </div>
                </div>
            }
        </>
    )
}