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

export function Board() {
    const task = useSelector(selectTask);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setAllTasks(dataset.tasks));
        dispatch(setAllColumns(dataset.columns));
        dispatch(setColumnOrders(dataset.columnOrder));
    },[dispatch]);

  
    return (
        <DragDropContext onDragEnd={() => true}>
            {task.columnOrder.map((item) => (
                <Droppable droppableId={item} direction='horizontal' type={item} key={item}>
                    {(provided) => {
                        return (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <span>{task.columns[item].title}</span>
                        </div>)
                }}
                </Droppable>
            ))}
        </DragDropContext>
    );
}