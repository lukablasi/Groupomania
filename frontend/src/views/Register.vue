<template>
  <div class="register">
    <h1>Create a new account</h1>
    <form>
      <label for='email'>Email:</label>
      <input type='email' id='email' name='email'><br>
      <label for='password'>Password:</label>
      <input type='password' id='password' name='password'><br>
      <label for='password'>Confirm:</label>
      <input type='password' id='confirmpassword' name='confirmpassword'><br>
      <input type='submit' value='Submit'>
    </form>
  </div>
</template>

<script>


export default {
  name: 'Register',
}
</script>
