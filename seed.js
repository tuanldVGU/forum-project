require('./init');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const user = mongoose.model('user');
const category = mongoose.model('category');
const comment = mongoose.model('comment');
const subcomment = mongoose.model('subcomment');
const post = mongoose.model('post');
category.deleteMany({}).exec()
  .then(() => comment.deleteMany({}).exec())
  .then(() => subcomment.deleteMany({}).exec())
  .then(() => post.deleteMany({}).exec())
  .then(() => user.findOne({ username: 'admin' }).exec())
  .then((_user) => category.create({
    transportType: 'Motorbike',
    transportModel: 'Jupiter Fi RC',
    transportYear: '2018',
    transportManufacture: 'Yamaha'
  })
    .then((_category) => post.create({
      category: _category,
      user: _user,
      title: 'Engineer V6 Problems',
      description: 'An icon cannot be reinvented, it can only be challenged. And only Aventador could surpass itself. Following Miura, Islero, Countach, and Urraco, Lamborghini’s most iconic model now reaps the inheritance of the historic S models and evolves into the new Aventador S Coupé. Exclusive Lamborghini design and the new V12 engine with a whopping 740 HP now join the most sophisticated technology of the range, featuring the new LDVA (Lamborghini Dinamica Veicolo Attiva/Lamborghini Active Vehicle Dynamics), which offers an unparalleled driving experience to all those who honour their egos by challenging themselves every day.',
    }))
    .then((_post) => comment.create({
      post: _post,
      user: _user,
      content: 'I fixed.'
    }))
    .then((_comment) => subcomment.create({
      comment: _comment,
      user: _user,
      content: 'yeah'
    })
  ))

