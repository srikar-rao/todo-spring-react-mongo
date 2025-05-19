import EditTodo from "../pages/EditTodo";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Todo from "../pages/Todo";
import Todos from "../pages/Todos";
import AdminPage from "../pages/AdminPage";
import ProtectedRoute from "./protectedRoute";
import SettingsPage from "../pages/SettingsPage";

export const routes = [
    {
        path: '/',
        element: <Home/>,
        label: 'Home',
    },
    {
        path: '/create',
        element: <Todo/>,
        label: 'Create',
    },
    {
        path: '/edit',
        element: <EditTodo/>,
        label: 'Edit',
    },
    {
        path: '/todos',
        element: <Todos/>,
        label: 'Todos',
    },
    {
        path: '/admin',
        element: <ProtectedRoute element={<AdminPage />} roles={['ADMIN']} />,
        label: 'Admin',
        roles: ['ADMIN'],
    },
    {
        path: '/settings',
        element: <ProtectedRoute element={<AdminPage/>} roles={['ADMIN', 'USER']} />,
        label: 'Settings',
        roles: ['ADMIN', 'USER'],
    },
    {
        path: '*',
        element: <NotFound/>,
        label: '404',
    },
];
