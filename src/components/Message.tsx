import { MessageProps } from "../ts/types"
import { useSelector } from "react-redux";

const Message = ({ message }: MessageProps) => {
  const { userState } = useSelector((state: any) => state.auth);

  return (
    <div style={{ marginLeft: 5, marginRight: 6 }}>
      <div
        style={{
          display: 'block',
          wordWrap: 'break-word',
          fontSize: 20,
        }}
      >
        <span style={{ fontSize: 10, color: 'gray' }}>{message.username}</span>
        <div
          style={{
            backgroundColor: message.username === userState.user.username ? '#0084ff' : '#f0f0f0',
            color: message.username === userState.user.username ? 'white' : 'black',
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