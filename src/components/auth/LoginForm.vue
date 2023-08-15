<template>
  <q-page class="window-height window-width row justify-center items-center" style="background: linear-gradient(#012d7f, #63a1e5);">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 login-card">
          <q-card-section class="login-header">
            <h4 class="text-h5 text-white q-my-md">INOVASIS</h4>
            
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="login" class="q-px-sm q-pt-xl" ref="form">
              <q-input square clearable v-model="email" type="email" label="Email" :rules="emailRules">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                :rules="passwordRules"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-toggle v-model="remember" label="Recordarme" color="primary" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue" class="full-width text-white" label="Iniciar sesión" type="submit" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Olvidaste tu contraseña?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
    showPassword: false,
    remember: false,
  }),
  methods: {
    login() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      console.log("Recordar:", this.remember);
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


<style lang="scss" scoped>
@import './LoginForm.scss';

</style>
