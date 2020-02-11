<template>
  <section class="event-preview flex flex-column space-between">
    
    <router-link :to="'/event/' + event._id">
      <div class="pic-wrapper flex flex-column justify-center">
        <img class="main-img" :src="event.pic" alt="event image">
        <div class="circle-container">
          <div v-if="!!status" class="circle">
            <span v-if="!!status" class="status text-red center">{{status}}</span>
          </div>
        </div>

      </div>
    </router-link>

    <div class="details flex flex-column capitalize">
      <div class="details-section flex flex-column">
        <h6 class="bold">{{event.title}}</h6>
        <span>{{event.genre}} music<span v-if="!!event.level.length"> for {{event.level}}s</span> 
        </span>
        <span class="mb-5">happening on {{dateToShow}} in {{event.location.city}}.</span>
        <div class="flex-grow"></div>
        <div class="flex players-wrapper justify-between">
          <div v-for="player in playersToShow" :key="player._id">
            <router-link v-if="player" :to="'/user/' + player._id">
              <img class="circle-icon" :title="player.name" :src="player.pic">
            </router-link>
          </div>
        </div>
      </div>

      <div class="details-section flex flex-column justify-center ">
        <required-instruments :preview="true" :instruments="event.instruments"></required-instruments>
      </div>
      
    </div>
  </section>
</template>

<script>
import userService from "@/service/user.service.js";
import playersInstruments from '@/components/players-instruments.vue'
import requiredInstruments from '@/components/required-instruments.vue'
import moment from "moment"

export default {
  components: {
    playersInstruments,
    requiredInstruments
  },
  props: {
    event: Object
  },
  data() {
    return {
      players: [],
    };
  },
  created() {
    // get players
    this.event.instruments.forEach(instrument => {
          return instrument.playerIds.forEach(playerId => {
            if(!playerId) return;
            this.$store.dispatch({type: 'getUserById', userId: playerId})
              .then(player => {
                this.players.push(player)
        })
      })  
    })
  },
  computed: {
    status() {
      const isFull = !this.event.instruments.find(instrument => !instrument.playerIds.length)
      return (isFull)? 'Full' : false;
    },
    playersToShow() {
      return this.players.slice(0, 5);
    },
    dateToShow() {
      return moment(this.event.timestamp).format('DD/MM')
    }
  },
};
</script>

<style>
</style>
