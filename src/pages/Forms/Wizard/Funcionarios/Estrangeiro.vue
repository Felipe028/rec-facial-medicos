<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-5">
      <div class="row">
        <base-input
          name="dataChegada"
          class="col-sm-3"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data de Chegada"
          v-model="model.dataChegada"
          v-validate="modelValidations.dataChegada"
          :error="getError('dataChegada')"
        >
        </base-input>
        <base-input
          name="naturalizado"
          class="col-sm-3"
          required
          placeholder="Naturalizado"
          v-model="model.naturalizado"
          v-validate="modelValidations.naturalizado"
          :error="getError('naturalizado')"
        >
        </base-input>
        <base-input
          name="conjugeBrasileiro"
          class="col-sm-3"
          required
          placeholder="Conjuge Brasileiro"
          v-model="model.conjugeBrasileiro"
          v-validate="modelValidations.conjugeBrasileiro"
          :error="getError('conjugeBrasileiro')"
        >
        </base-input>
        <base-input
          name="numeroFilhosBrasileiros"
          class="col-sm-3"
          type="tel"
          v-mask="'##'"
          required
          placeholder="Nº de filhos brasileiros"
          v-model="model.numeroFilhosBrasileiros"
          v-validate="modelValidations.numeroFilhosBrasileiros"
          :error="getError('numeroFilhosBrasileiros')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="numeroRegistroGeral"
          class="col-sm-2"
          required
          placeholder="Nº Reg. Geral"
          v-model="model.numeroRegistroGeral"
          v-validate="modelValidations.numeroRegistroGeral"
          :error="getError('numeroRegistroGeral')"
        >
        </base-input>
        <base-input
          name="numeroDecreto"
          class="col-sm-2"
          required
          placeholder="No. do Decreto"
          v-model="model.numeroDecreto"
          v-validate="modelValidations.numeroDecreto"
          :error="getError('numeroDecreto')"
        >
        </base-input>
        <base-input
          name="visto"
          class="col-sm-2"
          required
          placeholder="Visto"
          v-model="model.visto"
          v-validate="modelValidations.visto"
          :error="getError('visto')"
        >
        </base-input>
        <base-input
          name="validadeCI"
          class="col-sm-3"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Valid. C.I"
          v-model="model.validadeCI"
          v-validate="modelValidations.validadeCI"
          :error="getError('validadeCI')"
        >
        </base-input>
        <base-input
          name="validadeCTPS"
          class="col-sm-3"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Valid. da CTPS"
          v-model="model.validadeCTPS"
          v-validate="modelValidations.validadeCTPS"
          :error="getError('validadeCTPS')"
        >
        </base-input>
      </div>

  
    </div>
  </div>
</template>
<script>
import { BaseInput } from "@/components";

export default {
  name: "dados-empregaticios",
  components: {
    BaseInput
  },

  data() {
    return {
      model: {
        dataChegada: "",
        naturalizado: "",
        conjugeBrasileiro: "",
        numeroFilhosBrasileiros: "",
        numeroRegistroGeral: "",
        numeroDecreto: "",
        visto: "",
        validadeCI: "",
        validadeCTPS: ""
      },
      modelValidations: {
        dataChegada: {
          required: false,
          min: 10
        },
        naturalizado: {
          required: false,
          min: 1
        },
        conjugeBrasileiro: {
          required: false,
          min: 1
        },
        numeroFilhosBrasileiros: {
          required: false,
          min: 1
        },
        numeroRegistroGeral: {
          required: false,
          numeric: true
        },
        numeroDecreto: {
          required: false,
          numeric: true
        },
        visto: {
          required: false,
        },
        validadeCI: {
          required: false,
          min: 10
        },
        validadeCTPS: {
          required: false,
          min: 10
        }
      }
    };
  },

  mounted(){
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarFuncionarioEstrangeiro', this.model)
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
