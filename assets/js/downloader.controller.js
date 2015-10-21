(function () {
  'use strict';

  angular
    .module('app')
    .controller('downloaderCtrl', downloaderCtrl);

  downloaderCtrl.$inject = ['downloaderService', '$scope'];

  function downloaderCtrl(downloaderService, $scope){
		/* jshint validthis: true */
		var vm = this;

		/* Functions */
		vm.download = download;
		
		/* datas */
		vm.downloads = [];
		vm.newUrl = '';
		vm.error = null;

		activate();

		function activate() {
			waitForEvents();
			getDownloads();
		}

		function download(url) {
			downloaderService.download(url)
				.then(function(result){
					console.log('Download started with success, url : ' + url);
					$scope.$apply(function () {
						vm.newUrl = '';
						vm.downloads.push({url:url, name:result.name, progress:0, finished:false});
					});
					
				});
		}
		
		function getDownloads(){
			downloaderService
				.getDownloads()
				.then(function(data){
					vm.downloads = data.data;
				});
		}
		
		function waitForEvents(){
			downloaderService.onProgress(function(changes){
				console.log(changes);
				updateDownload(changes);
			});
				
			downloaderService.onError(function(err){
				$scope.$apply(function () {
					vm.error = err;
				});
			});
				
			downloaderService.onFinish(function(changes){
				console.log(changes);
				updateDownload(changes);
			});
		}
		
		function updateDownload(changes){
			var found = false;
			var i = 0
			while(!found && i < vm.downloads.length ){
				if(vm.downloads[i].url == changes.url){
					found = true;
					$scope.$apply(function () {
						if(!changes.finished){
							if(changes.state.percent === null){
								changes.state.percent = 0;
							}
							vm.downloads[i].progress = changes.state.percent;
						}else{
							vm.downloads[i].finished = true;	
						}
					});
				}
			}
		}
  }
})();