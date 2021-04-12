<template>
  <div class="gif-body">
      <h2>{{ title }}</h2>
      <img :src='source' >
      <h4><i>uploaded by:</i> {{ author }}</h4>
  </div>
</template>

<style lang='scss' scoped>

.gif-body {
  background-color: #f8f8f8;
  max-width: 600px;
  margin: auto;
  border: 1px #2c3e50 solid;
  margin-top: 20px;
}

.gif-body:hover {
  background-color: #f1f1f1;
}

h4 {
  text-align: right;
  margin-right: 50px;
}

img {
  width: 400px;
  height: 300px;
}

</style>
<script>

export default {
  name: 'GifBody',
  props: ['source', 'title', 'author']
  
}
</script>
