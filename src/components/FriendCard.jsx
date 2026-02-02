import React from "react";
import "../styles/FriendCard.scss";

const FriendCard = ({ friend, onClick }) => {
  return (
    <div className="friend-card" onClick={() => onClick(friend)}>
      <img
        src={friend.picture.medium}
        alt={`${friend.name.first} ${friend.name.last}`}
      />
      <div className="friend-info">
        <h3>{friend.name.first} {friend.name.last}</h3>
        <p>Email: {friend.email}</p>
        <p>Phone: {friend.phone}</p>
      </div>
    </div>
  );
};

export default FriendCard;
