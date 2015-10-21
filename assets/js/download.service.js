(function () {
  'use strict';
  angular
    .module('app')
    .factory('downloaderService', downloaderService);

    downloaderService.$inject = ['$http'];

    function downloaderService($http) {
        
      return {
        download : download,
        onProgress : onProgress,
        onError: onError,
        onFinish: onFinish,
        getDownloads:getDownloads
      };

      function download(url) {
            return new Promise(function(resolve, reject) {
                io.socket.post('/downloader/download', {url : url}, function (data, jwres){
                    return resolve(data);
                });
            });
        }

        function onProgress(cb) {
           io.socket.on('downloader_progress', function (data) {
               cb(data);
           }); 
        }
        
        function onError(cb){
           io.socket.on('downloader_error', function (data) {
               cb(data);
           });
        }
        
        function onFinish(cb){
          io.socket.on('downloader_finish', function (data) {
               cb(data);
           });
        }
        
        function getDownloads(){
             return $http({method: 'GET', url: '/downloader/index' }).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    return data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
	}
})();