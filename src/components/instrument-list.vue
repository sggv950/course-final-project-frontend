<template>
  <section class="instruments-list flex wrap">
    <div v-for="(currInstrument, idx) in instruments" :key="currInstrument.name" @click="toggleInstrument(idx)">
      <el-button @click="$emit('add-instrument',currInstrument.name)">{{currInstrument.name}}</el-button>
      <!-- <img :src="instruments.src" alt=""> -->
    </div>
  </section>
</template>

<script>

export default {
    data() {
        return {
            instruments: [
              {name: 'guitar', src: '', isSelected: false},
              {name: 'dj', src: '', isSelected: false},
              {name: 'acoustic-guitar', src: '', isSelected: false},
              {name: 'drums', src: '', isSelected: false},
              {name: 'bass-guitar', src: '', isSelected: false},
              {name: 'flute', src: '', isSelected: false},
              {name: 'piano', src: '', isSelected: false},
              {name: 'trumpet', src: '', isSelected: false},
              {name: 'tuba', src: '', isSelected: false},
              {name: 'french-horn', src: '', isSelected: false},
              {name: 'trombone', src: '', isSelected: false},
              {name: 'violin', src: '', isSelected: false},
              {name: 'saxophone', src: '', isSelected: false},
              {name: 'synthesizer', src: '', isSelected: false},
            ],
        }
    },
    methods: {
      toggleInstrument(instrumentIdx) {
        this.instruments[instrumentIdx].isSelected = !this.instruments[instrumentIdx].isSelected;
      }
    },
}
</script>

<style>

</style>
