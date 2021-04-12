<template>
  <div class="home">
    <h1>New Gifs</h1>
    <div v-for='gif in gifsData' :gif='gif' :key='gif.id'>
        <router-link :to="'/gif/' + gif.id" >
        <GifBody :source=gif.source :title=gif.title :author=gif.author />

        </router-link>
                
    </div>
    
    
  </div>
</template>

<style lang="scss">
  
a {
  text-decoration: none;
  color: #42b983;
}

h4 {
  color: #2c3e50;
}

</style>

<script>
import GifBody from '../components/Gif.vue'
import gifsData from '@/data/gifs'

export default {
  name: 'Home',
  components: {GifBody},
  data() {
    return {
      gifsData
    }
  }
}
</script>


