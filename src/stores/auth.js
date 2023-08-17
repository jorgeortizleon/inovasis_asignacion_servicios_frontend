import { defineStore } from 'pinia';
import { ref, computed } from "vue";

export const useAuthStore = defineStore('useAuthStore',() => {

  const user = ref();
  const logged = ref(false);
  const isLogged = computed(() => logged.value === 1);

  return { user, logged, isLogged };
});
