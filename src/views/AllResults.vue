<template>
  <NavBar/>
  <h3>This is All Results Page</h3>
  <AllDisplay/>
  <br>
  <Logout/>
</template>

<script>
import AllDisplay from '@/components/AllDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'

export default {
    name: 'OnlyProfit',
    components: {
        AllDisplay,
        NavBar,
        Logout,
    }
}
</script>

<style>

</style>