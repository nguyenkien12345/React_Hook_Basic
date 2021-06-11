import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const { pagination, onPageChange } = props;
    // _page, _limit, _totalRows là từ trên api trả về
    const { _page, _limit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit); //Lấy tổng số item chia cho số item trên mỗi trang
    //ceil vd:51/10 được 5.1 nó sẽ lấy là 6 trang

    function handlePageChange(newPage){
        // Kiểm tra xem thằng cha có truyền onPageChange xuống hay ko. Vì nếu nó không truyền thì lúc này nó bị null. Mà bị null thì không thể gọi
        if(onPageChange){
            onPageChange(newPage);
        }
    }

    return (
        <div>
            <button disabled={ _page <=1 } onClick={() => handlePageChange( _page-1 )}>Prev</button>
            <button disabled={ _page >= totalPages } onClick={() => handlePageChange( _page+1 )}>Next</button>
        </div>
    );
}

export default Pagination;