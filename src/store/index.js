import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../firebase";
import postApi from "../components/services/posts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    postid: null,
    post: [],
    allposts: [],
    users: [],
    requestsuser: [],
    myfriends: [],
    comments: [],
    fivourite: [],
    myrquests: [],
    likes: [],
    newUser: null,
    singleUser: null
  },
  getters: {
    signleUserData(state) {
      return state.singleUser;
    },
    user(state) {
      return state.user;
    },
    newuser(state) {
      return state.newUser;
    },

    error(state) {
      return state.error;
    },
    postId(state) {
      return state.postid;
    },
    posts(state) {
      return state.post;
    },
    allpost(state) {
      return state.allposts;
    },
    allusers(state) {
      return state.users;
    },
    getrequests(state) {
      return state.requestsuser;
    },
    friends(state) {
      return state.myfriends;
    },
    getcomments(state) {
      return state.comments;
    },
    getFivourite(state) {
      return state.fivourite;
    },
    getMyLikes(state) {
      return state.likes;
    },
    myrequest(state) {
      return state.myrquests;
    },
  },
  mutations: {

    setSingleUserData(state, payload) {
      state.singleUser = payload;
    },
    allusers(state, payload) {
      state.users = payload;
    },
    setCurrentUser(state, payload) {
      state.user = payload;
    },
    editPost(state, payload) {
      console.log(payload);
      let index = state.allposts.findIndex((i) => {
        console.log(i);
        return i.postId === payload.postId;
      });
      console.log(index);
      state.allposts.splice(index, 1, payload);
    },
    setUser(state, payload) {
      localStorage.setItem("token", `Bearer ${payload.token}`);
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.user = payload.user;
    },
    updateProfileImg(state, payload) {
      state.user.img = payload
    },
    updateCoverImg(state, payload) {
      state.user.coverImg = payload
    },
  },
  actions: {
    logout({ commit }) {
      auth.signOut();
      commit("setIduser", null);
    },
  
    login({ commit }, payload) {
      commit("setUser", payload);
    },
    setUserData({ dispatch }, payload) {
      const { token, user } = payload.data;
      console.log(token);
      console.log(user);
      let date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 7 * 1000);
      let expires = "expires=" + date.toUTCString();
      document.cookie =
        "TokenUser=" + payload.token + ";" + expires + ";path=/";
      console.log(document.cookie);
      dispatch("setCurrentUser", user);
      localStorage.setItem("userToken", token);
    },
    setCurrentUser({ commit }, user) {
      commit("setCurrentUser", user);
    },
    async fetchPostsFromDb({ state }) {
      try {
        const posts = await postApi.getPosts();
        console.log(posts);
        state.allposts = posts.data.posts;
        return;
      } catch (error) {
        console.log(error);
      }
    },
    pushNewComment({ state }, payload) {
      console.log(payload);
      console.log("add");
      const commentId = payload._id;
      const postId = payload.postId;
      const comment = {
        _id: commentId,
        description: payload.description,
        userId: payload.userId,
        date: payload.date,
        name: payload.name,
        img: payload.img[0],
      };
      const specificPost = state.allposts.findIndex((p) => {
        return p._id == postId;
      });
      console.log(specificPost);
      state.allposts[specificPost].comments.push(comment);
    },
    addPost({ state }, payload) {
      let finalData = {
        ...payload.post,
        userId: payload.userDate,
      };
      state.allposts.unshift(finalData);
    },
    editPost({ state }, payload) {
      console.log(payload);
      const specificPost = state.allposts.findIndex((p) => {
        return p._id == payload._id;
      });
      state.allposts[specificPost].description = payload.description;
      state.allposts[specificPost].img = payload.img;
    },
    deleteComment({ state }, payload) {
      let postId = payload.postId;
      let commentId = payload.commentId;
      let post = state.allposts.findIndex((i) => {
        return i._id == postId;
      });
      let comments = state.allposts[post].comments.filter((i) => {
        return i._id !== commentId;
      });
      state.allposts[post].comments = comments;
    },
    editComment({ state }, payload) {
      let { commentId, newComment, postId } = payload;
      let post = state.allposts.findIndex((i) => {
        return i._id == postId;
      });
      let commentIndex = state.allposts[post].comments.findIndex((i) => {
        return i._id == commentId;
      });
      state.allposts[post].comments[commentIndex].description = newComment;
    },
    deletePost({ state }, payload) {
      state.allposts = state.allposts.filter((p) => {
        return p._id !== payload;
      });
    },
    updateUser({ state }, payload) {
      state.user = payload.user;
    },
    RemoveSavePost({ state }, payload) {
      state.user.savedPosts = payload.user;
    },
    async getSingleUser({ commit }, payload) {
      try {
        const res = await postApi.getSingleUser(payload);
        console.log(res.data.user);
        let userData = res.data.user
        commit("setSingleUserData", userData);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
