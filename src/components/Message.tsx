import { MessageProps } from "../ts/types"
import { useSelector } from "react-redux";

const Message = ({ index, message }: MessageProps) => {
  const { userState } = useSelector((state: any) => state.auth);

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
            backgroundColor: message.sender === userState.user.username ? '#0084ff' : '#f0f0f0',
            color: message.sender === userState.user.username ? 'white' : 'black',
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