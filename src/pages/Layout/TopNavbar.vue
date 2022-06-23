<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-minimize d-inline"><sidebar-toggle-button /></div>
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <!-- <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button> -->
        </div>
        <a class="navbar-brand" href="javascript:void(0)"> {{ $route.name }}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
          <!-- <li class="search-bar input-group" @click="searchModalVisible = true">
            <button
              class="btn btn-link"
              id="search-button"
              data-toggle="modal"
              data-target="#searchModal"
            >
              <i class="tim-icons icon-zoom-split"></i>
              <span class="d-lg-none d-md-block">Search</span>
            </button>
          </li>
          <modal
            :show.sync="searchModalVisible"
            class="modal-search"
            id="searchModal"
            :centered="false"
            :show-close="true"
          >
            <input
              slot="header"
              v-model="searchQuery"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="SEARCH"
            />
          </modal> -->


          <!-- <drop-down>
            <a
              href="javascript:void(0)"
              data-toggle="dropdown"
              class="dropdown-toggle nav-link"
            >
              <div class="notification d-none d-lg-block d-xl-block"></div>
              <i class="tim-icons icon-sound-wave"></i>
              <p class="d-lg-none text-left">
                Notifications
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Mike John responded to your email</a
                >
              </li>
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item"
                  >You have 5 more tasks</a
                >
              </li>
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item"
                  >Your friend Michael is in town</a
                >
              </li>
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item"
                  >Another notification</a
                >
              </li>
              <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item"
                  >Another one</a
                >
              </li>
            </ul>
          </drop-down> -->
          <!-- <li class="search-bar input-group" @click="searchModalVisible = true">
            <button
              class="btn btn-link"
              style="color: #1d253b;"
              id="search-button"
              data-toggle="modal"
              data-target="#searchModal"
              @click="$router.push('/home')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
              </svg>
              <span class="d-lg-none d-md-block">Principal</span>
            </button>
          </li> -->
          <li class="d-none d-lg-block d-xl-block">
            <p class="d-flex align-items-center h-100">{{this.$cookies.get('nome')}}</p>
          </li>          
          <drop-down>
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo">
                <img v-if="imgRecente" :src="'data:image/png;base64,'+imgRecente" id='vitrine' alt="Profile Photo" />
                <img v-else src="@/assets/img/anime3.png" alt="Profile Photo" />
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <p class="d-lg-none">
                {{this.$cookies.get('nome')}}
              </p>
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <!-- <li class="nav-link">
                <a href="/#/registrarPonto/colaborador" class="nav-item dropdown-item"
                  >Registro de Pontos</a
                >
              </li>
              <li class="nav-link">
                <a href="/#/abono" class="nav-item dropdown-item"
                  >Abono</a
                >
              </li>
              <li class="dropdown-divider"></li> -->
              <li class="nav-link" @click="logout()">
                <a href="javascript:void(0)" class="nav-item dropdown-item"
                  >Sair</a
                >
              </li>
            </ul>
          </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import DropDown from "@/components/Dropdown.vue";
import Modal from "@/components/Modal.vue";
import SidebarToggleButton from "./SidebarToggleButton.vue";

export default {
  components: {
    DropDown,
    Modal,
    SidebarToggleButton
  },
  data() {
    return {
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
      imgRecente: ""
    };
  },
  mounted(){
    this.carregarFotoF()
    if(document.body.classList != "sidebar-mini"){
      document.body.classList.toggle("sidebar-mini");
    }
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    router(param){
      this.$router.push(param)
    },


    carregarFotoF(){
      let th = this
      let jsonn = new FormData
      jsonn.append("nrCpf", this.$cookies.get('cpf'))
      
      this.axios.post(`${process.env.VUE_APP_API_ADDRESS_REC_FACIAL}/getFotoRecente`, jsonn)
      .then((response) => {
        th.imgRecente = response.data.ImagemRecente
      })
      .finally(() => {})
      .catch(() => {
      });
    },


    logout() {
      if (confirm("deseja sair?")) {
        this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
        this.$router.push("/login");
      } else {
        //console.log("não sair");
      }
    },
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  }
};
</script>
<style>
</style>
