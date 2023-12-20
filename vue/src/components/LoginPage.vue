<script setup>
	import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { RouterLink, RouterView } from 'vue-router'

	const email = ref(null);
	const password = ref(null);
  const router = useRouter();
  const errMsg = ref('Error');
  
  const failed = ref(false);

	const login = async () => {

      if(!email.value || !password.value) {
        failed.value = true;
        errMsg.value = "Please fill out all fields!";
        return;
      }

			const resp = await fetch("http://localhost:3000/api/accounts/login", {
				method: "POST",
        credentials: 'include',
				headers: {
          "Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.value,
					password: password.value,
				}),
			});

      if(!resp.ok) {
        failed.value = true;
        errMsg.value = "Invalid email or password!";
        return;
      }

      const user = await resp.json()
      console.log(user);
      failed.value = false;
      router.push("/about");
		};
</script>

<template>
  <main>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <p v-if="failed">{{errMsg}}</p>
      <input type="email" placeholder="Email" v-model="email" id="ebox">
      <input type="password" placeholder="Password" v-model="password" id="pbox">
      <span>Don't have an account? <a>Sign Up Here</a></span> <!-- TODO : ROUTE TO SIGN UP PAGE -->
		  <button class="login" type="submit">Login</button>
    </form>
  </main>
</template>

<style scoped>
  main {
    padding: 1rem;
    color: white;
  }

  h1 {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    width: 400px;
    padding: 0.5rem;
  }

	.error {
		color: red;
	}

	.login {
		width: 100px;
    background-color: rgb(31, 148, 31);
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }
</style>