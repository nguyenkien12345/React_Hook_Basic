import React, {useState} from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
};

function TodoForm(props) {
    const  {onSubmit} = props;

    const  [value,setValue] = useState('');

    function handleValueChange(e){
        setValue(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        // Nếu onSubmit không tồn tại thì không làm gì
        if(!onSubmit) return;
        // Lấy ra giá trị title trong form đưa vào state
        const formValues = {
            title: value,
        }
        onSubmit(formValues);
        // Sau khi thêm xong reset lại
        setValue('');

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="value" value={value} onChange={handleValueChange}/>
        </form>
    );
}

export default TodoForm;