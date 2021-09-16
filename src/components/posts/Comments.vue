<template>
  <v-row justify="center">
    <v-dialog v-model="display" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Post Comments</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div style="text-align: center; padding: 20px">
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <h1 v-if="noRecord">No Post founds</h1>
            </div>
            <v-row>
              <v-list-item
                three-line
                v-for="comment in comments"
                v-bind:key="comment.id"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ comment.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ comment.body }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="hideComments">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import * as Actions from "../../store/actions";

export default {
  name: "Comments",

  computed: {
    loading() {
      return this.$store.state.comments.loading;
    },
    display() {
      return this.$store.state.comments.display;
    },
    comments() {
      return this.$store.state.comments.list;
    },
    noRecord() {
      return !this.loading && (this.comments || []).length <= 0;
    },
  },
  methods: {
    hideComments() {
      this.$store.dispatch(Actions.Hide_Comments);
    },
  },
};
</script>
