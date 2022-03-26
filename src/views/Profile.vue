<template>
  <div style="text-alignt: center" v-if="user">
    <NavBar/>
    <div> 
      <h3> <strong> This is your profile details </strong> </h3>
    </div>
    <div v-if="user">
      <div>
        <img src="@/assets/logo.png" style="width:75px; height:75px;
        border-radius:50%; border:4px solid #333">
      </div>
      <div> 
        <p> 
        Name: <strong> {{user.displayName}} </strong> <br>
        Email: <strong> {{user.email}} </strong> <br>
        Uid: <strong> {{user.uid}} </strong> <br>
        Provider: <strong> {{user.providerData[0].providerId}} </strong> 
        </p>
      </div>
    </div>
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

