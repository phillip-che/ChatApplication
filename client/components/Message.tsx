import "../styles/Message.css"

const Message = ({username, text} : {username: string, text: string}) => {
  return (
    <div className="message">
      <p>{username}</p>: {text}
    </div>
  )
}

export default Message;