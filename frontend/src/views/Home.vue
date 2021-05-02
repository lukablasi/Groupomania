<template>
  <div class="home">
    <h1>New Gifs</h1>
    <div v-for='gif in gifsData.slice().reverse()' :gif='gif' :key='gif.id'>
        <router-link :to="'/gif/' + gif.gif_id" >
        <GifBody :source=gif.source :title=gif.title :author=gif.author />

        </router-link>
                
    </div>
    
    
  </div>
</template>

<style lang="scss" scoped>
  
a {
  text-decoration: none;
  color: #42b983;
}

h4 {
  color: #2c3e50;
}

.home {
  background-color: rgba(199, 250, 192, 0.473);
}

</style>

<script>
import GifBody from '../components/Gif.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {GifBody},
  data() {
    return {
      gifsData: [],
    }
  },
  methods: {
    async getGifs () {
      axios.get('http://localhost:5000/api/gifs').then((response) => {
        this.gifsData = response.data;
      }, (error) => {
        console.log(error);
      })
    },
  },
  beforeMount() {
    this.getGifs()
  },
}
</script>


