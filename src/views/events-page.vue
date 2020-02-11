<template>
    <section class='events-page'>
        <h1>{{headline}}</h1>
        <filter-events @filter-set="setFilter"></filter-events>
        <event-list :events='events'></event-list>
    </section>
</template>

<script>
import filterEvents from '@/components/filter-events';
import eventList from '@/components/event-list';
export default {
    name: 'events-page',
    components: {
        filterEvents,
        eventList
    },
    props: {
        headline: String,
    },
    data() {
        return {

        }
    },
    methods: {
    setFilter (filter,sort) {
      this.$store.dispatch({type: 'filter', filter, sort})
    }

    },
    computed: {
        events() {
            return this.$store.getters.events
        }
    },
    watch: {

    },
    created() {
        document.body.scrollIntoView({block: 'start'})
        this.$store.dispatch('loadEvents')

    }
}
</script>

<style>
.events-page{
    min-height: 65vh;
}
</style>
