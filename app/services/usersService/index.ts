import type { User } from '~/components/domain/users/User';
import { sleep } from '~/utils/sleep';

export function useUsersService() {
  const list = async (): Promise<User[]> => {
    await sleep(150);
    return [
      { id: '1', name: 'Ada Lovelace', active: true },
      { id: '2', name: 'Alan Turing', active: true },
      { id: '3', name: 'Grace Hopper', active: false }
    ];
  };

  return { list };
}
