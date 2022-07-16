export function useDoubleEvent<T extends (...params: any[]) => void>(
  callback: T,
  config?: { timeout: number }
) {
  const isFired = ref(false);
  const duration = config?.timeout ?? 200;

  const timeoutFire = useTimeoutFn(() => (isFired.value = false), duration, {
    immediate: false,
  });

  const eventFired = (...params: Parameters<T>) => {
    if (timeoutFire.isPending) return;
    if (isFired.value) return callback(...params);

    isFired.value = true;
    timeoutFire.start();
  };

  return {
    eventFired,
  };
}
