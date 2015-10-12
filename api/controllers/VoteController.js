/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var question_id = 0;
module.exports = {

  new: function(req, res){
    question_id++;
    res.view({
           question_id: question_id
         });
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

