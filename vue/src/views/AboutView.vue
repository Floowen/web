<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { RouterLink, RouterView } from 'vue-router'

  const router = useRouter();
  const chats = ref();
  const users = ref();
  const userData = ref(null);

  const isLoggedin = async () => {
    const res = await fetch('http://localhost:3000/api/accounts/me', {
      credentials: 'include',
    });
    const data = await res.json();

    if (data.user == null) {
      router.push("/");
    }
    else {
      userData.value = data;
      console.log(userData.value);
    }
  }

  const logout = async () => {
    const res = await fetch('http://localhost:3000/api/accounts/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      },
    });

    router.push("/");
    alert("Logged out");
  };

  const getChat = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/chats/?depth=0',{
        credentials: 'include',
      })
      const data = await req.json()
      console.log(data);
      chats.value = data.docs;
      
    } catch (err) {
      console.log(err)
    }
  };

  const getGroup = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/accounts/',{
        credentials: 'include',
      })
      const data = await req.json()
      console.log(data);
      users.value = data.docs;
      
    } catch (err) {
      console.log(err)
    }
  };

  const addGroup = ref();
  const selectedID = ref();
  const userName = ref();
  const chatText = ref();
  const upChat = async () => {

  if (userName.value == null) {
      alert("Please select a user!");
      return;
  }

    try {
      const res = await fetch('http://localhost:3000/api/chats/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat: chatText.value,
          account: userData.value.user.id,
          destination: userName.value.id,
        }),
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  isLoggedin(); // check if logged in on load
  getChat(); // get chat on load
  getGroup(); // get group on load
</script>

<template>
  <div class="body">
    <div class="about">
      <h1>Welcome!</h1>
      <p>Logged in as: {{ userData.user.name }}</p>
    </div>
    <div class="group">
      <p v-if="users.length !== 0">Users : </p>
        <p v-for="value in users">
        <div v-if="value.name != userData.user.name" @click="()=>userName=value">{{ value.name }} </div>
        <div v-else @click="() => userName=value">{{ value.name }} (inbox)</div>
        </p>
    </div>
    <div class="chat">
      <p v-if="userName!=null">Chatting to: {{ userName.name }} </p>
      <div v-for="value in chats" v-if="userName != null">
        <p v-if="value.destination === userName.id">{{ value.chat }}</p>
      </div>
    </div>
    <div class="chatbox">
      <form @submit="upChat">
        <input type="text" name="chatBox" v-model="chatText" placeholder="Type Here!">
        <button class="button" type="submit">Send</button>
      </form>
    </div> 
    <!-- <p v-if="userName != null">{{ userName.name }} </p> -->
    <div class="options">
      <button @click="logout" class="button">Log Out</button>
    </div>
  </div>
  
</template>

<style scoped>

.chat{
  margin-top: 1rem;
  padding-top: 0rem;
  border-radius: 12px;
  background-color: rgb(62, 62, 62);
}
.chatbox {
  padding-top: 1rem;
}

h1{
  margin-bottom: 1rem;
  font-weight: bold;
}

p {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.body {
  padding: 1rem;
  color: white;
}

.groupOpt {
  padding-top: 1rem;
}

.options {
  display: flex;
  position: absolute;
  bottom: 30px;
  width: 50%;
  padding-top: 1rem;
}

.button {
  margin-right: 0.3rem;
  width: 125px;
  background-color: rgb(31, 148, 31);
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 0.7rem;
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
</style>
