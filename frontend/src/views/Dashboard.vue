<template>
    <div class='dashboard'>
        <h2>Your account:</h2>
        <hr>
        <h3>Name:</h3>
        <p>{{ name }}</p>
        <h3>Email:</h3>
        <p>{{ email }}</p>
        <h3>User ID</h3>
        <p>{{ id }}</p>
        <h3>Delete your account:</h3>
        <button v-on:click='deleteAccount()'>Delete</button>
        {{ msg }}
    </div>
</template>

<style scoped>
h3 {
    text-align: center;
}
</style>

<script>


export default {
    name: 'Dashboard',
    data() {
        return {
            user: {},
            name: '',
            email: '',
            id: '',
            msg: '',
            confirmation: ''
        }
    },
    methods: {
        async deleteAccount () {
            this.confirmation = confirm('Are you sure?')
            console.log(this.confirmation)
            if (this.confirmation === true) {
            try {
                const response = await fetch(
                    "http://localhost:5000/auth/delete",
                    {
                        method: "DELETE",
                    headers: {
                     token: localStorage.token
                    },
                    }
                );
                this.msg = await response.json();
                alert(this.msg)
                localStorage.removeItem('token')
      localStorage.removeItem('userID')
      localStorage.removeItem('userName')
                this.$router.push('/')
                this.$router.go()
            } catch (err) {
                console.error(err.message)
            }
            } else {
                this.msg = 'Account not deleted'
            }
        },
        async displayDashboard () {
            try {
                const response = await fetch(
                "http://localhost:5000/dashboard",
                {
                    method: "GET",
                    headers: {
                     token: localStorage.token
                 },
                },
                );
                this.user = await response.json()
                this.name = this.user.user_name;
                this.email = this.user.user_email;
                this.id = this.user.user_id;
            } catch (err) {
                console.error(err.message)
            }
        }
    },
    beforeMount() {
        this.displayDashboard()
    }
}
</script>
