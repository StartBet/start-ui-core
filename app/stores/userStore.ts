import type { User } from '~/components/domain/users/User'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (value: User | null) => {
    user.value = value
  }

  return { user, setUser }
})
