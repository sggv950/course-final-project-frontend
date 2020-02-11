<template>
  <section class="replacing-images">
        <img v-for="i in 4" 
        :src="'/img/previews/' + i + '.jpg'" 
        :key="i" 
        :class="{'shown': chosenPic === i, 'hidden': chosenPic !== i }"/>
        <!-- <img
        :src="/img/previews/1.jpg"
        :class="{'shown': chosenPic === 1, 'hidden': chosenPic !== 1 }"
        >
        <img
        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96b6eb1c3bac5a2a548d7f90020bef2f&auto=format&fit=crop&w=768&q=60"
        :class="{'shown': chosenPic === 2, 'hidden': chosenPic !== 2 }"
        >
        <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9f0fdc18a215ec725f8ca61dc6fcbdf&auto=format&fit=crop&w=768&q=60"
        :class="{'shown': chosenPic === 3, 'hidden': chosenPic !== 3 }"
        >
        <img
        src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2e3abeff94d9a95db8c3b25e84f3718&auto=format&fit=crop&w=768&q=60"
        :class="{'shown': chosenPic === 4, 'hidden': chosenPic !== 4 }"
        > -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      chosenPic: 1,
      interval: "",
    };
  },
  created() {
    this.interval = setInterval(() => {
      if (this.chosenPic === 4) this.chosenPic = 0;
      this.chosenPic++;
    }, 5000);
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">

.replacing-images {
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    transition: 2s;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .shown {
    opacity: 1;
    visibility: visible;
  }
  .hidden {
      opacity: 0;
      visibility: hidden;
  }
}
</style>
