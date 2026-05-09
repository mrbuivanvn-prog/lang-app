const { exec } = require("child_process");

function speak(text){

  exec(`
  echo "${text}" | \
  piper \
  --model ~/voices/en_US-lessac-medium.onnx \
  --output_file output.wav
  `);

}

module.exports = speak;
