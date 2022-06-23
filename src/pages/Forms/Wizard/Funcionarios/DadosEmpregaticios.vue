<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-5">
      <div class="row">
        <base-input
          name="dataAdmissao"
          class="col-sm-4"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data de Admissao"
          v-model="model.dataAdmissao"
          v-validate="modelValidations.dataAdmissao"
          :error="getError('dataAdmissao')"
        >
        </base-input>

        <base-input
          name="horasContratadas"
          class="col-sm-4"
          type="tel"
          v-mask="'##'"
          required
          placeholder="Horas Contratadas"
          v-model="model.horasContratadas"
        >
        </base-input>
        
        <base-input
          name="valorPlano"
          class="col-sm-4"
          type="tel"
          v-mask="'####'"
          required
          placeholder="Valor do Plano de Saúde"
          v-model="model.valorPlanoSaude"
        >
        </base-input>
      </div>

      <div class="row">
        <base-input
          name="nrContaBancaria"
          class="col-sm-6"
          type="tel"
          v-mask="'#########'"
          required
          placeholder="Número da Conta Bancária"
          v-model="model.nrContaBancaria"
        >
        </base-input>

        <base-input
          name="nrBanco"
          class="col-sm-6"
          type="tel"
          v-mask="'######'"
          required
          placeholder="Banco"
          v-model="model.nrBanco"
        >
        </base-input>
      </div>

      <div class="row">
        <el-select
            name="funcao"
            required
            class="select-success col-sm-6 pagination-select"
            v-model="model.funcao"
            v-validate="modelValidations.funcao"
            placeholder="Função"
            :error="getError('funcao')"
        >
          <el-option v-for="item in listFuncoes" :key="item.id" class="select-success" :label="item.descricao" :value="item.id">{{item.descricao}}</el-option>
        </el-select>
        
        <base-button round icon type="success" @click="modalCadastrarFunc = true">
          <i class="tim-icons icon-simple-add"></i>
        </base-button>
        <modal :show.sync="modalCadastrarFunc">
          <template slot="header">
              <h4 class="modal-title" id="exampleModalLabel">Cadastro de Função</h4>
          </template>
          <div>
            <base-input
              name="dataAdmissao"
              class="col-sm-12"
              placeholder="Descrição"
              v-model="descricaoCadFunc"
            >
            </base-input>
          </div>
          <template slot="footer">
              <base-button type="danger" @click="modalCadastrarFunc = false">Fechar</base-button>
              <base-button type="success" @click="cadastrarFuncao()">Salvar</base-button>
          </template>
        </modal>

        <!-- <base-button round icon type="success">
          <i class="tim-icons icon-pencil"></i>
        </base-button> -->
      </div>


      <div class="row">
        <el-select
            name="departamento"
            required
            class="select-success col-sm-6 pagination-select"
            v-model="model.departamento"
            v-validate="modelValidations.departamento"
            placeholder="Departamento"
            :error="getError('departamento')"
        >
          <el-option v-for="item in listDepartamentos" :key="item.id" class="select-success" :label="item.descricao" :value="item.id">{{item.descricao}}</el-option>
        </el-select>
        <base-button round icon type="success" @click="modalCadastrarDep = true">
          <i class="tim-icons icon-simple-add"></i>
        </base-button>
        <modal :show.sync="modalCadastrarDep">
          <template slot="header">
              <h4 class="modal-title" id="exampleModalLabel">Cadastro de Departamento</h4>
          </template>
          <div>
            <base-input
              name="dataAdmissao"
              class="col-sm-12"
              placeholder="Descrição"
              v-model="descricaoCadDep"
            >
            </base-input>
          </div>
          <template slot="footer">
              <base-button type="danger" @click="modalCadastrarDep = false">Fechar</base-button>
              <base-button type="success" @click="cadastrarDepartamento()">Salvar</base-button>
          </template>
        </modal>

        <!-- <base-button round icon type="success">
          <i class="tim-icons icon-pencil"></i>
        </base-button> -->
      </div>

  
    </div>
    <Carregando v-if="isLoading"/>
  </div>
</template>
<script>
import { BaseInput } from "@/components";
import Modal from "@/components/Modal.vue";
import Carregando from "../../../../../src/pages/Loads/Carregando.vue";
import swal from "sweetalert2";

export default {
  name: "dados-empregaticios",
  components: {
    BaseInput,
    Carregando,
    Modal
  },

  data() {
    return {
      isLoading: false,
      listDepartamentos: [],
      listFuncoes: [],
      descricaoCadFunc: "",
      descricaoCadDep: "",
      descricaoCadDep: "",
      modalCadastrarFunc: false,
      modalCadastrarDep: false,
      model: {
        dataAdmissao: "",
        horasContratadas: "",
        valorPlanoSaude: "",
        nrContaBancaria: "",
        nrBanco: "",
        funcao: "",
        departamento: ""
      },
      modelValidations: {
        dataAdmissao: {
          required: false,
          min: 10
        },
        naturalizado: {
          funcao: false,
          min: 1
        },
        departamento: {
          required: false,
          min: 1
        },
      }
    };
  },

  mounted(){
    this.listarFuncoes()
    this.listarDepartamentos()
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarDadosEmpregaticios', this.model)
    });
  },

  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },


    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res, this.model);
        return res;
      });
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


    cadastrarFuncao(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        ds_funcao: this.descricaoCadFunc,
        ativo: "S"
      }
      this.axios.post('/api/funcoes/inserirFuncaoDescAndAtivo', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Sucesso', 'Cadastro realizado com sucesso!', 'success')
        th.modalCadastrarFunc = false
        th.listarFuncoes()
        // th.dialogCadastrarMotivo = false
        // th.listarMotivoAfastamento()
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao realizar cadastro!', 'error')
      })
    },


    cadastrarDepartamento(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        descricao: this.descricaoCadDep,
        ativo: "S"
      }
      this.axios.post('/api/departamento/cadastrarDepartamento', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Sucesso', 'Cadastro realizado com sucesso!', 'success')
        th.modalCadastrarDep = false
        th.descricao = ""
        th.listarDepartamentos()
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao realizar cadastro!', 'error')
      })
    },


    listarFuncoes(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
      }
      this.axios.post('/api/funcoes/listarDescFuncoes', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.listFuncoes = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao listar departamentos!', 'error')
      })
    },


    listarDepartamentos(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
      }
      this.axios.post('/api/departamento/listarDepartamentos', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.listDepartamentos = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao listar departamentos!', 'error')
      })
    }
  }
};
</script>
<style></style>
