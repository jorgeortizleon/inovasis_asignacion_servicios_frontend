<template>
  <q-card style="width: 500px;">
    <q-card-section>
      <div class="text-h6">Editar Usuario</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form ref="form" @submit.prevent="editarUsuario" @reset="resetForm" class="q-gutter-md">
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="usuario" label="Nombre de Usuario" hint="Introduzca el nombre de usuario" lazy-rules
            :rules="usuarioRules" counter maxlength="50">
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="usuario = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="nombreCompleto" label="Nombre Completo" hint="Introduzca el nombre completo" lazy-rules
            :rules="nombreCompletoRules" counter maxlength="50">
            <template v-slot:prepend>
              <q-icon name="badge" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="nombreCompleto = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="correo" label="Correo Electrónico" hint="Introduzca el correo electrónico" lazy-rules
            :rules="correoRules" counter maxlength="50">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="correo = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="contrasena" label="Contraseña" hint="Introduzca la contraseña" lazy-rules
            :rules="contrasenaRules" :type="showPassword ? 'text' : 'password'" counter maxlength="50">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="contrasena = ''" class="cursor-pointer" />
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
                class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="confirmarContrasena" label="Confirmar Contraseña" hint="Confirme la contraseña"
            lazy-rules :rules="confirmarContrasenaRules" :type="showConfirmPassword ? 'text' : 'password'" counter
            maxlength="50">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="confirmarContrasena = ''" class="cursor-pointer" />
              <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md">
          <div class="row items-center">
            <!-- Campo de selección de Rol -->
            <div class="col">
              <q-select filled v-model="idRol" :options="optionsRoles" label="Rol" hint="Seleccione un rol" emit-value
                map-options :rules="rolRules">
                <template v-slot:prepend>
                  <q-icon name="accessibility" />
                </template>
              </q-select>
            </div>

            <div class="q-mr-md"></div> <!-- Espacio pequeño -->

            <!-- Campo de selección de Estado -->
            <div class="col">
              <q-select filled v-model="estado" :options="estados" label="Estado" hint="Seleccione el estado del usuario"
                emit-value map-options :rules="estadoRules">
                <template v-slot:prepend>
                  <q-icon name="check_circle" />
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions>
      <q-btn flat label="Cerrar" color="red" @click="cerrarDialogo" />
      <q-space></q-space>
      <q-btn flat label="Editar" color="green" @click="editarUsuario" />
    </q-card-actions>
  </q-card>
</template>

<script>
import axios from 'axios';
// import { configStore } from "src/stores/config.js";
// const configFromStore = configStore();
// configFromStore.ip +


export default {
  name: 'FormularioEditarUsuario',
  props: {
    usuarioEditar: Object, // Recibe el usuario que se está editando
  },
  data() {
    return {
      resetForm: () => { },
      ip: 'http://192.168.1.72:8181',

      usuario: '',
      nombreCompleto: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: '',
      idRol: null,
      showPassword: false,
      showConfirmPassword: false,
      estado: 1,
      usuarioRules: [
        (v) => !!v || 'El nombre de usuario es requerido.',
      ],
      nombreCompletoRules: [
        (v) => !!v || 'El nombre completo es requerido.',
      ],
      correoRules: [
        (v) => !!v || 'El correo electrónico es requerido.',
        (v) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido.',
      ],
      contrasenaRules: [
        (v) => !!v || 'La contraseña es requerida.',
        (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v) || 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
      ],
      confirmarContrasenaRules: [
        (v) => !!v || 'Por favor, confirma la contraseña',
        (v) => v === this.contrasena || 'Las contraseñas no coinciden',
      ],
      descripcionesRoles: [],
      idsRoles: [],
      rolRules: [(v) => !!v || 'Por favor, selecciona un rol'],
      estadoRules: [],

      estados: [
        { label: 'Activo', value: 1 },
        { label: 'No Activo', value: 0 },
      ],
    };

  },
  computed: {

    optionsRoles() {
      return this.descripcionesRoles.map((descripcion, index) => ({
        label: descripcion,
        value: this.idsRoles[index],
      }));
    },

    usuarioEditarWatched: {
      get() {
        return this.usuarioEditar;
      },
      set(newValue) {
        // Cuando la prop usuarioEditar cambie, actualiza los datos del formulario
        this.usuario = newValue.userName || '';
        this.nombreCompleto = newValue.nombreCompleto || '';
        this.correo = newValue.correo || '';
        this.idRol = newValue.idRol;
        this.contrasena = newValue.contrasena || '';
        this.confirmarContrasena = '';
        this.estado = newValue.estado || null;

      },
    },
  },
  watch: {
    // Observa los cambios en usuarioEditar
    usuarioEditar: {
      immediate: true, // Activa esta opción para que se ejecute inmediatamente cuando se monta el componente
      handler(newValue) {


        // Actualiza los datos del formulario cuando la prop usuarioEditar cambie
        this.usuario = newValue.userName || '';
        this.nombreCompleto = newValue.nombreCompleto || '';
        this.correo = newValue.correo || '';
        this.idRol = newValue.idRol;
        this.contrasena = newValue.contrasena || '';
        this.confirmarContrasena = '';
        this.estado = newValue.estado;

      },
    },

  },

  methods: {
    async cargarRolesDesdeServidor() {
      try {
        const response = await axios.get(this.ip+'/roles');
        this.descripcionesRoles = response.data.map(rol => rol.descripcion);
        this.idsRoles = response.data.map(rol => rol.idRol);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    },
    cerrarDialogo() {
      this.$emit('cerrarDialogo');
    },
    async editarUsuario() {
      try {
        const isValid = await this.$refs.form.validate();

        if (isValid) {

          const idRolSeleccionado = this.idRol || this.usuarioEditar.idRol;

          const usuarioEditado = {
            userName: this.usuario,
            nombreCompleto: this.nombreCompleto,
            correo: this.correo,
            idRol: idRolSeleccionado,
            contrasena: this.contrasena,
            estado: this.estado ? 1 : 0,
          };

          const response = await axios.put(this.ip+`/usuarios/${this.usuarioEditar.idUsuario}`, usuarioEditado);

          if (response.status === 200) {

            this.$q.notify({
              color: 'positive',
              icon: 'check',
              message: 'Usuario editado correctamente.',
            });

            this.$emit('cerrarDialogo');
            this.$emit('actualizarTabla');
          } else {
            this.$q.notify({
              color: 'negative',
              icon: 'warning',
              message: 'Error al editar el usuario. Consulta los detalles en la consola.',
            });
            console.error('Respuesta del servidor:', response.data);
          }
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Error al editar el usuario. Consulta los detalles en la consola.',
        });
        console.error('Error al editar el usuario:', error);
      }
    },
  },
  mounted() {
    this.cargarRolesDesdeServidor();
  },
};
</script>

<style scoped></style>
