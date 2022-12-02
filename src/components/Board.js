// Create the Board component here
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    setAllTasks,
    setAllColumns,
    setColumnOrders,
    dragColumns, 
    dragTasksSameColumn,
    dragTasksDifferentColumn,
    selectTask
} from './taskSlice';
import dataset  from './dataset';
import Column from './Column';

export function Board() {
    const selected = useSelector(selectTask);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setAllTasks(dataset.tasks));
        dispatch(setAllColumns(dataset.columns));
        dispatch(setColumnOrders(dataset.columnOrder));
    },[dispatch]);

    const onDragStart = () => {
        
    }

    const onDragUpdate = () => {
        
    }

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const column = selected.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...selected,
            columns: {
                ...selected.columns,
                [newColumn.id]: newColumn,
            },
        };
        dispatch(setAllTasks(newState.tasks));
        dispatch(setAllColumns(newState.columns));
        dispatch(setColumnOrders(newState.columnOrder));

    };
  
    return (
        <DragDropContext 
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            {selected.columnOrder.map(columnId => {
                const column = selected.columns[columnId];
                const tasks = column.taskIds.map(taskId => selected.tasks[taskId]);
                return <Column key={column.id} column={column} task={tasks} />;
            })}
        </DragDropContext>
    );
}