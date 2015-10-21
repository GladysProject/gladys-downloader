var fs = require('fs');
var path = require('path');
var request = require('request');
var progress = require('request-progress');

function startDownload(url, userId, downloadId){
	var filename = url.substring(url.lastIndexOf('/')+1);
	
	// emit an event
	ScenarioService.launcher('download_start', filename);
	
	progress(request(url), {
			throttle: 2000,  // Throttle the progress event to 2000ms, defaults to 1000ms 
    		delay: 1000 // Only start to emit after 1000ms delay, defaults to 0ms 
		})
		.on('progress', function (state) {
			sails.log.info('received size in bytes', state.received);
			// The properties bellow can be null if response does not contain 
			// the content-length header 
			sails.log.info('total size in bytes', state.total);
			sails.log.info('percent', state.percent);
			var notifSocket = {
				url:url,
				state:state,
				finished:false
			};
			SocketService.sendDesktopMessageUser(userId, 'downloader_progress' , notifSocket, function(err, nbOfMsgSent){
				 if(err) {
					 sails.log.warn(err);
				 }
			});
		})
		.on('error', function (err) {
			sails.log.warn('DownloaderService : download : Err while downloading file '+ url);
			sails.log.warn(err);
			SocketService.sendDesktopMessageUser(userId, 'downloader_error' , err, function(err, nbOfMsgSent){
				 if(err) {
					 sails.log.warn(err);
				 }
			});
		})
		.pipe(fs.createWriteStream(path.join(__dirname, '../', sails.config.downloader.path, path.basename(url)) ))
		.on('error', function (err) {
			sails.log.warn('DownloaderService : download : Err while downloading file ' + url);
			sails.log.warn(err);
			SocketService.sendDesktopMessageUser(userId, 'downloader_error' , err, function(err, nbOfMsgSent){
				 if(err) {
					 sails.log.warn(err);
				 }
			});
		})
		.on('close', function (err) {
			Download.update({id:downloadId}, {finished:true}).exec(function(err){
				
			});
			
			if(err){
				sails.log.warn('DownloaderService : download : Err while downloading file ' + url);
				sails.log.warn(err);
				SocketService.sendDesktopMessageUser(userId, 'downloader_error' , err, function(err, nbOfMsgSent){
				 if(err) {
					 sails.log.warn(err);
				 }
			});
			}else{
				sails.log.info('Successfully saved ' + url);
				
				// emit an event
				ScenarioService.launcher('download_finished', filename);
				
				// send desktop notification (with websockets)
				SocketService.sendDesktopMessageUser(userId, 'downloader_finish' , {url:url, finished:true}, function(err, nbOfMsgSent){
				 if(err) {
					 sails.log.warn(err);
				 }
			});
			}
		});
}

module.exports = {
	
	/**
	 * Download a file for a specific user
	 * @url: The URL of the file to download
	 * @user: The User id
	 */
	download: function(url, userId){
		var filename = url.substring(url.lastIndexOf('/')+1);
		var download = {
			name:filename,
			url:url,
			user:userId
		};
		
		/**
		 * Saving the download in the database
		 */
		Download.create(download, function(err, download){
			if(err){
				sails.log.warn(err);
				SocketService.sendDesktopMessageUser(userId, 'downloader_error' , err);
			}else{
				startDownload(url, userId, download.id);	
			}	
		});
	}	
};
