<template>
  <div class="login">
    <h1>Log in to your existing account</h1>

    <form @submit='logIn'>
      <label for='email'>Email:</label><br>
      <input type='email' id='email' name='email' v-model='email'><br>
      <label for='password'>Password:</label><br>
      <input type='password' id='password' name='password' v-model='password'><br>
      <input class='submit' type='submit' value='Submit'>
    </form>
  </div>
</template>

<style lang="scss">
  form {
    margin: auto;
    margin-top: 100px;
    width: 300px;
    text-align: canter;
    
  }
  label {
    font-size: 23px;
    
  }
  input {
    margin: 10px;
    font-size: 20px;
  }

  .submit {
    background-color: #23b106;
    color: whitesmoke;
    padding: 10px;
    border-radius: 20%;
    font-size: 23px;
  }
</style>

<script>


export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      body: '',
      parseRes: ''
    }
  },
  methods: {
    logIn: async function (e) {
      e.preventDefault();
      this.body = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
         body: JSON.stringify(this.body)
        },
        
      );
      this.parseRes = await response.json();
      if (this.parseRes.token !== undefined) {
      localStorage.setItem('token', this.parseRes.token);
      localStorage.setItem('userID', this.parseRes.userID);
      localStorage.setItem('userName', this.parseRes.userName);
      this.$router.go(this.$router.push('/'))
      }
      } catch (err) {
        console.error(err.message)
      }
    }
  },
}
  

</script>
