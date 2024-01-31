<template>
  <div></div>
</template>

<script>
import store from './../store'
import { mapGetters, mapActions } from "vuex";
export default {
  // permission_routes
  created () {
    if (this.$route.path == '/' || this.$route.path == '/root') {
      // console.log(store.getters.permission_routes)
      // let firstUrl = store.getters.permission_routes[8].path + '/' + store.getters.permission_routes[8].children[0].path;
      // let firstUrl = store.getters.permission_routes[0].path + '/' + store.getters.permission_routes[0].children[0].path;
      // console.log('firstUrl' + firstUrl)
      this.$router.push({ path: '/home/index' });
    }
  },
};
</script>


