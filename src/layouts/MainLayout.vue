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

        <q-item to="/users" active-class="q-item-no-link-highlighting my-menu-link" v-ripple :disable="this.permisoUsuarios">
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item icon="home_repair_service" label="Servicios" :disable="this.permisoServicios">
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

        <q-item to="/clientes" active-class="q-item-no-link-highlighting my-menu-link" v-ripple :disable="this.permisoClientes">
          <q-item-section avatar>
            <q-icon name="groups_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/directory" active-class="q-item-no-link-highlighting my-menu-link" v-ripple :disable="this.permisoReportes">
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reportes</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/directory" active-class="q-item-no-link-highlighting my-menu-link" v-ripple :disable="this.permisoConfig">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configuración </q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/about" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoAcercade">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Acerca de</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div
        style="position:absolute; bottom: 20px; margin-left: auto; margin-right: auto; left:0; right:0; text-align:center">
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
import { useAuthStore } from "src/stores/auth";
import axios from "axios";

const useAuth = useAuthStore();

export default defineComponent({
  name: 'MainLayout',

  components: {

  },
  created(){

    axios.get("http://localhost:8181/permisos/menuUsuarios/"+this.idRol).then((resultado) => {
        if (resultado.data === 1) {
        this.permisoUsuarios = false
      } else if (resultado.data === 0) {
        this.permisoUsuarios = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoUsuarios = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuServicios/"+this.idRol).then((resultado) => {
        if (resultado.data === 1) {
        this.permisoServicios = false
      } else if (resultado.data === 0) {
        this.permisoServicios = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoServicios = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuClientes/"+this.idRol).then((resultado) => {
        if (resultado.data === 1) {
        this.permisoClientes = false
      } else if (resultado.data === 0) {
        this.permisoClientes = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoClientes = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuReportes/"+this.idRol).then((resultado) => {
        if (resultado.data === 1) {
        this.permisoReportes = false
      } else if (resultado.data === 0) {
        this.permisoReportes = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoReportes = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuConfig/"+this.idRol).then((resultado) => {
        if (resultado.data === 1) {
        this.permisoConfig = false
      } else if (resultado.data === 0) {
        this.permisoConfig = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoConfig = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuAcercade/"+this.idRol).then((resultado) => {
        if (resultado.data === 1) {
        this.permisoAcercade = false
      } else if (resultado.data === 0) {
        this.permisoAcercade = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoAcercade = true
      }
    });


  },


  methods: {
    cerrarSesion() {
      // Your logout/logout logic here
      // For example, you can redirect the user to the login page
      // or clear any session data
      console.log("Cerrando sesión...");
      // Add your logout logic here
    },

  },

  setup() {
    const leftDrawerOpen = ref(false)
    const puesto = ref(useAuth.user.nombreCompleto);
    const idRol = ref(useAuth.user.idRol);
    const permisoUsuarios = ref(true);
    const permisoServicios = ref(true);
    const permisoClientes = ref(true);
    const permisoReportes = ref(true);
    const permisoConfig = ref(true);
    const permisoAcercade = ref(true);

    return {

      leftDrawerOpen,
      puesto,
      idRol,
      permisoUsuarios,
      permisoServicios,
      permisoClientes,
      permisoReportes,
      permisoConfig,
      permisoAcercade,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  }
})
</script>

<style>
.my-menu-link {
  border-left: 4px solid #1976D2;
  color: #1976D2;
}
</style>
