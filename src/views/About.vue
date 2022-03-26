<template>
  <NavBar/>
  <h3>This was created to showcase the use of database storage and REST api usage 
  </h3>
  <h2>Welcome to Demo School</h2>
  <h3>            
    Demo School is a results tracker web app <br>
    Your results displays your results based on your account's UID
    All resutls displays all students' results
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
    background-color: firebrick;
    color: whitesmoke;
}

</style>
