const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//  /api/

// get all comments
router.get('/', async (req, res) => { 
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map(comment => comment.toJSON());
        // render to 
        res.status(200).render('/', { comments });
        console.log(comment)
        } catch (err) {
        res.status(500).json(err);
        }
});

// create new 
router.post('/', withAuth, async (req, res) => {
  // console.log("YOU HIT /api/post");
  // console.log("REQ.BODY IS=", req.body);
    try {
      const newComment = await Comment.create({
      
        ...req.body,
        comment: req.body.comment,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id,
        
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });


  //update existing comment
router.put('/:id', withAuth, async (req, res) => {
  try {
      const updateComment = await Comment.update(
          {
              user_id: req.session.user_id,
              comment: req.body.comment,
          },
          {
              where: {
                  id: req.params.id,
              },
          });
      if (!updateComment[0]) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
      }
      res.status(200).json(updateComment);
  } catch (e) {
      console.log(e);
      res.status(500).json(e);

  }
});

 // delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const commentData = await Comment.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });
      if (!commentData) {
          res.status(404).json({ message: 'No comment found for this user!' });
          return;
      }
      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
 
