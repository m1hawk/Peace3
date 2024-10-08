const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// 获取当前用户信息
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 更新用户资料
router.put('/me', auth, async (req, res) => {
  try {
    const { username, joinYear, totalLoss, yearLoss, mainLossScenario } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: '用户未找到' });
    }

    // 更新用户信息
    user.username = username || user.username;
    user.joinYear = joinYear || user.joinYear;
    user.totalLoss = totalLoss || user.totalLoss;
    user.yearLoss = yearLoss || user.yearLoss;
    user.mainLossScenario = mainLossScenario || user.mainLossScenario;

    await user.save();

    // 返回更新后的用户信息，不包括密码
    const updatedUser = user.toJSON();
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 删除用户账户
router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: '用户未找到' });
    }

    await user.destroy();
    res.json({ msg: '用户账户已删除' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 连接Twitter账号（示例）
router.post('/connect/twitter', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: '用户未找到' });
    }

    // 这里应该有实际的Twitter连接逻辑
    // 现在我们只是简单地将twitterConnected设为true
    user.twitterConnected = true;
    await user.save();

    res.json({ msg: 'Twitter账号已连接' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 连接钱包（示例）
router.post('/connect/wallet', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: '用户未找到' });
    }

    // 这里应该有实际的钱包连接逻辑
    // 现在我们只是简单地将walletConnected设为true
    user.walletConnected = true;
    await user.save();

    res.json({ msg: '钱包已连接' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

module.exports = router;
