/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
            test('Contains correct output properties', function(done) {
       chai.request(server)
        .post('/api/threads/test')
        .send({
          text: 'this is a post',
          delete_password: 'supersecretpassword',
        })
        .end(function(err, res){
  //       expect(res).to.redirectTo('/api/threads/b/test')
          assert.property(res.body, "text", "output needs text field")
          assert.property(res.body, "created_on", "output needs created_on")
          assert.property(res.body, "bumped_on", "output needs bumped_on")
          assert.property(res.body, "reported", "output needs reported")
          assert.property(res.body, "delete_password", "output needs delete_password")
          assert.property(res.body, "replies", "output needs replies")
        })
          done();
                }) 
        });
   
    
    suite('GET', function() {
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/threads/test')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isAtMost(res.body.length, 10);
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'replies');
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'bumped_on');
          assert.notProperty(res.body[0], 'reported');
          assert.notProperty(res.body[0], 'delete_password');
          done();
        });
      }); 
    });
    
    suite('DELETE', function() {
          test('No filter', function(done) {
        chai.request(server)
        .delete('/api/threads/test')
        .query({thread_id: "5e94b2080130415bbca15ad2", delete_password: "supersecretpassword"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "success")
          done();
        }); 
    });
    });
    
    suite('PUT', function() {
     test('No filter', function(done) {
        chai.request(server)
        .put('/api/threads/test')
        .query({thread_id: "5e94b2080130415bbca15ad2"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "success")
          done();
        });
      });
    

  });
  });
  suite('API ROUTING FOR /api/replies/:board/', function() {
    
    suite('POST', function() {
      test('Message is updated', function(done) {
       chai.request(server)
        .post('/api/replies/test')
        .send({
          text: 'this is a reply',
          delete_password: 'supersecretpassword',
         thread_id: "5e94b2080130415bbca15ad2"
        })
        .end(function(err, res){
  //       expect(res).to.redirectTo('/api/threads/b/test')
          assert.property(res.body, "text", "output needs text field")
          assert.property(res.body, "created_on", "output needs created_on")
          assert.property(res.body, "bumped_on", "output needs bumped_on")
          assert.property(res.body, "reported", "output needs reported")
          assert.property(res.body, "delete_password", "output needs delete_password")
          assert.property(res.body, "replies", "output needs replies")
        })
          done();
                })  
    });
    
    suite('GET', function() {
         test('No filter', function(done) {
        chai.request(server)
        .get('/api/replies/test')
        .query({thread_id: "5e94b2080130415bbca15ad2"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'replies');
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'bumped_on');
          assert.notProperty(res.body[0], 'reported');
          assert.notProperty(res.body[0], 'delete_password');
          done();
        });
      }); 
    });
    
    suite('PUT', function() {
           test('No filter', function(done) {
        chai.request(server)
        .put('/api/replies/test')
        .query({thread_id: "5e94b2080130415bbca15ad2", reply_id: "5e94b2080130415bbca15ad3"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "success")
          done();
        });
      });
    });
    
    suite('DELETE', function() {
        test('No filter', function(done) {
        chai.request(server)
        .delete('/api/replies/test')
        .query({thread_id: "5e94b2080130415bbca15ad2", 
                reply_id: "5e94b2080130415bbca15ad3", delete_password: "supersecretpassword"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "success")
          done();
        });
      });
    });
    
  });

});
