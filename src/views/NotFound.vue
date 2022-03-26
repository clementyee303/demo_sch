<template>
  <div style="text-alignt: center" v-if="user">
    <NavBar/>
    <h3>Page not found!</h3>
    <h4>Please click on the available page options above</h4>
    <br>
    <Logout/>
  </div>

</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'

export default {
    name: 'NotFound',
    
    components: {
      NavBar,
      Logout,
    },

    data() {
      return {
        user: false,
      }
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      })
    },
}
</script>

