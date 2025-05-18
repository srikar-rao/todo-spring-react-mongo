import Box from '@mui/material/Box';
import { DataGrid, type GridColDef, type GridRenderCellParams, type GridRowModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import type { RootState } from '../../app/store';
import { fetchTodosRequest, deleteTodoRequest, updatedTodoRequest, type TodoGridState } from './todoGridSlice';
import { Menu, MenuItem, IconButton, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TodoStatusEnum, type Todo } from '../../models/TodoModel';

const TodoGrid = () => {
  const dispatch = useAppDispatch();
  const todosGrid: TodoGridState = useAppSelector((state: RootState) => state.todoGrid);

  const handleDelete = (id: number) => {
    dispatch(deleteTodoRequest(id));
  };

  const handleComplete = (todoRow: GridRowModel<Todo>) => {
    const updatedTodo: Todo = {
      ...todoRow,
      isCompleted: true,
      status: TodoStatusEnum.COMPLETED,
    };
    dispatch(updatedTodoRequest(updatedTodo));
  };

  const handleRefresh = () => {
    dispatch(fetchTodosRequest());
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'title', headerName: 'Title', flex: 1, editable: true },
    { field: 'description', headerName: 'Description', flex: 1.5, editable: true },
    { field: 'targetDate', headerName: 'Target Date', flex: 1.5, editable: true },
    { field: 'status', headerName: 'Status', flex: 1, editable: true },
    { field: 'isCompleted', headerName: 'Completed', flex: 0.7, type: 'boolean', editable: true },
    { field: 'version', headerName: 'Version', flex: 0.5 },
    { field: 'createdBy', headerName: 'Created By', flex: 1 },
    { field: 'updatedBy', headerName: 'Updated By', flex: 1 },
    { field: 'localeCreatedAt', headerName: 'Locale Created At', flex: 1.3 },
    { field: 'localeUpdatedAt', headerName: 'Locale Updated At', flex: 1.3 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        return (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleDelete(params.row.id);
                  handleMenuClose();
                }}
              >
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleComplete(params.row);
                  handleMenuClose();
                }}
              >
                Complete
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  return (
    <>
      <h4>Last fetched at : {todosGrid.lastFetchedAt}</h4>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={todosGrid.todos}
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
    </>
  );
};

export default TodoGrid;
