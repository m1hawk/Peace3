import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>请先登录</div>;

  return (
    <div className="profile">
      <h2>个人资料</h2>
      <p>用户名: {user.username}</p>
      <p>Solana 地址: {user.solanaAddress}</p>
      <p>加入年份: {user.joinYear}</p>
      <p>总亏损: {user.totalLoss}</p>
      <p>年度亏损: {user.yearLoss}</p>
      <p>主要亏损场景: {user.mainLossScenario}</p>
    </div>
  );
};

export default Profile;
