const Message = ({username, text} : {username: string, text: string}) => {
  return (
    <div>
      {username}: {text}
    </div>
  )
}

export default Message;