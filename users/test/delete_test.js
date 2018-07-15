const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user out of the database', () => {
  let nick;

  beforeEach((done) => {
    nick = new User({ name: "nick" });
    nick.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    nick.remove()
      .then(() => User.findOne({ name: "nick" }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method remove', (done) => {
    User.remove({ name: nick.name })
      .then(() => User.findOne({ name: "nick" }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: "nick" })
      .then(() => User.findOne({ name: "nick" }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(nick._id)
      .then(() => User.findOne({ _id: nick._id }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

});
