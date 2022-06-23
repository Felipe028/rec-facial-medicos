<template>
  <div class="content">
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left" style="padding: 0px; margin: 0px;">Escalas Cadastradas</h4>
          <div>
            <h5 class="card-title text-left mt-0 pt-0" style="padding: 0px; margin: 0px;"><b>Funcionário:</b> Felipe da Silva Arraes</h5>
          </div>
          <div style="margin-top: 20px;">
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div>
                    <el-select
                        class="select-success mb-3 pagination-select"
                        v-model="pagination.perPage"
                        placeholder="Per page"
                    >
                        <el-option
                        class="select-success"
                        v-for="item in pagination.perPageOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <div>
                        <base-input>
                            <el-input
                            class="mb-3 search-input"
                            type="tel"
                            v-mask="'##/##/####'"
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
                  <!-- <base-button
                    @click.native="handleLike(props.$index, props.row)"
                    class="like btn-link"
                    type="info"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-heart-2"></i>
                  </base-button> -->
                  
                  <base-button
                    @click="dialogHorarioLimite = true"
                    class="edit btn-link"
                    type="info"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-pencil"></i>
                  </base-button>
                  <modal :show.sync="dialogHorarioLimite">
                    <template slot="header">
                        <h4 class="modal-title" id="exampleModalLabel">Hórario limite</h4>
                    </template>
                    <div>
                      <h5 class="text-left"><strong>Funcionário:</strong> Felipe da Silva</h5>
                      <el-select
                          class="select-success col-sm-12 pagination-select"
                          v-model="horarioSelecionado"
                      >
                        <el-option class="select-success" label="03:00" value="03:00" selected>03:00</el-option>
                        <el-option class="select-success" label="04:00" value="04:00">04:00</el-option>
                        <el-option class="select-success" label="05:00" value="05:00">05:00</el-option>
                        <el-option class="select-success" label="06:00" value="06:00">06:00</el-option>
                        <el-option class="select-success" label="07:00" value="07:00">07:00</el-option>
                        <el-option class="select-success" label="08:00" value="08:00">08:00</el-option>
                        <el-option class="select-success" label="09:00" value="09:00">09:00</el-option>
                        <el-option class="select-success" label="10:00" value="10:00">10:00</el-option>
                      </el-select>

                      <div class="row" style="margin-top: 10px;">
                        <p class="text-left"><b>Atenção:</b></p>
                        <p class="text-left">Caso este funcionário saia exemplo <b>03:00</b> da manhã, configure para <b>04:00</b> por segurança</p>
                      </div>

                    </div>
                    <template slot="footer">
                        <base-button type="danger" @click="dialogHorarioLimite = false">Fechar</base-button>
                        <base-button type="success">Salvar</base-button>
                    </template>
                  </modal>
                  <base-button
                    @click.native="handleDelete(props.$index, props.row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
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
                Mostrando de {{ from + 1 }} a {{ to }} no total de {{ total }}.
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
// import NotificationHorarioLimite from "../Notifications/NotificationHorarioLimite.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "visualizar-escalas",
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

