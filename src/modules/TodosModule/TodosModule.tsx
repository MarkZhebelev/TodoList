import {useRef, useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ITodo, addTodo, toggleTodoCompleted, removeCurrentTodo, removeAllTodos} from '../store/slices/todoSlice';
import {RootState} from '../store/store';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ItemTodo from '../TodosModule/components/ItemTodo';


function TodosModule() {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const deletedTodos = useSelector((state: RootState) => state.todos.deletedTodos);
    const currentTodos = useSelector((state: RootState) => state.todos.currentTodos);
    const finishedTodos = useSelector((state: RootState) => state.todos.finishedTodos);

    const [currentSection, setCurrentSection] = useState<string>('current'); // Текущий раздел
    const inputRef = useRef<HTMLInputElement>(null);

    const sendText = useCallback(() => {
        const todoText = inputRef.current?.value;
        if (todoText) {
            dispatch(addTodo({text: todoText, completed: false}));
            console.log('Added new todo:', todoText);
            inputRef.current.value = '';
        }
    }, [dispatch]);

    const handleToggleTodoCompleted = useCallback((id: string) => {
        console.log('handleToggleTodoCompleted', id);
        dispatch(toggleTodoCompleted({id}));
    }, [dispatch]);

    const handleRemoveAllTodos = useCallback(() => {
        console.log('очищаем весь массив');
        dispatch(removeAllTodos({}));
    }, [dispatch]);

    const handleRemoveCurrentTodo = useCallback((id: string) => {
        console.log('удаляем текущую задачу');
        dispatch(removeCurrentTodo({id}));
    }, [dispatch]);

    const filteredTodos = () => {
        switch (currentSection) {
            case 'current':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'trash':
                return deletedTodos;
            default:
                return todos;
        }
    };

    useEffect(() => {
        sessionStorage.setItem('todos', JSON.stringify(todos));
        sessionStorage.setItem('currentTodos', JSON.stringify(currentTodos));
        sessionStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
        sessionStorage.setItem('finishedTodos', JSON.stringify(finishedTodos));
    }, [todos, currentTodos, deletedTodos, finishedTodos]);


    return (
       <>
           <Header>
               <Button onClick={sendText} variant="contained" startIcon={<AddIcon/>}>
                   Добавить
               </Button>
               <TextField
                   inputRef={inputRef}
                   id="outlined-basic"
                   label="Текст todo"
                   variant="outlined"
                   size="small"
                   style={{backgroundColor: 'white',borderRadius: '5px'}}
               />
               <Button color="error" onClick={handleRemoveAllTodos} variant="contained" endIcon={<DeleteIcon/>}>
                   Очистить
               </Button>
           </Header>
           <NavBlock>
               <Nav isActive={currentSection === 'current'} onClick={() => setCurrentSection('current')}>
                   Текущие дела
               </Nav>
               <Nav isActive={currentSection === 'all'} onClick={() => setCurrentSection('all')}>
                   Все дела
               </Nav>
               <Nav isActive={currentSection === 'completed'} onClick={() => setCurrentSection('completed')}>
                   Выполненные дела
               </Nav>
               <Nav isActive={currentSection === 'trash'} onClick={() => setCurrentSection('trash')}>
                   Корзина
               </Nav>
           </NavBlock>
           <ItemsBlock>
               {filteredTodos().length > 0 && filteredTodos().map((todo: ITodo) => (
                   <ItemTodo key={todo.id} todo={todo}
                             onToggle={currentSection === 'trash' ? undefined : handleToggleTodoCompleted}
                             onRemove={currentSection === 'trash' ? undefined : handleRemoveCurrentTodo}
                   />
               ))}
           </ItemsBlock>
       </>
    );
}
const Header = styled.header`
    padding: 20px 10px;
    border-radius: 10px;
    background-color: #9e9e9e69;;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`
const ItemsBlock = styled.div`
    background-color: #9e9e9e69;
    height: 100vh;
    padding: 10px;
    border-radius: 10px;
    flex-direction: column;
    display: flex;
    gap: 10px;
`
const NavBlock = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 10px 0;
    justify-content: space-between;
`;
const Nav = styled.div<{isActive: boolean}>`
    padding: 5px;
    cursor: pointer;
    color: ${ props => (props.isActive ? '#1976d2' : 'none')};
    border-bottom: ${props => (props.isActive ? '2px solid #1976d2' : 'none')};
`
export default TodosModule;
