import { defineStore } from 'pinia';
import { ref } from "vue";

export const configStore = defineStore('configStore',() => {

  // const ip = ref("http://192.168.1.72:8181"); //Ip de inovasis
   const ip = ref("http://localhost:8181");

  //configurar la ip a mano de users/FromularioEditarUsuarios tiene una variable llamada ip

  //configurar la ip a mano de services/HistorialServicio tiene una variable llamada ip

  return {ip};
});
