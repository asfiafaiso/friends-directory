import "../styles/FriendCard.scss";

const FriendCard = ({ friend, onClick }) => {
  return (
    <div className="friend-card" onClick={() => onClick(friend)}>
      <img
        src={friend.picture.large}
        alt={`${friend.name.first} ${friend.name.last}`}
        className="avatar"
      />

      <div className="info">
        <h3>
          {friend.name.first} {friend.name.last}
        </h3>
        <p>{friend.email}</p>
        <span className="phone">{friend.phone}</span>
      </div>
    </div>
  );
};

export default FriendCard;
