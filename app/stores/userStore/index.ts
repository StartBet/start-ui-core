import type { User } from '~/components/domain/users/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  const setUser = (value: User | null) => {
    user.value = value;
  };

  return { user, setUser };
});
