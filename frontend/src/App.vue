<template>
  <div id="app">
    <div id="nav">
      <div class='nav-logo'>
      <img src='../src/assets/icon-left-font-monochrome-black.svg'>
      </div>
      <div class='nav-links'>
      <router-link to="/">Home</router-link>
      
      <span v-if='isLoggedIn'>
        <router-link to="/addgif">Add Gif</router-link>
        <a href='' @click='logout'>Logout</a>
      </span>
      <span v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        </span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-top: 30px;
  margin-bottom: 50px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;
    font-size: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav-logo img {
  max-width: 90vw;
}
</style>

<script>


export default ({
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    async isAuth () {
      try {
        const response = await fetch(
        "http://localhost:5000/auth/is-verify",
        {
          method: "GET",
          headers: {
            token: localStorage.token
          },

        }
        
      );
      this.parseRes = await response.json();
        if (this.parseRes === true) {
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }

      } catch (err) {
        console.error(err.message)
      }
    },
    async logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
      localStorage.removeItem('userName')
        this.$router.push('/')
    }
  },
  beforeMount() {
    this.isAuth()
  }
})
</script>
