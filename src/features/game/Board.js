import { useSelector, useDispatch } from 'react-redux'
import {
  clickCell,
  setCurrStep,
  selectCurrCells,
  selectWinner
} from './gameSlice';
function Cell ({index}) {
  // console.log(ticStore.cells)
  console.log('render cell', index)
  let dispatch = useDispatch()
  let cells = useSelector(selectCurrCells)
  return (
    <div className={'cell '} onClick={() => dispatch(clickCell(index))}>
      {/* {index} */}
      {cells[index] === 0 ? '' : cells[index]}
    </div>
  )
}




export default function Board () {
  let cells = []
  for (let i = 0; i < 9; i++) {
    cells.push(<Cell index={i} key={i}></Cell>)
  }
  // console.log(JSON.stringify(ticStore.cells))
  let winner = useSelector(selectWinner)
  let nextIsX = useSelector((state) => state.nextIsX)
  let history = useSelector((state) => state.history)
  let dispatch = useDispatch()
  return (
    <div className='board-wrapper'>
      <div>
        <h4> next is {nextIsX ? 'X' : 'O'}</h4>
        <div className="cell-wrapper">
          {cells}
        </div>
        {winner && <h4>Winer is {winner}</h4>}
      </div>
      <div>
        <h4>History</h4>
        <ul>
          {history.map((v, index) => (
            <li onClick={() => dispatch(setCurrStep(index))} key={index} className='history-item'>go to {index === 0 ? 'start' : index}</li>
          ))}
        </ul>
      </div>
    </div>
  )
  
}