var param = require('./parametres.js');

module.exports.downloader = {
    
  // title for the Hook
  title: 'Downloader',
	// the name of the hook folder
  folderName: param.folderName,
  path: 'downloads',
  launcherTypes:[
        {
            code : 'download_start',
            name : 'Download Started',
            description: 'Fire when a download has started',
            optionspath: '/downloader/index'
        },
        {
            code: 'download_finished',
            name: 'Download Finished',
            description: 'Fire when a download has finished',
            optionspath: '/downloader/index'
        }
    ],

};
