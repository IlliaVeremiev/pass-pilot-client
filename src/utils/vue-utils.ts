export async function created(created: () => Promise<void> | void) {
  await created()
}
