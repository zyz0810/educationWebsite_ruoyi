<template>
  <div :class="classObj"
       class="app-wrapper">
    <top-view />
    <div class="main-container">
<!--      <div :class="{'fixed-header':fixedHeader}">-->
<!--      </div>-->
      <app-main />
    </div>
    <page-footer />
  </div>
</template>

<script>
// import RightPanel from "@/components/RightPanel";
import {
  AppMain,
  // Settings,
  // Sidebar,
  // TagsView,
  TopView,
  PageFooter
} from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    // RightPanel,
    TopView,
    // Settings,
    // Sidebar,
    // TagsView,
    PageFooter
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
.main-container{
  margin-top: 72px;
  min-width: 1200px;
  overflow: auto;
}

.app-wrapper {
  @include clearfix;
  /*overflow: hidden;*/
  /*min-height: 100vh;*/

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
