<template>
  <NavBar/>
  <h3>This is Profit Page</h3>
  <ProfitDisplay/>
  <br>
  <Logout/>
</template>

<script>
import ProfitDisplay from '@/components/ProfitDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'

export default {
    name: 'OnlyProfit',
    components: {
        ProfitDisplay,
        NavBar,
        Logout,
    }
}
</script>

<style>

</style>