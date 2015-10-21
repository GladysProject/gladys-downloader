/**
 * Policies rules
 * @doc http://sailsjs.org/documentation/concepts/Policies
 */

module.exports.policies = {
	DownloaderController: ['checkToken', 'Human']
};

