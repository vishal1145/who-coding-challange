<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Search Post"
          placeholder="Search Post by title"
          v-model="searchTitle"
          v-on:keyup="search()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-alert color="#2A3B4D" dark icon="mdi-firework" dense v-if="notification">
      {{ notification }}
    </v-alert>
    <Posts></Posts>
    <div style="position: fixed; bottom: 40px; right: 40px">
      <v-btn color="pink" dark fab @click="openPostModal()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <AddPost></AddPost>
    <Comments></Comments>
  </v-container>
</template>

<script>
import Comments from "../components/posts/Comments.vue";
import AddPost from "../components/posts/AddPost.vue";
import Posts from "../components/posts/Posts.vue";
import * as Actions from "../store/actions";

export default {
  components: {
    Posts,
    AddPost,
    Comments,
  },

  data: () => ({
    searchTitle: "",
  }),

  computed: {
    notification() {
      return this.$store.state.notification;
    },
  },
  watch: {
    notification: function (val) {
      if (val) {
        // hide notificaion after 3 seconds
        setTimeout(
          () => this.$store.dispatch(Actions.Toggle_Notification, ""),
          3000
        );
      }
    },
  },
  async mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      this.$store.dispatch(Actions.Get_Posts, this.searchTitle);
    },
    debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    },
    search() {
      this.debounce(this.loadPost());
    },
    openPostModal() {
      this.$store.dispatch(Actions.New_Post, true);
    },
  },
};
</script>
