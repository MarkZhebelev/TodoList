import {memo} from 'react';
import styled from 'styled-components';
import { ITodo } from '../../store/slices/todoSlice';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface IItemTodoProps {
    todo: ITodo;
    onToggle?: (id: string) => void;
    onRemove?: (id: string) => void;
}

const ItemTodo = memo<IItemTodoProps>(({ todo, onToggle, onRemove }) => {
    return (
        <StyledItemTodo>
            <Checkbox
                disabled={!onRemove}
                checked={todo.completed}
                onChange={() => onToggle ? onToggle(todo.id) : null}
                color="success"
            />
            <TextTodo isCompleted={todo.completed}>
                {todo.text}
            </TextTodo>
            <IconButton disabled={!onRemove} onClick={() => onRemove ? onRemove(todo.id) : null} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </StyledItemTodo>
    );
});

const TextTodo = styled.div<{ isCompleted: boolean }>`
    color: black;
    text-decoration: ${props => (props.isCompleted ? 'line-through' : 'none')};;
`
const StyledItemTodo = styled.div`
    display: flex;
    border: 1px solid black;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 0 7px;
`;

export default ItemTodo;

