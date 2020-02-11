<template>
  <div class="event-filter flex align-center">
    <div @click="openFilter" class="toggle-filter white-text">
      <i class="fas fa-filter"></i>
    </div>
    <aside :class="{'open': isOpen}">
    <el-input prefix-icon="el-icon-search" class="el-input" @input="setFilter" v-model="filter.byName" :placeholder="'search'"></el-input>
      <el-select class="el-select" v-model="filter.byGenre" @change="setFilter" :placeholder="'genre'">
        <el-option
          v-for="item in genres"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>    
      <el-select class="el-select" v-model="filter.byInstrument" @change="setFilter" :placeholder="'instrument'">
        <el-option
          v-for="item in instruments"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>    
      <el-button class="brand-button" round @click="setSorter('timestamp')"><i class="fas fa-sort"></i>{{'Sort by date'}}</el-button>
      <el-button class="brand-button" round @click="setSorter('allowedMembersCount')"><i class="fas fa-sort"></i>{{'Sort by participants'}}</el-button>
    </aside>
  </div>
</template>

<script>
import bus, {FILTER} from "@/bus.js"

export default {
  created() {
    bus.$on(FILTER, (object) => {
      if (object.genre) this.filter.byGenre = object.genre
      if (object.instrument) this.filter.byInstrument = object.instrument
      if (object.location) this.filter.byLocation = object.location
      if (object.recent) this.filter.byRecent = object.recent
      if (object.status === 'Almost full') this.filter.byStatus = 'Almost full'
      if (object.status === 'Waiting for players') this.filter.byStatus = 'Waiting for players'
      this.setFilter()

    })
  },
  data() {
    return {
      isOpen: false,
      filter: {
        byName: '',
        byInstrument: '',
        byGenre: 'All genres',
        byLocation: '',
        byStatus: '',
        byRecent: ''
      },
      sort: {
        sorter: '',
        order: -1
      },
      selected: 'All Categories',
      genres: [
        { label: 'rock', value: 'rock'},
        { label: 'jazz', value: 'jazz'},
        { label: 'reggae', value: 'reggae'},
        { label: 'country', value: 'country'},
        { label: 'world', value: 'world'},
        { label: 'All genres', value: 'All genres'}
      ],
      instruments: [
          { label: 'guitar', value: 'guitar'},
          { label: 'acoustic guitar', value: 'acoustic-guitar'},
          { label: 'bass', value: 'bass-guitar'},
          { label: 'drums', value: 'drums'},
          { label: 'flute', value: 'flute'},
          { label: 'clarinet', value: 'clarinet'},
          { label: 'piano', value: 'piano'},
          { label: 'trumpet', value: 'trumpet'},
          { label: 'french horn', value: 'french-horn'},
          { label: 'tuba', value: 'tuba'},
          { label: 'synthesizer', value: 'synthesizer'},
          { label: 'violin', value: 'violin'},
          { label: 'saxophone', value: 'saxophone'},
          { label: 'dj', value: 'dj'},
          { label: 'All instruments', value: 'All instruments'},
        ]
    }
  },
  methods: {
    setFilter() {
      this.$emit('filter-set',this.filter,this.sort)
    },
    setSorter(sorter) {
      this.sort.sorter = sorter
      this.sort.order *= -1
      this.$emit('filter-set',this.filter,this.sort)
    },
    openFilter() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .event-filter {
    width: 100%;
    background-color: black;
    padding: 20px;
    position: fixed;
    top: 49px;
    z-index: 1;
    @media (min-width: 768px) {
      margin-top: 49px; 
      position: static;
    }
    aside{
      @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: static;
        height: fit-content;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      background-color: black;
      padding: 0 20px;
      height: calc(100vh - 122px);
      top: 122px;
      left: -100px;
      transition: .6s linear;
      z-index: 1;
      &.open{
        transform: translateX(90px);
      .el-input, .el-select,.el-button {
        display: block;
        margin: 0 0 10px 0; 
        width: 100%;
        }
      }
    }
    .toggle-filter{
      display: block;
      cursor: pointer;
      border: 1px solid white;
      width: fit-content;
      padding: 5px;
      @media (min-width: 768px) {
        display: none;
      }
    }
    .el-input, .el-select,.el-button {
      @media (min-width: 768px) {
        max-width: 200px;
        margin: 0 10px 10px 0; 
        display: block;
      }
      display: none;
    }

    &.open{
    .el-input, .el-select,.el-button {
      display: block;
      }
    }
  }
</style>
