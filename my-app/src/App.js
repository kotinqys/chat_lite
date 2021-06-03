import { useEffect, useReducer } from 'react';
import ChatPage from './component/ChatPage';
import SignPage from './component/SignPage'
import reducer from './reducer';
import socket from './socket';
import './styles/App.scss'

function App() {
  const [state,dispatch] = useReducer(reducer,{
    isJoin:false,
    userName:null,
    roomId:null
  })
  const onJoined = ({userName,roomId}) =>{
    dispatch({
      type:'JOINED',
      isJoin:true,
      userName,
      roomId
    })
    socket.emit('ROOM:JOIN',{roomId,userName})
  }
  
  useEffect(()=>{
    socket.on('ROOM:JOINED',(users)=>{
      console.log(users);
    })
  })

  return (
    <div className='wrapper'>
      {state.isJoin 
      ?<ChatPage/>
      :<SignPage onJoined = {onJoined}/>}
    </div>
  );
}

export default App;
