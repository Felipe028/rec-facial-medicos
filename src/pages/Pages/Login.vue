<template>
  <div class="container">
    <div
      class="col-lg-4 col-md-6 ml-auto mr-auto"
    >
      <form @submit.prevent="loginFuncionarioF">
        <card class="card-login card-white text-left">
          <template slot="header">
            <!-- <img src="img/repL1.png" class="card-img" width="50"/> -->
            <!-- <h1 class="card-title">Registre seu ponto</h1> -->
          </template>
          <div class="d-flex justify-content-evenly pt-3 pb-5">
            <img src="img/logo-samel3.jpg" class="card-img" style="width: 150px;" />
          </div>

          <div>
            <base-input
              v-show="tipoLoginFunc === 'false'"
              type="tel"
              v-mask="'##.###.###/####-##'"
              :masked="false"
              v-model="loginFuncionario.cnpj"
              placeholder="CNPJ"
              addon-left-icon="tim-icons icon-bank"
            >
            </base-input>

            <base-input
              v-if="tipoLoginFunc === 'true'"
              ref="cpf22"
              v-model="loginFuncionario.cpf"
              type="tel"
              v-mask="'###.###.###-##'"
              :masked="false"
              placeholder="CPF"
              addon-left-icon="tim-icons icon-badge"
            >
            </base-input>


            <base-input
              v-show="tipoLoginFunc === 'false'"
              name="password"
              v-model="loginFuncionario.senha"
              type="password"
              placeholder="Senha"
              addon-left-icon="tim-icons icon-lock-circle"
            >
            </base-input>
          </div>

          <div class="col-sm-10 checkbox-radios d-flex flex-row p-0">
            <base-radio name="true" v-model="tipoLoginFunc" class="mr-3"
              >Colaborador</base-radio
            >
            <!-- <base-radio name="false" v-model="tipoLoginFunc"
              >Empresa</base-radio
            > -->
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


      tipoLogin: "false", //0 - cpf / 1 - cnpj
      tipoLoginFunc: "true",
      coordenadas: [],
      loginFuncionario: {
        cnpj: "",
        senha: "",
        cpf: "",
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
    this.$nextTick(() => this.$refs.cpf22.focus());

    if (document.body.classList != "sidebar-mini") {
      document.body.classList.toggle("sidebar-mini");
    }

    this.$getLocation().then((coordinates) => {
      this.coordenadas = coordinates;
      console.log(coordinates);
    });
  },
  methods: {
    disabledBtnEntrarF() {
      if (this.tipoLoginFunc === "true") {
        if (this.loginFuncionario.cpf.length == 14) {
          return false;
        } else {
          return true;
        }
      } else {
        if (
          this.loginFuncionario.cnpj.length == 18 &&
          this.loginFuncionario.senha.length > 5
        ) {
          return false;
        } else {
          return true;
        }
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


    async loginFuncionarioF() {
      let th = this;
      this.isLoading = true;

      let bodyFormData = {
        cpf: this.loginFuncionario.cpf.replace(/[. - / - -]/g, ""),
      };
      this.axios.post("/login", bodyFormData)
        .then((response) => {
          th.isLoading = false;
          if(response.data.status){
            th.$cookies.set("nome", response.data.dados[0].NOME_PROFISSIONAL);
            th.$cookies.set("cod", response.data.dados[0].ID_PROFISSIONAL);//id funcionario
            th.$cookies.set("cpf", response.data.dados[0].CPF);
            const id =response.data.dados[0].ID_PROFISSIONAL
            let levelAccess = jwt.sign(
              { id }, 
              globalVariable.KEY_LEVEL_10, 
              {expiresIn: 2000} // expires in 1min
            );

            th.$cookies.set("levelAccess", levelAccess);
           
            th.$router.push("/selecionarSetor");
          }else{
            th.showSwal("auto-close", "Erro", response.data.msg, "error");
          }
        })
        .catch((err) => {
          th.isLoading = false;
          th.showSwal("auto-close", "Erro", "Usuario não encontrado!", "error");
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
