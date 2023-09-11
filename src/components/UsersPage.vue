<template>
  <div class="q-pa-md">
    
    <q-table
      class="q-table-responsive"
      :class="{ 'fullscreen-table': isFullscreen }"
      title="Usuarios"
      :rows="filteredUsers"
      :columns="columns"
      row-key="idUsuario"
      :separator="defaultSeparator"
    >
      <template v-slot:top-right>
        <q-btn round dense flat color="black" :icon="fullscreenIcon" @click="toggleFullscreen" />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
          class="q-mx-md"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

     <!-- Columna de Editar -->
    <template v-slot:body-cell-edit="props">
      <q-td :props="props">
        <q-icon
          name="edit"
          color="primary"
          style="cursor: pointer;"
          @click="openEditDialog(props.row)"
          />
        </q-td>
      </template>
    </q-table>
      <!-- Botón FAB -->
    <q-btn
      fab
      fixed
      bottom
      right
      icon="add"
      class="fab-button"
      @click="openDialog"
    />

    <q-dialog v-model="dialogVisible" class="custom-dialog">
      <q-card class="custom-card">
        <q-card-section>
          <q-card-title class="text-h6">Crear usuario</q-card-title>
          <user-form @close-dialog="dialogVisible = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import UserForm from 'components/auth/UserForm.vue'; 

const columns = [
  { name: 'userName', align: 'left', label: 'Usuario', field: 'userName', sortable: true },
  { name: 'nombreCompleto', align: 'left', label: 'Nombre Completo', field: 'nombreCompleto', sortable: true },
  { name: 'correo', align: 'left', label: 'Correo Electrónico', field: 'correo', sortable: true },
  { name: 'nombreRol', align: 'left', label: 'Rol', field: 'nombreRol', sortable: true },
  { name: 'estado', align: 'left', label: 'Estado', field: 'estado', sortable: true },
  { name: 'edit', align: 'center', label: 'Editar', field: 'idUsuario', sortable: false },
];
export default {

  components: {
    UserForm

  },
  setup() {
    const defaultSeparator = 'vertical';
    const users = ref([]);
    const filter = ref('');
    const isFullscreen = ref(false);
    const fullscreenIcon = computed(() => (isFullscreen.value ? 'fullscreen_exit' : 'fullscreen'));
    const dialogVisible = ref(false);

    // Función para abrir el diálogo de edición con los datos del usuario
    const openEditDialog = (user) => {
      // Asigna los datos del usuario a una propiedad del componente
      editedUser.value = { ...user }; // Clona el usuario para no afectar los datos originales
      dialogVisible.value = true; // Abre el diálogo de edición
    };
    
    const openDialog = () => {
      dialogVisible.value = true;
    };

    const saveUser = () => {
      // Lógica para guardar el nuevo usuario
      // ...

      // Cerrar el diálogo
      dialogVisible.value = false;
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8181/usuarios');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    const filteredUsers = computed(() => {
      return users.value.filter(user =>
        user.nombreCompleto.toLowerCase().includes(filter.value.toLowerCase())
      );
    });

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
    };

    // Estado para mostrar/ocultar el diálogo
    const showDialog = ref(false);

    // Estado para los datos del nuevo usuario
    const newUser = ref({
      userName: '',
      nombreCompleto: '',
      correo: '',
      nombreRol: '',
      estado: 1,
    });

    // Función para abrir el diálogo
    const showCreateUserDialog = () => {
      showDialog.value = true;
    };

    // Función para cerrar el diálogo
    const closeCreateUserDialog = () => {
      showDialog.value = false;
      // Limpia los datos del nuevo usuario al cerrar el diálogo
      newUser.value = {
        userName: '',
        nombreCompleto: '',
        correo: '',
        nombreRol: '',
        estado: 1,
      };
    };


    // Escuchar el evento 'usuario-creado' emitido desde el componente UserForm
    const handleUsuarioCreado = () => {
      fetchUsers(); // Actualizar la tabla
    };

    return {
      columns,
      defaultSeparator,
      filter,
      filteredUsers,
      isFullscreen,
      fullscreenIcon,
      toggleFullscreen,
      showDialog,
      newUser,
      showCreateUserDialog,
      closeCreateUserDialog,
      dialogVisible, // Para controlar la visibilidad del diálogo
      openDialog,
      saveUser,
      handleUsuarioCreado,
      openEditDialog,


    };
  }
};

</script>


<style scoped>
.q-table-responsive {
  max-width: 100%;
  margin: 0 auto;
  border: 2px solid #0a63c3;
}

.fullscreen-table {
  width: 100vw;
  height: calc(100vh - 80px); /* Ajusta según el diseño de tu página */
}
.fab-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
/* Estilos personalizados para la q-card del formulario */
.custom-card {
  width: 400px; /* Ajusta el valor según tus necesidades */
  max-width: 90%; /* Limita el ancho máximo */
  margin: 0px auto; /* Centra horizontalmente */
  max-height: 80vh; /* Ajusta el valor según tus necesidades */
  overflow-y: auto; /* Agrega desplazamiento vertical si el contenido es más largo */
}

/* Estilos personalizados para la q-dialog */
.custom-dialog {
  max-width: 90%; /* Ajusta el ancho máximo según tus necesidades */
}
</style>
