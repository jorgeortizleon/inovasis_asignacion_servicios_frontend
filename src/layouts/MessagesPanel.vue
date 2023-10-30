<template>
    <div>
        <q-item style="max-width: 420px" v-for="notification in notifications" :key="notification.idnotificaciones"
            clickable v-ripple @click="handleNotificationClick(notification.servicio_id)">
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

        const getNotifications = async () => {
            try {
                const userId = authStore.user.idUsuario;
                const response = await axios.get(`http://localhost:8181/servicios/notificaciones/${userId}`);
                notifications.value = response.data;

                for (const notification of notifications.value) {
                    const serviceResponse = await axios.get(`http://localhost:8181/servicios/servicio/${notification.servicio_id}`);
                    notification.tituloServicio = serviceResponse.data;
                }
            } catch (error) {
                console.error('Error al recuperar las notificaciones', error);
            }
        };

        const handleNotificationClick = (serviceId) => {
            // Cambiar la ruta a la vista del historial del servicio utilizando Vue Router
            router.push({ name: 'historial-servicio', params: { id: serviceId } });
        };

        onMounted(getNotifications);

        return {
            notifications,
            handleNotificationClick,
        };
    },
});
</script>
