import React, { useContext } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const history = useHistory();
  const { publicKey, signMessage } = useWallet();
  const { connection } = useConnection();
  const { login } = useContext(AuthContext);

  const handleSolanaLogin = async () => {
    if (!publicKey || !signMessage) {
      alert('请先连接 Solana 钱包');
      return;
    }

    try {
      const message = new TextEncoder().encode(`Login to Peace3: ${Date.now()}`);
      const signedMessage = await signMessage(message);

      const response = await axios.post('/api/auth/solana-login', {
        publicKey: publicKey.toString(),
        signedMessage: Array.from(signedMessage),
        message: Array.from(message),
      });

      if (response.data.token) {
        login(response.data.user, response.data.token);
        history.push('/');
      }
    } catch (error) {
      console.error('Solana login failed', error);
      alert('登录失败，请重试');
    }
  };

  return (
    <div className="login">
      <h2>登录</h2>
      <WalletMultiButton />
      <button onClick={handleSolanaLogin} disabled={!publicKey}>使用 Solana 钱包登录</button>
    </div>
  );
};

export default Login;
