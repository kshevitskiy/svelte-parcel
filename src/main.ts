// import { useApi } from './api'
import App from './App.svelte'

const appRef = document.getElementById('app')

async function bootstrap() {
  // const { data } = await useApi().getPersonsIncome({ age_gt: 34 })

  if (appRef) {
    new App({
      target: appRef
      // props: {
      //   data
      // }
    })
  }
}

bootstrap()
