import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import axios from 'axios';
import { useState ,useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import imgfc from './imgfc.jpg'


const socket = io('http://localhost:5000')
function App(){

  const[name,setName] = useState('')
  const [message,setMessage]= useState(" ")
  const [messages,setMessages]=useState([''])

  useEffect(()=> {
    const handlemessage =(receivedMessage)=>{
      setMessages((prevMessages)=> [...prevMessages,receivedMessage]);
    }
    socket.on('message', handlemessage);
    return()=>{
      socket.off('message', handlemessage);
    }
  }, []);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(name && message){
      try{
        await axios.post('http://localhost:5000/api/messages',{name,message})
        setName('');
        setMessage('');
      }catch(error){
        console.error('Error sending message;'.error);
      }
    }


  }
  return(
    <div className='container '>
      <form onSubmit={handleSubmit} >
        <input  type="text" value={name} className='input-name' placeholder='Your name' onChange={(e)=>setName ( e.target.value)} /> <br />
       
       <div>
    <div className='box'><img src={imgfc} alt="" className='img' /></div>
       <div className='inptmsgcontainer'>

        <input  type="text" value={message} className='input-message' placeholder="Your message" onChange={(e)=>setMessage ( e.target.value)} />
       </div>
       </div>
        <button type='submit' > <IoSend className='icon-send' />
        </button>
      </form>
      <ul>
        {messages.map((msg, index) =>(
        <li key={index}>
          {msg.name}: {msg.message}
        </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
