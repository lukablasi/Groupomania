<template>
  <div class="add-gif">
    <h1>Upload a new GIF</h1>
    <form encrypte='multipart/form-data'>
      <label for='source'>Source:</label>
      <input type='file' id='source' name='source' ref='image'><br>
      <label for='title'>Title:</label>
      <input type='text' id='title' name='title' ref='heading' v-model='title'><br>
      <div class='msg'> {{msg}} </div>
      <div class='errmsg'> {{errmsg}} </div>
      <button @click.prevent='getSource()'>Add Gif</button>
    </form>
    {{ body }}
  </div>
</template>

<style scoped>
.msg {
  color: #42b983;
  font-size: 20px;
  padding: 10px;
}

.errmsg {
  color: darkred;
  padding: 10px;
}
</style>

<script>

import axios from 'axios';

export default {
  name: 'AddGif',
  data() {
    return {
      source: '',
      title: '',
      author: '',
      msg: '',
      body: '',
      errmsg:''
    }
  },
  methods: {
    getSource () {
      
      this.source = this.$refs.image.files[0].name;
      this.title = this.$refs.heading.value;
      const formData = new FormData();
      formData.append('file', this.source)
      if (this.title != '' && this.source != '') {
      axios.post('http://localhost:5000/api/gifs', {
        source: this.source,
        title: this.title
      }).then((response) => {
        this.msg = response.data.message;
        this.errmsg = '';
        this.title = '';
        this.source = ''
      }, (error) => {
        console.log(error);
      }) } else {
        this.errmsg = 'Title and source are required';
        this.msg = '';
      }
    },
  },
  
}
</script>
