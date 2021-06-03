import React from 'react';
import axios from 'axios'

function ChatPage(props) {
    const getData = () => {
        axios.get('/rooms').then(response=>{
            console.log(response.data);  
        })
    }
    return (
        <div>
            <button onClick={getData}>Получить данные</button>
        </div>
    );
}

export default ChatPage;