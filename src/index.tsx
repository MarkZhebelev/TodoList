import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './modules/store/store';
import {createBrowserRouter, Navigate, RouterProvider,} from 'react-router-dom';
import { AuthModule, ProtectedRoute } from './modules/AuthModule';
import {TodosModule} from './modules/TodosModule';

const router = createBrowserRouter([
        {
            path: "/",
            element: <Provider store={store}> <App/></Provider>,
            children: [
                {
                    index: true,
                    element: <Navigate to="/auth" replace />
                },
                {
                    path: "auth",
                    element: <AuthModule />
                },
                {
                    path: "todolist",
                    element: (
                        <ProtectedRoute>
                            <TodosModule />
                        </ProtectedRoute>
                    ),
                },
            ],
        }
    ]
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();

