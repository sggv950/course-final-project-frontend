<template>
  <div>
    <div>
      <h4>Event Location</h4>
      <label v-if="!eventsPlaces">
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click.prevent="addLocation" v-if="!this.places.length">Add</button>
        <button @click.prevent="removeLocation">Remove</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      v-if="places.length || eventsPlaces"
      :center="center"
      :zoom="zoomPlaces"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :title="m.title"
        @click="center=m.position"
      ></gmap-marker>

    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props:['eventsPlaces'],
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 32.0880445, lng: 34.8053162 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  created(){
    if(this.eventsPlaces){
      console.log(this.eventsPlaces)
      this.eventsPlaces.forEach(place => {
        const marker = {
          lat: place.gLocation.geometry.location.lat,
          lng: place.gLocation.geometry.location.lng
        };
        this.markers.push({ position: marker, title: place.title });
        this.places.push(place);
      });
    }
    console.log(this.markers)
    console.log(this.places)
  },
  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addLocation() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.$emit('addLocation', this.currentPlace)
        this.currentPlace = null;
      }
    },
    removeLocation(){
      this.markers.splice(this.markers.length -1, 1)
      this.places.splice(this.places.length -1, 1)
      this.currentPlace = null;

    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  computed: {
    zoomPlaces(){
      return this.places.length === 1 && !this.eventsPlaces ? 17 : 13;
    }
  }
};
</script>