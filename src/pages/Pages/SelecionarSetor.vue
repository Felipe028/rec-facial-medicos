<template>
  <div class="container">
    <div
      class="col-lg-4 col-md-6 ml-auto mr-auto"
    >
      <form @submit.prevent="selecionarSetor">
        <card class="card-login card-white text-left">
          <template slot="header">
            <!-- <img src="img/repL1.png" class="card-img" width="50"/> -->
            <!-- <h1 class="card-title">Registre seu ponto</h1> -->
          </template>
          <div class="d-flex justify-content-evenly pt-3 pb-5">
            <img src="img/logo-samel3.jpg" class="card-img" style="width: 150px;" />
          </div>

          <div>
            <el-select
              class="select-primary w-100"
              size="large"
              placeholder="Selecione o setor"
              v-model="setor"
            >
              <el-option
                v-for="option in listSetores"
                class="select-primary"
                :value="option.ID_SETOR"
                :label="option.NOME_SETOR"
                :key="option.NOME_SETOR"
              >
              </el-option>
            </el-select>

            <el-select
              class="select-primary w-100 mt-3"
              size="large"
              placeholder="Selecione o turno"
              v-model="turno"
            >
              <el-option
                v-for="option in listTurnos"
                class="select-primary"
                :value="option.ID_TURNO"
                :label="option.NOME_TURNO"
                :key="option.NOME_TURNO"
              >
              </el-option>
            </el-select>
          </div>


          <div slot="footer">
            <base-button
              native-type="submit"
              type="success"
              class="mb-3"
              size="lg"
              :disabled="disabledBtnEntrarF()"
              block
            >
              Entrar
            </base-button>
          </div>
        </card>
      </form>
    </div>

    
    <Carregando v-if="isLoading" />
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import Carregando from "../../../src/pages/Loads/Carregando.vue";
import swal from "sweetalert2";
import jwt from "jsonwebtoken";
import globalVariable from "../../globalVariable";
import ContentFooter from "../../../src/pages/Layout/ContentFooter.vue";

export default {
  components: {
    Card,
    BaseInput,
    Carregando,
    ContentFooter,
  },
  data() {
    return {
      isLoading: false,
      listSetores: [],
      listTurnos: [],
      setor: "",
      turno: "",


      empresaSelecionada: {},
      listEmpresas: [],
      tipoLogin: "false", //0 - cpf / 1 - cnpj
      tipoLoginFunc: "true",
      coordenadas: [],
      loginFuncionario: {
        cnpj: "",
        senha: "",
        cpf: "",
      },
      loginEmpresa: {
        cnpj: "",
        cpf: "",
        senha: "",
      },
      model: {
        cnpj: "",
        cpf: "",
        password: "",
        subscribe: true,
      },
    };
  },
  mounted() {
    this.getSetores()
    this.getTurnos()
    this.$nextTick(() => this.$refs.cpf22.focus());

    if (document.body.classList != "sidebar-mini") {
      document.body.classList.toggle("sidebar-mini");
    }
    /* this.$root.$on('voltarMenuLogin', () => {
      this.itemMenu = 1
    }); */

    this.$getLocation().then((coordinates) => {
      this.coordenadas = coordinates;
      console.log(coordinates);
    });
  },
  methods: {
    disabledBtnEntrarF() {
      if (this.setor === "" || this.turno === "") {
        return true;
      } else {
        return false
      }
    },

    showSwal(type, title, text, typeMsg) {
      if (type === "auto-close") {
        swal({
          title: title,
          text: text,
          type: typeMsg,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    },


    selecionarSetor(){
      this.$cookies.set("id_setor", this.setor);
      this.$cookies.set("id_turno", this.turno);
      this.$router.push("/registrarPonto/colaborador");
    },


    getSetores() {
      let th = this;
      this.isLoading = true;

      this.axios
        .get("/getSetores")
        .then((response) => {
          th.isLoading = false
          th.listSetores = response.data.dados
        })
        .catch((err) => {
          th.isLoading = false;
          th.showSwal(
            "auto-close",
            "Erro",
            "Erro ao recuperar setores!",
            "error"
          );
        });
    },


    getTurnos() {
      let th = this;
      this.isLoading = true;

      this.axios
        .get("/getTurnos")
        .then((response) => {
          th.isLoading = false
          th.listTurnos = response.data.dados
        })
        .catch((err) => {
          th.isLoading = false;
          th.showSwal(
            "auto-close",
            "Erro",
            "Erro ao recuperar setores!",
            "error"
          );
        });
    },
    

  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}

.car {
  cursor: pointer;
  width: 340px;
  transition: transform 0.5s;
}

.car:hover {
  background: #f3f3f3;
  transform: scale(1.1);
  -webkit-box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.75);
  transition: transform 0.2s;
}

.car:active {
  transform: scale(1);
  -webkit-box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.75);
}
</style>
