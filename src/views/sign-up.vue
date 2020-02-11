<template>
  <section class="signup-card-wrapper">
    <form
      @submit.prevent="submitNewUser"
      class="signup-form-container flex flex-column align-center"
    >
      <h1>sign up</h1>
      <input required type="text" placeholder="Full Name..." v-model="newUser.name">
      <input required type="password" placeholder="Password..." v-model="newUser.password">
      <input required type="email" placeholder="name@email.com" v-model="newUser.email">
      <select required v-model="newUser.level" placeholder="How experienced are you?">
        <option>amateur</option>
        <option>professional</option>
      </select>

      <h4>Choose instruments you play:</h4>
      <instruments-multiple-pick v-validate="'required'" @setPickedInstruments="setPickedInstruments"></instruments-multiple-pick>
     
      <span>What genres do you like?</span>
      <el-checkbox-group class="mt-20" v-model="newUser.favGenres" size="medium">
        <el-checkbox-button v-for="genre in genres" :label="genre" :key="genre">{{genre}}</el-checkbox-button>
      </el-checkbox-group>

      <textarea v-model="newUser.bio" class="signup-bio" placeholder="tell us about yourself..."></textarea>
      <div class="signup-button-wrapper">
        <el-button round class="brand-button" native-type="submit">Save</el-button>
        <router-link to="/">
          <el-button round class="brand-button">Back</el-button>
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
import utilService from "@/service/util.service.js";
import instrumentsMultiplePick from "@/components/instruments-multiple-pick.vue";
export default {
  data() {
    return {
      newUser: {
        name: "",
        password: "",
        email: '',
        pic: '',
        instruments: [],
        level: "amateur",
        bio: "",
        favGenres: [],
        location: "",
        partEventsIds: [],
        adminEventsIds: []
      },
      genres: ['rock','classic','jazz','reggae','progressive rock','world','country']
    };
  },
  methods: {
    submitNewUser() {
      this.newUser.pic = `/img/users/${this.newUser.name}.jpg`;
      this.$store
        .dispatch({ type: "signUpUser", newUser: this.newUser })
        .then(() => {
          if (this.fromEventId) this.$router.push(`/event/${this.fromEventId}`);
          else this.$router.push("/");
        });
    },
    setPickedInstruments(instruments){
      this.newUser.instruments = instruments
    }
  },
  components: {
    instrumentsMultiplePick
  },
  created() {
    document.body.scrollIntoView({block: 'start'});

    this.fromEventId = this.$route.params.eventId;
  }
};
</script>

<style>
</style>
