import React from "react";
const EditTodo = React.lazy(() => import("../pages/EditTodo"));
const Home = React.lazy(() => import("../pages/Home"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Todo = React.lazy(() => import("../pages/Todo"));
const Todos = React.lazy(() => import("../pages/Todos"));
const AdminPage = React.lazy(() => import("../pages/AdminPage"));
const ProtectedRoute = React.lazy(() => import("./protectedRoute"));
const SettingsPage = React.lazy(() => import("../pages/SettingsPage"));

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
        element: <ProtectedRoute element={<SettingsPage/>} roles={['ADMIN', 'USER']} />,
        label: 'Settings',
        roles: ['ADMIN', 'USER'],
    },
    {
        path: '*',
        element: <NotFound/>,
        label: '404',
    },
];
