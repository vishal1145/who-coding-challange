import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import PostsView from "@/views/Posts.vue"
import Posts from "@/components/posts/Posts.vue";
import Comments from "@/components/posts/Comments.vue";
import Vuex from 'vuex'
import {
  mount
} from '@vue/test-utils'

// import Vuetify from "vuetify";
// Vue.config.productionTip = false;
// Vue.use(Vuetify);

// Ideally it should be configure with vuetify module rather than ignoring compile component
import Vue from "vue";
Vue.config.ignoredElements = [
  'v-btn', 'v-icon', 'v-card', 'v-card-text', 'v-spacer', 'v-card-actions', 'v-row', 'v-container', 'v-card-title',
  'v-text-field', 'v-col', 'v-dialog', 'v-card-subtitle', 'v-col', 'v-list-item-subtitle', 'v-list-item',
  'v-list-item-title', 'v-list-item-content'
];

const localVue = createLocalVue()
localVue.use(Vuex)

const posts = {
  state: {
    list: [{
      id: 1,
      title: 'title',
      body: 'body'
    }],
    loading: false,
    newPost: false,
  },
  actions: {
    getPosts: jest.fn(),
    newPost: jest.fn(),
    createPost: jest.fn()
  },
};

const comments = {
  state: {
    list: [{
      id: 1,
      name: 'name',
      body: 'body'
    }, {
      id: 2,
      name: 'name',
      body: 'body'
    }],
    display: false,
    loading: false,
  },
  actions: {
    getComments: jest.fn(),
    hideComments: jest.fn()
  },
};

describe("Posts.vue", () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        posts,
        comments
      }
    })
  })

  it("dispatch action when render", () => {
    mount(PostsView, {
      store,
      localVue
    });
    expect(posts.actions.getPosts).toHaveBeenCalled()
  });

  describe("Components", () => {
    describe("Posts", () => {
      it("set posts in vue store and display posts when received posts from api", () => {
        const wrapper = shallowMount(Posts, {
          store,
          localVue
        });
        expect(wrapper.vm.posts.length).toBe(1);
      });
      it("open comments modal on comments button click", async () => {
        const wrapper = shallowMount(Posts, {
          store,
          localVue
        });
        wrapper.find('v-btn').trigger('click');
        expect(comments.actions.getComments).toHaveBeenCalled();
      });

      it("open add modal on add button click", async () => {
        const wrapper = mount(PostsView, {
          store,
          localVue
        });
        wrapper.find('#newPost').trigger('click')
        expect(posts.actions.newPost).toHaveBeenCalled();
      });
    });

    describe("Comments", () => {
      it("set comments in vue store and display comments when click on comments button", () => {
        const wrapper = shallowMount(Comments, {
          store,
          localVue
        });
        expect(wrapper.vm.comments.length).toBe(2);
      });
    });

  })
});