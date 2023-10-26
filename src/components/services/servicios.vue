<template>
  <q-page class="color-fondo">
    <!-- Sección de las 4 cards de la parte superior -->
    <div class="espacio-borde-cards">
      <q-card class="bg-transparent no-shadow no-border" bordered>
        <q-card-section class="q-pa-none">
          <div class="row q-col-gutter-sm">
            <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
              <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
                <q-item-section v-if="item.icon_position === 'left'" side :style="`background-color: ${item.color2}`"
                  class="q-pa-lg q-mr-none text-white">
                  <q-icon :name="item.icon" color="white" size="24px"></q-icon>
                </q-item-section>
                <q-item-section class="q-pa-md q-ml-none text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
                  <q-item-label>{{ item.title }}</q-item-label>
                </q-item-section>
                <q-item-section v-if="item.icon_position === 'right'" side class="q-mr-md text-white">
                  <q-icon :name="item.icon" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Sección de la tabla de servicios -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table ref="myTable" class="no-shadow" :rows="filteredServices" :columns="columns" title="Servicios"
              :hide-header="mode === 'grid'" :rows-per-page-options="[10000]" row-key="idServicio" :filter="filter"
              no-data-label="No hay Servicios" no-results-label="No se encuentra un servicio que coincida">

              <template v-slot:top-right="props">
                <div class="q-mr-md">
                  <!-- Agregar menú desplegable para seleccionar el filtro -->
                  <q-select v-model="selectedFilterModel" :options="filterOptions" label="Filtrar" emit-value map-options
                    dense outlined class="q-select-filter" />
                </div>
                <q-input borderless dense outlined debounce="300" v-model="filter" placeholder="Buscar">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="toggleTableFullscreen" v-if="mode === 'list'" class="q-px-sm">
                  <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                    {{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                  </q-tooltip>
                </q-btn>
                <q-btn color="primary" label="Crear Servicio" @click="showDialogCreate = true" />
              </template>
              <template v-slot:body-cell="props2">
                <q-td :props="props2">
                  <template v-if="props2.col.field === 'Editar/Ver'">
                    {{ props2.row[props2.col.field] }}
                    <q-btn flat round dense color="primary" icon="edit" @click="openEditDialog(props2.row)" />
                    <router-link :to="{ name: 'historial-servicio', params: { id: props2.row.idServicio } }">
                      <template v-slot:default="{ navigate, href }">
                        <q-btn flat round dense color="primary" icon="list" @click="navigate" :href="href">
                        </q-btn>
                      </template>
                    </router-link>
                  </template>
                  <template v-else>
                    {{ props2.row[props2.col.field] }}
                  </template>
                </q-td>
              </template>
              <template v-slot:body-cell-estado="props2">
                <q-td :props="props2" :class="{
                  'bg-azulverde-4': props2.row.estado === 'Completado',
                  'bg-green-4': props2.row.estado === 'Inicio',
                  'bg-blue-4': props2.row.estado === 'En Proceso',
                  'bg-yellow-4': props2.row.estado === 'Pendiente',
                  'bg-red-4': props2.row.estado === 'No Completado',
                }">
                  {{ props2.row.estado }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="showDialogCreate" ref="dialogCreate" persistent no-backdrop>
      <!-- Escucha el evento 'usuarioCreado' y actualiza la tabla -->
      <FormularioCrearServicio @cerrarDialogo="showDialogCreate = false" @servicio-creado="loadServices"
        v-if="showDialogCreate" />
    </q-dialog>
    <q-dialog v-model="showDialogEdit" ref="dialogEdit" persistent>
      <FormularioEditarServicio :servicioEditar="servicioAEditar" @cerrarDialogo="closeEditDialog"
        @servicioEditado="loadServices" />
    </q-dialog>
  </q-page>
</template>

<script>

import { ref } from 'vue';
import axios from 'axios';
import FormularioCrearServicio from './FormularioCrearServicio.vue';
import FormularioEditarServicio from './FormularioEditarServicio.vue';

export default {
  name: 'ServiciosPage',

  components: {
    FormularioCrearServicio,
    FormularioEditarServicio
  },

  data() {
    return {
      date: ref(null),
      mode: 'list',
      showDialogCreate: false,
      filteredServices: [],
      filter: '',
      selectedFilter: '',
      services: [], // Agrega esta variable
      showDialogEdit: false, // Variable para controlar la visibilidad del cuadro de diálogo de edición
      servicioAEditar: null, // Variable para almacenar el servicio que se va a editar


      columns: [
        { name: 'idServicio', align: 'left', label: 'Código', field: 'idServicio', sortable: true },
        { name: 'razonSocial', align: 'left', label: 'Razon Social', field: 'razonSocial', sortable: true },
        { name: 'usuarioCreado', align: 'left', label: 'Supervisor', field: 'usuarioCreado', sortable: true },
        { name: 'usuarioAsignado', align: 'left', label: 'Usuario', field: 'usuarioAsignado', sortable: true },
        { name: 'fecha', align: 'left', label: 'Fecha Inicio', field: 'fecha', sortable: true },
        { name: 'tituloservicio', align: 'left', label: 'Titulo Servicio', field: 'tituloservicio', sortable: true },
        { name: 'Editar/Ver', align: 'left', label: 'Editar/Historial', field: 'Editar/Ver', sortable: true },
        { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: false },
      ],
      items: [
        {
          title: 'Total de Servicios',
          icon: 'settings',
          color1: '#BDBDBD',
          color2: '#838383',
          value: 0, // Inicializado en 0
          icon_position: 'left', // Posición del icono

        },
        {
          title: 'Completados',
          icon: 'check_circle',
          color1: '#238b23',
          color2: '#185f18',
          value: 0, // Inicializado en 0
          icon_position: 'left', // Posición del icono

        },
        {
          title: 'En Proceso',
          icon: 'hourglass_empty',
          color1: '#1162c6',
          color2: '#0b3b77',
          value: 0, // Inicializado en 0
          icon_position: 'left', // Posición del icono

        },
        {
          title: 'Pendientes',
          icon: 'warning',
          color1: '#FFA500', // Amarillo oscuro
          color2: '#FF8C00',
          value: 0, // Inicializado en 0
          icon_position: 'left', // Posición del icono

        },
      ],
    };
  },
  computed: {
    filterOptions() {
      // Define las opciones de filtro por estado
      return [
        { label: 'Todos', value: '' },
        { label: 'Inicio', value: 'Inicio' },
        { label: 'Completado', value: 'Completado' },
        { label: 'En Proceso', value: 'En Proceso' },
        { label: 'Pendiente', value: 'Pendiente' },
        { label: 'No Completado', value: 'No Completado' },
      ];
    },
    selectedFilterModel: {
      get() {
        return this.selectedFilter;
      },
      set(value) {
        this.selectedFilter = value;
        this.filterServices();
      },
    },

  },
  methods: {
    // Función para cargar los servicios desde el backend
    loadServices() {
      axios.get('http://localhost:8181/servicios')
        .then((response) => {
          this.services = response.data;
          this.filteredServices = this.services;
          this.updateCardValues();
          console.log('Servicios cargados:', this.services); // Agrega este console.log
        })
        .catch((error) => {
          console.error('Error al cargar los servicios:', error);
        });
    },
    filterServices() {
      if (this.selectedFilter === '') {
        this.filteredServices = this.services; // Muestra todos los servicios si no hay filtro
      } else {
        this.filteredServices = this.services.filter(service => service.estado === this.selectedFilter);
      }
    },
    // Actualiza los valores de las tarjetas
    updateCardValues() {
      // Actualiza el total de servicios
      this.items[0].value = this.filteredServices.length;

      // Filtra los servicios completados
      const completados = this.filteredServices.filter((servicio) => servicio.estado === 'Completado');
      this.items[1].value = completados.length;

      // Filtra los servicios en proceso
      const enProceso = this.filteredServices.filter((servicio) => servicio.estado === 'En Proceso');
      this.items[2].value = enProceso.length;

      // Filtra los servicios pendientes
      const pendientes = this.filteredServices.filter((servicio) => servicio.estado === 'Pendiente');
      this.items[3].value = pendientes.length;
    },

    // Método para abrir el diálogo de edición
    openEditDialog(servicio) {
      this.servicioAEditar = servicio; // Asigna el servicio a editar
      this.showDialogEdit = true; // Abre el cuadro de diálogo de edición
    },

    // Método para cerrar el diálogo de edición
    closeEditDialog() {
      this.showDialogEdit = false; // Cierra el cuadro de diálogo de edición
      this.servicioAEditar = null; // Limpia los datos del servicio a editar
    },

  },
  mounted() {
    this.loadServices();
  },
};
</script>

<style scoped>
.espacio-borde-cards {
  padding: 10px;
}

.espacio-borde-izquierda-form {
  margin-left: 20px;
}

.espacio-borde-table {
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}

.color-fondo {
  background-color: #EEEEEE;
}

/* Clases de fondo para diferentes estados */
.bg-green-4 {
  background-color: green;
  /* Cambia este color según tus preferencias */
}

.bg-azulverde-4 {
  background-color: rgb(62, 193, 162);
  /* Cambia este color según tus preferencias */
}

.bg-blue-4 {
  background-color: blue;
  /* Cambia este color según tus preferencias */
}

.bg-yellow-4 {
  background-color: yellow;
  /* Cambia este color según tus preferencias */
}

/* Estilo personalizado para el menú desplegable */
.q-select-filter {
  width: 160px;
  /* Ancho personalizado */

  /* Bordes redondeados */
  background-color: #f9f9f9;
  /* Color de fondo */
}

.q-select-filter .q-field__inner {
  padding: 6px 10px;
  /* Espaciado interior */
}

.q-select-filter .q-field__input {
  font-size: 14px;
  /* Tamaño de fuente */
}
</style>
