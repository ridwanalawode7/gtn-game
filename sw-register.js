//main thread
if ('serviceWorker' in navigator) {
  console.log('if return true')
  navigator.serviceWorker.register('serviceworker.js');
}

