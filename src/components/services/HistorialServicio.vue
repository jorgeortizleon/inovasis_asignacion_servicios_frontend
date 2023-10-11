<template>
  <q-page class="color-fondo">
    <!-- Sección de las 6 tarjetas -->
    <div class="espacio-borde-cards">
      <div class="row q-col-gutter-sm">
        <!-- Tarjeta de Ventas -->
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-8'" class="text-white">
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Titulo del servicio</div>
                  <div class="text-h5">{{ items[0].value }}</div> <!-- Usar el valor de Ventas -->
                </div>
                <div class="col-2">
                  <q-icon size="62px" name="trending_up"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Tarjeta de Metas -->
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section :class="$q.dark.isActive ? 'green_dark' : 'bg-green-8'" class="text-white">
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Última modificación</div>
                  <div class="text-h5">{{ items[1].value }}</div> <!-- Usar el valor de Metas -->
                </div>
                <div class="col-2">
                  <q-icon size="62px" name="far fa-dot-circle"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Tarjeta de Último Estado -->
    <div class="col-md-4 col-sm-12 col-xs-12">
      <q-card>
        <q-card-section :class="estadoColor">
          <div class="row">
            <div class="col-10">
              <div class="text-h6">Último Estado</div>
              <div class="text-h5">
                <q-icon name="arrow_downward" />
                {{ items[2].value }} <!-- Usar el valor de % Cambio -->
              </div>
            </div>
            <div class="col-2">
              <q-icon size="62px" name="compare_arrows" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</div>
      <div class="espacio-borde-cards">
      <div class="row q-col-gutter-sm">
        <!-- Tarjeta de Ventas -->
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section>
              <div class="text-h6">Información del Servicio</div>
              <div class="text-h7">
                Fecha de inicio: {{ servicioDetails.fecha }}
              </div>
              <div class="text-h7">
                Usuario Asignado: {{ servicioDetails.usuarioAsignado }}
              </div>
              <div class="text-h7">
                Supervisor: {{ servicioDetails.usuarioCreado }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section>
              <div class="text-h6">Información del Cliente</div>
              <div class="text-h7">
                Razón Social: {{ servicioDetails.razonSocial }}
              </div>
              <div v-if="mostrarCamposAdicionales">
                <div class="text-h7">Campos Adicionales Necesarios</div>
                <ul>
                  <li class="text-h7" v-if="servicioDetails.empresaPoliza === 1">Empresa de la Póliza</li>
                  <li class="text-h7" v-if="servicioDetails.hojaRemision === 1">Hoja de Remisión</li>
                  <li class="text-h7" v-if="servicioDetails.factura === 1">Factura</li>
                  <li class="text-h7" v-if="servicioDetails.hojaServicio === 1">Hoja de Servicio</li>
                </ul>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card>
          <q-card-section>
            <div class="text-h6">Observaciones</div>
            <div v-for="(line, index) in items[5].lines" :key="index" style="font-size: 16px; color: black;">{{ line }}</div>
           
          </q-card-section>
        </q-card>
        </div>
        </div>
        </div>
      <!-- Sección de la tabla de servicios -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table
              ref="myTable"
              class="no-shadow"
              :rows="filteredServices"
              :columns="historialColumns"
              title="Historial del servicio "
              :hide-header="mode === 'grid'"
              :rows-per-page-options="[10000]"
            >
            <template v-slot:top-right="">
        <q-btn @click="abrirDialogoObservacion" label="Agregar Observación" color="primary" />
            </template>
              <template v-slot:body-cell-descripcion="props2">
                <q-td :props="props2" :class="{
                  'bg-azulverde-4': props2.row.descripcion === 'Completado',
                  'bg-green-4': props2.row.descripcion === 'Inicio',
                  'bg-blue-4': props2.row.descripcion === 'En Proceso',
                  'bg-yellow-4': props2.row.descripcion === 'Pendiente'
                }">
                  {{ props2.row.descripcion }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
          <!-- Diálogo para agregar observación -->
          <q-dialog v-model="mostrarDialogoObservacion" persistent no-backdrop>
          <q-card style="width: 30%; max-height: 70vh;">
            <q-card-section>
              <q-input
                v-model="nuevaObservacion"
                label="Nueva Observación"
                type="textarea"
                class="q-ma-none full-width" 
              />
            </q-card-section>
            <q-card-actions>
              <q-btn flat label="Cerrar" color="red" @click="cerrarDialogoObservacion"/>
              <q-space></q-space>
              <q-btn flat label="Editar" color="green" @click="guardarObservacion"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>
  
<script>

import { ref, } from 'vue';
import axios from 'axios';

export default {
  name: 'ServiciosPage',

  components: {
    
  },

  data() {
    return {
      mode: 'list',
      filteredServices: [],
      filter: '',
      selectedFilter: '',
      estadoColor: '', 
      services: [], 
      servicioDetails: {}, // Almacena los detalles del servicio
      estadoFinal: '',
      mostrarDialogoObservacion: false,
      historialColumns: [
        { name: 'nombreCompleto', align: 'left', label: 'Usuario Cambio', field: 'nombreCompleto', sortable: true },
        { name: 'descripcionCambio', align: 'left', label: 'Descripción del Cambio', field: 'descripcionCambio', sortable: false },
        { name: 'fechaCambio', align: 'left', label: 'Fecha de Cambio', field: 'fechaCambio', sortable: true },
        { name: 'descripcion', align: 'center', label: 'Estado', field: 'descripcion', sortable: false },

      ],
      items: [
       
        {
          title: 'Titulo del servicio',
          icon: 'info',
          color1: '#1162c6',
          color2: '#0b3b77',
          value:'',
          icon_position: 'left', // Posición del icono
        },
        {
          title: 'Última modificación',
          icon: 'schedule',
          color1: '#1162c6',
          color2: '#0b3b77',
          value: '', 
          icon_position: 'left', // Posición del icono
        },
        {
          title: 'Último estado',
          icon: 'donut_large',
          color1: '#FFA500', // Amarillo oscuro
          color2: '#FF8C00',
          value: '', // Inicializado en 0
          icon_position: 'left', // Posición del icono
        },

        {
        title: '',
        color1: '#FFFFFF',
        lines: [], // Inicializa lines como un arreglo vacío para contener las líneas de texto
      },
      {
        title: '',
        color1: '#FFFFFF',
        lines: [],
      },
      {
        title:'',
        color1: '#FFFFFF',
        lines: [],
      },

      ],
    };
  },
  computed: {
    ultimoEstadoTexto() {
    if (this.servicioDetails.estado === 'Completado') {
      return 'Completado';
    } else if (this.servicioDetails.estado === 'En Proceso') {
      return 'En Proceso';
    } else if (this.servicioDetails.estado === 'Pendiente') {
      return 'Pendiente';
    } else {
      return 'Desconocido'; // Puedes cambiar esto a un valor predeterminado si es necesario
    }
  },

  mostrarCamposAdicionales() {
    return (
      this.servicioDetails.empresaPoliza === 1 ||
      this.servicioDetails.hojaRemision === 1 ||
      this.servicioDetails.factura === 1 ||
      this.servicioDetails.hojaServicio === 1
    );
  }
    
  },
  methods: {
    // Función para cargar los hsitorial de los servicios desde el backend
    loadServices() {
  const idServicio = this.$route.params.id;
  const apiUrl = `http://localhost:8181/historialServicio?idServicio=${idServicio}`;

  axios.get(apiUrl)
    .then((response) => {
      this.services = response.data;
      this.filteredServices = this.services;

      // Obtén el estado final del último historial de servicio
      const ultimoHistorial = response.data[response.data.length - 1];
      this.estadoFinal = ultimoHistorial.descripcion;

      this.items[1].value = ultimoHistorial.fechaCambio;

      // Actualiza el color de la tarjeta "estado" según el estado final
      if (this.estadoFinal === 'Completado') {
        this.estadoColor  = 'bg-green-4'; // Verde
      } else if (this.estadoFinal === 'En Proceso') {
        this.estadoColor  = 'bg-azulverde-4';
      } else if (this.estadoFinal === 'Pendiente') {
        this.estadoColor  = 'bg-yellow-4';
      }

      console.log('historial cargados:', this.services);
    })
    .catch((error) => {
      console.error('Error al cargar los servicios:', error);
    });
},
     // Función para cargar los detalles de un servicio específico
     loadServiceDetails() {
      const idServicio = this.$route.params.id; // Obtén el idServicio del URL
      const apiUrl = `http://localhost:8181/servicios/${idServicio}`; // Reemplaza con la URL correcta para obtener detalles del servicio

      axios.get(apiUrl)
        .then((response) => {
          this.servicioDetails = response.data;
          // Actualiza los detalles del servicio en la tarjeta "Detalles del servicio"
          this.items[0].value = this.servicioDetails.tituloservicio;
          //this.items[0].value.descripcion = this.servicioDetails.descripcion;
          //this.items[0].value.usuarioAsignado = this.servicioDetails.usuarioAsignado;
          //this.items[0].value.fecha = this.servicioDetails.fecha;


          // Actualiza el valor de la tarjeta "Último estado"
      if (this.servicioDetails.estado === 'Completado') {
        this.items[2].value = 'Completado';
      } else if (this.servicioDetails.estado === 'En Proceso') {
        this.items[2].value = 'En Proceso';
      } else if (this.servicioDetails.estado === 'Pendiente') {
        this.items[2].value = 'Pendiente';
      } else {
        this.items[2].value = 'Desconocido';
      }
     // Crear un arreglo de líneas de texto
     const detallesServicio = [
          'Información del servicio',
          `Fecha de creación: ${this.servicioDetails.fecha}`,
          `Usuario Asignado: ${this.servicioDetails.usuarioAsignado}`,
          `Supervisor: ${this.servicioDetails.usuarioCreado}`
        ];

        // Asignar el arreglo de líneas al objeto 'lines'
        this.items[3].lines = detallesServicio;

        // Crear un arreglo de líneas de texto para "Información del cliente"
      const detallesCliente = [
        'Información del cliente',
        `Razón Social: ${this.servicioDetails.razonSocial}`,
      ];

      let mostrarCamposAdicionales = false;

      // Verifica tus condiciones para determinar si se muestran los campos adicionales
      if (this.servicioDetails.empresaPoliza === 1 || this.servicioDetails.hojaRemision === 1 || this.servicioDetails.factura === 1 || this.servicioDetails.hojaServicio === 1) {
        mostrarCamposAdicionales = true;
        detallesCliente.push('Se necesita:'); 
        if (this.servicioDetails.empresaPoliza === 1) {
          detallesCliente.push('- Empresa de la Póliza');
        }
        if (this.servicioDetails.hojaRemision === 1) {
          detallesCliente.push('- Hoja de Remisión');
        }
        if (this.servicioDetails.factura === 1) {
          detallesCliente.push('- Factura');
        }
        if (this.servicioDetails.hojaServicio === 1) {
          detallesCliente.push('- Hoja de Servicio');
        }
      }

      this.items[4].lines = detallesCliente;

      console.log('servicio cargados:', this.servicioDetails);
   
    })
        
        .catch((error) => {
          console.error('Error al cargar estados:', error);
        });
    },
        // Observaciones
        abrirDialogoObservacion() {
      this.mostrarDialogoObservacion = true;
    },

    cerrarDialogoObservacion() {
      this.mostrarDialogoObservacion = false;
      this.nuevaObservacion = '';
    },

    cargarObservacionDesdeBackend() {
  const idServicio = this.$route.params.id; // Obtén el ID del servicio
  const apiUrl = `http://localhost:8181/servicios/${idServicio}/observaciones`;

  axios.get(apiUrl)
    .then((response) => {
      console.log('Observación recuperada del backend:', response.data);
      this.observacion = response.data.Observaciones; // Asignar solo el valor de Observaciones

      const detalleObservacion = [

        this.observacion // Agregar la observación recuperada
      ];
      this.items[5].lines = detalleObservacion;

    })
    .catch((error) => {
      console.error('Error al cargar observación desde el backend:', error);
    });
},

guardarObservacion() {
  // Validar que la observación no esté vacía
  if (!this.nuevaObservacion.trim()) {
    // Muestra un mensaje de error al usuario
    this.$q.notify({
      color: 'negative',
      icon: 'report_problem',
      message: 'La observación no puede estar vacía.',
    });
    return; // Salir del método si la validación falla
  }

  const idServicio = this.$route.params.id;
  const apiUrl = `http://localhost:8181/servicios/editar/${idServicio}`;

  // Datos a enviar al servidor
  const data = {
    observaciones: this.nuevaObservacion,
    // Otros datos relacionados con la observación si es necesario
  };

  axios
    .put(apiUrl, data)
    .then((response) => {
      // Manejar la respuesta si es necesario
      console.log('Observación guardada con éxito', response.data);

      // Actualizar la observación con la nueva observación
      this.observacion = this.nuevaObservacion;

      // Cerrar el diálogo
      this.cargarObservacionDesdeBackend();

      // Mostrar un mensaje de éxito al usuario
      this.$q.notify({
        color: 'positive',
        icon: 'check',
        message: 'Observación creada correctamente.',
      });

      this.cerrarDialogoObservacion();
    })
    .catch((error) => {
      // Manejar errores si es necesario
      console.error('Error al guardar observación:', error);

      // Mostrar un mensaje de error al usuario
      this.$q.notify({
        color: 'negative',
        icon: 'report_problem',
        message: 'Error al guardar observación.',
      });
    });
},
  },
  mounted() {
    this.loadServices();
    this.loadServiceDetails();
    this.cargarObservacionDesdeBackend();
  },
};
</script>
  
  <style scoped>
  .espacio-borde-cards {
    padding: 10px;
  }
  
  .espacio-borde-table {
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }
  
  .color-fondo {
    background-color: #EEEEEE;
  }
  
  /* Clases de fondo para diferentes descripcions */
  .bg-green-4 {
    background-color: green; /* Cambia este color según tus preferencias */
  }
  .bg-azulverde-4 {
    background-color: rgb(62, 193, 162); /* Cambia este color según tus preferencias */
  }
  .bg-blue-4 {
    background-color: blue; /* Cambia este color según tus preferencias */
  }
  
  .bg-yellow-4 {
    background-color: yellow; /* Cambia este color según tus preferencias */
  }

  </style>
  