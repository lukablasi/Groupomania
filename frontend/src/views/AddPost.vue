<template>
  <div class="add-gif">
    <h1>Add new post</h1>
    <form enctype="multipart/form-data">
      <label class='add-post-label' for='title'>Title:</label><br>
      <input class='input' type='text' id='title' name='title' ref='heading' v-model='title'><br>
      <label class='add-post-label' for='body'>Post:</label>
      <textarea maxlength="500" class='input' id='body' name='source' ref='post' v-model='post' rows='20' cols='40'></textarea><br>
      <p>max 500 characters</p><br>
            <label>Add image (not required)</label> <br>
        <input type="file" id="file" ref="file" accept=".jpg, .png, .gif" v-on:change="handleFileUpload()"/>
      <div class='msg'> {{msg}} </div>
      <div class='errmsg'> {{errmsg}} </div>
      <button class='submit' @click.prevent='submitFile()'>Add Post</button>
    </form>
    
  </div>
</template>

<style scoped>
form {
  min-width: 400px;
}

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
 font-size: 17px;
}

#file {
  font-size: 15px;
}

.add-post-label, input, textarea {
  margin-top: 10px;
  margin-bottom: 20px;
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
      errmsg:'',
      file: '',
      filename: ''
    }
  },
  
  methods: {
      async postFile(filename) {

          this.filename = filename;
            this.body = this.$refs.post.value;
      this.title = this.$refs.heading.value;
      this.author = localStorage.userName;
      console.log(typeof this.filename)
      if (this.title != '' && this.body != '') {
      axios.post('http://localhost:5000/api/posts', {
        postBody: this.body,
        title: this.title,
        author: this.author,
        filename: this.filename
      }).then((response) => {
        this.msg = response.data.message;
        this.errmsg = '';
        this.title = '';
        this.source = '';
        this.post = ''
      }, (error) => {
        console.log(error);
      }) } else {
        this.errmsg = 'Title and content are required';
        this.msg = '';
      }

      },
    async handleFileUpload(){
    this.file = this.$refs.file.files[0];
  },
  async submitFile(){
            this.author = localStorage.userName;
            let formData = new FormData();
            formData.append('file', this.file);
            
            try {
                axios.post('http://localhost:5000/upload', formData).then((res) => {
                    this.filename = res.data;
                    this.postFile(this.filename)
                })
                
            } catch (err) {
                console.error(err.message)
            }

            
},
  },
}
</script>
