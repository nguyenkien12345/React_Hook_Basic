import React from 'react';
import PropTypes from 'prop-types';

Hero.propTypes = {
    name: PropTypes.string,
};

Hero.defaultProps = {
    name: '',
};

function Hero(props) {
    const {name} = props;
    return (
        <div>
            Hero Name: {name}
        </div>
    );
}

export default React.memo(Hero);
// Lý thuyết
// + Nếu ở trên export default Hero mà không phải là export default React.memo(Hero) 
// - Thì nó sẽ render lại

// REACT.MEMO
// - Nó sẽ kiểm tra xem giữa thằng virtual Dom và real Dom nó có thay đổi hay ko nếu như không thay đổi thì không cập nhật performance 
// - Nếu như mà props không thay đổi thì đừng rerender lại thì lúc này React.memo sẽ giải quyết vấn đề này 
// - Còn nếu props thay đổi thì rerender như bình thường
// - Chúng ta chỉ nên dùng React.memo khi phải render đồ thị, những cái biểu đồ, animation hình ảnh 3d rất là nặng