import "../styles/Message.css"

const Message = ({username, text} : {username: string, text: string}) => {
  return (
    <div>
      <div className="message">
        <p>{username}</p>: {text}
      </div> 
    </div>
  )
}

export default Message;