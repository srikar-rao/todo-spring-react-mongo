import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Todo from "../pages/Todo";
import Todos from "../pages/Todos";

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
        path: '/todos',
        element: <Todos/>,
        label: 'Todos',
    },
    {
        path: '*',
        element: <NotFound/>,
        label: '404',
    },
];
