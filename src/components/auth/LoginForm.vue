<template>
    <div class="login-background">
  <q-page class="window-height window-width row justify-center items-center" >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 login-card">
          <q-card-section class="login-header">
            <div class="logo-container">
              <img src="../../assets/logo_inovasis.png" alt="INOVASIS Logo" class="logo-image" />
            </div>
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
</div>
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
          // console.log(response.data)
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
  background-color: #ffffff;
}

.login-header {
  background-color: #ffffff;
  text-align: center;

}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo-image {
  max-width: 40%; /* Ajusta el tamaño máximo de la imagen según tus necesidades */
  max-height: 0%; /* Ajusta el tamaño máximo de la imagen según tus necesidades */
}

.login-background {
  background-image: url('../../assets/bg6.jpg'); /* Ruta absoluta desde la raíz del proyecto */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%; /* Ajusta la altura según tus necesidades */
  overflow: hidden; /* Para evitar desbordamiento del fondo */
}

</style>
