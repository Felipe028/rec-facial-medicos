<template>
  <div>
    <!-- <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5> -->
    <div class="row justify-content-center mt-5">
      <div class="row">
        <base-input
          name="ctps"
          class="col-sm-4"
          required
          placeholder="CTPS"
          v-model="model.ctps"
          v-validate="modelValidations.ctps"
          :error="getError('ctps')"
        >
        </base-input>
        <base-input
          name="serie"
          class="col-sm-4"
          required
          placeholder="Série"
          v-model="model.serie"
          v-validate="modelValidations.serie"
          :error="getError('serie')"
        >
        </base-input>
        <base-input
          name="dateExpedicaoCtps"
          class="col-sm-4"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data Expedição"
          v-model="model.dateExpedicaoCtps"
          v-validate="modelValidations.dateExpedicaoCtps"
          :error="getError('dateExpedicaoCtps')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="ci"
          class="col-sm-4"
          required
          placeholder="CI"
          v-model="model.ci"
          v-validate="modelValidations.ci"
          :error="getError('ci')"
        >
        </base-input>
        <base-input
          name="orgaoExpeditor"
          class="col-sm-4"
          required
          placeholder="Orgão Expeditor"
          v-model="model.orgaoExpeditor"
          v-validate="modelValidations.orgaoExpeditor"
          :error="getError('orgaoExpeditor')"
        >
        </base-input>
        <base-input
          name="dateExpedicaoCi"
          class="col-sm-4"
          required
          type="tel"
          v-mask="'##/##/####'"
          placeholder="Data Expedição"
          v-model="model.dateExpedicaoCi"
          v-validate="modelValidations.dateExpedicaoCi"
          :error="getError('dateExpedicaoCi')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="cpf"
          class="col-sm-3"
          type="tel"
          v-mask="'###.###.###-##'"
          required
          placeholder="CPF"
          v-model="model.cpf"
          v-validate="modelValidations.cpf"
          :error="getError('cpf')"
        >
        </base-input>
        <base-input
          name="tituloEleitor"
          class="col-sm-3"
          required
          placeholder="Título de Eleitor"
          v-model="model.tituloEleitor"
          v-validate="modelValidations.tituloEleitor"
          :error="getError('tituloEleitor')"
        >
        </base-input>
        <base-input
          name="zona"
          class="col-sm-3"
          required
          placeholder="Zona"
          v-model="model.zona"
          v-validate="modelValidations.zona"
          :error="getError('zona')"
        >
        </base-input>
        <base-input
          name="secao"
          class="col-sm-3"
          required
          placeholder="Seção"
          v-model="model.secao"
          v-validate="modelValidations.secao"
          :error="getError('secao')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="certificadoReservista"
          class="col-sm-4"
          required
          placeholder="Certificado de Reservista"
          v-model="model.certificadoReservista"
          v-validate="modelValidations.certificadoReservista"
          :error="getError('certificadoReservista')"
        >
        </base-input>
        <base-input
          name="categoria"
          class="col-sm-4"
          required
          placeholder="Categoria"
          v-model="model.categoria"
          v-validate="modelValidations.categoria"
          :error="getError('categoria')"
        >
        </base-input>
        <base-input
          name="serie"
          class="col-sm-4"
          required
          placeholder="Série"
          v-model="model.serie"
          v-validate="modelValidations.serie"
          :error="getError('serie')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="pisPasep"
          class="col-sm-6"
          required
          placeholder="Pis/Pasep"
          v-model="model.pisPasep"
          v-validate="modelValidations.pisPasep"
          :error="getError('pisPasep')"
        >
        </base-input>
        <base-input
          name="dataPisPasep"
          class="col-sm-6"
          type="tel"
          v-mask="'##/##/####'"
          required
          placeholder="Data Pis/Pasep"
          v-model="model.dataPisPasep"
          v-validate="modelValidations.dataPisPasep"
          :error="getError('dataPisPasep')"
        >
        </base-input>
      </div>


      <div class="row">
        <base-input
          name="habiltProfiss"
          class="col-sm-4"
          required
          placeholder="Habilt. Profiss."
          v-model="model.habiltProfiss"
          v-validate="modelValidations.habiltProfiss"
          :error="getError('habiltProfiss')"
        >
        </base-input>
        <base-input
          name="registroProf"
          class="col-sm-4"
          required
          placeholder="Registro Profiss."
          v-model="model.registroProf"
          v-validate="modelValidations.registroProf"
          :error="getError('registroProf')"
        >
        </base-input>
        <base-input
          name="orgaoRegistro"
          class="col-sm-4"
          required
          placeholder="Orgão do Registro"
          v-model="model.orgaoRegistro"
          v-validate="modelValidations.orgaoRegistro"
          :error="getError('orgaoRegistro')"
        >
        </base-input>
      </div>


      


    </div>
  </div>
</template>
<script>
import { BaseInput } from "@/components";

export default {
  name: "documentacao",
  components: {
    BaseInput
  },

  data() {
    return {
      model: {
        ctps: "",
        serie: "",
        dateExpedicaoCtps: "",
        ci: "",
        orgaoExpeditor: "",
        dateExpedicaoCi: "",
        cpf: "",
        tituloEleitor: "",
        zona: "",
        secao: "",
        certificadoReservista: "",
        categoria: "",
        serie: "",
        pisPasep: "",
        dataPisPasep: "",
        habiltProfiss: "",
        registroProf: "",
        orgaoRegistro: ""
      },
      modelValidations: {
        ctps: {
          required: false,
          numeric: true
        },
        serie: {
          required: false,
          numeric: true
        },
        dateExpedicaoCtps: {
          required: false,
          min: 10
        },
        ci: {
          required: false,
          numeric: true
        },
        orgaoExpeditor: {
          required: false,
          min: 2
        },
        dateExpedicaoCi: {
          required: false,
        },
        cpf: {
          required: true,
          min: 14
        },
        tituloEleitor: {
          required: false,
          numeric: true,
        },
        zona: {
          required: false,
          numeric: true,
        },
        secao: {
          required: false,
          numeric: true,
        },
        certificadoReservista: {
          required: false,
          numeric: true,
        },
        categoria: {
          required: false,
          numeric: true,
        },
        serie: {
          required: false,
          numeric: true,
        },
        pisPasep: {
          required: false,
          numeric: true,
        },
        dataPisPasep: {
          required: false,
          min: 10
        },
        habiltProfiss: {
          required: false,
          numeric: false,
        },
        registroProf: {
          required: false,
          numeric: true,
        },
        orgaoRegistro: {
          required: false,
          numeric: false,
        }
       
      }
    };
  },

  mounted(){
    this.$root.$on('cadastrarFuncionario', () => {
      this.$root.$emit('returnCadastrarFuncionarioDocumentacao', this.model)
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
