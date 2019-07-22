(function(){

    /**
     * Fonction pour arrondir un nombre.
     *
     * @param	{String}	type	Le type d'arrondi.
     * @param	{Number}	value	Le nombre à arrondir.
     * @param	{Integer}	exp		L'exposant (le logarithme en base 10 de la base pour l'arrondi).
     * @returns	{Number}			La valeur arrondie.
     */
    function decimalAdjust(type, value, exp) {
        // Si l'exposant vaut undefined ou zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Si value n'est pas un nombre
        // ou si l'exposant n'est pas entier
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Décalage
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Re "calage"
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Arrondi décimal inférieur
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Arrondi décimal supérieur
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();

var uniqid = function() {
    return (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
};


function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // If it isn't an object at this point
    if (typeof obj !== "object") {
        return obj == "";
    }
    else{
        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
    }

    return true;
}

//validations
var validateText = function(text){
    return /([^\s])/.test(text);
}

var validateAmount = function(amount){
    var reg = /^\d+$/; //integer
    var regex  = /^\d+(?:\.\d{0,3})$/; //float

    if(isNaN(amount)) return false;
    else
        return reg.test(amount) || regex.test(amount);
}

var validateDate = function(date){
    var pattern =/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
    var pattern2 =/^([0-9]{4})[\/\-]([0-9]{2})[\/\-]([0-9]{2})$/;
    //var pattern2 = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

    return pattern.test(date) || pattern2.test(date);
    //return pattern.test(date);
}

var getIndexKeyInArray = function(values, ref){
    var pos = -1;
    values.forEach(function(item, key){
        console.log(key);
        console.log(item);
        if(item.key == ref)
            pos = key;
    });

    return pos;
}

var setPaymentData = function(id){
    $(id).val(JSON.stringify(pay_array));
}

function formatDate(date) {
    var m_names = new Array("Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec");

    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();

    return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
    //return curr_date + "-" + curr_month + "-" + curr_year;
}

function dateDiff (date1, date2){
    var d1 = date1.getTime() / 86400000;
    var d2 = date2.getTime() / 86400000;
    return Math.ceil(d2 - d1) ;
    //return new Number(d2 - d1).toFixed(0);
}