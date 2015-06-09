/**
* Script ver 0.5
* Writing by Ruslan Kovalev : skidisaster@gmail.com
* Feb.25 2015
* output format changed for ready to use in FireFox Export plugin
* please install this plugin from https://addons.mozilla.org/en-Us/firefox/addon/password-exporter/
* changes:
* - version based on Chrome api objects not on DOM.
*/



// first part of executing script
out="";
out2="";
var pm = PasswordManager.getInstance();
var model = pm.savedPasswordsList_.dataModel;
var pl = pm.savedPasswordsList_;

for(i=0;i<model.length;i++){
   PasswordManager.requestShowPassword(i);
};

setTimeout(function(){
out2+='# Generated by Password Exporter; Export format 1.1; Encrypted: false\n';
out2+='"hostname","username","password","formSubmitURL","httpRealm","usernameField","passwordField"';
for(i=0;i<model.length;i++){
var item = pl.getListItemByIndex(i);
out+="\n"+model.array_[i][0]+"|"+model.array_[i][1]+"|"+item.childNodes[0].childNodes[2].childNodes[0].value;
out2+='<br/>"http://'+model.array_[i][0]+'","'+model.array_[i][1]+'","'+item.childNodes[0].childNodes[2].childNodes[0].value+'","http://'+model.array_[i][0]+'"," "," "," "';
    };
document.write(out2);
},300);
