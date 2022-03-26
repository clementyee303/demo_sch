<template>
  <NavBar/>
  <WelcomeCpp/>
  <AddCoin @added="change"/>
  <ProfitDisplay :key="refreshComp"/>
  <br>
  <Logout/>
</template>

<script>
import WelcomeCpp from '@/components/WelcomeCpp.vue'
import AddCoin from '@/components/AddCoin.vue';
import ProfitDisplay from '@/components/ProfitDisplay.vue';
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'

export default {
  name: 'App',
  components: {
    WelcomeCpp,
    AddCoin,
    ProfitDisplay,
    NavBar,
    Logout,
  },

  data() {
    return {
      refreshComp: 0
    }
  },

  methods: {
    change() {
      this.refreshComp += 1
    }
  }
}
</script>

<style>

</style>
