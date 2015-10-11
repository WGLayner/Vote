/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res){
    if (req.session.user) {
      console.log('user login again', req.session.user);
      User.find(function(err, founds){
         if (err) return next(err);
         res.view({
           users: users
         });
       });
    }
    else{
      var rid='5';
      var user_obj = {};
      user_obj.from = rid;
      User.create(user_obj, function(err, created){
       console.log('user created successfully');
       req.session.user = created; 
       User.find(function(err, founds){
         if (err) return next(err);
         res.view({
           users:founds 
         });
       });
      });
    }
    
  },
	
};

