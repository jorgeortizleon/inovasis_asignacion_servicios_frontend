<template>
  <q-page class="background-image-container">
    <q-page-container class="q-pa-md q-gutter-md">
      <div class="q-mb-md text-h4 text-center text-grey-8">Inovasis</div>
      <div class="q-mb-md text-h6 text-muted text-center">Iniciar sesión</div>
      <q-img
        src="../assets/logo.jpg"
        class="q-mb-md"
        style="max-width: 90px; max-height: 90px; display: block; margin: 0 auto"
      />

      <q-form @submit="login" class="q-pt-md">
        <q-input
          v-model="email"
          label="Correo"
          filled
          stack-label
          lazy-rules
          :rules="emailRules"
        />
        <q-input
          v-model="password"
          label="Contraseña"
          filled
          stack-label
          lazy-rules
          type="password"
          :rules="passwordRules"
        />
        <div class="q-mt-md text-right">
          <router-link to="/recuperar-contrasena" class="text-primary">Olvidó su contraseña?</router-link>
        </div>
        <q-btn color="primary" class="q-mt-lg q-mb-md" type="submit" label="Iniciar sesión" />
        <div class="q-mt-md text-center text-muted">
          No es un miembro? <router-link to="/crear-usuario" class="text-primary">Registrarse</router-link>
        </div>
      </q-form>
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Aquí implementar la lógica de inicio de sesión
      // Puedes acceder a 'this.email' y 'this.password'
    },
  },
  computed: {
    emailRules() {
      return [
        (v) => !!v || "El email es requerido.",
        (v) => /.+@.+/.test(v) || "El email debe tener un formato válido.",
      ];
    },
    passwordRules() {
      return [(v) => !!v || "La contraseña es requerida."];
    },
  },
};
</script>

<style scoped>
.background-image-container {
  height: 100vh;
  background-color: #f7f7f7;
}
</style>
