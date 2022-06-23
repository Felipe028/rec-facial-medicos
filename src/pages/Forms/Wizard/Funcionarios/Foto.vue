<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-0">
      <div class="row">
        <div class="col-sm-6 ml-auto mr-auto">
          <modal-rec-facial></modal-rec-facial>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { BaseInput } from "@/components";
import estadosjs from "./estados";
import cidadesjs from "./cidades";
import ModalRecFacial from "../../../Pages/ModalRecFacial.vue";

export default {
  name: "foto",
  components: {
    BaseInput,
    ModalRecFacial
  },

  data() {
    return {
      estados: estadosjs,
      estadoSelecionado: "",
      cidades: [],
      model: {
        foto: "",
      },
    };
  },

  mounted(){
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarFuncionarioDadosPessoais', this.model)
    });

    this.$root.$on('verificarFoto', (data) => {
      this.model.foto = data
      console.log("foto " + data)
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
