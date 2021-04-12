<template>
  <div class="single-gif">
    
    <h2>{{ gif.title }}</h2>
    <img :src=gif.source>
    
  </div>
</template>

<script>
import gifsData from '@/data/gifs'

export default {
  name: 'SingleGif',
  data() {
    return {
      gifsData
    }
  },
  created() {
    const ID = Number(this.$route.params.id);
    console.log(ID)
    const gif = this.gifs.find(gif => gif.id === ID);
    this.gif = gif;
  }
}
</script>
