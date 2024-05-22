<template>
  <div class="sidebar-container">
    <div v-if="user" class="content">
      <h3 class="user">
        Welcome <br />
        <span class="sabun">{{ user }}</span>
      </h3>
      <button class="logout btn" @click="logout">Logout</button>
      <div class="links">
        <router-link class="link" to="/main">Main</router-link>
        <router-link class="link" to="/production"
          >Production History</router-link
        >
        <router-link class="link" to="/customerpo"
          >Customer PO Manager</router-link
        >
        <router-link class="link" to="/shippingorder"
          >Shipping Order</router-link
        >
        <router-link class="link" to="/daily">Daily Shipping Qty</router-link>
        <router-link class="link" to="/monthly"
          >Monthly Shipping Qty</router-link
        >
      </div>
    </div>
    <div v-else>
      <div class="out">
        <p>You're logged out.</p>
        <p>Please login.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  setup() {},
  created() {},
  mounted() {
    if (this.$cookies.get('userCookie')) {
      const cookie = this.$cookies.get('userCookie').user
      this.$store.commit('setUser', cookie)
    } else {
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    }
  },
  unmounted() {},
  methods: {
    logout() {
      this.$cookies.remove('userCookie')
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
.sidebar-container {
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.1);
  background: #167bff;
  font-weight: 700;
  min-height: 5vh;
  height: 100%;
}
.content {
  display: flex;
  align-items: center;
}
.user {
  padding-left: 1rem;
  letter-spacing: 1px;
}
.sabun {
  color: aliceblue;
}
.logout {
  margin-left: 2rem;
  padding: 0.5rem;
  cursor: pointer;
  letter-spacing: 1px;
  background: rgb(216, 22, 22);
}
.links {
  display: flex;
  align-items: center;
  padding-left: 5rem;
}
.link {
  background: white;
  color: #0f172a;
  padding: 1rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  font-size: 0.7rem;
}
.link:hover {
  background-color: lightskyblue;
}
.router-link-active {
  color: red;
}
.out {
  letter-spacing: 1px;
  line-height: 1.5;
  padding-left: 2rem;
}
@media (min-width: 992px) {
  .sidebar-container {
    min-height: 100vh;
    height: 100%;
    width: 250px;
  }
  .content {
    position: sticky;
    top: 0;
    flex-direction: column;
  }
  .user {
    padding-left: 0;
    padding-top: 1rem;
  }
  .logout {
    margin-left: 0;
    margin-top: 1rem;
  }
  .links {
    width: 90%;
    padding-top: 2rem;
    padding-left: 0;
    flex-direction: column;
  }
  .link {
    text-align: center;
    width: 100%;
    display: block;
    font-size: 1rem;
  }
  .out {
    padding-top: 1rem;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
