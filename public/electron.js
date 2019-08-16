const {
    BrowserWindow,
    app,
    Menu,
    dialog,
    shell
} = require('electron');
const version = '0.1.0';
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow, aboutWindow;

const menus = [{
        label: '文件',
        submenu: [{
            label: '退出',
            click: () => {
                let c = dialog.showMessageBoxSync({
                    type: 'warning',
                    title: '即将关闭软件',
                    message: '确定退出本软件？',
                    detail: '将会丢失所有未保存的信息！',
                    buttons: ['确定', '取消'],
                    defaultId: 1
                })
                if (c === 0) {
                    app.quit();
                }
            }
        }]
    },
    {
        label: '操作',
        submenu: [{
            label: '退出',
            click: () => {
                let c = dialog.showMessageBoxSync({
                    type: 'warning',
                    title: '删除全部项目',
                    message: '确定删除全部项目？',
                    detail: '将会删除所有的数据！',
                    buttons: ['确定', '取消'],
                    defaultId: 1
                });
                if (c === 0) {
                    console.log('删除全部');
                }
            }
        }]
    },
    {
        label: '帮助',
        submenu: [{
            label: '软件发布地址',
            click: async () => {
                await shell.openExternal('https://github.com/asdjgfr/DFL-X');
            }
        }, {
            label: '官方网站',
            click: () => {
                dialog.showMessageBoxSync({
                    type: 'warning',
                    title: '官方网站',
                    message: '本软件没有任何官方网站！也没有打算做官方网站！请到GitHub进行下载/更新！'
                });
            }
        }, {
            label: '版本',
            click: () => {
                dialog.showMessageBoxSync({
                    title: '版本号',
                    message: version
                });
            }
        }, {
            label: '反馈',
            click: async () => {
                await shell.openExternal('https://github.com/asdjgfr/DFL-X/issues');
            }
        }, {
            label: 'DeepFaceLab',
            click: async () => {
                await shell.openExternal('https://github.com/iperov/DeepFaceLab');
            }
        }, {
            label: 'DeepFaceLab 中文网',
            click: async () => {
                await shell.openExternal('https://www.deepfakescn.com/');
            }
        }]
    },
    {
        label: '关于',
        click: () => {
            aboutWindow = new BrowserWindow({
                parent: mainWindow,
                modal: true,
                alwaysOnTop: true,
                skipTaskbar: true,
                resizable: false,
                minimizable: false,
                autoHideMenuBar: true,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            aboutWindow.loadURL(`file://${path.join(__dirname, `../${isDev?'public':'build'}/about.html`)}`);
        }
    }
];

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 680,
        minWidth: 1200,
        minHeight: 680,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    // if (isDev) {
        mainWindow.webContents.openDevTools();
    // }
    mainWindow.on('closed', () => mainWindow = null);
    const menu = Menu.buildFromTemplate(menus)
    Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});