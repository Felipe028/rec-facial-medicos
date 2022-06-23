<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-5">
       <div class="row">
        <base-input
          name="data"
          class="col-sm-6"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data"
          v-model="model.data"
          v-validate="modelValidations.data"
          :error="getError('data')"
        >
        </base-input>
        <base-input
          name="valor"
          class="col-sm-6"
          required
          placeholder="Valor"
          v-model="model.valor"
          v-validate="modelValidations.valor"
          :error="getError('valor')"
        >
        </base-input>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseInput } from "@/components";

export default {
  name: "contribuicao-sindical",
  components: {
    BaseInput
  },

  data() {
    return {
      model: {
        data: "",
        valor: ""
      },
      modelValidations: {
        data: {
          required: true,
          min: 10
        },
        valor: {
          required: true,
          min: 2
        }
      }
    };
  },

  mounted(){
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarFuncionarioContribuicaoSindical', this.model)
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
  }
};
</script>
<style></style>
