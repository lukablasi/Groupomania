<template>
  <div id="app">
    <div id="nav">
      <div class='nav-logo'>
      <img src='../src/assets/icon-left-font-monochrome-black.svg'>
      </div>
      <div class='nav-links'>
      <router-link to="/">Home</router-link>
      
      <span v-if='isLoggedIn'>
        <router-link to="/addpost">Add Post</router-link>
        <router-link to="/dashboard">Your Account</router-link>
        <a href='' @click='logout'>Logout</a>
        <h3>Welcome back, {{ name }}!</h3>
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
  height: 100vh;
  background:
  radial-gradient(rgb(218, 214, 214) 3px, transparent 4px),
    radial-gradient(rgb(211, 207, 207) 3px, transparent 4px),
    linear-gradient(#fff 4px, transparent 0),
    linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
    linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
  #fff;
  background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
}

h3 {
  text-align: right;
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
      isLoggedIn: false,
      name: localStorage.userName
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
        },
      );
      this.parseRes = await response.json();
        if (this.parseRes === true) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
        } else {
          this.isLoggedIn = false;
          localStorage.removeItem('token')
      localStorage.removeItem('userID')
      localStorage.removeItem('userName')
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
