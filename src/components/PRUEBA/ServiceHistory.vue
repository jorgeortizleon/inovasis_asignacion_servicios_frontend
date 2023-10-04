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
                <q-item-section class="q-pa-md q-ml-none text-white">
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

    <!-- Tabla de servicios -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table
              ref="myTable"
              class="no-shadow"
              :rows="filteredServices"
              :columns="columns"
              title="Servicios"
              :hide-header="mode === 'grid'"
              :rows-per-page-options="[10000]"
            >
              <template v-slot:body-cell-Estado="props2">
                <q-td :props="props2" :class="{'bg-green-4': props2.row.Estado === 'Completado', 'bg-blue-4': props2.row.Estado === 'En Proceso', 'bg-yellow-4': props2.row.Estado === 'Pendiente'}">
                  {{ props2.row.Estado }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
</q-page>
</template>

<script>
export default {
  name: 'ServiciosPage',
  data() {
    return {
      selectedService: null, // Almacena el servicio seleccionado para mostrar en el diálogo de detalles
      showServiceDetails: false, // Para controlar la visibilidad del diálogo de detalles
      tipoDocumento: [], // Un array para almacenar las selecciones
      mode: 'list',
      showConfirmationDialog: false,
      showDialogCreate: false,
      observaciones: '', // Agregar el campo de observaciones
      isEditingObservations: false, // Agregar esta propiedad
      showDialogEditarServicio: false, // Para controlar la visibilidad del diálogo de edición de servicio
      selectedFilter: '', // Nuevo: propiedad para rastrear el filtro seleccionado
      columns: [
        { name: 'codigo', align: 'left', label: 'Código', field: 'codigo', sortable: true },
        { name: 'razonsocial', align: 'left', label: 'Razon Social', field: 'razonsocial', sortable: true },
        { name: 'supervisor', align: 'left', label: 'Supervisor', field: 'supervisor', sortable: true },
        { name: 'usuario', align: 'left', label: 'Usuario', field: 'usuario', sortable: true },
        { name: 'fecha', align: 'left', label: 'Fecha Inicio', field: 'fecha', sortable: true },
        { name: 'descripcion', align: 'left', label: 'Descripción', field: 'descripcion', sortable: true },
        { name: 'Estado', align: 'center', label: 'Estado', field: 'Estado', sortable: false },
      ],
      services: [
      {
        codigo: 'SERV001',
        razonsocial: 'Ateba',
        supervisor: 'Nayeli',
        usuario: 'Erick Sandoval',
        fecha: '2023-09-15',
        fechaFinalizacion: '2023-09-20', // Agrega la fecha de finalización
        descripcion: 'Servicio de mantenimiento',
        Estado: 'Completado',
        titulo: 'Mantenimiento de sistemas',
        solucion: 'Se realizó el mantenimiento de los sistemas con éxito.',
        hojaDeServicio: true, // Indica que se ha adjuntado una hoja de servicio
        factura: false, // Indica que no se ha adjuntado una factura
      },
      {
        codigo: 'SERV002',
        razonsocial: 'Integran',
        supervisor: 'Laura',
        usuario: 'Diego',
        fecha: '2023-09-20',
        fechaFinalizacion: '', // Agrega la fecha de finalización
        descripcion: 'Mantenimiento de sistemas',
        Estado: 'En Proceso',
        titulo: 'Mantenimiento de software',
        solucion: 'Se está realizando el mantenimiento de software.',
        hojaDeServicio: false, // No se ha adjuntado una hoja de servicio
        factura: true, // Indica que se ha adjuntado una factura
      },
      {
        codigo: 'SERV003',
        razonsocial: 'Barranco',
        supervisor: 'Fatima',
        usuario: 'Erick Sandoval',
        fecha: '2023-09-25',
        fechaFinalizacion: '', // Agrega la fecha de finalización
        descripcion: 'Instalación de software',
        Estado: 'Pendiente',
        titulo: 'Instalación de software',
        solucion: 'La instalación de software está pendiente.',
        hojaDeServicio: false, // No se ha adjuntado una hoja de servicio
        factura: false, // No se ha adjuntado una factura
      },
      {
        codigo: 'SERV004',
        razonsocial: 'Nu 3',
        supervisor: 'Fatima',
        usuario: 'Erick Sandoval',
        fecha: '2023-09-25',
        fechaFinalizacion: '2023-09-20', // Agrega la fecha de finalización
        descripcion: 'Instalación de software',
        Estado: 'En Proceso',
        titulo: 'Instalación de software',
        solucion: 'Se completó la instalación de software.',
        hojaDeServicio: true, // Indica que se ha adjuntado una hoja de servicio
        factura: false, // No se ha adjuntado una factura
      },
      {
        codigo: 'SERV005',
        razonsocial: 'Integran',
        supervisor: 'Laura',
        usuario: 'Diego',
        fecha: '2023-09-20',
        fechaFinalizacion: '', // Agrega la fecha de finalización
        descripcion: 'Mantenimiento de sistemas',
        Estado: 'Completado',
        titulo: 'Mantenimiento de software',
        solucion: 'Se está realizando el mantenimiento de software.',
        hojaDeServicio: true, // No se ha adjuntado una hoja de servicio
        factura: true, // Indica que se ha adjuntado una factura
      },
      ],
      nuevoServicio: {
      codigo: '',
      razonsocial: '',
      supervisor: '',
      usuario: '',
      fecha: '',
      descripcion: '',
      Estado: '',
    },
    estadoOptions: [
      
      { label: 'Inicio', value: 'Inicio' },
    ],
    nuevoServicioOptions: [
      { label: 'Completado', value: 'Completado' },
      { label: 'En Proceso', value: 'En Proceso' },
      { label: 'Pendiente', value: 'Pendiente' },
    ],
  };
  },
  props: {
    icon_position: {
      required: false,
      default: "left",
    },
  },
  computed: {
      
    items: function () {
      const completedServices = this.services.filter((service) => service.Estado === 'Completado');
      const inProgressServices = this.services.filter((service) => service.Estado === 'En Proceso');
      const pendingServices = this.services.filter((service) => service.Estado === 'Pendiente');

      return this.icon_position === 'left'
        ? [
            {
              title: 'Servicios',
              icon: 'settings',
              value: this.services.length,
              color1: '#BDBDBD',
              color2: '#838383',
            },
            {
              title: 'Servicios Completados',
              icon: 'check_circle',
              value: completedServices.length,
              color1: '#238b23',
              color2: '#185f18',
            },
            {
              title: 'Servicios en Proceso',
              icon: 'schedule',
              value: inProgressServices.length,
              color1: '#1162c6',
              color2: '#0b3b77',
            },
            {
              title: 'Servicios Pendientes',
              icon: 'warning',
              value: pendingServices.length,
              color1: '#FFA500', // Amarillo oscuro
              color2: '#FF8C00',
            },
          ]
        : [];
    },
    filterOptions() {
    // Opciones para el menú desplegable de filtro
    return [
      { label: 'Mostrar Todos', value: '' },
      { label: 'Completados', value: 'Completado' },
      { label: 'En Proceso', value: 'En Proceso' },
      { label: 'Pendientes', value: 'Pendiente' },
    ];
  },
  filteredServices() {
    // Filtra los servicios en función del filtro seleccionado
    if (this.selectedFilter === '') {
      // Si no se ha seleccionado un filtro, muestra todos los servicios
      return this.services;
    } else {
      // Filtra por el estado seleccionado
      return this.services.filter((service) => service.Estado === this.selectedFilter);
    }
  },
    
  },
  methods: {
    toggleTableFullscreen() {
      const table = this.$refs.myTable;
      if (table) {
        table.toggleFullscreen();
      }
    },
    crearServicio() {
    // Aquí debes implementar la lógica para crear un nuevo servicio.
    // Puedes acceder a los valores del formulario y agregar un nuevo servicio a la lista.
    // Por ejemplo:
     // Verificar si "Hoja de Servicio" está seleccionada
if (this.tipoDocumento.includes("hojaDeServicio")) {
  // Realizar acciones para Hoja de Servicio
}

// Verificar si "Factura" está seleccionada
if (this.tipoDocumento.includes("factura")) {
  // Realizar acciones para Factura
}
    const nuevoServicio = { ...this.nuevoServicio };
    this.services.push(nuevoServicio);

    // Cierra el diálogo de creación de servicio
    this.showDialogCreate = false;

    // Limpia el formulario para futuras entradas
    this.nuevoServicio = {
      codigo: '',
      razonsocial: '',
      supervisor: '',
      usuario: '',
      fecha: '',
      descripcion: '',
      Estado: '',
    };
  },
  cerrarDialogo() {
    // Cierra el diálogo de creación de servicio
    this.showDialogCreate = false;
  },
  viewServiceDetails(service) {
    this.selectedService = {
  // Copia los otros campos existentes desde el servicio seleccionado
  ...service,
  observaciones: service.observaciones || '',
  // Copia el campo de observaciones en una propiedad de respaldo para cancelar la edición si es necesario
  observacionesOriginal: service.observaciones || '',
};
  this.selectedService = service; // Almacena el servicio seleccionado
  this.showServiceDetails = true; // Abre el diálogo de detalles
  
},
saveObservations() {
  // Aquí puedes guardar las observaciones en tu sistema (por ejemplo, hacer una solicitud a un servidor si es necesario).
  // Luego, puedes cerrar la edición de las observaciones:
  this.isEditingObservations = false;
},
cancelEditingObservations() {
  // Cancela la edición de las observaciones y restaura el valor original.
  this.selectedService.observaciones = this.selectedService.observacionesOriginal;
  this.isEditingObservations = false;
},
// Método para abrir el diálogo de edición de servicio
editService(service) {
  // Copia el servicio seleccionado para edición
  this.selectedService = { ...service };

  // Abre el diálogo de edición de servicio
  this.showDialogEditarServicio = true;
},

// Método para guardar los cambios en el servicio editado
saveServiceChanges() {
  // Aquí puedes implementar la lógica para guardar los cambios en el servicio.
  // Por ejemplo, puedes actualizar el servicio en la lista de servicios.
  
  // Cierra el diálogo de edición de servicio
  this.showDialogEditarServicio = false;
},

// Método para cancelar la edición del servicio
cancelServiceEditing() {
  // Restaura el servicio a su estado original
  this.selectedService = null;

  // Cierra el diálogo de edición de servicio
  this.showDialogEditarServicio = false;
},

},
 
};
</script>

<style scoped>
.espacio-borde-cards {
  padding: 10px;
}
.espacio-borde-izquierda-form {
  margin-left: 20px;
}
.espacio-borde-table {
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}

.color-fondo {
  background-color: #EEEEEE;
}

/* Clases de fondo para diferentes estados */
.bg-green-4 {
  background-color: green; /* Cambia este color según tus preferencias */
}

.bg-blue-4 {
  background-color: blue; /* Cambia este color según tus preferencias */
}

.bg-yellow-4 {
  background-color: yellow; /* Cambia este color según tus preferencias */
}
/* Estilo personalizado para el menú desplegable */
.q-select-filter {
width: 220px; /* Ancho personalizado */
border: 1px solid #ccc; /* Borde personalizado */
border-radius: 4px; /* Bordes redondeados */
background-color: #f9f9f9; /* Color de fondo */
}

.q-select-filter .q-field__inner {
padding: 6px 10px; /* Espaciado interior */
}

.q-select-filter .q-field__input {
font-size: 14px; /* Tamaño de fuente */
}

/* Estilo para los íconos en las opciones del menú desplegable */
.q-option-icon {
font-size: 18px; /* Tamaño de fuente de los íconos */
margin-right: 8px; /* Espacio entre el ícono y la etiqueta de opción */
}
.ancho-personalizado {
width: 300px; /* El ancho que desees */
}
</style>
