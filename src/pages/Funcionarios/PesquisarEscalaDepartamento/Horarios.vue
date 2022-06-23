<template>
  <div class="content">
    <!-- <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Paginated Tables</h2>
    </div> -->
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">--Nome do setor--</h4>
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
                        <base-button 
                            type="success" 
                            class="animation-on-hover"
                            style="margin: 0px 5px 0px 5px;"
                            @click="adicionarModelo = true" 
                        >Adicionar Modelo</base-button>
                        <modal :show.sync="adicionarModelo">
                            <template slot="header">
                            <h4 class="modal-title" id="exampleModalLabel">Adicionar Modelo de Escala</h4>
                            </template>
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <h5 class="text-left"><strong>Departamento:</strong> Departamento teste</h5>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-3 text-left d-flex flex-row">
                                        <base-input
                                            label="Código"
                                            type="text"
                                            v-model="demitir.data"
                                        >
                                        </base-input>
                                    </div>
                                    <div class="col-9 text-left d-flex flex-row">
                                        <base-input
                                            label="Descrição"
                                            class="w-100"
                                            type="text"
                                            v-model="demitir.data"
                                        >
                                        </base-input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 text-left">
                                        <label for="postoTrabalho" class="form-label  text-left w-100">Quantidade de colunas</label>
                                        <el-select
                                            class="select-success pagination-select w-100"
                                            id="postoTrabalho"
                                            v-model="horarioSelecionado"
                                        >
                                            <el-option class="select-success" label="2" value="2" selected>2</el-option>
                                            <el-option class="select-success" label="4" value="4">4</el-option>
                                            <el-option class="select-success" label="6" value="6">6</el-option>
                                        </el-select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 text-left">
                                        <label class="col-form-label mb-0">Selecione os dias do horário</label>
                                        <div class="mt-0">
                                            <base-checkbox class="mt-0">Todos os dias</base-checkbox>
                                        </div>
                                        <div class="d-flex flex-row w-100 justify-content-between">
                                            <base-checkbox class="mt-0">seg</base-checkbox>
                                            <base-checkbox class="mt-0">ter</base-checkbox>
                                            <base-checkbox class="mt-0">qua</base-checkbox>
                                            <base-checkbox class="mt-0">qui</base-checkbox>
                                            <base-checkbox class="mt-0">sex</base-checkbox>
                                            <base-checkbox class="mt-0">sab</base-checkbox>
                                            <base-checkbox class="mt-0">dom</base-checkbox>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <template slot="footer">
                                <base-button type="danger" @click="dialogHorarioLimite = false">Fechar</base-button>
                                <base-button type="success">Salvar</base-button>
                            </template>
                        </modal>
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
                  <!-- <base-button
                    @click.native="handleLike(props.$index, props.row)"
                    class="like btn-link"
                    type="info"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-heart-2"></i>
                  </base-button> -->
                  <el-tooltip content="Editar" effect="light" :open-delay="300" placement="top">
                    <base-button
                      @click.native="handleEdit(props.$index, props.row, $router.push('/cadastrarFuncionarios'))"
                      class="edit btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-pencil"></i>
                    </base-button>
                  </el-tooltip>

                  
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
      horarioSelecionado: "",
      adicionarModelo: false,
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
