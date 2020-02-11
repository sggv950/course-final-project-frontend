<template>
  <section class="footer">
    <router-link class="logo" to="/">
      <i class="fas fa-drum fa-lg"></i> MUSIGROUPS
    </router-link>
    <router-link class="logo" to="/about">
      <i class="fas fa-info-circle fa-lg"></i> About us
    </router-link>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.footer {
  a {
    color: darken(white, 10%);
    margin-right: 20px;
  }
  background-color: dimgray;
  padding: 70px;
  width: 100%;
}
</style>
