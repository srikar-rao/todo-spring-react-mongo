import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Todo } from '../../models/TodoModel';

const TodoGrid = () => {

    const sampleData : Todo[] = [
        {
            id: 1,
            title: 'Fix Bug',
            description: 'Resolve login issue',
            status: 'IN_PROGRESS',
            isCompleted: false,
            version: 1,
            createdAt: '2025-05-16T08:00:00Z',
            createdBy: 'srikar',
            updatedAt: '2025-05-17T09:30:00Z',
            updatedBy: 'srikar',
            localeCreatedAt: 'May 16, 2025, 8:00 AM',
            localeUpdatedAt: 'May 17, 2025, 9:30 AM',
            tasks: []
        },
          {
              id: 2,
              title: 'Write Docs',
              description: 'API documentation for v2',
              status: 'PENDING',
              isCompleted: true,
              version: 1,
              createdAt: '2025-05-15T14:45:00Z',
              createdBy: 'alex',
              updatedAt: '2025-05-15T16:00:00Z',
              updatedBy: 'alex',
              localeCreatedAt: 'May 15, 2025, 2:45 PM',
              localeUpdatedAt: 'May 15, 2025, 4:00 PM',
              tasks: []
          },
    ];

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


    return (
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            rows={sampleData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight={false}
          />
        </Box>
    );
}

export default TodoGrid;
