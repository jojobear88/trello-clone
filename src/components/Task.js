// Create the Column component here
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
`;
export default class Task extends React.Component {
    render() {
        console.log(this.props.task);
        return <Container>{this.props.task.taskTitle}</Container>
    }
}