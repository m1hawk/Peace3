import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <h2>最新帖子</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>作者: {post.User.username}</small>
        </div>
      ))}
    </div>
  );
};

export default Home;
