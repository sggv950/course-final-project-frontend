<template>
  <section class="edit-event capitalize">
    <form @submit.prevent="onSubmit" class="edit-event-wrapper flex space-between">
      <div class="edit-event-container">
        <div class="edit-event-user-container">
          <h4>{{loggedInUser.name}}</h4>
          <img class="circle-icon" :src="loggedInUser.pic" alt="event admin">
        </div>
        <h4>Session Title</h4>
        <el-input required type="text" id="title" v-model="event.title" placeholder="Event Title"></el-input>
        <h4>select genre</h4>
        <el-select required class="el-select" v-model="event.genre" placeholder="select genre">
          <el-option value="rock">Rock</el-option>
          <el-option value="country">Country</el-option>
          <el-option value="jazz">Jazz</el-option>
          <el-option value="classic">Classic</el-option>
          <el-option value="world">World</el-option>
          <el-option value="reggae">Reggae</el-option>
          <el-option value="Progressive rock">Progressive Rock</el-option>
          <el-option value="personal">Personal Material</el-option>
        </el-select>
        <h4>select level</h4>
        <el-select required class="el-select" v-model="event.level" placeholder="level">
          <el-option value="pro">Professional</el-option>
          <el-option value="amateur">Amateur</el-option>
        </el-select>
        <h4>Session Description</h4>
        <textarea v-model="event.desc" placeholder="Event Description"/>

        <h4>Choose instruments</h4>
        <instruments-multiple-pick v-if="event && pickedInstruments.length || !event._id" @setPickedInstruments="setPickedInstruments" :currInstruments="pickedInstruments"></instruments-multiple-pick>
      </div>

      <div class="edit-event-container">
        <h4>Session date</h4>
        <el-input required type="date" v-model="time.day"></el-input>
        <div>
          <h4>hour</h4>
          <vue-timepicker required v-model="time.hour" :minute-interval="15" format="HH:mm"></vue-timepicker>
        </div>
        <h4>cost</h4>
        <el-input type="number" min="0" v-model="event.cost" placeholder="cost"></el-input>
        <div class="img-n-address-container">
          <div class="address-container">
            <h4>city</h4>
            <el-input required v-model="event.location.city" placeholder="city"></el-input>
            <h4>street</h4>
            <el-input required v-model="event.location.address" placeholder="street & number"></el-input>
          </div>
          <gmap-map @addLocation='addGlocation'></gmap-map>
        </div>

        <div class="btns-wrapper">
          <el-button class="brand-button" round v-if="!isUpdateEvent" native-type="submit">Save Session</el-button>
          <el-button class="brand-button" round v-else native-type="submit">Update Session</el-button>
          <router-link to="/">
            <el-button round>Cancel</el-button>
          </router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import eventService from "@/service/event.service.js";
import instrumentList from "@/components/instrument-list.vue";
import instrumentsMultiplePick from "@/components/instruments-multiple-pick.vue";
import gmapMap from '@/components/gmap-map.vue'
import VueTimepicker from "vue2-timepicker";
import moment from "moment"
export default {
  name: "edit-event",
  data() {
    return {
      event: {
        adminId: "",
        location: { address: "", city: "" },
        gLocation: null,
        timestamp: null,
        title: "",
        desc: "",
        genre: "",
        level: "",
        pic: "",
        instruments: [],
        allowedMembersCount: 0,
        joinedMembersCount: 0,
        cost: 0,
        msgs: []
      },
      time: {
          day: "",
           hour: {
              HH: "19",
              mm: "00",
         }
      },
      pickedInstruments: []
    };
  },
  components: {
    instrumentsMultiplePick,
    instrumentList,
    VueTimepicker,
    gmapMap
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isLoggedInUser() {
      return this.$store.getters.isLoggedInUser;
    },
    isUpdateEvent() {
      return !!this.$route.params.eventId;
    }
  },
  methods: {
    addGlocation(location){
      this.event.gLocation = location;
      console.log('from edit', this.event.gLocation)
    },
    onSubmit(){
      if (this.isUpdateEvent) this.updateEvent()
      else this.saveNewEvent()
    },
    fillEventObject() {
      this.event.timestamp = new Date(`${this.time.day} ${this.time.hour.HH}:${this.time.hour.mm}`).getTime();
    },
    saveNewEvent() {
      this.pickedInstruments.forEach(instrument => {
        this.addInstrument(instrument)
      });
      this.fillEventObject();
      this.$store
        .dispatch({ type: "saveNewEvent", event: this.event })
        .then(eventId => {
          this.$store.dispatch({ type: "updateUserAdminEvents", eventId });
          this.$router.push(`/`);
        });
    },
    updateEvent() {
      this.pickedInstruments.forEach(instrument => {
        this.addInstrument(instrument)
      });
      this.fillEventObject();
      this.$store
        .dispatch({ type: "updateEvent", event: this.event })
        .then(eventId => {
          this.$router.push(`/`);
        });
    },
    setPickedInstruments(instruments){
      this.pickedInstruments = instruments
    },
    addInstrument(addedInstrument) {
      this.allowedMembersCount++
      const existObj = this.event.instruments.find(
        instrument => instrument.name === addedInstrument
      );
      const instObj = { name: addedInstrument, amount: 1, playerIds: [] };

      if (existObj) existObj.amount++;
      else this.event.instruments.push(instObj);
    },
    getTime(timestamp) {
      this.time.day = moment(timestamp).format('DD-MM-YYYY')
      this.time.hour.HH = moment(timestamp).format('HH')
      this.time.hour.mm = moment(timestamp).format('mm')
    }
  },
  created() {
    if (!this.isLoggedInUser) this.$router.push("/");
    document.body.scrollIntoView({block: 'start'});


    this.event.adminId = this.loggedInUser._id
    this.event.adminName = this.loggedInUser.name;
    const eventId = this.$route.params.eventId;
    if (eventId) {
      this.$store.dispatch({ type: "getEventById", eventId }).then(event => {
        this.event = event;
        this.getTime(this.event.timestamp)
        var temp = this.event.instruments.map(instrumentObj => {
          return instrumentObj.instrument
        })
        this.pickedInstruments = temp;
        this.event.pic = eventService.getImage();
      });
    }
    this.event.pic = eventService.getImage();
  }
};
</script>

<style>
</style>
