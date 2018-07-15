const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const nick = new User({
      name: 'nick',
      posts: [{title: 'PostTitle'}]
    });

    nick.save()
      .then(() => User.findOne({ name: 'nick'}))
      .then((user) => {
        assert(nick.postCount === 1);
        done();
      });
  });

  
});
