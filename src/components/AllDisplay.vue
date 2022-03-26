<template>
    <div id="tableContainer">
        <h2 class="divTitle">All Results</h2>
        <label for="sortoptions2" id="sort2">Sort By</label>
        <select name="sortoptions2" id="sortoptions2" @change="SortList">
            <option value="descending marks">Descending Marks</option>
            <option value="ascending marks">Ascending Marks</option>
            <option value="descending subjects">Descending Subjects</option>
            <option value="ascending subjects">Ascending Subjects</option>
        </select>
        <br>
        <br>
        <table id="studentsTable" class="auto-index">
            <tr>
                <th>Student Id</th>
                <th>Name</th>
                <th>Marks</th>
                <th>Subject</th>
                <th>Institution</th>
                <th>Delete Entry</th>
            </tr>
        </table>
        
        <br><br>
    </div>
    <hr>
    <!-- <div id="profitContainer">
        <h2 id="totalProfit">Your Total Profit is : $XX</h2>
    </div>      -->

</template>

<script>
// import ccxt from "ccxt";
// import firebaseApp from '../firebase.js';
// import { getFirestore } from "firebase/firestore";
// // import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    
    data() {
        return {
        }
    },
    methods: {
        SortList: function() {
            let tb = document.getElementById("studentsTable") 
            while (tb.rows.length > 1) {
                tb.deleteRow(1);
            }
            let selected = document.getElementById("sortoptions2").value;
            if (selected == "descending marks") {
                this.getData().then(studentDetail => this.display(studentDetail, function(x, y) { return y[2] - x[2] }))
            } else if (selected == "ascending marks") {
                this.getData().then(studentDetail => this.display(studentDetail, function(x, y) { return x[2] - y[2] }))
            } else if (selected == "descending subjects") {
                this.getData().then(studentDetail => this.display(studentDetail, function(x, y) { return y[3].localeCompare(x[3]) }))
            } else if (selected == "ascending subjects") {
                this.getData().then(studentDetail => this.display(studentDetail, function(x, y) { return x[3].localeCompare(y[3]) }))
            }
        },
        getData: async function() {
            let allStudentsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/student/")
            let allStudentsDetailsJson = await allStudentsDetails.json()
            let allStudentsDetailsArray = allStudentsDetailsJson["documents"]
            let studentsDetail = []
            for (let i = 0; i < allStudentsDetailsArray.length; i++) {
                let studentDetail = []     
                let studentsDetailsJson = allStudentsDetailsArray[i]
                let userId = studentsDetailsJson["fields"]["uid"]["stringValue"]
                let subjectCodeArray = studentsDetailsJson["fields"]["subjects"]["arrayValue"]["values"]
                let firstName = studentsDetailsJson["fields"]["firstName"]["stringValue"]
                let lastName = studentsDetailsJson["fields"]["lastName"]["stringValue"]
                let name = firstName + " " + lastName
                let institutionCode = studentsDetailsJson["fields"]["institution"]["stringValue"]
                let institutionsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/institution/" + String(institutionCode))
                let institutionsDetailsJson = await institutionsDetails.json()
                let institution = institutionsDetailsJson["fields"]["title"]["stringValue"]
                for (let i = 0; i < subjectCodeArray.length; i++) {
                    let subjectCodeJson = subjectCodeArray[i]
                    let subjectCode = subjectCodeJson["stringValue"]
                    let subjectsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/subject/" + String(subjectCode))
                    let subjectsDetailsJson = await subjectsDetails.json()
                    let marks = subjectsDetailsJson["fields"]["marks"]["mapValue"]["fields"][userId]["stringValue"]
                    let subject = subjectsDetailsJson["fields"]["title"]["stringValue"]
                    let currEntry = []
                    currEntry.push(userId)
                    currEntry.push(name)
                    currEntry.push(marks)
                    currEntry.push(subject)
                    currEntry.push(institution)
                    studentDetail.push(currEntry)
                }
                studentsDetail.push(studentDetail)
            }

            return studentsDetail
        },
        display: async function(studentsDetail, sortFunction) {
            studentsDetail.sort(function(x, y) { return y[0][0] - x[0][0] })
            let index = 1;
            studentsDetail.forEach((studentDetail) => {
                studentDetail.sort(sortFunction)
                studentDetail.forEach((entry) => {
                    let studentsTable = document.getElementById("studentsTable");
                    let studentsRow = studentsTable.insertRow(index);

                    let studentId = entry[0];
                    let name = entry[1];
                    let marks = entry[2];
                    let subject = entry[3];
                    let institution = entry[4];

                    let cell1 = studentsRow.insertCell(0);
                    let cell2 = studentsRow.insertCell(1);
                    let cell3 = studentsRow.insertCell(2);
                    let cell4 = studentsRow.insertCell(3);
                    let cell5 = studentsRow.insertCell(4);
                    let cell6 = studentsRow.insertCell(5);

                    cell1.innerHTML = studentId;
                    cell2.innerHTML = name;
                    cell3.innerHTML = marks;
                    cell4.innerHTML = subject;
                    cell5.innerHTML = institution;
                    // cell6.innerHTML = 0 //placeholder

                    let deleteButton = document.createElement("button");
                    deleteButton.className = "deleteButton";
                    deleteButton.id = String("placeholder");
                    deleteButton.innerHTML = "Delete";
                    deleteButton.onclick = function() {
                        // deleteInstrument(coin);
                    }
                    
                    cell6.appendChild(deleteButton);
                    index++;
                })
            })
        },
    },
    mounted() {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getData().then(studentsDetail => display(studentsDetail, function(x, y) { return y[2] - x[2] }))
            }
        })
        async function getData() {
            let allStudentsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/student/")
            let allStudentsDetailsJson = await allStudentsDetails.json()
            let allStudentsDetailsArray = allStudentsDetailsJson["documents"]
            let studentsDetail = []
            for (let i = 0; i < allStudentsDetailsArray.length; i++) {
                let studentDetail = []     
                let studentsDetailsJson = allStudentsDetailsArray[i]
                let userId = studentsDetailsJson["fields"]["uid"]["stringValue"]
                let subjectCodeArray = studentsDetailsJson["fields"]["subjects"]["arrayValue"]["values"]
                let firstName = studentsDetailsJson["fields"]["firstName"]["stringValue"]
                let lastName = studentsDetailsJson["fields"]["lastName"]["stringValue"]
                let name = firstName + " " + lastName
                let institutionCode = studentsDetailsJson["fields"]["institution"]["stringValue"]
                let institutionsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/institution/" + String(institutionCode))
                let institutionsDetailsJson = await institutionsDetails.json()
                let institution = institutionsDetailsJson["fields"]["title"]["stringValue"]
                for (let i = 0; i < subjectCodeArray.length; i++) {
                    let subjectCodeJson = subjectCodeArray[i]
                    let subjectCode = subjectCodeJson["stringValue"]
                    let subjectsDetails = await fetch("https://firestore.googleapis.com/v1/projects/demosch/databases/(default)/documents/subject/" + String(subjectCode))
                    let subjectsDetailsJson = await subjectsDetails.json()
                    console.log(subjectsDetailsJson)
                    let marks = subjectsDetailsJson["fields"]["marks"]["mapValue"]["fields"][userId]["stringValue"]
                    let subject = subjectsDetailsJson["fields"]["title"]["stringValue"]
                    let currEntry = []
                    currEntry.push(userId)
                    currEntry.push(name)
                    currEntry.push(marks)
                    currEntry.push(subject)
                    currEntry.push(institution)
                    studentDetail.push(currEntry)
                }
                studentsDetail.push(studentDetail)
            }
            return studentsDetail
        }

        async function display(studentsDetail, sortFunction) {
            studentsDetail.sort(function(x, y) { return y[0][0] - x[0][0] })
            let index = 1;
            studentsDetail.forEach((studentDetail) => {
                studentDetail.sort(sortFunction)
                studentDetail.forEach((entry) => {
                    let studentsTable = document.getElementById("studentsTable");
                    let studentsRow = studentsTable.insertRow(index);

                    let studentId = entry[0];
                    let name = entry[1];
                    let marks = entry[2];
                    let subject = entry[3];
                    let institution = entry[4];

                    let cell1 = studentsRow.insertCell(0);
                    let cell2 = studentsRow.insertCell(1);
                    let cell3 = studentsRow.insertCell(2);
                    let cell4 = studentsRow.insertCell(3);
                    let cell5 = studentsRow.insertCell(4);
                    let cell6 = studentsRow.insertCell(5);

                    cell1.innerHTML = studentId;
                    cell2.innerHTML = name;
                    cell3.innerHTML = marks;
                    cell4.innerHTML = subject;
                    cell5.innerHTML = institution;
                    // cell6.innerHTML = 0 //placeholder

                    let deleteButton = document.createElement("button");
                    deleteButton.className = "deleteButton";
                    deleteButton.id = String("placeholder");
                    deleteButton.innerHTML = "Delete";
                    deleteButton.onclick = function() {
                        // deleteInstrument(coin);
                    }
                    
                    cell6.appendChild(deleteButton);
                    index++;
                })
            })
        }
    
        // async function deleteInstrument(coin) {
        //     const auth = getAuth();
        //     const userEmail = auth.currentUser.email;
        //     let x = coin;
        //     if (confirm("You are doing to delete " + x) == true) { // confirm user action
        //         console.log(x);
        //         await deleteDoc(doc(db, String(userEmail), x));
        //         console.log("Document successfully deleted!", x);
        //         let tb = document.getElementById("studentsTable") 
        //             while (tb.rows.length > 1) {
        //                 tb.deleteRow(1);
        //             }
        //         document.getElementById("totalProfit").innerHTML=""
        //         display();
        //     }
        // }

        // async function deleteInstrumentBadSymbol(ticker, coin) { // delete invalid entry immediate without confirmation
        //     const auth = getAuth();
        //     const userEmail = auth.currentUser.email;
        //     // alert("The ticker: " + ticker + " for " + coin + " is invalid");
        //     console.log(coin);
        //     console.log(coin);
        //     await deleteDoc(doc(db, String(userEmail), coin));
        //     console.log("Document successfully deleted!", coin);
        //     let tb = document.getElementById("studentsTable") 
        //         while (tb.rows.length > 1) {
        //             tb.deleteRow(1);
        //         }
        //     document.getElementById("totalProfit").innerHTML=""
        //     display();
        // }
    }
}
</script>

<style>

#sort2 {
  padding-right: 10px;
  margin-left: 90%;
  display:inline-block;
}
#sortoptions2 {
  padding: 5px;
  border-radius: 10px;
  width: 150px;
  border: 1px solid black;
  height: 25px;
}

.divTitle{
    background-color: firebrick;
    color: whitesmoke;
}

#studentsTable{
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