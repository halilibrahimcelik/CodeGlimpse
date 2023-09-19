import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: CellState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

export interface CellState {
  data: {
    [key: string]: Cell;
  };
  loading: boolean;
  error: null | string;
  order: string[];
}
enum Direction {
  UP = "up",
  DOWN = "down",
}
export type cellType = "code" | "text";

export interface Cell {
  id: string | null;
  direction: Direction.UP | Direction.DOWN;
  type: cellType;
  content: string;
}

export const fetchCells = createAsyncThunk("cells/fetchCells", async () => {
  try {
    return [];
  } catch (err) {
    console.log(err);
  }
});

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    updateCell(state, action) {
      const { id, content } = action.payload;
      state.data[id] = { ...state.data[id], content };
    },
    deleteCell(state, action) {
      const { id } = action.payload;
      delete state.data[id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },
    moveCell(state, action) {
      const { id: identity, direction } = action.payload;
      const index = state.order.findIndex((id) => id === identity);
      if (index < 0 || index > state.order.length - 1) return;
      if (direction === Direction.UP) {
        state.order[index] = state.order[index - 1];
        state.order[index - 1] = identity;
      } else {
        state.order[index] = state.order[index + 1];
        state.order[index + 1] = identity; //we swap the order of the cells in the order array
      }
    },
    insertCellBefore(state, action) {
      const randomId = () => {
        return Math.random().toString(36).substring(2, 5);
      };
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: "",
        direction: Direction.UP,
      };
      cell.id ? (state.data[cell.id] = cell) : false; // => we add the new cell to the data object
      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        cell.id && state.order.unshift(cell.id);
      } else {
        cell.id && state.order.splice(index, 0, cell.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = {};
    });
    builder.addCase(fetchCells.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.data = {};
    });
    builder.addCase(fetchCells.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      state.data = {};
    });
  },
});

export default cellSlice.reducer;

export const { updateCell, deleteCell, moveCell, insertCellBefore } =
  cellSlice.actions;
export const getData = (state: { cell: CellState }) => state.cell.data;
export const getLoading = (state: { cell: CellState }) => state.cell.loading;
export const getError = (state: { cell: CellState }) => state.cell.error;
export const getContent = (state: { cell: CellState }, id: string) =>
  state.cell.data[id]?.content;
export const getOrder = (state: { cell: CellState }) => state.cell.order;
