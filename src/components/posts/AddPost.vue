<template>
  <v-row justify="center">
    <v-dialog v-model="display" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Post title*"
                  required
                  v-model="post.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="post.description"
                  label="Post desciption"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="hidePost"> Close </v-btn>
          <v-btn
            :disabled="disabled"
            color="blue darken-1"
            text
            @click="createPost"
          >
            Save
          </v-btn>
        </v-card-actions>
        <div v-if="toaster">
          <v-snackbar
            :timeout="-1"
            :value="true"
            absolute
            centered
            color="deep-purple accent-4"
            elevation="24"
          >
            Lorem ipsum dolor sit amet consectetur.
          </v-snackbar>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import * as Actions from "../../store/actions";

const blankPost = {
  title: "",
  description: "",
};

export default {
  name: "AddPost",

  data: () => ({
    post: blankPost,
    toaster: false,
  }),

  computed: {
    display() {
      return this.$store.state.posts.newPost;
    },
    disabled() {
      return !(this.post.title && this.post.description);
    },
  },
  methods: {
    resetPost() {
      this.post = blankPost;
    },
    createPost() {
      this.post.title = " ";
      this.post.description = " ";
      this.$store.dispatch(Actions.Create_Post, this.post);
      // this.toaster = true;
      // const self = this;

      // setTimeout(() => {
      //   self.toaster = true;
      // }, 3000);
    },
    hidePost() {
      this.$store.dispatch(Actions.New_Post, false);
      this.post = "";
    },
  },
};
</script>
