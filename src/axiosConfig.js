
import Vue from 'vue'
import axios from 'axios';

console.log(axios.defaults)

Vue.prototype.$ajax = axios;
