<template>
  <div class="time-picker flex justify-center">
        <div class="flex flex-column align-center">
            <button class="btn" type="button" @click="changeHours(1)"><i class="fas fa-inverse fa-arrow-up"></i></button>
            {{time.hours}}
            <button class="btn" type="button" @click="changeHours(-1)"><i class="fas fa-inverse fa-arrow-down"></i></button>
        </div>
        <div class="flex flex-column align-center">
            <button class="btn" type="button" @click="changeMinutes(1)"><i class="fas fa-inverse fa-arrow-up"></i></button>
            {{time.minutes}}
            <button class="btn" type="button" @click="changeMinutes(-1)"><i class="fas fa-inverse fa-arrow-down"></i></button>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        value: null,
  },
  data() {
      return {
          time: this.value
    };
  },
  methods: {
    changeMinutes(num) {
        var min = parseInt(this.time.minutes);
      min += num;
      if (min === 60) min = 0;
      if (min === -1) min = 59;
      if (min < 10) this.time.minutes = "0" + min.toString();
      else this.time.minutes = min.toString();
    },
    changeHours(num) {
      var hr = parseInt(this.time.hours);
      hr += num;
      if (hr === 24) hr = 0;
      if (hr === -1) hr = 23;
      this.time.hours = hr.toString();
    }
  }
}

</script>

<style lang="scss" scoped>
.btn{
    border-radius: 50%;
    background-color: black;
    border: none;
    outline: none;
}
</style>
