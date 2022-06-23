<template>
  <div class="content">
    <div class="row mt-0" v-if="itemMenu == 1">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Escalas por departamento</h4>
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="d-flex flex-column justify-content-start">
                  <label for="motivo" class="form-label  text-left w-100">Controle de Folgas por departamento:</label>
                  <el-select
                    class="select-success pagination-select w-100"
                    id="motivo"
                    v-model="adicionar.motivo"
                >
                    <el-option class="select-success" label="Sim" value="S" selected>Sim</el-option>
                    <el-option class="select-success" label="Não" value="N">Não</el-option>
                </el-select>
                </div>
                <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <div>
                        <base-button 
                            type="success" 
                            class="animation-on-hover"
                            style="margin: 0px 5px 0px 5px;"
                            @click="itemMenu = 2"
                        >Lançar Folgas</base-button>
                    </div>
                </div>
            </div>
            <el-table :data="queriedData">
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              >
              </el-table-column>
              <el-table-column :min-width="135" align="right" label="Actions">
                <div slot-scope="props">
                  <el-tooltip content="Horários" effect="light" :open-delay="300" placement="top">
                    <base-button
                      @click.native="handleDelete(props.$index, props.row, itemMenu = 3)"
                      class="remove btn-link"
                      type="primary"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-watch-time"></i>
                    </base-button>
                  </el-tooltip>
                  
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Mostrando de {{ from + 1 }} a {{ to }} no total de {{ total }} Departamento.
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination>
          </div>
        </card>
      </div>
    </div>

    <div v-else-if="itemMenu == 2">
      <folgas/>
    </div>

    <div v-else-if="itemMenu == 3">
      <horarios/>
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

import Folgas from "./PesquisarEscalaDepartamento/Folgas.vue"
import Horarios from "./PesquisarEscalaDepartamento/Horarios.vue"


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
    Modal,
    Folgas,
    Horarios
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
      itemMenu: 1,

      horarioSelecionado: "",
      adicionar:{
          motivo: "S"
      },


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

    this.$root.$on('voltarPesquisarEscalaDepartamento', (dado) => {
      this.itemMenu = dado
    })
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

</style>
