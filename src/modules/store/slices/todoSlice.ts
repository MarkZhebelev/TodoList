import {createSlice} from '@reduxjs/toolkit'

export interface ITodo {
    id: string,
    text: string,
    completed: boolean
}

export interface ITodosState {
    todos: ITodo[],
    currentTodos: ITodo[],
    deletedTodos: ITodo[],
    finishedTodos: ITodo[]
}

const initialState: ITodosState = {
    todos: JSON.parse(sessionStorage.getItem('todos') || '[]'),
    currentTodos: JSON.parse(sessionStorage.getItem('currentTodos') || '[]'),
    deletedTodos: JSON.parse(sessionStorage.getItem('deletedTodos') || '[]'),
    finishedTodos: JSON.parse(sessionStorage.getItem('finishedTodos') || '[]')
}
const createTodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            console.log(action.payload)
            try {
                state.todos.push(
                    {
                        id: new Date().toISOString(),
                        text: action.payload.text,
                        completed: action.payload.completed,
                    }
                );
            } catch (error) {
                console.log(error)
            }
        },
        toggleTodoCompleted(state, action) {
            try {
                const toggleTodo = state.todos.find(todo => todo.id === action.payload.id);
                if (toggleTodo) {
                    toggleTodo.completed = !toggleTodo.completed;
                    if (toggleTodo.completed) {
                        state.finishedTodos.push(toggleTodo)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        removeCurrentTodo(state, action) {
            try {
                const todoToRemove = state.todos.find(todo => todo.id === action.payload.id);
                if (todoToRemove) {
                    state.deletedTodos.push(todoToRemove);
                    state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
                }
            } catch (error) {
                console.log(error)
            }

        },
        removeAllTodos(state, _) {
            try {
                state.deletedTodos.push(...state.todos);
                state.todos = [];
            } catch (error) {
                console.log(error)
            }

        }
    }
})
export const {addTodo, toggleTodoCompleted, removeCurrentTodo, removeAllTodos} = createTodoSlice.actions
export default createTodoSlice.reducer;

