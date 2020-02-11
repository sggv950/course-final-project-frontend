<template>
    <ul v-if="places.length > 0">
        <li></li>
    </ul>
</template>

<script>
const axios = require('axios');



export default {
    data(){
        return {
            places: []
        }
    },
    methods: {
        getPlaces(){
            return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.089561,34.8627918&radius=10000&keyword=%D7%97%D7%93%D7%A8%D7%99+%D7%97%D7%96%D7%A8%D7%95%D7%AA&key=AIzaSyC1FhnnrcBKyOeZF9as6Qw89mBzjul9jU4')
        }
    },
}
</script>

<style>
</style>
