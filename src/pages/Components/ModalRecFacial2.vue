<template>

    <div>
        <div class="row" style="margin-top: 10px;">
            <div class="col-md-12 text-left">
                <h4 slot="header" class="card-title">Selecione a Câmera</h4>
                <div class="d-flex flex-row justify-content-between">
                    <el-select
                        class="select-success mb-3 pagination-select w-100"
                        name="cam"
                        id="cam"
                        v-model="selected"
                        placeholder="Selecione a Câmera"
                        @change="changeCamera(selected)"
                    >
                        <el-option
                        class="select-success"
                        v-for="camera in cameras"
                        :key="camera.deviceId"
                        :label="camera.label"
                        :value="camera.deviceId"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>


        <div class="row" style="margin-top: 10px;">
            <div class="col-md-12 text-left">
                <video
                    ref="video"
                    :width="width"
                    :height="height"
                    :src="source"
                    :autoplay="autoplay"
                    :playsinline="playsinline"
                /> 
            </div>
        </div>


        <div class="row" style="margin-top: 10px;">
            <div class="col-md-12 text-left">
                <base-button
                    native-type="submit"
                    slot="footer"
                    type="success"
                    @click="CapturarImagem()"
                    round
                    block
                    size="lg"
                >
                    <i class="tim-icons icon-camera-18"/> Capturar Foto
                </base-button>  
            </div>
        </div>
    <Carregando v-if="isLoading"/>
    </div>
</template>
<script>
// import Paciente from "../../classSamel/Paciente"
// import { bus } from "../../main"
import Carregando from "../../../src/pages/Loads/Carregando.vue";
import swal from "sweetalert2";
import moment from 'moment';

export default {
    name: "modal-rec-facial-2",
    components:{
        Carregando
    },
    props:{


        pacientee: {
            type: Object,
            default: null
        },
        /* configHeader: {
            type: Object,
            required: true
        }, */
        playsinline: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        height: {
            type: [Number, String],
            default: '100%'
        },
        resolution: {
            type: Object,
            default: null,
            validator: value => {
                return value.height && value.width;
            }
        },
    },
    data(){
        return {
            isLoading: false,
            showimg: true,
            cont: 0,
            load28: false,
            teste: null,
            modals: {
                modal3: false
            },
            source: null,
            canvas: null,
            camerasListEmitted: false,
            cameras: [],
            photo: null,
            device: null,
            selected: "",
            cam: false,
            load_modal: false,
            showToken: false,
            showButtons: true,
            listProcedimentos: [],
            errorResponse: {
                status: false,
                message: ''
            },
            successResponse:{
                status: false,
                message:''
            }
        }
    },
    watch: {},
    methods:{
        moment: function (data) {
            return moment(data);
        },


        showSwal2(type, title, text, typeMsg) {
            if (type === "auto-close") {
                swal({
                title: title,
                text: text,
                type: typeMsg,
                timer: 2500,
                showConfirmButton: false,
                });
            }
        },


        showSwal(type){
            if (type === "success-message-recognition") {
                swal({
                title: `Muito Bom!`,
                text: "Reconhecimento facial realizado com sucesso!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success btn-fill",
                type: "success"
                }).then(() => {
                    // location.reload()
                });
            } else if (type === "success-message-register") {
                swal({
                title: `Muito Bom!`,
                text: "Usuario cadastrato com sucesso!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success btn-fill",
                type: "success"
                }).then(() => {
                    // location.reload()
                });
            } else if (type === "error-message") {
                swal({
                title: `Puts :(`,
                text: "Não conseguimos identifica-lo!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success btn-fill",
                type: "error"
                }).then(() => {
                    this.setupMedia();
                    this.loadCameras();
                    // location.reload()
                });
            }
        },
        /* able(){
            bus.$emit('ableButtonEmail', true)
            bus.$emit('ativarMM', true)
        }, */
        closeModal(/* e */){
            this.modals.modal3              = false;
            this.selected                   = ""
            this.errorResponse.status       = false;
            this.errorResponse.message      = "";
            this.successResponse.status     = false;
            this.successResponse.message    = ""
            this.stop();
//            bus.$emit('relaodGuia', true)
            
//            bus.$emit('success', "Paciente autorizado para procedimento(s).");
//            bus.$emit('limpalist');
        },
        loadCameras() {
            this.cameras = [];
            navigator.mediaDevices
                .enumerateDevices()
                .then(deviceInfos => {
                for (let i = 0; i !== deviceInfos.length; ++i) {
                    let deviceInfo = deviceInfos[i];
                    if (deviceInfo.kind === "videoinput") {
                        this.cameras.push(deviceInfo);
                    }
                }
                if(this.cameras.length > 0){
                    this.selected = this.cameras[0].deviceId
                    this.changeCamera(this.selected)
                }
                })
                .then(() => {
                if (!this.camerasListEmitted) {
                    if (this.selectFirstDevice && this.cameras.length > 0) {
                        this.deviceId = this.cameras[0].deviceId;
                    }
                    this.$emit("cameras", this.cameras);
                    this.camerasListEmitted = true;
                }
                })
                .catch(error => this.$emit("notsupported", error));
            },


            CapturarImagem() {
                this.isLoading = true
                this.pause();
                let current = this;
                let img = this.capture();
                img = img.substr(22)
                const cpf = this.$cookies.get('cpf');
                                
                const jsonn = new FormData
                jsonn.append("image", img)
                jsonn.append("nrCpf", cpf)
                
                this.axios.post(`${process.env.VUE_APP_API_ADDRESS_REC_FACIAL}/classify`, jsonn)
                .then(function(response) {
                    current.isLoading = false
                    if(response.data.default_face_matching_classification && response.data.message == "User successfully registered"){
                        // current.registrarPonto(img)
                        current.$root.$emit('checkFacial', true)
                    } else if (response.data.default_face_matching_classification && response.data.message == "The classification succeeded") {
                        // current.registrarPonto(img)
                        current.$root.$emit('checkFacial', true)
                    } else {
                        current.showSwal('error-message')
                        // current.$root.$emit('checkFacial', true)
                    }
                })
                .finally(() => {
                })
                .catch(function(/* e */) {
                    current.isLoading = false
                    // current.showSwal('error-message')
                });
                },
                legacyGetUserMediaSupport() {
                return constraints => {
                    let getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia ||
                    navigator.oGetUserMedia;
                    // Some browsers just don't implement it - return a rejected promise with an error
                    // to keep a consistent interface
                    if (!getUserMedia) {
                    return Promise.reject(
                        new Error("getUserMedia is not implemented in this browser")
                    );
                    }
                    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                    return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                };
                },
                /**
                 * setup media
                 */
                setupMedia() {
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {};
                }
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = this.legacyGetUserMediaSupport();
                }
                this.testMediaAccess();
                },

             
                /**
                 * change to a different camera stream, like front and back camera on phones
                 */
                changeCamera(deviceId) {
                this.stop();
                this.$emit("camera-change", deviceId);
                this.loadCamera(deviceId);
                },
                /**
                 * load the stream to the
                 */
                loadSrcStream(stream) {
                    if ("srcObject" in this.$refs.video) {
                        // new browsers api
                        this.$refs.video.srcObject = stream;
                    } else {
                        // old broswers
                        this.source = window.HTMLMediaElement.srcObject(stream);
                    }
                    // Emit video start/live event
                    this.$refs.video.onloadedmetadata = () => {
                        this.$emit("video-live", stream);
                    };
                    this.$emit("started", stream);
                },
                /**
                 * stop the selected streamed video to change camera
                 */
                stopStreamedVideo(videoElem) {
                let stream = videoElem.srcObject;
                let tracks = stream.getTracks();
                tracks.forEach(track => {
                    // stops the video track
                    track.stop();
                    this.$emit("stopped", stream);
                    this.$refs.video.srcObject = null;
                    this.source = null;
                });
                },
                // stop the video
                stop() {
                if (this.$refs.video !== null && this.$refs.video.srcObject) {
                    this.stopStreamedVideo(this.$refs.video);
                }
                },
                // start the video
                start() {
                if (this.deviceId) {
                    this.loadCamera(this.deviceId);
                }
                },
                // pause the video
                pause() {
                if (this.$refs.video !== null && this.$refs.video.srcObject) {
                    this.$refs.video.pause();
                }
                },
                // resume the video
                resume() {
                if (this.$refs.video !== null && this.$refs.video.srcObject) {
                    this.$refs.video.play();
                }
            },
                /**
                 * test access
                 */
            testMediaAccess() {
                let constraints = { video: true };
                if (this.resolution) {
                    constraints.video = {};
                    constraints.video.height = this.resolution.height;
                    constraints.video.width = this.resolution.width;
                }
                navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    //Make sure to stop this MediaStream
                    let tracks = stream.getTracks();
                    tracks.forEach(track => {
                        track.stop();
                    });
                    this.loadCameras();
                })
                .catch(error => this.$emit("error", error));
            },
            /**
             * load the camera passed as index!
             */
            loadCamera(device) {
                let constraints = { video: { deviceId: { exact: device } } };
                if (this.resolution) {
                    constraints.video.height = this.resolution.height;
                    constraints.video.width = this.resolution.width;
                }
                navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => this.loadSrcStream(stream))
                .catch(error => this.$emit("error", error));
            },
            /**
             * capture screenshot
             */
            capture() {
                this.photo = this.getCanvas().toDataURL(this.screenshotFormat);
                return this.getCanvas().toDataURL(this.screenshotFormat);
            },
            /**
            * get canvas
            */
            getCanvas() {
                let video = this.$refs.video;
                if (!this.ctx) {
                    let canvas = document.createElement("canvas");
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    this.canvas = canvas;
                    this.ctx = canvas.getContext("2d");
                }
                const { ctx, canvas } = this;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                return canvas;
            },
            /**
             * Carregando imagem do paciente
             */

    },
    created(){
        
        /* bus.$on('ativarModal', (result) => {
            this.modals.modal3 = result
        })
        bus.$on('procedimentosSelected', (result) => {
            this.listProcedimentos = result
        }) */
    },
    mounted(){
        
        this.setupMedia();
        this.loadCameras();
    },
  
};
</script>
<style scoped>
    #vitrine {
       width: 100%;
    }
    .space{
        margin-top: 10 px;
    }
</style>