<template>
  <div class="add-gif">
    <h1>Add new post</h1>
    <form>
      <label for='title'>Title:</label>
      <input class='input' type='text' id='title' name='title' ref='heading' v-model='title'><br>
      <label for='body'>Post</label>
      <textarea class='input' id='body' name='source' ref='post' v-model='post' rows='20' cols='40'></textarea><br>
      
      <div class='msg'> {{msg}} </div>
      <div class='errmsg'> {{errmsg}} </div>
      <button @click.prevent='getSource()'>Add Post</button>
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

.input {
 text-align: center;
 font-size: 17px;
}
</style>

<script>

import axios from 'axios';

export default {
  name: 'AddPost',
  data() {
    return {
      title: '',
      author: '',
      msg: '',
      body: '',
      errmsg:''
    }
  },
  
  methods: {
    // checkIfAuth () {
    //   console.log(this.isLoggedIn)
    //   if (this.isLoggedIn === false) {
        
    //     alert('You need to log in')
    //   }
    // },
    getSource () {
      
      this.body = this.$refs.post.value;
      this.title = this.$refs.heading.value;
      this.author = localStorage.userName;

      if (this.title != '' && this.body != '') {
      axios.post('http://localhost:5000/api/posts', {
        postBody: this.body,
        title: this.title,
        author: this.author
      }).then((response) => {
        this.msg = response.data.message;
        this.errmsg = '';
        this.title = '';
        this.source = ''
      }, (error) => {
        console.log(error);
      }) } else {
        this.errmsg = 'Title and content are required';
        this.msg = '';
      }
    },
  },
  // beforeMount() {
  //   this.checkIfAuth ()
  // },
}
</script>
