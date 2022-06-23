<template>
  <div class="content">
    <div class="row d-none d-md-block">
      <div class="col-sm-12 d-flex justify-content-start pb-2">
        <base-button type="primary" size="sm" @click="$router.push('/registrarPonto/colaborador')">
          <i class="tim-icons icon-minimal-left"></i> Voltar
        </base-button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mr-auto ml-auto">
        <card class="card-register card-white">
          <modal-rec-facial/>
        </card>
      </div>
      
    </div>
    
  </div>
</template>
<script>
import { Card } from "@/components/index";
import moment from 'moment';
import ModalRecFacial from './Components/ModalRecFacial.vue';


export default {
  components: {
    Card,
    ModalRecFacial
  },
  data() {
    return {
      imgRecente: "",
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.carregarFotoF()
    this.$root.$on('responseRecFacial', (params) => {
      if(params){
        this.$router.push('/registrarPonto/colaborador')
      }
    });
  },
  methods: {
    moment: function (data) {
      return moment(data);
    },


    carregarFotoF(){
      let th = this
      let jsonn = new FormData
      jsonn.append("nrCpf", this.$cookies.get('cpf'))
      
      this.axios.post(`${process.env.VUE_APP_API_ADDRESS_REC_FACIAL}/getFotoRecente`, jsonn)
      .then((response) => {
        th.imgRecente = response.data.ImagemRecente
      })
      .finally(() => {})
      .catch(() => {
      });
    },
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
