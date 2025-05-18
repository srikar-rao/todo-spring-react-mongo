import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Todo } from '../../models/TodoModel';
import { useEffect, useState } from 'react';
import { TodoService } from '../../api/services/todoService';

const TodoGrid = () => {


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'title', headerName: 'Title', flex: 1, editable: true },
        { field: 'description', headerName: 'Description', flex: 1.5, editable: true },
        { field: 'status', headerName: 'Status', flex: 1, editable: true },
        { field: 'isCompleted', headerName: 'Completed', flex: 0.7, type: 'boolean', editable: true },
        { field: 'version', headerName: 'Version', flex: 0.5 },
        { field: 'createdBy', headerName: 'Created By', flex: 1 },
        { field: 'updatedBy', headerName: 'Updated By', flex: 1 },
        { field: 'localeCreatedAt', headerName: 'Locale Created At', flex: 1.3 },
        { field: 'localeUpdatedAt', headerName: 'Locale Updated At', flex: 1.3 },
    ];

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
              const data = await TodoService.getAll();
              setTodos(data);
            } catch (error) {
              console.error('Failed to fetch todos:', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchTodos();
    },[])


    return (
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            rows={todos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
    );
}

export default TodoGrid;
