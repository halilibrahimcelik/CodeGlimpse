import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import axios from "axios";
import { Middleware } from "redux";
const initialState: CellState = {
  data: {},
  order: [],
  alertMessage: {
    message: null,
    active: false,
  },
  loading: false,
  error: null,
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
  loading: boolean;
  error: string | null;
}
export enum Direction {
  UP = "up",
  DOWN = "down",
}
export type cellType = "code" | "text";

export interface Cell {
  id: string | null;
  direction?: Direction.UP | Direction.DOWN;
  type: cellType;
  content: string;
}

const triggerSaveCells = createAction("cells/triggerSaveCells");

export const saveCellsMiddleware: Middleware =
  (store) => (next) => (action) => {
    switch (action.type) {
      case "cell/updateCell":
      case "cell/deleteCell":
      case "cell/moveCell":
      case "cell/insertCellBefore":
        store.dispatch(triggerSaveCells()); // Dispatch triggerSaveCells action
        break;
      default:
        break;
    }
    return next(action);
  };
export const fetchCells = createAsyncThunk("cells/fetchCells", async () => {
  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const saveCells = createAsyncThunk("cells/saveCells", async () => {
  try {
    const { data, order } = store.getState().cell;
    const cells = order.map((id) => data[id]);
    await axios.post("/cells", { cells });
  } catch (error) {
    console.log(error);
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
    warningMessage(state, action) {
      state.alertMessage = {
        message: action.payload.message
          ? action.payload.message
          : "Are you sure you want to delete this cell?",
        active: action.payload.active ? action.payload.active : true,
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
        content:
          action.payload.type === "code"
            ? `const App=()=>{
return <h1 class="mx-auto text-center uppercase">Hello World</h1>
}

show(<App/>);
      `
            : "",
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCells.fulfilled, (state, action) => {
        if (action.payload) {
          state.order = action.payload.map((cell) => cell.id) as string[];
          state.loading = false;
          state.error = null;
          state.data = action.payload.reduce(
            (acc, cell) => {
              if (cell?.id != null) {
                acc[cell.id] = {
                  ...cell,
                  direction: Direction.DOWN,
                };
              }
              return acc;
            },
            {} as CellState["data"]
          );
        }
      })
      .addCase(fetchCells.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCells.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })

      .addCase(saveCells.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(triggerSaveCells, () => {
        saveCells();
      });
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

const getCells = (state: RootState) => state.cell;

export const useCumulativeCode = (cellId: string) => {
  return createSelector([getCells], (cell) => {
    const orderedCells = cell.order.map((id) => cell.data[id]);

    const showFn = `
   import _React from 'react';
   import _ReactDom from 'react-dom';

   var show=(input)=>{
     const root = document.querySelector("#root");
     if(typeof input === 'object'){
       if(input.$$typeof && input.props){
         //this is for react elements
        _ReactDom.render(input,root)
           
         
       }else{
         root.innerHTML = JSON.stringify(input);
       }
     }
     else{
       root.innerHTML = input;
     }

   }
   `;
    const showFnNoop = `var show=()=>{}`;
    const cumulativeContent = [];
    for (const c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeContent.push(showFn);
        } else {
          cumulativeContent.push(showFnNoop);
        }
        cumulativeContent.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeContent;
  });
};
