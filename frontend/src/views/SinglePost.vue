<template>
  <div>
  <div class="single-post">
    <h1>lalala</h1>
    <h2>{{ post.title }}</h2>
    <p>{{ post.postBody }}</p>
    <h4><i>uploaded by:</i> {{ post.author }}</h4>
    <div class='msg'> {{ msg }} </div>
  </div>
  <button v-on:click='deletePost()' class='delete'>Delete</button>
    </div>
</template>

<style lang="scss" scoped>

.single-post {
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
  name: 'SinglePost',
  data() {
    return {
      post: {},
      msg: ''
    }
  },
  methods: {
    async getOnePost () {
       axios.get('http://localhost:5000/api/posts').then((response) => {
         
        this.postsData = response.data;
        const ID = Number(this.$route.params.id);
        const post = this.postsData.find(post => post.post_id == ID);
        this.post = post;
        
      }, (error) => {
        console.log(error);
      })
    },
    deletePost () {
      axios.delete('http://localhost:5000/api/posts/' + this.$route.params.id).then((response) => {
        this.msg = response.data;
      }, (error) => {
        console.log(error);
      })
    }, 
  },
  beforeMount() {
    this.getOnePost()
  },
}
</script>
