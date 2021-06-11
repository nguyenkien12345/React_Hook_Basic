import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {
    
};

function Clock(props) {
    function formatDate(date){
        if(!date) return '';
        // 9:5:0 nhìn rất xấu
        // Ta nên setup về 09:05:00 luôn có ít nhất 2 chữ số
        const hours = `0${date.getHours()}`.slice(-2); //slice(-2) là lấy 2 con số cuối cùng và chèn 0 vào đầu thì lúc nào cũng luôn có ít nhất 2 chữ số
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);
        return `${hours}:${minutes}:${seconds}`;
    }

    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date(); //Lấy ra thời gian hiện tại
            // HH:mm:ss
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        },1000);
        return () => {
            // clean up. Khi xài interval nên luôn có clearInterval
            console.log("Clock CleanUp");
            clearInterval(clockInterval);
        }
    }, [])

    return (
        <p style={{fontSize: '42px'}}>{timeString}</p>
    );
}

export default Clock;