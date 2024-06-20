Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


String.prototype.capitalizeCase = function (str) {
    var arr = str.split(' ');
    var t;
    var newt;
    var newarr = arr.map(function(d){
        t = d.split('');
        newt = t.map(function(d, i){
            if(i === 0) {
                return d.toUpperCase();
            }
            return d.toLowerCase();
        });
        return newt.join('');
    });
    var s = newarr.join(' ');
    return s;
}
