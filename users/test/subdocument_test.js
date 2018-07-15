const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const nick = new User({
      name: 'nick',
      posts: [{title: 'PostTitle'}]
    });

    nick.save()
      .then(() => User.findOne({ name: 'nick'}))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const nick = new User({
      name: 'nick',
      posts: []
    });

    nick.save()
      .then(() => User.findOne({ name: 'nick'}))
      .then((user) => {
        user.posts.push({ title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({ name: 'nick'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('Can remove an existing subdocument', (done) => {
    const nick = new User({
      name: 'nick',
      posts: [{ title: 'New Title'}]
    });

    nick.save()
      .then(() => User.findOne({name: 'nick'}))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({name: 'nick'}))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
