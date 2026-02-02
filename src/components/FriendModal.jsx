import { FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake } from "react-icons/fa";
import "../styles/FriendModal.scss";

const FriendModal = ({ friend, onClose }) => {
  if (!friend) return null;

  const { name, picture, email, phone, location, dob } = friend;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes className="close-icon" onClick={onClose} />

        <img
          src={picture.large}
          alt={`${name.first} ${name.last}`}
          className="modal-avatar"
        />

        <h2>
          {name.first} {name.last}
        </h2>

        <div className="modal-info">
          <div>
            <FaEnvelope /> <span>{email}</span>
          </div>
          <div>
            <FaPhone /> <span>{phone}</span>
          </div>
          <div>
            <FaBirthdayCake />{" "}
            <span>{new Date(dob.date).toLocaleDateString()}</span>
          </div>
          <div>
            <FaMapMarkerAlt />{" "}
            <span>
              {location.city}, {location.state}, {location.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendModal;
