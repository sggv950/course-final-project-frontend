<template>
    <div class="nav-bar flex space-between">
        <router-link class="logo" to="/"><img src="/img/events/weblogo.png"> MUSIGROUPS</router-link>
        <div class="links">
          <el-button round @click="goEdit" v-if="isLoggedInUser" to="/event/edit">
            Create <i class="fas fa-plus"></i>
          </el-button>
          <img v-if="loggedInUser" @click="goProfile" class="circle-icon-sm" :src="loggedInUser.pic"/>
          <router-link class="" v-if="isLoggedInUser" :to="'/user/' + loggedInUser._id">
            Profile
          </router-link>
          <a v-if="isLoggedInUser" @click="logout">Logout</a>
          <router-link v-else to="/login">Login</router-link>
        </div>

        <a @click="setIsOpen" class="icon" :class="{'open': isOpen, 'guest': !isLoggedInUser}">
          <i class="fa fa-bars"></i>
        </a>

        <aside class="flex flex-column" :class="{'open': isOpen, 'guest': !isLoggedInUser}">
          <a v-if="isLoggedInUser" @click="logout">Logout</a>
          
          <div class="flex align-center profile-wrapper" v-if="isLoggedInUser">
            <img @click="goProfile" class="circle-icon-sm" :src="loggedInUser.pic"/>
            <a @click="goProfile">
              Profile
            </a>
          </div>

          <a v-else @click="goLogin">Login</a>
          <el-button round @click="goEdit" v-if="isLoggedInUser" to="/event/edit">
            Create <i class="fas fa-plus"></i>
          </el-button>
        </aside>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isOpen: false
        }
    },
    methods: {
        goProfile() {
          this.isOpen = false
          this.$router.push(`/user/${this.loggedInUser._id}`)
        },
        setIsOpen(){
          return this.isOpen = !this.isOpen;
        },
        logout() {
          this.isOpen = false
          this.$store.dispatch({type: 'logout'})
          .then(() => {this.$router.push('/')})
        },
        goEdit() {
          this.isOpen = false
          this.$router.push('/event/edit')
        },
        goLogin() {
          this.isOpen = false
          this.$router.push('/login')
        }
    },
    computed: {
      isLoggedInUser() {
        return this.$store.getters.isLoggedInUser
      },
      loggedInUser() {
        return this.$store.getters.loggedInUser
      }
    }
};
</script>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    img {
      height: 30px;
      display: inline-block;
    }
  }
</style>
