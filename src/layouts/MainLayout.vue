<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Asignación de servicios
        </q-toolbar-title>

        <q-space />
        <div>Usuario: {{ this.puesto }}</div>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <q-item to="/users" active-class="q-item-no-link-highlighting" :disable="disableMenuUsuarios()">
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item icon="home_repair_service" label="Servicios" :disable="disableMenuServicios()">
          <q-list class="q-pl-lg">
            <q-item to="/Map" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Nuevo</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/MapMarker" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="visibility" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Ver</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/StreetView" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="find_in_page" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Detalles</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item to="/Mail" active-class="q-item-no-link-highlighting" :disable="disableMenuClientes()">
          <q-item-section avatar>
            <q-icon name="groups_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/directory" active-class="q-item-no-link-highlighting" :disable="disableMenuReportes()">
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reportes</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/directory" active-class="q-item-no-link-highlighting" :disable="disableMenuConfiguracion()">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configuración </q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/about" active-class="q-item-no-link-highlighting" :disable="disableMenuAcerca()">
  <q-item-section avatar>
    <q-icon name="info" />
  </q-item-section>
  <q-item-section>
    <q-item-label>Acerca de</q-item-label>
    <q-item-label caption>Caption</q-item-label>
  </q-item-section>
</q-item>
      </q-list>

       <div style="position:absolute; bottom: 20px; margin-left: auto; margin-right: auto; left:0; right:0; text-align:center">
    <q-item to="/" @click="cerrarSesion" active-class="q-item-no-link-highlighting" class="cursor-pointer">
      <q-item-section avatar>
        <q-icon color="red" name="logout" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="color: red;">Cerrar Sesión</q-item-label>
      </q-item-section>
    </q-item>
  </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth";

const useAuth = useAuthStore();

export default defineComponent({
  name: 'MainLayout',

  components: {

  },


  methods: {
    cerrarSesion() {
      // Your logout/logout logic here
      // For example, you can redirect the user to the login page
      // or clear any session data
      console.log("Cerrando sesión...");
      // Add your logout logic here
    },

    disableMenuUsuarios(){
      if(useAuth.user.idRol === 1){
          return false
      } else if (useAuth.user.idRol === 2) {
        return true
      } else if (useAuth.user.idRol === 3) {
        return true
      } else if (useAuth.user.idRol === 4) {
        return true
      } else if (useAuth.user.idRol === 5) {
        return true
      } else if (useAuth.user.idRol === 6) {
        return true
      } else {
        console.log("Error")
      }
    },

    disableMenuServicios(){
      if(useAuth.user.idRol === 1){
          return false
      } else if (useAuth.user.idRol === 2) {
        return true
      } else if (useAuth.user.idRol === 3) {
        return false
      } else if (useAuth.user.idRol === 4) {
        return false
      } else if (useAuth.user.idRol === 5) {
        return true
      } else if (useAuth.user.idRol === 6) {
        return true
      } else {
        console.log("Error")
      }
    },

    disableMenuClientes(){
      if(useAuth.user.idRol === 1){
          return false
      } else if (useAuth.user.idRol === 2) {
        return false
      } else if (useAuth.user.idRol === 3) {
        return false
      } else if (useAuth.user.idRol === 4) {
        return true
      } else if (useAuth.user.idRol === 5) {
        return true
      } else if (useAuth.user.idRol === 6) {
        return true
      } else {
        console.log("Error")
      }
    },

    disableMenuReportes(){
      if(useAuth.user.idRol === 1){
          return false
      } else if (useAuth.user.idRol === 2) {
        return false
      } else if (useAuth.user.idRol === 3) {
        return false
      } else if (useAuth.user.idRol === 4) {
        return false
      } else if (useAuth.user.idRol === 5) {
        return true
      } else if (useAuth.user.idRol === 6) {
        return true
      } else {
        console.log("Error")
      }
    },

    disableMenuConfiguracion(){
      if(useAuth.user.idRol === 1){
          return false
      } else if (useAuth.user.idRol === 2) {
        return false
      } else if (useAuth.user.idRol === 3) {
        return true
      } else if (useAuth.user.idRol === 4) {
        return true
      } else if (useAuth.user.idRol === 5) {
        return true
      } else if (useAuth.user.idRol === 6) {
        return true
      } else {
        console.log("Error")
      }
    },

    disableMenuAcerca(){
      if(useAuth.user.idRol === 1){
          return false
      } else if (useAuth.user.idRol === 2) {
        return false
      } else if (useAuth.user.idRol === 3) {
        return false
      } else if (useAuth.user.idRol === 4) {
        return false
      } else if (useAuth.user.idRol === 5) {
        return false
      } else if (useAuth.user.idRol === 6) {
        return false
      } else {
        console.log("Error")
      }
    },

  },

  setup() {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const puesto = ref(useAuth.user.nombreCompleto);

    return {
      $q,
      leftDrawerOpen,
      puesto,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  }
})
</script>
