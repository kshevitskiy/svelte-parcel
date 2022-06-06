import App from './App.svelte'

const appRef = document.getElementById('app')

function bootstrap() {
  if (appRef) {
    new App({
      target: appRef
    })
  }
}

bootstrap()
