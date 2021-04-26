<template>
  <div class="add-gif">
    <h1>Upload a new GIF</h1>
    <form>
      <label for='source'>Source:</label>
      <input type='text' id='source' name='source' ref='image'><br>
      <label for='title'>Title:</label>
      <input type='text' id='title' name='title' ref='heading'><br>
      <button @click.prevent='getSource()'>Add Gif</button>
    </form>
    {{ body }}
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'AddGif',
  data() {
    return {
      source: '',
      title: ''
    }
  },
  methods: {
    getSource () {
      this.source = this.$refs.image.value;
      this.title = this.$refs.heading.value;
      axios.post('http://localhost:5000/api/gifs', {
        source: this.source,
        title: this.title
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
    },
  },
  
}
</script>
