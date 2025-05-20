import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Box,
    TextareaAutosize,
    Container,
} from '@mui/material';
import { hasAnyRole } from '../auth/keycloakService';
import RbacWrapper from '../auth/rbacWrapper';

interface Settings {
    title: string;
    description: string;
}

const SettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<Settings>({
        title: 'Settings',
        description: 'Manage your application settings here.',
    });
    const [tempSettings, setTempSettings] = useState<Settings>(settings);
    const [isEditing, setIsEditing] = useState(false);

    const canEdit = hasAnyRole(['ADMIN']);

    const handleEdit = () => {
        setTempSettings(settings);
        setIsEditing(true);
    };

    const handleSave = () => {
        setSettings(tempSettings);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const isSaveDisabled =
        tempSettings.title === settings.title &&
        tempSettings.description === settings.description;

    return (
        <Container maxWidth="sm" style={{ padding: '20px' }}>
            {isEditing && canEdit ? (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Edit Settings
                    </Typography>
                    <Box marginBottom={2}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={tempSettings.title}
                            onChange={(e) =>
                                setTempSettings({ ...tempSettings, title: e.target.value })
                            }
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <Typography variant="body1" gutterBottom>
                            Description:
                        </Typography>
                        <TextareaAutosize
                            minRows={4}
                            style={{ width: '100%' }}
                            value={tempSettings.description}
                            onChange={(e) =>
                                setTempSettings({ ...tempSettings, description: e.target.value })
                            }
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
                        {settings.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {settings.description}
                    </Typography>
                    <RbacWrapper allowedRoles={['ADMIN']} fallback={<>Only Admin can edit this.</>}>
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Edit
                        </Button>
                    </RbacWrapper>
                    
                </Box>
            )}
        </Container>
    );
};

export default SettingsPage;