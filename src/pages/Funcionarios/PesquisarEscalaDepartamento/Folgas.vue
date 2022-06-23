<template>
  <div class="content">
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Folgas</h4>
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div>
                    <base-button 
                        type="info" 
                        class="animation-on-hover"
                        @click="voltarF()"
                    ><i class="tim-icons icon-minimal-left"></i> Voltar</base-button>
                </div>
                <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <div>
                        <base-input>
                            <el-input
                            type="search"
                            class="mb-3 search-input"
                            color="success"
                            clearable
                            prefix-icon="el-icon-search"
                            placeholder="Pesquisar funcionário"
                            v-model="searchQuery"
                            aria-controls="datatables"
                            >
                            </el-input>
                        </base-input>
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
                  <el-tooltip content="Lançar Folga" effect="light" :open-delay="300" placement="top">
                    <base-button
                      @click.native="handleEdit(props.$index, props.row, addFolga = true)"
                      class="edit btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-simple-add"></i>
                    </base-button>
                  </el-tooltip>
                  <modal :show.sync="addFolga">
                    <template slot="header">
                        <h4 class="modal-title" id="exampleModalLabel">Adiconar Folga</h4>
                    </template>
                    <div class="text-left">
                        <h5 class="text-left"><strong>Funcionário:</strong> Felipe da Silva</h5>
                        <div class="row d-flex flex-row text-left justify-content-start">
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

                    </div>
                    <template slot="footer">
                        <base-button type="danger" @click="addFolga = false">Fechar</base-button>
                        <base-button type="success">Salvar</base-button>
                    </template>
                  </modal>


                  <el-tooltip content="Visualizar Folga" effect="light" :open-delay="300" placement="top">                  
                    <base-button
                      @click="visualizarFolga = true"
                      class="edit btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-attach-87"></i>
                    </base-button>
                  </el-tooltip>
                  <modal :show.sync="visualizarFolga">
                    <template slot="header">
                        <h4 class="modal-title" id="exampleModalLabel">Folgas</h4>
                    </template>
                    <div>
                        <h5 class="text-left"><strong>Funcionário:</strong> Felipe da Silva</h5>
                        <div class="container">
                            <div class="row">
                                <div class="col-10 text-left">
                                Período
                                </div>
                                <div class="col-2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-10 text-left">
                                    De 23/12/2021 Até 23/12/2021
                                </div>
                                <div class="col-2">
                                    <el-tooltip content="Excluir" effect="light" :open-delay="300" placement="top">
                                        <base-button
                                        @click.native="handleDelete(props.$index, props.row)"
                                        class="remove btn-link"
                                        type="danger"
                                        size="sm"
                                        icon
                                        >
                                        <i class="tim-icons icon-simple-remove"></i>
                                        </base-button>
                                    </el-tooltip>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-10 text-left">
                                    De 23/12/2021 Até 23/12/2021
                                </div>
                                <div class="col-2">
                                    <el-tooltip content="Excluir" effect="light" :open-delay="300" placement="top">
                                        <base-button
                                        @click.native="handleDelete(props.$index, props.row)"
                                        class="remove btn-link"
                                        type="danger"
                                        size="sm"
                                        icon
                                        >
                                        <i class="tim-icons icon-simple-remove"></i>
                                        </base-button>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>

                    </div>
                    <template slot="footer">
                        <base-button type="danger" @click="visualizarFolga = false">Fechar</base-button>
                        <base-button type="success">Salvar</base-button>
                    </template>
                  </modal>
                  
                  
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
                Mostrando de {{ from + 1 }} a {{ to }} no total de {{ total }} funcionários.
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
import NotificationHorarioLimite from "../../Notifications/NotificationHorarioLimite.vue";
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
        addFolga: false,
        visualizarFolga: false,
        dataF: {
            de: "",
            ate: ""
        },

      horarioSelecionado: "",
      dialogDemitirFuncionario: false,
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


    voltarF(){
        this.$root.$emit('voltarPesquisarEscalaDepartamento', 1)
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
</style>
