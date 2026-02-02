import React from "react";
import "../styles/FriendModal.scss";

const FriendModal = ({ friend, onClose }) => {
  if (!friend) return null; // don't render if no friend selected

  const fullAddress = `${friend.location.street.number} ${friend.location.street.name}, ${friend.location.city}, ${friend.location.state}, ${friend.location.country}, ${friend.location.postcode}`;

  const dob = new Date(friend.dob.date).toLocaleDateString();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={friend.picture.large} alt={`${friend.name.first} ${friend.name.last}`} />
        <h2>{friend.name.first} {friend.name.last}</h2>
        <p><strong>Email:</strong> {friend.email}</p>
        <p><strong>Phone:</strong> {friend.phone}</p>
        <p><strong>D.O.B:</strong> {dob}</p>
        <p><strong>Address:</strong> {fullAddress}</p>
      </div>
    </div>
  );
};

export default FriendModal;
