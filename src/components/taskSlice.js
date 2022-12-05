import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  currTaskIdToEdit: "",
  currColIdToEdit: "",
  isDialogOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    /* Default reducers start */
    // Sets "currTaskIdToEdit" to the id of the current task being edited
    setCurrTaskIdToEdit: (state, action) => {
      state.currTaskIdToEdit = action.payload.taskId
    },
    // Sets "currColIdToEdit" to the id of the current column in which the task is being edited
    setCurrColIdToEdit: (state, action) => {
      state.currColIdToEdit = action.payload.currTaskColId
    },
    // Changes the state of the edit dialog box between open and close
    setDialogStatus: (state, action) => {
      state.isDialogOpen = action.payload
    },
    /* Default reducers end */

    // Add new reducers here
    setAllTasks: (state, action) => {
      state.tasks = action.payload
    },
    setAllColumns: (state, action) => {
      state.columns = action.payload
    },
    setColumnOrders: (state, action) => {
      state.columnOrder = action.payload
    },
    dragColumns: (state, action) => {
      state.columnOrder = action.payload
    },
    dragTasksSameColumn: (state, action) => {
      state.columns = {
        ...state.columns,
        [action.payload.id] : action.payload,
      };
    },
    dragTasksDifferentColumn: (state, action) => {
      state.columns = action.payload;
    },
    addNewTask: (state, action) => {
      state.columns = action.payload;
    },
    updateTask: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = action.payload;
    }
  },
});

export const { 
  setAllTasks, 
  setAllColumns, 
  setColumnOrders, 
  dragColumns, 
  dragTasksSameColumn, 
  dragTasksDifferentColumn,
  addNewTask,
  updateTask,
  deleteTask
} = taskSlice.actions;
export const selectTask = (state) => state.task;

export default taskSlice.reducer;
