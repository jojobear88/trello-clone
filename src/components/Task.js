// Create the Column component here
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;
const Title = styled.p`
    font-weight: medium;
    font-size: 18px;
`;
const Description = styled.span`
    font-weight: normal;
    font-size: 14px;
`;
export default class Task extends React.Component {
    render() {
        return (
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                >
                    <p>{this.props.task.taskTitle}</p>
                    <Description>{this.props.task.taskDescription}</Description>
                </Container>
            )}
        </Draggable>
        );
    }
}