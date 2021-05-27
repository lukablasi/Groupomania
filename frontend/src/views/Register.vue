<template>
  <div class="register">
    <h1>Create a new account</h1>
    <form @submit='onSubmitForm'>
      <label for='name'>Name:</label><br>
      <input type='text' id='name' name='name' v-model='name'><br>
      <label for='email'>Email:</label><br>
      <input type='email' id='email' name='email' v-model='email'><br>
      <label for='password'>Password:</label><br>
      <input type='password' id='password' name='password' v-model='password'><br>
      <label for='password'>Confirm:</label><br>
      <input type='password' id='confirmpassword' name='confirmpassword' v-model='confirmpassword'><br>
      <input class='submit' type='submit' value='Submit'>
    </form>
  </div>
</template>

<style scoped>

form {
  text-align: center;
}

</style>

<script>


export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      body: '',
      parseRes: ''
    }
  },
  methods: {
    
    onSubmitForm: async function (e) {
      e.preventDefault();

      if (this.password !== this.confirmpassword || this.password == '') {
        window.alert('Passwords are not matching or are empty, try again')
      } else {
      
      this.body = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      
      try {
        const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
         body: JSON.stringify(this.body)
        }
        
      );
      this.parseRes = await response.json();
      localStorage.setItem('token', this.parseRes.token);
      localStorage.setItem('userID', this.parseRes.userID);
      localStorage.setItem('userName', this.parseRes.userName);
      this.$router.push('/');
      location.reload();
      } catch (err) {
        console.error(err.message)
        window.alert('Email already in use.')
      }
    }
    }
  }
}
</script>
