import axios from "./mainApi";

class posts {
  static createPost(post) {
    return axios().post(`create-post`, post);
  }
  static editProfile(data) {
    return axios().post(`edit-profile/${data.userId}`, data);
  }
  static uploadCroppedImage({ userId, formData }) {
    return axios().put(`cropped-img/${userId}`, formData);
  }
  static pushToAllNotifications({
    userId,
    friendId,
    msg,
    postId,
    action,
    name,
    img,
  }) {
    return axios().post(`push-all-notifications/`, {
      userId,
      friendId,
      msg,
      postId,
      action,
      name,
      img,
    });
  }
  static editPost(data) {
    return axios().post(`edit-post`, data);
  }
  static deletePost(postId) {
    return axios().post(`delete-post/${postId}`);
  }
  static register(user) {
    return axios().post("signup", user);
  }
  static getuserWithToken(token) {
    return axios().get(`getuserToken/${token}`);
  }
  static login(user) {
    return axios().post("login", user);
  }
  static getPosts() {
    return axios().get(`admin/posts`);
  }
  static creatComment({ user, postId, comment }) {
    return axios().post(`create-comment`, { user, postId, comment });
  }
  static addLike({ user, postId }) {
    return axios().post(`add-like`, { user, postId });
  }
  static removeLike({ user, postId }) {
    return axios().post(`remove-like`, { user, postId });
  }
  static deleteComment({ commentId, postId }) {
    return axios().post(`delete-comment/${commentId}`, {
      postId,
    });
  }
  static editComment({ postId, newComment, commentId }) {
    return axios().post(`edit-comment/${commentId}`, {
      postId,
      newComment,
    });
  }
  static deletPost(postId) {
    return axios().post(`delete-post`, { postId });
  }
  static savePost(data) {
    return axios().post(`save-post`, {
      postId: data.post._id,
      img: data.post.img,
      description: data.post.description,
      userId: data.userId,
    });
  }
  static removeSaved(data) {
    return axios().post(`zremoveSaved`, data);
  }
  static getSingleUser(data) {
    return axios().get(`current-user/${data}`);
  }
  static getusers() {
    return axios().get(`admin/users`);
  }
  static getuserToken(token) {
    return axios().get(`user/${token}`);
  }
  static sendFriendRequest(data) {
    return axios().post(`add-friend-request/`, data);
  }
  static rejectfriend({ userId, friendId }) {
    return axios().post(`reject-new-friend/`, {
      userId,
      friendId,
    });
  }
  static deleteFriend({ userId, friendId }) {
    return axios().post(`delete-friend/${friendId}`, {
      userId,
    });
  }
}
export default posts;
