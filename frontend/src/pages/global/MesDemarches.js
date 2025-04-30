import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MesDemarches = () => {
  const { me, token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(`http://localhost:5000/api/notifications/${me.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, [me, token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mes démarches</h2>
      {notifications.map((notif, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default MesDemarches;
