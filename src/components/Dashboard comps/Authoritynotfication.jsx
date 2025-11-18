import React, { useEffect , useState} from 'react'
import '../styles/Authoritynotification.css';
import axios from 'axios';
import NotificationCard from './NotificationCard';

export default function Authoritynotification({email}) {
  
  const [notifications, setnotifications] = useState([]);
  const items=["notifications","the notifications"];
 
  useEffect(() => { // pending
    const getNotifications = async () => {
      try {
        const response = await axios.post('http://localhost:5002/api/LA-NotificationGet',{Startup_Email :email});
        if(response.data.success) {
          console.log(...response.data.NotificationData);
          setnotifications([...response.data.NotificationData]);

        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        setnotifications([]);
      }
    };

    getNotifications();
  }, []); 


  

  return (
    <div className='drug-noti-head w-[800px] mx-auto'>
   <div>

    <div>

     <p className=' pt-10 text-start text-4xl'>List of Notification</p>
        {notifications.map((item,index) => (
          <li key={index}>
            <NotificationCard data={item} />
          </li>
        ))}
       </div>
       </div>
    </div>
  )
}
