<template>
  <div class="sidebar" :data="backgroundColor">
    <div class="sidebar-wrapper text-left">
      <div class="logo">
        <img src="../../assets/img/logo-sam.png">
      </div>
      <ul class="nav">
        <slot name="links">
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          >
            <sidebar-link
              v-for="(subLink, index) in link.children"
              :key="link.name + index"
              :link="subLink"
            >
            </sidebar-link>
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>

import SidebarLink from "./SidebarLink.vue";

export default {
  name: "side-bar",
  components: {
    SidebarLink
  },
  props: {
    backgroundColor: {
      type: String,
      default: "green",
      description: "Sidebar background color (blue|green|orange|red|primary)"
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeLinkIndex: 0
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    }
  }
};
</script>
<style></style>
