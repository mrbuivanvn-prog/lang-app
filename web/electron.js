const {
  app,
  BrowserWindow
} = require("electron");

const path = require("path");

const { spawn } =
  require("child_process");

let backend;
let frontend;
let ollama;

function createWindow() {

  const win =
    new BrowserWindow({

      width: 1600,
      height: 900,

      webPreferences: {

        nodeIntegration: true

      }

    });

  win.loadURL(
    "http://localhost:3000"
  );

}

/* =========================
   START
========================= */

app.whenReady().then(() => {

  console.log(
    "START OLLAMA"
  );

  ollama = spawn(
    "ollama",
    ["serve"]
  );

  ollama.stdout.on(
    "data",
    (data) => {

      console.log(
        `OLLAMA: ${data}`
      );

    }
  );

  console.log(
    "START BACKEND"
  );

  backend = spawn(

    "node",

    [
      path.join(
        __dirname,
        "../backend/server.js"
      )
    ]

  );

  backend.stdout.on(
    "data",
    (data) => {

      console.log(
        `BACKEND: ${data}`
      );

    }
  );

  console.log(
    "START FRONTEND"
  );

  frontend = spawn(

    "npm",

    ["start"],

    {
      cwd: __dirname,
      shell: true
    }

  );

  frontend.stdout.on(
    "data",
    (data) => {

      console.log(
        `FRONTEND: ${data}`
      );

    }
  );

  /* ===== WAIT REACT ===== */

  setTimeout(() => {

    createWindow();

  }, 15000);

});

/* =========================
   CLOSE
========================= */

app.on(
  "window-all-closed",

  () => {

    if (backend)
      backend.kill();

    if (frontend)
      frontend.kill();

    if (ollama)
      ollama.kill();

    app.quit();

  }

);
