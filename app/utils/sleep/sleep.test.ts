import { describe, expect, it, vi } from 'vitest';

import { sleep } from '~/utils/sleep';

describe('sleep', () => {
  it('resolve após o tempo indicado', async () => {
    vi.useFakeTimers();

    const promise = sleep(1000);
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBeUndefined();

    vi.useRealTimers();
  });
});
