const assert = require('assert');
const User = require('../src/user');

describe('Update a user in the database', () => {
  let nick;

  beforeEach((done) => {
    nick = new User({ name: "nick", likes: 0 });
    nick.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'alex');
        done();
      });
  }

  it('model instance set and save', (done) => {
    nick.set('name', 'alex');
    assertName(nick.save(), done);
  });

  it('model instance can update', (done) => {
    assertName(nick.update({name: 'alex'}), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({name: 'nick'}, { name: 'alex'}),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({name: 'nick'}, { name: 'alex'}),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate({_id: nick._id}, { name: 'alex'}),
      done
    );
  });

  it('A user can have their likes incremented by 1', (done) => {
    User.update({ name: 'nick' }, { $inc: { likes: 1 }})
      .then(() => User.findOne({ name: 'nick'}))
      .then((user) => {
        assert(user.likes === 1);
        done()
      });
  });
});
