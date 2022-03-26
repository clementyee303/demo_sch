<template>
  <NavBar/>
  <h3>This was created to practice the use of components with vue.js and the integration of
    firebase funtionalities such as database management and login auth process
  </h3>
  <h2>Welcome to CPP</h2>
  <h3>            
    Crypto Paper Portfolio (CPP) is an app to to track your cryto portfolio. <br>
    Enter coin details and get real time Profit and Loss update of your Portfolio.
  </h3>
  <br>
  <Logout/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'

export default {

  name: "About",
    components: {
    NavBar,
    Logout,
  },
}
</script>

<style scoped>
h2 {
    background-color: gold;
    color: black;
}

</style>
