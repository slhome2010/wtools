/**
 * main Electron logic
 * 
 * @author Yauheni Svirydzenka <partagas@mail.ru>
 * @version 0.0.1
 * @copyright Yauheni Svirydzenka 2017
 */

/*
 * Commands:
 * npm init - initialize npm in current directory
 * npm install - install modules
 * npm install --save-dev electron-prebuilt - install module for pred-build
 * npm install --save-dev electron-packager - install module for build
 * npm start - to start app
 * npm run-script package - to compile app
 */

const electron = require('electron');
// lifecycle of our app
const app = electron.app;
// create window for our app
const BrowserWindow = electron.BrowserWindow;

// To send crash reports to Electron support
// electron.crashReporter.start();

// set global link
// if not, the window will be closed after garbage collection
var mainWindow = null;

/**
 * Check that all windows are closed before quiting app
 */
app.on('window-all-closed', function() {
    // OS X apps are active before "Cmd + Q" command. Close app
    if (process.platform != 'darwin') {
        app.quit();
    }
});


/**
 * Create main window
 */
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: "Wtools",
        resizable: true,
        width: 900,
        height: 800,
        // set path to icon for compiled app
        icon: '../image/wtools/icon.png',
        // set path to icon for launched app
        //icon: 'img/icon.png'
        center: true
        // to open dev console: The first way
        //devTools: true
    });
 

    // load entry point for desktop app
    //mainWindow.loadURL('npm//' + __dirname + '/index.html');
    mainWindow.loadURL('http://service.curator.kz/');
    
    // to open dev console: The second way
    //mainWindow.webContents.openDevTools();

    // Close all windows when main window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
        newWindow = null;
    });
}

/**
 * When Electron finish initialization and is ready to create browser window
 */
app.on('ready', function() {
    createMainWindow();
});
