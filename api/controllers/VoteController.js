/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res){
    res.view();
  },

  create: function(req, res, next) {
    Vote.create(req.params.all(), function(err, created){
            if (err){
                console.log(err);   // todo: for debug
                req.session.flash = {
                        err: err
                };
                return res.redirect('/vote/create');
            }
            res.redirect('/vote');
        });
    },
	
};

