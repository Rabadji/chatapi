const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId;

  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
  });
};
exports.updateProfile=function(req,res,next){
 const id=req.params.userId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
   User.update({_id:id}, { $set:updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
        });
};

