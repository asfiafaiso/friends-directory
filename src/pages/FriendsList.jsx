import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import "../styles/FriendsList.scss";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const [inputPage, setInputPage] = useState(1); // input field value

  const RESULTS_PER_PAGE = 25;

  const fetchFriends = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://randomuser.me/api/?seed=lll&page=${pageNumber}&results=${RESULTS_PER_PAGE}`
      );
      const data = await res.json();
      setFriends(data.results);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends(page);
    setInputPage(page); // keep input synced with current page
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // only allow digits
      setInputPage(value);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1) {
      setPage(pageNumber);
    }
  };

  if (loading) return <p>Loading friends...</p>;

  return (
    <div className="friends-container">
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={page === 1}>
          ⬅ Previous
        </button>

        <span>Page</span>
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
        />
        <button onClick={handleGoToPage}>Go</button>

        <button onClick={handleNext}>Next ➡</button>
      </div>

      <div className="friends-list">
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
