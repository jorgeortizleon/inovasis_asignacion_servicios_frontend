<template>
  <q-page class="window-height window-width row justify-center items-center" style="background: linear-gradient(to bottom right, #0375bc, #ffffff);">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 login-card">
          <q-card-section class="login-header">
            <h4 class="text-h5 text-white q-my-md">INOVASIS</h4>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="autenticar" class="q-px-sm q-pt-xl" ref="form">
              <q-input square clearable v-model="username" label="Nombre de Usuario" :rules="usernameRules">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                :rules="passwordRules"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue" class="full-width text-white" label="Iniciar sesión" @click.prevent="autenticar" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <!-- <p class="text-grey-6">Olvidaste tu contraseña?</p> -->
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";
const $q = useQuasar();
import { useAuthStore } from "src/stores/auth.js";
import { storeToRefs } from "pinia";
const useAuth = useAuthStore();

export default {
  data: () => ({
    username: "",
    password: "",
    error: false,
    showPassword: false,
  }),
  methods: {
    async autenticar() {
      let response = {};
      try {
        response = await axios.post("http://localhost:8181/usuarios/login?username=" + this.username + "&password=" + this.password);
        if (response.status === 200) {
          const { user, logged } = storeToRefs(useAuth);
          user.value = response.data;
          logged.value = 1;
          console.log(response.data)
          this.$router.replace("/home");
          this.$q.notify({
            color: "green",
            message: "Bienvenido",
            position: "top",
            timeout: 1000,
          });
        } else {
          this.$q.notify({
            color: "red",
            message: "Datos ingresados son incorrectos.",
            position: "top",
            actions: [{ label: "Cerrar", color: "white" }],
          });
        }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          color: "red",
          message: "Datos ingresados son incorrectos.",
          position: "top",
          actions: [{ label: "Cerrar", color: "white" }],
        });
      }
    },
  },
  computed: {
    usernameRules() {
      return [(v) => !!v || "El nombre de usuario es requerido."];
    },
    passwordRules() {
      return [(v) => !!v || "La contraseña es requerida."];
    },
  },
};
</script>

<style lang="scss" scoped>
@import './LoginForm.scss';

.login-card {
  width: 400px;
  height: 500px;
  border: 10px;
}

.login-header {
  background-color: #0375bc;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  max-width: 100px; /* Ajusta el tamaño máximo de la imagen según tus necesidades */
  max-height: 100px; /* Ajusta el tamaño máximo de la imagen según tus necesidades */
}
</style>
