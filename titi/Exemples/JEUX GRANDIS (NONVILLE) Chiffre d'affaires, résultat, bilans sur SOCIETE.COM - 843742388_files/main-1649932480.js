/********************************************************/
/********** Fonctions au chargement de la page **********/
/********************************************************/
add_event(window, "load", function() {

    /* quelle version de IE -> style CSS particulier */
    detect_version_IE();
});

/********************************************************/
/******************* Fonctions utiles *******************/
/********************************************************/
/* fonction pour cloner un objet json */
function json_copy(src) {
    return JSON.parse(JSON.stringify(src));
}

/* fonction pour cloner un objet */
function object_copy(src) {
    //return Object.assign({}, src);
    if (detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11") {
        if (typeof Object.assign != 'function') {
            // Must be writable: true, enumerable: false, configurable: true
            Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
              'use strict';
              if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
              }

              var to = Object(target);

              for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                  for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                      to[nextKey] = nextSource[nextKey];
                    }
                  }
                }
              }
              return to;
            },
            writable: true,
            configurable: true
            });
        }
    }
    
    return Object.assign({}, src);
}   

/* si IE -> ajout class specifique au body pour appliquer style CSS particulier */
function detect_version_IE() {

    var typeNav    = navigator.userAgent;
    var body       = document.body;
    var navigateur = "";

    /* Edge */
    if ( typeNav.indexOf("Edg/") != -1 ) {
        add_class(body, "nav-ieEdge");
        navigateur = "nav-ieEdge";
    }

    /* IE10 */
    if ( typeNav.indexOf("MSIE ") != -1 ) {
        add_class(body, "nav-ie10");
        navigateur = "nav-ie10";
    }

    /* IE11 */
    if ( typeNav.indexOf("Trident/") != -1 && typeNav.indexOf("MSIE ") == -1) {
        add_class(body, "nav-ie11");
        navigateur = "nav-ie11";
    }
    
    /* Safari */
    if ( typeNav.indexOf("Safari/") != -1 && typeNav.indexOf("Chrome") == -1 ) {
        add_class(body, "nav-safari");
    }

    /* Firefox */
    if ( typeNav.indexOf("Firefox/") != -1 && typeNav.indexOf("Seamonkey/") == -1 ) {
        add_class(body, "nav-firefox");
    }

    return navigateur;
}

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, ''); 
    };
}

function encode_to_hex(str) {
    var r = "";
    var e = str.length;
    var c = 0;
    var h;

    while (c < e) {
        h = str.charCodeAt(c++).toString(16);
        while (h.length < 2) {
            h = "0" + h;
        }
        r += h;
    }

    return (r);
}

function nb_child(itemobj) {
    if (itemobj) {
        return (itemobj.childElementCount || itemobj.children.length);
    }
    
    return (-1);
}

function get_elementsbyclassname(itemobj, classname) {
    if (!itemobj || !classname) {
        return null;
    }

    if (typeof(itemobj.getElementsByClassName) != 'undefined') {
        return (itemobj.getElementsByClassName(classname));
    } else {
        return (itemobj.querySelectorAll('.' + classname));
    }
}


function get_class(itemobj) {
    if (itemobj) {
        if (typeof(itemobj.className) != "undefined") {
            return (itemobj.className);
        } else {
            return (itemobj.getAttribute("class"));
        }
    }

    return (null);
}

function set_class(itemobj, classname) {
    if (itemobj) {
        if (typeof(itemobj.className) != "undefined") {
            itemobj.className = classname;
        } else {
            itemobj.setAttribute("class", classname);
        } 
    }
}

/* Ajoute une classe à itemobj */
function add_class(itemobj, className) {
    var itemclass = get_class(itemobj);
    if (itemclass != null) { 
        if (itemclass.indexOf(className) == -1) {
            var res = itemclass += " " + className;
            set_class(itemobj, res.trim());
        }
    }
} 

/* Supprime une classe à itemobj */
function remove_class(itemobj, className) {
    if (itemobj && className) {
        var reg = new RegExp("(?:|\\s)" + className + "(?!\S)", 'g');
        var itemclass = get_class(itemobj);
        if (itemclass != null) {
            var res = itemclass.replace(className, '');
            set_class(itemobj, res);
        }
    }
}

/* Toggle une classe sur itemobj */
function toggle_class(itemobj, className) {
    if(itemobj && className) {
        if(is_class_exist(itemobj, className)) {
            remove_class(itemobj, className);
        } else {
            add_class(itemobj, className);
        }
    }
}

/* Verifie si className existe dans itemobj */
function is_class_exist(itemobj, className) {
    if (itemobj && className) {
        var reg = new RegExp("(?:|\\s)" + className + "(?!\S)", 'g');
        var itemclass = get_class(itemobj);
        if (itemclass != null && itemclass.match(reg)) {
            return true;
        }
    }

    return false;
}

function getElementsByClass(searchClass, node, tag) {
    var classElements = [];
    var i = 0;
    var j = 0;

    if (!node) {
        node = document;
    }

    if (!tag) {
        tag = "*";
    }

    var els = node.getElementsByTagName(tag);
    var elsLen = els.lenght; 
    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        var eltclass = get_class(els[i]);
        if (pattern.test(eltclass)) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}

/* Cacher un élement depuis son id */
function hide(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).style.display = "none";
    }
}

/* Afficher un élément depuis son id */
function display(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).style.display = "block";
    }
}

/* Afficher un élément depuis son id */
function display_inline_block(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).style.display = "inline-block";
    }
}

/* Afficher un tableau depuis son id */
function display_table(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).style.display = "table";
    }
}

/* On regarde l'état de l'id et on le modifie 
 * hide => display 
 * display => hide */
function display_or_hide(id) {
    itemobj = document.getElementById(id);
    if (itemobj) {
        if (itemobj.style.display == "none") {
            display(id);
        } else {
            hide(id);
        }
    }
}

function display_or_hide_table(id) {
    itemobj = document.getElementById(id);
    if (itemobj) {
        if (itemobj.style.display == "none") {
            display_table(id);
        } else {
            hide(id);
        }
    }
}

/* Cacher un objet */
function hide_obj(itemobj) {
    if (itemobj) {
        itemobj.style.display = "none";
    }
}

/* Afficher un objet */
function display_obj_block(itemobj) {
    if (itemobj) {
        itemobj.style.display = "block";
    }
}

function display_obj_table(itemobj) {
    if (itemobj) {
        itemobj.style.display = "table";
    }
}

function display_obj_inline(itemobj) {
    if (itemobj) {
        itemobj.style.display = "inline";
    }
}

function display_obj_inline_block(itemobj) {
    if (itemobj) {
        itemobj.style.display = "inline-block";
    }
}

/* Affiche ou cache un objet */
function display_or_hide_obj_block(itemobj) {
    if (itemobj) {
        if (itemobj.style.display == "none") {
            display_obj_block(itemobj);
        } else {
            hide_obj(itemobj);
        }
    }
}

function display_or_hide_obj_inline(itemobj) {
    if (itemobj) {
        if (itemobj.style.display == "none") {
            display_obj_inline(itemobj);
        } else {
            hide_obj(itemobj);
        }
    }
}

function display_or_hide_obj_inline_block(itemobj) {
    if (itemobj) {
        if (itemobj.style.display == "none") {
            display_obj_inline_block(itemobj);
        } else {
            hide_obj(itemobj);
        }
    }
}

/* Fonction vérifiant si un élement est visible ou non */
function is_display(itemobj) {
    if (itemobj && itemobj.style.display != "none") {
        return (true);
    }

    return (false);
}

/* Stopper la propagation d'un event */
function event_handler(evt) {
    if (!evt) {
        evt = window.event;
    }   

    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

/* Ajout d'un evenement à obj du type type_event en 
 * appelant callback */
function add_event(obj, type_event, callback) {
    if (!document.addEventListener && type_event == "resize") {
        return;
    }
    if (obj) {
        if (obj.addEventListener) {
            obj.addEventListener(type_event, callback, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type_event, callback);
        }   
    }
}

/* Retrait d'un evenement à obj du type type_event en
 * qui appelle callback */
function remove_event(obj, type_event, callback) {
    if (obj) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type_event, callback, false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + type_event, callback);
        }
    }
}

/* Fonction permettant de rediriger */
function redirect(url) {
    window.location.href = url;
}

/* Fonction ouvrant un bloc et scroll dessus */
function open_block(id) {
    var itemobj = document.getElementById(id);
    if (itemobj) {
        display_obj_block(itemobj);
        window.location = "#" + id;
    } 
}

/* Fonction donnant le focus à un élément */
function add_focus(id) {
    var itemobj = document.getElementById(id);
    if (itemobj) {
        window.location = "#" + id;
        itemobj.select();
        /* 
        if (itemobj.focus != "undefined") {
            itemobj.focus();
        } else {
            itemobj.select();
        }*/
    }
}

/* Fonction de focus / blur pour les inputs  */
function event_input(input, placeholder) {
    if (input) {
        add_event(input, "focus", function(){onfocus_input(input);});
        add_event(input, "blur", function(){onblur_input(input, placeholder);});
    }    
}

function onfocus_input(input) {
    if (input) {
        input.setAttribute('placeholder', '');
    }
}

function onblur_input(input, placeholder) {
    if (input.value == '') { 
        input.setAttribute('placeholder', placeholder);
    }
}

/* Enumeration des devices possibles :
 * - mobile : max : 720 
 * - tablette : 720 - 1024 
 * - desktop : min 1024 (et plus) 
 * - ie : ne reconnait pas les media query */

var device_type = {
    PHONE : 0,
    TABLET : 1,
    DESKTOP : 2,
    IE : 3
};

/* Fonction detectant le type de device */
function detect_device() {
    if (window.matchMedia) {
        if (window.matchMedia("(min-width: 62.5em)").matches) {
            return device_type.DESKTOP;
        } else if (window.matchMedia("(min-width: 46em)").matches) {
            return device_type.TABLET;
        } else {
            return device_type.PHONE;
        }
    } else {
//        if (document.all && !document.addEventListener) {
//            return device_type.PHONE;
//        } else {
            return device_type.DESKTOP;
//        }
    }   
}

/* Fonction vérifiant si tactile */
function is_touch_device() {
    try{  
        document.createEvent("TouchEvent");  
        return true;
    } catch(e){  
        return false;
    }  
}

/* Fonction vérifiant le mode d'affichage */
function is_device_portrait() {
    if (window.matchMedia) {
        if (window.matchMedia("(orientation:portrait)").matches) {
            return true;
        } 
    }

    return false;
}

/* Fonction verifiant si le type de device à 
 * une taille mini de size */
function device_size_max(size) {
    if (window.matchMedia) {
        if (window.matchMedia("(max-width: " + size + "em)").matches) {
    set_actionnumtel();
            return true;
        }
    }

    return false;
}

/* Fonction permettant de vérifier si l'on se trouve dans le cas
 * d'un device de type PHONE */
function is_phone_device() {
    if (detect_device() === device_type.PHONE) {
        return true;
    }

    return false;
}

/* Fonction vérifiant si on se trouve dans le cas d'un
 * device de type TABLET */
function is_tablet_device() {
    if (detect_device() === device_type.TABLET) {
        return true;
    } 
    return false;
}

/* Fonction vérifiant si on se trouve dans le cas d'un
 * device de type DESKTOP */
function is_desktop_device() {
    if (detect_device() === device_type.DESKTOP) {
        return true;
    } 
    return false;
}

/* Fonction détectant si on se trouve sur un device
 * de type PHONE ou TABLET */
function is_phone_or_tablet_device() {
    if (is_tablet_device() || is_phone_device()) {
        return true;
    }
    return false;
}


/* Gère l'offset */
function getZoomFactor() {
    var factor = 1;

    if (document.body.getBoundingClientRect) {
        var rec = document.body.getBoundingClientRect();
        var physicalW = rec.right - rec.left;
        var logicalW = document.body.offsetWidth;

        factor = Math.round((physicalW / logicalW) * 100) /100;
    }
    return(factor);
}
function getY(context) {

    var scrollTop = undefined;

    /* recuperer position scroll au sein d'un element */
    if ( context ) {
        scrollTop = context.scrollTop;
    }
    /* recuperer position scroll page */
    else {
        if (window.pageYOffset) {
            scrollTop = window.pageYOffset;
        } else {
            var zoomFactor = getZoomFactor();
            scrollTop = Math.round(document.documentElement.scrollTop / zoomFactor);
        }
    }
    
    return(scrollTop);
}


/* Variable globale concernant le device en cours */
var current_device = detect_device();

/* Fonction de déplacement d'un bloc vers un autre */
function move_block(src, dest) {
    if (src && dest) {
//        var parent_node = src.parentNode;
//        var clone = src;

        dest.appendChild(src);
//        if (parent_node) {
//            parent_node.removeChild(clone);    
//        } 
//
//        dest.appendChild(clone);
    }       
}

/* Fonction de déplacement avant dest */
function move_block_before(node, src, dest) {
    if (node && src && dest) {
        var parent_node = src.parent;
        var clone = src;

        if (parent_node) {
            parent_node.removeChild(clone);    
        } 

        node.insertBefore(clone, dest);
    }       
}

/* Renvoit un objet contenant : 
 * bottom 
 * height 
 * left 
 * right 
 * top 
 * width */
function get_bounding(itemobj) {
    if (!itemobj) {
        return 0;
    }
    return (itemobj.getBoundingClientRect());
}

/* Renvoi la width d'un itemobj */
function get_width(itemobj) {
    return (get_bounding(itemobj).width);
}

function get_height(itemobj) {
    return (get_bounding(itemobj).height);
}

/* Fonction random */
function interval_random(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}  

/* Verifie si un caractère est un chiffre ou non */  
function is_digit(c) {
    if (c >= '0' && c <= '9') {
        return (true);
    } 

    return (false);
}

/* Permet un affichage de la forme 123 456 789, 1 234.5, 1 345Keuro */
function number_presenter(str) {
    var res = "";
    var idx = 0;
    var jdx = 0;
    var str_sz = str.length;
    var num = "";

    while (idx < str_sz) {
        if (!is_digit(str[idx])) {
            res += str[idx];
            idx++;
        } 
        else {
            jdx = idx;

            /* On continue jusqu'à la fin ou jusqu'au 
             * prochain caractère non chiffre */
            while (jdx < str_sz && is_digit(str[jdx])) {
                jdx++;
            }

            num = str.substring(idx, jdx);

            res += format_number(num);
            idx = jdx; 
        }
    }

    /* On remplace EURO ou EU par &euro; */
    var reg = new RegExp("EURO", "g");
    res = res.replace(reg, "&euro;");

    reg = new RegExp("EU", "g");
    res = res.replace(reg, "&euro;");

    return (res);
}

function format_number(num) {
    var num_sz = num.length;
    var res = "";
    var start = 0;
    var end = 0;
    var nb = 0;

    end = num_sz % 3;
    if (end == 0) {
        end = 3;
    }
    res += num.substring(start, end);
    start = end;
    end += 3;

    while (end <= num_sz) {
        res += "\xA0"; 
        res += num.substring(start, end);
        start = end;
        end += 3;
    } 
    return (res);
}

function display_num(itemobj) {
    if (itemobj) { 
        var tab = get_elementsbyclassname(itemobj, 'numdisplay'); 
        if (tab) {
            for (var i = 0; i < tab.length; i++) {
                tab[i].innerHTML = number_presenter(tab[i].innerHTML);
            }   
        }
    }
}

function build_table_chiffre(tab) {
    if (tab) {
        var list = tab.getElementsByTagName("td");

        for (var i = 0; i < list.length; i++) {
            var elem = list[i].getAttribute("data-chiffre");
            if (elem) {
                var nb = parseInt(elem);
                
                var monnaie = "";
                var idx = 0;
                if (elem[idx] == '-') {
                    idx++;
                }
                while (idx < elem.length && is_digit(elem[idx])) {
                    idx++;
                }
                monnaie = elem.substring(idx, elem.length);

                if ((nb > 999999 || nb < -999999) && is_phone_device()) {
                    list[i].innerHTML = Math.round(nb / 1000) + " K" + monnaie; 
                } else {
                    list[i].innerHTML = elem;
                }
            }
        }
    }
}

function get_offset_top(id) {
    var itemobj = document.getElementById(id);
    var res = 0;

    if (itemobj) {
        res = itemobj.offsetTop;
        while (itemobj.offsetParent) {
            itemobj = itemobj.offsetParent;
            res += itemobj.offsetTop;
        }
    }

    return (res);
}

_env_societe = 0;
_env_dirigeant = 1;

_env = _env_societe;

function is_dirigeant() {
    if (_env == _env_dirigeant) {
        return(true);
    }

    return(false);
}


function is_societe() {
    if (_env == _env_societe) {
        return(true);
    }

    return(false)
}

/* recuperer elemet precedent */
function getPrevious(obj) {

    if ( obj.previousSibling == null ) {
        return obj;
    }

    var prev = obj.previousSibling;

    while ( prev.nodeType!=1 && prev.previousSibling != null ) {
        prev = prev.previousSibling;
    }
    return prev;
}

/*  recuperer element suivant */
function getNext(obj) {

    if ( obj.nextSibling == null ) {
        return obj;
    }

    var next = obj.nextSibling;

    while ( next.nodeType!=1 && next.nextSibling != null ) {
        next = next.nextSibling;
    }
    return next;
}

/********************************************************/
/******************** Gestion cookies *******************/
/********************************************************/
/* variables contenant version courante cookies */
var cookiePubVersion       = 0;
var cookieAnalyticsVersion = 0;
var cookieSociauxVersion   = 0;
var valueVersion           = 0;
var valueCookie            = "";

/* variable pour requete Ajax */
var url = "";

/* securisation variables contenant version cookies en BO */
if ( !lastversion_cookiepub || lastversion_cookiepub == undefined ) {
    var lastversion_cookiepub = -1;
}
if ( !lastversion_cookieanalytics || lastversion_cookieanalytics == undefined ) {
    var lastversion_cookieanalytics = -1;
}
if ( !lastversion_cookiesociaux || lastversion_cookiesociaux == undefined ) {
    var lastversion_cookiesociaux = -1;
}


/* fonction creation cookie */
function createCookie(name,value,days) {

    if (days) {
        var date = new Date();
        if (days > 393) { /* never more than 13 months (in fact 365 days + 28 days) */
            days = 393;
        }
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else {var expires = "";}
    document.cookie = name+"="+value+expires+"; path=/; domain=.societe.com; secure; SameSite=Strict";
}

/* fonction lecture cookie */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/* fonction suppression cookie */
function eraseCookie(name) {
    createCookie(name,"",-1);
}

/* fonctions creation/suppression cookies specifiques */
function createCookiePubOui() {
    versionCookie();
    createCookie('soccookiepub',"value=true,version=" + cookiePubVersion,393);
}

function createCookiePubNon() {
    versionCookie();
    createCookie('soccookiepub',"value=false,version=" + cookiePubVersion,393);
}

function createCookieAnalyticsOui() {
    versionCookie();
    createCookie('soccookieanalytics',"value=true,version=" + cookieAnalyticsVersion,393);
}

function createCookieAnalyticsNon() {
    versionCookie();
    createCookie('soccookieanalytics',"value=false,version=" + cookieAnalyticsVersion,393);
}

function createCookieSociauxOui() {
    versionCookie();
    createCookie('soccookiesociaux',"value=true,version=" + cookieSociauxVersion,393);
}

function createCookieSociauxNon() {
    versionCookie();
    createCookie('soccookiesociaux',"value=false,version=" + cookieSociauxVersion,393);
}

/* fonction recuperation version cookies */
function versionCookie() {

    /* si on est sur page gestion des cookies */
    if ( document.getElementById("choix-cookies") != undefined ) {

        var cookiePub       = document.getElementById("cookiepub-item");
        var cookieAnalytics = document.getElementById("cookieanalytics-item");
        var cookieSociaux   = document.getElementById("cookiesociaux-item");

        /* recuperation version */
        cookiePubVersion       = cookiePub.getAttribute("data-societe-version-cookiepub");
        cookieAnalyticsVersion = cookieAnalytics.getAttribute("data-societe-version-cookieanalytics");
        cookieSociauxVersion   = cookieSociaux.getAttribute("data-societe-version-cookiesociaux");
    }
}

/* positionner le switch cookie pub */
function cookiePub() {

    var nomCookie        = 'soccookiepub';
    var cookie           = readCookie(nomCookie);
    var cookieSwitch     = document.getElementById("cookiepub");

    /* si cookie n'existe pas */
    if ( !cookie || !compareVersionCookie(nomCookie) ) {

        /* precochage checkbox a non */
        cookieSwitch.checked = false;
    }
    /* si cookie existe */
    else {

        /* recup valeur */
        splitCookie(nomCookie, 'value');

        /* si cookie refuse */
        if ( valueCookie == "false") {

            cookieSwitch.checked = false; /* precochage checkbox a non */
        }
        /* si cookie accepte */
        else {

            cookieSwitch.checked = true; /* precochage checkbox a oui */
        }
    }
}

/* positionner le switch cookie analytics */
function cookieAnalytics() {

    var nomCookie        = 'soccookieanalytics';
    var cookie           = readCookie(nomCookie);
    var cookieSwitch     = document.getElementById("cookieanalytics");

    /* si cookie n'existe pas */
    if ( !cookie || !compareVersionCookie(nomCookie) ) {

        /* precochage checkbox a non */
        cookieSwitch.checked = false;
    }
    /* si cookie existe */
    else {

        /* recup valeur */
        splitCookie(nomCookie, 'value');

        /* si cookie refuse */
        if ( valueCookie == "false") {

            cookieSwitch.checked = false; /* precochage checkbox a non */
        }    
        /* si cookie accepte */
        else {

            cookieSwitch.checked = true; /* precochage checkbox a oui */
        }
    }
}

/* positionner le switch cookie reseaux sociaux */
function cookieSociaux() {

    var nomCookie        = 'soccookiesociaux';
    var cookie           = readCookie(nomCookie);
    var cookieSwitch     = document.getElementById("cookiesociaux");

    /* si cookie n'existe pas */
    if ( !cookie || !compareVersionCookie(nomCookie) ) {

        /* precochage checkbox a non */
        cookieSwitch.checked = false;
    }
    /* si cookie existe */
    else {

        /* recup valeur */
        splitCookie(nomCookie, 'value');

        /* si cookie refuse */
        if ( valueCookie == "false") {

            cookieSwitch.checked = false; /* precochage checkbox a non */
        }
        /* si cookie accepte */
        else {

            cookieSwitch.checked = true; /* precochage checkbox a oui */
        }
    }
}

/* recuperation version des mentions legales */
function version_cookies() {

    /* si variables contenant version cookies en BO n'existent pas -> afficher un message d'erreur */
    if ( lastversion_cookiepub < 0 || lastversion_cookieanalytics < 0 || lastversion_cookiesociaux < 0 ) {

        var content = document.getElementById("choix-cookies");
        var error   = document.getElementById("choix-cookies-error");

        content.style.display = "none";
        error.style.display = "block";
    }
    /* si elles existent */
    else {

        var itemCookiePub       = document.getElementById("cookiepub-item");
        var itemCookieAnalytics = document.getElementById("cookieanalytics-item");
        var itemCookieSociaux   = document.getElementById("cookiesociaux-item");


        /* insertion des valeurs dans accepter/refuser chacun des cookies */
        itemCookiePub.setAttribute("data-societe-version-cookiepub", lastversion_cookiepub );
        itemCookieAnalytics.setAttribute("data-societe-version-cookieanalytics", lastversion_cookieanalytics );
        itemCookieSociaux.setAttribute("data-societe-version-cookiesociaux", lastversion_cookiesociaux );
    }
}

/* fonction pour recuperation parametres passes dans cookie */
function splitCookie(cookie, search) {

    var valeurCookie = readCookie(cookie); /* lecture du cookie */

    if ( valeurCookie != null ) {
        
        var tableCookie  = valeurCookie.split(","); /* valeur cookie sous forme de tableau */

        for ( var i = 0; i < tableCookie.length; i++ ) {

            var src = tableCookie[i];

            /* recherche si parametre souhaite existe */
            if ( src.indexOf(search) >= 0 ) {

                var indiceStart = src.indexOf("=") + 1;
                var indiceEnd   = src.length;
                var valueSearch = src.substr(indiceStart, indiceEnd); /* recuperation valeur parametre */

                if ( search == "version" ) {

                    valueVersion = valueSearch;
                } else if ( search == "value" ) {

                    valueCookie = valueSearch;
                }
            } 
        }
    }
}

/* fonction comparaison version cookie / derniere version en BDD */
function compareVersionCookie(cookie) {

    var lastVersion = 0;

    /* recuperation derniere version */
    if ( cookie == "soccookiepub" ) {

        splitCookie(cookie, "version");
        lastVersion = lastversion_cookiepub;

    }
    if ( cookie == "soccookieanalytics" ) {

        splitCookie(cookie, "version");
        lastVersion = lastversion_cookieanalytics;
        
    }
    if ( cookie == "soccookiesociaux" ) {

        splitCookie(cookie, "version");
        lastVersion = lastversion_cookiesociaux;
    }

    /* version a jour ou pas */
    if ( lastVersion == valueVersion ) {

        return true;
    } else {

        return false;
    }
}

/* accepter/refuser tous les cookies dans modale */
function choix_all_cookies() {

    var cookiesOui = document.getElementsByName("cookiesall-oui");
    var cookiesNon = document.getElementsByName("cookiesall-non");

    /* accepter tous les cookies */
    for ( var o = 0; o < cookiesOui.length; o++ ) {

        add_event(cookiesOui[o], "click",  function() {

            url = "";

            /* creation des cookies a true */
            createCookiePubOui();
            createCookieAnalyticsOui();
            createCookieSociauxOui();

            /* recuperation parametres pour envoi requete */
            splitCookie("soccookiepub", "version");
            url  += "soccookiepub=true&versionP=" + valueVersion;
            splitCookie("soccookieanalytics", "version");
            url += "&soccookieanalytics=true&versionA=" + valueVersion;
            splitCookie("soccookiesociaux", "version");
            url += "&soccookiesociaux=true&versionS=" + valueVersion;

            gana_event(null, "modale_cookies", "oui");
            /* requete Ajax */
            sendrequestcookies();
        });
    }

    /* refuser tous les cookies */
    for ( var n = 0; n < cookiesNon.length; n++ ) {

        add_event(cookiesNon[n], "click",  function() {

            url = "";

            var envoiCookiePub       = false;
            var envoiCookieAnalytics = false;
            var envoiCookieSociaux   = false;

            /* verif si soccookieid existe */
            if ( readCookie('soccookieid') ) {

                /* requete Ajax si cookie etait = a true */
                if ( cookiePub ) {

                    splitCookie("soccookiepub", "value");

                    if ( valueCookie == "true" ) {
                        envoiCookiePub = true;
                    }
                }
                
                if ( cookieAnalytics ) {

                    splitCookie("soccookieanalytics", "value");

                    if ( valueCookie == "true" ) {
                        envoiCookieAnalytics = true;
                    }
                }
                
                if ( cookieSociaux ) {
                    splitCookie("soccookiesociaux", "value");

                    if ( valueCookie == "true" ) {
                        envoiCookieSociaux = true;
                    }
                }
            } 

            /* creation des cookies a false */
            createCookiePubNon();
            createCookieAnalyticsNon();
            createCookieSociauxNon();

            /* recuperation parametres pour envoi requete */
            if ( envoiCookiePub == true ) {

                splitCookie("soccookiepub", "version");

                if ( url == "" ) {
                    url = "soccookiepub=false&versionP=" + valueVersion;
                } else {
                    url += "&soccookiepub=false&versionP=" + valueVersion;
                }
            }

            if ( envoiCookieAnalytics == true ) {

                splitCookie("soccookieanalytics", "version");

                if ( url == "" ) {
                    url = "soccookieanalytics=false&versionA=" + valueVersion;
                } else {
                    url += "&soccookieanalytics=false&versionA=" + valueVersion;
                }
            }

            if ( envoiCookieSociaux == true ) {

                splitCookie("soccookiesociaux", "version");

                if ( url == "" ) {
                    url = "soccookiesociaux=false&versionS=" + valueVersion;
                } else {
                    url += "&soccookiesociaux=false&versionS=" + valueVersion;
                }
            }
            
            gana_event(null, "modale_cookies", "non");

            /* si au moins un cookie a oui requete Ajax */
            if ( readCookie('soccookieid') && ( envoiCookiePub == true || envoiCookieAnalytics == true || envoiCookieSociaux == true ) ) {
                sendrequestcookies();
            }
            /* sinon fermeture simple de la modale */
            else {
                close_modale_cookies();
            }
        });
    }  
}

/* personnaliser les cookies dans modale */
function personnaliser_cookies() {

    var cookieSwitchPub       = document.getElementById("cookiepub");
    var cookieSwitchAnalytics = document.getElementById("cookieanalytics");
    var cookieSwitchSociaux   = document.getElementById("cookiesociaux");

    gana_event(null, "modale_cookies", "personnaliser");

    url = "";

    var envoiCookiePub       = false;
    var envoiCookieAnalytics = false;
    var envoiCookieSociaux   = false;

    /* creation cookiePub */
    if ( cookieSwitchPub.checked == false ) {
        createCookiePubNon();
        splitCookie("soccookiepub", "version");
        url += "soccookiepub=false&versionP=" + valueVersion;

        /* verif si soccookieid existe */
        if ( readCookie('soccookieid') ) {
            envoiCookiePub = true;
        }
        
    } else {
        createCookiePubOui();
        splitCookie("soccookiepub", "version");
        url += "soccookiepub=true&versionP=" + valueVersion;
        envoiCookiePub = true;
    }

    /* creation cookieAnalytics */
    if ( cookieSwitchAnalytics.checked == false ) {
        createCookieAnalyticsNon();
        splitCookie("soccookieanalytics", "version");
        url += "&soccookieanalytics=false&versionA=" + valueVersion;

        /* verif si soccookieid existe */
        if ( readCookie('soccookieid') ) {
            envoiCookieAnalytics = true;
        }
    } else {
        createCookieAnalyticsOui();
        splitCookie("soccookieanalytics", "version");
        url += "&soccookieanalytics=true&versionA=" + valueVersion;
        envoiCookieAnalytics = true;
    }

    /* creation cookieSociaux */
    if ( cookieSwitchSociaux.checked == false ) {
        createCookieSociauxNon();
        splitCookie("soccookiesociaux", "version");
        url += "&soccookiesociaux=false&versionS=" + valueVersion;

        /* verif si soccookieid existe */
        if ( readCookie('soccookieid') ) {
            envoiCookieSociaux = true;
        }
    } else {
        createCookieSociauxOui();
        url += "&soccookiesociaux=true&versionS=" + valueVersion;
        envoiCookieSociaux = true;
    }

    /* si au moins un cookie a oui requete Ajax */
    if ( envoiCookiePub == true || envoiCookieAnalytics == true || envoiCookieSociaux == true ) {
        sendrequestcookies();
    }
    /* sinon fermeture simple de la modale */
    else {
        close_modale_cookies();
    }
}

/* envoi de la requete vers cgi-bin/recup-cookie */
function sendrequestcookies() {

    var req = null;
    var id  = "";

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/plain");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre browser ne supporte pas AJAX");
                }
            }
        }
    }

    if (req && req.readyState != 0){
        req.abort();
    }

    /* verif si soccookieid existe */
    if ( readCookie('soccookieid') ) {
        id = "&soccookieid=" + readCookie('soccookieid');
    }

    /* passer les variables */
    req.open("POST", "/cgi-bin/recup-cookie", true);
    req.setRequestHeader("Content-type", "application/x-www-from-urlencode;");

    /* envoi infos sur cookies */
    req.send(url + id);

    /* une fois requete envoyee et traitee */
    req.onreadystatechange = function() {
        if ( req.readyState == 4 && ( req.status === 200 || req.status == 0 ) ) {

            /* fermeture modale */
            close_modale_cookies();
        }
    }
}

/********************************************************/
/***************** Fonction GUI general *****************/
/********************************************************/
function init_head() {
    init_header();
    /* init_menuphone(); fonction obsolète */
    open_menu();
    init_panierbar();
    init_compte();
    /* init_menu('menu'); /* fonction obsolète */
    init_bug_fix();
    autopromo_query();

    event_input("input_search", "Entreprise, dirigeant, SIREN...");
    add_event(window, "resize", resize_header);
    add_event(window, "focus", init_compte);
}

function init_headdir() {
    init_header();
    /* init_menuphone(); /* fonction obsolète */
    open_menu();
    init_panierbar();
    init_compte();
    /* init_menu('menu'); /* fonction obsolète */
    init_completion();
    init_bug_fix();
    autopromo_query();

    event_input("input_search", "Nom ou prénom du dirigeant...");
    add_event(window, "resize", resize_header);
    add_event(window, "focus", init_compte);
}

/* Fonction initialisation de la pub */
function init_pub() {
    var pubbanner = document.getElementById('pubbanner');
    display_obj_block(pubbanner);
}

/* Fonction permettant de corriger le bug du zoom sur ipad */
function init_bug_fix() {
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
            viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
            document.body.addEventListener('gesturestart', function () {
                viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
            }, false);
        }
    }
}

/* Fonction permettant de gérer les différents cas lors d'une resize */
function resize_header() {
    init_header();

}

/* Ajout ou non des .com des liens du header */
function init_link() {
    var dirig_link = document.getElementById('dirig_link');
    var fich_link = document.getElementById('fich_link');
    var annu_link = document.getElementById('annu_link');

    display_obj_inline(dirig_link);
    display_obj_inline(fich_link);
    display_obj_inline(annu_link);

    var link_width = get_width(document.getElementById('sites'));
    var social_width = get_width(document.getElementById('pictosociaux'));
    var content_width = get_width(document.getElementById('reseaux'));

    /* Marge de 20 px */
    var width = link_width + social_width + 30;
    if (width >= content_width) {
        hide_obj(dirig_link);
        hide_obj(fich_link);
        hide_obj(annu_link);    
    }
}

/* Fonction d'initialisation du header */
function init_header() {
    init_link();
}

/* Initialisation du panier_bar fixed */
function init_panier_prod() {
    

    var vval = get_elementsbyclassname(document, "vsommeht"); /* vitrine */
    var bval = document.getElementById('sommeht'); /* basket */
    if (vval && bval) {
        for (var i = 0; i < vval.length; i++) {
            vval[i].innerHTML = bval.innerHTML;
        }
    }

    var vval = get_elementsbyclassname(document, "vsommettc"); /* vitrine */
    var bval = document.getElementById('sommettc'); /* basket */
    if (vval && bval) {
        for (var i = 0; i < vval.length; i++) {
            vval[i].innerHTML = bval.innerHTML;
        }
    }

    vval = get_elementsbyclassname(document, 'vnbprod'); /* vitrine */
    bval = document.getElementById('nbprod'); /* basket */
    
    var nbprod = 0;
    var pubmobile = document.getElementById('pubmobile');
    var panierbar = document.getElementById('panier-bar');
    
    if (vval && bval) {
        nbprod = bval.innerHTML;
        if (is_phone_device() || is_tablet_device()) {
            if (parseInt(nbprod) > 0) {
                if (pubmobile) {
                    pubmobile.style.visibility = "hidden";
                }
                display_obj_block(panierbar);

            } else {
                if (pubmobile) {
                    pubmobile.style.visibility = "visible";
                }
                hide_obj(panierbar);
            }
        } else {
            hide_obj(panierbar);
        }

        for (var i = 0; i < vval.length; i++) {
            vval[i].innerHTML = nbprod;    
        }
    }

    var pluriel = get_elementsbyclassname(document, 'vplur');
    if (pluriel) {
        for (var i = 0; i < pluriel.length; i++) {
            if (nbprod > 1) {
                pluriel[i].innerHTML = "s";
            } else {
                pluriel[i].innerHTML = "";
            }
        }
    }
}


function init_panierbar() {
    var panierbar = document.getElementById('panier-bar');
    if (panierbar) {
        hide_obj(panierbar);
        add_event(window, "resize", init_panier_prod);
        init_panier_prod();
    }
}

/* Nouvelle fonction pour l'apparition du header mobile au scroll */
function navbar_scroll() {
    /*if(!is_phone_device()) {
        return;
    }*/

    if( window.innerWidth >= 1280 ) {
        return;
    }

    var navBar = document.getElementById('navbar'),
        header = document.getElementById('header');

    /* dans quel element recuperer le scroll --> page carto ne recupere pas scroll au sein de window */
    if ( document.getElementById("fiche_carto") && document.getElementById("presentation_carto_banner") ) {
       var reference = document.getElementById("documentbody_around");
    } else {
        var reference = window;
    }

    /* page carto -> recuperer scroll au sein de documentbody_around */
    if ( reference == document.getElementById("documentbody_around") ) {
        scrollY = getY(reference);
    } else {
        scrollY = getY();
    }

    var headerHeight = get_height(header);

    if((scrollY > headerHeight) && (navbar.classList.contains('isInvisible'))) {
        remove_class(navBar, 'isInvisible');

        /* gestion temporaire bandeau COVID */
        /*if(!is_class_exist(document.getElementById('covid_banner'), 'hide')) {
            add_class(navBar, 'covid');
        }*/
    } else {
        if((scrollY < headerHeight) && !(navbar.classList.contains('isInvisible'))) {
            add_class(navbar, 'isInvisible');
        }
    }
}

/********************************************************/
/************** Gestion du champ de recherche ***********/
/********************************************************/

function submit_search(formId, inputId) {
    var form = document.getElementById(formId);
    var input = document.getElementById(inputId);
    var str = "";

    if (input && form) {
        if (input.value == "Entreprise, dirigeant, SIREN..." || input.value == "") {
            alert("Veuillez saisir un nom d'entreprise, un SIREN ou un nom de dirigeant");
            return (false);
        }
        
        gana_event(null, 'Search', 'Bouton_de_recherche');

        str = input.value;
        str.trim();
        str = str.replace(/ /g, "");
        str = str.replace(/\./g, "");

        if ( (str.length == 9 || str.length == 14) && !isNaN(str) ) {
            input.value = str;
        }

        form.action = "/cgi-bin/search";
        form.submit();

        return (true);
    }

    return (false);
}


/********************************************************/
/************** Gestion du champ de recherche ***********/
/********************************************************/
function init_completion() {

    clear_result_completion();
    add_event(window, "resize", resize_completion);
}

function resize_completion() {
    clear_result_completion();
    searchdir_checkrequest();
}

function clear_result_completion() {
    var results = document.getElementById('completion_results');

    if (results) {
        results.innerHTML = "";
        results.style.top = "";
        results.style.left = "";
        results.style.height = "";
        hide_obj(results);
    }
}

function submit_dirsearch() {
    var form = document.getElementById("form_search");
    var input = document.getElementById("input_search");
    var str = "";

    if (input && form) {
        if (input.value == "Nom ou prénom du dirigeant..." || input.value == "") {
            alert("Saisissez un nom ou un prénom du dirigeant");
            return (false);
        }
        
        gana_event(null, 'Search', 'Bouton_de_recherche_dirigeant');

        str = input.value;
        str.trim();
        str = str.replace(/ /g, "");
        str = str.replace(/\./g, "");

        if (str.length == 9 && !isNaN(str)) {
            input.value = str;
        }

        form.action = "/cgi-bin/searchdir";
        form.submit();

        return (true);
    }

    return (false);
} 

function searchdir_checkrequest() {
    var searchdir = document.getElementById('input_search');
    var results = document.getElementById('completion_results');

    if (searchdir && results) {
        if (searchdir.value.length >= 3) {
            var query = "/cgi-bin/searchdir-completion?champ=" + escape(searchdir.value);
            send_query(query, searchdir_completion); 
        } else {
            results.innerHTML = "";
            hide_obj(results);
        }
    }
}

function searchdir_completion(req) {
    if (req.readyState == 4 && req.status == 200) {
        var results = document.getElementById('completion_results');
        
        if (!results) {
            return;
        }

        if (req.responseTexte == "") {
            return;
        }


        clear_result_completion();

        var dir = eval(req.responseText);
        var height = 0;
        for (var i = 0; i < dir.length; i++) {
            var line = document.createElement("p");
            line.id = "completion-" + i;
            line.innerHTML = dir[i].nom + " (" + dir[i].resultat + " résultat";
            if (dir[i].resultat > 1) {
                line.innerHTML += "s";
            }
            line.innerHTML += ")";
            line.setAttribute("name", dir[i].nom);
            add_event(line, "click", completion_redirect);
            add_event(line, "mouseout", completion_mouseout);
            add_event(line, "mouseover", completion_mouseover);

            results.appendChild(line);
        }

        var input = document.getElementById('input_search');
        if (input) {

            var left = GetDomOffset(input, "offsetLeft");
            //results.style.left = left + "px";
            //results.style.left = "0";
            
            if (is_phone_device()) {
                /* Positionnement vertical erroné pour la liste sur les mobiles */
                /* results.style.top = GetDomOffset(input, "offsetTop") + get_height(input) + "px"; */
            } else {
                results.style.top = GetDomOffset(input, "offsetTop");
            }
            
            results.style.width = input.offsetWidth + "px";
            results.style.position = "absolute";
        }

        display_obj_block(results);
    }
}

function completion_redirect() {
    var input = document.getElementById('input_search');
    if (input) {
        input.value = this.getAttribute("name");
        submit_dirsearch();
    }
}

function completion_mouseout() {
    remove_class(this, "completionselected");
}

function completion_mouseover() {
    var result = document.getElementById('completion_results');

    if (result) {
        for (var i = 0; i < result.childElementCount; i++) {
            remove_class(result.children[i], "completionselected");
        }

        add_class(this, "completionselected");
    }
}

function searchdir_keyup(evt) { 
    var e = window.event || evt;
    var result = document.getElementById('completion_results');
    var searchdir = document.getElementById('input_search');
    
    if (!result || !searchdir) {
        return;
    }   

    /* On recherche l'element courant */
    var index = -1;
    for (var i = 0; i < result.childElementCount; i++) {
        if (is_class_exist(result.children[i], "completionselected")) {
            index = i;
            break;
        }
    }

    if (e.keyCode == 40 && searchdir.value.length > 0) { // fleche bas
        if (index >= 0) {
            remove_class(result.children[index], "completionselected");
        }
        
        index++;
        if (index >= result.childElementCount) {
            index = 0;
        }

        add_class(result.children[index], "completionselected");
    } else if (e.keyCode == 38 && searchdir.value.length > 0) { // fleche du haut
        if (index >= 0) {
            remove_class(result.children[index], "completionselected");
        }
        
        index--;
        if (index < 0) {
            index = result.childElementCount - 1;
        }
        
        add_class(result.children[index], "completionselected");
    } else if (e.keyCode == 13 && is_display(result) && searchdir.value.length > 0) {
        e.preventDefault();

        if (index != -1) {
            searchdir.value = result.children[index].getAttribute("name");
        }

        submit_dirsearch();
    } else if (e.keyCode == 13) {
        var target = e.target || e.srcElement;
        e.preventDefault();

        searchdir.value = target.value;
        submit_dirsearch(); 
    } else if (e.keyCode == 27) {
        clear_result_completion();
    } else {
        clear_result_completion();
        searchdir_checkrequest();
    }
}

function searchdir_keydown(evt) {
    var e = window.event || evt;

    if (e.keyCode == 13) {
        e.preventDefault();
    }
}


/********************************************************/
/******************* Gestion du menu ********************/
/********************************************************/
/* Ouverture du menu header */

function toggle_class_open(){
    this.classList.toggle('open');
}

function open_menu_mobile() {
    var menuTitle = document.getElementById('menu-title');
    var menuLists = get_elementsbyclassname(document, 'Menu__item');

    add_event(menuTitle, 'click', toggle_class_open);

    for(var i = 0; i < menuLists.length; i++) {
        add_event(menuLists[i], 'click', toggle_class_open);
    }
}

function open_menu_desktop(){
    var menuLists = get_elementsbyclassname(document, 'Menu__item');

    for(var i = 0; i < menuLists.length; i++) {
        add_event(menuLists[i], 'click', append_menu_list);
    }
}

function append_menu_list() {
    var container = document.getElementById('menu-container');

    var pubBanner = document.getElementById('pubbanner');

    var menuSrc1 = document.getElementById('menu-item-1'),
        menuSrc2 = document.getElementById('menu-item-2'),
        menuSrc3 = document.getElementById('menu-item-3'),
        menuSrc4 = document.getElementById('menu-item-4');

    var menuList1 = document.getElementById('menu-list-1'),
        menuList2 = document.getElementById('menu-list-2'),
        menuList3 = document.getElementById('menu-list-3'),
        menuList4 = document.getElementById('menu-list-4');

    var promoContent1 = document.getElementById('autopromocontent_1'),
        promoContent2 = document.getElementById('autopromocontent_2'),
        promoContent3 = document.getElementById('autopromocontent_3'),
        promoContent4 = document.getElementById('autopromocontent_4');


    switch(this.id) {
        case "menu-item-1":
            hide_obj(pubBanner);

            if(!(container.hasChildNodes())) {
                add_class(menuSrc1, 'open');
                complete_autopromo(promoContent1);
                container.appendChild(menuList1);
                add_class(container, "has-menu-1");
            } else {
                switch(container.classList[1]) {
                  case "has-menu-1":
                    menuSrc1.appendChild(menuList1);
                    remove_class(container, 'has-menu-1');
                    remove_class(menuSrc1, 'open');
                    display_obj_block(pubBanner);
                    break;
                    
                  case "has-menu-2":
                    menuSrc2.appendChild(menuList2);
                    remove_class(menuSrc2, 'open');
                    complete_autopromo(promoContent1);
                    add_class(menuSrc1, 'open');
                    container.appendChild(menuList1);
                    remove_class(container, 'has-menu-2');
                    add_class(container, "has-menu-1");
                    break;
                    
                  case "has-menu-3":
                    menuSrc3.appendChild(menuList3);
                    remove_class(menuSrc3, 'open');
                    complete_autopromo(promoContent1);
                    add_class(menuSrc1, 'open');
                    container.appendChild(menuList1);
                    remove_class(container, 'has-menu-3');
                    add_class(container, "has-menu-1");
                    break;
                    
                  case "has-menu-4":
                    menuSrc4.appendChild(menuList4);
                    remove_class(menuSrc4, 'open');
                    complete_autopromo(promoContent1);
                    add_class(menuSrc1, 'open');
                    container.appendChild(menuList1);
                    remove_class(container, 'has-menu-4');
                    add_class(container, "has-menu-1");
                    break;
                }
            }
            break;

        case "menu-item-2":
            hide_obj(pubBanner);

            if(!(container.hasChildNodes())) {
                add_class(menuSrc2, 'open');
                complete_autopromo(promoContent2);
                container.appendChild(menuList2);
                add_class(container, "has-menu-2");
            } else {
                switch(container.classList[1]) {
                  case "has-menu-1":
                    menuSrc1.appendChild(menuList1);
                    remove_class(menuSrc1, 'open');
                    complete_autopromo(promoContent2);
                    add_class(menuSrc2, 'open');
                    container.appendChild(menuList2);
                    remove_class(container, 'has-menu-1');
                    add_class(container, "has-menu-2");
                    break;
                    
                  case "has-menu-2":
                    menuSrc2.appendChild(menuList2);
                    remove_class(container, 'has-menu-2');
                    remove_class(menuSrc2, 'open');
                    display_obj_block(pubBanner);
                    break;
                    
                  case "has-menu-3":
                    menuSrc3.appendChild(menuList3);
                    remove_class(menuSrc3, 'open');
                    complete_autopromo(promoContent2);
                    add_class(menuSrc2, 'open');
                    container.appendChild(menuList2);
                    remove_class(container, 'has-menu-3');
                    add_class(container, "has-menu-2");
                    break;
                    
                  case "has-menu-4":
                    menuSrc4.appendChild(menuList4);
                    remove_class(menuSrc4, 'open');
                    complete_autopromo(promoContent2);
                    add_class(menuSrc2, 'open');
                    container.appendChild(menuList2);
                    remove_class(container, 'has-menu-4');
                    add_class(container, "has-menu-2");
                    break;
                }
            }
            break;

        case "menu-item-3":
            hide_obj(pubBanner);

            if(!(container.hasChildNodes())) {
                add_class(menuSrc3, 'open');
                complete_autopromo(promoContent3);
                container.appendChild(menuList3);
                add_class(container, "has-menu-3");
            } else {
                switch(container.classList[1]) {
                  case "has-menu-1":
                    menuSrc1.appendChild(menuList1);
                    remove_class(menuSrc1, 'open');
                    complete_autopromo(promoContent3);
                    add_class(menuSrc3, 'open');
                    container.appendChild(menuList3);
                    remove_class(container, 'has-menu-1');
                    add_class(container, "has-menu-3");
                    break;
                    
                  case "has-menu-2":
                    menuSrc2.appendChild(menuList2);
                    remove_class(menuSrc2, 'open');
                    complete_autopromo(promoContent3);
                    add_class(menuSrc3, 'open');
                    container.appendChild(menuList3);
                    remove_class(container, 'has-menu-2');
                    add_class(container, "has-menu-3");
                    break;
                    
                  case "has-menu-3":
                    menuSrc3.appendChild(menuList3);
                    remove_class(container, 'has-menu-3');
                    remove_class(menuSrc3, 'open');
                    display_obj_block(pubBanner);
                    break;
                    
                  case "has-menu-4":
                    menuSrc4.appendChild(menuList4);
                    remove_class(menuSrc4, 'open');
                    complete_autopromo(promoContent3);
                    add_class(menuSrc3, 'open');
                    container.appendChild(menuList3);
                    remove_class(container, 'has-menu-4');
                    add_class(container, "has-menu-3");
                    break;
                }
            }
            break;

        case "menu-item-4":
            hide_obj(pubBanner);

            if(!(container.hasChildNodes())) {
                add_class(menuSrc4, 'open');
                complete_autopromo(promoContent4);
                container.appendChild(menuList4);
                add_class(container, "has-menu-4");
            } else {
                switch(container.classList[1]) {
                  case "has-menu-1":
                    menuSrc1.appendChild(menuList1);
                    remove_class(menuSrc1, 'open');
                    complete_autopromo(promoContent4);
                    add_class(menuSrc4, 'open');
                    container.appendChild(menuList4);
                    remove_class(container, 'has-menu-1');
                    add_class(container, "has-menu-4");
                    break;
                    
                  case "has-menu-2":
                    menuSrc2.appendChild(menuList2);
                    remove_class(menuSrc2, 'open');
                    complete_autopromo(promoContent4);
                    add_class(menuSrc4, 'open');
                    container.appendChild(menuList4);
                    remove_class(container, 'has-menu-2');
                    add_class(container, "has-menu-4");
                    break;
                    
                  case "has-menu-3":
                    menuSrc3.appendChild(menuList3);
                    remove_class(menuSrc3, 'open');
                    complete_autopromo(promoContent4);
                    add_class(menuSrc4, 'open');
                    container.appendChild(menuList4);
                    remove_class(container, 'has-menu-3');
                    add_class(container, "has-menu-4");
                    break;
                    
                  case "has-menu-4":
                    menuSrc4.appendChild(menuList4);
                    remove_class(container, 'has-menu-4');
                    remove_class(menuSrc4, 'open');
                    display_obj_block(pubBanner);
                    break;
                }
            }
            break;
    }
}

function open_menu() {
    var menuLists = get_elementsbyclassname(document, 'Menu__item');

    if(is_phone_device()) {
        for(var i = 0; i < menuLists.length; i++) {
            remove_event(menuLists[i], 'click', append_menu_list);
        }
        open_menu_mobile();
    } else {
        for(var i = 0; i < menuLists.length; i++) {
            remove_event(menuLists[i], 'click', toggle_class_open);
        }
        open_menu_desktop();
    }
}

/********************************************************/
/************** Gestion du bouton compte ****************/
/********************************************************/
function init_compte() {
    var butt = document.getElementById('user_content');
    if (butt) {
        var query = "/cgi-bin/infoclient?e=1&n=1&p=1";
        send_query(query, compte_result); 
    }
}


function compte_result(res) {
    var id      = document.getElementById('user_content');
    var idFloat = document.getElementById('user_content2');

    if (id && res.readyState == 4 && res.status == 200) {

        var json;

        try {
            json = JSON.parse(res.responseText);
        } catch (e) {
            id.innerHTML = '<span class="intro show-mobile-s">Identifiez-vous</span><span class="content show-mobile-s">Compte</span>';
            
            if ( idFloat ) {
                idFloat.innerHTML = '<span class="intro">Identifiez-vous</span><span class="content">Compte</span>';
            }
            return;
        }

        if (json.connected) {

            var contenu = "";

            if (json.prenom) {
                var prenom = json.prenom;
                    prenom = prenom[0];

                contenu   += prenom.toUpperCase();

                    prenom = json.prenom.substring(1, json.prenom.length)

                contenu   += prenom + " ";
            }

            if (json.nom) {
                var nom  = json.nom[0];
                contenu += nom.toUpperCase() + ".";
            }

            if (json.nom || json.prenom) {
                id.innerHTML = '<span class="intro show-mobile-s">Bonjour,</span><span class="content show-mobile-s">' + contenu + '</span>';
                
                if ( idFloat ) {
                    idFloat.innerHTML = '<span class="intro">Bonjour,</span><span class="content">' + contenu + '</span>';
                }
            } else {
                id.innerHTML = '<span class="intro show-mobile-s">Bonjour,</span><span class="content show-mobile-s">' + json.email + '</span>';
                
                if ( idFloat ) {
                    idFloat.innerHTML = '<span class="intro">Bonjour,</span><span class="content">' + json.email + '</span>';
                }
            }

        } else {
            id.innerHTML = '<span class="intro show-mobile-s">Identifiez-vous</span><span class="content show-mobile-s">Compte</span>';
            
            if ( idFloat ) {
                idFloat.innerHTML = '<span class="intro">Identifiez-vous</span><span class="content">Compte</span>';
            }
        }
    }
}

/********************************************************/
/****************** Gestion du QRcode *******************/
/********************************************************/

function set_link_qrcode() {
    if (is_dirigeant()) {
        var reg = new RegExp("(.*)\.societe\.com/dirigeant/(.*)", "g");
        var rep = window.location.protocol + "//dirigeant.societe.com/qrdir/$2";
    } else {
        var reg = new RegExp("(.*)\.societe\.com/societe/(.*)-(.*)", "g");
        var rep = window.location.protocol + "//societe.com/qrcode/-$3";
    }
    var link = window.location.href.replace(reg, rep);
    var qrcode = new QRCode(document.getElementById("qrcode"), { text : link, colorDark :"#0A66B2", colorLight : "#ffffff", width:"85", height:"85", correctLevel : QRCode.CorrectLevel.M });
}


/********************************************************/
/****************** Gestion des requêtes ****************/
/********************************************************/

/* Fonction permettant d'envoyer une query 
 * et d'appeler une callback pour le retour */
function send_query(query, callback, ctx) {
    var req = null;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/html; charset=iso-8859-1");
        }      
    } else {
        if (window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre browser ne supporte pas AJAX");
                }
            }   
        }
    }
    if (req && req.readyState != 0){
        req.abort();
    }
    
    req.open("GET", query, true);
    if (callback) {
        if (typeof(ctx) === 'undefined') {
            req.onreadystatechange = function() {callback(req)};
        } else {
            req.onreadystatechange = function() {callback(ctx, req)};
        }
    }
    req.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    req.send(null); 
}

/* Fonction permettant de submit un form */
function submit(id) {
    if (id) {
        document.getElementById(id).submit();
    }
}


/********************************************************/
/******************** Autopromotion *********************/
/********************************************************/

var autopromo_tab = [];

/* Fonction permettant d'appeler les cgis de l'autopromo */
function autopromo_query() {    
    var query = "/cgi-bin/autopromo";
    send_query(query, autopromo_result);
}

/* Retour du cgi de l'autopromo */
function autopromo_result(res) {
    if (res.readyState == 4) {
        if (res.status == 200) {
            try {
                autopromo_tab = JSON.parse(res.responseText);
            } catch (e) {
                return;
            }
            
            if (autopromo_tab.error) {
                autopromo_tab = [];
            }       
        }
    }
}

/* Remplit itemobj avec une phrase aléatoire */
function complete_autopromo(itemobj) {
    var num = interval_random(0, autopromo_tab.length - 1);

    if (itemobj && (typeof autopromo_tab[num] != 'undefined')) {
        itemobj.innerHTML = autopromo_tab[num];
    }
}


/********************************************************/
/******************** gestion des vues ******************/
/********************************************************/
var wasphone = "undefined";

function set_actionnumtel() {
    var isphone = is_phone_device();

    if (wasphone == isphone) {
        return;
    }
    wasphone = isphone;

    var list = get_elementsbyclassname(document, 'telnumaction');

    for (var i = 0; i < list.length; i++) {
        list[i].innerHTML = (isphone == true) ? "L'appeler" : "Afficher";
    }
}

function resize_resume() {
    set_actionnumtel();
}

/* La vue resume */
function init_resume() {
    // init_identiteplus();
    // add_event(window, "resize", function(){init_identiteplus()});
    display_num(document.getElementById('identite'));
    add_event(window, "resize", function(){resize_resume()});
    set_actionnumtel();
}

/* La vue resume_etablissement */
function init_resume_etablissement() {
    // init_identiteplus();
    // add_event(window, "resize", function(){init_identiteplus()});
    add_event(window, "resize", function(){resize_resume()});
    set_actionnumtel();
}

function modif_aidesociete(id, url) {
    var link = document.getElementById('aidesocietelink');
    
    if (link) {
        link.onclick = function() {
            gana_event(null, 'fiche_produit_' + id, 'Acceder_au_service_bas');
        };
        link.href = url; 
    }

}

//function init_identiteplus() {
//    var text = document.getElementById('identitetext');
//    var link = document.getElementById('identitelien');
//    var plus = document.getElementById('identiteplus');
//    var tel = document.getElementById('identitetel');
//
//    if (is_phone_device()) {
//        move_block_before(link, plus, tel);
//    } else {
//        move_block(plus, text);
//    }
//}

/* Fonction permettant de boucler tant que la fonction existe pas */
function add_func(callback) {
    if (typeof(callback) == 'undefined') {
        setTimeout(function(){add_func(callback);}, 100);
    } else {
        callback();
    }
}

/* Permet à partir d'un string de créer la fonction avec le passage de paramètre */
function extract_func(name, param) {
    if (typeof(window[name]) == 'undefined') {
        setTimeout(function(){extract_func(name, param);}, 100);
    } else {
        var fonction = window[name](param);
        add_func(fonction);
    }
}


/********************************************************/
/******************** gestion ctn ***********************/
/********************************************************/
var ctn_unix = Math.round(+new Date() / 1000);
var ctn_siren = new Array();
var ctn_naf = new Array();
var ctn_custom = new Array();
var ctn_dirigeant = new Array();

function settrk(trk) {
    if (gettrk() >= 42) {
        return;
    }
    var d = new Date();
    d.setTime(d.getTime()+(393*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = "trk=" + trk + "; path=/; " + expires + "; domain=.societe.com;";
}

function gettrk() {
    var trk = "trk=";
    var ca = document.cookie.split(';');
    var c;
    var trackid;

    for (var i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(trk) == 0) {
            trackid = parseInt(c.substring(trk.length, c.length));
            
            if (isNaN(trackid)) {
                trackid = 0;
            } 

            return(trackid);
        }
    }
    return(0);
}

function ctninit() {
    ctn_unix = Math.round(+new Date() / 1000);
    ctn_siren = new Array();
    ctn_naf = new Array();
    ctn_custom = new Array();
    ctn_dirigeant = new Array();
    if (typeof(ctn_cnt) == "undefined") {
        ctn_cnt = 0;
    }

    if (typeof(ctn_hit) == "undefined") {
        ctn_hit = 0;
    }
}

function ctn(pla, typ, src, nb) {
    var ctn_url;
    var ref;

    if (ctn_cnt > 0 && gettrk() == null) {
        return;
    }

    nctn = (typeof(nb) == "number") ? nb : 1;
   
    ctn_url = "/cgi-bin/ctn?pla=" + pla + "&typ=" + typ + "&nb=" + nctn + "&unix=" + ctn_unix + "&hit=" + ctn_hit;

    ref = document.referrer;
    for (var i = 0; i < ctn_siren.length; i++)
        if (ctn_siren[i] && ctn_siren[i].length != 0)
            ctn_url = ctn_url + "&sir=" + encodeURI(ctn_siren[i]);
    for (var i = 0; i < ctn_naf.length; i++)
        if (ctn_naf[i] && ctn_naf[i].length != 0)
            ctn_url = ctn_url + "&naf=" + encodeURI(ctn_naf[i]);
    for (var i = 0; i < ctn_custom.length; i++)
        if (ctn_custom[i] && ctn_custom[i].length != 0)
            ctn_url = ctn_url + "&cus=" + encodeURI(ctn_custom[i]);
    for (var i = 0; i < ctn_dirigeant.length; i++)
        if (ctn_dirigeant[i] && ctn_dirigeant[i].length != 0)
            ctn_url = ctn_url + "&dir=" + encodeURI(ctn_dirigeant[i]);
    ref = encode_to_hex(ref);
    ctn_url = ctn_url + "&cnt=" + ctn_cnt + "&ref=" + ref;

    if (src) {
        ctn_url += "&src=" + src;
    }

    ctn_cnt += nctn;
    ctn_hit += nctn;
    document.write('<scr' + 'ipt type="text/javascript" src="' + ctn_url + '"></scr' + 'ipt>');
    
    /* On reset les données indépendantes */
    ctninit();
}

function ctntest(pla, typ, src) {
    var ctn_url;
    var ref;

    if (ctn_cnt > 0 && gettrk() == null) {
        return;
    }
   
    ctn_url = "/cgi-bin/ctntest?pla=" + pla + "&typ=" + typ + "&unix=" + ctn_unix + "&hit=" + ctn_hit;

    ref = document.referrer;
    for (var i = 0; i < ctn_siren.length; i++)
        if (ctn_siren[i] && ctn_siren[i].length != 0)
            ctn_url = ctn_url + "&sir=" + encodeURI(ctn_siren[i]);
    for (var i = 0; i < ctn_naf.length; i++)
        if (ctn_naf[i] && ctn_naf[i].length != 0)
            ctn_url = ctn_url + "&naf=" + encodeURI(ctn_naf[i]);
    for (var i = 0; i < ctn_custom.length; i++)
        if (ctn_custom[i] && ctn_custom[i].length != 0)
            ctn_url = ctn_url + "&cus=" + encodeURI(ctn_custom[i]);
    for (var i = 0; i < ctn_dirigeant.length; i++)
        if (ctn_dirigeant[i] && ctn_dirigeant[i].length != 0)
            ctn_url = ctn_url + "&dir=" + encodeURI(ctn_dirigeant[i]);
    ref = encode_to_hex(ref);
    ctn_url = ctn_url + "&cnt=" + ctn_cnt + "&ref=" + ref;

    if (src) {
        ctn_url += "&src=" + src;
    }

    ctn_cnt++;
    ctn_hit++;
    document.write('<scr' + 'ipt type="text/javascript" src="' + ctn_url + '"></scr' + 'ipt>');
    
    /* On reset les données indépendantes */
    ctninit();
}
/* On execute ctn pour la première fois */
ctninit();


/********************************************************/
/*************** VIEW PRODUIT (DISPLAY / HIDE) *************/
/********************************************************/
var Ficheprod = function (id, id_label, id_obj, state) {
    this.id = id;
    this.label = id_label;
    this.obj = id_obj;
    this.state = state;
    this.ref;

    this.init = function() {
        if (!this.state) {
            hide_obj(document.getElementById(this.obj));
            document.getElementById(this.id).innerHTML = this.label;
        } else {
            display_obj_table(document.getElementById(this.obj));
            document.getElementById(this.id).innerHTML = '<i class="icon-minus-1"></i>Masquer';
        }
    }

    this.click = function() {
        var itemobj = this;
        add_event(document.getElementById(this.id), "click", function(){display_ficheprod(itemobj);});
    }
}

var prodtab = new Array();

function add_ficheprod(id, id_obj, state) {
    var elem = document.getElementById(id);
    if (elem) {
        var ficheprod = new Ficheprod(id, elem.innerHTML, id_obj, state);
        ficheprod.init();
        ficheprod.click();
        prodtab.push(ficheprod); 
    }
}

function display_ficheprod(itemobj) {
    if (itemobj) {
        display_or_hide_table(itemobj.obj);
        if (is_display(document.getElementById(itemobj.obj))) {
            document.getElementById(itemobj.id).innerHTML = '<i class="icon-minus-1"></i>Masquer';
        } else {
            document.getElementById(itemobj.id).innerHTML = itemobj.label;
        }
    }
}

/* La vue prod */
function display_prod(id_tab, id_button) {
    var btn = document.getElementById(id_button);
    var tab = document.getElementById(id_tab);

    if (tab && btn) {
        display_or_hide_table(id_tab);

        if (is_display(tab)) {
            btn.innerHTML = '<i class="icon-minus-1"></i>Masquer';
        } else {
            btn.innerHTML = '<i class="icon-plus-1"></i>En savoir plus';
        }
    } 
}

/* Variable globale panier */
var panier_posinit = 0;

/* Variable global minifiche */
var minifiche_posinit = 0;

var nbprod = 0;
var oldnbprod = -1;
var prod = new Array();
var pack = new Array();
var exclusions = new Array();
var included = new Array();
var panprod = new Array();
var reqbasket = new Array();
var reqpost = new Array();
var maxri = 4; /* 4 requetes simultanées */
var ri = 0;
var dheight = 0;
var dmin = 0;
var modtimer;
var MAX_BASKET = 20;


/* ========================= TAGS DE PUB ========================= */

/* ex: <div id="{plc}"><script type="text/javascript">pubsoc("{plc}");</script></div> */
/* ex: <script type="text/javascript">pubsoc("{plc}");</script> */

/* id pub adnext.fr */
_pubsoc_id = "89443";

/* charset des scripts */
_pubsoc_charset = "ISO-8859-1";

/* url adnext.fr */
_pubsoc_adnexturl = "https://adnext.fr/richmedia.adv";
_pubsoc_sociaux = "https://i.po.st/static/v3/post-widget.js#publisherKey=hs6cqd8k7j6uacfvipcq&retina=true";

/*
 * Emplacements possibles de la pub, nom de la DIV
 * Paramètre "&plc="
 * pubbanner = Bannière
 * PubPopup = popup flash (alias po(o)p up)
 * pubcarre = premier carré (ex. Home) <-> wide "angle"
 * PubAdsenseSousRecherche = pub Google sous le résultat de la recherche
 * PubAdsenseAuDessusChiffres = pub Google au dessus des chiffres clés sur l'identité
 * pubcarre2 = pub carré en dessous de la 1ere pub carre (identité)
 * PubTexteVM = pub texte en dessous de la bannière de recherche
 */
/* TEST MultiFormat in place of banner */
/*    "pubbanner":                     { "Code": 1, "Size": "big" }, */
var _pubsoc_plcs = {
    //"pubbanner":                     { "Code": 1, "Size": "big" }, 
    "pubbanner":                   { "Code": -1, "Size": "all", "Phone": true, "Tablet": true,  "Desktop" : true },
    "PubPopup":                    { "Code": 2,  "Size": "all", "Phone": true,  "Tablet": false, "Desktop" : true},
    "pubcarre":                    { "Code": 3,  "Size": "big", "Phone": false, "Tablet": false, "Desktop" : true},
    "PubAdsenseSousRecherche":     { "Code": 7,  "Size": "all", "Phone": false, "Tablet": false, "Desktop" : true},
    "PubAdsenseAuDessusChiffres":  { "Code": 9,  "Size": "all", "Phone": false, "Tablet": false, "Desktop" : true},
    "pubcarre2":                   { "Code": 12, "Size": "big", "Phone": false, "Tablet": false, "Desktop" : true},
    "PubTexteVM":                  { "Code": 31, "Size": "all", "Phone": false, "Tablet": false, "Desktop" : true},
    "pubmobile":                   { "Code": 15, "Size": "all", "Phone": true,  "Tablet": false, "Desktop" : false},
    "pubsociaux":                  { "Code": 0,  "Size": "all", "Phone": false, "Tablet": false, "Desktop" : true},
    "pubkbis":                     { "Code": 16, "Size": "all", "Phone": false, "Tablet": false, "Desktop" : true},
    "pubtextlink":                 { "Code": 20, "Size": "all", "Phone": false, "Tablet": false, "Desktop" : true},
    "pubinterstitial":             { "Code": 14, "Size": "all", "Phone": true, "Tablet": false, "Desktop" : false, "Pubsocid" : "89443"},
    "pubvideo":                    { "Code": -2, "Size": "big", "Phone": false, "Tablet": false, "Desktop" : true}/*,
    "pubnews1":                    { "Code": -2, "Size": "all", "Phone": true, "Tablet": true, "Desktop" : true},
    "pubnews2":                    { "Code": -2, "Size": "all", "Phone": true, "Tablet": true, "Desktop" : true}*/
};

var _pubsoc_replace_seed = Math.floor(Math.random() * 10000000);

var _pubsoc_replace_mode = ((_pubsoc_replace_seed % 2) == 1) ? 0 : 1;

var _pubsoc_replace = {
    "pubbanner" : {"type" : 1},
    "pubcarre"  : {"type" : (_pubsoc_replace_mode == 1) ? 2 : 3},
    "pubcarre2" : {"type" : (_pubsoc_replace_mode == 1) ? 3 : 2}
};

/*
 * Sections possibles
 */
var _pubsoc_section_home         = "home";
var _pubsoc_section_recherche    = "search";
var _pubsoc_section_identite     = "fiche,identite";
/*var _pubsoc_section_dirigeant    = "fiche,dirigeant";*/
var _pubsoc_section_bilan        = "fiche,bilan";
var _pubsoc_section_anafi        = "fiche,anafi_bilan_enquete";
var _pubsoc_section_carto        = "fiche,carto";
var _pubsoc_section_achat        = "fiche,achats";
var _pubsoc_section_dirigeant    = "dirigeantsetactionnaires";
var _pubsoc_section_autres       = "autres";
var _pubsoc_section_publications = "publications";
var _pubsoc_section_marques =  "fiche,marques";

/*
 * Tableau associatif des sections
 * la gestion des sections se fait :
 *  - soit par CGI (path complet du CGI)
 *  - soit par type de "répertoire"
 */
var _pubsoc_sections = {
    "/":                                    _pubsoc_section_home,
    "/cgi-bin/home":                        _pubsoc_section_home,
    "/cgi-bin/homedir":                     _pubsoc_section_home,
    "/cgi-bin/liste":                       _pubsoc_section_recherche,
    "/cgi-bin/listedir":                    _pubsoc_section_recherche,
    "/cgi-bin/search":                      _pubsoc_section_recherche,
    "/cgi-bin/searchdir":                   _pubsoc_section_recherche,
    "/cgi-bin/searchdir-avance":            _pubsoc_section_recherche,
    "/cgi-bin/fiche":                       _pubsoc_section_identite,
    "/societe/":                            _pubsoc_section_identite,
    "/cgi-bin/fichedir":                    _pubsoc_section_dirigeant,
    "/dirigeant/":                          _pubsoc_section_dirigeant,
    "/cgi-bin/anafi":                       _pubsoc_section_anafi,
    "/analyse-financiere/":                 _pubsoc_section_anafi,
    "/cgi-bin/carto":                       _pubsoc_section_carto,
    "/cgi-bin/bilan":                       _pubsoc_section_bilan,
    "/bilan/":                              _pubsoc_section_bilan,
    "/cgi-bin/vitrine":                     _pubsoc_section_achat,
    "/documents-officiels/":                _pubsoc_section_achat,
    "/pages/dirigeants-actionnaires.html":  _pubsoc_section_dirigeant,
    "/produits/liens-capitalistiques.html": _pubsoc_section_dirigeant,
    "/produits/dirigeants.html":            _pubsoc_section_dirigeant,
    "/publications/":                       _pubsoc_section_publications,
    "/marques/":                            _pubsoc_section_marques
};

/*
 * Règles d'affichage de la pub
 */
var _pubsoc_sections_rules = {
    "home": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubmobile":                    true,
        "PubPopup":                     true,
        "pubinterstitial":              true/*,
        "pubnews1":                     true,
        "pubnews2":                     true*/
    },
    "search": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "PubTexteVM":                   true,
        "PubAdsenseSousRecherche":      true,
        "pubmobile":                    true,
        "PubPopup":                     true,
        "pubkbis":                      true,
        "pubinterstitial":              true
    },
    "fiche,identite": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "PubTexteVM":                   true,
        "PubAdsenseAuDessusChiffres":   true,
        "pubmobile":                    true,
        "PubPopup":                     true,
        "pubsociaux":                   true,
        "pubkbis":                      true,
        "pubinterstitial":              true,
        "pubvideo":                     true 
    },
    "fiche,dirigeant": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "PubTexteVM":                   true,
        "PubAdsenseAuDessusChiffres":   true,
        "pubmobile":                    true,
        "PubPopup":                     true,
        "pubsociaux":                   true,
        "pubkbis":                      true,
        "pubinterstitial":              true
    },
    "fiche,bilan": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "PubTexteVM":                   true,
        "PubAdsenseAuDessusChiffres":   true,
        "pubmobile":                    true,
        "PubPopup":                     true,
        "pubinterstitial":              true
    },
    "fiche,anafi_bilan_enquete": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "PubTexteVM":                   true,
        "pubmobile":                    true,
        "PubPopup":                     true,
        "pubinterstitial":              true
    },
    "fiche,carto": {
/*        "pubbanner":                    true,
        "PubTexteVM":                   true,
        "PubPopup":                     true,
        "pubinterstitial":              true*/
    },
    "fiche,marques": {
    },
    "dirigeantsetactionnaires": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "pubinterstitial":              true,
        "pubvideo":                     true/*,
        "pubnews1":                     true,
        "pubnews2":                     true*/
    },
    "autres": {
        "pubbanner":                    true,
        "pubcarre":                     true,
        "pubcarre2":                    true,
        "PubTexteVM":                   true,
        "PubPopup":                     true,
        "pubmobile":                    true,
        "pubinterstitial":              true
    },
    "publications": {
        "pubbanner":                    true,
        "pubinterstitial":              true
    }
};



/* Variables à remplir si informations présentes */
var _pubsoc_categorie = "";
var _pubsoc_effectif = "";
var _pubsoc_chiffre = "";

/* ========================= TAGS DE PUB ========================= */
function _pubsoc_normalize(str) {
    var replacements = [
    { "rx": /[àâä]/g , "rp": "a" },
    { "rx": /[èéêë]/g , "rp": "e" },
    { "rx": /[îï]/g , "rp": "i" },
    { "rx": /[ôö]/g , "rp": "o" },
    { "rx": /[ùûü]/g , "rp": "u" },
    { "rx": /[\- ]/g , "rp": "_" },
    { "rx": /[^A-Za-z0-9_\-]/g , "rp": "" }
    ];
    var tmp = str;
    var index = 0;

    for (; index < replacements.length; index++) {
        tmp = tmp.replace(replacements[index].rx, replacements[index].rp);
    }
    return(tmp.toLowerCase());
}

function _pubsoc_effcode() {
    var _eff;

    _eff = parseInt(_pubsoc_effectif);
    if (isNaN(_eff)) {
        return(null);
    } else if (_eff > 0 && _eff <= 9) {

        return("Salarie1");
    } else if (_eff >= 10 && _eff <= 19) {

        return("Salarie2");
    } else if (_eff >= 20 && _eff <= 49) {

        return("Salarie3");
    } else if (_eff >= 50 && _eff <= 99) {

        return("Salarie4");
    } else if (_eff >= 100 && _eff <= 249) {

        return("Salarie5");
    } else if (_eff >= 250 && _eff <= 499) {

        return("Salarie6");
    } else if (_eff >= 500 && _eff <= 999) {

        return("Salarie7");
    } else if (_eff >= 1000 && _eff <= 4999) {

        return("Salarie8");
    } else if (_eff >= 5000) {

        return("Salarie9");
    }
}

function _pubsoc_cacode() {
    var _ca;

    _ca = parseFloat(_pubsoc_chiffre);
    if (isNaN(_ca)) {
        return(null);
    } else if (_ca > 0 && _ca <= 99999) {
        return("CA1");
    } else if (_ca >= 100000 && _ca <= 999999) {
        return("CA2");
    } else if (_ca >= 1000000 && _ca <= 9999999) {
        return("CA3");
    } else if (_ca >= 10000000 && _ca <= 99999999) {
        return("CA4");
    } else if (_ca > 0) {
        return("CA5");
    }
}

/*
 * Fonction "_pubsoc_hasrule"
 * Paramètres :
 *  - _ps_section, obligatoire : section, voir "_pubsoc_section_*"
 *  - _ps_plc, obligatoire: plc, voir "_pubsoc_plcs"
 * Retour:
 *  - null si pas de règle d'affichage, sinon true
 */
function _pubsoc_hasrule(_ps_section, _ps_plc) {
    var _rules;

    _rules = _pubsoc_sections_rules[_ps_section];
    if (_rules == null) {
        return null;
    }
    return(_rules[_ps_plc]);

}

function _pubsoc_check_device(plc) {
    if (is_phone_device()) {
        return (plc.Phone);
    } else if (is_tablet_device()) {
        return (plc.Tablet);
    } else {
        if (window.innerWidth < 1280) {
            return (plc.Tablet);
        } else {
            return (plc.Desktop);
        }
    }
}

function _pubsoc_get_id() {
    var id;
    if (is_societe()) {
        if (is_phone_device()) {
            id = 100194;
        } else {
            id = 89443;
        }
    } else if (is_dirigeant()) {
        if (is_phone_device()) {
            id = 100809;
        } else {
            id = 99415;
        }
    } else {
        id = 89443;
    }

    return(id);
}

function _pubsoc_get_pathname() {
    _pathname = document.location.pathname;
    if (_pubsoc_sections[_pathname] == null
            && _pathname.indexOf("/cgi-bin/") == -1) {
                _pathname = _pathname.substr(0, _pathname.lastIndexOf("/") + 1);
            }
    return _pathname;
}

function _pubsoc_get_section(pathname) {
    _section = _pubsoc_sections[pathname];
    if (_section == null) {
        /* Si le path n'est pas dans le tableau associatif,
         * On considère qu'il s'agit d'une page "autres"
         */
        _section = _pubsoc_section_autres;
    } else if (_section == _pubsoc_section_home
            && document.location.pathname != "/"
            && document.location.pathname != "/index.shtml"
            && document.location.pathname != "/cgi-bin/index") 
    {
        /* "/" = "/index.shtml" */
        _section = _pubsoc_section_autres;
    }
    return _section;
}

function _pubsoc_allowed(args) {
    var _plc_div, _plc, _pathname, _section;

    if (args.length == 0) {
        /* Voir paramètre obligatoire */
        return false;
    }

    /* Pas de pub sur paiement */
    if (document.URL.indexOf("paiement.societe.com") != -1) {
        return false;  
    }

    /* Pas de pub sur l'espace client */
    if (document.URL.indexOf("/cgi-bin/compte-") != -1) {
        return false;  
    }

    /* Pas de pub sur page gestion des cookies */
    if (document.URL.indexOf("cookie-esp") != -1) {
        return false;  
    }

    /* Pas de pub sur page CGU-CGV */
    if (document.URL.indexOf("cgu-cgv.html") != -1) {
        return false;  
    }

    /* Pas de pub sur page protection donnees personnelles */
    if (document.URL.indexOf("politique-de-protection-des-donnees-personnelles.html") != -1) {
        return false;  
    }

    /* Récupération du plc */
    _plc_div = args[0];
    _plc = _pubsoc_plcs[_plc_div];
    if (_plc == null) {
        /* Voir les emplacements possibles dans le tableau associatif "_pubsoc_plcs" */
        return false;
    }

    /* On rajoute les tests pour l'affichage mobile / ipad / desktop */
    if (!_pubsoc_check_device(_plc)) {
        return false
    }

    /* Récupération de la section */
    _pathname = _pubsoc_get_pathname();

    _section = _pubsoc_get_section(_pathname);

    /* Affiche-t-on la pub ? */
    if (_pubsoc_hasrule(_section, _plc_div) == null) {
        return false;
    }

    //if (_plc_div == "pubbanner") {
    //    if (is_phone_device()) {
    //        return false;
    //    }
    //}

    return true;
}

/*
 * Fonction "_pubsoc_createScript"
 * Paramètres :
 *  - args, obligatoire: arguments de la fonction appelante
 * Description: Creation de la balise script adnext
 */
function _pubsoc_createScript(args) {
    var _plc_div, _plc, _pathname, _section;
    var _elem, _url, _text;

    if (args.length == 0) {
        /* Voir paramètre obligatoire */
        return null;
    }

    /* Récupération du plc */
    _plc_div = args[0];
    _plc = _pubsoc_plcs[_plc_div];


    /* Récupération de la section */
    _pathname = _pubsoc_get_pathname();
    _section = _pubsoc_get_section(_pathname);

    if (_plc_div == "pubbanner") {
        if (is_phone_device()) {
            return null;
        } else if (is_tablet_device()) {
            _plc.Code = 1;
        } else {
            _plc.Code = 2;
            _section += ",testhabillage";
        }
    }
    
    /* Quand on est en mobile on a un autre id */
    if (_plc.Pubsocid) {
        _pubsoc_id = _plc.Pubsocid;
    } else {
        _pubsoc_id = _pubsoc_get_id();
    }

    if (_plc_div == "pubsociaux") {
        _url = _pubsoc_sociaux;
    } else {
        _url = _pubsoc_adnexturl + "?id=" + _pubsoc_id
            + "&plc=" + _plc.Code   
            + "&s=" + _plc.Size
            + "&section=" + _section;

        var _categorie  = _pubsoc_normalize(_pubsoc_categorie);
        if (_categorie != "") {
            _url += "," + _categorie;
        }

        var _effectif = _pubsoc_effcode();
        if (_effectif != null) {
            _url += "," + _effectif;
        }

        var _chiffre = _pubsoc_cacode();
        if (_chiffre != null) {
            _url += "," + _chiffre;
        }

        /* Timestamp pour gestion 20131218 */
        _url += "&ts=" + (new Date()).getTime();

        /* partie inutile car quantcast */
        /* splitCookie("soccookiepub", "value");
        if ( readCookie("soccookiepub") && ( valueCookie == "false" || !compareVersionCookie('soccookiepub') ) ) {
            _url += "&donottrack=1";  
        } */
    }

    var _text = "<script charset=\"" + _pubsoc_charset
        + "\" type=\"text/javascript\" src=\""
        + _url
        + "\"></script>";

    return(_text);
}


function getXhr()
{
    if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    if(window.ActiveXObject) {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
        catch(e) {}
    }
    return null;
}


function getXhrCors() {
    var ret = null;
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
        ret = xhr;
    }

    return ret;
}

/*
*/
coalXhr = getXhr();

function coalWrapper(place) {
    this.xhr = coalXhr;
    this.place = place;

    this.onload = function() {
        try {
            var response = JSON.parse(this.responseText);
        } catch (e) {
            this.onerror();
            return;
        }

        if  (response.error) {
            this.onerror();
            return;
        }
            
        coals.success(response);
    }

    this.onerror = function() {
        coals.fail();
    }

    this.send = function(place) {
        if (this.xhr == null) {
            this.onerror();
        }
        this.xhr.open("GET", "/cgi-bin/coalesce?type=" + _pubsoc_replace[place].type, true);
        this.xhr.socXhrWrapper = this;
        this.xhr.onload = this.onload;
        this.xhr.onerror = this.onerror;
        this.xhr.setRequestHeader("Cache-Control", "max-age=0, no-store, no-cache, must-revalidate");
        this.xhr.setRequestHeader("Pragma", "no-cache");
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
        this.xhr.send();
    }
}

function CoalList() {
    this.coals = [];
    this.xhrs = [];
    this.curr = undefined;


    this.run = function() {
        if (this.curr != undefined || this.coals.length <= 0) {
            return;
        }

        this.curr = this.coals.shift();

        coalXhrWrapper = new coalWrapper();
        coalXhrWrapper.send(this.curr);
        this.xhrs.push(coalXhrWrapper);
    }

    this.add = function(place) {
        this.coals.push(place);
        this.run();
    }

    this.next = function() {
        this.curr = undefined;
        this.run();
    }

    this.success = function(response) {
        var container = document.getElementById(this.curr);
        if (container == null) {
            this.next();
            return;
        }

        if (typeof response != "object" || typeof response.link != "string" || typeof response.ressource != "string") {
            this.next();
            return;
        }

        switch (response.format) {
            case 1 : /* Image */
                if (container.id == "pubcarre" || container.id == "pubcarre2") {
                    container.innerHTML = '<div class="mb-16"><a href="' + response.link + '" alt="' + ((typeof(response.alt) == "string") ? response.alt : "Pub") + '"><img src="' + response.ressource + '"/></a></div>';
                } else {
                    container.innerHTML = '<div><a href="' + response.link + '"><img alt="' + ((typeof(response.alt) == "string") ? response.alt : "Pub") + '" src="' + response.ressource + '"/></a></div>';
                }
                break;
            default :
                break;
        }
        
        this.next();
    }

    this.fail = function() {
        this.next();
    }
}


var _preventDFP = {};

var _pubsoc_coal_possible_places = {
    "pubbanner" : true,
    "pubcarre" : true,
    "pubcarre2" : true
};
var _pubsoc_coal_places = {};
var _pubsoc_coal_places_rate = -1;

var coals = new CoalList();

function pubsoc_coalesce() {
    if (arguments.length == 0) {
        return false;
    }

    if (arguments.length == 1 && typeof arguments[0] == "string" 
            && typeof _pubsoc_replace == "object" && typeof _pubsoc_replace[arguments[0]] == "object") {
        coals.add(arguments[0]);
    //    _preventDFP[arguments[0]] = true;
        return true;
    }

    return false;
}

function require_pub_alternative() {
    var scControl = document.getElementById('controlscript');
    var scFilter = document.getElementById('adsscript');

    if (typeof scControl == "object" && typeof scFilter == "object" ) {
        return true;
    }

    if (arguments.length > 0) {
        if (_pubsoc_coal_places[arguments[0]] == true) {
            return true;
        }
    }
    return false;
}


var _pubsoc_dfp_list = [];
var _pubsoc_dfp_defer = true;
var _pubsoc_dfp_active = true;

function pubsoc_dfp_run_defer() {
    _pubsoc_dfp_defer = false;

    for (var i = 0, ii = _pubsoc_dfp_list.length; i < ii; i++) {
        pubsoc_dfp(_pubsoc_dfp_list[i]);
    }
}

function pubsoc_slot(id) {
    var p = _pubsoc_dfp[id];

    if (_preventDFP[id] == true) {
        return;
    }

    if (p != null) {
        var prefixPubid = "";

        if (is_dirigeant()) {
            //prefixPubid = "/162547629/dirigeant.com"
            //prefixPubid = "/162547629,22204634898/dirigeant.com"
            prefixPubid = "/22204634898/dirigeant.com"
        } else {
            //prefixPubid = "/162547629/societe.com"
            //prefixPubid = "/162547629,22204634898/societe.com"
            prefixPubid = "/22204634898/societe.com"
        }

        var mapping = googletag
            .defineSlot(prefixPubid + p.slot.pubid, p.slot.resolutions, p.slot.locationid);

        var tmp = googletag.sizeMapping();

        for (var i = 0, ii = p.mapping.length; i < ii; i++) {
            tmp.addSize(p.mapping[i].resolution, p.mapping[i].dimensions);
        }

        mapping.defineSizeMapping(tmp.build())
            .addService(googletag.pubads());
    }
}

function pubsoc_dfp(id) {
    if (is_phone_device()) {
        return;
    }

    if (_pubsoc_dfp_defer == true) {
        _pubsoc_dfp_list.push(id);
        return;
    }

    var div = document.createElement('div');
    var a = document.getElementById(id);
    var p = _pubsoc_dfp[id];

    div.id = p.slot.locationid;
    a.appendChild(div);

    googletag.display(p.slot.locationid);
}

var _pubsoc_dfp = {
    "pubbanner" : {
        "slot" : {
            "locationid" : "div-gpt-ad-banner-0",
            "pubid" : "/banner",
            "resolutions" : [[1, 1], [1000, 300], [1000, 90], [970, 250], [970, 90], [728, 90], [468, 60], [320, 100], [320, 50], [300, 50]]
        },
        "mapping" : [
            {
                "resolution" : [1000, 0],
                "dimensions" : [[1, 1], [1000, 300], [1000, 90], [970, 250], [970, 90], [728, 90]]
            },
            {
                "resolution" : [768, 0],
                "dimensions" : [[1, 1], [728, 90]]
            },
            {
                "resolution" : [600, 0],
                "dimensions" : [[1, 1], [468, 60]]
            },
            {
                "resolution" : [480, 0],
                "dimensions" : [[1, 1], [468, 60], [320, 100], [320, 50], [300, 50]]
            },
            {
                "resolution" : [320, 0],
                "dimensions" : [[1, 1], [320, 100], [320, 50], [300, 50]]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    },
    "pubcarre" : {
        "slot" : {
            "locationid" : "div-gpt-ad-mpu-0",
            "pubid" : "/mpu",
            "resolutions" : [[1, 1], [300, 600], [300, 250]]
        },
        "mapping" : [
            {
                "resolution" : [1280, 0],
                "dimensions" : [[1, 1], [300, 600], [300, 250]]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    },
    "pubcarre2" : {
        "slot" : {
            "locationid" : "div-gpt-ad-mpu2-0",
            "pubid" : "/mpu2",
            "resolutions" : [[1, 1], [300, 600], [300, 250]]
        },
        "mapping" : [
            {
                "resolution" : [1280, 0],
                "dimensions" : [[1, 1], [300, 600], [300, 250]]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    },
    "pubinterstitial" : {
        "slot" : {
            "locationid" : "div-gpt-ad-interstitial-0",
            "pubid" : "/interstitial",
            "resolutions" : [[1, 1], [320, 480], [300, 250]]
        },
        "mapping" : [
            {
                "resolution" : [600, 0],
                "dimensions" : []
            },
            {
                "resolution" : [320, 0],
                "dimensions" : [[1, 1], [320, 480], [300, 250]]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    },
    "pubvideo" : {
        "slot" : {
            "locationid" : "div-gpt-ad-inread-0",
            "pubid" : "/inread",
            "resolutions" : [[1, 1], "fluid"]
        },
        "mapping" : [
            {
                "resolution" : [1280, 0],
                "dimensions" : [[1, 1], "fluid"]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    }/*,
    "pubnews1" : {
        "slot" : {
            "locationid" : "div-gpt-ad-native-0",
            "pubid" : "/native",
            "resolutions" : [[1, 1], "fluid"]
        },
        "mapping" : [
            {
                "resolution" : [1280, 0],
                "dimensions" : [[1, 1], "fluid"]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    },
    "pubnews2" : {
        "slot" : {
            "locationid" : "div-gpt-ad-native2-0",
            "pubid" : "/native2",
            "resolutions" : [[1, 1], "fluid"]
        },
        "mapping" : [
            {
                "resolution" : [1280, 0],
                "dimensions" : [[1, 1], "fluid"]
            },
            {
                "resolution" : [0, 0],
                "dimensions" : []
            }
        ]
    }*/
};

//_pubsoc_dfp_allowed_sections = [ 
//    _pubsoc_section_identite 
//];

function dfp_authorized() {

    if (!_pubsoc_dfp_active) {
        return(false);
    }
    
    if (document.URL.indexOf("paiement.societe.com") != -1) {
        return(false);  
    }

    if (!(is_societe() || is_dirigeant())) {
        return(false);
    }

    if (typeof(nopub) == "number" && nopub == 1) {
        return(false);
    }

    return(true);

    //var _pathname = _pubsoc_get_pathname();
    //var _section = _pubsoc_get_section(_pathname);
    //for (var i = 0, ii = _pubsoc_dfp_allowed_sections.length; i < ii; i++) {
    //    if (_pubsoc_dfp_allowed_sections[i] == _section) {
    //      return(true);
    //    }
    //}
}

/*
 * Fonction "pubsoc"
 * Paramètres :
 *  - plc, obligatoire : emplacement, parmi les emplacements disponibles dans "_pubsoc_plcs"
 * Description: Affichage de la pub
 */
function pubsoc() {

    var _script;
    var soccokkiesafemode = "";

    /* si cookie pub refuse ou n'existe pas -> pub alternative */
    if (!_pubsoc_allowed(arguments)) {
        //if (arguments[0]) {
        //    _preventDFP[arguments[0]] = true;
        //}
        return;
    }

//    if (require_pub_alternative(arguments) 
//            || (arguments.length == 2 && arguments[1] == "coal")) {
    if (require_pub_alternative(arguments[0])) { 
        pubsoc_coalesce(arguments[0]);
    } else if (dfp_authorized()) {
        if (_pubsoc_dfp[arguments[0]] != undefined) {
            pubsoc_dfp(arguments[0]);
        }
    } else if ((_script = _pubsoc_createScript(arguments)) !== null) {
        /* si script = partage via reseaux sociaux */
        if ( _script.indexOf("i.po.st") >= 0 ) {
            if (window && window.__cmp) {
                window.__cmp('getPublisherConsents', null, function(result) {
                    if (result && result.customPurposes && result.customPurposes["24"]) {
                        document.write(_script);
                    }
                });
            }

//            /* verifier cookie reseaux sociaux */
//            splitCookie("soccookiesociaux", "value");
//
//            /* si cookie sociaux refuse ou n'existe pas -> pas de btn de partage */
//            /*if ( !readCookie("soccookiesociaux") || valueCookie == "false" || !compareVersionCookie('soccookiesociaux') ) {*/
//            if ( readCookie("soccookiesociaux") && ( valueCookie == "false" || !compareVersionCookie('soccookiesociaux') ) ) {
//                return;
//            }          
        } else {
            document.write(_script);
        }
    }
}

/* Fonction permettant de déplacer les pubs au bon endroit */
var adnext_slots = ["pubbanner", "pubcarre", "pubcarre2", "pubsociaux"];

function GetDomOffset(Obj, Prop) { 
    var iVal = 0;
    while (Obj && Obj.tagName != 'BODY') {
        eval('iVal += Obj.' + Prop + ';');
        Obj = Obj.offsetParent;
    }
    return iVal;
}

function adnext_trackcleaner(container) {
    var adnext_container = document.getElementById(container);
    var adnext_imgElements = adnext_container.getElementsByTagName("img");
    for (var i=0; i<adnext_imgElements.length; i++) {
        if(adnext_imgElements[i].width == '1' && adnext_imgElements[i].height == '1') {
            adnext_imgElements[i].style.display = 'none';
        }
    }
}

function adnext_cssmove() {
    for(var j=0; j<adnext_slots.length; j++) {
        adslot_realid = adnext_slots[j] + '_media';
        if(document.getElementById(adnext_slots[j]) && document.getElementById(adslot_realid)) {
            adnext_trackcleaner(adslot_realid);
            document.getElementById(adslot_realid).style.position = 'absolute';
            document.getElementById(adnext_slots[j]).style.width = document.getElementById(adslot_realid).offsetWidth + 'px';
            document.getElementById(adnext_slots[j]).style.height = document.getElementById(adslot_realid).offsetHeight + 30 +'px';
            document.getElementById(adslot_realid).style.left = GetDomOffset(document.getElementById(adnext_slots[j]), 'offsetLeft')+'px';
            document.getElementById(adslot_realid).style.top = GetDomOffset(document.getElementById(adnext_slots[j]), 'offsetTop') + 'px';
        }
    }
}

if (window.addEventListener){
    window.addEventListener('resize', adnext_cssmove, false);
    window.addEventListener('load', adnext_cssmove, false);
    window.addEventListener('click', adnext_cssmove, false);
} else if (window.attachEvent) {
    window.attachEvent('onresize', adnext_cssmove);
    window.attachEvent('onload', adnext_cssmove);
    window.attachEvent('onclick', adnext_cssmove);
}

function init_pubs() {
    var site = document.URL;

    if (site.indexOf("paiement.societe.com") != -1) {
        return;  
    }

    var pub = document.getElementById('pubcontainer');
    if (pub) {
        pub.style.visibility = "visible";
    }

    add_event(window, "resize", resize_pub);

   // move_block(document.getElementById('pubmobile_media'), document.getElementById('pubmobile'));
}

function resize_pub() {
    var pub = document.getElementById('pubcarre');
    var pub2 = document.getElementById('pubcarre2');
    
    if (!is_desktop_device()) {
        hide_obj(pub);
        hide_obj(pub2);
    } 
}



/* Anonyme Analytics */

function gana_query(query, link) {

    var req = null;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("application/json");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre browser ne supporte pas AJAX");
                }
            }
        }
    }

    if (req && query) {   
        req.open("POST", "/cgi-bin/gana", true);
        req.setRequestHeader("Content-type", "application/x-www-from-urlencode;");
       
        /* system info */
        if (screen) {
            query += "&sr=" + screen.width + "x" + screen.height;
            query += "&vp=" + screen.availWidth + "x" + screen.availHeight;
            query += "&sd=" + screen.pixelDepth + "-bits";
        }
        req.send(query); 

        req.onreadystatechange = function() {
            if (this.readyState == 4) {

                if (link) {
                    window.location = link;
                }
            }
        }
    }
}



function gana_ecommerce(id, affiliation, revenue, shipping, tax) {
    var query = "t=ecommerce";

    if (!id) {
        return (true);
    }

    query += "&ti=" + id;

    if (affiliation) {
        query += "&ta=" + affiliation;
    }

    if (revenue) {
        query += "&tr=" + revenue;
    }

    if (shipping) {
        query += "&ts=" + shipping;
    }

    if (tax) {
        query += "&tt=" + tax;
    }

    gana_query(query);

    return (true);
}



function gana_item(id, name, sku, category, price, quantity) {
    var query = "t=item";

    if (!id || !name) {
        return (true);
    }

    query += "&ti=" + id;
    query += "&in=" + name;

    if (sku) {
        query += "&ic=" + sku; 
    }

    if (category) {
        query += "&iv=" + category
    }

    if (price) {
        query += "&ip=" + price;
    }

    if (quantity) {
        query += "&iq=" + quantity;
    }

    gana_query(query);

    return (true);
}



function gana_pageview(path, title) {
    var query = "t=pageview";
    var uri=""

    if (path) {
        uri = encodeURIComponent(path);
    } else {
        uri = encodeURIComponent(window.location);
    }
    query += "&dl=" + uri;

    if (title) {
        query += "&dt=" + encodeURIComponent(title); 
    } else {
        if (document.title) {
            query += "&dt=" + encodeURIComponent(document.title);
        }
    }

    gana_query(query);

    return (true);
}

function gana_event(link, cat, act, label, value, object) {

    var query = "t=event";

    if (!cat || !act) {
        return;
    }

    if (cat) {
        query += "&ec=" + cat;
    }

    if (act) {
        query += "&ea=" + act;
    }

    if (label) {
        query += "&el=" + label;
    }

    if (value) {
        query += "&ev=" + value;   
    }

    gana_query(query, link);

    return (true);
}


function init_gana(notrack) {
    
    if (notrack != 1) {
        add_event(window, "load", function() {gana_pageview();});
    }

    return (0);
}  


function isltIE9 () {
    return (document.all && !document.addEventListener);
}



function track_outbound(name, target) {
    
    if (target && target.href) {
        gana_event(target.href, name, 'click', target.href); 
    }
}

/* Fonction pour transformer le texte au format 'titre' */

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function move_in_array(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}

/* detecter Safari */
function is_safari() {
    if(navigator.userAgent.indexOf('Safari') != -1){
        return true;
    } else {
        return false;
    }
}

/* supprimer les doublons dans un tableau d'objets */
function remove_duplicates(array, prop) {
    var obj = {};
    for ( var i = 0, len = array.length; i < len; i++ ){
        if(!obj[array[i][prop]]) obj[array[i][prop]] = array[i];
    }
    var newArr = [];
    for ( var key in obj ) {
        newArr.push(obj[key]);
    }
    return newArr;
}

/* verifier si tous les inputs sont vides */
function is_form_empty(form) {
    var inputs = document.getElementById(form).elements,
        inputsNotHidden = [];

    /* on exclut la verification des inputs caches */
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].getAttribute('type') != 'hidden') {
            inputsNotHidden.push(inputs[i]);
        }
    }

    for(var j = 0; j < inputsNotHidden.length; j++) {
        if(inputsNotHidden[j].value.length != 0) {
            return false;
        }
        return true;
    }
}

/* verifier si l'input a le focus */
function has_focus(id) {
    if(document.activeElement.getAttribute('id') == id) {
        return true;
    } else {
        return false;
    }
}

/* creer une div au survol d'un element et afficher l'attribut title de celui-ci a l'interieur */
function create_hover_div(e, elem) {
    var hoverDiv = document.createElement('div'),
        left     = e.clientX  + "px";
        top      = e.clientY  + "px";

    hoverDiv.textContent = elem.getAttribute("title");
    hoverDiv.style.left  = left;
    hoverDiv.style.top   = top;

    hoverDiv.setAttribute("id", "hover-tooltip");

    add_class(hoverDiv, "HoverTip");

    document.getElementById('page').appendChild(hoverDiv);
}

/* supprimer la div creer au survol precedent */
function delete_hover_div(id) {
    var elem = document.getElementById(id);

    if(elem) {
        elem.remove();
    }
}

/* empecher fonction de se lancer de facon repetee - ex : sur event resize */
function debounce(func){
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
            timer = setTimeout(func,500,event);
    };
}

/* Creation d'un tag adsense : permet ciblage mobile uniquement si utilise avec is_phone_device */
function insert_adsense(s, a) {
    var anc, scr;


    if (!document.currentScript) { /* ie check */
        return;
    }

    if (typeof(a) != "object" || typeof(s) != "object") {
        return;
    }

    if (a.type) {
        anc = document.createElement(a.type);
    }

    if (a.class) {
        anc.setAttribute("class", a.class);
    }

    if (a.style) {
        anc.style = a.style;
    }
    
    if (a.dataset) {
        if (a.dataset.adFormat) {
            anc.dataset.adFormat = a.dataset.adFormat;
        }
        if (a.dataset.adClient) {
            anc.dataset.adClient = a.dataset.adClient;
        }
        if (a.dataset.fullWidthResponsive) {
            anc.dataset.fullWidthResponsive = a.dataset.fullWidthResponsive;
        }
        if (a.dataset.adLayoutKey) {
            anc.dataset.adLayoutKey = a.dataset.adLayoutKey;
        }
        if (a.dataset.adLayout) {
            anc.dataset.adLayout = a.dataset.adLayout;
        }
        if (a.dataset.adSlot) {
            anc.dataset.adSlot = a.dataset.adSlot;
        }
    }

    scr = document.createElement("SCRIPT");

    if (s.src) {
        scr.src = s.src;
    } else {
        return;
    }

    if (typeof(s.async) == "boolean") {
        scr.async = s.async;
    }

    document.body.appendChild(scr);
    document.currentScript.parentNode.append(anc);
}

function toggleAllCheckSimple(source) {
    var checkboxes = document.getElementsByClassName('checkbox');

    for(var checkbox in checkboxes) {
        checkboxes[checkbox].checked = source.checked;
    }
}

/********************************************************/
/************** POPUP MAINTENANCE SITE ****************/
/********************************************************/
/* fonction de maintenant si remplacement des href dans le html ne fonctionne pas */
function onmaintenance(element) {
    
    /* gestion popup maintenance */
    if ( typeof(maintenance) == "number" && maintenance == 1 ) {

        open_popup_maintenance();
    }
}

/* afficher popup maintenance site */
function detect_maintenance_site() {

    var test = false;

    /* faire une premiere passe sur les liens deja charge */
    /* remplacer les liens vers paiement */
    for ( var z = 0; z < document.links.length; z++) { 
        
        if ( document.links[z].href.indexOf("paiement") != -1 ) {

            document.links[z].href = "javascript:void(0);";
            document.links[z].setAttribute("onclick", "open_popup_maintenance();");
        }

        /* gerer les data-link  */
        if ( document.links[z].getAttribute("data-link") && document.links[z].getAttribute("data-link").indexOf("paiement") != -1 ) {

            document.links[z].setAttribute("onclick", "open_popup_maintenance();");
        }
    }

    /* desactiver la mise sous surveillance */
    if ( document.getElementById ("buttsurveiller") ) {

        var cta = document.getElementById("buttsurveiller");
        
        cta.setAttribute("id", "");
        cta.getElementsByTagName("a")[0].setAttribute("onclick", "open_popup_maintenance();");
    }

    /* au chargement du panier -> verif si changement dans panier pour modifier lien pointant vers page paiement */
    if ( document.getElementById('panierajout') ) {

        /* verif si modif panier */
        detect_modif_page("recbasket");
    }

    /* specificite page contact */
    if ( document.getElementById('contact') ) {

        /* verif si contenu page */
        detect_modif_page("contact");
    }

    /* boucler pdt le chargement de la page */
    var isFooter = setInterval(function() {

        /* verif si footer charge */
        if ( test == false ) {

            /* footer charge -> arret setInterval */
            if ( document.getElementById("footer") || document.getElementById("footer-compte") ) {

                test = true;
            }
            /* footer non charge -> execution boucle */
            else {

                /* remplacer les liens vers paiement */
                for ( var i = 0; i < document.links.length; i++) { 
                    
                    if ( document.links[i].href.indexOf("paiement") != -1 ) {

                        document.links[i].href = "javascript:void(0);";
                        document.links[i].setAttribute("onclick", "open_popup_maintenance();");
                    }

                    /* gerer les data-link  */
                    if ( document.links[i].getAttribute("data-link") && document.links[i].getAttribute("data-link").indexOf("paiement") != -1 ) {

                        document.links[i].setAttribute("onclick", "open_popup_maintenance();");
                    }
                }

                /* desactiver la mise sous surveillance */
                if ( document.getElementById ("buttsurveiller") ) {

                    var cta = document.getElementById("buttsurveiller");
                    
                    cta.setAttribute("id", "");
                    cta.getElementsByTagName("a")[0].setAttribute("onclick", "open_popup_maintenance();");
                }

                /* au chargement du panier -> verif si changement dans panier pour modifier lien pointant vers page paiement */
                if ( document.getElementById('panierajout') ) {

                    /* verif si modif panier */
                    detect_modif_page("recbasket");
                }

                /* specificite page contact */
                if ( document.getElementById('contact') ) {

                    /* verif si contenu page */
                    detect_modif_page("contact");
                }
            }
        }
        /* arret fonction quand footer charge */
        else {

            clearInterval(isFooter);

            /* derniere verif des liens pointant vers paiement */
            setTimeout(function(){

                for ( var x = 0; x < document.links.length; x++) { 

                    if ( document.links[x].href.indexOf("paiement.societe.com") != -1 ) {

                        document.links[x].href = "javascript:void(0);";
                        document.links[x].setAttribute("onclick", "open_popup_maintenance();");
                    }

                    /* gerer les data-link  */
                    if ( document.links[x].getAttribute("data-link") && document.links[x].getAttribute("data-link").indexOf("paiement") != -1  ) {

                        document.links[x].setAttribute("onclick", "open_popup_maintenance();");
                    }
                }

                /* desactiver la mise sous surveillance */
                if ( document.getElementById ("buttsurveiller") ) {

                    var cta = document.getElementById("buttsurveiller");
                    
                    cta.setAttribute("id", "");
                    cta.getElementsByTagName("a")[0].setAttribute("onclick", "open_popup_maintenance();");
                }

                /* au chargement du panier -> verif si changement dans panier pour modifier lien pointant vers page paiement */
                if ( document.getElementById('panierajout') ) {

                    /* verif si modif panier */
                    detect_modif_page("recbasket");
                }

                /* specificite page contact */
                if ( document.getElementById('contact') ) {

                    /* verif si contenu page */
                    detect_modif_page("contact");
                }
            }, 50);
        }
    }, 50);
}

/* verif si changement dans panier pour modifier lien pointant vers page paiement */
function detect_modif_page(target) {

    /* Selectionne le noeud dont les mutations seront observees */
    var targetNode = document.getElementById(target);

    /* Options de l'observateur (modifs a observer) */
    var config = { 
        childList: true, /* si ajout ou suppression des elements enfants de la cible */
        subtree: true /* si les descendants du nœud vise sont egalement a observer */
    };

    var observeDOM = (function(){ 

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function(obj, callback){ 

            if ( MutationObserver ){ 

                /* definir observer */ 
                var obs = new MutationObserver(function(mutations, observer){ 

                    if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ) 

                        callback(); 
                    }); 

                    /* ecouter modifs */
                    obs.observe( obj, config);
            } else if ( eventListenerSupported ) {

                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            } 
        }
    })();

    /* observer la cible */
    observeDOM( targetNode ,function(){

        var links = document.getElementById(target).getElementsByTagName("a");

        /* remplacer le lien vers paiement dans le panier */
        for ( var i = 0; i < links.length; i++ ) { 

            if ( links[i].getAttribute("href").indexOf("paiement") != -1 ) {

                links[i].setAttribute("href", "javascript:void(0);");
                links[i].setAttribute("onclick", "open_popup_maintenance();");
            }
        }
    });
}

/* ouverture de la popup de maintenance*/
function open_popup_maintenance() {

    /* sur IE 11 -> alert */
    var classBody = document.body,
        classBody = classBody.getAttribute("class");

    if ( classBody && classBody.indexOf("nav-ie11") != -1 ) {

        var content  = "MAINTENANCE EN COURS :";
            content += "\n";
            content += "Dans le cadre de l'am\u00E9lioration continue de nos services et de la mise en place de nouvelles normes de s\u00E9curit\u00E9, Societe.com proc\u00E8de en ce moment \u00E0 une maintenance. Le reste du site Societe.com reste accessible.";
            content += "\n";
            content += "Le retour \u00E0 la normale est pr\u00E9vu pour le d\u00E9but d'apr\u00E8s-midi. Nous vous prions de nous excuser pour ce d\u00E9sagr\u00E9ment.Si vous avez la moindre question, vous pouvez nous joindre sur info@pro.societe.com.";

        alert(content);
    } else {

        /* si id "popup" existe pas -> ouvrir popup maintenance */
        if ( document.getElementById("popup") ) {

            open_popup('popup_maintenance_site');
        }
        /* si id "popup" n'existe pas -> le creer */
        else {

            /* cas de la popup de surveillance -> s'ouvre en dehors de la div id "popup" */
            var surveillance = document.getElementById("popup_surveillance_societe");

            if ( surveillance && surveillance.getAttribute("class").indexOf("isHidden") == -1 ) {

                closeSurveillance();
            }

            var newPopup = document.createElement("div");
                newPopup.setAttribute("id", "popup");
                newPopup.setAttribute("class", "Popup isHidden");

            document.body.prepend(newPopup);

            open_popup('popup_maintenance_site');

            detect_maintenance_site();
        }
    }
}

function detect_request() {

    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;

    // here "this" points to the XMLHttpRequest Object.
    var newSend = function(vData) { 

        this.addEventListener("progress", function(){

            if ( this.responseURL.indexOf("paiement.societe.com") != -1 ) {

                this.abort();
                open_popup_maintenance();
            }
        }, false);

        XMLHttpRequest.prototype.send = newSend;
    }
}
