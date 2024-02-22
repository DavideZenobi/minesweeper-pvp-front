import { Cell } from "./Cell";

export const Board = ({ cells, level, onClick }) => {
    const sizes = {
        easy: {
            width: 'w-[350px]',
            height: 'h-[350px]'
        },
        medium: {
            width: 'w-[500px]',
            height: 'h-[500px]'
        },
        hard: {
            width: 'w-[750px]',
            height: 'h-[650px]'
        }
    }

    return (
        <>
            <div className={`flex flex-row flex-wrap ${sizes[level].width} `}>
                {cells.map((row, rowIndex) => (
                    row.map((col, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            cell={cells[rowIndex][colIndex]}
                            onClick={onClick}
                        />
                    ))
                ))}
            </div>
        </>
    )
}