import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onTodoClick: null
};

function TodoList(props) {
    const {todos , onTodoClick} = props;

    function handleClick(todo){
        // Kiểm tra xem onTodoClick có tồn tại không?
        if(onTodoClick){
            // Nếu có thì gọi lại chính props cha đó ra
            onTodoClick(todo);
        }
    }

    return (
            <ul className="todo-list">
                {
                todos.map(todo => (
                    <li key={todo.id} 
                        //Lưu ý có tham số phải dùng arrow function 
                        onClick={() => {handleClick(todo)}}
                    >
                        {todo.title}
                    </li>                    
                ))
                }
            </ul>
    );
}

export default TodoList;