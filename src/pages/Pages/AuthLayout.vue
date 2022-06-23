<template>
  <div>
    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-end"
      class="auth-navbar fixed-top"
    >
      <!-- <div slot="brand" class="navbar-wrapper" v-show="showV">
        <a class="navbar-brand" href="#" v-if="title" @click="voltarMenuLogin()">
          <i class="tim-icons icon-minimal-left"></i> Voltar
        </a>
      </div> -->

      <!-- <ul class="navbar-nav"> -->
        <!-- <li class="nav-item" style="cursor: pointer;">
          <a class="nav-link text-primary" @click="voltarMenuLogin()">
            
          </a>
        </li> -->
        <!-- <router-link class="nav-item" tag="li" to="/login">
          <a class="nav-link text-primary">
            <i class="tim-icons icon-minimal-left"></i> Back to Dashboard
          </a>
        </router-link> -->
        <!-- <router-link class="nav-item" tag="li" to="/register">
          <a class="nav-link">
            <i class="tim-icons icon-laptop"></i> Register
          </a>
        </router-link> -->

        <!-- <router-link class="nav-item" tag="li" to="/login">
          <a class="nav-link">
            <i class="tim-icons icon-single-02"></i> Login
          </a>
        </router-link> -->

        <!-- <router-link class="nav-item" tag="li" to="/pricing">
          <a class="nav-link"> <i class="tim-icons icon-coins"></i> Pricing </a>
        </router-link> -->

        <!-- <router-link class="nav-item" tag="li" to="/lock">
          <a class="nav-link">
            <i class="tim-icons icon-lock-circle"></i> Lock
          </a>
        </router-link> -->
      <!-- </ul> -->
    </base-nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">

        <!-- <div class="content">
          <router-view></router-view>
        </div> -->
        <div class="d-flex align-items-center" style="height: 100vh;">
          <router-view></router-view>
        </div>

        <p class="d-sm-block d-md-none" style="height: 70px;"></p>

        <footer class="footer">
          <div class="container-fluid">
            <nav>
              <ul class="nav">
                <li class="nav-item">
                  <a
                    href="javascript:void(0)"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    CNPJ 84.537.141/0001-38
                  </a>
                </li>
              </ul>
            </nav>
            <div class="copyright">
              &copy; 2022, <!-- &copy;{{ new Date().getFullYear() }} -->Samel Assistência Médica. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
export default {
  components: {
    BaseNav
  },
  data() {
    return {
      showMenu: false,
      pageClass: "login-page",
      showV: false
    };
  },

  computed: {
    title() {
      return `${this.$route.name} Page`;
    }
  },

  mounted(){
    this.setPageClass();
    
    this.$root.$on('showV', () => {
      this.showV = true
    });
  },

  methods: {
    /* voltarMenuLogin(){
      this.$root.$emit('voltarMenuLogin')
      this.showV = false
    }, */


    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    setPageClass() {
      this.pageClass = `${this.$route.name}-page`.toLowerCase();
    }
  },
  beforeDestroy() {
    this.closeMenu();
  },
  beforeRouteUpdate(to, from, next) {
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },

  watch: {
    $route() {
      this.setPageClass();
    }
  }
};
</script>
<style></style>
