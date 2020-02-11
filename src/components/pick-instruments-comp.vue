<template>
  <section class="instruments-wrapper">
    <h4 class="final-join-btn">Pick your instrument:</h4>
    <div class="instruments-container flex">
      <div
        v-for="(instrument, index) in instruments"
        :key="index"
        @click="setPickedInstrument(instrument)"
      >
        <img
          :src="'/img/events/'+ instrument.name + '.png'"
          :class="{picked: pickedInstrument === instrument.name}"
        >
      </div>
    </div>
    <!-- <el-button @click='cancelInstrumentPick' round ><i class="fa fa-arrow-left"></i></el-button> -->
    <h4 v-if="pickedInstrument">Selected {{pickedInstrument}}</h4>
    <div class="wrapper flex justify-center">
      <el-button
        round
        class="final-join-btn brand-button center"
        @click="selectInstrument"
      >Join Session</el-button>
    </div>
    </section>
</template>

<script>
export default {
  name: "pick-instruments-comp",
  props: ["instruments"],
  data() {
    return {
      pickedInstrument: null
    };
  },
  methods: {
    setPickedInstrument(instrument) {
      this.pickedInstrument = instrument.name;
    },
    selectInstrument() {
      this.$emit("selectedInstrument", this.pickedInstrument);
    },
  },
};
</script>

<style scoped lang='scss'>
.instruments-wrapper {
  border: 1px solid lightgray;
  width: 100%;
  padding-bottom: 20px;
}
.instruments-container {
  padding: 10px;
  flex-wrap: wrap;
}
img {
  cursor: pointer;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  margin: 5px;
  padding: 5px;
  border: 1px solid #58e612;
  background-color: #58e612;
  &:hover {
    background-color: #85ce61;
  }
  &:active {
    background-color: #5daf34;
  }
}

h4 {
  text-align: center;
}

.picked {
  background-color: #67c23a;
  border: 0.5px solid gray;
}

button {
  margin: 20px 0px 0px 30px;
}
.final-join-btn {
  margin: 0 auto;
}
</style>
