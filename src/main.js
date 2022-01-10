import Vue from 'vue'
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin'
import '/node_modules/materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);

// const firebaseConfig = {
//   apiKey: "AIzaSyDYZ1GTccBy9UnnICPxtxGqrGqk7M0Ysas",
//   authDomain: "vuecrm-70baf.firebaseapp.com",
//   projectId: "vuecrm-70baf",
//   storageBucket: "vuecrm-70baf.appspot.com",
//   messagingSenderId: "362471118262",
//   appId: "1:362471118262:web:c691af5f00345caf701d17",
//   measurementId: "G-MFC30R07CZ"
// };

firebase.initializeApp({
  apiKey: "AIzaSyDYZ1GTccBy9UnnICPxtxGqrGqk7M0Ysas",
  authDomain: "vuecrm-70baf.firebaseapp.com",
  projectId: "vuecrm-70baf",
  storageBucket: "vuecrm-70baf.appspot.com",
  messagingSenderId: "362471118262",
  appId: "1:362471118262:web:c691af5f00345caf701d17",
  measurementId: "G-MFC30R07CZ"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
  
});


