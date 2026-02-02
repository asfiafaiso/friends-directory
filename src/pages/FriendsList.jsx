import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import FriendModal from "../components/FriendModal";
import "../styles/FriendsList.scss";

const TOTAL_FRIENDS = 500;
const RESULTS_PER_PAGE = 25;
const MAX_PAGE = Math.ceil(TOTAL_FRIENDS / RESULTS_PER_PAGE);

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const [error, setError] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null); // modal friend

  const fetchFriends = async (pageNumber) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://randomuser.me/api/?seed=lll&page=${pageNumber}&results=${RESULTS_PER_PAGE}`
      );
      const data = await res.json();
      setFriends(data.results);
    } catch (err) {
      console.error("Error fetching friends:", err);
      setError("⚠️ Failed to fetch friends. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends(page);
    setInputPage(page);
  }, [page]);

  const handleNext = () => setPage((prev) => (prev < MAX_PAGE ? prev + 1 : prev));
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (isNaN(pageNumber)) {
      setError("❌ Please enter a valid number");
      return;
    }
    if (pageNumber < 1 || pageNumber > MAX_PAGE) {
      setError(`❌ Page must be between 1 and ${MAX_PAGE}`);
      return;
    }
    setError("");
    setPage(pageNumber);
  };

  const handleCardClick = (friend) => {
    setSelectedFriend(friend);
  };

  const closeModal = () => setSelectedFriend(null);

  if (loading) return <p>Loading friends...</p>;

  return (
    <div className="friends-container">
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={page === 1}>
          ⬅ Previous
        </button>

        <span>Page</span>
        <input type="text" value={inputPage} onChange={handleInputChange} />
        <button onClick={handleGoToPage}>Go</button>

        <button onClick={handleNext} disabled={page === MAX_PAGE}>
          Next ➡
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="friends-list">
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} onClick={handleCardClick} />
        ))}
      </div>

      {selectedFriend && (
        <FriendModal friend={selectedFriend} onClose={closeModal} />
      )}
    </div>
  );
};

export default FriendsList;
