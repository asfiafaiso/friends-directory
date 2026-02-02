import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import "../styles/FriendsList.scss";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?seed=lll&page=1&results=25");
        const data = await res.json();
        setFriends(data.results);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <p>Loading friends...</p>;

  return (
    <div className="friends-list">
      {friends.map((friend, index) => (
        <FriendCard key={index} friend={friend} />
      ))}
    </div>
  );
};

export default FriendsList;
