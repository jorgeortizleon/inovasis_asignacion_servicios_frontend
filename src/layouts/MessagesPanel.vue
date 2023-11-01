<template>
    <div>
        <q-item v-if="notifications.length === 0">
            <q-item-section>
                <q-item-label>Sin Notificaciones</q-item-label>
            </q-item-section>
        </q-item>
        <q-item v-else v-for="notification in notifications" :key="notification.idnotificaciones" clickable v-ripple
            @click="handleNotificationClick(notification)">
            <q-item-section>
                <q-item-label>{{ notification.tituloServicio }}</q-item-label>
                <q-item-label caption lines="1">{{ notification.contenido }}</q-item-label>
            </q-item-section>
            <q-item-section side>
                {{ notification.fecha }}
            </q-item-section>
        </q-item>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'MessagesPanel',
    props: {
        badgeCount: Number,
    },
    setup(props, { emit }) {
        const notifications = ref([]);
        const authStore = useAuthStore();
        const router = useRouter();
        const eventHandled = ref(false);

        const getNotifications = async () => {
            try {
                const userId = authStore.user.idUsuario;
                const response = await axios.get(`http://localhost:8181/servicios/notificaciones/${userId}`);
                notifications.value = response.data;

                for (const notification of notifications.value) {
                    const serviceResponse = await axios.get(`http://localhost:8181/servicios/servicio/${notification.servicio_id}`);
                    notification.tituloServicio = serviceResponse.data;
                }
                eventHandled.value = false;
            } catch (error) {
                console.error('Error al recuperar las notificaciones', error);
            }
        };

        const handleNotificationClick = async (notification) => {
            if (!eventHandled.value) {
                router.push('/home');

                try {
                    await axios.post(`http://localhost:8181/servicios/marcarComoLeida/${notification.idnotificaciones}`);
                } catch (error) {
                    console.error('Error al marcar la notificación como leída', error);
                }
                emit('notification-click2');
                console.log('Evento emitido desde MessagesPanel.vue');
                eventHandled.value = true;
            }
            setTimeout(() => {
                router.push({ name: 'historial-servicio', params: { id: notification.servicio_id } });
            }, 0.5);
        };


        onMounted(getNotifications);

        return {
            eventHandled,
            notifications,
            handleNotificationClick,
        };
    },
});
</script>
