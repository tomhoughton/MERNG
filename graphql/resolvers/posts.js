const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check_auth');

module.exports = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find().sort({ createdat: -1 });
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try{
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    console.log('wrong id')
                    throw new Error('Post not found')
                }
            } catch(err) {
                console.log(`Other error: ${err}`);
                throw new Error('Post not found');
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);
            
            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdat: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error (err);
            }
        }
    }
}