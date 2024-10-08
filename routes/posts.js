const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// 创建帖子
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, images } = req.body;
    const newPost = await Post.create({
      title,
      content,
      images,
      UserId: req.user.id
    });
    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 获取所有帖子
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 获取单个帖子
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    if (!post) {
      return res.status(404).json({ msg: '帖子未找到' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 更新帖子
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, images } = req.body;
    let post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: '帖子未找到' });
    }
    
    // 检查是否是帖子的作者
    if (post.UserId !== req.user.id) {
      return res.status(401).json({ msg: '用户未授权' });
    }
    
    post.title = title;
    post.content = content;
    post.images = images;
    
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// 删除帖子
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: '帖子未找到' });
    }
    
    // 检查是否是帖子的作者
    if (post.UserId !== req.user.id) {
      return res.status(401).json({ msg: '用户未授权' });
    }
    
    await post.destroy();
    res.json({ msg: '帖子已删除' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

module.exports = router;
