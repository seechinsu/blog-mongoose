const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let alex, maria, nick, zach;

  beforeEach((done) => {
    alex = new User({ name: "alex" });
    maria = new User({ name: "maria" });
    nick = new User({ name: "nick" });
    zach = new User({ name: "zach" });

    Promise.all([maria.save(),alex.save(),nick.save(),zach.save()])
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
    });
  });

  it('can skip and limit the result set', (done) => {
    // alex maria nick zach
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'maria');
        assert(users[1].name === 'nick');
        done();
      });
  });

});
