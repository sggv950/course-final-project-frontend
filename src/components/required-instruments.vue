<template>
  <section class="required-instruments flex wrap">
      <div class="flex align-center" v-for="instrument in instrumentsToShow" :key="instrument.name">
        <img
          :class="{
            'icon-green': !instrument.required, 
            'icon-grey': instrument.required
            }"
          :src="'/img/events/' + instrument.name + '.png'"
          :title="(!instrument.required)? 'Still looking for '+ instrument.name +'.' : 'Already have ' + instrument.name +'.'"
        >
      </div>
  </section>
</template>

<script>
export default {
  name: "required-instruments",
  props: {
    instruments: Array,
    preview: Boolean
  },
  computed: {
    instrumentsToShow() {
      let instruments = this.instruments
        .map(instrument => {
          const required = !!instrument.playerIds.length 
          return {name: instrument.name, required}
        })
        .sort((a,b) => {
          if (a.required) return 1
          else return -1
        })
        if (this.preview && instruments.length > 6) instruments.length = 6
      return instruments;
    },
    requiredInstrumentsObj() {
        return this.instruments.filter(
        instrument => !instrument.playerIds.length
        );
    },
  },
  mounted() {
    this.$emit("setRequiredInstrumentsToShow", this.requiredInstrumentsObj);
  }
};
</script>