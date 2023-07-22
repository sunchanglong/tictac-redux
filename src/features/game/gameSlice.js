import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [Array(9).fill(0)],
  nextIsX: true,
  currStep: 0,
};


export const counterSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clickCell: (state, action) => {
      let index = action.payload
      let cells = state.history[state.currStep].slice()
      if (cells[index] !== 0 || selectWinner(state)) {
        return
      }
      if (state.nextIsX) {
        cells[index] = 'X'
      } else {
        cells[index] = 'O'
      }
      
      state.history.push(cells)
      state.currStep++
      state.nextIsX = !state.nextIsX
    },
    setCurrStep: (state, action) => {
      let step = action.payload
      state.currStep = step
      if (step % 2 === 0) {
        state.nextIsX = true
      } else {
        state.nextIsX = false
      }
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    
  },
});

export const { clickCell, setCurrStep } = counterSlice.actions;

export const selectCurrCells = (state) => state.history[state.currStep]
export const selectWinner = (state) => {
  let cells = selectCurrCells(state)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let line of lines) {
    let [x, y, z] = line
    // console.log(x, y, z, this.cells)
    if (cells[x] !== 0 && cells[x] === cells[y] && cells[y] === cells[z]) {
      // console.log('calculate winner', cells[x])
      return cells[x]
    }
  }
  return ''
}

export default counterSlice.reducer;