<template>
    <div style = "text-align: center">
        <h1 id = "mainHead">CRYPTO PAPER PORTFOLIO</h1>
        <div id = "firebaseui-auth-container"></div>
        <div id = "pageContent">
            Crypto Paper Portfolio (CPP) is an app to to track your crypto portfolio. <br>
            Enter coin details and get real time Profit and Loss update of your Portfolio.
        </div>
    </div>
    <h5>copyright@cpp-2021</h5>
</template>

<script>
import firebase from '@/uiFirebase.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name: "Login",

    mounted() {
        //call ui instance
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            // check if ui instance has been intialized yet
            // multiple calls to initalize might result in errors
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ]
        }

        ui.start("#firebaseui-auth-container", uiConfig);
    },
}
</script>

<style scoped>
h1 {
    background-color: gold;
    color: black;
}

#firebaseui-auth-container {
    margin-top: 50px;;
    margin-bottom: 50px;;
}

#pageContent {
    height: 100px;
    font-size: larger;
    font-weight: bolder;
    text-align: center;
}

#mainHead {
    text-align: center;
    text-shadow: 2px 2px grey;
}

#h5 {
    text-align: center;
    background-color: rgb(194, 202, 188);
}

</style>