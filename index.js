var downloaderInstall = require('./lib/downloaderInstall.js');

module.exports = function (sails) {

  sails.config.Event.on('sailsReady', function(){
    
    downloaderInstall.install(sails.config.downloader.launcherTypes);
    
    /**
     * Clean download table to avoid unfinished downloads to appear
     * in the dashboard (if Gladys crash during a download, the download need to be removed)
     */
     Download.destroy({finished:false}).exec(function (err){
        sails.log.info('Downloader : Download table cleaned !');
     });
  });  

   
  var loader = require("sails-util-mvcsloader")(sails);
  loader.injectAll({
    policies: __dirname + '/policies',// Path to your hook's policies
    config: __dirname + '/config'// Path to your hook's config
  });

    
  return {
    defaults: require('./lib/defaults'),
    configure: require('./lib/configure')(sails),
    initialize: require('./lib/initialize')(sails),
    routes: require('./lib/routes')(sails),
  };


};