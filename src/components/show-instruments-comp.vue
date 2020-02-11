<template>
  <section class="instruments-wrapper">
    <div class="instruments-container flex">
      <div
        v-for="(instrument, index) in instruments"
        :key="index"
      >
        <img
          :src="'/img/events/'+ instrument + '.png'"
        >
      </div>
    </div>
    
  </section>
</template>

<script>
export default {
  name: "show-instruments-comp",
  props: ["instruments"],
  data() {
    return {
      pickedInstrument: null
    };
  }
};
</script>

<style scoped lang='scss'>
.instruments-wrapper {
  border: 1px solid lightgray;
  width: 100%;
}
.instruments-container {
  flex-wrap: wrap;
}
img {
  width: 40px;
  height: 40px;
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  background-color: #67c23a;
}

h4 {
  text-align: center;
}


button {
  margin: 20px 0px 0px 30px;
}
</style>
