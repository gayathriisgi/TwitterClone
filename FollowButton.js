// components/FollowButton.js
import { useState } from "react";

const FollowButton = ({ currentUser, targetUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (isFollowing) {
      // Unfollow user
      await fetch("/api/follow", {
        method: "DELETE",
        body: JSON.stringify({ followerId: currentUser, followingId: targetUser }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsFollowing(false);
    } else {
      // Follow user
      await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify({ followerId: currentUser, followingId: targetUser }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsFollowing(true);
    }
  };

  return (
    <button onClick={handleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;