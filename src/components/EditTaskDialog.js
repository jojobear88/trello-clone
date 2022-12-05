// Create the EditTaskDialog component here
import { Edit } from '@mui/icons-material';
import { IconButton, Button, Dialog, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React,  { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;

export default function EditTaskDialog() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

        return (
            <Container>
                <IconButton aria-label="edit" onClick={handleClickOpen}>
                    <Edit />
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Task Details</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
}