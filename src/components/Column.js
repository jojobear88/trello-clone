// Create the Column component here
import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: white;
    color: black;
    width: 400px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'lightblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref = {provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                        <Droppable droppableId={this.props.column.id} type='task'>
                            {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver = {snapshot.isDraggingOver}
                            >
                                {this.props.task.map((task, index) => (
                                <Task key={task.id} task={task} index={index}/>))}
                                {provided.placeholder}
                            </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}