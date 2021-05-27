<template>
  <div class="post-body">
    <h4>{{ seen }}</h4>
      <h2>{{ title }}</h2>

      <img v-if="source != '/images/' " :src='source'>

      <p> {{ postBody }} </p>
      <h4><i>Added by:</i> {{ author }}</h4>
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

h2 {
  color: #2c3e50;
}

h4 {
  text-align: right;
  margin-right: 50px;
  color: #2c3e50;
}

p {
  color: #2c3e50;
}

img {
  height: 300px;
  width: 70%;
}

</style>
<script>

export default {
  name: 'Post',
  props: ['postBody', 'title', 'author', 'seen', 'source']
  
}
</script>
