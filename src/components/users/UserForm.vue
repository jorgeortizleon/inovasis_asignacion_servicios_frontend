<template>
  <q-page>
    <div class="q-pa-md q-gutter-md">
      <q-form @submit.prevent="crearUsuario" class="custom-form">
    <q-input 
    square 
    clearable 
    v-model="usuario" 
    label="Nombre de Usuario" 
    :rules="usuarioRules">
      <template v-slot:prepend>
        <q-icon name="account_circle" />
      </template>
    </q-input>
    <q-input
      square
      clearable
      v-model="nombreCompleto"
      label="Nombre Completo"
      :rules="nombreCompletoRules" 
    >
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
    </q-input>
    <q-input
      square
      clearable
      v-model="correo"
      label="Correo Electrónico"
      :rules="correoRules"
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      square
      clearable
      v-model="contrasena"
      label="Contraseña"
      :type="showPassword ? 'text' : 'password'"
      :rules="contrasenaRules"
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
    <q-input
      square
      clearable
      v-model="confirmarContrasena"
      label="Confirmar Contraseña"
      :type="showConfirmPassword ? 'text' : 'password'"
      :rules="confirmarContrasenaRules"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="showConfirmPassword = !showConfirmPassword"
        />
      </template>
    </q-input>
    <q-select
      square
      v-model="idRol"
      label="Rol"
      :options="roles"
      option-value="value" 
      option-label="label" 
      :rules="rolRules"
    >
      <template v-slot:prepend>
        <q-icon name="group" />
      </template>
    </q-select>

    <q-btn label="Crear Usuario" color="primary" type="submit" class="q-mt-md" />
  </q-form>
    </div>
  </q-page>
</template>


<script>
import { ref, watch } from 'vue';
import axios from 'axios';

export default {
  props: ['dialogVisible', 'updateUsers', 'isEditing', 'editedUser'],
  setup(props, context) {
    
    const usuario = ref('');
    const nombreCompleto = ref('');
    const correo = ref('');
    const contrasena = ref('');
    const confirmarContrasena = ref('');
    const idRol = ref('');
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const roles = [
  { label: 'Administrador', value:1},
  { label: 'Supervisor', value:2},
  { label: 'Ventas/Compras', value:3},
  { label: 'Soporte', value:4},
  { label: 'Desarrollo', value:5},
  { label: 'Cobranza', value:6},
];

    
    
    // Aquí las reglas de validación para cada campo
    const usuarioRules = [
      (v) => !!v || 'El nombre de usuario es requerido.'
    ];
    const correoRules = [
    (v) => !!v || 'El correo electrónico es requerido.',
    (v) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido.',

    ];
    const contrasenaRules = [
    (v) => !!v || 'La contraseña es requerida.',
    (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
    (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v) || 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
  ];

      const confirmarContrasenaRules = [
    (v) => !!v || 'Por favor, confirma la contraseña',
    (v) => v === contrasena.value || 'Las contraseñas no coinciden',
  ];

    const rolRules = [
    (v) => !!v || 'Por favor, selecciona un rol', 
    ];


    const crearUsuario = async () => {
  try {
    console.log('idRol (antes de parseInt):', idRol);
    console.log(idRol.value)
    const requestData = {
      userName: usuario.value,
      nombreCompleto: nombreCompleto.value,
      correo: correo.value,
      contrasena: contrasena.value,
      idRol: idRol.value.value,
        };

    const response = await axios.post(
      'http://localhost:8181/usuarios/crear',
      requestData,
    );
    console.log('Usuario creado:', response.data);
        // Llama a la función updateUsers para actualizar la lista de usuarios en UsersPage.vue
    props.updateUsers();
    context.emit('close-dialog');
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

    return {
      usuario,
      nombreCompleto,
      correo,
      contrasena,
      confirmarContrasena,
      idRol,
      usuarioRules,
      correoRules,
      contrasenaRules,
      confirmarContrasenaRules,
      rolRules,
      roles,
      showPassword,
      showConfirmPassword,
      crearUsuario,
    };
  },
};
</script>
<style scoped>
/* Estilos personalizados para el formulario */
.custom-form {
  width: 85%; /* Ajusta el valor según tus necesidades */
  max-width: 600px; /* Limita el ancho máximo */
  margin: 10px auto; /* Centra horizontalmente */
  
}

/* Agrega estilos adicionales a tus elementos si es necesario */
</style>