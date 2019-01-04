import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

const useJoinedRooms = client => {
  const [joinedRooms, setJoinedRooms] = useState([]);

  useEffect(
    () => {
      client.getJoinedRooms().then(res => {
        setJoinedRooms(res.joined_rooms);
      });
    },
    [client]
  );

  return joinedRooms;
};

const Sidebar = ({ matrixClient }) => {
  const joinedRooms = useJoinedRooms(matrixClient);

  return (
    <div>
      {joinedRooms.map(id => (
        <div key={id}>
          <Link to={`/chat/${id}`}>{id}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
