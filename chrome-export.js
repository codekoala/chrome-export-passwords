/**
* Script ver 0.6
* Writing by Ruslan Kovalev : skidisaster@gmail.com
* Jun.10 2016
* output format changed for ready to use in FireFox Export plugin
* please install this plugin from https://addons.mozilla.org/en-Us/firefox/addon/password-exporter/
* changes:
* - modified to get it to work with Chrome / Chromium 50
* - use document.body.innerText instead of document.write to avoid HTML encoding issues
* - write tab separated TSV format to the console log
* - version based on Chrome api objects not on DOM.
*/

var out = "";
var out2 = "";
var pm = PasswordManager.getInstance();
var model = pm.savedPasswordsList_.dataModel;
var pl = pm.savedPasswordsList_;
for (i = 0; i < model.length; i++) {
	PasswordManager.requestShowPassword(i);
};
setTimeout(
		function() {
			out2 += '# Generated by Password Exporter; Export format 1.1; Encrypted: false\n';
			out2 += '"hostname","username","password","formSubmitURL","httpRealm","usernameField","passwordField"';
			for (i = 0; i < model.length; i++) {
				var item = pl.getListItemByIndex(i);
				out += "\n" + model.array_[i].origin
						+ "	" + model.array_[i].username
						+ "	" + item.childNodes[0].childNodes[2].childNodes[0].value;
				out2 += '\n"' + model.array_[i].origin + '","'
						+ model.array_[i].username + '","'
						+ item.childNodes[0].childNodes[2].childNodes[0].value.replace(/"/g, '""')
						+ '","' + model.array_[i].origin + '"," "," "," "';
			}
			console.log(out);
			document.body.innerText = out2;
		}, 2500);
