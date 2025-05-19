import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Box,
    TextareaAutosize,
    Container,
} from '@mui/material';

const SettingsPage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('Settings');
    const [description, setDescription] = useState('Manage your application settings here.');
    const [tempTitle, setTempTitle] = useState(title);
    const [tempDescription, setTempDescription] = useState(description);

    const handleEdit = () => {
        setTempTitle(title);
        setTempDescription(description);
        setIsEditing(true);
    };

    const handleSave = () => {
        setTitle(tempTitle);
        setDescription(tempDescription);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const isSaveDisabled = tempTitle === title && tempDescription === description;

    return (
        <Container maxWidth="sm" style={{ padding: '20px' }}>
            {isEditing ? (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Edit Settings
                    </Typography>
                    <Box marginBottom={2}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <Typography variant="body1" gutterBottom>
                            Description:
                        </Typography>
                        <TextareaAutosize
                            minRows={4}
                            style={{ width: '100%' }}
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-start" gap={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                        >
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {description}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default SettingsPage;