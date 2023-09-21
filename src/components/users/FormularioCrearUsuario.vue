<template>
  <q-card style="width: 500px;">
    <q-card-section>
      <div class="text-h6">Crear Usuario</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form @submit.prevent="crearUsuario" @reset="resetForm" class="q-gutter-md">
        <div class="q-gutter-md espacio-borde-izquierda-form">
            <q-input filled v-model="usuario" label="Nombre de Usuario" hint="Introduzca el nombre de usuario" lazy-rules
              :rules="usuarioRules">
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
          </div>
          <div class="q-gutter-md espacio-borde-izquierda-form">
            <q-input filled v-model="nombreCompleto" label="Nombre Completo" hint="Introduzca el nombre completo" lazy-rules
              :rules="nombreCompletoRules">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="correo" label="Correo Electrónico" hint="Introduzca el correo electrónico" lazy-rules
            :rules="correoRules">
            <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="contrasena" label="Contraseña" hint="Introduzca la contraseña" lazy-rules
            :rules="contrasenaRules" :type="showPassword ? 'text' : 'password'">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md espacio-borde-izquierda-form">
          <q-input filled v-model="confirmarContrasena" label="Confirmar Contraseña" hint="Confirme la contraseña" lazy-rules
            :rules="confirmarContrasenaRules" :type="showConfirmPassword ? 'text' : 'password'">
            <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            <template v-slot:append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                @click="showConfirmPassword = !showConfirmPassword"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
          <div class="q-gutter-md">
            <q-select filled v-model="idRol" :options="roles" label="Rol" hint="Seleccione un rol" emit-value map-options
              :rules="rolRules" >
              <template v-slot:prepend>
                <q-icon name="accessibility" />
              </template>
            </q-select>
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
      usuario: '',
      nombreCompleto: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: '',
      idRol: null,
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
      roles: [
        { label: 'Administrador', value: 1 },
        { label: 'Supervisor', value: 2 },
        { label: 'Ventas/Compras', value: 3 },
        { label: 'Soporte', value: 4 },
        { label: 'Desarrollo', value: 5 },
        { label: 'Cobranza', value: 6 },
      ],
      rolRules: [(v) => !!v || 'Por favor, selecciona un rol'],
    };
  },

  methods: {
    cerrarDialogo() {
      // Cierra el diálogo de edición
      this.$emit('cerrarDialogo');
    },
    async crearUsuario() {
      try {
        // Aquí coloca la lógica para crear el usuario
        // Puedes usar axios u otro cliente HTTP
        await axios.post('http://localhost:8181/usuarios/crear', {
          userName: this.usuario,
          nombreCompleto: this.nombreCompleto,
          correo: this.correo,
          idRol: this.idRol,
          contrasena: this.contrasena,
        });

        // Emite un evento llamado 'usuarioCreado' para notificar a UsersForm.vue
        this.$emit('usuarioCreado');

        // Cierra el diálogo de creación de usuario
        this.$emit('cerrarDialogo');
        this.$emit('actualizarTabla');

        this.$q.notify({
          color: 'positive',
          icon: 'check',
          message: 'Usuario creado correctamente.',
        });
      } catch (error) {
        console.error('Error al crear el usuario:', error);
      }
    },
    
    resetForm() {
      // Restablecer los valores de los campos del formulario al valor inicial
      this.usuario = '';
      this.nombreCompleto = '';
      this.correo = '';
      this.contrasena = '';
      this.confirmarContrasena = '';
      this.idRol = null;
    },
  },
};
</script>

<style scoped>
/* Estilos del formulario aquí */
</style>
