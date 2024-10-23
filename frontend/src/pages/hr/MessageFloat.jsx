import message from './assets/msg.png'
import './style/index.css'
function MessageFloat({onClick}){
    return(
        
        <div className='messagingsection' onClick={onClick}>
            <img src={message}></img>
        </div>
    
    );
}
export default MessageFloat