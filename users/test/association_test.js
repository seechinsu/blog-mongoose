const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations', () => {
  let nick, blogPost, comment;

  beforeEach((done) => {
    nick = new User({ name: 'nick' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is' });
    comment = new Comment({ content: 'congrats on great post' });

    nick.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = nick;

    Promise.all([nick.save(),blogPost.save(),comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'nick' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'nick' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'nick');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'nick');
        done();
      })
  });

});
