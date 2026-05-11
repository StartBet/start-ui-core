import type { User } from '~/components/domain/users/User'
import { useUsersService } from '~/services/usersService'

export function useUsers() {
  const users = ref<User[]>([])
  const isLoading = ref(false)

  const fetchUsers = async () => {
    isLoading.value = true
    try {
      users.value = await useUsersService().list()
    } finally {
      isLoading.value = false
    }
  }

  return { users, isLoading, fetchUsers }
}
