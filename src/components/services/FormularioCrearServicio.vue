<template>
  <q-card style="width: 500px;">
    <q-card-section>
      <div class="text-h6">Crear Servicio</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form ref="form" @submit.prevent="crearServicio" @reset="resetForm" id="create-service-form" class="q-gutter-md">
        <div class="q-gutter-md">
          <div class="row items-center">
            <div class="col">
              <!-- Selector QSelect para Razón Social -->
              <q-select filled v-model="nuevoServicio.razonSocial" label="Razón Social" hint="Seleccione la razón social"
                dense :options="razonSocialOptions">
                <template v-slot:prepend>
                  <q-icon name="business" />
                </template>
              </q-select>
            </div>
            <div class="q-mr-md"></div> <!-- Espacio pequeño -->
            <div class="col">
              <!-- Selector QSelect para Usuario -->
              <q-select filled v-model="nuevoServicio.nombreCompleto" label="Usuario" hint="Seleccione el usuario" dense
                :options="usuarioOptions">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-select>
            </div>
          </div>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="nuevoServicio.tituloservicio" label="Titulo" hint="Titulo del servicio" lazy-rules
            dense counter maxlength="200">
            <template v-slot:prepend>
              <q-icon name="title" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="nuevoServicio.tituloservicio = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="nuevoServicio.descripcion" label="Descripción"
            hint="Introduzca la descripción del servicio" lazy-rules :rules="descripcionRules" dense counter
            maxlength="500">
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="nuevoServicio.descripcion = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <!-- Nuevos checkboxes: Remisión y Empresa de Póliza -->
        <div class="q-gutter-md">
          <div class="row items-center">
            <div class="col">
              <q-checkbox v-model="tipoDocumento" val="hojaDeServicio" color="primary" label="Hoja de Servicio" dense />
            </div>
            <div class="col">
              <q-checkbox v-model="tipoDocumento" val="factura" color="green" label="Factura" dense />
            </div>
            <div class="col">
              <q-checkbox v-model="tipoDocumento" val="remision" color="blue" label="Remisión" dense />
            </div>
            <div class="col">
              <q-checkbox v-model="tipoDocumento" val="empresaPoliza" color="orange" label="Empresa de Póliza" dense />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions>
      <q-btn flat label="Cerrar" color="red" @click="cerrarDialogo" />
      <q-space></q-space>
      <q-btn flat label="Crear" color="green" @click="crearServicio" />
    </q-card-actions>
  </q-card>
</template>

<script>
import axios from 'axios';
import { ref, } from 'vue';
import { configStore } from "src/stores/config.js";
const configFromStore = configStore();


import { useAuthStore } from "../../stores/auth";


export default {
  props: {
    // Puedes agregar props personalizados si es necesario
  },
  data() {
    return {

      nuevoServicio: ref({
        razonSocial: '',
        userName: '',
        nombreCompleto: '',
        tituloservicio: '',
        descripcion: '',
      }),
      tipoDocumento: [], // Para checkboxes
      razonSocialOptions: [], // Opciones para el selector Razón Social
      usuarioOptions: [], // Opciones para el selector Usuario
    };
  },
  computed: {
    // Esta propiedad computada convierte los valores de los checkboxes en 1 o 0
    valoresCheckbox() {
      const valores = {
        hojaDeServicio: this.tipoDocumento.includes('hojaDeServicio') ? 1 : 0,
        factura: this.tipoDocumento.includes('factura') ? 1 : 0,
        remision: this.tipoDocumento.includes('remision') ? 1 : 0,
        empresaPoliza: this.tipoDocumento.includes('empresaPoliza') ? 1 : 0,
      };
      return valores;
    },
    razonSocialRules() {
      // Define las reglas de validación para el campo Razón Social
      return [val => !!val || 'Este campo es requerido'];
    },
    usuarioRules() {
      // Define las reglas de validación para el campo Usuario
      return [val => !!val || 'Este campo es requerido'];
    },
    fechaRules() {
      // Define las reglas de validación para el campo Fecha
      return [val => !!val || 'Este campo es requerido'];
    },
    descripcionRules() {
      // Define las reglas de validación para el campo Descripción
      return [val => !!val || 'Este campo es requerido'];
    },
  },
  methods: {
    cerrarDialogo() {
      // Cierra el diálogo de creación de servicio
      this.$emit('cerrarDialogo');
    },

    async cargarOpciones() {
      try {
        // Realiza una solicitud al servidor para obtener las opciones de Razón Social
        const responseRazonSocial = await axios.get(configFromStore.ip + '/clientes/NombreId');

        // Transforma la respuesta al formato adecuado
        this.razonSocialOptions = responseRazonSocial.data.map(item => ({
          value: item.idCliente, // Usa "idCliente" como el valor
          label: item.razonSocial, // Usa "razonSocial" como la etiqueta
        }));

        // Realiza una solicitud al servidor para obtener las opciones de Usuario
        const responseUsuario = await axios.get(configFromStore.ip + '/usuarios/nombreId');

        // Verifica la respuesta en la consola
        console.log('Respuesta de Usuario:', responseUsuario.data);

        // Transforma la respuesta al formato adecuado
        this.usuarioOptions = responseUsuario.data.map(item => ({
          value: item.idUsuario, // Usa un valor único como "idUsuario" como value
          label: item.nombreCompleto, // Usa "nombreCompleto" como label
        }));
        // Forzar una actualización del componente QSelect
        this.$forceUpdate();

      } catch (error) {
        console.error('Error al cargar opciones:', error);
      }

    },

    async crearServicio() {

      // Validar el formulario antes de enviar los datos al servidor
      const isValid = await this.$refs.form.validate();
      // try {
      if (isValid) {
        const useAuth = useAuthStore();
        const idusuario = ref(useAuth.user.idUsuario);

        // Crear un objeto que contenga los datos del servicio
        // const nuevoServicio = {
        // IdUsuario: idusuario.value, // Ajusta la propiedad según la estructura esperada en el servidor
        // IdUAsignado: this.nuevoServicio.userName.value, // Ajusta la propiedad según la estructura esperada en el servidor
        // IdCliente: this.nuevoServicio.razonSocial.value, // Ajusta la propiedad según la estructura esperada en el servidor
        // Factura: this.valoresCheckbox.factura,
        // HojaServicio: this.valoresCheckbox.hojaDeServicio,
        // Descripcion: this.nuevoServicio.descripcion,
        //HojaRemision: this.valoresCheckbox.remision,
        //EmpresaPoliza: this.valoresCheckbox.empresaPoliza,
        //TituloServicio: this.nuevoServicio.tituloservicio, // Ajusta la propiedad según la estructura esperada en el servidor
        //};

        //console.log(nuevoServicio);
        // Realiza la solicitud POST al servidor con los datos del nuevo servicio
        //const response = await axios.post(configFromStore.ip +'/servicios/crear?IdUsuario'+ idusuario.value +'&IdUAsignado='+ this.nuevoServicio.userName.value+'&IdCliente='+this.nuevoServicio.razonSocial.value+'&Factura=' +this.valoresCheckbox.factura+'&HojaServicio='+this.valoresCheckbox.hojaDeServicio+'&Descripcion='+this.nuevoServicio.descripcion+'&HojaRemision='+this.valoresCheckbox.remision+'&EmpresaPoliza='+this.valoresCheckbox.empresaPoliza+'&TituloServicio='+this.nuevoServicio.tituloservicio );


        // Construir la URL con los parámetros correctamente formateados
        const url = configFromStore.ip + `/servicios/crear?IdUsuario=${idusuario.value}&IdUAsignado=${this.nuevoServicio.userName.value}&IdCliente=${this.nuevoServicio.razonSocial.value}&Factura=${this.valoresCheckbox.factura}&HojaServicio=${this.valoresCheckbox.hojaDeServicio}&Descripcion=${this.nuevoServicio.descripcion}&HojaRemision=${this.valoresCheckbox.remision}&EmpresaPoliza=${this.valoresCheckbox.empresaPoliza}&TituloServicio=${this.nuevoServicio.tituloservicio}`;

        // Realizar la solicitud POST al servidor sin un cuerpo de solicitud
        const response = await axios.post(url).then(response => {
          console.log('Servicio creado con éxito: ' + response.status);
          axios.get(configFromStore.ip + "/servicios/idUltimoServicio")
            .then((resultado) => {
              this.idUltimoServicioAgregado = resultado.data;
              console.log(this.idUltimoServicioAgregado)
              axios.post(configFromStore.ip + "/historialServicio/crear?IdServicio=" + this.idUltimoServicioAgregado + "&IdUsuario=" + idusuario.value + "&IdEstadoServicio=1&DescripcionCambio=Servicio creado")
              console.log("ok")
              if (response.status === 201) {
                this.$emit('servicio-creado');

                this.$emit('cerrarDialogo');

                this.$q.notify({
                  color: 'positive',
                  icon: 'check',
                  message: 'Servicio creado correctamente.',
                });
              } else {
                this.$q.notify({
                  color: 'negative',
                  icon: 'warning',
                  message: 'No se pudo crear el servicio. Verifique que lleno todos los campos o consulte el desarrolladoz',
                });
              }
            });
        });;
        console.log('Respuesta del servidor:', response.status);
      }
      // } catch (error) {
      //   // Manejo de errores
      //   console.error('Error al crear el servicio:', error);
      //   // Muestra un mensaje de error en caso de error
      //   this.$q.notify({
      //     color: 'negative',
      //     icon: 'warning',
      //     message: 'Se produjo un error al crear el servicio. Verifique que se lleno todos los campos o consulte a los desarrolladores',
      //   });
      // }
    },

    resetForm() {
      this.nuevoServicio.TituloServicio = '';
      this.nuevoServicio.descripcion = '';
    },
  },
  mounted() {
    console.log('El método mounted se ha ejecutado.');

    this.cargarOpciones();
  },
};
</script>
