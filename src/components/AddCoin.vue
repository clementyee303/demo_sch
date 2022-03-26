<template>
    <div id="formContainer">
        <form id="forms">
            <h1 class="divTitle">Add Coins</h1>

            <label for="coin">Coin Name:</label>
            <input type="text" id="coin" required="" placeholder="Name of Coin"><br>

            <label for="ticker">Ticker:</label>
            <input type="text" id="ticker" required="" placeholder="Valid Ticker"><br>

            <label for="price">Buy Price:</label>
            <input type="number" id="price" required="" placeholder="Buy Price" min="0" step=".01"><br>

            <label for="quantity">Buy Quantity:</label>
            <input type="number" id="quantity" required="" placeholder="Quantity" min="0"><br><br>

            <button class="saveButton" type="button" v-on:click="saveToFs()">Save</button><br><br>
        </form>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { getAuth } from 'firebase/auth';


export default {
    data() {
      return {
        userEmail: "",
      }
    },
    
    methods: {
        async saveToFs() {
            const auth = getAuth();
            this.userEmail = auth.currentUser.email;
            let coinValue = document.getElementById("coin").value;
            let tickerValue = document.getElementById("ticker").value;
            let priceValue = document.getElementById("price").value;
            let quantityValue = document.getElementById("quantity").value;

            alert("Saving your data for Coin: " + coinValue);
            
            try {
                const docRef = await setDoc(doc(db, String(this.userEmail), coinValue), {
                    Coin: coinValue,
                    Ticker: tickerValue,
                    Buy_Price: priceValue,
                    Buy_Quantity: quantityValue 
                })
                console.log(docRef)
                document.getElementById('forms').reset();
                this.$emit("added");
            }
            catch(error) {
                console.error("Error adding document: ", error);
            }
        },
    }

}
</script>

<style scoped>

.divTitle{
    background-color: gold;
    color: black;
}

#forms{
    background-color: #067bc9; 
    text-align: center;
    color: white;
}

label{
    display: inline-block;
    text-align: right;
    width: 100px;
}

.saveButton {
    transition-duration: 0.3s;
    cursor: pointer;
    background-color: white; 
    color: black; 
    border: 2px solid gold;
}

.saveButton:hover {
    background-color: gold;
    color: black;
    border: 2px solid black;
}

</style>