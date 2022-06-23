<template>
<div class="content">
    <div class="row" v-if="!showRelatorio">
        <div class="col-md-6">
          <card class="text-left">
            <h4 slot="header" class="card-title">Funcionário</h4>
            <div class="row">
                <el-select
                    class="select-success mb-3 pagination-select"
                    placeholder="Selecione o funcionário"
                    v-model="dataF.funcionario"
                >
                    <el-option class="select-success" value="Todos">Todos</el-option>
                    <el-option class="select-success" value="Empresa Sede">Empresa Sede</el-option>
                    <el-option class="select-success" value="Empresa Secundária">Empresa Secundária</el-option>
                </el-select>
            </div>
            <div class="row d-flex flex-row">
                <base-input
                    label="De"
                    class="col-6"
                    type="date"
                    v-model="dataF.de"
                    >
                </base-input>
                <base-input
                    label="Até"
                    class="col-6"
                    type="date"
                    v-model="dataF.ate"
                    >
                </base-input>
            </div>
            <div class="w-100 d-flex justify-content-end mt-4" style="">
                <base-button type="success" @click="showRelatorio = true">Gerar</base-button>
            </div>
          </card>
        </div>

        <div class="col-md-6">
          <card class="text-left">
            <h4 slot="header" class="card-title">Departamento</h4>
            <div class="row">
                <el-select
                    class="select-success mb-3 pagination-select"
                    placeholder="Selecione o departamento"
                    v-model="dataD.departamento"
                >
                    <el-option class="select-success" value="Todos">Todos</el-option>
                    <el-option class="select-success" value="Empresa Sede">Empresa Sede</el-option>
                    <el-option class="select-success" value="Empresa Secundária">Empresa Secundária</el-option>
                </el-select>
            </div>
            <div class="row d-flex flex-row">
                <base-input
                    label="De"
                    class="col-6"
                    type="date"
                    v-model="dataD.de"
                    >
                </base-input>
                <base-input
                    label="Até"
                    class="col-6"
                    type="date"
                    v-model="dataD.ate"
                    >
                </base-input>
            </div>
            <div class="w-100 d-flex justify-content-end mt-4" style="">
                <base-button type="success" @click="showRelatorio = true">Gerar</base-button>
            </div>
          </card>
        </div>
    </div>




    <div class="row mt-0" v-else>
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Cartão de Ponto</h4>
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="col-6 d-flex justify-content-start">
                    <base-button 
                        type="info" 
                        class="animation-on-hover"
                        @click="showRelatorio = false"
                    ><i class="tim-icons icon-minimal-left"></i> Voltar</base-button>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <base-button 
                        type="info" 
                        class="animation-on-hover"
                        @click="dialogRealizarAfastamento = true"
                        simple
                    ><i class="tim-icons icon-paper"></i> Imprimir</base-button>
                </div>
            </div>

            <div class="container mt-2">
                <div class="col-12 text-center">
                    <h4>Legenda</h4>
                </div>
                <div class="row">
                    <div class="col d-flex flex-row align-items-center">
                        <div class="faltas"></div>
                        Faltas
                    </div>
                    <div class="col d-flex flex-row align-items-center">
                        <div class="feriados"></div>
                        Feriados
                    </div>
                    <div class="col d-flex flex-row align-items-center">
                        <div class="ferias"></div>
                        Férias/Afastamentos
                    </div>
                    <div class="col d-flex flex-row align-items-center">
                        <div class="folgas"></div>
                        Folga
                    </div>
                    <div class="col d-flex flex-row align-items-center">
                        <div class="batidas">*</div>
                        Batidas Manuais
                    </div>
                </div>
            </div>


            <div class="container mt-5 p-3 rounded" style="background: #f9f9f9;">
                <div class="row">
                    <div class="col text-left">
                        EMPRESA: EMPRESA TESTE RAFAEL
                    </div>
                    <div class="col text-left">
                        CNPJ: 80.263.939/0001-88
                    </div>
                </div>
                <div class="row">
                    <div class="col text-left">
                        I. E.: I. M.:
                    </div>
                    <div class="col text-left">
                        ENDEREÇO: RUA X, 10
                    </div>
                </div>
                <div class="row">
                    <div class="col text-left">
                        COMP.: . BAIRRO: CENTRO CIDADE: MANAUS-AM
                    </div>
                    <div class="col text-left">
                        CONTATO:
                    </div>
                </div>
                <div class="row">
                    <div class="col text-left">
                        EMPREGADO: FELIPE
                    </div>
                    <div class="col text-left">
                        PIS/PASEP: 123654789. CTPS:
                    </div>
                </div>
                <div class="row">
                    <div class="col text-left">
                        FUNÇÃO: . DEPTO.:
                    </div>
                    <div class="col text-left">
                        PERÍODO: 01/12/2021 até 29/12/2021
                    </div>
                </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Dia Sem</th>
                                <th scope="col">Horário</th>
                                <th scope="col">Ent1</th>
                                <th scope="col">Saí1</th>
                                <th scope="col">Ent2</th>
                                <th scope="col">Saí2</th>
                                <th scope="col">H.Exerc</th>
                                <th scope="col">H.Atraso (-)</th>
                                <th scope="col">B.Horas (+)</th>
                                <th scope="col">Adic/Noturno</th>
                                <th scope="col">Faltas/Hrs</th>
                                <th scope="col">H.Abono</th>
                                <th scope="col">Abono</th>
                                <th scope="col">Ocorr.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <td>Mark</td>
                                <td>
                                    <el-tooltip content="Adicionar Abono" effect="light" :open-delay="300" placement="top">
                                        <base-button
                                        class="remove btn-link"
                                        type="success"
                                        size="sm"
                                        icon
                                        >
                                        <i class="tim-icons icon-simple-add"></i>
                                        </base-button>
                                    </el-tooltip>
                                </td>
                                <td>
                                    <el-tooltip content="Adicionar Ocorrência" effect="light" :open-delay="300" placement="top">
                                        <base-button
                                        class="remove btn-link"
                                        type="warning"
                                        size="sm"
                                        icon
                                        >
                                        <i class="tim-icons icon-alert-circle-exc"></i>
                                        </base-button>
                                    </el-tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 class="mt-4">Resumo do mês</h4>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Faltas</th>
                                <th scope="col">Horas Trabalhadas</th>
                                <th scope="col">Horas Atrasadas</th>
                                <th scope="col">BH 50%</th>
                                <th scope="col">BH 100%</th>
                                <th scope="col">Adc Nortuno</th>
                                <th scope="col">Faltas em Horas</th>
                                <th scope="col">Abonos</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div class="table-responsive mt-5">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Saldo Inicial</th>
                                <th scope="col">Crédito</th>
                                <th scope="col">Débito</th>
                                <th scope="col">Saldo Banco de Horas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                                <th>1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <h4 class="mt-4">Resumo de feriados</h4>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Data</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

          </div>
          
        </card>
      </div>
    </div>











    <div class="vld-parent">
        <loading
        :active.sync="isLoading"
        :can-cancel="false"
        loader='spinner'
        color='#35a887'
        :is-full-page="true"
        >
        </loading>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { Card, BasePagination, BaseInput } from "@/components/index";
import { Table, TableColumn, Select, Option } from "element-ui";
import users from "../../pages/Tables/users.js";
import swal from "sweetalert2";
import Fuse from "fuse.js";
import NotificationHorarioLimite from "../Notifications/NotificationHorarioLimite.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Card,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
    BaseInput,
    Modal
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    // <<Auto-Complete
    filteredOptions() {
      return [
        { 
          data: this.suggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          })
        }
      ];
    },
    // Auto-Complete>>

    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      horarioSelecionado: "",
      showRelatorio: false,
      dataF:{
          funcionario: [],
          de: "",
          ate: ""
      },
      dataD:{
          departamento: [],
          de: "",
          ate: ""
      },
      adicionar:{
          motivo: ""
      },
      dialogRealizarAfastamento: false,


      query: "",
      selected: "",
      suggestions: [
        {
          data: [
            { id: 1, name: "Frodo", race: "Hobbit", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Elijah_Wood_as_Frodo_Baggins.png/220px-Elijah_Wood_as_Frodo_Baggins.png" },
            { id: 2, name: "Samwise", race: "Hobbit", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Sean_Astin_as_Samwise_Gamgee.png/200px-Sean_Astin_as_Samwise_Gamgee.png" },
            { id: 3, name: "Gandalf", race: "Maia", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Gandalf600ppx.jpg/220px-Gandalf600ppx.jpg" },
            { id: 4, name: "Aragorn", race: "Human", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Aragorn300ppx.png/150px-Aragorn300ppx.png" }
          ]
        }
      ],


      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },
      demitir: {
        data: "",
        motivo: ""
      },
      isLoading: false,
      dialogHorarioLimite: false,
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      tableColumns: [
        {
          prop: "name",
          label: "Name",
          minWidth: 200
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 250
        },
        {
          prop: "age",
          label: "Age",
          minWidth: 100
        },
        {
          prop: "salary",
          label: "Salary",
          minWidth: 120
        }
      ],
      tableData: users,
      searchedData: [],
      fuseSearch: null
    };
  },
  mounted() {
    // this.notifyVue('top', 'center');
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
    keys: ["name", "email"],
    threshold: 0.3
    });
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
        this.$notify({
            component: NotificationHorarioLimite,
            icon: "tim-icons icon-bell-55",
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: "warning",
            timeout: 30000
        });
    },
    
    //<< Auto-Complete
    clickHandler(item) {},
    onSelected(item) {
      this.selected = item.item;
    },
    onInputChange(text) {
      console.log(text)
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    },
    // Auto-Complete>>


    showAlert(param){
        if(param == "excluir_afastamento"){
            swal({
            title: "Tem certeza?",
            text: `Deseja realmente excluir?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-success btn-fill",
            cancelButtonClass: "btn btn-danger btn-fill",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não!",
            buttonsStyling: false
            }).then(() => {
            swal({
                title: "Deleted!",
                text: "Your file has been deleted.",
                type: "success",
                confirmButtonClass: "btn btn-success btn-fill",
                buttonsStyling: false
            });
            });
        }
    }
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>

<style>
.divCorpoDialog{
    padding: 0px;
    margin-top: -25px;
}

.autosuggest-container input {
  width: 100%;
  padding: 0.5rem;
}

.autosuggest-container ul {
  width: 100%;
  color: rgba(30, 39, 46,1.0);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 .5rem 0;
}
.autosuggest-container li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
.autosuggest-container li:hover {
  cursor: pointer;
}

.autosuggest-container {
  display: flex;
  justify-content: center;
  width: 280px;
}

#autosuggest { width: 100%; display: block;}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178,0.2);
}

.faltas{
    width: 25px; 
    height: 20px; 
    background: #DB6153;
    border-radius: 7px 7px 7px 7px;
    -moz-border-radius: 7px 7px 7px 7px;
    -webkit-border-radius: 7px 7px 7px 7px;
    border: none;
    margin-right: 5px;
}

.feriados{
    width: 25px; 
    height: 20px; 
    background: #e37acc;
    border-radius: 7px 7px 7px 7px;
    -moz-border-radius: 7px 7px 7px 7px;
    -webkit-border-radius: 7px 7px 7px 7px;
    border: none;
    margin-right: 5px;
}

.ferias{
    width: 25px; 
    height: 20px; 
    background: #7a93e3;
    border-radius: 7px 7px 7px 7px;
    -moz-border-radius: 7px 7px 7px 7px;
    -webkit-border-radius: 7px 7px 7px 7px;
    border: none;
    margin-right: 5px;
}

.folgas{
    width: 25px; 
    height: 20px; 
    background: #6ece87;
    border-radius: 7px 7px 7px 7px;
    -moz-border-radius: 7px 7px 7px 7px;
    -webkit-border-radius: 7px 7px 7px 7px;
    border: none;
    margin-right: 5px;
}

.batidas{
    margin-right: 5px;
}

</style>
