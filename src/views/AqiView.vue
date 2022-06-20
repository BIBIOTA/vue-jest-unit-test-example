<template>
  <v-card>
    <LocationSelector />
    <AQI />
  </v-card>
</template>

<script>
import LocationSelector from '@/components/LocationSelector.vue'
import AQI from '@/components/Aqi.vue'

export default {
  name: 'AqiView',
  components: {
    LocationSelector,
    AQI,
  },
}
</script>
