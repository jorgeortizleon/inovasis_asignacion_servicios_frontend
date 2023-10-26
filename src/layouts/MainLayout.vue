<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat dense round aria-label="Clientes" to="/home">
          <img src="~assets/logoOnlyInovasis.png" alt="Clientes" class="custom-image" />
        </q-btn>

        <q-toolbar-title>
          {{ pageTitle }}
        </q-toolbar-title>

        <q-space />

        <q-btn-dropdown flat dropdown-icon="account_circle" :label="this.userIniciado.userName">
          <q-card class="no-shadow" bordered>
            <q-card-section class="text-center">
              <!-- <q-avatar size="100px" class="shadow-10">
                <img :src="avatar">
              </q-avatar> -->
              <q-avatar size="100px" class="shadow-10" color="blue" text-color="white">
                {{ capitalizarPrimeraLetra(this.userIniciado.userName) }}
              </q-avatar>
            </q-card-section>

            <q-card-section class="q-pt-none text-center ">
              <div class="text-h6  text-grey-8">
                {{ this.userIniciado.userName }}
              </div>
              <div class="text-caption text-grey-8">
                {{ this.userIniciado.nombreCompleto }}
              </div>
              <div class="text-caption text-grey-8">
                {{ this.userIniciado.nombreRol }}
              </div>
              <div class="text-caption text-grey-8">
                {{ this.userIniciado.correo }}
              </div>
              <div class="text-caption text-grey-8">
                {{ reformatDateAndTime(this.userIniciado.fechaRegistro) }}
              </div>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat round icon="fab fa-facebook" class="bg-indigo-5 text-white" />
              <q-btn flat round icon="fab fa-twitter" class="bg-info text-white" />
              <q-btn flat round icon="fab fa-instagram" class="bg-indigo-9 text-white" />
            </q-card-actions>
          </q-card>
        </q-btn-dropdown>

        <!-- <div>Usuario: {{ this.puesto }}</div> -->
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

        <q-item to="/users" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoUsuarios">
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>Panel de Control de Usuarios</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/clientes" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoClientes">
          <q-item-section avatar>
            <q-icon name="groups_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>Panel de Control de Clientes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/servicios" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoServicios">
          <q-item-section avatar>
            <q-icon name="home_repair_service" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Servicios</q-item-label>
            <q-item-label caption>Control de Servicios</q-item-label>
          </q-item-section>
        </q-item>


        <q-item to="/requisitos" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoClientes">
          <q-item-section avatar>
            <q-icon name="groups_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facturas</q-item-label>
            <q-item-label caption>Facturas, Remisión o Póliza</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/configuracion" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoConfig">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configuración </q-item-label>
            <q-item-label caption>Administra Roles y Permisos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/about" active-class="q-item-no-link-highlighting my-menu-link" v-ripple
          :disable="this.permisoAcercade">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Acerca de</q-item-label>
            <q-item-label caption>Descubre Mas Sobre Esta Página</q-item-label>
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

  computed: {
    pageTitle() {
      const matchedRoute = this.$route.matched.slice().reverse().find(route => route.meta && route.meta.title);
      return matchedRoute ? matchedRoute.meta.title : 'Asignación de servicios';
    }
  },

  components: {

  },
  created() {

    axios.get("http://localhost:8181/permisos/menuUsuarios/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoUsuarios = false
      } else if (resultado.data === 0) {
        this.permisoUsuarios = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoUsuarios = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuServicios/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoServicios = false
      } else if (resultado.data === 0) {
        this.permisoServicios = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoServicios = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuClientes/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoClientes = false
      } else if (resultado.data === 0) {
        this.permisoClientes = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoClientes = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuReportes/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoReportes = false
      } else if (resultado.data === 0) {
        this.permisoReportes = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoReportes = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuConfig/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoConfig = false
      } else if (resultado.data === 0) {
        this.permisoConfig = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoConfig = true
      }
    });

    axios.get("http://localhost:8181/permisos/menuAcercade/" + this.idRol).then((resultado) => {
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

    reformatDateAndTime(dateTime) {
      const [date, time] = dateTime.split(' ');
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');
      const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      const monthName = months[parseInt(month) - 1];
      const formattedDate = `${day} de ${monthName} del ${year}`;
      const formattedTime = `${hour}:${minute}`;
      return `${formattedDate} `;
    },

    capitalizarPrimeraLetra(texto) {
      if (typeof texto !== 'string' || texto.length === 0) {
        return Na;
      }
      return texto.charAt(0).toUpperCase();
    }
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const puesto = ref(useAuth.user.nombreCompleto);
    const idRol = ref(useAuth.user.idRol);
    const userIniciado = ref(useAuth.user);
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
      userIniciado,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  }
})
</script>

<style scoped>
.my-menu-link {
  border-left: 4px solid #1976D2;
  color: #1976D2;
}

.custom-image {
  max-height: 30px;
  /* Define el alto máximo que desees para la imagen */
  width: auto;
  /* Permite que el ancho se ajuste automáticamente para mantener la relación de aspecto */
}
</style>
