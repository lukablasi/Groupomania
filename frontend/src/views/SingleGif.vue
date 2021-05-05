<template>
  <div>
  <div class="single-gif">
    
    <h2>{{ gif.title }}</h2>
    <img :src=gif.source>
    <h4><i>uploaded by:</i> {{ gif.author }}</h4>
    <div class='msg'> {{ msg }} </div>
  </div>
  <button v-on:click='deleteGif()' class='delete'>Delete</button>
    </div>
</template>

<style lang="scss" scoped>

.single-gif {
  background-color: #f8f8f8;
  max-width: 600px;
  margin: auto;
  border: 1px #2c3e50 solid;
  margin-top: 20px;
}

h2 {
  color: #42b983;
}

h4 {
  text-align: right;
  margin-right: 50px;
}

button{
  font-size: 20px;
  padding: 10px;
  margin: 20px;
  color: white;
  border: 2px solid white;
  border-radius: 10px;  
}

.delete {
  background-color: darkred;
}

.msg {
  color: darkred;
  font-size: 30px;
}

img {
  height: 300px;
  width: 70%;
}

</style>

<script>
import axios from 'axios';

export default {
  name: 'SingleGif',
  data() {
    return {
      gif: {},
      msg: ''
    }
  },
  methods: {
    async getOneGif () {
       axios.get('http://localhost:5000/api/gifs').then((response) => {
        this.gifsData = response.data;
        const ID = Number(this.$route.params.id);
        const gif = this.gifsData.find(gif => gif.gif_id == ID);
        this.gif = gif;
      }, (error) => {
        console.log(error);
      })
    },
    deleteGif () {
      axios.delete('http://localhost:5000/api/gifs/' + this.$route.params.id).then((response) => {
        console.log(response);
        this.msg = response.data;
      }, (error) => {
        console.log(error);
      })
    }, 
  },
  beforeMount() {
    this.getOneGif()
  },
}
</script>
