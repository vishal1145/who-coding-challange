import Vue from "vue";
import Vuex from "vuex";
import * as Mutations from "./mutations";

Vue.use(Vuex);

import { getPosts, addPost, getComments } from "../services/posts";

const posts = {
  state: {
    list: [],
    loading: false,
    newPost: false,
  },
  mutations: {
    toggleLoading(state, toggleState) {
      state.loading = toggleState;
    },
    showPosts(state, posts) {
      state.list = posts;
      state.loading = false;
    },
    toggleNewPost(state, toggleState) {
      state.newPost = toggleState;
    },
  },
  actions: {
    getPosts(context, query) {
      context.commit(Mutations.Toggle_Loading, true);
      getPosts(query)
        .then((posts) => {
          context.commit(Mutations.Show_Posts, posts.data || []);
        })
        .catch((err) => {
          context.dispatch(
            Mutations.Toggle_Notification,
            "Error in fetching post - " + err
          );
        });
    },
    newPost(context, toggleState) {
      context.commit(Mutations.Toggle_New_Post, toggleState);
    },
    createPost(context, post) {
      context.commit(Mutations.Toggle_New_Post, false);
      addPost(post)
        .then(() => {
          context.dispatch(
            Mutations.Toggle_Notification,
            "Post added success fully, But it will not be visible asd it api getting top 100 by default"
          );
        })
        .catch((err) => {
          context.dispatch(
            Mutations.Toggle_Notification,
            "Error in adding post - " + err
          );
        });
    },
  },
};

const comments = {
  state: {
    list: [],
    display: false,
    loading: false,
  },
  mutations: {
    toggleLoading(state, toggleState) {
      state.loading = toggleState;
    },
    toggleDisplay(state, toggleState) {
      state.display = toggleState;
    },
    showComments(state, comments) {
      state.list = comments;
      state.loading = false;
    },
    hideComments(state) {
      state.list = [];
      state.display = false;
      state.loading = false;
    },
  },
  actions: {
    getComments(context, id) {
      console.log(id);
      context.commit(Mutations.Toggle_Loading, true);
      context.commit(Mutations.Toggle_Display, true);
      getComments(id)
        .then((comments) => {
          context.commit(Mutations.Show_Comments, comments.data || []);
        })
        .catch((err) => {
          context.commit(Mutations.Hide_Comments);
          context.commit(
            Mutations.Toggle_Notification,
            "Error in fetching comment - " + err
          );
        });
    },
    hideComments(context) {
      context.commit(Mutations.Hide_Comments);
    },
  },
};

export default new Vuex.Store({
  state: {
    notification: "",
  },
  mutations: {
    toggleNotification(state, payload) {
      state.notification = payload;
    },
  },
  actions: {
    toggleNotification(context, payload) {
      context.commit("toggleNotification", payload);
    },
  },
  modules: {
    posts,
    comments,
  },
});
