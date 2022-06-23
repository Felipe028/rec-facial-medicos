<template>
  <div class="content">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <simple-wizard>
          <template slot="header">
            <h3 class="card-title">Cadastrar Funcionário</h3>
            <h3 class="description">
              Para realizar o cadastro, precisamos de alguns dados.
            </h3>
          </template>

          <wizard-tab :before-change="() => validateStep('step1')">
            <template slot="label">
              <i class="tim-icons icon-single-02"></i>
              <p>Dados Pessoais</p>
            </template>
            <dados-pessoais
              ref="step1"
              @on-validated="onStepValidated"
            ></dados-pessoais>
          </wizard-tab>

          <!-- <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="tim-icons icon-bus-front-12"></i>
              <p>Motorista</p>
            </template>
            <motorista
              ref="step2"
              @on-validated="onStepValidated"
            ></motorista>
          </wizard-tab> -->

          <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="tim-icons icon-paper"></i>
              <p>Documentação</p>
            </template>
            <documentacao ref="step2"></documentacao>
          </wizard-tab>

          <!-- <wizard-tab :before-change="() => validateStep('step4')">
            <template slot="label">
              <i class="tim-icons icon-world"></i>
              <p>Estrangeiro</p>
            </template>
            <estrangeiro ref="step4"></estrangeiro>
          </wizard-tab> -->

          <wizard-tab :before-change="() => validateStep('step3')">
            <template slot="label">
              <i class="tim-icons icon-badge"></i>
              <p>Dados Empregaticios</p>
            </template>
            <dados-empregaticios ref="step3"></dados-empregaticios>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step4')">
            <template slot="label">
              <i class="tim-icons icon-molecule-40"></i>
              <p>Contribuição Sindical</p>
            </template>
            <contribuicao-sindical ref="step4"></contribuicao-sindical>
          </wizard-tab>

          <!-- <wizard-tab :before-change="() => validateStep('step5')">
            <template slot="label">
              <i class="tim-icons icon-satisfied"></i>
              <p>Foto</p>
            </template>
            <foto ref="step5"></foto>
          </wizard-tab> -->
          
        </simple-wizard>
      </div>
    </div>
  </div>
</template>
<script>
import { SimpleWizard, WizardTab } from "@/components";
import ContribuicaoSindical from "../../pages/Forms/Wizard/Funcionarios/ContribuicaoSindical.vue";
import DadosPessoais from "../../pages/Forms/Wizard/Funcionarios/DadosPessoais.vue";
import DadosEmpregaticios from "../../pages/Forms/Wizard/Funcionarios/DadosEmpregaticios.vue";
import Documentacao from "../../pages/Forms/Wizard/Funcionarios/Documentacao.vue";
import Estrangeiro from "../../pages/Forms/Wizard/Funcionarios/Estrangeiro.vue";
import Motorista from "../../pages/Forms/Wizard/Funcionarios/Motorista.vue";
import Foto from "../../pages/Forms/Wizard/Funcionarios/Foto.vue";

import FirstStep from "../../pages/Forms/Wizard/FirstStep.vue";
import SecondStep from "../../pages/Forms/Wizard/SecondStep.vue";
import ThirdStep from "../../pages/Forms/Wizard/ThirdStep.vue";
import swal from "sweetalert2";

export default {
  data() {
    return {
      wizardModel: {}
    };
  },
  components: {
    SimpleWizard,
    WizardTab,
    ContribuicaoSindical,
    DadosEmpregaticios,
    DadosPessoais,
    Documentacao,
    Estrangeiro,
    Motorista,
    FirstStep,
    SecondStep,
    ThirdStep,
    Foto
  },

  mounted(){
    this.listarFuncionarios()
  },

  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    wizardComplete() {
      swal("Good job!", "You clicked the finish button!", "success");
    },
    
  }
};
</script>
<style></style>
