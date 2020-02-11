<template>
  <section class="instruments-wrapper">
    <div class="signup-instruments flex">
      <input
        type="checkbox"
        id="guitar"
        value="guitar"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="guitar">
        <img
          :src="'/img/events/guitar.png'"
          title="guitar"
          @click="setPicked('guitar')"
          :class="{picked: itemPicked.guitar}"
        >
      </label>
      <input
        type="checkbox"
        id="bass-guitar"
        value="bass-guitar"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="bass-guitar">
        <img
          :src="'/img/events/bass-guitar.png'"
          @click="setPicked('bassGuitar')"
          :class="{picked: itemPicked.bassGuitar}"
          title="bass-guitar"
        >
      </label>
      <input
        type="checkbox"
        id="acoustic-guitar"
        value="acoustic-guitar"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="acoustic-guitar">
        <img
          :src="'/img/events/acoustic-guitar.png'"
          @click="setPicked('acousticGuitar')"
          :class="{picked: itemPicked.acousticGuitar}"
          title="acoustic-guitar"
        >
      </label>
      <input
        type="checkbox"
        id="dj"
        value="dj"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="dj">
        <img :src="'/img/events/dj.png'" @click="setPicked('dj')" :class="{picked: itemPicked.dj}" title="dj">
      </label>
      <input
        type="checkbox"
        id="drums"
        value="drums"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="drums">
        <img
          :src="'/img/events/drums.png'"
          @click="setPicked('drums')"
          :class="{picked: itemPicked.drums}"
          title="drums"
        >
      </label>
      <input
        type="checkbox"
        id="flute"
        value="flute"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="flute">
        <img
          :src="'/img/events/flute.png'"
          @click="setPicked('flute')"
          :class="{picked: itemPicked.flute}"
          title="flute"
        >
      </label>
      <input
        type="checkbox"
        id="french-horn"
        value="french-horn"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="french-horn">
        <img
          :src="'/img/events/french-horn.png'"
          @click="setPicked('frenchHorn')"
          :class="{picked: itemPicked.frenchHorn}"
          title="french-horn"
        >
      </label>
      <input
        type="checkbox"
        id="piano"
        value="piano"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="piano">
        <img
          :src="'/img/events/piano.png'"
          @click="setPicked('piano')"
          :class="{picked: itemPicked.piano}"
          title="piano"
        >
      </label>
      <input
        type="checkbox"
        id="saxophone"
        value="saxophone"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="saxophone">
        <img
          :src="'/img/events/saxophone.png'"
          @click="setPicked('saxophone')"
          :class="{picked: itemPicked.saxophone}"
          title="saxophone"
        >
      </label>
      <input
        type="checkbox"
        id="synthesizer"
        value="synthesizer"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="synthesizer">
        <img
          :src="'/img/events/synthesizer.png'"
          @click="setPicked('synthesizer')"
          :class="{picked: itemPicked.synthesizer}"
          title="synthesizer"
        >
      </label>
      <input
        type="checkbox"
        id="trumpet"
        value="trumpet"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="trumpet">
        <img
          :src="'/img/events/trumpet.png'"
          @click="setPicked('trumpet')"
          :class="{picked: itemPicked.trumpet}"
          title="trumpet"
        >
      </label>
      <input
        type="checkbox"
        id="tuba"
        value="tuba"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="tuba">
        <img
          :src="'/img/events/tuba.png'"
          @click="setPicked('tuba')"
          :class="{picked: itemPicked.tuba}"
          title="tuba"
        >
      </label>
      <input
        type="checkbox"
        id="violin"
        value="violin"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="violin">
        <img
          :src="'/img/events/violin.png'"
          @click="setPicked('violin')"
          :class="{picked: itemPicked.violin}"
          title="violin"
        >
      </label>
    </div>
  </section>
</template>

<script>
export default {
  props: ["currInstruments"],
  data() {
    return {
      pickedInstruments: [],
      itemPicked: {
        guitar: false,
        bassGuitar: false,
        acousticGuitar: false,
        dj: false,
        flute: false,
        frenchHorn: false,
        piano: false,
        saxophone: false,
        synthesizer: false,
        trumpet: false,
        tuba: false,
        violin: false
      }
    };
  },
  methods: {
    setPickedInstruments() {
      this.$emit("setPickedInstruments", this.pickedInstruments);
    },
    setPicked(instrument) {
      this.itemPicked[instrument] = !this.itemPicked[instrument];
      this.setPickedInstruments()
    }
  },
  created() {
    if (this.currInstruments && this.currInstruments.length > 0) {
      this.pickedInstruments = this.currInstruments;
      this.pickedInstruments.forEach(pickedInstrument => {
        this.itemPicked[pickedInstrument.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase()})] = true;
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.instruments-wrapper {
  margin: 10px;
  border: 1px solid lightgray;
  height: auto;
  width: 100%;
}
.signup-instruments {
  padding: 5px;
  flex-wrap: wrap;
  justify-content: center;
  label {
    margin: 5px;
  }
}
img {
  width: 48px;
  height: 48px;
  padding: 5px;
  border: 1px solid black;
  &:hover {
    background-color: #85ce61;
  }
  &:active {
    background-color: #5daf34;
  }
}
.picked {
  background-color: #67c23a;
}
</style>
