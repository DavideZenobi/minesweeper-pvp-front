import { Cell } from './Cell';

export const Board = ({ cells, onClick }) => {

    return (
        <>
            <div className="flex flex-wrap w-[750px]">
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
    );
}