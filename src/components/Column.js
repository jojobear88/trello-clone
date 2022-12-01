// Create the Column component here
import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: white;
    color: black;
    // width: 400px;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {this.props.task.map((task, index) => (
                        <Task key={task.id} task={task} index={index}/>))}
                        {provided.placeholder}
                    </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}