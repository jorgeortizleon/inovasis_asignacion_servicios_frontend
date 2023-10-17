<template>
  <q-card style="width: 500px;">
    <q-card-section>
      <div class="text-h6">Crear Usuario</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form ref="form" @submit.prevent="crearUsuario" @reset="resetForm" class="q-gutter-md">
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
                class="cursor-pointer" counter maxlength="50" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="confirmarContrasena" label="Confirmar Contraseña" hint="Confirme la contraseña"
            lazy-rules :rules="confirmarContrasenaRules" :type="showConfirmPassword ? 'text' : 'password'">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="usuario = ''" class="cursor-pointer" />
              <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md">
          <div class="row items-center">
            <!-- Campo de selección de Rol -->
            <div class="col">
              <q-select filled v-model="idRol" :options="descripcionesRoles" label="Rol" hint="Seleccione un rol"
                emit-value map-options :rules="rolRules">
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
      <q-btn flat label="Crear" color="green" @click="crearUsuario" />
    </q-card-actions>
  </q-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    updateUsers: Function, // Declara la prop updateUsers como una función
  },
  data() {
    return {
      descripcionesRoles: [],
      idsRoles: [],
      usuario: '',
      nombreCompleto: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: '',
      idRol: null,

      estado: 1,
      showPassword: false,
      showConfirmPassword: false,
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
      estados: [
        { label: 'Activo', value: 1 },
        { label: 'No Activo', value: 0 },
      ],

      rolRules: [(v) => !!v || 'Por favor, selecciona un rol'],
      estadoRules: [(v) => v !== null || 'Por favor, selecciona el estado'],
    };
  },

  methods: {

    async cargarRolesDesdeServidor() {
      try {
        const response = await axios.get('http://localhost:8181/roles');
        this.descripcionesRoles = response.data.map(rol => rol.descripcion);
        this.idsRoles = response.data.map(rol => rol.idRol);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    },
    cerrarDialogo() {
      this.$emit('cerrarDialogo');
    },


    async crearUsuario() {
      try {
        const isValid = await this.$refs.form.validate();

        if (isValid) {
          const descripcionSeleccionada = this.idRol;
          const indiceSeleccionado = this.descripcionesRoles.indexOf(descripcionSeleccionada);

          if (indiceSeleccionado !== -1) {
            const idRolSeleccionado = this.idsRoles[indiceSeleccionado];

            const userData = {
              userName: this.usuario,
              nombreCompleto: this.nombreCompleto,
              correo: this.correo,
              idRol: idRolSeleccionado,
              contrasena: this.contrasena,
              estado: this.estado ? 1 : 0,
            };

            const response = await axios.post('http://localhost:8181/usuarios/crear', userData);

            if (response.status === 201) {
              this.$q.notify({
                color: 'positive',
                icon: 'check',
                message: 'Usuario creado correctamente.',
              });

              this.$emit('cerrarDialogo');
              this.$emit('actualizarTabla');
            } else {
              this.$q.notify({
                color: 'negative',
                icon: 'warning',
                message: 'Error al crear el usuario. Consulta los detalles en la consola.',
              });
              console.error('Respuesta del servidor:', response.data);
            }
          } else {
            this.$q.notify({
              color: 'negative',
              icon: 'warning',
              message: 'No se encontró el ID del rol para la descripción seleccionada.',
            });
            console.error('No se encontró el ID del rol para la descripción seleccionada.');
          }
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Error al crear el usuario. Consulta los detalles en la consola.',
        });
        console.error('Error al crear el usuario:', error);
      }
    },

    resetForm() {
      this.usuario = '';
      this.nombreCompleto = '';
      this.correo = '';
      this.contrasena = '';
      this.confirmarContrasena = '';
      this.idRol = null;
    },
  },
  mounted() {
    this.cargarRolesDesdeServidor();
  },
};
</script>

<style scoped></style>
