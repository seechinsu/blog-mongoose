const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let nick;

  beforeEach((done) => {
    nick = new User({ name: "nick" });
    nick.save()
      .then(() => done());
  });

  it('finds all users with a name of nick', (done) => {
    User.find({name: "nick" })
      .then((users) => {
        assert(users[0]._id.toString() === nick._id.toString());
        assert(users[0].name === nick.name);
        done();
    });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: nick._id })
      .then((user) => {
        assert(user.name === 'nick');
        done();
    })
  })
});
