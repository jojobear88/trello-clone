// Create the TaskAddButton component here
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    selectTask,
    setCurrTaskIdToEdit,
    setCurrColIdToEdit,
    setAllColumns,
    setAllTasks
} from './taskSlice';

const Container = styled.div`
    padding: 8px;
`;
export default function TaskAddButton(props) {


    const selected = useSelector(selectTask);
    const dispatch = useDispatch();
    const newTaskId = 'task-' + (Object.keys(selected.tasks).length + 1);
    useEffect(() => {
        dispatch(setCurrTaskIdToEdit({taskId: newTaskId}));
        dispatch(setCurrColIdToEdit({currTaskColId: props.colId}));
    },[dispatch]);

    const handleAdd = () => {
        console.log(newTaskId);
        const newTaskIds = Array.from(selected.columns[props.colId].taskIds);
        newTaskIds.push(newTaskId);
        const newData = {
            ...selected,
            tasks: {
                ...selected.tasks,
                [newTaskId] : {
                    id: newTaskId,
                    taskTitle: 'New Task',
                    taskDescription: ''
                }
            },
            columns: {
                ...selected.columns,
                [props.colId]: {
                    ...selected.columns[props.colId],
                    taskIds: newTaskIds
                }
            }
        }
        dispatch(setAllTasks(newData.tasks));
        dispatch(setAllColumns(newData.columns));
    }

    return (
        <Container>
            <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>Add a card
            </Button>
        </Container>
    );
}