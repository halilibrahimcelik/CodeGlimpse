import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: CellState = {
  data: [],
  loading: false,
  error: null,
  order: [],
};

interface CellState {
  data: { id: number }[] | undefined;
  loading: boolean;
  error: null | string;
  order: string[];
}

export const fetchCells = createAsyncThunk("cells/fetchCells", async () => {
  try {
    return [{ id: 1 }];
  } catch (err) {
    console.log(err);
  }
});

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    updateCell(state, action) {
      state.data = action.payload.id;
    },
    deleteCell(state, action) {
      state.data =
        state.data &&
        state.data.filter((cell) => cell?.id !== action.payload.id);
    },
    moveCell(state, action) {},
    insertCellAfter(state, action) {},
    insertCellBefore(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    });
    builder.addCase(fetchCells.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchCells.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      state.data = [];
    });
  },
});

export default cellSlice.reducer;

export const {
  updateCell,
  deleteCell,
  moveCell,
  insertCellAfter,
  insertCellBefore,
} = cellSlice.actions;
export const getCells = (state: { cell: CellState }) => state.cell.data;
export const getLoading = (state: { cell: CellState }) => state.cell.loading;
export const getError = (state: { cell: CellState }) => state.cell.error;
export const getOrder = (state: { cell: CellState }) => state.cell.order;
