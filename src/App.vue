<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>  
    <msg-msg></msg-msg>
    <footer-comp></footer-comp>
  </div>
</template>

<script>

import navBar from '@/components/nav-bar.vue'
import msgMsg from '@/components/msg-msg.vue'
import footerComp from '@/components/footer-comp.vue'
export default {
  components: {
    navBar,
    msgMsg,
    footerComp
  },
  created() {
    this.$store.dispatch('getLoggedInUser')    
  },
}
</script>

<style lang="scss">
</style>
