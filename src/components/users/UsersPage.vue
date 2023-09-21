<template>
  <q-page class="color-fondo">
    <!-- Sección de las 4 cards de la parte superior -->
    <div icon_position="left" class="espacio-borde-cards">
      <q-card class="bg-transparent no-shadow no-border" bordered>
        <q-card-section class="q-pa-none">
          <div class="row q-col-gutter-sm">
            <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
              <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
                <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`"
                  class="q-pa-lg q-mr-none text-white">
                  <q-icon :name="item.icon" color="white" size="24px"></q-icon>
                </q-item-section>
                <q-item-section class="q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
                  <q-item-label>{{ item.title }}</q-item-label>
                </q-item-section>
                <q-item-section v-if="icon_position === 'right'" side class="q-mr-md text-white">
                  <q-icon :name="item.icon" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Tabla de usuarios -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table
            ref="myTable"
              class="no-shadow"
              :rows="filteredUsers"
              :columns="columns"
              title="Usuarios"
              :hide-header="mode === 'grid'"
              :rows-per-page-options="[10000]"
            >
              <template v-slot:top-right="props">
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="toggleTableFullscreen" v-if="mode === 'list'" class="q-px-sm">
                  <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                    {{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                  </q-tooltip>
                </q-btn>
                <q-btn color="primary" label="Crear Usuario" @click="showDialogCreate = true" />
              </template>
              <template v-slot:body-cell="props2">
                <q-td :props="props2">
          <template v-if="props2.col.field === 'Editar/Borrar'">
            {{ props2.row[props2.col.field] }}
            <q-btn flat round dense color="primary" icon="edit" @click="showDialogEditarProp = true; usuarioAEditar = props2.row" />
            <q-btn flat round dense color="negative" icon="delete" @click="showDeleteConfirmationDialog(props2.row)" />
          </template>
          <template v-else>
            {{ props2.row[props2.col.field] }}
          </template>
        </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Dialogo de confirmar eliminar usuario -->
    <q-dialog v-model="showConfirmationDialog" persistent no-backdrop>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Eliminar usuario</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          ¿Seguro que desea eliminar el usuario seleccionado?
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancelar" color="red" @click="cancelDeletion" />
          <q-space></q-space>
        <q-btn flat label="Eliminar" color="primary" @click="confirmDeletion" />
      </q-card-actions>
    </q-card>
  </q-dialog>
    <!-- //////////////////////////////////7 -->
    <!-- Diálogo de creación de usuario -->
  <q-dialog v-model="showDialogCreate" ref="dialogCreate" persistent no-backdrop>
    <!-- Escucha el evento 'usuarioCreado' y actualiza la tabla -->
    <FormularioCrearUsuario @cerrarDialogo="showDialogCreate = false" @actualizarTabla="getUsers" v-if="showDialogCreate" />
  </q-dialog>
<!-- /////////////////////////////-->

      <!-- Dialogo de editar usuarios -->
      <q-dialog v-model="showDialogEditarProp" persistent>
        <FormularioEditarUsuario :usuarioEditar="usuarioAEditar" @cerrarDialogo="showDialogEditarProp = false" @actualizarTabla="getUsers" v-if="showDialogEditarProp" />
</q-dialog>
  </q-page>
</template>
          
<script>
import { exportFile, useQuasar, Dialog } from 'quasar';
import { ref } from 'vue';
import axios from "axios";
import FormularioCrearUsuario from './FormularioCrearUsuario.vue'; // Asegúrate de ajustar la ruta correcta
import FormularioEditarUsuario from './FormularioEditarUsuario.vue';


export default {
  name: 'UsersPage',
  components: {
    FormularioCrearUsuario,
    FormularioEditarUsuario,
  },
  data() {
    return {
      numUsuarios: 0, // Número total de usuarios
    numUsuariosActivos: 0, // Número de usuarios activos
    numUsuariosInactivos: 0, // Número de usuarios inactivos
    nombreUsuarioReciente: '', // Nombre del último usuario registrado
      mode: 'list', // Asegúrate de tener esta propiedad
      showConfirmationDialog: false,
      showDialogCreate: false,
      showDialogEditarProp: false,
      usuarioAEditar: null, // Almacena el usuario que se va a editar
      userToDelete: null, // Almacena el usuario que se va a eliminar
      columns: [ // Define las columnas de la tabla de usuarios
        { name: 'userName', align: 'left', label: 'Usuario', field: 'userName', sortable: true },
        { name: 'nombreCompleto', align: 'left', label: 'Nombre Completo', field: 'nombreCompleto', sortable: true },
        { name: 'correo', align: 'left', label: 'Correo Electrónico', field: 'correo', sortable: true },
        { name: 'nombreRol', align: 'left', label: 'Rol', field: 'nombreRol', sortable: true },
        { name: 'estado', align: 'left', label: 'Estado', field: 'estado', sortable: true, format: (val) => (val === 1 ? 'Activo' : 'No Activo'),},
        { name: 'edit', align: 'center', label: 'Editar/Borrar', field: 'Editar/Borrar', sortable: false },
      ],
      users: [], // Agrega esta línea para declarar la propiedad

    }
  },
  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },
  computed: {
    items: function () {
  return this.icon_position === 'left'
    ? [
        {
          title: 'Usuarios',
          icon: 'person',
          value: this.numUsuarios,
          color1: '#5064b5',
          color2: '#3e51b5',
        },
        {
          title: 'Usuarios Activos',
          icon: 'check_circle',
          value: this.numUsuariosActivos,
          color1: '#6d8ed9',
          color2: '#4e76d1',
        },
        {
          title: 'Usuarios Eliminados',
          icon: 'delete_sweep',
          value: this.numUsuariosInactivos,
          color1: '#9fb7ff',
          color2: '#82a1ff',
        },
        {
          title: 'Último Usuario',
          icon: 'person_add',
          value: this.nombreUsuarioReciente,
          color1: '#a0c8ff',
          color2: '#8bbcff',
        },
          ]
        : [
          ];
    },
    
    filteredUsers() {
    // Filtra la lista de usuarios para mostrar solo usuarios "activos" (activo === 1)
    return this.users.filter(user => user.activo === 1);
  },
  },
  
  methods: {
     // Función asincrónica para obtener el último usuario creado
     async getLastCreatedUser() {
  try {
    const response = await axios.get('http://localhost:8181/usuarios/nombreUsuarioReciente');
    this.nombreUsuarioReciente = response.data; // Asigna el nombre de usuario más reciente
  } catch (error) {
    console.error('Error al obtener el último usuario creado:', error);
  }
},
    // Función para obtener los usuarios desde el servidor
    async getUsers() {
  try {
    const response = await axios.get('http://localhost:8181/usuarios');
    const responseData = response.data; // Datos recibidos del servidor

    // Depura los datos para verificar su estructura y contenido
    console.log('Datos recibidos del servidor:', responseData);

    // Asigna los datos de usuarios a this.users
    this.users = responseData;

    // Calcula las estadísticas
    this.numUsuarios = this.users.filter(user => user.activo === 1).length;
    this.numUsuariosActivos = this.users.filter(user => user.estado === 1 && user.activo === 1).length;
    this.numUsuariosInactivos = this.users.filter(user => user.activo === 0).length;
    await this.getLastCreatedUser();

    console.log(this.users); // Imprime los datos asignados a this.users
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
},
    toggleTableFullscreen() {
    const table = this.$refs.myTable; // Reemplaza "myTable" con la referencia a tu tabla
    if (table) {
      table.toggleFullscreen(); // Utiliza una función similar si la tabla proporciona una función para la pantalla completa
    }
    
  },
  // Método para mostrar el cuadro de diálogo de confirmación
  showDeleteConfirmationDialog(user) {
      this.userToDelete = user; // Almacena el usuario que se va a eliminar
      this.showConfirmationDialog = true; // Muestra el cuadro de diálogo
    },
 // Método para confirmar la eliminación
 async confirmDeletion() {
      try {
        // Realiza la solicitud HTTP para eliminar el usuario
        await axios.put(`http://localhost:8181/usuarios/borrar/${this.userToDelete.idUsuario}`, {
          activo: 0, // Cambia el estado a "inactivo"
        });

        // Actualiza la lista de usuarios después de eliminarlo
        await this.getUsers();

        // Oculta el cuadro de diálogo
        this.showConfirmationDialog = false;

        // Muestra un mensaje de éxito
        this.$q.notify({
          type: 'negative',
          
          message: 'Usuario eliminado exitosamente.',
        });
      } catch (error) {
        // Muestra un mensaje de error en caso de fallo
        console.error('Error al eliminar el usuario:', error);
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Error al eliminar el usuario.',
        });
  }
  
},
// Método para cancelar la eliminación
cancelDeletion() {
      // Simplemente oculta el cuadro de diálogo
      this.showConfirmationDialog = false;
    },
    
},
///////////////////////////////
 
  ////////////
  mounted() {
    this.getUsers(); // Llama a la función cuando el componente se monta
  },
};
  
</script>

<style scoped>
.espacio-borde-cards {
  padding: 10px;
}

.espacio-borde-table {
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}

.espacio-borde-izquierda-form {
  padding-right: 10px;
}

.color-fondo {
  background-color: #EEEEEE;
  /* Cambia esto al color que desees */
}
</style>