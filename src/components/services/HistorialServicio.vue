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
                <!-- <div class="col-2">
                  <q-icon size="62px" name="trending_up"/>
                </div> -->
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
                  <q-icon size="62px" name="history" />
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
                    <!-- <q-icon name="arrow_downward" /> -->
                    {{ items[2].value }} <!-- Usar el valor de % Cambio -->
                  </div>
                </div>
                <div class="col-2">
                  <q-icon size="62px" name="api" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!-- <q-card >
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
          </q-card> -->
    <!-- --------------------- -->
    <div class="espacio-borde-cards">
      <div class="row q-col-gutter-sm ">
        <!-- Tarjeta de Ventas -->
        <div class="col-md-4 col-sm-12 col-xs-12">
          <div class="q-card">
            <q-card-section>
              <div class="text-h6">Información del Servicio</div>
            </q-card-section>
            <div style="display: flex;">

              <!-- Primera columna con título y subtitulo -->
              <div style="flex: 1; padding: 16px;">
                <div class="text-h6">No/ID</div>
                <div class="text-h7">{{ idServicioGen }}</div>
              </div>

              <!-- Segunda columna con título y texto -->
              <div style="flex: 1; padding: 16px;">
                <div class="text-h6">Fecha de inicio</div>
                <div class="text-h7">{{ servicioDetails.fecha }}</div>
              </div>
            </div>
            <div style="display: flex;">
              <!-- Primera columna con título y subtitulo -->
              <div style="flex: 1; padding: 16px;">
                <div class="text-h6">Supervisor</div>
                <div class="text-h7">{{ servicioDetails.usuarioCreado }}</div>
              </div>

              <!-- Segunda columna con título y texto -->
              <div style="flex: 1; padding: 16px;">
                <div class="text-h6">Asignado</div>
                <div class="text-h7">{{ servicioDetails.usuarioAsignado }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Segundo card -->
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section>
              <div class="text-h6">Información del Cliente</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h6">
                Clave
              </div>
              <div class="text-h7">
                {{ servicioDetails.codigoCliente }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h6">
                Razón Social
              </div>
              <div class="text-h7">
                {{ servicioDetails.razonSocial }}
              </div>
            </q-card-section>
            <!-- </q-card-section>
              <div v-if="mostrarCamposAdicionales">
                <div class="text-h7">Campos Adicionales Necesarios</div>
                <ul>
                  <li class="text-h7" v-if="servicioDetails.empresaPoliza === 1">Empresa de la Póliza</li>
                  <li class="text-h7" v-if="servicioDetails.hojaRemision === 1">Hoja de Remisión</li>
                  <li class="text-h7" v-if="servicioDetails.factura === 1">Factura</li>
                  <li class="text-h7" v-if="servicioDetails.hojaServicio === 1">Hoja de Servicio</li>
                </ul>
              </div>
            </q-card-section> -->
          </q-card>
        </div>
        <!-- tercer card -->

        <div class="col-md-4 col-sm-12 col-xs-12">
          <!-- <q-card style="height: 235px;">
            <q-card-section>
              <div class="row items-center">
                <div class="col">
                  <div class="text-h6">Observaciones</div>
                </div>
                <div class="col-auto">
                  <q-btn @click="abrirDialogoObservacion" label="Ver mas" color="primary" />
                </div>
              </div>
            </q-card-section>
            <q-card-section class="custom-card-section">
              <div v-for="(line, index) in items[5].lines" :key="index" style="font-size: 16px; color: black;">
                <p :title="line">
                  {{ line }}
                </p>
              </div>
            </q-card-section>
          </q-card> -->

          <!-- <div class="col-4">
            <q-toolbar>
              <q-toolbar-title class="text-overline">Observaciones</q-toolbar-title>
              <q-btn flat text-color="light-blue-8" label="Ver mas"></q-btn>
            </q-toolbar>
            <q-card class="my-card q-py-sm" style="height: 88px; overflow: hidden;">
              <q-item>
                <q-item-section>
                  <q-item-label><strong>Observacion 1</strong></q-item-label>
                  <p>Contenido del Observacion 1 </p>
                </q-item-section>
              </q-item>
            </q-card>
            <q-card class="my-card q-py-sm q-mt-sm" style="height:87px; overflow: hidden;">
              <q-item>
                <q-item-section>
                  <q-item-label><strong>Observacion 2</strong></q-item-label>
                  <p>Contenido del Observacion 2 </p>
                </q-item-section>
              </q-item>
            </q-card>
          </div> -->
          <div class="col-4">
            <q-toolbar>
              <q-toolbar-title class="text-h6">Observaciones</q-toolbar-title>
              <q-btn color="primary" @click="openObservacionesDialog()" label="Ver más"><q-badge color="red" rounded
                  floating v-if="observacionesNoVitso > 0">{{ observacionesNoVitso }}</q-badge></q-btn>
            </q-toolbar>
            <div v-if="observaciones.length > 0">
              <div v-for="(observacion, index) in observaciones" :key="index">
                <div v-if="index < 2" class="espacio-cards-observaciones">
                  <q-card class="my-card q-py-sm "
                    style="height: 87px; overflow: hidden; border-radius: 10px; position: relative;">
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-caption text-grey">{{ reformatDateAndTime(observacion.fechaRegistro)
                        }}</q-item-label>
                        <q-badge rounded color="red" floating v-if="observacion.visto === 0"
                          style="position: absolute; z-index: 9999; right: 4px;" />
                        <p :title="observacion.observacion">
                          <strong>{{ observacion.nombreCompleto }}:</strong> {{ observacion.observacion }}
                        </p>
                      </q-item-section>
                    </q-item>
                  </q-card>
                </div>
              </div>
            </div>
            <div v-else>
              <p>No hay observaciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- los dos cards abajo de los 3 -->
    <div class="row q-col-gutter-sm q-py-sm espacio-borde-cards">
      <!-- primer card -->
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="fit no-shadow" bordered>
          <q-card-section>
            <div class="row justify-center">
              <div class="col-6">
                <div class="text-h6">Requisitos</div>
              </div>
              <div class="col-6 text-right">
                <q-btn @click="abrirShowDialogRequisitos" label="Agregar o Editar " color="primary" />
              </div>
              <!-- Checkbox 1 y 2 a la izquierda -->
              <div class="col-6">
                <q-checkbox disable size="lg" v-model="checkbox1" label="Hoja de Servicio"></q-checkbox>
              </div>
              <div class="col-6">
                <q-checkbox disable size="lg" v-model="checkbox2" label="Factura"></q-checkbox>
              </div>
              <!-- Checkbox 3 y 4 a la derecha -->
              <div class="col-6">
                <q-checkbox disable size="lg" v-model="checkbox3" label="Remisión"></q-checkbox>
              </div>
              <div class="col-6">
                <q-checkbox disable size="lg" v-model="checkbox4" label="Empresa de Póliza"></q-checkbox>
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>
      <!-- segundo card -->
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card no-shadow" bordered>
          <q-card-section>
            <div class="text-h6">
              Descripcion del servicio
            </div>
          </q-card-section>
          <q-card-section class="custom-card-section" style="height: 110px; overflow: hidden;">
            <p :title="this.descripcionServicio">
              {{ this.descripcionServicio }}
            </p>
          </q-card-section>
        </q-card>

      </div>
    </div>

    <!-- Sección de la tabla de servicios -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table ref="myTable" class="no-shadow" :rows="filteredServices" :columns="historialColumns"
              title="Historial del servicio " :hide-header="mode === 'grid'" :rows-per-page-options="[10000]">
              <template v-slot:top-right="">
                <q-btn @click="abrirDialogoObservacion" label="Agregar Observación" color="primary" />
              </template>
              <template v-slot:body-cell-descripcion="props2">
                <q-td :props="props2" :class="{
                  'bg-azulverde-4': props2.row.descripcion === 'Completado',
                  'bg-green-4': props2.row.descripcion === 'Inicio',
                  'bg-blue-4': props2.row.descripcion === 'En Proceso',
                  'bg-yellow-4': props2.row.descripcion === 'Pendiente',
                  'bg-red-4': props2.row.descripcion === 'No Completado'
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
              <q-input bottom-slots v-model="nuevaObservacion" label="Nueva Observación" type="textarea"
                hint="Al agregar una nueva observacion la anterior se eliminara" class="q-ma-none full-width" counter
                maxlength="500">
                <template v-slot:append>
                  <q-icon v-if="nuevaObservacion !== ''" name="close" @click="nuevaObservacion = ''"
                    class="cursor-pointer" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions>
              <q-btn flat label="Cerrar" color="red" @click="cerrarDialogoObservacion" />
              <q-space></q-space>
              <q-btn flat label="Editar" color="green" @click="guardarObservacion2" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>

    <!-- Dialogo de agregar o editar los requisitos -->
    <q-dialog v-model="showDialogRequisitos" ref="dialogEditar" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Agregar o Editar Los Requisitos</div>
          <div class="text-subtitle2">{{ nombreEditar }}</div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox1Edit" label="Hoja de Servicio" />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox2Edit" label="Factura" />
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox3Edit" label="Remisión" />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox4Edit" label="Empresa de Póliza" />
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cerrar" color="red" @click="showDialogRequisitos = false" />
          <q-space></q-space>
          <q-btn flat label="Editar" icon-right="edit" color="green" @click="botonEditarRequisitos()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- dialogo para ver todas las observaciones -->
    <q-dialog v-model="showDialogObservaciones" persistent>
      <q-card class="q-dialog color-fondo" style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Observaciones</div>
        </q-card-section>
        <q-card-section>
          <div v-if="observaciones.length > 0">
            <div v-for="(observacion, index) in observaciones" :key="index">
              <div class="espacio-cards-observaciones">
                <q-card class="my-card q-py-sm" style="height: 95px; overflow: hidden; border-radius: 10px;">
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-caption text-grey">{{ reformatDateAndTime(observacion.fechaRegistro)
                      }}</q-item-label>
                      <q-badge rounded color="red" floating v-if="observacion.visto === 0"
                        style="position: absolute; z-index: 9999; right: 4px;" />
                      <p :title="observacion.observacion">
                        <strong>{{ observacion.nombreCompleto }}:</strong> {{ observacion.observacion }}
                      </p>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No hay observaciones</p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="red" @click="closeObservacionesDialog()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>

import { ref, } from 'vue';
import axios from 'axios';
import { useAuthStore } from "src/stores/auth";
import FormularioEditarUsuario from '../users/FormularioEditarUsuario.vue';


export default {
  name: 'ServiciosPage',

  components: {

  },

  data() {
    return {
      observacionesNoVitso: ref(''),
      observaciones: ref([]),
      useAuth: useAuthStore(),
      showDialogRequisitos: ref(false),
      showDialogObservaciones: ref(false),
      nuevaObservacion: ref(""),
      text: ref(''),
      ph: ref(''),
      idServicioGen: "",
      checkbox1: ref(false),
      checkbox2: ref(false),
      checkbox3: ref(false),
      checkbox4: ref(false),
      checkbox1Edit: ref(false),
      checkbox2Edit: ref(false),
      checkbox3Edit: ref(false),
      checkbox4Edit: ref(false),
      descripcionServicio: '',
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
          value: '',
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
          title: '',
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
      } else if (this.servicioDetails.estado === 'Inicio') {
        return 'Inicio'
      } else if (this.servicioDetails.estado === 'No Completado') {
        return 'No Completado'
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
      this.idServicioGen = idServicio
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
            this.estadoColor = 'bg-green-4'; // Verde
          } else if (this.estadoFinal === 'En Proceso') {
            this.estadoColor = 'bg-azulverde-4';
          } else if (this.estadoFinal === 'Pendiente') {
            this.estadoColor = 'bg-yellow-4';
          } else if (this.estadoFinal === 'Inicio') {
            this.estadoColor = 'bg-green-4';
          } else if (this.estadoFinal === 'No Completado') {
            this.estadoColor = 'bg-red-4';
          }

          console.log('historial cargados:', this.services);
        })
        .catch((error) => {
          console.error('Error al cargar los servicios:', error);
        });


      const apiUrl2 = `http://localhost:8181/observaciones/numeroObservacionesNoVisto?IdServicio=${idServicio}`;
      axios.get(apiUrl2).then((response) => {
        this.observacionesNoVitso = response.data;
      })
        .catch((error) => {
          console.error('Error al cargar las observaciones no vistas:', error);
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
          } else if (this.servicioDetails.estado === 'Inicio') {
            this.items[2].value = 'Inicio';
          } else if (this.servicioDetails.estado === 'No Completado') {
            this.items[2].value = 'No Completado';
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

      // obtiene y asigna el valor de los checkbox. Requisitos
      const checkboxRequest = `http://localhost:8181/servicios/obtenerCheckboxServicio/${idServicio}`;
      axios.get(checkboxRequest)
        .then((response) => {
          if (response.data.hojaServicio === 1) {
            this.checkbox1 = true
          } else {
            this.checkbox1 = false
          }
          if (response.data.factura === 1) {
            this.checkbox2 = true
          } else {
            this.checkbox2 = false
          }
          if (response.data.hojaRemision === 1) {
            this.checkbox3 = true
          } else {
            this.checkbox3 = false
          }
          if (response.data.empresaPoliza === 1) {
            this.checkbox4 = true
          } else {
            this.checkbox4 = false
          }
        })
        .catch((error) => {
          console.error('Error al cargar los checkbox desde el backend:', error);
        });

      // obtiene la descripcion del servicio
      const descripcionRequest = `http://localhost:8181/servicios/descripcionServicio/${idServicio}`;
      axios.get(descripcionRequest)
        .then((response) => {
          this.descripcionServicio = response.data;
        })
        .catch((error) => {
          console.error('Error al cargar la descripcion desde el backend:', error);
        });

      // obtner observaciones 2
      const apiUrl2 = `http://localhost:8181/observaciones?id=${idServicio}`;
      axios.get(apiUrl2)
        .then((response) => {
          console.log('Observación2 recuperada del backend:', response.data);
          this.observaciones = response.data;
          // const detalleObservacion = [
          //   this.observacion // Agregar la observación recuperada
          // ];
          // this.items[5].lines = detalleObservacion;
        })
        .catch((error) => {
          console.error('Error al cargar observación desde el backend:', error);
        });
    },

    guardarObservacion2() {
      if (!this.nuevaObservacion.trim()) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: 'La observación no puede estar vacía.',
        });
        return;
      }
      const idUsuario = this.useAuth.user.idUsuario
      const idServicio = this.$route.params.id;
      const apiUrl = `http://localhost:8181/observaciones?IdUsuario=${idUsuario}&IdServicio=${idServicio}&Observacion=${this.nuevaObservacion}`;
      axios.post(apiUrl)
        .then((response) => {
          console.log('Observación guardada con éxito', response.data);
          this.observacion = this.nuevaObservacion;
          this.cargarObservacionDesdeBackend();
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: 'Observación creada correctamente.',
          });
          this.cerrarDialogoObservacion();
        })
        .catch((error) => {
          console.error('Error al guardar observación:', error);
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: 'Error al guardar observación.',
          });
        });
      const apiUrl2 = `http://localhost:8181/observaciones?id=${idServicio}`;
      axios.get(apiUrl2)
        .then((response) => {
          console.log('Observación2 recuperada del backend:', response.data);
          this.observaciones = response.data;
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

      const idUsuario = this.useAuth.user.idUsuario
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

    abrirShowDialogRequisitos() {
      this.checkbox1Edit = this.checkbox1;
      this.checkbox2Edit = this.checkbox2;
      this.checkbox3Edit = this.checkbox3;
      this.checkbox4Edit = this.checkbox4;
      this.showDialogRequisitos = true;
    },

    botonEditarRequisitos() {
      if (this.checkbox1Edit === true) {
        this.checkbox1Edit = 1
      } else {
        this.checkbox1Edit = 0
      }
      if (this.checkbox2Edit === true) {
        this.checkbox2Edit = 1
      } else {
        this.checkbox2Edit = 0
      }
      if (this.checkbox3Edit === true) {
        this.checkbox3Edit = 1
      } else {
        this.checkbox3Edit = 0
      }
      if (this.checkbox4Edit === true) {
        this.checkbox4Edit = 1
      } else {
        this.checkbox4Edit = 0
      }
      const idServicio = this.$route.params.id;
      axios.put(`http://localhost:8181/servicios/editarRequisitos?Factura=${this.checkbox2Edit}&HojaServicio=${this.checkbox1Edit}&HojaRemision=${this.checkbox3Edit}&EmpresaPoliza=${this.checkbox4Edit}&idServicio=${idServicio}`)
        .then(response => {
          if (this.checkbox1Edit === 1) {
            this.checkbox1 = true
          } else {
            this.checkbox1 = false
          }
          if (this.checkbox2Edit === 1) {
            this.checkbox2 = true
          } else {
            this.checkbox2 = false
          }
          if (this.checkbox3Edit === 1) {
            this.checkbox3 = true
          } else {
            this.checkbox3 = false
          }
          if (this.checkbox4Edit === 1) {
            this.checkbox4 = true
          } else {
            this.checkbox4 = false
          }
          this.$q.notify({
            type: "info",
            message: "Requisitos editados con éxito",
            progress: true,
            timeout: 2000,
          });
          console.log(response);
        })
        .catch(error => {
          console.error('Error al editar los Requisitos:', error);
          this.$q.notify({
            type: 'negative',
            progress: true,
            message: "Error: " + error.message,
            timeout: 5000,
          });
        });

      this.showDialogRequisitos = false;
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
      return `${formattedDate} a las ${formattedTime}`;
    },

    openObservacionesDialog() {
      const idServicio = this.$route.params.id;
      const usuarioAsignado = this.useAuth.user.userName
      this.showDialogObservaciones = true
      if (usuarioAsignado === this.servicioDetails.usuarioAsignado) {
        axios.put(`http://localhost:8181/observaciones/observacionVisto?IdServicio=${idServicio}`)

        // Actualizar el numero de los no visto del badge del boton
        const apiUrl1 = `http://localhost:8181/observaciones/numeroObservacionesNoVisto?IdServicio=${idServicio}`;
        axios.get(apiUrl1).then((response) => {
          this.observacionesNoVitso = response.data;
        })

        // obtner observaciones 2
        const apiUrl2 = `http://localhost:8181/observaciones?id=${idServicio}`;
        axios.get(apiUrl2)
          .then((response) => {
            this.observaciones = response.data;
          })
      }
    },

    closeObservacionesDialog() {
      const idServicio = this.$route.params.id;
      const usuarioAsignado = this.useAuth.user.userName
      if (usuarioAsignado === this.servicioDetails.usuarioAsignado) {
        // Actualizar el numero de los no visto del badge del boton
        const apiUrl1 = `http://localhost:8181/observaciones/numeroObservacionesNoVisto?IdServicio=${idServicio}`;
        axios.get(apiUrl1).then((response) => {
          this.observacionesNoVitso = response.data;
        })

        // obtner observaciones 2
        const apiUrl2 = `http://localhost:8181/observaciones?id=${idServicio}`;
        axios.get(apiUrl2)
          .then((response) => {
            this.observaciones = response.data;
          })
      }
      this.showDialogObservaciones = false
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
.espacio-cards-observaciones {
  padding-top: 4px;
}

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

.custom-card-section {
  max-height: 10em;
  /* Altura máxima de 5 líneas */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* Número máximo de líneas */
  -webkit-box-orient: vertical;
}
</style>
