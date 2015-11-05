/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Question_id = 0;
var Question_flag = 'close';
var Invalid_choice = 10;
module.exports = {

  new: function(req, res){
    if (req.session.user){
      res.view({
           question_id: Question_id,
           choice: Invalid_choice,
           user: req.session.user.randomid,
           message: '欢迎参与投票',
           layout: 'layoutvote'
         });
    }
    else{
      console.log('user is not valid');
      return res.badRequest();
    }
    
  },

  create: function(req, res, next) {
    var question_id = req.param('question');
    var choice = req.param('choice');
    var userid = req.param('user');
    Vote.find({question: question_id, user: userid}, function(err, founds){
      if(founds.length===0){
        Vote.create(req.params.all(), function(err, created){
            if (err){
                console.log(err);   // todo: for debug
                req.session.flash = {
                        err: err
                };
                return res.redirect('/vote/new');
            }
            if(req.session.user){
              var msg = '谢谢参与，票已经成功投给' + choice +'号嘉宾'; 
              res.view('vote/new', {
              question_id: question_id,
              choice: req.param('choice'),
              user: req.session.user.randomid,
              message: msg,
              layout: 'layoutvote'
              });
            }
            else{
              console.log('user is not valid');
              return res.badRequest();
            }
            
        });
      }
      else{
        Vote.update({question:question_id, user: userid}, {choice: choice}, function(err, updated){
          if(err){
            return res.badRequest();
          }
          if(req.session.user){
              var msg = '谢谢参与，重新投票成功, 票已成功投给'+choice+'号嘉宾'; 
              res.view('vote/new', {
              question_id: question_id,
              choice: req.param('choice'),
              user: req.session.user.randomid,
              message: msg,
              layout: 'layoutvote'
              });
          }
          else{
            return res.badRequest();
          }
        });
      }

    });
    
  },

  getflag: function(req, res){
    res.json({flag:Question_flag,question_id:Question_id});
  },

  config: function(req, res){
    Question_id = req.param('id');
    Question_flag = req.param('flag');
    return res.ok();

  },

  getreport: function(req, res){
    var question_index = req.param('id');
    var vote_num_1, vote_num_2, vote_num_3, vote_num_4;

    Vote.find({question: question_index, choice: 1})
    .then( function(founds){
      vote_num_1= founds.length;
      return Vote.find({question: question_index, choice: 2});
    })
    .then( function(founds){
      vote_num_2= founds.length;
      return Vote.find({question: question_index, choice: 3});
    })
    .then( function(founds){
      vote_num_3= founds.length;
      return Vote.find({question: question_index, choice: 4});
    })
    .then(function(founds){
      vote_num_4= founds.length;
      return res.json({user1: vote_num_1, user2: vote_num_2, user3: vote_num_3, user4: vote_num_4});
    });

  },
	
};

