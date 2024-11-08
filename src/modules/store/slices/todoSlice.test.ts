import todoReducer, {
    addTodo,
    toggleTodoCompleted,
    removeCurrentTodo,
    removeAllTodos,
} from './todoSlice';

describe('test todo slice', ()=> {

    const emptyAction = { type: '' };

    it('should return the initial state', () => {
        const initialState = {
            todos: [],
            currentTodos: [],
            deletedTodos: [],
            finishedTodos: []
        }
        expect(todoReducer(undefined, emptyAction)).toEqual(initialState);
    });

    it('should add a new todo task', () => {
        const initialState = {
            todos: [],
            currentTodos: [],
            deletedTodos: [],
            finishedTodos: []
        }
        const action = addTodo({
            id: new Date().toISOString(),
            text: 'adding task',
            completed: false
        })
        const nextState = todoReducer(initialState, action);

        expect(nextState.todos.length).toBe(1);
        expect(nextState.todos[0].text).toBe('adding task');
        expect(nextState.todos[0].completed).toBe(false);
        expect(nextState.todos[0].id).toBeDefined()
    })

    it('should change completed of todo task', () => {
        const initialState = {
            todos: [{ id: '1', text: 'Task to remove', completed: false }],
            currentTodos: [],
            deletedTodos: [],
            finishedTodos: []
        }
        const action = toggleTodoCompleted({ id: '1' })
        const nextState = todoReducer(initialState, action);

        expect(nextState.todos[0].completed).toBe(true);

    })

    it('should remove current todo task from todos', () => {
        const initialState = {
            todos: [{ id: '1', text: 'Task to remove', completed: false }],
            currentTodos: [],
            deletedTodos: [],
            finishedTodos: []
        }
        const action = removeCurrentTodo({
            id: '1'
        })
        const nextState = todoReducer(initialState, action);

        expect(nextState.todos.length).toBe(0);
        expect(nextState.deletedTodos.length).toBe(1);
        expect(nextState.deletedTodos[0].id).toBe('1');
    })

    it('should remove all todos task', () => {
        const initialState = {
            todos: [
                { id: '1', text: 'Task to remove', completed: false },
                { id: '2', text: 'Task to remove', completed: true },
                { id: '3', text: 'Task to remove', completed: true },
            ],
            currentTodos: [],
            deletedTodos: [],
            finishedTodos: []
        }
        const action = removeAllTodos({})
        const nextState = todoReducer(initialState, action);
        expect(nextState.todos.length).toBe(0);
        expect(nextState.deletedTodos).toEqual([
            { id: '1', text: 'Task to remove', completed: false },
            { id: '2', text: 'Task to remove', completed: true },
            { id: '3', text: 'Task to remove', completed: true },
        ]);
        expect(nextState.deletedTodos.length).toBe(3)
    })
})
