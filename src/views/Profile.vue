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
        Name: <strong> <span id="name">{{user.displayName}}</span> </strong> <br>
        Email: <strong> {{user.email}} </strong> <br>
        Phone Number: <strong> <span id="phoneNumber"></span> </strong> <br>
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
          getData()
        }
      })
      async function getData() {
        const auth = getAuth();
        const userId = auth.currentUser.uid;  
        let studentsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/student/" + String(userId))
        let studentsDetailsJson = await studentsDetails.json()
        let firstName = studentsDetailsJson["fields"]["firstName"]["stringValue"]
        let lastName = studentsDetailsJson["fields"]["lastName"]["stringValue"]
        let name = firstName + " " + lastName
        let phoneNumber = studentsDetailsJson["fields"]["phoneNumber"]["stringValue"]
        document.getElementById("name").innerHTML = name;
        document.getElementById("phoneNumber").innerHTML = phoneNumber;
      }
    },
}
</script>

