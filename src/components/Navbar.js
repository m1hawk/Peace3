import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1>Peace3</h1>
      <ul>
        <li><Link to="/">首页</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">个人资料</Link></li>
            <li><Link to="/create-post">发帖</Link></li>
            <li><button onClick={logout}>登出</button></li>
          </>
        ) : (
          <li><Link to="/login">登录</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
