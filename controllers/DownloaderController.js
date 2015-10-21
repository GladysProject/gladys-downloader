/**
 * Controller
 * @doc http://sailsjs.org/documentation/concepts/controllers
 */

module.exports = {
	
	
	index: function(req, res){
		Download.find({finished:false}, function(err, downloads){
			if(err){
				res.status(500).json(err);
			}else{
				res.json(downloads);
			}
		});
	},
	
	download:function(req,res){
		var url = req.param('url');
		var filename = url.substring(url.lastIndexOf('/')+1);

		DownloaderService.download(req.param('url'), req.session.User.id);
		
		return res.json({
			message: 'Download in progress !',
			url: url,
			name: filename
		});
	}
	
};