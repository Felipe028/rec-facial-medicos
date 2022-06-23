<template>
  <div class="content">
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left" style="padding: 0px; margin: 0px;">Adicionar Nova Escala</h4>
          <div>
            <h5 class="card-title text-left mt-0 pt-0" style="padding: 0px; margin: 0px;"><b>Funcionário:</b> Felipe da Silva Arraes</h5>
          </div>
          <div style="margin-top: 20px;">
                  <div class="row">
                    <div class="col-md-4 text-left">
                      <h4 slot="header" class="card-title">Data Inicial</h4>
                      <input type="date" class="form-control" placeholder="Data Inicial" v-model="dataInicial"/>
                    </div>
                    <div class="col-md-4 text-left">
                      <h4 slot="header" class="card-title">Data Final</h4>
                      <input type="date" class="form-control" placeholder="Data Inicial" v-model="dataFinal"/>
                    </div>
                    <div class="col-md-4 text-left">
                      <h4 slot="header" class="card-title">Quantidades de Colunas</h4>
                      <base-input>
                        <el-select
                          class="select-success"
                          size="large"
                          placeholder="Single Select"
                          v-model="qtdColunasSelecionadas"
                        >
                        <el-option class="select-success" label="2" value="2">2</el-option>
                        <el-option class="select-success" label="4" value="4">4</el-option>
                        <el-option class="select-success" label="6" value="6">6</el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>


                  <div class="row" v-show="qtdColunasSelecionadas == 2">
                    <div class="col-md-4 text-left">
                      <h4 slot="header" class="card-title">Horário previsto de intervalo</h4>
                      <div class="d-flex flex-row justify-content-between">
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 5px 0px 0px;" v-model="intervaloInicial"/>
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 0px 0px 5px;" v-model="intervaloFinal"/>
                      </div>
                    </div>
                  </div>


                  <div class="row" style="margin-top: 10px;">
                    <div class="col-md-3 text-left">
                      <h4 slot="header" class="card-title">Entrada / Saída 1</h4>
                      <div class="d-flex flex-row justify-content-between">
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 5px 0px 0px;" v-model="entrada1"/>
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 0px 0px 5px;" v-model="saida1"/>
                      </div>
                    </div>
                    <div class="col-md-3 text-left" v-show="qtdColunasSelecionadas == 4 || qtdColunasSelecionadas == 6">
                      <h4 slot="header" class="card-title">Entrada / Saída 2</h4>
                      <div class="d-flex flex-row justify-content-between">
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 5px 0px 0px;" v-model="entrada2"/>
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 0px 0px 5px;" v-model="saida2"/>
                      </div>
                    </div>
                    <div class="col-md-3 text-left" v-show="qtdColunasSelecionadas == 6">
                      <h4 slot="header" class="card-title">Entrada / Saída 3</h4>
                      <div class="d-flex flex-row justify-content-between">
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 5px 0px 0px;" v-model="entrada3"/>
                        <input type="time" class="form-control" placeholder="Data Inicial" style="margin: 0px 0px 0px 5px;" v-model="saida3"/>
                      </div>
                    </div>
                    <div class="col-md-3 text-left">
                      <h4 slot="header" class="card-title">Escala Manual</h4>
                      <base-input>
                        <el-select
                          class="select-success"
                          size="large"
                          placeholder="Single Select"
                          v-model="escalaManual"
                        >
                        <el-option class="select-success" label="Escala Manual" :value="1">Escala Manual</el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>


                  <div class="row" style="margin-top: 10px;">
                    <div class="col-md-12">
                      <div class="d-flex justify-content-end">
                        <base-button 
                          type="success" 
                          class="animation-on-hover"
                          style="margin: 0px 5px 0px 5px;"
                        >Gerar</base-button>
                      </div>
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
import users from "../../../pages/Tables/users.js";
import swal from "sweetalert2";
import Fuse from "fuse.js";
// import NotificationHorarioLimite from "../Notifications/NotificationHorarioLimite.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "cadastrar-escalas",
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
      entrada1: "",
      entrada2: "",
      entrada3: "",
      saida1: "",
      saida2: "",
      saida3: "",
      intervaloInicial: "",
      intervaloFinal: "",
      horarioSelecionado: "",
      escalaManual: 1,
      qtdColunasSelecionadas: 4,
      dataInicial: "",
      dataFinal: "",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
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
    /* notifyVue(verticalAlign, horizontalAlign) {
        this.$notify({
            component: NotificationHorarioLimite,
            icon: "tim-icons icon-bell-55",
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: "warning",
            timeout: 30000
        });
    } */
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

