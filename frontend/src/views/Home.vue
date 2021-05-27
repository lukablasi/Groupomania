<template>
  <div class="home">
    <h1>New Posts</h1>
    
    <div v-for='post in postsData.slice().reverse()' :post='post' :key='post.id'>
      
      
        <h4 v-if="seenPosts.includes(post.post_id)"></h4>
        <h4 class='new-message' v-else>New post!</h4>
        <router-link :to="'/posts/' + post.post_id" >
        
        <Post 
        :source = "'/images/' + post.imgname"
        :title=post.title 
        :author=post.author />

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


.new-message {
  
  margin-left: -300px;
}

</style>

<script>
import Post from '../components/Post.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {Post},
  data() {
    return {
      postsData: [],
      seenPosts: [],
    }
  },
  methods: {
    
    async getPosts () {
      axios.get('http://localhost:5000/api/posts').then((response) => {
        this.postsData = response.data;
      }, (error) => {
        console.log(error);
      })
    },
    async getSeenPosts () {
      axios.post('http://localhost:5000/api/posts/visited', {
        userID: localStorage.userID
      }).then((response) => {
        this.seenPosts= response.data.map(a => a.post_id)
          

          
      }, (error) => {
        console.log(error);
      })
    },
  },
  beforeMount() {
    this.getPosts(),
    this.getSeenPosts()
  },
}
</script>


