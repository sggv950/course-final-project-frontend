<template>
  <section v-if="event" class="cards-wrapper flex space-between capitalize">
    <div class="card-container">
      <h1>{{event.title}}</h1>

      <div class="flex wrap align-center">
        <img class="circle-icon mb-10" :src="event.admin[0].pic " alt="event admin" :title="event.admin[0].name">
        <h4 class="card-organizer-name px-10 capitalize">{{event.admin[0].name}}&nbsp;</h4>

        <template v-if="isLoggedInUserAdmin">
          <el-button @click="goEdit" type="success" round>
            <i class="fas fa-edit"></i> Edit Event
          </el-button>
          <el-button type="danger" @click="removeEvent" round>
            <i class="fas fa-trash-alt"></i> Cancel Event
          </el-button>
        </template>
      </div>

      <div class="card-item-container">
        <h4>
          <span>Genre: {{event.genre}}</span>
          <span>&nbsp;Level: {{event.level}}</span>
        </h4>
      </div>

      <div class="card-item-container">
        <p class="card-description">{{event.desc}}</p>
        <div class="event-details">
          <span class="capitalize">{{event.location.address}}, {{event.location.city}}</span>
          <span class="capitalize">{{dateToShow}}</span>
          <span v-if="event.cost">cost: {{event.cost}}$</span>
          <span v-else>cost: free</span>
        </div>
        <h4>Map</h4>

        <GmapMap
          v-if="center"
          ref="mapRef"
          class="static map"
          :zoom="18"
          :center="center"
          map-type-id="roadmap"
          style="height: 300px"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </div>
    </div>
    <div class="card-container">
      <el-button
        @click="loginToJoin"
        v-if="!loggedInUser"
        class="static join-button"
        type="info"
        round
      >Login to join</el-button>

      <el-button
        v-if="loggedInUser && requiredInstrumentsToShow.length === 0"
        class="static join-button"
        type="danger"
        round
      >Event is full</el-button>

      <el-button
        v-if="loggedInUser && participatingUser"
        class="static join-button"
        type="info"
        round
      >Already Joined</el-button>

      <el-button
        @click="toggleJoin"
        v-if="requiredInstrumentsToShow.length > 0 && loggedInUser && !isLoggedInUserAdmin && !isJoining && !participatingUser"
        class="static join-button brand-button"
        round
      >Join the event</el-button>

      <el-button
        @click="toggleJoin"
        v-if="loggedInUser && !isLoggedInUserAdmin && isJoining"
        class="static join-button"
        type="warning"
        round
      >Cancel</el-button>

      <transition name="fade">
        <pick-instruments-comp
          :instruments="requiredInstrumentsToShow"
          v-if="isJoining && requiredInstrumentsToShow.length > 0"
          @selectedInstrument="joinTheEvent"
        ></pick-instruments-comp>
      </transition>
      <el-button type="danger" round v-if="isLoggedInUserAdmin">Remove participant</el-button>
      <h4 v-if="!!event.players">attending:</h4>
      <players-instruments :event="event" :players="event.players"></players-instruments>
      <!-- <h4>{{event.joinedMembersCount}}/{{event.instruments.length}} participants</h4> -->
      <h4>Instruments:</h4>
      <required-instruments
        :preview="false"
        :instruments="event.instruments"
        @setRequiredInstrumentsToShow="setrequiredInstrumentsToShow"
      ></required-instruments>

      <h4>Chat</h4>
      <feed-comp :currEvent="event" @pushMsgToHistory="pushMsgToHistory"></feed-comp>
    </div>
  </section>
</template>

<script>
const axios = require("axios");
import moment from "moment";
import userService from "@/service/user.service.js";
import gmapMap from "@/components/gmap-map.vue";
import feedComp from "@/components/feed-comp.vue";
import pickInstrumentsComp from "@/components/pick-instruments-comp.vue";
import playersInstruments from "@/components/players-instruments.vue";
import requiredInstruments from "@/components/required-instruments.vue";
import ioClient from "socket.io-client";
import msgService from "@/service/msg.service.js";
export default {
  components: {
    gmapMap,
    feedComp,
    pickInstrumentsComp,
    playersInstruments,
    requiredInstruments
  },
  data() {
    return {
      event: null,
      // players: [],
      // admin: {},
      isLoggedInUserAdmin: false,
      isJoining: false,
      markers: [],
      center: null,
      requiredInstrumentsToShow: []
    };
  },
  methods: {
    setrequiredInstrumentsToShow(instruments) {
      this.requiredInstrumentsToShow = instruments;
    },
    pushMsgToHistory(msg) {
      this.$store.dispatch({ type: "pushMsgToHistory", msg });
    },
    // addPlayer() {
    //   this.event.players.push(this.loggedInUser);
    // },
    joinAs(joinedInstrument = null) {
      const instrumentObject = this.event.instruments.find(
        instrument => instrument.name === joinedInstrument
      );
      if (instrumentObject.playersIds.length < instrumentObject.amount) {
        instrumentObject.playersIds.push(this.loggedInUser._id);
      }
    },
    send(instrument) {
      const joinedMsg = {
        msg: {
          txt: `${
            this.loggedInUser.name
          } joined the session as ${instrument} player!`,
          from: this.loggedInUser.name
        },
        room: this.event._id
      };
      this.$socket.emit("assignMsg", joinedMsg);
      this.pushMsgToHistory(joinedMsg.msg);
    },
    joinTheEvent(instrument) {
      this.isJoining = false;
      var joinedEvent = {
        instrument,
        eventId: this.$route.params.eventId
      };
      this.send(instrument);
      this.$store
        .dispatch({ type: "updateUserPartEvents", joinedEvent })
        .then(() => {
          this.$store.dispatch({ type: "joinEvent", joinedEvent }).then(() => {
            this.$store
              .dispatch({ type: "getEventById", eventId: this.event._id })
              .then(event => {
                this.event = event;
                document.body
                  .querySelector(".footer")
                  .scrollIntoView({ block: "end", behavior: "smooth" });
              });
          });
        });
    },
    goEdit() {
      const eventId = this.event._id;
      this.$router.push(`/event/edit/${eventId}`);
    },
    removeEvent() {
      const eventId = this.event._id;
      this.$store.dispatch({ type: "removeEvent", eventId }).then(() => {
        this.$router.push("/");
      });
    },
    getCoorFromAddress(gLocation) {
      const marker = {
          lat: gLocation.geometry.location.lat,
          lng: gLocation.geometry.location.lng
        };
        this.center = marker
        this.markers.push({ position: marker });
    },
    toggleJoin() {
      this.isJoining = !this.isJoining;
    },
    loginToJoin() {
      const eventId = this.event._id;
      this.$router.push(`/login/${eventId}`);
    },
    async getEvent(eventId) {
      this.event = await this.$store.dispatch({ type: "getEventById", eventId })
      this.getCoorFromAddress(this.event.gLocation);
      return Promise.resolve()
    },
    // getPlayers() {
    //   this.event.instruments.forEach(instrument => {
    //     return instrument.playerIds.forEach(playerId => {
    //       if (!playerId) return;
    //       this.$store
    //         .dispatch({ type: "getUserById", userId: playerId })
    //         .then(player => {
    //           this.players.push(player);
    //         });
    //     });
    //   });
    // }
  },
  computed: {
    participatingUser(){
      if (!this.event.players) return
      return this.event.players.find(player => {
        return player._id === this.loggedInUser._id;
      });
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    dateToShow() {
      return moment(this.event.timestamp).format("DD/MM HH:mm");
    }
  },
    async created() {
    document.body.scrollIntoView({block: 'start'});
    const eventId = this.$route.params.eventId;
    await this.getEvent(eventId)
    // this.getPlayers()
    if (this.event.adminId === this.loggedInUser._id) {
    this.isLoggedInUserAdmin = true;
    }
  }
};
</script>

<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.disabled {
  background-color: white;
  color: lightgray;
  border: 1px solid black;
}
.join-button {
  font-size: 1.2rem;
  margin: 20px 0px;
  width: 100%;
  top: 0;
  position: sticky;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    margin: 20px 0px;
    width: 100%;
  }
}
</style>