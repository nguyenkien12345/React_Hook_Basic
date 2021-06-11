import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss';

ColorBox.propTypes = {
    
};

function ColorBox() {
    function getRandomColor(){
        const COLOR_LIST = ['deeppink', 'green', 'blue', 'black', 'yellow', 'red', 'gray'];
        const randomIndex = Math.trunc(Math.random() * 7);
        return COLOR_LIST[randomIndex];
    }
    
    const [color, setColor] = useState
    (
        // Dùng Arrow Function cho callback. Lưu ý phải có tham số trả về
        () => 
        {
            // Vì phần initColor ta chỉ cần chạy đúng 1 lần lên ta nên đưa nó về dạng callback (đưa vào trong useState)
            const initColor = localStorage.getItem("box_color") || "deeppink";
            return initColor;
        }
    );

    function handleBoxClick(){
        // get random color -> set color
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color',newColor);
    }

    return (
        <div
            className="color-box"
            style={{backgroundColor: color}}
            onClick={handleBoxClick}
        >
            COLOR BOX
        </div>
    );
}

export default ColorBox;