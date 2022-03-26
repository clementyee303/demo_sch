<template>
    <div id="tableContainer">
        <h2 class="divTitle">Current Portfolio</h2>

        <table id="coinsTable" class="auto-index">
            <tr>
                <th>S.No</th>
                <th>Coin</th>
                <th>Ticker</th>
                <th>Buy_Price</th>
                <th>Buy_Quantity</th>
                <th>Current_Price</th>
                <th>Profit</th>
                <th>Options</th>
            </tr>
        </table>
        
        <br><br>
    </div>
    <hr>
    <div id="profitContainer">
        <h2 id="totalProfit">Your Total Profit is : $XX</h2>
    </div>     

</template>

<script>
import ccxt from "ccxt";
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    
    data() {
        return {
            userEmail: ""
        }
    },

    mounted() {
        // const auth = getAuth();
        // this.userEmail = auth.currentUser.email;
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                display()
            }
        })
        async function display() {
            const auth = getAuth();
            const userEmail = auth.currentUser.email;
            let portfolioEntries = await getDocs(collection(db, String(userEmail)));
            let index = 1;
            let totalProfit = 0;

            portfolioEntries.forEach((docs) => {
                let entry = docs.data()
                let coinsTable = document.getElementById("coinsTable");
                let coinsRow = coinsTable.insertRow(index);

                let coin = (entry.Coin);
                let price = (entry.Buy_Price);
                let quantity = (entry.Buy_Quantity);
                let ticker = (entry.Ticker);

                let cell1 = coinsRow.insertCell(0);
                let cell2 = coinsRow.insertCell(1);
                let cell3 = coinsRow.insertCell(2);
                let cell4 = coinsRow.insertCell(3);
                let cell5 = coinsRow.insertCell(4);
                let cell6 = coinsRow.insertCell(5);
                let cell7 = coinsRow.insertCell(6);
                let cell8 = coinsRow.insertCell(7);

                cell1.innerHTML = index;
                cell2.innerHTML = coin;
                cell3.innerHTML = ticker;
                cell4.innerHTML = price;
                cell5.innerHTML = quantity;
                cell6.innerHTML = 0 //placeholder
                cell7.innerHTML = 0 //placeholder

                cell7.className = "profits";

                let deleteButton = document.createElement("button");
                deleteButton.className = "deleteButton";
                deleteButton.id = String(coin);
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function() {
                    deleteInstrument(coin);
                }
                
                cell8.appendChild(deleteButton);

                val(ticker);

                async function val(ticker) {
                    let binance = new ccxt.binance();
                    try {
                        let x = await binance.fetch_ohlcv(ticker, "5m");
                        cell6.innerHTML = x[499][4];
                        cell7.innerHTML = Math.round(quantity * (-parseFloat(price) + parseFloat(cell6.innerHTML)));
                        totalProfit += parseFloat(cell7.innerHTML);
                        document.getElementById("totalProfit").innerHTML = ("Your Total Profit is : $" + String(totalProfit));
                    } catch(e) {
                        console.log("Uncaught in promise" + e); // if ticker is invalid
                        if (confirm(e + "\nDelete invalid entry?") == true) {
                            deleteInstrumentBadSymbol(ticker, coin); // delete invalid entry immediately
                        }
                    }
                }
                index++;
            })
        }
        // display()
    
        async function deleteInstrument(coin) {
            const auth = getAuth();
            const userEmail = auth.currentUser.email;
            let x = coin;
            if (confirm("You are doing to delete " + x) == true) { // confirm user action
                console.log(x);
                await deleteDoc(doc(db, String(userEmail), x));
                console.log("Document successfully deleted!", x);
                let tb = document.getElementById("coinsTable") 
                    while (tb.rows.length > 1) {
                        tb.deleteRow(1);
                    }
                document.getElementById("totalProfit").innerHTML=""
                display();
            }
        }

        async function deleteInstrumentBadSymbol(ticker, coin) { // delete invalid entry immediate without confirmation
            const auth = getAuth();
            const userEmail = auth.currentUser.email;
            // alert("The ticker: " + ticker + " for " + coin + " is invalid");
            console.log(coin);
            console.log(coin);
            await deleteDoc(doc(db, String(userEmail), coin));
            console.log("Document successfully deleted!", coin);
            let tb = document.getElementById("coinsTable") 
                while (tb.rows.length > 1) {
                    tb.deleteRow(1);
                }
            document.getElementById("totalProfit").innerHTML=""
            display();
        }
    }
}
</script>

<style>

.divTitle{
    background-color: gold;
    color: black;
}

#coinsTable{
    border-collapse: collapse;
    width: 100%;
}

th, td{
    border: 3px solid #045aaa;
    text-align: center;
}

th{
    background-color: #067bc9;
    color: white;
    padding-top: 12px;
    padding-bottom: 12px;
}

tr:nth-child(even){
    background-color: #e3edee;
}

.deleteButton {
    transition-duration: 0.3s;
    cursor: pointer;
    background-color: white; 
    color: black; 
    border: 2px solid gold;
}

.deleteButton:hover {
    background-color: gold;
    color: black;
    border: 2px solid black;
}

#totalProfit{
    display:inline;
    border: 3px solid gold;
}


</style>