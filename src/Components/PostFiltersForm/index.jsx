import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
};

function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm , setSearchTerm] = useState('');
    // Kĩ thuật debounce
    const typingTimeoutRef = useRef(null); //Giá trị khởi đầu là null. useRef sẽ giúp ta tạo ra 1 object và cái object này sẽ không thay đổi giũa những lần render

    function handleSearchTermChange(e){
        const value = e.target.value;

        // Sau mỗi lần setSearchTerm nó sẽ rander lại nên ta cần phải đảm bảo sau mỗi lần render lại thì typingTimeoutRef phải được tồn tại
        setSearchTerm(value);

        if(!onSubmit) return;

        // Trước khi bạn setTimeout mới bạn phải clear cái timeout cũ rồi mới setTimeout mới
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        // Khi ta gõ xong 1 kí tự trình duyệt sẽ đợi 300 miliseconds chưa vội submit
        typingTimeoutRef.current = setTimeout(() => {
             // Lấy giá trị từ form
            const formValues = {
            // Nếu chỉ để mỗi searchTerm thì nó chỉ là giá trị cũ. Còn value thì nó sẽ lấy giá trị mới
            searchTerm: value,
        };
            onSubmit(formValues);
        },300)
    }

    return (
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;