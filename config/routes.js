/**
 * Routes rules
 * @doc http://sailsjs.org/documentation/concepts/routes
 */

module.exports.routes = {
  '/downloader/download': 'DownloaderController.download',
  '/downloader': 'DownloaderController.index'
};