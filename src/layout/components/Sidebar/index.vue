<template>
  <div :class="{'has-logo':showLogo}">
    <!--
         <div class="operation"
         v-if="activeMenu=='' && !isCollapse">
      <el-dropdown size="medium"
                   placement="right-start"
                   trigger="click">
        <el-button type="primary">
          快速新建
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button icon="iconfont icon-user-tie"
                       v-rules="{admin:'admin',ordinary:'customer:add'}"
                       @click="addCustomer('add', 1)">客户</el-button>
            <el-button class="iconfont icon-clipboard-check"
                       v-rules="{admin:'admin',ordinary:'task:add'}"
                       @click="showAddDialog=true">任务</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeSidebarMenu"
               :collapse="isCollapse"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :unique-opened="true"
               :active-text-color="variables.siderText"
               :collapse-transition="false"
               mode="vertical">
        <sidebar-item v-for="(route, index) in activeRouteList"
                      :key="route.path  + index"
                      :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <!--新建客户 -->

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";


import { dict } from "@/api/common";
export default {
  components: { SidebarItem, },
  data () {
    return {
      typeOptions: {
        operation: "add"
      },
      showAddDialog: false,

      option: "",
      title: "",
      sourceOptions: [],
      levelOptions: []
    };
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters([
      "activeRouteList",
      "sidebar",
      "activeSidebarMenu",
      "activeMenu"
    ]),
    variables () {
      return variables;
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  watch: {
    $route (to, from) {
      this.findActiveMenu()
    }
  },
  mounted () {
    // this.getSource();
    // this.getLevel();
    // this.getVisit();
    this.findActiveMenu();
  },
  methods: {
    ...mapActions(["set_sidebar_menu"]),
    findActiveMenu () {
      const route = this.$route;
      const { meta, path } = route;
      const data = this.activeRouteList.find(item => path.includes(item.path));
      this.set_sidebar_menu(path);
    },
    // // 客户跟进类型
    // getVisit () {
    //   let data = {
    //     dictType: "customer_follow"
    //   };
    //   dict(data)
    //     .then(res => {
    //       this.visitOptions = res.data[0].dataList;
    //     })
    //     .catch(err => console.log(err));
    // },
    // // 客户来源
    // getSource () {
    //   let data = {
    //     dictType: "customer_source"
    //   };
    //   dict(data)
    //     .then(res => {
    //       this.sourceOptions = res.data[0].dataList;
    //     })
    //     .catch(err => console.log(err));
    // },
    // // 客户级别
    // getLevel () {
    //   let data = {
    //     dictType: "customer_level"
    //   };
    //   dict(data)
    //     .then(res => {
    //       this.levelOptions = res.data[0].dataList;
    //       this.$emit("levelValue", this.levelOptions);
    //     })
    //     .catch(err => console.log(err));
    // },

  }
};
</script>

<style lang="scss" scope>
.operation {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
}
.el-dropdown-menu--medium .el-dropdown-menu__item {
  height: 40px;
}
</style>
