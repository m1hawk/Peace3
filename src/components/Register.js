import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    joinYear: '',
    totalLoss: '',
    yearLoss: '',
    mainLossScenario: ''
  });

  const { username, email, password, joinYear, totalLoss, yearLoss, mainLossScenario } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log(res.data);
      // 这里应该处理注册成功后的逻辑，比如保存token和重定向
    } catch (err) {
      console.error(err.response.data);
      // 这里应该处理错误，比如显示错误消息
    }
  };

  return (
    <div className="register">
      <h2>注册</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="用户名" name="username" value={username} onChange={onChange} required />
        <input type="email" placeholder="邮箱" name="email" value={email} onChange={onChange} required />
        <input type="password" placeholder="密码" name="password" value={password} onChange={onChange} required />
        <input type="number" placeholder="加入年份" name="joinYear" value={joinYear} onChange={onChange} required />
        <select name="totalLoss" value={totalLoss} onChange={onChange} required>
          <option value="">选择总亏损</option>
          <option value="0-1000">0-1000 USD</option>
          <option value="1000-10000">1000-10000 USD</option>
          <option value="10000-100000">10000-100000 USD</option>
          <option value="100000-1000000">100000-1000000 USD</option>
          <option value="above 1000000">1000000 USD 以上</option>
        </select>
        <select name="yearLoss" value={yearLoss} onChange={onChange} required>
          <option value="">选择今年亏损</option>
          <option value="0-1000">0-1000 USD</option>
          <option value="1000-10000">1000-10000 USD</option>
          <option value="10000-100000">10000-100000 USD</option>
          <option value="100000-1000000">100000-1000000 USD</option>
          <option value="above 1000000">1000000 USD 以上</option>
        </select>
        <select name="mainLossScenario" value={mainLossScenario} onChange={onChange} required>
          <option value="">选择主要亏损场景</option>
          <option value="defi">DeFi</option>
          <option value="meme">Meme</option>
          <option value="derivatives">衍生品交易</option>
          <option value="spot">现货</option>
          <option value="gamefi">GameFi</option>
        </select>
        <button type="submit">注册</button>
      </form>
    </div>
  );
};

export default Register;
