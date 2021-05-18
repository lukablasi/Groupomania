<template>
  <div class="post-body">
      <h2>{{ title }}</h2>
      <p> {{ postBody }} </p>
      <h4><i>uploaded by:</i> {{ author }}</h4>
  </div>
</template>

<style lang='scss' scoped>

.post-body {
  background-color: #f8f8f8;
  max-width: 600px;
  margin: auto;
  border: 1px #2c3e50 solid;
  margin-top: 20px;
}

.post-body:hover {
  background-color: #f1f1f1;
}

h4 {
  text-align: right;
  margin-right: 50px;
  color: #2c3e50;
}

img {
  width: 70%;
  height: 300px;
}

</style>
<script>

export default {
  name: 'Post',
  props: ['postBody', 'title', 'author']
  
}
</script>
