import './messageInput.css'

function MessageInput() {
  return (
    <div className='messageInput'>
      <form action="">
        <input type="text" placeholder='Send a message'/>
        <button>Send</button>
      </form>
    </div>
  )
}

export default MessageInput