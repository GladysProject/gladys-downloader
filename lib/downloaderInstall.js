

function installLauncherType(launcher, cb){
 	LauncherType.find({code: launcher.code})
		.exec(function(err, launchers){
			if(err) return cb(err);

			if(launchers.length === 0){
				return LauncherType.create(launcher, cb);
			}else{
				return LauncherType.update({id:launchers[0].id}, launcher, cb);
			}
		});
}

function installActionType(action, cb){
 	ActionType.find(action)
		.exec(function(err, actions){
			if(err) return cb(err);

			if(actions.length === 0){
				return ActionType.create(action, cb);
			}else{
				cb();
			}
			
		});
}


module.exports = {
	
	install: function(launchers){
		async.each(launchers, installLauncherType);
		//async.each(actions, installActionType);
	}	
};