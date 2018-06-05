/*
You need to register the serviceworker 
To see if you have access to a SW you can check for 'serviceWorker' in navigator

*/

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('sw registered');
    });
}

const installButton = document.querySelector("#install");
installButton.style.display = "none";

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    installButton.style.display = 'block';
  });

  
installButton.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    installButton.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
    .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});