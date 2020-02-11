<template>
  <section class="user-profile-cards-wrapper flex">
    <section class="user-profile-card-container flex">
      <div class="user-profile-card">
        <div class="user-details-headline flex wrap align-center">
          <img class="user-pic" :src="user.pic">
          <h2>{{user.name}}</h2>
        </div>
      </div>
      <div class="user-profile-card">
        <h4>Level:</h4>
        <p>{{user.level}}</p>
      </div>

      <div class="user-profile-card">
        <h4>Instruments:</h4>
        <show-instruments-comp :instruments="user.instruments" class="instrument-comp"></show-instruments-comp>
      </div>
      <div class="user-profile-card">
        <h4>Preferred genres:</h4>
        <div v-for="genre in user.favGenres" :key="genre">
          <p>{{genre}}</p>
        </div>
      </div>
    </section>

    <section v-if="user.bio" class="user-profile-card-container">
      <h4>Bio:</h4>
      <p>{{user.bio}}</p>
    </section>

    <modal-comp v-if="userAdminEventsModal || userPartEventsModal" @close="closeModal">
      <gmap-map v-if="userAdminEventsModal" :eventsPlaces="userAdminEvents"></gmap-map>
      <gmap-map v-if="userPartEventsModal" :eventsPlaces="userPartEvents"></gmap-map>
    </modal-comp>

    <section v-if="userAdminEvents.length" class="user-profile-card-container">
      <section class="carousel-section progressive-rock-events">
       <button @click="showModal('admin')"> <i class="fas fa-map-marked-alt"></i></button>
        <h3 class="capitalize">Events {{user.name}} created:</h3>
        <event-carousel :events="userAdminEvents"/>
      </section>
    </section>

    <section v-if="userPartEvents.length" class="user-profile-card-container">
      <section class="carousel-section progressive-rock-events">
        <h3 class="capitalize">Events {{user.name}} joined:</h3>
        <event-carousel :events="userPartEvents"/>
        <button @click="showModal('part')"><i class="fas fa-map-marked-alt"></i></button>
      </section>
    </section>
  </section>
</template>

<script>
import eventCarousel from "@/components/event-carousel.vue";
import showInstrumentsComp from "@/components/show-instruments-comp.vue";
import modalComp from "@/components/modal-comp.vue";
import gmapMap from "@/components/gmap-map.vue";

export default {
  components: {
    eventCarousel,
    showInstrumentsComp,
    modalComp,
    gmapMap
  },
  data() {
    return {
      userAdminEvents: [],
      userPartEvents: [],
      user: { bio: "" },
      userAdminEventsModal: false,
      userPartEventsModal: false
    };
  },
  methods: {
    showModal(type) {
      if(type === 'admin') this.userAdminEventsModal = !this.userAdminEventsModal;
      if(type === 'part') this.userPartEventsModal = !this.userPartEventsModal;
    },
    closeModal(){
      this.userAdminEventsModal = false;
      this.userPartEventsModal = false;
    }
  },
  computed: {
    isLoggedInUser() {
      return this.$store.getters.isLoggedInUser;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    document.body.scrollIntoView({block: 'start'});
    const userId = this.$route.params.userId;

    this.$store
      .dispatch({ type: "getUserById", userId })
      .then(user => {
        return (this.user = user);
      })
      .then(() => {
        this.user.adminEventsIds.forEach(eventId => {
          this.$store
            .dispatch({ type: "getEventById", eventId })
            .then(event => {
              this.userAdminEvents.push(event);
            });
        });
        this.user.partEventsIds.forEach(eventId => {
          this.$store
            .dispatch({ type: "getEventById", eventId })
            .then(event => {
              this.userPartEvents.push(event);
            });
        });
      });
  }
};
</script >
<style scoped lang="scss">
.user-profile-cards-wrapper {
  background-color: lighten(lightgray, 10%);
  flex-direction: column;
  margin-top: 50px;
  min-height: 480px;

  @media screen and (min-width: 768px) {
    padding: 30px;
    flex-direction: column;
  }
}

.user-profile-card-container {
  background-color: white;
  padding: 30px;
  margin-bottom: 0px;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    width: 100%;
    margin-bottom: 30px;
  }
  border: 1px solid darken(lightgray, 5%);
  border-radius: 6px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.05);
}

.user-profile {
  margin-top: 55px;
  .main-container {
    padding: 20px;
    padding-left: 10vw;
  }
  .user-icon {
    border-radius: 50%;
  }
}
.user-details-headline {
  margin: 20px 10px;
}
.user-pic {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin-right: 15px;
}

.instrument-comp {
  border: 0px;
}
</style>
