<template>
  <q-page class="color-fondo">

    <!-- Seccion de las 3 cards de la pasre superior -->
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item class="q-pa-none" :style="`background-color: #1162c6 `">
              <q-item-section side class="text-white q-pa-lg q-mr-none" :style="`background-color: #0b3b77 `">
                <q-icon name="supervisor_account" color="white" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{ numRoles }}</q-item-label>
                <q-item-label>Roles</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item class="q-pa-none" :style="`background-color: #238b23 `">
              <q-item-section side class="text-white q-pa-lg q-mr-none" :style="`background-color: #185f18 `">
                <q-icon name="replay" color="white" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{ ultimoRolAgregado }}</q-item-label>
                <q-item-label>Ultimo Agregado</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item class="q-pa-none" :style="`background-color: #BDBDBD `">
              <q-item-section side class="text-white q-pa-lg q-mr-none" :style="`background-color: #838383 `">
                <q-icon name="person" color="white" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{ nombreRol }}</q-item-label>
                <q-item-label>Mi Rol</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card>
      </div>
    </div>

    <!-- tabla roles -->
    <div class="row q-col-gutter-sm espacio-borde-table">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8 no-shadow" bordered>
          <q-card-section class="q-pa-none">
            <q-table class="no-shadow" :rows="rows" title="Roles" :hide-header="mode === 'grid'" :columns="columns"
              row-key="idRol" :filter="filter" :rows-per-page-options="[10000]" no-data-label="No hay roles"
              no-results-label="No se encuentra un rol que coincida">
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
                <q-btn color="primary" label="Crear Rol" @click="showDialogCreate = true" />
              </template>
              <template v-slot:body-cell-actions="props2">
                <q-td :props="props2" class="q-gutter-sm">
                  <q-btn icon="edit" color="primary" flat round dense @click="editarPermiso(props2)" />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Dialogo de crear rol con permisos -->
    <q-dialog v-model="showDialogCreate" ref="dialogCreate" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Crear Rol</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="q-gutter-md espacio-borde-izquierda-form">
              <q-input filled v-model="nombreRolNuevo" label="Nombre" hint="Introduzca el nombre de su rol nuevo" counter
                maxlength="50" lazy-rules :rules="[val => val && val.length > 0 || 'Este campo no puede estar vacío.']">
                <template v-slot:prepend>
                  <q-icon name="supervisor_account" />
                </template>
                <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="nombreRolNuevo = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="text-subtitle2">Permisos</div>
            <div class="row">
              <div class="col-md-6">
                <q-item>
                  <q-item-section>
                    <q-checkbox v-model="checkbox1" label="Usuarios" />
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-md-6">
                <q-item>
                  <q-item-section>
                    <q-checkbox v-model="checkbox2" label="Servicios" />
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <q-item>
                  <q-item-section>
                    <q-checkbox v-model="checkbox3" label="Clientes" />
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-md-6">
                <q-item>
                  <q-item-section>
                    <q-checkbox v-model="checkbox4" label="Reportes" />
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <q-item>
                  <q-item-section>
                    <q-checkbox v-model="checkbox5" label="Configuracion" />
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-md-6">
                <q-item>
                  <q-item-section>
                    <q-checkbox v-model="checkbox6" label="Acerca de" />
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cerrar" color="red" @click="botonCloseDialogs()" />
          <q-space></q-space>
          <q-btn flat label="Crear" icon-right="add_circle" color="green" @click="botonCrearRol()"
            :disable="disableBtn()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialogo de editar permisos -->
    <q-dialog v-model="showDialogEditar" ref="dialogEditar" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Editar Permisos</div>
          <div class="text-subtitle2">{{ nombreEditar }}</div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox1" label="Usuarios" />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox2" label="Servicios" />
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox3" label="Clientes" />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox4" label="Reportes" />
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox5" label="Configuracion" />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-6">
              <q-item>
                <q-item-section>
                  <q-checkbox v-model="checkbox6" label="Acerca de" />
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cerrar" color="red" @click="botonCloseDialogs()" />
          <q-space></q-space>
          <q-btn flat label="Editar" icon-right="edit" color="green" @click="botonEditarPermiso()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from "axios";
import { useAuthStore } from "src/stores/auth";

const useAuth = useAuthStore();

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

//id,nombreRolNuevo, razon, correo, telefono, estad

const columns = [
  { name: 'idRol', align: 'left', label: 'ID', field: 'idRol', sortable: true },
  {
    name: 'Descripcion',
    required: true,
    label: 'Descripcion',
    align: 'left',
    field: 'descripcion',
    sortable: true
  },
  {
    name: 'Fecha Registro',
    required: true,
    label: 'Fecha Registro',
    align: 'left',
    field: 'fechaRegistro',
    sortable: true,
    format: (val) => {
      const date = new Date(val);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} a las ${formattedTime}`;
    },
  },
  {
    name: 'actions',
    field: 'actions',
    label: 'Editar Permisos',
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
      useAuth,
      allRules: ref(false),
      numRoles: ref(''),
      ultimoRolAgregado: ref(''),
      nombreRol: ref(''),
      checkbox1: ref(false),
      checkbox2: ref(false),
      checkbox3: ref(false),
      checkbox4: ref(false),
      checkbox5: ref(false),
      checkbox6: ref(false),
      nombreEditar: ref(""),
      indexEditar: ref(null),
      idEditar: ref(null),
      filter,
      mode: 'list',
      columns,
      nombreRolNuevo: ref(''),
      rows: ref([]),
      idUltimoRolAgregado: ref(''),
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
    axios.get("http://localhost:8181/roles").then((resultado) => {
      this.rows = resultado.data;
    });

    axios.get("http://localhost:8181/roles/totalRoles").then((resultado) => {
      this.numRoles = resultado.data
    });

    axios.get("http://localhost:8181/roles/ultimoRolAgregado").then((resultado) => {
      this.ultimoRolAgregado = resultado.data
    });

    axios.get("http://localhost:8181/roles/nombreRol/" + useAuth.user.idRol).then((resultado) => {
      this.nombreRol = resultado.data
    });
  },

  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },

  computed: {

  },

  methods: {
    botonCrearRol() {
      this.ultimoRolAgregado = this.nombreRolNuevo
      this.numRoles++

      axios.post('http://localhost:8181/roles/crear?Nombre=' + this.nombreRolNuevo)
        .then(response => {
          console.log('Rol creado con éxito: ' + response.status);
          axios.get("http://localhost:8181/roles/idUltimoRol")
            .then((resultado) => {
              this.idUltimoRolAgregado = resultado.data;
              if (this.checkbox1 === true) {
                this.checkbox1 = 1
              } else {
                this.checkbox1 = 0
              }
              if (this.checkbox2 === true) {
                this.checkbox2 = 1
              } else {
                this.checkbox2 = 0
              }
              if (this.checkbox3 === true) {
                this.checkbox3 = 1
              } else {
                this.checkbox3 = 0
              }
              if (this.checkbox4 === true) {
                this.checkbox4 = 1
              } else {
                this.checkbox4 = 0
              }
              if (this.checkbox5 === true) {
                this.checkbox5 = 1
              } else {
                this.checkbox5 = 0
              }
              if (this.checkbox6 === true) {
                this.checkbox6 = 1
              } else {
                this.checkbox6 = 0
              }
              axios.post("http://localhost:8181/permisos/crear?IdRol=" + this.idUltimoRolAgregado + "&NombreMenu=menuUsuario&Estado=" + this.checkbox1)
              axios.post("http://localhost:8181/permisos/crear?IdRol=" + this.idUltimoRolAgregado + "&NombreMenu=menuServicio&Estado=" + this.checkbox2)
              axios.post("http://localhost:8181/permisos/crear?IdRol=" + this.idUltimoRolAgregado + "&NombreMenu=menuClientes&Estado=" + this.checkbox3)
              axios.post("http://localhost:8181/permisos/crear?IdRol=" + this.idUltimoRolAgregado + "&NombreMenu=menuReportes&Estado=" + this.checkbox4)
              axios.post("http://localhost:8181/permisos/crear?IdRol=" + this.idUltimoRolAgregado + "&NombreMenu=menuConfiguracion&Estado=" + this.checkbox5)
              axios.post("http://localhost:8181/permisos/crear?IdRol=" + this.idUltimoRolAgregado + "&NombreMenu=menuAcercade&Estado=" + this.checkbox6)

              axios.get("http://localhost:8181/roles").then((resultado) => {
                this.rows = resultado.data;
              });

            });
        });

      this.botonCloseDialogs();
    },

    // borrarCliente(props2) {
    //   this.idBorrar = props2.key
    //   this.indexBorrar = props2.pageIndex
    //   this.showDialogBorrar = true
    // },

    editarPermiso(props2) {
      this.indexEditar = props2.pageIndex,
        this.idEditar = props2.key,
        this.nombreEditar = props2.row.descripcion,
        axios.get("http://localhost:8181/permisos/menuUsuarios/" + this.idEditar).then((resultado) => {
          if (resultado.data === 1) {
            this.checkbox1 = true
          } else {
            this.checkbox1 = false
          }
        });

      axios.get("http://localhost:8181/permisos/menuServicios/" + this.idEditar).then((resultado) => {
        if (resultado.data === 1) {
          this.checkbox2 = true
        } else {
          this.checkbox2 = false
        }
      });

      axios.get("http://localhost:8181/permisos/menuClientes/" + this.idEditar).then((resultado) => {
        if (resultado.data === 1) {
          this.checkbox3 = true
        } else {
          this.checkbox3 = false
        }
      });

      axios.get("http://localhost:8181/permisos/menuReportes/" + this.idEditar).then((resultado) => {
        if (resultado.data === 1) {
          this.checkbox4 = true
        } else {
          this.checkbox4 = false
        }
      });

      axios.get("http://localhost:8181/permisos/menuConfig/" + this.idEditar).then((resultado) => {
        if (resultado.data === 1) {
          this.checkbox5 = true
        } else {
          this.checkbox5 = false
        }
      });

      axios.get("http://localhost:8181/permisos/menuAcercade/" + this.idEditar).then((resultado) => {
        if (resultado.data === 1) {
          this.checkbox6 = true
        } else {
          this.checkbox6 = false
        }
      });

      this.showDialogEditar = true
    },

    botonEditarPermiso() {
      if (this.checkbox1 === true) {
        this.checkbox1 = 1
      } else {
        this.checkbox1 = 0
      }
      if (this.checkbox2 === true) {
        this.checkbox2 = 1
      } else {
        this.checkbox2 = 0
      }
      if (this.checkbox3 === true) {
        this.checkbox3 = 1
      } else {
        this.checkbox3 = 0
      }
      if (this.checkbox4 === true) {
        this.checkbox4 = 1
      } else {
        this.checkbox4 = 0
      }
      if (this.checkbox5 === true) {
        this.checkbox5 = 1
      } else {
        this.checkbox5 = 0
      }
      if (this.checkbox6 === true) {
        this.checkbox6 = 1
      } else {
        this.checkbox6 = 0
      }
      axios.put(`http://localhost:8181/permisos/modificarpermisoMenuUsuarios?estado=${this.checkbox1}&permiso=menuUsuario&idrol=${this.idEditar}`)
      axios.put(`http://localhost:8181/permisos/modificarpermisoMenuUsuarios?estado=${this.checkbox2}&permiso=menuServicio&idrol=${this.idEditar}`)
      axios.put(`http://localhost:8181/permisos/modificarpermisoMenuUsuarios?estado=${this.checkbox3}&permiso=menuClientes&idrol=${this.idEditar}`)
      axios.put(`http://localhost:8181/permisos/modificarpermisoMenuUsuarios?estado=${this.checkbox4}&permiso=menuReportes&idrol=${this.idEditar}`)
      axios.put(`http://localhost:8181/permisos/modificarpermisoMenuUsuarios?estado=${this.checkbox5}&permiso=menuConfiguracion&idrol=${this.idEditar}`)
      axios.put(`http://localhost:8181/permisos/modificarpermisoMenuUsuarios?estado=${this.checkbox6}&permiso=menuAcercade&idrol=${this.idEditar}`)
        .then(response => {
          this.$q.notify({
            type: "info",
            message: "Permisos editados con éxito",
            progress: true,
            timeout: 1000,
          });
          console.log(response);
        })
        .catch(error => {
          console.error('Error al editar los permisos del rol:', error);
          this.$q.notify({
            type: 'negative',
            progress: true,
            message: "Error: " + error.message,
            timeout: 1000,
          });
        });

      this.botonCloseDialogs();

    },

    botonCloseDialogs() {
      this.showDialogCreate = false
      this.showDialogEditar = false
      this.showDialogBorrar = false
      this.checkbox1 = false
      this.checkbox2 = false
      this.checkbox3 = false
      this.checkbox4 = false
      this.checkbox5 = false
      this.checkbox6 = false
    },

    disableBtn() {
      if (this.nombreRolNuevo !== '') {
        return false;
      } else {
        return true;
      }
    },

  },

};
</script>

<style scoped>
.espacio-borde-cards {
  padding: 10px;
}

.espacio-borde-table {
  padding-top: 10px;
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
