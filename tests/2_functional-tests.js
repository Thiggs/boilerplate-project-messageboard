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
            test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/threads/test')
        .send({
          text: 'this is some text',
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
      
    });
    
    suite('DELETE', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
