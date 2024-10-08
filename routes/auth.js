const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyTwitterToken, verifySolanaSignature } = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, joinYear, totalLoss, yearLoss, mainLossScenario } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
      joinYear,
      totalLoss,
      yearLoss,
      mainLossScenario
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// 添加登录路由
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 检查用户是否存在
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: '用户不存在' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '密码不正确' });
    }

    // 创建并返回 JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// Twitter 登录
router.post('/twitter-login', async (req, res) => {
  try {
    const { twitterToken } = req.body;
    const twitterId = await verifyTwitterToken(twitterToken);
    
    let user = await User.findOne({ where: { twitterId } });
    
    if (!user) {
      // 如果用户不存在，创建新用户
      user = await User.create({ 
        twitterId, 
        username: `Twitter User ${Date.now()}`,
        joinYear: new Date().getFullYear(),
        totalLoss: '0-1000',
        yearLoss: '0-1000',
        mainLossScenario: 'other'
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Solana 钱包登录
router.post('/solana-login', async (req, res) => {
  try {
    const { publicKey, signedMessage, message } = req.body;
    const isValid = await verifySolanaSignature(publicKey, signedMessage, message);
    
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    let user = await User.findOne({ where: { solanaAddress: publicKey } });
    
    if (!user) {
      // 如果用户不存在，创建新用户
      user = await User.create({ 
        solanaAddress: publicKey, 
        username: `Solana_${publicKey.slice(0, 8)}`,
        joinYear: new Date().getFullYear(),
        totalLoss: '0-1000',
        yearLoss: '0-1000',
        mainLossScenario: 'other'
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, solanaAddress: user.solanaAddress } });
  } catch (error) {
    console.error('Solana login error:', error);
    res.status(500).json({ message: 'Server error during Solana login' });
  }
});

module.exports = router;
