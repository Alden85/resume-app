const express = require('express');
const router = new express.Router();
const Profile = require('../models/profile');
const auth = require('../middleware/auth');

router.post('/profiles', auth, async (req, res) => {
  const profile = new Profile({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await profile.save();
    res.status(201).send(profile);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/profiles', auth, async (req, res) => {
  try {
    //const profiles = await Profile.find({owner:req.user._id}); -->this works also
    await req.user.populate('profiles').execPopulate();
    res.send(req.user.profiles);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/profiles/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const profile = await Profile.findOne({ _id, owner: req.user._id });
    if (!profile) {
      return res.status(404).send();
    }
    res.send(profile);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/profiles/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['adress', 'tel', 'gender', 'marriedStatus'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!profile) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      profile[update] = req.body[update];
    });

    await profile.save();
    res.send(profile);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/profiles/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!profile) {
      return res.status(404).send();
    }
    res.send(profile);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
