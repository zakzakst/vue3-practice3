<template>
  <v-app>
    <v-main>
      <v-container fluid pt-0>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import FooterComponent from '@/components/Footer.vue';

export default defineComponent({
  components: {
    Footer: FooterComponent,
  },
});
</script>
