// Create the Board component here
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    setAllTasks,
    setAllColumns,
    setColumnOrders,
    dragColumns, 
    dragTasksSameColumn,
    dragTasksDifferentColumn,
    selectTask
} from './taskSlice';
// import dataset  from './dataset';
import Column from './Column';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';


const Container = styled.div`
    display: flex;
`;

export function Board() {
    const selected = useSelector(selectTask);
    const dispatch = useDispatch();

    useEffect(() => {
        // get all tasks in collection
        const taskQuery = query(collection(db, "tasks"));
        onSnapshot(taskQuery, (res) =>{
            dispatch(setAllTasks(res.docs.reduce(
                (tasksData, d) => ({ ...tasksData, [d.id]: d.data() }),
                {}
              )));
        })

        // get all columns in collection
        const columnQuery = query(collection(db, "columns"));
        onSnapshot(columnQuery, (res) =>{
            dispatch(
                setAllColumns(
                  res.docs.reduce(
                    (columnsData, d) => ({ ...columnsData, [d.id]: d.data() }),
                    {}
                  )
                )
            );
        })

        // get column order in collection
        const colOrderQuery = query(collection(db, "columnOrder"));
        onSnapshot(colOrderQuery, (res) => {
            dispatch(
                setColumnOrders(res.docs.map((d) => d.data().columnOrder).flat())
            );
        });
        // dispatch(setColumnOrders(dataset.columnOrder));
    },[dispatch]);

    const onDragStart = () => {
        
    }

    const onDragUpdate = () => {
        
    }

    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(selected.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            dispatch(dragColumns(newColumnOrder));
            return;
        }

        const start = selected.columns[source.droppableId];
        const finish = selected.columns[destination.droppableId];

        // Move from within column
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
            dispatch(dragTasksSameColumn(newColumn));
            return;
        }

        // Move to another column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };
        
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };
        dispatch(dragTasksDifferentColumn({start: newStart, finish: newFinish}));
    };
  
    return (
        <DragDropContext 
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) => (
                    <Container 
                        {...provided.droppableProps}
                        ref = {provided.innerRef}
                    >
                        {selected.columnOrder.map((columnId, index) => {
                            let column = selected.columns[columnId];
                            console.log(column);
                            let tasks = column.taskIds.map(taskId => selected.tasks[taskId]);
                            console.log(tasks);
                            return <Column key={column.id} column={column} task={tasks} index={index} />;
                        })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}