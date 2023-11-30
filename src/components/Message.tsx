import { MessageProps } from "../ts/types"



const Message = ({ index, message, params }: MessageProps) => {
  return (
    <div key={index} style={{ marginLeft: 5, marginRight: 6 }}>
      <div
        style={{
          display: 'block',
          wordWrap: 'break-word',
          fontSize: 20,
        }}
      >
        <span style={{ fontSize: 10, color: 'gray' }}>{message.sender}</span>
        <div
          style={{
            backgroundColor: message.sender === params.username ? '#0084ff' : '#f0f0f0',
            color: message.sender === params.username ? 'white' : 'black',
            borderRadius: 10,
            padding: 10,
          }}
        >
          <p style={{ margin: 0 }}>{message.text}</p>
          <span style={{ fontSize: 10 }}>{message.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

export default Message