<template>
    <!-- Agrega un cuadro de diálogo para editar el estado y la descripción del cambio -->
    <q-dialog v-model="mostrarDialogoEdicion" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Servicio</div>
        </q-card-section>
        <q-card-section>
        <q-form ref="editarFormulario" @submit.prevent="editarServicio">
          <!-- Campo para editar el estado -->
          <q-select
            filled
            v-model="estadoEditado"
            label="Estado"
            :options="estadosDisponibles"
            dense
          ></q-select>

          <!-- Campo para agregar la descripción del cambio -->
          <q-input
            filled
            v-model="descripcionCambio"
            label="Descripción del Cambio"
            hint="Introduzca la descripción del cambio"
            dense
          ></q-input>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="red" @click="cancelarEdicion" />
            <q-btn flat label="Guardar Cambios" color="green" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      // Define las propiedades que necesites para pasar datos al componente de edición
      servicioAEditar: Object, // Prop para recibir el servicio a editar
    },
  
    data() {
      return {
      mostrarDialogoEdicion: false,
      estadoEditado: '',
      descripcionCambio: '',
      estadosDisponibles: ['Completado', 'En Proceso', 'Pendiente'],
    };
  },
  
    methods: {
       // Método para mostrar el cuadro de diálogo de edición
    mostrarDialogoEdicionServicio() {
      // Carga los datos del servicio a editar en el formulario
      this.estadoEditado = this.servicioAEditar.estado;
      this.descripcionCambio = ''; // Puedes ajustar esto según tus necesidades

      // Abre el cuadro de diálogo de edición
      this.mostrarDialogoEdicion = true;
    },
  
      // Método para cancelar la edición y cerrar el cuadro de diálogo
      cancelarEdicion() {
        this.mostrarDialogoEdicion = false;
        this.estadoEditado = '';
        this.descripcionCambio = '';
      },
  
      // Método para enviar los datos editados al servidor
      async editarServicio() {
        try {
          // Valida el formulario antes de enviar los datos al servidor
          const isValid = await this.$refs.editarFormulario.validate();
  
          if (isValid) {
            // Obtiene el ID del servicio a editar
            const servicioId = this.servicioAEditar.idServicio;
  
            // Construye el objeto con los datos editados
            const datosEditados = {
              estado: this.estadoEditado,
              descripcionCambio: this.descripcionCambio,
            };
  
            // Realiza una solicitud PUT al servidor para actualizar el servicio
            await axios.put(`URL_DE_TU_API_PARA_ACTUALIZAR_SERVICIO/${servicioId}`, datosEditados);
  
            // Cierra el cuadro de diálogo de edición
            this.mostrarDialogoEdicion = false;
  
            // Muestra un mensaje de éxito
            this.$q.notify({
              color: 'positive',
              icon: 'check',
              message: 'Servicio actualizado correctamente.',
            });
  
            // Emite un evento para notificar al componente padre que se ha editado el servicio
            this.$emit('servicio-editado', servicioId);
          }
        } catch (error) {
          // Manejo de errores
          console.error('Error al editar el servicio:', error);
        }
      },
    },
  };
  </script>
  