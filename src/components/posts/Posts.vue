<template>
  <div>
    <div style="text-align: center; padding: 20px">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
      <h1 v-if="noRecord">No Post founds</h1>
    </div>
    <v-row dense>
      <v-col cols="4" sm="12" md="4" v-for="post of posts" v-bind:key="post.id">
        <v-card color="#1F7087" dark>
          <v-card-title class="text-h5">
            <div class="post-title">
              {{ post.title }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div class="post-desc">{{ post.body }}</div>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn text @click="showComments(post.id)">
              <v-icon>mdi-open-in-new</v-icon> Comments
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import * as Actions from "../../store/actions";
export default {
  name: "Comments",

  computed: {
    loading() {
      return this.$store.state.posts.loading;
    },
    posts() {
      return this.$store.state.posts.list;
    },
    noRecord() {
      return !this.loading && (this.posts || []).length <= 0;
    },
  },
  methods: {
    showComments(id) {
      this.$store.dispatch(Actions.Get_Comments, id);
    },
  },
};
</script>

<style scoped>
.post-title {
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-desc {
  height: 80px;
}
</style>
