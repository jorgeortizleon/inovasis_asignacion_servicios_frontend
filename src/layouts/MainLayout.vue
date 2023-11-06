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
        <!-- <web-socket></web-socket> -->

        <q-space />
        <q-btn round dense flat color="white" icon="notifications" @click="this.getObservacionesNotifi2">
          <q-badge color="red" text-color="white" floating>
            {{ badgeCount }}
          </q-badge>
          <q-menu>
            <q-card>
              <q-card-section>
                <div class="text-h6 text-grey-8">Notificaciones</div>
                <!-- <div class="text-subtitle2">Aquí podrá ver las observaciones y servicios nuevos o que no ha visto</div> -->
              </q-card-section>
              <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                align="justify">
                <q-tab name="tab1" label="Servicios" @click="changeTab('tab1')" />
                <q-tab name="tab2" label="Observaciones" @click="changeTab('tab2')" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="tab1" v-if="tab === 'tab1'">
                  <!-- <div class="text-h6">Servicios</div> -->
                  <div class="text-h6">Servicios</div>
                  <q-list style="min-width: 100px">
                    <messages-panel :notifications="notifications" @notification-click="navigateToService"
                      @notification-click2="onNotificationClick2"></messages-panel>
                  </q-list>
                </q-tab-panel>
                <q-tab-panel name="tab2" v-if="tab === 'tab2'">
                  <!-- <div class="text-h6">Servicios</div> -->
                  <div class="text-h6">Observaciones</div>
                  <q-list style="min-width: 100px">
                    <div v-if="observacionesNotifi.length > 0">
                      <q-item style="max-width: 420px" v-for="notification in observacionesNotifi"
                        :key="notification.idObservacion" clickable v-ripple
                        @click="handleObservacionesClick(notification.idServicio)">
                        <q-item-section>
                          <q-item-label class="text-subtitle2">Servicio: {{ notification.idServicio }}</q-item-label>
                          <q-item-label>{{ notification.observacion }}</q-item-label>
                          <q-item-label caption lines="1">{{ notification.userName }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          {{ reformatDateAndTime(notification.fechaRegistro) }}
                        </q-item-section>
                      </q-item>
                    </div>
                    <div v-else>
                      <p>No hay observaciones</p>
                    </div>
                  </q-list>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
            <!-- =======
            <q-list style="min-width: 100px">
              <messages-panel :notifications="notifications" @notification-click="navigateToService"
                @notification-click2="onNotificationClick2"></messages-panel>
            </q-list>
            >>>>>>> Stashed changes -->
          </q-menu>
        </q-btn>

        <q-btn-dropdown class="q-ml-sm" color="white" text-color="primary" unelevated rounded
          dropdown-icon="account_circle" no-icon-animation :label="this.userIniciado.userName">
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
          >
          <!-- :disable="this.permisoFacturas" -->
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
import { defineComponent, ref, onMounted } from 'vue'
import { useAuthStore } from "src/stores/auth";
import axios from "axios";
import MessagesPanel from './MessagesPanel.vue'
import { useRouter } from 'vue-router';
import { configStore } from "src/stores/config.js";
const configFromStore = configStore();

const router = useRouter();
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
    MessagesPanel,
  },

  created() {


    axios.get(configFromStore.ip + "/permisos/menuUsuarios/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoUsuarios = false
      } else if (resultado.data === 0) {
        this.permisoUsuarios = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoUsuarios = true
      }
    });

    axios.get(configFromStore.ip + "/permisos/menuServicios/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoServicios = false
      } else if (resultado.data === 0) {
        this.permisoServicios = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoServicios = true
      }
    });

    axios.get(configFromStore.ip + "/permisos/menuClientes/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoClientes = false
      } else if (resultado.data === 0) {
        this.permisoClientes = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoClientes = true
      }
    });

    axios.get(configFromStore.ip + "/permisos/menuReportes/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoReportes = false
      } else if (resultado.data === 0) {
        this.permisoReportes = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoReportes = true
      }
    });

    axios.get(configFromStore.ip + "/permisos/menuConfig/" + this.idRol).then((resultado) => {
      if (resultado.data === 1) {
        this.permisoConfig = false
      } else if (resultado.data === 0) {
        this.permisoConfig = true
      } else {
        console.log("Error al obtener los permisos del menu")
        this.permisoConfig = true
      }
    });

    axios.get(configFromStore.ip + "/permisos/menuAcercade/" + this.idRol).then((resultado) => {
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
    changeTab(newTabName) {
      this.tab = newTabName;
      if (newTabName === 'tab1') {
        console.log("Tab servicios")
      } else if (newTabName === 'tab2') {
        console.log("Tab observaciones")
      }
    },

    onNotificationClick2() {

      this.obtenerCantidadNotificaciones();
      console.log('Evento recibido en MainLayout.vue');
    },
    navigateToService(serviceId) {
      this.$router.push(`/historial-servicio/${serviceId}`);
    },

    cerrarSesion() {
      console.log("Cerrando sesión...");
    },

    obtenerCantidadNotificaciones() {
      const userId = this.userIniciado.idUsuario;
      const obtenerNotificacionesServicios = axios.get(configFromStore.ip + `/servicios/notificaciones/${userId}`);
      const obtenerNotificacionesObservaciones = axios.get(configFromStore.ip + `/observaciones/noVistoNotifi?IdUsuario=${userId}`);

      Promise.all([obtenerNotificacionesServicios, obtenerNotificacionesObservaciones])
        .then(([serviciosResponse, observacionesResponse]) => {
          const notificacionesServicios = serviciosResponse.data.length;
          const notificacionesObservaciones = observacionesResponse.data.length;

          const totalNotificaciones = notificacionesServicios + notificacionesObservaciones;
          this.badgeCount = totalNotificaciones;
        })
        .catch((error) => {
          console.error('Error al obtener la cantidad de notificaciones', error);
        });
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
    },

    getObservacionesNotifi2() {
      try {
        // const response = axios.get(configFromStore.ip + `/observaciones/noVistoNotifi?IdUsuario=${this.idUsuario}`);
        axios.get(configFromStore.ip + `/observaciones/noVistoNotifi?IdUsuario=${this.idUsuario}`).then((resultado) => {
          this.observacionesNotifi = resultado.data;
          console.log(this.observacionesNotifi)
        });
      } catch (error) {
        console.error('Error al recuperar las notificaciones de las observaciones ', error);
      }
    },

    handleObservacionesClick(serviceId) {
      this.$router.push({ name: 'home' });
      setTimeout(() => {
        this.$router.push({ name: 'historial-servicio', params: { id: serviceId } });
      }, 0.5);

    },

  },

  mounted() {
    this.obtenerCantidadNotificaciones();
    this.intervalId = setInterval(this.obtenerCantidadNotificaciones, 10000);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  setup() {
    const observacionesNotifi = ref([]);
    const tab = ref('tab1')
    const leftDrawerOpen = ref(false)
    const puesto = ref(useAuth.user.nombreCompleto);
    const idRol = ref(useAuth.user.idRol);
    const idUsuario = ref(useAuth.user.idUsuario);
    const userIniciado = ref(useAuth.user);
    const permisoUsuarios = ref(true);
    const permisoServicios = ref(true);
    const permisoClientes = ref(true);
    const permisoReportes = ref(true);
    const permisoConfig = ref(true);
    const permisoAcercade = ref(true);
    const badgeCount = ref(0);
    const updateBadgeCount = (count) => {
      badgeCount.value = count;

    };

    const getObservacionesNotifi = async () => {
      try {
        const response = await axios.get(configFromStore.ip + `/observaciones/noVistoNotifi?IdUsuario=${idUsuario.value}`);
        observacionesNotifi.value = response.data;
      } catch (error) {
        console.error('Error al recuperar las notificaciones de las observaciones ', error);
      }
    };

    onMounted(getObservacionesNotifi);

    return {
      observacionesNotifi,
      leftDrawerOpen,
      puesto,
      idRol,
      permisoUsuarios,
      permisoServicios,
      permisoClientes,
      permisoReportes,
      permisoConfig,
      badgeCount,
      updateBadgeCount,
      permisoAcercade,
      userIniciado,
      tab,
      idUsuario,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>

<style scoped>
.custom-image {
  max-height: 30px;
  width: auto;
}

.espacio-left-dropdown {
  padding-left: 10px;
}
</style>

