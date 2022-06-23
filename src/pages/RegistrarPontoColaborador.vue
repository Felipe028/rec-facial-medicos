<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-3">
        <card class="card-login card-white text-left">
          <!-- <h4 slot="header" class="card-title text-uppercase">{{this.$cookies.get('nome')}}</h4> -->
          <div class="w-100 d-flex justify-content-center p-1">
            <!-- <img v-if="!imgRecente" :src="'data:image/png;base64,'+imgRecente" alt="Card image" class="img img-raised"/> -->
            <div v-if="loadImgRecente" class="d-flex align-items-center">
              <strong>Carregando Foto...</strong>
              <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>

            <div v-else class="w-100 d-flex justify-content-center">
              <img v-if="imgRecente" :src="'data:image/png;base64,'+imgRecente" alt="Card image" class="img img-raised"/>
              <img v-else src="../../public/img/anime4.png" alt="paciente" class="img-thumbnail" style="border-radius: 50%; width: 50%;">
            </div>
          
          </div>
          <div class="mt-3 p-2">
            <p class="text-muted"><strong>Funcionário:</strong> {{this.$cookies.get('nome')}}</p>
            <p class="text-muted"><i class="tim-icons icon-calendar-60"></i> {{moment(new Date()).add(1, 'hour').format('DD/MM/YYYY')}} - <i class="tim-icons icon-watch-time"></i> {{horaAgora}}</p>
          </div>
          <!-- <div class="mt-2">
            <base-button
              @click="$router.push('/registrarPonto')"
              native-type="submit"
              type="success"
              class="mb-3"
              size="lg"
              block
            >
               Registrar Ponto
            </base-button>
          </div> -->
        </card>
      </div>

      <div class="col-lg-9">
        <card class="card-login card-white pt-0 d-flex justify-content-center">
          <div class="row">
            <div class="col-md-12 ml-auto mr-auto">
              <card>
                <template slot="header">
                  <!-- <h5 class="card-category text-left">Registro eletrônico de ponto</h5> -->
                  <h3 class="card-title text-left">Registro eletrônico de ponto</h3>
                </template>
                <tabs
                  type="success"
                  tabNavWrapperClasses="col-lg-3 col-md-6"
                  tabContentClasses="col-md-9"
                  vertical
                  square
                  class="row text-left"
                >
                  <tab-pane>
                    <span slot="label" @click="showCamera = true">
                      <i class="tim-icons icon-camera-18"></i>Registrar Ponto
                    </span>
                    <div class="row w-100 mr-auto ml-auto">
                      <div class="col-md-6 mr-auto ml-auto">
                        <modal-rec-facial v-if="showCamera"/>
                      </div>
                    </div>
                  </tab-pane>

                  <tab-pane>
                    <span slot="label" @click="showCamera = false">
                      <i class="tim-icons icon-paper"></i>Ultimos Registros
                    </span>
                    Efficiently unleash cross-media information without cross-media
                    value. Quickly maximize timely deliverables for real-time schemas.
                    <br /><br />Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </tab-pane>
                </tabs>
              </card>






            </div>
          </div>
          
        </card>
        
      </div>
      
    </div>
  <Carregando v-if="isLoading"/>
  </div>
</template>
<script>
import Carregando from "../../src/pages/Loads/Carregando.vue";
import { Card, BasePagination, TabPane, Tabs, Collapse, CollapseItem } from "@/components/index";
import moment from 'moment';
import ModalRecFacial from '../../src/pages/Components/ModalRecFacial.vue';

import { Table, TableColumn } from "element-ui";

export default {
  components: {
    Carregando,
    Card,
    ModalRecFacial,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
    TabPane,
    Tabs,
    Collapse,
    CollapseItem
  },
    computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    
  },
  data() {
    return {
      mes: 0,
      showCamera: true,
      isLoading: false,
      nColunas: 0,
      imgRecente: "",
      showRecFacial: 1,
      searchedData: "",
      horaAgora: "",
      loadImgRecente: true,

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


      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },

      tableData: [],
      tableDataSearch: []
    };
  },
  computed: {},
  mounted() {
    // this.listarPontosFuncionarios()

    setTimeout(() => {
      this.mes = this.moment(new Date()).format('MM')
    }, 1500)
  

    this.carregarFotoF()
    this.$root.$on('checkFacial', (data) => {
      if(data){
        this.showRecFacial = 3
        this.listarPontosFuncionarios(this.moment(new Date()).format('MM'))
      }
    });

    setInterval(() => {
      this.horaAgora = moment(new Date()).add(0, 'hour').format('HH:mm:ss')
    },1000)
  },
  methods: {
    moment: function (data) {
      return moment(data);
    },


    handleOpenLocation(row){
      window.open(`https://www.google.com/maps/search/${row.LATITUDE_BATIDA},${row.LONGITUDE_BATIDA}/@${row.LATITUDE_BATIDA},${row.LONGITUDE_BATIDA},21z`, "_blank");
      // window.open(`https://www.google.com.br/maps/@${row.LATITUDE_BATIDA},${row.LONGITUDE_BATIDA},21z`, "_blank");
    },


    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from(), this.to());
    },
    to() {
      let highBound = this.from() + this.pagination.perPage;
      if (this.total() < highBound) {
        highBound = this.total();
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
    },


    carregarFotoF(){
      let th = this
      let jsonn = new FormData
      jsonn.append("nrCpf", this.$cookies.get('cpf'))
      
      this.axios.post(`${process.env.VUE_APP_API_ADDRESS_REC_FACIAL}/getFotoRecente`, jsonn)
      .then((response) => {
        th.loadImgRecente = false
        th.imgRecente = response.data.ImagemRecente
      })
      .finally(() => {})
      .catch(() => {
      });
    },


    listarPontosFuncionarios(mes){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        id_empregador: this.$cookies.get('idEmpregador'),
        id_empregado: this.$cookies.get('idEmpregado'),
        idMes: mes
      }
      this.axios.post('/api/movimentacoes/listarMovimentacoesPorIdEmpregadoPorMes', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.tableData = response.data.data.dados
        th.tableDataSearch = response.data.data.dados

        let cont = 0
        let cont2 = 0

        th.tableData.map((dados) => {
          cont = 0
          dados.horarios_batidas.map((data) => {
            cont ++
          })
          if(cont2 < cont){
            cont2 = cont
          }
        })

        if(cont2 > 8){
          cont2 = 8
        }

        th.nColunas = cont2
        // alert(cont)

        // th.tableData = response.data.data.dados
        // th.carregarFuse()
      })
      .catch((err) => {
        th.isLoading = false
      })
    },


  },

  watch: {
    mes(newVal){
      this.listarPontosFuncionarios(newVal)


      /* this.tableData = this.tableDataSearch.filter((dados) => {
        if(dados.data.substr(3, 2) == newVal){
          return dados
        }
      }) */


    }
  },

  beforeDestroy() {}
};
</script>
<style>
#worldMap .datamap {
  left: 0 !important;
}

.text-h4{
    padding: 0px 10px 0px 10px;
    margin: 10px 0px 0px 0px;
}

.text-p{
    text-align: left;
    padding: 0px 20px 0px 20px;
}
</style>
