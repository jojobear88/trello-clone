// Create the Board component here
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    setAllTasks,
    setAllColumns,
    setColumnOrders,
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

  
    return (
        <DragDropContext onDragEnd={() => true}>
            {selected.columnOrder.map(columnId => {
                const column = selected.columns[columnId];
                const tasks = column.taskIds.map(taskId => selected.tasks[taskId]);
                return <Column key={column.id} column={column} task={tasks} />;
            })}
        </DragDropContext>
    );
}