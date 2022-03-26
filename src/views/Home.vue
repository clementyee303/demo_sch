<template>
  <NavBar/>
  <Welcome/>
  <!-- <AddCoin @added="change"/> -->
  <YourDisplay :key="refreshComp"/>
  <AllDisplay/>
  <br>
  <Logout/>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
// import AddCoin from '@/components/AddCoin.vue';
import YourDisplay from '@/components/YourDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'
import AllDisplay from '@/components/AllDisplay.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    // AddCoin,
    YourDisplay,
    NavBar,
    Logout,
    AllDisplay,
  },

  data() {
    return {
      refreshComp: 0
    }
  },

  methods: {
    // change() {
    //   this.refreshComp += 1
    // }
  }
}
</script>

<style>

</style>
