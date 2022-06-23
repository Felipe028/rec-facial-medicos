<template>
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
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        Loading
    },
    data() {
        return {
        isLoading: true,
        };
    },
};
</script>
