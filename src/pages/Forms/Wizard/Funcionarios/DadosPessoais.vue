<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-5">
      <div class="row">
        <base-input
          name="nome"
          class="col-sm-12"
          required
          placeholder="Nome"
          v-model="model.nome"
          v-validate="modelValidations.nome"
          :error="getError('nome')"
        >
        </base-input>
      </div>

      <div class="row">
        <base-input
          name="email"
          class="col-sm-6"
          required
          placeholder="E-mail"
          v-model="model.email"
        >
        </base-input>
        <base-input
          name="matricula"
          class="col-sm-3"
          required
          placeholder="Matrícula"
          v-model="model.matricula"
          :error="getError('matricula')"
        >
        </base-input>
        <base-input
          name="telefone"
          class="col-sm-3"
          type="tel"
          v-mask="'(##) #####-####'"
          required
          placeholder="Telefone"
          v-model="model.telefone"
          :error="getError('telefone')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="codigo"
          class="col-sm-3"
          required
          placeholder="Código"
          v-model="model.codigo"
          :error="getError('codigo')"
        >
        </base-input>
        <el-select
            name="sexo"
            required
            class="select-success col-sm-3 pagination-select"
            v-model="model.sexo"
            placeholder="Sexo"
            :error="getError('sexo')"
        >
          <el-option class="select-success" label="Masculino" value="M">Masculino</el-option>
          <el-option class="select-success" label="Feminino" value="F">Feminino</el-option>
        </el-select>
        <base-input
          name="dataNascimento"
          class="col-sm-3"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data de Nascimento"
          v-model="model.dataNascimento"
          :error="getError('dataNascimento')"
        >
        </base-input>
        <el-select
            name="estadoCivil"
            required
            class="select-success col-sm-3 pagination-select"
            v-model="model.estadoCivil"
            placeholder="Estado Civil"
            :error="getError('estadoCivil')"
        >
          <el-option class="select-success" label="Solteiro" value="1">Solteiro</el-option>
          <el-option class="select-success" label="Casado" value="2">Casado</el-option>
          <el-option class="select-success" label="Separado" value="3">Separado</el-option>
          <el-option class="select-success" label="Divorciado" value="4">Divorciado</el-option>
          <el-option class="select-success" label="Viuvo" value="5">Viuvo</el-option>
        </el-select>
      </div>


      <div class="row">
        <base-input
          name="pai"
          class="col-sm-6"
          required
          placeholder="Pai"
          v-model="model.pai"
          :error="getError('pai')"
        >
        </base-input>
        <base-input
          name="mae"
          class="col-sm-6"
          required
          placeholder="Mãe"
          v-model="model.mae"
          :error="getError('mae')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="endereco"
          class="col-sm-5"
          required
          placeholder="Endereco"
          v-model="model.endereco"
          :error="getError('endereco')"
        >
        </base-input>
        <base-input
          name="bairro"
          class="col-sm-4"
          required
          placeholder="Bairro"
          v-model="model.bairro"
          :error="getError('bairro')"
        >
        </base-input>
        <base-input
          name="cep"
          class="col-sm-3"
          type="tel"
          v-mask="'##.###-###'"
          required
          placeholder="Cep"
          v-model="model.cep"
          :error="getError('cep')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="complemento"
          class="col-sm-12"
          placeholder="Complemento"
          v-model="model.complemento"
        >
        </base-input>
      </div>


      <div class="row">
        <el-select
            name="uf"
            required
            class="select-success col-sm-2 pagination-select"
            v-model="estadoSelecionado"
            placeholder="Uf"
            :error="getError('uf')"
        >
            <el-option
              class="select-success"
              v-for="item in estados"
              :key="item.ID"
              :label="item.Sigla"
              :value="item.ID"
              >
              {{item.Sigla}}
            </el-option>
        </el-select>
        <el-select
            name="cidade"
            required
            class="select-success col-sm-5 pagination-select"
            v-model="model.cidade"
            placeholder="Cidade"
            :error="getError('cidade')"
        >
            <el-option
              class="select-success"
              v-for="item in cidades"
              :key="item.ID"
              :label="item.Nome"
              :value="item.Nome"
              >
              {{item.Nome}}
            </el-option>
        </el-select>   
        <el-select
            name="grauInstrucao"
            required
            class="select-success col-sm-5 pagination-select"
            v-model="model.grauInstrucao"
            placeholder="Grau de Instrução"
            :error="getError('grauInstrucao')"
        >
          <el-option class="select-success" label="Ensino fundamental incompleto" value="Ensino fundamental incompleto">Ensino fundamental incompleto</el-option>
          <el-option class="select-success" label="Ensino fundamental cursando" value="Ensino fundamental cursando">Ensino fundamental cursando</el-option>
          <el-option class="select-success" label="Ensino fundamental completo" value="Ensino fundamental completo">Ensino fundamental completo</el-option>
          <el-option class="select-success" label="Ensino médio incompleto" value="Ensino médio incompleto">Ensino médio incompleto</el-option>
          <el-option class="select-success" label="Ensino médio cursando" value="Ensino médio cursando">Ensino médio cursando</el-option>
          <el-option class="select-success" label="Ensino médio completo" value="Ensino médio completo">Ensino médio completo</el-option>
          <el-option class="select-success" label="Ensino superior incompleto" value="Ensino superior incompleto">Ensino superior incompleto</el-option>
          <el-option class="select-success" label="Ensino superior cursando" value="Ensino superior cursando">Ensino superior cursando</el-option>
          <el-option class="select-success" label="Ensino superior completo" value="Ensino superior completo">Ensino superior completo</el-option>
        </el-select> 
      </div>


    </div>
  </div>
</template>
<script>
import { BaseInput } from "@/components";
import estadosjs from "./estados";
import cidadesjs from "./cidades";

export default {
  name: "dados-pessoais",
  components: {
    BaseInput
  },

  data() {
    return {
      estados: estadosjs,
      estadoSelecionado: "",
      cidades: [],
      model: {
        nome: "",
        email: "",
        matricula: "",
        telefone: "",
        codigo: "",
        endereco: "",
        bairro: "",
        cep: "",
        complemento: "",
        uf: "",
        cidade: "",
        grauInstrucao: "",
        sexo: "",
        estadoCivil: "",
        dataNascimento: "",
        pai: "",
        mae: ""
      },
      modelValidations: {
        nome: {
          required: true,
          min: 10
        },
        matricula: {
          required: false,
          numeric: 5
        },
        telefone: {
          required: false,
          min: 14
        },
        codigo: {
          required: false,
          numeric: true
        },
        endereco: {
          required: false,
          min: 5
        },
        bairro: {
          required: false,
          min: 5
        },
        cep: {
          required: false,
          min: 10
        },
        uf: {
          required: false,
          min: 2
        },
        cidade: {
          required: false,
          min: 2
        },
        grauInstrucao: {
          required: false,
          min: 5
        },
        sexo: {
          required: false,
          min: 1
        },
        estadoCivil: {
          required: false,
          min: 5
        },
        dataNascimento: {
          required: false,
          date: true
        },
        pai: {
          required: false,
          min: 5
        },
        mae: {
          required: false,
          min: 5
        }
      }
    };
  },

  mounted(){
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarFuncionarioDadosPessoais', this.model)
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
    }
  },


  watch:{
    estadoSelecionado(newVal){
      this.model.cidade = ""
      let estado = this.estados.filter((dados) => {
        if(dados.ID == newVal){
          return dados
        }
      })
      this.model.uf = estado[0].Sigla

      this.cidades = cidadesjs

      this.cidades = this.cidades.filter((dados) => {
        if(dados.Estado == newVal){
          return dados
        }
      })
    }
  }
};
</script>
<style></style>
