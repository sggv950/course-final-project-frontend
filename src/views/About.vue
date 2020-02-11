<template>
  <section class="about-cards-wrapper flex space-between">
    <h2>About Us</h2>
    <div class="about-card-container flex">
      <div class="about-card-item-container">
        <div class="about-details">
          <img class="circle-icon" :src="'/img/about/assaf-pic.jpg'">
          <h4>Assaf Segev</h4>
          <p>Fullstack web developer</p>
          <a href="https://github.com/sggv950">github profile</a>
        </div>
      </div>

      <div class="about-card-item-container">
        <div class="about-details">
          <img class="circle-icon" :src="'/img/about/noam-pic.jpg'">
          <h4>Noam Kleiner</h4>
          <p>Fullstack web developer</p>
          <a href="https://github.com/nmkleiner">github profile</a>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {};
</script>

<style scoped lang='scss'>
.about-cards-wrapper {
  margin-top: 30px;
  background-color: lighten(lightgrey, 10%);
  flex-direction: column;

  @media screen and (min-width: 768px) {
    margin-top: 30px;
    padding: 30px;
    flex-direction: column;
    align-items: flex-start;
  }
}

.about-card-container {
  background-color: white;
  padding: 10px;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 30px;
    width: 100%;
    margin-bottom: 0;
  }
  border-radius: 6px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.05);
}

.about-card-item-container {
  margin-top: 20px;
}

.about-details {
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    @media screen and (min-width: 768px) {
      width: 170px;
      height: 170px;
    }
  }
}
</style>
