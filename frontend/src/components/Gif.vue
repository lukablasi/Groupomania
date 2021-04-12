<template>
  <div class="gif-body">
      <h3>{{ title }}</h3>
      <img :src='source' >
  </div>
</template>

<script>


export default {
  name: 'GifBody',
  props: ['source', 'title']
  
}
</script>
