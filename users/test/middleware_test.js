const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let nick, blogPost;

  beforeEach((done) => {
    nick = new User({ name: 'nick' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is' });

    nick.blogPosts.push(blogPost);

    Promise.all([nick.save(),blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    nick.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});
