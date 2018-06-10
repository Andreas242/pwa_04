let imagePicker = document.querySelector('#imagePicker');
let videoImage = document.querySelector('#video');
let canvasElement = document.querySelector('#canvas');
let captureImageFromVideoButton = document.querySelector('#captureVideo');
videoImage.style.display = 'block';
canvasElement.style.display = 'none';
captureImageFromVideoButton.style.display = 'block';



function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        videoImage.style.display ='block';
        imagePicker.style.display = 'none';
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }
  
  function getStream (type) {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
    var constraints = {};
    constraints[type] = true;
    getUserMedia(constraints, function (stream) {
      var mediaControl = document.querySelector(type);
      
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      }
    }, function (err) {
      alert('Error: ' + err);
    });
  }

  captureImageFromVideoButton.addEventListener('click', (event) => {
      canvasElement.style.display = 'block';
      videoImage.style.display = 'none';
      captureImageFromVideoButton.style.display = 'none';
      let context = canvasElement.getContext('2d');
      context.drawImage(videoImage, 0, 0, canvasElement.width, canvasElement.height);
      videoImage.srcObject.getVideoTracks().forEach((track) => {
          track.stop();          
  });
});

