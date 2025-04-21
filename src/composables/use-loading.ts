import { QSpinnerIos, useQuasar } from 'quasar'

export const useLoading = () => {
  const q = useQuasar()

  function show(key: string, message: string) {
    q.loading.show({
      group: key,
      message: message,
      backgroundColor: 'black',
      messageColor: 'white',
      spinner: QSpinnerIos,
      boxClass: 'bg-primary',
      spinnerColor: 'white'
    })
  }

  const signIn = {
    show: () => show('sign-in', 'Authenticating...'),
    hide: () => q.loading.hide('sign-in')
  }

  const registerUser = {
    show: () => show('registration', 'Creating your account...'),
    hide: () => q.loading.hide('registration')
  }

  return {
    signIn,
    registerUser
  }
}
