<template>
  <div class="home">
    <h1>New Gifs</h1>
    <div v-for='gif in gifs' :gif='gif' :key='gif.id'>
        <router-link :to="'/gif/' + gif.id" >
        <GifBody :source=gif.source :title=gif.title />

        </router-link>
    </div>
    
    
  </div>
</template>

<style lang="scss">
  
</style>

<script>
import GifBody from '../components/Gif.vue'

export default {
  name: 'Home',
  components: {GifBody},
  data() {
    return {
      gif: {},
      gifs: [
        {
          id: 1,
          title: 'A dog',
          source: require('../gifs/first.gif')
        },
        {
          id: 2,
          title: 'A cat',
          source: require('../gifs/cat.gif')
        }
      ]
    }
  }
}
</script>


