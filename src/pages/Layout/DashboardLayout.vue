<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->
    <sidebar-fixed-toggle-button />
    
    <!-- <sidebar-share :background-color.sync="backgroundColor"></sidebar-share> -->

    <div class="main-panel" :data="backgroundColor">
      <top-navbar v-if="colaborador"></top-navbar>
      <top-navbar-2 v-else></top-navbar-2>
      
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import TopNavbar2 from "./TopNavbar2.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
// import SidebarShare from "./SidebarSharePlugin.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";
import SidebarFixedToggleButton from "./SidebarFixedToggleButton.vue";
import globalVariable from "../../globalVariable";
import jwt from 'jsonwebtoken';

export default {
  components: {
    TopNavbar,
    TopNavbar2,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    // SidebarShare,
    SidebarFixedToggleButton
  },
  data() {
    return {
      backgroundColor: "green",
      colaborador: true
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  mounted(){
    let th = this
    jwt.verify(this.$cookies.get('w_'), globalVariable.KEY_LEVEL_7, function(err, decoded) {
      if(decoded){
        th.colaborador = false
      }
    })
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
