import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
    doc,
    setDoc,
    arrayUnion,
    updateDoc
} from 'firebase/firestore'

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

      // firebase
      const columnOrderRef = doc(db, "columnOrder", "col-order");
      setDoc(columnOrderRef, {columnOrder: state.columnOrder});
    },
    dragTasksSameColumn: (state, action) => {
      state.columns = {
        ...state.columns,
        [action.payload.id] : action.payload,
      };

      // firebase
      const columnsRef = doc(db, "columns", action.payload.id);
      updateDoc(columnsRef, state.columns);
    },
    dragTasksDifferentColumn: (state, action) => {
      const {start, finish} = action.payload;
        
      state.columns = {
        ...state.columns,
        [start.id]: start,
        [finish.id]: finish,
      };

      // firebase
      let columnsRef = doc(db, "columns", start.id);
      updateDoc(columnsRef, start);
      columnsRef = doc(db, "columns", finish.id);
      updateDoc(columnsRef, finish);
    },
    addNewTask: (state, action) => {
      const {taskId, colId} = action.payload;
      const newTask = {id: taskId, taskTitle: "New Task", taskDescription: ""}
      state.tasks[taskId] = newTask;
      state.columns[colId].taskIds.push(taskId);

      // firebase
      const taskRef = doc(db, "tasks", taskId);
      setDoc(taskRef, newTask);

      const colRef = doc(db, "columns", colId);
      updateDoc(colRef, {taskIds: arrayUnion(taskId)});
    },
    updateTask: (state, action) => {
      const {id, title, desc} = action.payload;
      const updateTask = {id: id, taskTitle: title, taskDescription: desc}
      state.tasks[id] = updateTask;

      // firebase
      const taskRef = doc(db, "tasks", id);
      setDoc(taskRef, updateTask);
    },
    deleteTask: (state, action) => {
      const {colId, taskIds} = action.payload;
      state.columns[colId] = {
          ...state.columns[colId],
          taskIds: taskIds
      }

      // firebase
      const colRef = doc(db, "columns", colId);
      updateDoc(colRef, {taskIds: taskIds});
    }
  },
});

export const { 
  setCurrTaskIdToEdit,
  setCurrColIdToEdit,
  setDialogStatus,
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
