import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notification, dispatch] = useContext(NotificationContext)
  
  /* if (true) return null */
  if(notification === null) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
