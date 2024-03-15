import React, { useEffect, useState } from "react";
import { URL } from "../../config.js";

import axios from "axios";
const UserDetails = ({ bookId }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios({
      url: `${URL}/admin/userDetails/${bookId}`,
    }).then((res) => {
      setUser(res.data.users);
    });
  }, []);

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {users.map((user, index) => {
          return (
            <li key={index} className="list-group-item">
              UserId: {user.userEmail} Status:{user.status}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserDetails;
