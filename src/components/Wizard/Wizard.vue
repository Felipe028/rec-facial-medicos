<template>
  <div class="wizard-container">
    <div class="card card-wizard active" data-color="green" id="wizardProfile">
      <form @submit.prevent>
        <!--
          You can switch " data-color="primary" "  with one of the next bright colors: "green", "orange", "red", "blue"
        -->
        <div class="card-header text-center">
          <slot name="header">
            <h3 v-if="title" class="card-title">{{ title }}</h3>
            <h5 v-if="subTitle" class="description">{{ subTitle }}</h5>
          </slot>

          <div class="wizard-navigation">
            <div class="progress-with-circle">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="1"
                aria-valuemin="1"
                aria-valuemax="3"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <ul class="nav nav-pills">
              <li
                v-for="(tab, index) in tabs"
                :key="tab.title"
                role="tab"
                :tabindex="tab.checked ? 0 : ''"
                :id="`step-${tab.tabId}`"
                :aria-controls="tab.tabId"
                :aria-disabled="!tab.active"
                :aria-selected="tab.active"
                :ref="`tab-${index}`"
                class="nav-item wizard-tab-link"
                :style="linkWidth"
              >
                <a
                  class="nav-link"
                  @click="navigateToTab(index)"
                  :class="[
                    { 'disabled-wizard-link': !tab.checked },
                    { active: tab.active },
                    { checked: tab.checked }
                  ]"
                  data-toggle="tab"
                >
                  <tab-item-content :tab="tab"></tab-item-content>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-body">
          <div class="tab-content">
            <slot :activeIndex="activeTabIndex" :activeTab="activeTab"> </slot>
          </div>
        </div>

        <div class="card-footer">
          <slot name="footer" :next-tab="nextTab" :prev-tab="prevTab">
            <div class="pull-right">
              <base-button
                v-if="activeTabIndex < tabCount - 1"
                type="success"
                wide
                @click.native="nextTab"
                class="btn-next"
              >
                {{ nextButtonText }}
              </base-button>
              <base-button v-else wide @click.native="nextTab">{{
                finishButtonText
              }}</base-button>
            </div>

            <div class="pull-left">
              <base-button
                v-if="activeTabIndex > 0"
                wide
                type="success"
                @click.native="prevTab"
                class="btn-previous"
              >
                {{ prevButtonText }}
              </base-button>
            </div>
            <div class="clearfix"></div>
          </slot>
        </div>
      </form>
    </div>
    <Carregando v-if="isLoading"/>
  </div>
</template>
<script>
import moment from 'moment';
import { throttle } from "./throttle";
import Carregando from "../../../src/pages/Loads/Carregando.vue";
import swal from "sweetalert2";

export default {
  name: "simple-wizard",
  props: {
    startIndex: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Title"
    },
    subTitle: {
      type: String,
      default: "Subtitle"
    },
    prevButtonText: {
      type: String,
      default: "Anterior"
    },
    nextButtonText: {
      type: String,
      default: "Próximo"
    },
    finishButtonText: {
      type: String,
      default: "Finalizar"
    },
    vertical: {
      type: Boolean
    }
  },
  components: {
    Carregando,
    TabItemContent: {
      functional: true,
      props: ["tab"],
      render(h, { props }) {
        let content = props.tab.$slots.label;
        if (content && content.length) {
          return content;
        }
        return h("span", [props.tab.$slots.label, props.tab.label]);
      }
    }
  },
  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab
    };
  },
  data() {
    return {
      isLoading: false,
      dadosPessoais: {},
      motorista: {},
      documentacao: {},
      estrangeiro: {},
      dadosEmpregaticios: {},
      contribuicaoSindical: {},
      tabs: [],
      activeTabIndex: 0,
      tabLinkWidth: 0,
      tabLinkHeight: 50
    };
  },
  computed: {
    tabCount() {
      return this.tabs.length;
    },
    linkWidth() {
      let width = 100;
      if (this.tabCount > 0) {
        width = 100 / this.tabCount;
      }
      if (this.vertical) {
        width = 100;
      }
      return { width: `${width}%` };
    },
    activeTab() {
      return this.tabs[this.activeTabIndex];
    },
    stepPercentage() {
      return (1 / (this.tabCount * 2)) * 100;
    },
    progress() {
      let percentage = 0;
      if (this.activeTabIndex > 0) {
        let stepsToAdd = 1;
        let stepMultiplier = 2;
        percentage =
          this.stepPercentage *
          (this.activeTabIndex * stepMultiplier + stepsToAdd);
      } else {
        percentage = this.stepPercentage;
      }
      return percentage;
    }
  },
  methods: {
    moment: function (data) {
      return moment(data);
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

    cadastrarFuncionario(){
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        cpf: this.documentacao.cpf.toString(),
        numero_pis: this.documentacao.pisPasep.toString(),
        data_pis: this.documentacao.dataPisPasep.toString(),
        nome: this.dadosPessoais.nome.toString(),
        numero_matricula_ctps: this.dadosPessoais.matricula.toString(),
        codigo: parseInt(this.dadosPessoais.codigo),
        endereco: this.dadosPessoais.endereco.toString(),
        complemento: this.dadosPessoais.complemento.toString(),
        bairro: this.dadosPessoais.bairro.toString(),
        cep: this.dadosPessoais.cep.toString(),
        estado: this.dadosPessoais.uf.toString(),
        cidade: this.dadosPessoais.cidade.toString(),
        telefone: this.dadosPessoais.telefone.toString(),
        email: this.dadosPessoais.email.toString(),
        escolaridade: this.dadosPessoais.grauInstrucao.toString(),
        sexo: this.dadosPessoais.sexo.toString(),
        filiacao_pai: this.dadosPessoais.pai.toString(),
        filiacao_mae: this.dadosPessoais.mae.toString(),
        data_nascimento: this.dadosPessoais.dataNascimento,
        ctps: this.documentacao.ctps.toString(),
        ctps_serie: this.documentacao.serie.toString(),
        expedicao: this.documentacao.dateExpedicaoCtps.toString(),
        rg: this.documentacao.ci.toString(),
        orgao_expeditor: this.documentacao.orgaoExpeditor.toString(),
        data_expedicao: this.documentacao.dateExpedicaoCi.toString(),
        titulo_numero: this.documentacao.tituloEleitor.toString(),
        titulo_zona: this.documentacao.zona.toString(),
        titulo_secao: this.documentacao.secao.toString(),
        cert_reservista_ra: this.documentacao.certificadoReservista.toString(),
        certificado_reservista_categoria: this.documentacao.categoria.toString(),
        certificado_reservista_serie: this.documentacao.certificadoReservista.toString(),
        data_adimissao: this.dadosEmpregaticios.dataAdmissao.toString(),
        horas_contradadas_mes: this.dadosEmpregaticios.horasContratadas.toString(),
        funcao: this.dadosEmpregaticios.funcao.toString(),
        departamento: this.dadosEmpregaticios.departamento.toString(),
        contribuicao_sindical_data: this.contribuicaoSindical.data.toString(),
        contribuicao_sindical_valor: this.contribuicaoSindical.valor.toString(),
        valor_plano_saude: this.dadosEmpregaticios.valorPlanoSaude.toString(),
        nr_conta_bancaria: this.dadosEmpregaticios.nrContaBancaria.toString(),
        banco: this.dadosEmpregaticios.nrBanco.toString(),
        empregador_id: this.$cookies.get('idEmpregador')
      }
      this.$root.$emit('funcaoCadastrarFuncionario', bodyFormData)
    },

    /* cadastrarFuncionario2(){
      let th = this
      this.isLoading = true

      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        cpf: this.documentacao.cpf.toString(),
        numero_pis: this.documentacao.pisPasep.toString(),
        data_pis: this.documentacao.dataPisPasep.toString(),
        nome: this.dadosPessoais.nome.toString(),
        numero_matricula_ctps: this.dadosPessoais.matricula.toString(),
        codigo: parseInt(this.dadosPessoais.codigo),
        endereco: this.dadosPessoais.endereco.toString(),
        complemento: this.dadosPessoais.complemento.toString(),
        bairro: this.dadosPessoais.bairro.toString(),
        cep: this.dadosPessoais.cep.toString(),
        estado: this.dadosPessoais.uf.toString(),
        cidade: this.dadosPessoais.cidade.toString(),
        telefone: this.dadosPessoais.telefone.toString(),
        email: this.dadosPessoais.email.toString(),
        escolaridade: this.dadosPessoais.grauInstrucao.toString(),
        sexo: this.dadosPessoais.sexo.toString(),
        filiacao_pai: this.dadosPessoais.pai.toString(),
        filiacao_mae: this.dadosPessoais.mae.toString(),
        data_nascimento: this.dadosPessoais.dataNascimento,
        ctps: this.documentacao.ctps.toString(),
        ctps_serie: this.documentacao.serie.toString(),
        expedicao: this.documentacao.dateExpedicaoCtps.toString(),
        rg: this.documentacao.ci.toString(),
        orgao_expeditor: this.documentacao.orgaoExpeditor.toString(),
        data_expedicao: this.documentacao.dateExpedicaoCi.toString(),
        titulo_numero: this.documentacao.tituloEleitor.toString(),
        titulo_zona: this.documentacao.zona.toString(),
        titulo_secao: this.documentacao.secao.toString(),
        cert_reservista_ra: this.documentacao.certificadoReservista.toString(),
        certificado_reservista_categoria: this.documentacao.categoria.toString(),
        certificado_reservista_serie: this.documentacao.certificadoReservista.toString(),
        data_adimissao: this.dadosEmpregaticios.dataAdmissao.toString(),
        horas_contradadas_mes: this.dadosEmpregaticios.horasContratadas.toString(),
        funcao: this.dadosEmpregaticios.funcao.toString(),
        departamento: this.dadosEmpregaticios.departamento.toString(),
        contribuicao_sindical_data: this.contribuicaoSindical.data.toString(),
        contribuicao_sindical_valor: this.contribuicaoSindical.valor.toString(),
        valor_plano_saude: this.dadosEmpregaticios.valorPlanoSaude.toString(),
        nr_conta_bancaria: this.dadosEmpregaticios.nrContaBancaria.toString(),
        banco: this.dadosEmpregaticios.nrBanco.toString(),
        empregador_id: this.$cookies.get('idEmpregador')
      }

      console.log("bodyFormData")
      console.log(bodyFormData)

      this.axios.post('/api/empregado/cadastrarEmpregado', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Sucesso', 'Usuario cadastrado com sucesso!', 'success')
        setTimeout(() => {
          th.$router.push("/pesquisarEmpregados")
        }, 3000)
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Usuario e Senha Incorreto!', 'error')
      })
    }, */

    addTab(tab) {
      const index = this.$slots.default.indexOf(tab.$vnode);
      let tabTitle = tab.title || "";
      tab.tabId = `${tabTitle.replace(/ /g, "")}${index}`;
      if (!this.activeTab && index === 0) {
        tab.active = true;
        tab.checked = true;
      }
      if (this.activeTab === tab.name) {
        tab.active = true;
        tab.checked = true;
      }
      this.tabs.splice(index, 0, tab);
    },
    removeTab(tab) {
      const tabs = this.tabs;
      const index = tabs.indexOf(tab);
      if (index > -1) {
        tabs.splice(index, 1);
      }
    },

    validate(tab) {
      let tabToValidate = tab || this.activeTab;
      let beforeChange = tabToValidate.beforeChange;
      if (beforeChange) {
        return Promise.resolve(beforeChange())
          .then(res => {
            this.activeTab.hasError = res ? false : true;
            return res;
          })
          .catch(() => {
            this.activeTab.hasError = true;
          });
      } else {
        return Promise.resolve(true);
      }
    },

    async nextTab() {
      let isValid = await this.validate();
      if (isValid && this.activeTabIndex < this.tabCount - 1) {
        this.activeTabIndex++;
        
      }else{
        this.$root.$emit('cadastrarFuncionario')
        this.cadastrarFuncionario()
      }
      return isValid;
    },

    prevTab() {
      this.activeTabIndex--;
    },
    async navigateToTab(index) {
      if (this.tabs[index].checked) {
        // recursively validate each tab
        if (index > this.activeTabIndex) {
          let valid = await this.nextTab();
          if (valid) {
            this.navigateToTab(index);
          }
        } else {
          this.activeTabIndex = index;
        }
      }
    },
    onResize() {
      let tabLinks = document.getElementsByClassName("wizard-tab-link");
      if (tabLinks.length > 0 && this.tabCount > 0) {
        let { clientWidth, clientHeight } = tabLinks[0];
        this.tabLinkWidth = clientWidth;
        this.tabLinkHeight = clientHeight;
      }
    }
  },
  mounted() {
    this.$root.$on('returnCadastrarFuncionarioDadosPessoais', (dadosPessoais) => {
      this.dadosPessoais = dadosPessoais
    });
    this.$root.$on('returnCadastrarFuncionarioMotorista', (motorista) => {
      this.motorista = motorista
    });
    this.$root.$on('returnCadastrarFuncionarioDocumentacao', (documentacao) => {
      this.documentacao = documentacao
    });
    this.$root.$on('returnCadastrarFuncionarioEstrangeiro', (estrangeiro) => {
      this.estrangeiro = estrangeiro
    });
    this.$root.$on('returnCadastrarDadosEmpregaticios', (dadosEmpregaticios) => {
      this.dadosEmpregaticios = dadosEmpregaticios
    });
    this.$root.$on('returnCadastrarFuncionarioContribuicaoSindical', (contribuicaoSindical) => {
      this.contribuicaoSindical = contribuicaoSindical
    });
    
    this.activeTabIndex = this.startIndex;
    this.$nextTick(() => {
      this.tabs[this.activeTabIndex].active = true;
      this.tabs[this.activeTabIndex].checked = true;
      this.onResize();
    });
    window.addEventListener(
      "resize",
      () => {
        throttle(this.onResize, 40);
      },
      false
    );
  },
  watch: {
    activeTabIndex(newValue, oldValue) {
      if (newValue !== oldValue) {
        let oldTab = this.tabs[oldValue];
        let newTab = this.tabs[newValue];
        oldTab.active = false;
        newTab.active = true;

        if (!newTab.checked) {
          newTab.checked = true;
        }
        this.$emit("tab-change", oldTab, newTab);
        this.$emit("update:startIndex", newValue);
      }
    }
  }
};
</script>
<style lang="scss">
/* Tab content animation */
.tab-content {
  display: flex; // to avoid horizontal scroll when animating
  .tab-pane {
    display: block;
    animation: fadeIn 0.5s;
    width: 100%;
  }
}

/**
      Extra niceties. Display error tabs and disable navigation unvisited tabs
     */
.wizard-navigation .nav-link {
  &.active,
  &.checked {
    cursor: pointer;
  }
}

.disabled-wizard-link {
  cursor: not-allowed;
}
</style>
