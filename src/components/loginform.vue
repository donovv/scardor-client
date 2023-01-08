<template>
  <dialog id="loginform" class="dialog">
    <div class="loginform">
      <div class="loginformheader">
        <h1>Welcome</h1>
        <button class="btn closebtn" @click="close">&#10006;</button>
      </div>
      <div class="forminputgroup">
        <!-- eslint-disable-next-line -->
        <label for="username">
          <h2>Username</h2>
        </label>
        <input type="text" name="username" id="username" v-model="loginData.email">
      </div>
      <div class="forminputgroup">
        <!-- eslint-disable-next-line -->
        <label for="password">
          <h2>Password</h2>
        </label>
        <input type="password" name="password" id="password" v-model="loginData.password">
      </div>
      <div class="errormsg"><span>{{ errorMsg }}</span></div>
      <button class="btn loginbtn" @click="login" :disabled="loading">
        {{ loading ? "logging in" : "login" }}
      </button>
    </div>
  </dialog>
</template>

<script>

export default {
  name: 'loginForm',
  data() {
    return {
      loading: false,
      errorMsg: '',
      loginData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        const loggedin = await this.$store.dispatch('auth/login', this.loginData);
        if (loggedin) this.close();
      } catch (err) {
        console.log(err);
        this.errorMsg = err;
      }
      this.loading = false;
    },
    close() {
      document.getElementById('loginform').close();
    },
  },
  mounted() {
    document.getElementById('loginform').addEventListener('close', () => {
      this.loginData.email = '';
      this.loginData.password = '';
      this.errorMsg = '';
    });
  },
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
}

.loginform {
  width: 80vw;
  max-width: 400px;
  padding: 3rem;
  background-color: hsl(184, 58%, 24%, .6);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  border: 2px solid hsl(184, 58%, 10%, .8);
  border-radius: .5em;
}

.forminputgroup {
  display: flex;
  flex-direction: column;
}

.forminputgroup input {
  font-size: 1rem;
  padding: .5rem;
  background-color: hsl(184, 58%, 24%, .2);
  color: white;
}

.loginformheader {
  display: flex;
  justify-content: space-between;
}

.closebtn {
  padding: .25em .5em;
}

.loginbtn:disabled {
  background-color: hsl(184, 58%, 75%, );
  cursor:wait;
}
.errormsg {
  height: 1.5em;
  font-size: 1.25rem;
  color: rgb(255, 0, 0);
  font-weight: bold;
}
</style>
