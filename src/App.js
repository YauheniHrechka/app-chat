import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from './context';
import { Auth, Chat } from './components';
import { setUserOnlineInRooms, setUserOfflineInRooms } from './redux/actions/users';
import socket from './socket';

import './styles/app.scss';

const App = () => {

  const dispatch = useDispatch();
  const { users } = useSelector(state => state);
  console.log('users', users);

  React.useEffect(() => {
    socket.on('USER:ONLINE', data => dispatch(setUserOnlineInRooms(data)));
    socket.on('USER:OFFLINE', data => dispatch(setUserOfflineInRooms(data)));
  }, []);

  return (
    <Context.Provider value={dispatch}>
      <div className="wrapper">
        {users.user.online ? <Chat {...users} /> : < Auth />}
      </div>
    </Context.Provider>
  );
}

export default App;