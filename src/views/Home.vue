<template>
  <div class="home">
    <header>
      <replacing-images></replacing-images>
      <div class="welcome-text flex flex-column">
        <div class="welcome-headline flex flex-column align-center justify-center">
            <h2 class="white-text">Discover, join, play!</h2>
            <h4 class="white-text">Your favorite music with new people.</h4>
        </div>
      </div>
    </header>

    <div v-if="loggedInUser" class="carousels-container loggedIn">
      <template v-for="genre in loggedInUser.favGenres">
        <section
          v-if="genreEvents(genre).length"
          class="carousel-section favourite-genre"
          :key="genre"
        >
          <h2 class="capitalize">{{genre}} music sessions:</h2>
          <event-carousel :events="genreEvents(genre)"/>
          <a @click="goList(genre.toLowerCase())">Show All {{genre}} sessions</a>
        </section>
      </template>

      <template v-for="instrument in loggedInUser.instruments">
        <section
          v-if="instrumentEvents(instrument).length"
          class="carousel-section favourite-genre"
          :key="instrument"
        >
          <h2 class="capitalize">Sessions that need a {{instrument}} player:</h2>
          <event-carousel :events="instrumentEvents(instrument)"/>
          <a @click="goList('',instrument.toLowerCase())">Show All {{instrument}} Events</a>
        </section>
      </template>
    </div>

    <div class="carousels-container">
      <section class="carousel-section close-distance-events">
        <h2 class="capitalize">Jam sessions in your area:</h2>
        <event-carousel :events="closeEvents"/>
        <a class @click="goList('','','location')">Show All sessions</a>
      </section>

      <section class="carousel-section close-distance-events">
        <h2 class="capitalize">sessions happening this week:</h2>
        <event-carousel :events="thisWeekEvents"/>
      </section>

      <section class="carousel-section rock-events">
        <h2 class="capitalize">Rock sessions:</h2>
        <event-carousel :events="genreEvents('rock')"/>
        <a @click="goList('rock')">Show All Rock sessions</a>
      </section>

      <section v-if="waitingEvents.length" class="carousel-section just-opened-events">
        <h2 class="capitalize">Just Opened!</h2>
        <event-carousel :events="waitingEvents"/>
        <a @click="goList('','','','','Waiting for players')">Show All Recent sessions</a>
      </section>

      <section v-if="almostFullEvents.length" class="carousel-section almost-full-events">
        <h2 class="capitalize">Almost full grab your place!</h2>
        <event-carousel :events="almostFullEvents"/>
        <a @click="goList('','','','','almost full')">Show All sessions</a>
      </section>

      <section class="carousel-section reggae-events">
        <h2 class="capitalize">Reggae sessions:</h2>
        <event-carousel :events="genreEvents('reggae')"/>
        <a @click="goList('reggae')">Show All Reggae sessions</a>
      </section>

      <section class="carousel-section world-music-events">
        <h2 class="capitalize">World Music sessions:</h2>
        <event-carousel :events="genreEvents('world')"/>
        <a @click="goList('world')">Show All World Music sessions</a>
      </section>

      <section
        v-if="genreEvents('progressive rock').length"
        class="carousel-section progressive-rock-events"
      >
        <h2 class="capitalize">Progressive Rock sessions:</h2>
        <event-carousel :events="genreEvents('progressive rock')"/>
        <a @click="goList('progressive rock')">Show All Progressive Rock sessions</a>
      </section>
    </div>
  </div>
</template>

<script>
import eventList from "@/components/event-list.vue";
import eventPreview from "@/components/event-preview.vue";
import eventCarousel from "@/components/event-carousel.vue";
import replacingImages from "@/components/replacing-images.vue";
import bus, { FILTER } from "@/bus.js";
export default {
  name: "home",
  components: {
    eventList,
    eventPreview,
    eventCarousel,
    replacingImages
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    closeEvents() {
      return this.events.filter(
        event =>
          event.location.city === "tel aviv" ||
          event.location.city === "ramat gan"
      );
    },
    thisWeekEvents() {
      return this.events.filter(
        event =>
          event.timestamp > Date.now() &&
          event.timestamp < Date.now() + 1000 * 3600 * 24 * 7
      );
    },
    waitingEvents() {
      return this.events.filter(
        event => event.status === "Waiting for players"
      );
    },
    almostFullEvents() {
      return this.events.filter(
        event => event.status === "Almost full" || event.status === "Kinda full"
      );
    },

    guitarEventsToShow() {
      if (this.guitarEvents.length > 6) {
        return this.guitarEvents.slice(0, 6);
      }
    },
    isLoggedInUser() {
      return this.$store.getters.isLoggedInUser;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    genreEvents(genre) {
      return this.events.filter(
        event => event.genre.toLowerCase() === genre.toLowerCase()
      );
    },
    instrumentEvents(userInstrument) {
      return this.events.filter(event =>
        event.instruments.find(
          instrument => instrument.name === userInstrument.toLowerCase()
        )
      );
    },
    goList(genre, instrument, location, recent, status) {
      this.$router.push("/event");
      setTimeout(() => {
        if (genre) bus.$emit(FILTER, { genre });
        if (instrument) bus.$emit(FILTER, { instrument });
        if (location) bus.$emit(FILTER, { location });
        if (recent) bus.$emit(FILTER, { recent });
        if (status === "Almost full") bus.$emit(FILTER, { status });
        if (status === "Waiting for players") bus.$emit(FILTER, { status });
      }, 50);
    }
  },
  created() {
    document.body.scrollIntoView();
    this.$store.dispatch({ type: "loadEvents" });
  }
};
</script>

<style scoped lang='scss'>
.white-text {
    font-weight: 900;
}

.visit-direction {
  h4 {
    font-size: 10px;
    margin: 10px 20px 0px 20px;
    border: 2px solid darken(white, 5%);
    padding: 10px;
  }
  @media screen and (min-width: 500px) {
    text-align: center;
    margin: 60px 20px 0px 20px;
    padding: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

