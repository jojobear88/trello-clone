// Create the TaskAddButton component here
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 8px;
`;
export default class TaskAddButton extends React.Component {
    render() {
        return (
            <Container>
                <Button variant="contained" startIcon={<Add />}>Add a card
                </Button>
            </Container>
        );
    }
}