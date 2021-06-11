import React, { useState, useEffect, useRef } from 'react';

function randomColor(currentColor)
{
    const COLOR_LIST = ['red','yellow','green','blue','gray','pink','black'];
    const currentIndex = COLOR_LIST.indexOf(currentColor);
    let newIndex = currentIndex;
    // Nếu như màu của vị trí hiện tại và màu mới giống nhay thì random 1 thằng mới cho đến khi nào khác thì thôi
    while(currentIndex ===  newIndex){
        newIndex = Math.trunc(Math.random() * 7);
    }
    return COLOR_LIST[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');

    // Change Color every 1 second

    useEffect(() => {
        const colorInterval = setInterval(() =>{
            const newColor = randomColor(colorRef.current);  
            setColor(newColor);
            colorRef.current = newColor;
            // Mỗi lần mà chúng ta cập nhật color thì sẽ set lại cái colorRef. Như vậy thì màu sau sẽ không bao giờ trùng màu đầu
        }, 1000);

        return () => {
            clearInterval(colorInterval);
        }
    }, []);

    return color;
}

export default useMagicColor;