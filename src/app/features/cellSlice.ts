import { createSlice } from "@reduxjs/toolkit";
const initialState: CellState = {
  data: {},
  order: [],
  alertMessage: {
    message: null,
    active: false,
  },
};

export interface CellState {
  data: {
    [key: string]: Cell;
  };
  order: string[];
  alertMessage?: {
    message: null | string;
    active: boolean;
  };
}
export enum Direction {
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

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    updateCell(state, action) {
      const { id, content } = action.payload;

      state.data[id] = { ...state.data[id], content };
    },
    warningMessage(state) {
      state.alertMessage = {
        message: "Are you sure you want to delete this cell?",
        active: true,
      };
    },
    deleteCell(state, action) {
      const { id } = action.payload;

      delete state.data[id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },
    moveCell(state, action) {
      const { id: identity, direction } = action.payload;
      const index = state.order.findIndex((id) => id === identity);
      if (index === 0 && direction === Direction.UP) {
        state.alertMessage = {
          message: "You can't move the cell any further",
          active: true,
        };
        return;
      }
      if (index === state.order.length - 1 && direction === Direction.DOWN) {
        state.alertMessage = {
          message: "You can't move the cell any further",
          active: true,
        };
        return;
      }
      if (direction === Direction.UP) {
        const prevIndex = index - 1;
        state.order[index] = state.order[prevIndex];
        state.order[prevIndex] = identity;
      } else {
        const nextIndex = index + 1;
        state.order[index] = state.order[nextIndex];
        state.order[nextIndex] = identity; //we swap the order of the cells in the order array
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
        cell.id && state.order.splice(index + 1, 0, cell.id);
      }
    },
    clearAlertMessage(state) {
      state.alertMessage = { message: null, active: false };
    },
  },
});

export default cellSlice.reducer;

export const {
  updateCell,
  clearAlertMessage,
  deleteCell,
  moveCell,
  insertCellBefore,
  warningMessage,
} = cellSlice.actions;
export const getData = (state: { cell: CellState }) => state.cell.data;

export const getContent = (state: { cell: CellState }, id: string) =>
  state.cell.data[id]?.content;
export const getOrder = (state: { cell: CellState }) => state.cell.order;
export const getAlertMessage = (state: { cell: CellState }) =>
  state.cell.alertMessage;
export const isActiveMessage = (state: { cell: CellState }) =>
  state.cell?.alertMessage?.active;
