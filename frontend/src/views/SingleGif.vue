<template>
  <div class="single-gif">
    
    <h2>{{ gif.title }}</h2>
    <img :src=gif.source>
  </div>
</template>

<script>


export default {
  name: 'SingleGif',
  data() {
    return {
      
      gifs: [
        {
          id: 1,
          title: 'A dog',
          source: './src/assets/icon.svg'
        },
        {
          id: 2,
          title: 'A cat',
          source: './src/assets/icon.svg' 
        }
      ],
        gif: {},
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
