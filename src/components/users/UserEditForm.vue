<template>
    <q-page>
      <div class="q-pa-md q-gutter-md">
        <q-form @submit.prevent="editarUsuario" class="custom-form">
          <q-input 
            square 
            clearable 
            v-model="editedUserCopy.userName" 
            label="Nombre de Usuario" 
            :rules="usuarioRules"
          >
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="editedUserCopy.nombreCompleto"
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
            v-model="editedUserCopy.correo"
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
            v-model="editedUserCopy.idRol" 
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
          <q-btn label="Guardar Cambios" color="primary" type="submit" class="q-mt-md" />
        </q-form>
      </div>
    </q-page>
  </template>
  
  
  <script>
  import { ref, watch, toRefs  } from 'vue';
  import axios from 'axios';
  
  export default {
  props: ['editedUser'],
  setup(props, context) {
    const { editedUser } = toRefs(props); // Convierte props en referencias reactivas
    console.log('Valor de editedUser en UserEditForm:', editedUser);
    const isEditing = ref(false);
    console.log('isEditing en UserEditForm:', isEditing.value); // Agrega este console.log
    const contrasena = ref('');
    const confirmarContrasena = ref('');
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    // Copia el valor de la prop editedUser en una variable local para trabajar con ella
    const editedUserCopy = ref({ ...editedUser.value });

    // Restablece la copia del usuario cuando la prop editedUser cambie
    watch(editedUser, (newValue) => {
        console.log('Valor actualizado de editedUser en watch:', newValue); // Agrega este console.log
        editedUserCopy.value = { ...newValue };
    });

    // Aquí las reglas de validación para cada campo
    const usuarioRules = [
      (v) => !!v || 'El nombre de usuario es requerido.'
    ];
    const nombreCompletoRules = [
      (v) => !!v || 'El nombre completo es requerido.'
    ];
    const correoRules = [
      (v) => !!v || 'El correo electrónico es requerido.',
      (v) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido.',
    ];
    const contrasenaRules = [
      (v) => !editedUserCopy.value || (!!v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
      (v) => !editedUserCopy.value || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v) || 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
    ];
    const confirmarContrasenaRules = [
      (v) => !editedUserCopy.value || (!!v && v === contrasena.value) || 'Las contraseñas no coinciden',
    ];
    const rolRules = [
      (v) => !!v || 'Por favor, selecciona un rol',
    ];

    const editarUsuario = async () => {
      try {
        const requestData = {
          idUsuario: editedUserCopy.value.idUsuario,
          userName: editedUserCopy.value.userName,
          nombreCompleto: editedUserCopy.value.nombreCompleto,
          correo: editedUserCopy.value.correo,
          contrasena: contrasena.value,
          idRol: editedUserCopy.value.idRol,
        };

        const response = await axios.put(
          `http://localhost:8181/usuarios/${editedUserCopy.value.idUsuario}`,
          requestData
        );
        console.log('Usuario editado:', response.data);
        context.emit('close-dialog');
      } catch (error) {
        console.error('Error al editar usuario:', error);
      }
    };

    return {
      editedUserCopy,
      contrasena,
      confirmarContrasena,
      showPassword,
      showConfirmPassword,
      usuarioRules,
      nombreCompletoRules,
      correoRules,
      contrasenaRules,
      confirmarContrasenaRules,
      rolRules,
      roles,
      editarUsuario,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados para el formulario */
.custom-form {
  width: 85%;
  max-width: 600px;
  margin: 10px auto;
}
/* Agrega estilos adicionales a tus elementos si es necesario */
</style>