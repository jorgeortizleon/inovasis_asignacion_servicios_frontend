<template>
  <q-page class="color-fondo">

    <!-- Seccion de las 4 cards de la pasre superior -->
    <div icon_position="left" class="espacio-borde-cards">
      <q-card class="bg-transparent no-shadow no-border" bordered>
        <q-card-section class="q-pa-none">
          <div class="row q-col-gutter-sm ">
            <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
              <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
                <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`"
                  class=" q-pa-lg q-mr-none text-white">
                  <q-icon :name="item.icon" color="white" size="24px"></q-icon>
                </q-item-section>
                <q-item-section class=" q-pa-md q-ml-none  text-white">
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

    <!-- tabla clientes -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table :dense="$q.screen.lt.md" class="no-shadow" :rows="rows" title="Clientes"
              :hide-header="mode === 'grid'" :columns="columns" row-key="idCliente" :filter="filter"
              :rows-per-page-options="[10000]" no-data-label="No hay clientes"
              no-results-label="No se encuentra un cliente que coincida">
              <template v-slot:body-cell-estado="props">
                <q-td :props="props">
                  <div>
                    <q-badge :color="props.value === 'Activo' ? 'green' : 'negative'" :label="props.value" />
                  </div>
                </q-td>
              </template>
              <template v-slot:top-right="props">
                <q-input outlined borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen" v-if="mode === 'list'" class="q-px-sm">
                  <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{ props.inFullscreen ? 'Exit Fullscreen' :
                    'Toggle Fullscreen' }}
                  </q-tooltip>
                </q-btn>
                <q-btn color="primary" label="Crear Cliente" @click="showDialogCreate = true" />
              </template>
              <template v-slot:body-cell-actions="props2">
                <q-td :props="props2" class="q-gutter-sm">
                  <q-btn icon="edit" color="primary" flat round dense @click="editarCliente(props2)" />
                  <q-btn icon="delete" color="negative" flat round dense @click="borrarCliente(props2)" />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Dialogo de crear clientes -->
    <q-dialog v-model="showDialogCreate" ref="dialogCreate" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Crear cliente</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="codigo" label="Código" hint="Introduzca el código" lazy-rules counter
                maxlength="50" :rules="[val => val && val.length > 0 || 'Este campo no puede estar vacío.']">
                <template v-slot:prepend>
                  <q-icon name="text_snippet" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="codigo = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="razonSocial" label="Razón Social" hint="Introduzca la razón social" lazy-rules
                counter maxlength="50" :rules="[noVacio, soloMayusculasSinAcentos]">
                <template v-slot:prepend>
                  <q-icon name="business" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="razonSocial = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="correo" label="Correo" hint="Introduzca el correo" lazy-rules counter
                maxlength="50" :rules="[noVacio, formatoCorreoValido]">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="correo = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="q-gutter-md row items-center">
              <div class="col">
                <q-input filled v-model="telefono" label="Teléfono" hint="Introduzca el teléfono" lazy-rules
                  :rules="[noVacio, formatoNumeroValido]">
                  <template v-slot:prepend>
                    <q-icon name="call" />
                  </template>
                  <template v-slot:append>
                    <q-icon v-if="text !== ''" name="close" @click="telefono = ''" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-select filled v-model="estado" :options="options" label="Estado" emit-value map-options
                  hint="Introduzca el estado">
                  <template v-slot:prepend>
                    <q-icon name="checklist_rtl" />
                  </template>
                </q-select>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cerrar" color="red" @click="botonCloseDialogs()" />
          <q-space></q-space>
          <q-btn flat label="Crear" icon-right="add_circle" color="green" @click="botonCrearCliente()"
            :disable="disableBtn() || formatoNumeroValidoBtn(this.telefono) || formatoCorreoValidoBtn(this.correo) || soloMayusculasSinAcentosBtn(this.razonSocial)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialogo de editar clientes -->
    <q-dialog v-model="showDialogEditar" ref="dialogEditar" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Editar cliente</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="codigo" label="Código" hint="Introduzca el código" lazy-rules counter
                maxlength="50" :rules="[val => val && val.length > 0 || 'Por favor escriba algo']">
                <template v-slot:prepend>
                  <q-icon name="text_snippet" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="codigo = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="razonSocial" label="Razón Social" hint="Introduzca la razón social" lazy-rules
                counter maxlength="50" :rules="[noVacio, soloMayusculasSinAcentos]">
                <template v-slot:prepend>
                  <q-icon name="business" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="razonSocial = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="correo" label="Correo" hint="Introduzca el correo" lazy-rules counter
                maxlength="50" :rules="[noVacio, formatoCorreoValido]">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="correo = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="q-gutter-md row items-center">
              <div class="col">
                <q-input filled v-model="telefono" label="Teléfono" hint="Introduzca el teléfono" lazy-rules
                  :rules="[noVacio, formatoNumeroValido]">
                  <template v-slot:prepend>
                    <q-icon name="call" />
                  </template>
                  <template v-slot:append>
                    <q-icon v-if="text !== ''" name="close" @click="telefono = ''" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-select filled v-model="estado" :options="options" label="Estado" emit-value map-options
                  hint="Introduzca el estado">
                  <template v-slot:prepend>
                    <q-icon name="checklist_rtl" />
                  </template>
                </q-select>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cerrar" color="red" @click="botonCloseDialogs()" />
          <q-space></q-space>
          <q-btn flat label="Editar" icon-right="edit" color="green" @click="botonEditarCliente()"
            :disable="disableBtn() || formatoNumeroValidoBtn(this.telefono) || formatoCorreoValidoBtn(this.correo) || soloMayusculasSinAcentosBtn(this.razonSocial)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialogo de borrar clientes -->
    <q-dialog v-model="showDialogBorrar" ref="dialogEditar" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Eliminar cliente</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          ¿Seguro que desea eliminar el cliente seleccionado?
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancelar" color="red" @click="botonCloseDialogs()" />
          <q-space></q-space>
          <q-btn flat label="Eliminar" icon-right="delete" color="primary" @click="botonBorrarCliente()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from "axios";
import { configStore } from "src/stores/config.js";
const configFromStore = configStore();
// configFromStore.ip +

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

//id,codigo, razon, correo, telefono, estad

const columns = [
  { name: 'idCliente', align: 'left', label: 'ID', field: 'idCliente', sortable: true },
  { name: 'codigo', align: 'left', label: 'Codigo', field: 'codigo', sortable: true },
  {
    name: 'razonSocial',
    required: true,
    label: 'Razon social',
    align: 'left',
    field: 'razonSocial',
    sortable: true
  },
  {
    name: 'correo',
    align: 'left',
    label: 'Correo',
    field: 'correo',
    sortable: true,
  },
  {
    name: 'telefono',
    required: true,
    label: 'Telefono',
    align: 'left',
    field: 'telefono',
    sortable: true
  },
  {
    name: 'estado',
    align: 'center',
    label: 'Estado',
    field: 'estado',
    sortable: true,
    format: (val) => (val === 1 ? 'Activo' : 'No Activo'),
  },
  {
    name: 'actions',
    field: 'actions',
    label: 'Editar/Borrar',
    align: 'center',
  },
];

const rows = [];
const $q = useQuasar()
const filter = ref('')

export default {
  name: 'ClientesPage',
  data() {
    return {
      allRules: ref(false),
      numClientes: ref(''),
      numClientesActivos: ref(''),
      numClientesBorrados: ref(''),
      ultimoCliente: ref(''),
      indexEditar: ref(null),
      idEditar: ref(null),
      indexBorrar: ref(null),
      idBorrar: ref(null),
      filter,
      mode: 'list',
      columns,
      codigo: ref(''),
      razonSocial: ref(''),
      correo: ref(''),
      telefono: ref(''),
      estado: ref('1'),
      rows: ref([]),
      showDialogCreate: ref(false),
      showDialogEditar: ref(false),
      showDialogBorrar: ref(false),
      pagination: {
        rowsPerPage: 10
      },
      options: [
        {
          label: 'Activo',
          value: '1'
        },
        {
          label: 'No Activo',
          value: '0'
        },
      ],

      exportTable() {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }

    };
  },

  created() {
    axios.get(configFromStore.ip + "/clientes").then((resultado) => {
      this.rows = resultado.data;
    });

    axios.get(configFromStore.ip + "/clientes/numTotalClientes").then((resultado) => {
      this.numClientes = resultado.data
    });

    axios.get(configFromStore.ip + "/clientes/clientesActivos").then((resultado) => {
      this.numClientesActivos = resultado.data
    });

    axios.get(configFromStore.ip + "/clientes/clientesBorrados").then((resultado) => {
      this.numClientesBorrados = resultado.data
    });

    axios.get(configFromStore.ip + "/clientes/razonsocialClienteReciente").then((resultado) => {
      this.ultimoCliente = resultado.data
    });
  },

  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },

  computed: {
    items: function () {
      return this.icon_position === "left"
        ? [
          {
            title: "Clientes",
            icon: "person",
            value: this.numClientes,
            color1: "#1162c6",
            color2: "#0b3b77"
          },
          {
            title: "Activos",
            icon: "check_circle",
            value: this.numClientesActivos,
            color1: "#238b23",
            color2: "#185f18"
          },
          {
            title: "Borrados",
            icon: "no_accounts",
            value: this.numClientesBorrados,
            color1: "#c20900",
            color2: "#9d0800"
          },
          {
            title: "Ultimo agregado",
            icon: "replay",
            value: this.ultimoCliente,
            color1: "#204cc3",
            color2: "#17378b"
          }
        ]
        : [
          {
            title: "Monthly Income",
            icon: "fas fa-dollar-sign",
            value: "$ 20k",
            color1: "#546bfa",
            color2: "#3e51b5"
          },
          {
            title: "Weekly Sales",
            icon: "fas fa-chart-bar",
            value: "20",
            color1: "#3a9688",
            color2: "#3e51b5"
          },
          {
            title: "New Customers",
            icon: "fas fa-chart-line",
            value: "321",
            color1: "#7cb342",
            color2: "#3e51b5"
          },
          {
            title: "Active Users",
            icon: "person",
            value: "82",
            color1: "#f88c2b",
            color2: "#3e51b5"
          }
        ];
    },


  },

  methods: {
    botonCrearCliente() {
      const clientedto = {
        codigo: this.codigo,
        razonSocial: this.razonSocial,
        correo: this.correo,
        telefono: this.telefono,
        estado: this.estado || 0,
      };
      // this.rows.push(clientedto)
      this.ultimoCliente = this.razonSocial
      this.numClientes++
      axios.post(configFromStore.ip + '/clientes', clientedto)
        .then(response => {
          console.log('Cliente creado con éxito: ' + response.status);
          // console.log(response);
          this.$refs.dialogCreate.hide();
          this.codigo = "";
          this.razonSocial = "";
          this.correo = "";
          this.telefono = "";
          this.estado = "1";
          axios.get(configFromStore.ip + "/clientes").then((resultado) => {
            this.rows = resultado.data;
          });
          axios.get(configFromStore.ip + "/clientes/clientesActivos").then((resultado) => {
            this.numClientesActivos = resultado.data
          });
          this.$q.notify({
            type: 'positive',
            message: "Cliente creado con exito",
            progress: true,
            timeout: 1000,
          });
        })
        .catch(error => {
          console.error('Error al crear el cliente:', error);
          this.$q.notify({
            type: 'negative',
            message: "Error: " + error.message,
            progress: true,
            timeout: 1000,
          });
        });

      axios.get(configFromStore.ip + "/clientes").then((resultado) => {
        this.rows = resultado.data;
      });

    },

    borrarCliente(props2) {
      this.idBorrar = props2.key
      this.indexBorrar = props2.pageIndex
      this.showDialogBorrar = true
    },

    editarCliente(props2) {
      // console.log("Id del row "+props2.key)
      // console.log("index del objeto "+props2.pageIndex)
      this.editProps = props2,
        this.indexEditar = props2.pageIndex,
        this.idEditar = props2.key,
        this.codigo = props2.row.codigo,
        this.razonSocial = props2.row.razonSocial,
        this.correo = props2.row.correo,
        this.telefono = props2.row.telefono,
        this.estado = props2.row.estado === 1 ? '1' : '0',
        this.showDialogEditar = true
    },

    botonEditarCliente() {
      if (this.indexEditar >= 0 && this.indexEditar < this.rows.length) {
        const estadoTemporal = this.rows[this.indexEditar].estado;

        this.rows[this.indexEditar].codigo = this.codigo;
        this.rows[this.indexEditar].razonSocial = this.razonSocial;
        this.rows[this.indexEditar].correo = this.correo;
        this.rows[this.indexEditar].telefono = this.telefono;
        this.rows[this.indexEditar].estado = this.estado === '1' ? 1 : 0;

        const clientedto = {
          codigo: this.codigo,
          razonSocial: this.razonSocial,
          correo: this.correo,
          telefono: this.telefono,
          estado: this.rows[this.indexEditar].estado,
        };

        axios.put(configFromStore.ip + `/clientes/${this.idEditar}`, clientedto)
          .then(response => {
            console.log('Cliente editado con éxito:');
            axios.get(configFromStore.ip + "/clientes/clientesActivos").then((resultado) => {
              this.numClientesActivos = resultado.data
            });
            this.$q.notify({
              type: "info",
              message: "Cliente editado con éxito",
              progress: true,
              timeout: 1000,
            });
            console.log(response);
            this.$refs.dialogCreate.hide();
            this.codigo = "";
            this.razonSocial = "";
            this.correo = "";
            this.telefono = "";
            this.estado = "1";
          })
          .catch(error => {
            console.error('Error al editar el cliente:', error);
            this.rows[this.indexEditar].estado = estadoTemporal;
            this.$q.notify({
              type: 'negative',
              progress: true,
              message: "Error: " + error.message,
              timeout: 1000,
            });
          });
      } else {
        console.error('Índice fuera de rango');
      }
      this.botonCloseDialogs();

    },

    botonBorrarCliente() {
      console.log(this.idBorrar)
      console.log(this.indexBorrar)

      axios.get(configFromStore.ip + `/clientes/borrar/${this.idBorrar}`)
        .then(response => {
          console.log('Cliente eliminado con éxito:', response.status);
          this.rows.splice(this.indexBorrar, 1);
          axios.get(configFromStore.ip + "/clientes/clientesActivos").then((resultado) => {
            this.numClientesActivos = resultado.data
          });
          this.$q.notify({
            type: "negative",
            message: "Cliente eliminado con éxito",
            progress: true,
            timeout: 1000,
          });
        })
        .catch(error => {
          console.error('Error al eliminar el cliente:', error);
          this.$q.notify({
            type: 'negative',
            message: "Error: " + error.message,
            progress: true,
            timeout: 1000,
          });
        });
      this.numClientesBorrados++
      this.numClientes--
      this.botonCloseDialogs();
    },

    botonCloseDialogs() {
      this.showDialogCreate = false
      this.showDialogEditar = false
      this.showDialogBorrar = false
      this.codigo = "";
      this.razonSocial = "";
      this.correo = "";
      this.telefono = "";
      this.estado = "1";
    },

    //Form Rules

    // Regla para verificar si el campo no está vacío
    noVacio(value) {
      return value.trim() !== '' || 'Este campo no puede estar vacío.';
    },

    // Regla para verificar si solo contiene mayúsculas sin acentos
    soloMayusculasSinAcentos(value) {
      const mayusculas = /^[A-Z\s]*$/;
      return mayusculas.test(value) || 'Solo se permiten mayúsculas sin acentos.';
    },

    // Regla para verificar el formato válido de un correo electrónico
    formatoCorreoValido(value) {
      const formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return formatoCorreo.test(value) || 'Introduce un correo electrónico válido.';
    },

    // Regla para verificar el formato válido del número de teléfono o celular
    formatoNumeroValido(value) {
      const formatoNumero = /^[0-9\s]+$/;
      console.log(formatoNumero.test(value))
      return formatoNumero.test(value) || 'Introduce un número de teléfono o celular válido.';
    },

    disableBtn() {
      if (this.razonSocial !== "" && this.codigo !== "" && this.correo !== "" && this.telefono !== "") {
        return false;
      } else {
        return true;
      }
    },

    formatoNumeroValidoBtn(value) {
      const formatoNumero = /^[0-9\s]+$/;
      const esValido = formatoNumero.test(value);
      if (esValido) {
        return false;
      } else {
        return true;
      }
    },

    formatoCorreoValidoBtn(value) {
      const formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const esValido = formatoCorreo.test(value);
      if (esValido) {
        return false;
      } else {
        return true;
      }
    },

    soloMayusculasSinAcentosBtn(value) {
      const mayusculas = /^[A-Z\s]*$/;
      const esValido = mayusculas.test(value);
      if (esValido) {
        return false;
      } else {
        return true;
      }
    },

  },

};
</script>

<style>
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
}
</style>
