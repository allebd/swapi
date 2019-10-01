import express from 'express';
import helpers from '../helpers';
import middlewares from '../middlewares';
import commentController from '../controllers/commentController';

const comment = express.Router();
const COMMENT_URL = '/movie/:episodeId/comments';
const { tryCatchHelper } = helpers;
const { postComment } = commentController;
const { commentValidator: { postCommentValidator } } = middlewares;

// Route to post a comment on a movie
comment.post(`${COMMENT_URL}`, postCommentValidator, tryCatchHelper(postComment));

export default comment;
