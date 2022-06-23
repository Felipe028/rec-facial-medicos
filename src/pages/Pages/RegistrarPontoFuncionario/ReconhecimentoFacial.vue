<template>
  <div class="container">

    <div class="col-lg-4 col-md-6 ml-auto mr-auto" v-if="!showRec">
        <card class="card-login card-white text-left">
          <div class="d-flex justify-content-center align-items-center">
            <i class="tim-icons icon-camera-18" style="font-size: 100px;"></i>
          </div>

          <div slot="footer">
            <base-button
              @click="showRecFacialF()"
              native-type="submit"
              type="primary"
              class="mb-3"
              size="lg"
              block
            >
               Resgitrar Ponto
            </base-button>
           

          </div>
        </card>
    </div>











    <div v-else class="row" style="margin-top: -90px;">
      <div class="col-md-6 mr-auto">
        <card class="card-register card-white">
          <div class="row" style="margin-top: 10px;">
            <div class="col-md-12 text-left">
              <h4 slot="header" class="card-title">{{this.$cookies.get('nome')}}</h4>
              
              <img :src="'data:image/png;base64,'+imgRecente" id='vitrine'/>

            </div>
          </div>
        </card>
      </div>

      <div class="col-md-6 mr-auto">
          <card class="card-register card-white">
            <!-- <modal-rec-facial :typePonto="1"/> -->
          </card>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseCheckbox, Card, BaseInput } from "@/components/index";
// import ModalRecFacial from "./ModalRecFacial.vue"

export default {
  components: {
    BaseCheckbox,
    Card,
    BaseInput,
    // ModalRecFacial
  },
  data() {
    return {
      showRec: false,
      imgRecente: "",
      isLoading: true

    };
  },

  created(){
 
  },

  mounted(){
    this.carregarFotoF()
  },


  methods: {
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


    showRecFacialF(){
      this.showRec = true
      setTimeout(() => {
        location.reload()
      }, 60000)
    },
  


    async register() {
      let isValidForm = await this.$validator.validateAll();
      if (isValidForm) {
        // TIP use this.model to send it to api and perform register call
      }
    }
  }
};
</script>
<style></style>
