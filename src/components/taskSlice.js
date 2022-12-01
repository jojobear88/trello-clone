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
  },
});

export default taskSlice.reducer;
