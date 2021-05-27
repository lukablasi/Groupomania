<template>
  <div>
  <div class="single-post">

    <h2>{{ post.title }}</h2>
    <img :src= "'/images/' + post.imgname"  >
    <p>{{ post.body }}</p>
    <h4><i>Added by:</i> {{ post.author }}</h4>
 
  </div>

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
      msg: '',
      body: '',
      postID: '',
      userID: ''
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
    markAsSeen () {
      
      this.userID = localStorage.userID;
      
      axios.post('http://localhost:5000/api/posts/seen', {
        userID: localStorage.userID,
        postID: this.$route.params.id
      }).then((response) => {
        this.msg = response
      }, (error) => {
        console.log(error);
      }) 
    },
  },
  beforeMount() {
    this.getOnePost(),
    this.markAsSeen()
  },
}
</script>
