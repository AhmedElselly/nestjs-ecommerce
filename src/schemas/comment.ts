import mongoose, {Schema} from 'mongoose';

export const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;