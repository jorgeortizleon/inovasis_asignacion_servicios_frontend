<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Editar Servicio</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form ref="form">
        <div class="q-gutter-md">
          <div class="row items-start"> <!-- Cambiado a 'items-start' para alinear en la parte superior -->
            <div class="col">
              <!-- Código -->
              <q-input filled label="Código"  v-model="idServicio" readonly disabled dense >
                <template v-slot:prepend>
                  <q-icon name="code" />
                </template>
              </q-input>
            </div>
            <div class="q-mr-md"></div> <!-- Espacio pequeño -->

            <div class="col">
              <!-- Razón Social -->
              <q-input filled label="Razón Social"  v-model="razonSocial" readonly disabled dense >
                <template v-slot:prepend>
                  <q-icon name="business" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-start"> <!-- Cambiado a 'items-start' para alinear en la parte superior -->
            <div class="col">
              <!-- Supervisor -->
              <q-input filled label="Supervisor"  v-model="usuarioCreado" readonly disabled dense>
                <template v-slot:prepend>
                  <q-icon name="supervisor_account" />
                </template>
              </q-input>
            </div>
            <div class="q-mr-md"></div> <!-- Espacio pequeño -->

            <div class="col">
              <!-- Usuario -->
              <q-input filled label="Usuario"  v-model="usuarioAsignado" readonly disabled dense >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-start"> <!-- Cambiado a 'items-start' para alinear en la parte superior -->
            <div class="col">
              <!-- Fecha de Inicio -->
              <q-input filled label="Fecha de Inicio"  v-model="fecha" readonly disabled dense >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
            </div>
          </div>
          <!-- Título del Servicio -->
          <q-input filled label="Título del Servicio"  v-model="tituloservicio" readonly disabled dense class="campo-ancho">
            <template v-slot:prepend>
              <q-icon name="title" />
            </template>
          </q-input>
          <!-- Descripción -->
          <q-input filled label="Descripción"  v-model="descripcion" readonly disabled dense class="campo-ancho">
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>
          <!-- Estado -->
          <q-select
            filled
            label="Estado"
            emit-value
            map-options
            dense
            v-model="estado"
            :options="estados"
            class="campo-ancho"
          >
            <template v-slot:prepend>
              <q-icon name="check_circle" />
            </template>
          </q-select>
         <!-- Solución -->
         <q-input
            filled
            label="Descripción cambio"
            dense
            class="campo-ancho"
            v-model="solucion"
            counter maxlength="500"
          >
            <template v-slot:prepend>
              <q-icon name="done" />
            </template>
            <template v-slot:append>
          <q-icon name="close" @click="solucion = ''" class="cursor-pointer" />
        </template>
          </q-input>
        </div>
      </q-form>
    </q-card-section>

    <!-- Factura -->
    <q-checkbox
      label="Factura"
      color="green"
      readonly
      disabled
      dense
      v-if="factura === 1"
    />
    <!-- Hoja de Servicio -->
    <q-checkbox
      label="Hoja de Servicio"
      color="primary"
      readonly
      disabled
      dense
      v-if="hojaServicio === 1"
    />
<!-- Remisión -->
<q-checkbox
  label="Remisión"
  color="orange"
  readonly
  disabled
  dense
  v-if="hojaRemision === 1"
/>
<!-- Empresa Póliza -->
<q-checkbox
  label="Empresa Póliza"
  color="blue"
  readonly
  disabled
  dense
  v-if="empresaPoliza === 1"
/>

    <q-card-actions>
      <q-btn flat label="Cerrar" color="red" @click="cerrarDialogo" />
      <q-space></q-space>
      <q-btn flat label="Editar" color="green" @click="editarServicio" />
    </q-card-actions>
  </q-card>
</template>


<script>
import axios from 'axios';
import { useAuthStore } from "../../stores/auth";
import { ref, } from 'vue';

export default {
  name: 'FormularioEditarServicio',
  props: {
    servicioEditar: Object, // Recibe el usuario que se está editando
  },
  data() {
    return {
      factura: 0, // Debes asignar el valor correcto según tu lógica
      hojaServicio: 0, // Debes asignar el valor correcto según tu lógica
      hojaRemision: 0, // Debes asignar el valor correcto según tu lógica
      empresaPoliza: 0, // Debes asignar el valor correcto según tu lógica
      codigoServicio: '',
      estado: 1,
      fecha: '',
      descripcion:'',
      idServicio: '',
      razonSocial: '',
      tituloservicio: '',
      usuarioAsignado: '',
      usuarioCreado: '',
      solucion: ref(''), // Agrega la propiedad para rastrear la solución
        estados: [
      { label: 'Pendiente', value: 2 },
      { label: 'En Proceso', value: 3 },
      { label: 'Completado', value: 4 },
      { label: 'No Completado', value: 5 },
    ],
    };
  },
  computed: {
  // Observa los cambios en servicioEditar y actualiza los datos del formulario
  servicioEditado: {
    get() {
      return this.servicioEditar; // Retorna el servicio que se está editando
    },
    set(nuevoServicio) {
      // Cuando el servicioEditar cambie, actualiza los datos del formulario
      this.codigoServicio = nuevoServicio.codigoServicio;
      this.estado = nuevoServicio.estado;
      this.fecha = nuevoServicio.fecha;
      this.descripcion = nuevoServicio.descripcion;
      this.idServicio = nuevoServicio.idServicio;
      this.razonSocial = nuevoServicio.razonSocial;
      this.tituloservicio = nuevoServicio.tituloservicio;
      this.usuarioAsignado = nuevoServicio.usuarioAsignado;
      this.usuarioCreado = nuevoServicio.usuarioCreado;
      this.solucion = nuevoServicio.solucion;
      this.factura = nuevoServicio.factura;
      this.hojaServicio = nuevoServicio.hojaServicio;
      this.hojaRemision = nuevoServicio.hojaRemision;
      this.empresaPoliza = nuevoServicio.empresaPoliza;
    },
  },
},
watch: {
  servicioEditar: {
    immediate: true,
    handler(nuevoServicio) {
      // Este watcher se ejecutará inmediatamente cuando el componente se monte y cuando servicioEditar cambie.

      // Actualiza los datos del formulario con el nuevo servicio
      this.codigoServicio = nuevoServicio.codigoServicio;
      this.estado = nuevoServicio.estado;
      this.fecha = nuevoServicio.fecha;
      this.idServicio = nuevoServicio.idServicio;
      this.razonSocial = nuevoServicio.razonSocial;
      this.tituloservicio = nuevoServicio.tituloservicio;
      this.usuarioAsignado = nuevoServicio.usuarioAsignado;
      this.usuarioCreado = nuevoServicio.usuarioCreado;
      this.solucion = nuevoServicio.solucion;
     this.factura = nuevoServicio.factura;
      this.hojaServicio = nuevoServicio.hojaServicio;
      this.descripcion = nuevoServicio.descripcion;
      this.hojaRemision = nuevoServicio.hojaRemision;
      this.empresaPoliza = nuevoServicio.empresaPoliza;

    },
  },
},
  methods: {
    cerrarDialogo() {
      // Cierra el diálogo de edición
      this.$emit('cerrarDialogo');
    },
    async editarServicio() {
    try {
// Validar el formulario antes de enviar los datos al servidor
      const isValid = await this.$refs.form.validate();

      // Verificar si el campo "Solución" está vacío
    if (!this.solucion.trim()) {
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        message: 'El campo "Solución" no puede estar en blanco.',
      });
      return; // Evitar el envío de la solicitud si el campo está vacío
    }

          if (isValid) {

      const useAuth = useAuthStore();
      const idusuario = ref(useAuth.user.idUsuario);

      // Realiza la solicitud PUT para editar el servicio
      const url = `http://localhost:8181/historialServicio/crear?IdServicio=${this.idServicio}&IdUsuario=${idusuario.value}&IdEstadoServicio=${this.estado}&DescripcionCambio=${this.solucion}`;
      //await axios.post(`http://localhost:8181/historialServicio/crear?IdServicio=${this.idServicio}&IdUsuario=${idusuario.value}&IdEstadoServicio=${this.estado}&DescripcionCambio=${this.solucion}`)
      const response = await axios.post(url);

      // Verifica la respuesta del servidor (puede variar según la API)
      if (response.status === 201) {
      // Emite un evento llamado 'servicioEditado'
      this.$emit('servicioEditado');

      // Cierra el diálogo de edición de servicio
      this.$emit('cerrarDialogo');

      // Muestra un mensaje de éxito
      this.$q.notify({
                color: 'positive',
                icon: 'check',
                message: 'Servicio editado correctamente.',
              });
            } else {
              // Muestra un mensaje de error si la respuesta del servidor no es la esperada
              this.$q.notify({
                color: 'negative',
                icon: 'warning',
                message: 'No se pudo editar el servicio. Inténtalo de nuevo más tarde.',
              });
            }
          }
        } catch (error) {
          // Manejo de errores
          console.error('Error al crear el servicio:', error);
          // Muestra un mensaje de error en caso de error
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: 'Los campos deben estar llenados.',
          });
        }
      },

    },
  };
</script>

<style scoped>
.campo-ancho {
  width: 470px; /* Ajusta el ancho según tus preferencias */
}
</style>
