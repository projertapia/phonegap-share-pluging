var Share = function() {};

Share.prototype.send = function(obj, mimeType, options) {

	var shareProps = {
		"shareObj": "",
		"mimeType": "",
		"title": "",
		"subject": ""
	};

	shareProps.shareObj = obj;
	shareProps.mimeType = mimeType;
	shareProps.title = (options.title) ? options.title : "Share using";
	shareProps.subject = (options.subject) ? options.subject : "";

	function successCallback(args) {
		if (typeof(options.success) == 'function')
			options.success(args);
	}
	function failCallback(args) {
		if (typeof(options.fail) == 'function')
			options.fail(args);
	}
	return PhoneGap.exec(function(args) {
								successCallback(args);
							},
							function(args) {
								failCallback(args);
							},
							'SharePlugin',
							'send',
							[shareProps.shareObj,
							shareProps.mimeType,
							shareProps.title,
							shareProps.subject]);
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('share', new Share());
	PluginManager.addService("SharePlugin","com.phonegap.plugin.share.SharePlugin");
});