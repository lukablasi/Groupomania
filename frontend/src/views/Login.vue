<template>
  <div class="login">
    <h1>Log in to your existing account</h1>

    <form>
      <label for='email'>Email:</label>
      <input type='email' id='email' name='email'><br>
      <label for='password'>Password:</label>
      <input type='password' id='password' name='password'><br>
      <input type='submit' value='Submit'>
    </form>
  </div>
</template>

<style lang="scss">
  form {
    margin: auto;
    margin-top: 100px;
    width: 300px;
    text-align: right;
    
  }
  label {
    font-size: 17px;
    
  }
  input {
    margin: 10px;
    font-size: 15px;
  }
</style>

<script>


export default {
  name: 'Login',
}
</script>
