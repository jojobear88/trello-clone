// Create the EditTaskDialog component here
import { Edit } from '@mui/icons-material';
import { IconButton, Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React,  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    updateTask,
    deleteTask,
    selectTask,
    setCurrTaskIdToEdit,
    setCurrColIdToEdit
} from './taskSlice';

const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;

export default function EditTaskDialog(props) {
    
    const selected = useSelector(selectTask);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrTaskIdToEdit({taskId:props.taskId}));
        dispatch(setCurrColIdToEdit({currTaskColId:props.colId}));
    },[dispatch]);
    const currentTask = selected.tasks[props.taskId];
    const currentColumn = selected.columns[props.colId];
    
    const [open, setOpen ] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [desc, setDescription] = useState(props.desc);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        const newTaskIds = Array.from(currentColumn.taskIds);
        const delIdx = newTaskIds.findIndex(x => x.id === props.taskId);
        newTaskIds.splice(delIdx, 1);
        // const newColumns = {
        //     ...selected.columns,
        //     [currentColumn.id]: {
        //         id: currentColumn.id,
        //         title: currentColumn.title,
        //         taskIds: newTaskIds
        //     }
        // }
        // console.log(newColumns);
        dispatch(deleteTask({colId: currentColumn.id, taskIds: newTaskIds}));
        setOpen(false);
    }
    
    const handleSave = () => {
        const newTasks = {
            ...selected.tasks,
            [currentTask.id] : {
                id: currentTask.id,
                taskTitle: title,
                taskDescription: desc
            }
        }
        dispatch(updateTask(newTasks));
        setOpen(false);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeDesc = (event) => {
        setDescription(event.target.value);
    };
    

    return (
        <Container>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <Edit />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Task Details</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={handleChangeTitle}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={desc}
                    onChange={handleChangeDesc}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDelete}>Delete</Button>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}