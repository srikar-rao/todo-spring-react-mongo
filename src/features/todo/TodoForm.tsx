import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { TodoService } from '../../api';
import { TodoStatusEnum, type Todo } from '../../models/TodoModel';

const TodoForm: React.FC = () => {
    const [todo, setTodo] = useState<Todo>({
        id: 0,
        title: '',
        description: '',
        targetDate: new Date(),
        status: TodoStatusEnum.PENDING,
        isCompleted: false,
        version: 1,
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        localeCreatedAt: '',
        localeUpdatedAt: '',
        tasks: [],
    });

    const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | null }>({
        message: '',
        severity: null,
    });

    const setTitle = (title: string) => setTodo(prev => ({ ...prev, title }));
    const setDescription = (description: string) => setTodo(prev => ({ ...prev, description }));
    const setTargetDate = (targetDate: string) => setTodo(prev => ({ ...prev, targetDate: new Date(targetDate), localeCreatedAt: targetDate }));

    const isFormValid = todo.title.trim() !== '' && todo.description.trim() !== '' && todo.localeCreatedAt.trim() !== '';
    const isFormDirty = todo.title.trim() !== '' || todo.description.trim() !== '' || todo.localeCreatedAt.trim() !== '';

    const handleSave = () => {
        console.log('Save clicked', { title: todo.title, description: todo.description, targetDate: todo.localeCreatedAt });
        const todoWithStatus = { ...todo, status: TodoStatusEnum.PENDING };
        TodoService.create(todoWithStatus)
            .then(() => {
                console.log('Todo created successfully');
                setNotification({ message: 'Todo saved successfully!', severity: 'success' });
                setTitle('');
                setDescription('');
                setTargetDate('');
            })
            .catch((error) => {
                console.error('Error creating todo:', error);
                setNotification({ message: 'Error saving todo. Please try again.', severity: 'error' });
            });
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setTargetDate('');
        console.log('Cancel clicked');
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', severity: null });
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: '0 auto',
                mt: 4,
            }}
        >
            <Typography variant="h5" textAlign="center">
                Create Todo
            </Typography>
            {notification.severity && (
                <Snackbar
                    open={!!notification.message}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            )}
            <TextField
                label="Title"
                variant="outlined"
                value={todo.title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                value={todo.description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                required
            />
            <TextField
                label="Target Date"
                type="date"
                variant="outlined"
                value={todo.localeCreatedAt}
                onChange={(e) => setTargetDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isFormValid}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    disabled={!isFormDirty}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default TodoForm;