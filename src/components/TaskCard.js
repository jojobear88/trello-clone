// Create the TaskCard component here
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import EditTaskDialog from './EditTaskDialog';
import {
} from './taskSlice';

const Container = styled.div`
    position: relative;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Title = styled.p`
    font-weight: medium;
    font-size: 18px;
`;
const Description = styled.span`
    font-weight: normal;
    font-size: 14px;
`;
export default class TaskCard extends React.Component {
    render() {
        return (
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                    isDragging = {snapshot.isDragging}
                >
                    <Title>{this.props.task.taskTitle}</Title>
                    <Description>{this.props.task.taskDescription}</Description>
                    <EditTaskDialog 
                        colId={this.props.colId} 
                        taskId={this.props.task.id} 
                        title={this.props.task.taskTitle} 
                        desc={this.props.task.taskDescription
                    }></EditTaskDialog>
                </Container>
            )}
        </Draggable>
        );
    }
}