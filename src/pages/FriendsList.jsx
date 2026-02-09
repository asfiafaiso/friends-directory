import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import FriendModal from "../components/FriendModal";
import { FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import "../styles/FriendsList.scss";

const FriendsList = ({ darkMode, setDarkMode }) => {
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const RESULTS = 25;
  const MAX_PAGES = 20;

  const handleCardClick = (friend) => setSelectedFriend(friend);
  const closeModal = () => setSelectedFriend(null);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?seed=lll&page=${page}&results=${RESULTS}`)
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.results);
        setError("");
      })
      .catch(() => setError("Failed to load friends"));
  }, [page]);

  const handlePageChange = (value) => {
    const pageNum = Number(value);
    if (!pageNum || pageNum < 1 || pageNum > MAX_PAGES) {
      setError(`Please enter a page between 1 and ${MAX_PAGES}`);
      return;
    }
    setError("");
    setPage(pageNum);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  // Apply theme class
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`friends-page ${darkMode ? "dark" : ""}`}>
      <header className="friends-header">
        <div>
          <h1>Friends</h1>
          <p>Discover and manage your connections</p>
        </div>

        <div className="header-actions">
          {/* Theme toggle */}
          <span
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </span>

          {/* Logout */}
          <FaSignOutAlt
            className="logout-icon"
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </header>

      {/* Pagination */}
      <div className="pagination-bar">
        <button onClick={() => page > 1 && setPage(page - 1)} disabled={page === 1}>
          ⬅ Previous
        </button>
        <div className="page-input">
          Page
          <input
            type="number"
            value={page}
            onChange={(e) => handlePageChange(e.target.value)}
          />
          of {MAX_PAGES}
        </div>
        <button onClick={() => page < MAX_PAGES && setPage(page + 1)} disabled={page === MAX_PAGES}>
          Next ➡
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="friends-grid">
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} onClick={handleCardClick} darkMode={darkMode}/>
        ))}
      </div>

      {selectedFriend && <FriendModal friend={selectedFriend} onClose={closeModal} darkMode={darkMode}/>}
    </div>
  );
};

export default FriendsList;
