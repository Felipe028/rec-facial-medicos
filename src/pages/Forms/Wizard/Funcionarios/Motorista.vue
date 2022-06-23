<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-5">
      <div class="row">
        <base-input
          name="carteiraHabilitacao"
          class="col-sm-3"
          required
          placeholder="Carteira de Habilitacao"
          v-model="model.carteiraHabilitacao"
          v-validate="modelValidations.carteiraHabilitacao"
          :error="getError('carteiraHabilitacao')"
        >
        </base-input>
        <base-input
          name="tipoHabilitacao"
          class="col-sm-3"
          type="tel"
          v-mask="'AAAAA'"
          required
          placeholder="Tipo de Habilitacao"
          v-model="model.tipoHabilitacao"
          v-validate="modelValidations.tipoHabilitacao"
          :error="getError('tipoHabilitacao')"
        >
        </base-input>
        <base-input
          name="dataEmissao"
          class="col-sm-3"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data de Emissao"
          v-model="model.dataEmissao"
          v-validate="modelValidations.dataEmissao"
          :error="getError('dataEmissao')"
        >
        </base-input>
        <base-input
          name="dataValidade"
          class="col-sm-3"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data de Validade"
          v-model="model.dataValidade"
          v-validate="modelValidations.dataValidade"
          :error="getError('dataValidade')"
        >
        </base-input>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseInput } from "@/components";

export default {
  name: "motorista",
  components: {
    BaseInput
  },

  data() {
    return {
      model: {
        carteiraHabilitacao: "",
        tipoHabilitacao: "",
        dataEmissao: "",
        dataValidade: ""
      },
      modelValidations: {
        carteiraHabilitacao: {
          required: false,
          numeric: true
        },
        tipoHabilitacao: {
          required: false,
          min: 1
        },
        dataEmissao: {
          required: false,
          min: 10
        },
        dataValidade: {
          required: false,
          min: 10
        }
      }
    };
  },

  mounted(){
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarFuncionarioMotorista', this.model)
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
