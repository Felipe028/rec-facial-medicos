<template>
  <div class="container">

    <div class="col-lg-4 col-md-6 ml-auto mr-auto" v-if="!showSelecionarEmpresa">
      <form @submit.prevent="loginFuncionarioF">
        <card class="card-login card-white text-left">
          <template slot="header">
            <!-- <img src="img/repL2.png" class="card-img" alt="" style="width: 340px;"/> -->
            <h1 class="card-title">Login</h1>
          </template>

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
              v-model="loginFuncionario.cpf"
              type="tel"
              v-mask="'###.###.###-##'"
              :masked="true"
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
            <base-radio name="false" v-model="tipoLoginFunc"
              >Empresa</base-radio
            >
          </div>

          <div slot="footer">
            <base-button
              native-type="submit"
              type="primary"
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

    <div v-else>
      <div class="row">
        <div class="col d-flex justify-content-evenly">
          <h3 class="fw-lighter">Selecione a empresa na qual você deseja registrar check in / check out do plantão</h3>
        </div>
      </div>

      <div class="row">
        <div class="col d-flex justify-content-evenly" v-for="item in listEmpresas" :key="item.CNPJ_EMPREGADOR" @click="clickCard(item)">
          <card class="card-login card-white text-center car pt-4 pb-4">
            <template slot="header">
              <h1 class="card-title" style="font-size: 25px;">{{item.NM_FANTASIA_EMPREGADOR}}</h1>
            </template>
          </card>
        </div>
      </div>
    </div>

    <Carregando v-if="isLoading"/>
  </div>
</template>
<script>

import { Card, BaseInput } from "@/components/index";
import Carregando from "../../../src/pages/Loads/Carregando.vue";
import swal from "sweetalert2";
import jwt from 'jsonwebtoken';
import globalVariable from '../../globalVariable';

export default {
  components: {
    Card,
    BaseInput,
    Carregando
  },
  data() {
    return {
      isLoading: false,
      showSelecionarEmpresa: false,
      empresaSelecionada: {},
      listEmpresas: [],
      tipoLogin: "false",//0 - cpf / 1 - cnpj
      tipoLoginFunc: "true",
      coordenadas: [],
      loginFuncionario:{
        cnpj: "",
        senha: "",
        cpf: ""
      },
      loginEmpresa:{
        cnpj: "",
        cpf: "",
        senha: ""
      },
      model: {
        cnpj: "",
        cpf: "",
        password: "",
        subscribe: true
      }
    };
  },
  mounted(){
    if(document.body.classList != "sidebar-mini"){
      document.body.classList.toggle("sidebar-mini");
    }
    /* this.$root.$on('voltarMenuLogin', () => {
      this.itemMenu = 1
    }); */
    

    this.$getLocation()
    .then(coordinates => {
      this.coordenadas = coordinates
      console.log(coordinates);
    });
  },
  methods: {
    disabledBtnEntrarF(){
      if(this.tipoLoginFunc === "true"){
        if(this.loginFuncionario.cpf.length == 14){
          return false
        }else{
          return true
        }
      }else{
        if(this.loginFuncionario.cnpj.length == 18 && this.loginFuncionario.senha.length > 5){
          return false
        }else{
          return true
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


    clickCard(params){
      let w1 = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (30 * 60) }, globalVariable.KEY_LEVEL_10)
      this.$cookies.set("w_", w1)
      
      this.empresaSelecionada = params

      this.$cookies.set("cnpj", params.CNPJ_EMPREGADOR)
      this.$cookies.set("cpf", params.CPF_EMPREGADO)
      this.$cookies.set("db", params.DB_NAME)
      this.$cookies.set("idEmpregado", params.ID_EMPREGADO)
      this.$cookies.set("nome", params.NOME_EMPREGADO)
      this.$cookies.set("idEmpregador", params.ID_EMPREGADOR)
      this.$cookies.set("token", "sbchascas6aa6sd34h23vg42v3hg4gh234vhg234vgh2") //Expira em 10 minutos
      // this.$router.push("/registrarPonto")
      this.$router.push("/home")
    },


    disabledBtnEntrarE(){
      if(this.loginEmpresa.cnpj.length == 18 && this.loginEmpresa.senha.length > 5){
        return false
      }else{
        return true
      }
    },


    async loginFuncionarioF() {
      if(this.tipoLoginFunc === "false"){
        this.loginEmpresaF2()
        return
      }
      // this.loginFuncionario.cnpj = this.loginFuncionario.cnpj.replace(/[. - / - -]/g, '')
      this.loginFuncionario.cpf = this.loginFuncionario.cpf.replace(/[. - -]/g, '')

      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        // setDB: this.$cookies.get('db'),
        cpf_empregado: this.loginFuncionario.cpf,
        // cpf_cnpj_empregador: this.loginFuncionario.cnpj
      }
      this.axios.post('/api/login/loginEmpregadoApenasCpf', bodyFormData)
      .then((response) => {
        th.isLoading = false

        if(response.data.data.dados.length > 1){
          th.showSelecionarEmpresa = true
          th.listEmpresas = response.data.data.dados
        }else{
          if(response.data.data.dados.length == 1){
            let w1 = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (30 * 60) }, globalVariable.KEY_LEVEL_10)
            th.$cookies.set("w_", w1)
            th.$cookies.set("cnpj", response.data.data.dados[0].CNPJ_EMPREGADOR)
            th.$cookies.set("cpf", response.data.data.dados[0].CPF_EMPREGADO)
            th.$cookies.set("db", response.data.data.dados[0].DB_NAME)
            th.$cookies.set("idEmpregado", response.data.data.dados[0].ID_EMPREGADO_GERAL)
            th.$cookies.set("nome", response.data.data.dados[0].NOME_EMPREGADO)
            th.$cookies.set("idEmpregador", response.data.data.dados[0].ID_EMPREGADOR)
            th.$cookies.set("token", "sbchascas6aa6sd34h23vg42v3hg4gh234vhg234vgh2") //Expira em 10 minutos
            th.$router.push("/registrarPonto")
          }else{
            th.showSwal('auto-close', 'Erro', 'Usuario não encontrado!', 'error')
          }
        }        
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Usuario não encontrado!', 'error')
      })
    },


    loginEmpresaF2() {
      let th = this
      let cpf_cnpj = ""
      this.isLoading = true
      cpf_cnpj = this.loginFuncionario.cnpj.replace(/[. - / - -]/g, '')
    
      let bodyFormData = {
        cpf_cnpj_login: cpf_cnpj,
        passwd: this.loginFuncionario.senha
      }

      this.axios.post('/api/login/loginEmpregador', bodyFormData)
      .then((response) => {
        th.isLoading = false
        let dados = response.data.data.dados[0]
        let w1 = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (30 * 60) }, globalVariable.KEY_LEVEL_7)
        th.$cookies.set("w_", w1)
        th.$cookies.set("cnpj", dados.cnpj_login)
        th.$cookies.set("db", dados.db_name)
        th.$cookies.set("token", "sbchascas6aa6sd34h23vg42v3hg4gh234vhg234vgh2", "7MIN") //Expira em 10 minutos
        th.recuperarDados(dados.db_name, "/registraPonto", dados.cnpj_login)
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Usuario e Senha Incorreto!', 'error')
        // warning, error, success, info, and question
      })
    },


    recuperarDados(db, route, cnpj){
      let th = this
      this.isLoading = true
    
      let bodyFormData = {
        setDB: db, 
        cpf_cnpj: cnpj,
      }

      this.axios.post('/api/empregador/listarEmpregadorPorCpfCpnj', bodyFormData)
      .then((response) => {
        let dados = response.data.data.dados[0]
        th.isLoading = false
        th.$cookies.set("idEmpregador", dados.id)
        th.$router.push(route)
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao recuperar dados!', 'error')
      })
    }
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}

.car{
  cursor: pointer;
  width: 340px;
  transition: transform .5s;
}

.car:hover{
  transform: scale(1.1);
  -webkit-box-shadow: 0px 5px 10px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 5px 10px -5px rgba(0,0,0,0.75);
  box-shadow: 0px 5px 10px -5px rgba(0,0,0,0.75);
  transition: transform .2s;
}

.car:active{
  transform: scale(1);
  -webkit-box-shadow: 0px 5px 5px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 5px 5px -5px rgba(0,0,0,0.75);
  box-shadow: 0px 5px 5px -5px rgba(0,0,0,0.75);
}
</style>
