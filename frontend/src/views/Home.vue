<template>
  <div class="home">
    <h1>New Posts</h1>
    <div v-for='post in postsData.slice().reverse()' :post='post' :key='post.id'>
        <router-link :to="'/posts/' + post.post_id" >
        <Post :postBody=post.body :title=post.title :author=post.author />

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

.home {
  background-color: rgba(199, 250, 192, 0.473);
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
  },
  beforeMount() {
    this.getPosts()
  },
}
</script>


