/* ======================================= Aboutementu tel + tva ================================= */

function asyncOpenAboutementTel() {
    
    /* gestion popup maintenance */
    if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
        close_popup();
    }

    /* ne pas ouvrir si popup surveillance ouverte*/
    if ( !is_class_exist(document.getElementById("popup_surveillance_societe"), "isHidden") ) {
        return;
    }

    var id      = document.getElementById('identitetel');
    var idinfos = document.getElementById('popup_aboutementtel');

    //add_class(id, "identitebuttinactive");
    //remove_class(id, "identitebutt");

    //remove_class(idinfos, "isHidden");
    add_class(idinfos, "isVisible");

    /* positionnement bloc aboutement */
    position_aboutement_tel(idinfos, "open");
}

function asyncCloseAboutementTel() {

    var idlink  = document.getElementById('identitetel');
    var idinfos = document.getElementById('popup_aboutementtel');
    
    //remove_class(idlink, "identitebuttinactive");
    //add_class(idlink, "identitebutt");

    //add_class(idinfos, "isHidden");
    remove_class(idinfos, "isVisible");

    /* positionnement bloc aboutement */
    position_aboutement_tel(idinfos, "close");
}

/* positionnement du bloc aboutement */
function position_aboutement_tel(bloc, status) {

    /* ouverture aboutement */
    if ( status && status == "open") {

        var cta   = document.getElementById("identitetel");
        var picto = cta.getElementsByTagName("i")[0];

        /* calcul position en mobile */
        if ( window.innerWidth < 1000 ) {

            /* aboutement en position normale */
            remove_class(bloc, "isFixed");

            /* top du bloc */
            if ( window.innerWidth < 600 ) {

                var topBloc = cta.offsetTop;
            } else {

                var topBloc = cta.offsetTop - 1;
            }

            /* left du bloc */
            var leftBloc = cta.offsetLeft - 20;
            var positionBloc = document.getElementById("identitelien").offsetLeft;
            var positionTel = document.getElementById("identitetel").offsetLeft;

            /* largeur du bloc */
            if ( window.innerWidth < 600 ) {

                var widthBloc = window.innerWidth - leftBloc - 16; /* largeur fenetre - positionnement du cta */
            } else if ( window.innerWidth < 768 ) {

                var widthBloc = window.innerWidth - positionBloc - 11; /* largeur fenetre - positionnement du cta */
            } else {

                var widthBloc = window.innerWidth - positionBloc - positionTel + 4; /* largeur fenetre - positionnement du cta */
            }
        }
        /* calcul position en desktop */
        else {

            /* si aboutement dans identite fixe */
            if ( !is_class_exist(document.getElementById("identite_fiche_floatable"), "isFixed") || window.innerWidth < 1000 ) {

                /* aboutement en position normale */
                remove_class(bloc, "isFixed");

                /* top du bloc */
                if ( window.innerWidth < 1060 ) {

                    var topBloc = cta.offsetTop - 1;
                } else {

                    var topBloc = cta.offsetTop;
                }
                var leftBloc = cta.offsetLeft - 20;

                /* largeur du bloc */
                var widthIdentite = document.getElementById('identitelien').offsetWidth;
                    widthBloc     = widthIdentite - leftBloc;
            }
            /* si aboutement dans identite au scroll */
            else if ( is_class_exist(document.getElementById("identite_fiche_floatable"), "isFixed") && window.innerWidth >= 1000 ) {

                /* aboutement en position fixed */
                add_class(bloc, "isFixed");

                /* top du bloc */
                var topBloc = (cta.offsetTop - 15) + document.getElementById("header_fiche_floatable").offsetHeight;

                /* si bandeau covid */
                /*if ( !is_class_exist(document.getElementById("covid_banner"), "hide" ) ) {

                    topBloc = topBloc + 72;
                }*/
                
                /* left du bloc */
                if ( window.innerWidth < 1050 ) {

                    var leftBloc  = (picto.offsetLeft - 18);
                } else {

                    var windowWidth  = window.innerWidth,
                        detailsWidth = document.getElementById("adressDetail").offsetWidth,
                        floatable    = document.getElementById("identite_fiche_floatable"),
                        companyWidth = floatable.getElementsByClassName("FicheIdentiteFloatable__Company")[0].offsetWidth,
                        ctaWidth     = document.getElementById("bloc_fiche_cta").offsetWidth,
                        marginAuto   = ( windowWidth - detailsWidth - companyWidth - ctaWidth ) / 2,
                        marginAuto   = Math.round(marginAuto),
                        leftBloc     = windowWidth - marginAuto - ctaWidth + 11;

                    /* ajustement positionnement sur IE 11 */
                    var documentBody = document.body;
                    if ( is_class_exist(documentBody, 'nav-ie11') ) {
                        leftBloc = leftBloc - 8;
                    }
                }

                /* largeur du bloc */
                var widthBloc = 309;
            }
        }

        /* attribution largeur du bloc */
        bloc.style.width = widthBloc + "px";

        /* attribution top du bloc */
        bloc.style.top = topBloc + "px";

        /* attribution left du bloc */
        bloc.style.left = leftBloc + "px";

    }
    /* fermeture aboutement */
    else if ( status && status == "close" ) {

        bloc.style.width = "";

        setTimeout(function(){

            bloc.style.top  = "";
            bloc.style.left = "";
        }, 500);
    }
    /* modif positionnement suite fermeture banner covid */
    /*else if ( status && status == "close-covid" ) {

        var topBlocStart = bloc.style.top;
            topBlocStart = topBlocStart.substring(0, (topBlocStart.length - 2) );
            newTopBloc   = topBlocStart - 72;
            newTopBloc   = newTopBloc + "px";
            topBlocStart = topBlocStart + "px";

        if ( is_class_exist(bloc, "isFixed") ) {
            var durationBloc = 100;
        } else {
            var durationBloc = 400;
        }

        // animate non supportee par IE 11
        var documentBody = document.body;
        if ( !is_class_exist(documentBody, 'nav-ie11') ) {

            bloc.animate([
                // keyframes
                { top: topBlocStart }, 
                { top: newTopBloc }
            ], { 
                // timing options
                duration: durationBloc,
                easing: "ease-in-out"
            });
        }
        
        bloc.style.top = newTopBloc;
    }*/

    /* fermeture au resize */
    add_event(window, "resize", function() {

        if ( is_class_exist(bloc, "isVisible") ) {

            asyncCloseAboutementTel();
        }
    });

    /* repositionnement au scroll */
    add_event(window, "scroll", function() {

        /* seulement si aboutement visible */
        if ( is_class_exist(bloc, "isVisible") && window.innerWidth >= 1000 ) {

            /* si identite au scroll visible */
            if ( is_class_exist(document.getElementById("identite_fiche_floatable"), "isFixed") ) {

                /* si aboutement ouvert dans identite fixe */
                if ( !is_class_exist(bloc, "isFixed") ) {

                    /* fermer aboutement */
                    remove_class(document.getElementById("popup_aboutementtel"), "isVisible");
                    document.getElementById("popup_aboutementtel").style.width = "";

                    /* positionner l'aboutement */
                    add_class(bloc, "isFixed");
                }
            }
            /* si identite fixe visible */
            else {

                /* si aboutement ouvert dans identite au scroll */
                if ( is_class_exist(bloc, "isFixed") ) {

                    /* fermer aboutement */
                    remove_class(document.getElementById("popup_aboutementtel"), "isVisible");
                    document.getElementById("popup_aboutementtel").style.width = "";

                    /* positionner l'aboutement */
                    remove_class(bloc, "isFixed");
                }
            }
        }
    });
}

/**
 * function getXhr()
 *
 * Retourne un objet pour l'envoi et la reception de donnees de fa&ccedil;on asynchrone.
 */

function desactive_number(obj) {

    var telab         = document.getElementById('telab');
    var price_details = document.getElementById('price_details');
    var popup         = document.getElementById("popup");

    if (obj && obj.timeout != undefined) {
        clearTimeout(obj.timeout);
        obj.timeout = undefined;
    }

    if (telab) {
        add_class(telab, "isHidden");
        add_class(price_details, "isHidden");
    }

    asyncCloseAboutementTel();
}

function desactive_numberDashboard(obj) {

    var telab = document.getElementById('telab-' + stockIdSocietyAboutement);
    var price_details  = document.getElementById('price_details-' + stockIdSocietyAboutement);

    if (obj && obj.timeout != undefined) {
        clearTimeout(obj.timeout);
        obj.timeout = undefined;
    }

    if (telab) {
        add_class(telab, "isHidden");
        add_class(price_details, "isHidden");
    }

    /* cacher le numero de tel */
    closeAboutementTelDashboard(stockIdSocietyAboutement, "desktop");

    /* reinitialiser le stockage de l'id de la societe affichee */
    stockIdSocietyAboutement = "";
}

function desactive_numberDashboardMobile(obj) {

    var telab = document.getElementById('telab-mobile-' + stockIdSocietyAboutement);
    var price_details  = document.getElementById('price_details-mobile-' + stockIdSocietyAboutement);

    if (obj && obj.timeout != undefined) {
        clearTimeout(obj.timeout);
        obj.timeout = undefined;
    }

    if (telab) {
        add_class(telab, "isHidden");
        add_class(price_details, "isHidden");
    }

    /* cacher le numero de tel */
    closeAboutementTelDashboard(stockIdSocietyAboutement, "mobile");

    /* reinitialiser le stockage de l'id de la societe affichee */
    stockIdSocietyAboutement = "";
}

function desactive_number_rensjur(obj) {
    var telab = document.getElementById('telab-rensjur');
    var price_details  = document.getElementById('price_details-rensjur');
    var aboutement = document.getElementById('aboutement-rensjur');
    var link = document.getElementById('identiteatel-rensjur');

    if (obj && obj.timeout != undefined) {
        clearTimeout(obj.timeout);
        obj.timeout = undefined;
    }

    if (telab) {
        add_class(telab, "isHidden");
        add_class(price_details, "isHidden");
    }

    add_class(aboutement, "isHidden");
    remove_class(link, "isHidden");

//    asyncCloseAboutementTel();
}

/* specification parametres gana_event aboutement tel de la fiche et du dashboard */
function gana_event_aboutement_tel(compteplus) {

    var dashboard = document.getElementById("dashboard-list-todo");
    var fiche     = document.getElementById("identite");

    if ( dashboard ) {
        gana_event(null, 'clicks', 'Clicks Tel');
        gana_event(null, 'Dashboard', 'Resume', 'Clicks Tel');
    }
    else if ( fiche ) {

        /* si abonne a compte plus */
        if ( compteplus && compteplus == "compteplus") {
            gana_event(null, 'clicks', 'Clicks Tel gratuit');
            gana_event(null, 'SocietePlus', 'Aboutement', 'Tel');
        }
        /* si non abonne a compte plus */
        else {
            gana_event(null, 'clicks', 'Clicks Tel');
            gana_event(null, 'Fiche_entreprise', 'Onglet-identite', 'Clicks TVA aboutement');
        }
    }
}

/* specification parametres gana_event aboutement TVA de la fiche et du dashboard */
function gana_event_aboutement_tva(element) {

    var dashboard = document.getElementById("dashboard-list-todo");
    var fiche     = document.getElementById("identite");

    if ( dashboard ) {
        gana_event(null, 'clicks', 'Clicks TVA aboutement');
        gana_event(null, 'Dashboard', 'Resume', 'Clicks TVA aboutement');
    }
    else if ( fiche ) {

        /* si abonne a compte plus */
        if ( element && element == "aboutement-tva-free-click") {
            gana_event(null, 'clicks', 'Clicks TVA aboutement gratuit');
            //gana_event(null, 'Fiche_entreprise', 'Onglet-identite', 'Clicks TVA aboutement gratuit');
            gana_event(null, 'SocietePlus', 'Aboutement', 'TVA');
        }
        /* si non abonne a compte plus */
        else {
            gana_event(null, 'clicks', 'Clicks TVA aboutement');
            gana_event(null, 'Fiche_entreprise', 'Onglet-identite', 'Clicks TVA aboutement');
        }
    }
}

//function desactive_tva_number() {
function hideNumberTVA() {

    var tvainfos = document.getElementById('aboutement-tva-informations');
    var tvaaffiliationmobile = document.getElementById('aboutement-tva-affiliation-mobile');
    var tvaaffiliationdesktop = document.getElementById('aboutement-tva-affiliation-desktop');
    var tvaclick = document.getElementById('aboutement-tva-click');
    var tvatexte = document.getElementById('aboutement-tva-texte');
    var tvanumeroinfo = document.getElementById('aboutement-tva-numero-info');
    var tvanumero = document.getElementById('aboutement-tva-numero');
    var tvatarif = document.getElementById('aboutement-tva-tarif');
    //    var tvacontact = document.getElementById('aboutement-tva-contact');
    var tvaerreur = document.getElementById('aboutement-tva-erreur');

    add_class(tvaerreur, "isHidden");
    remove_class(tvaclick, "isHidden");
    add_class(tvatexte, "isHidden");
    add_class(tvanumeroinfo, "isHidden");
    add_class(tvanumero, "isHidden");
//    add_class(tvatarif, "isHidden");
    tvatarif.style.display = "none";
//    add_class(tvacontact, "isHidden");
    add_class(tvainfos, "isHidden");
    add_class(tvaaffiliationmobile, "isHidden");
    add_class(tvaaffiliationdesktop, "isHidden");

    gana_event('Aboutement TVA', 'non dispo / err');
}


tvaXhr = getXhr();


function tvaWrapper() {
    this.xhr = tvaXhr;

    this.onload = function() {
        var tvainfos = document.getElementById('aboutement-tva-informations');
        var tvaclick = document.getElementById('aboutement-tva-click');
        var tvatexte = document.getElementById('aboutement-tva-texte');
        var tvanumeroinfo = document.getElementById('aboutement-tva-numero-info');
        var tvanumero = document.getElementById('aboutement-tva-numero');
        var tvatarif = document.getElementById('aboutement-tva-tarif');
//        var tvacontact = document.getElementById('aboutement-tva-contact');
        var tvaerreur = document.getElementById('aboutement-tva-erreur');

        add_class(tvanumeroinfo, "aboutement-ctr");
        add_class(tvanumeroinfo, "aboutement-majore");
        remove_class(tvanumeroinfo, "aboutement-no");

        try {
            var response = JSON.parse(this.responseText);
        } catch (e) {
            this.onerror();
            return;
        }

        if (typeof(response.numtel) != "undefined") {
            var phone = [
                response.numtel.slice(0,2), " ",
                response.numtel.slice(2,4), " ",
                response.numtel.slice(4,6), " ",
                response.numtel.slice(6,8), " ",
                response.numtel.slice(8,10)
                ].join('');
//            remove_class(tvatarif, "isHidden");
            tvatarif.style.display = "block";
            remove_class(tvatexte, "isHidden");
//            remove_class(tvacontact, "isHidden");
            tvanumero.innerHTML = phone;
            gana_event(null, 'Aboutement TVA', 'payant : ' + response.numtel);
        } else if (typeof(response.numtva) != "undefined") {
//            add_class(tvatarif, "isHidden");
            tvatarif.style.display = "none";
            add_class(tvatexte, "isHidden");
//            add_class(tvacontact, "isHidden");
            remove_class(tvanumeroinfo, "aboutement-ctr");
            remove_class(tvanumeroinfo, "aboutement-majore");
            add_class(tvanumeroinfo, "aboutement-no");
            tvanumero.innerHTML = response.numtva;
            gana_event(null, 'Aboutement TVA', 'gratuit');
        } else {
            this.onerror();
            return;
        }

        add_class(tvaerreur, "isHidden");
        remove_class(tvanumeroinfo, "isHidden");
        remove_class(tvanumero, "isHidden");
        remove_class(tvainfos, "isHidden");
        add_class(tvaclick, "isHidden");
    }

    this.onerror = function() {
        var tvainfos = document.getElementById('aboutement-tva-informations');
        var tvaclick = document.getElementById('aboutement-tva-click');
        var tvatexte = document.getElementById('aboutement-tva-texte');
        var tvanumeroinfo = document.getElementById('aboutement-tva-numero-info');
        var tvanumero = document.getElementById('aboutement-tva-numero');
        var tvatarif = document.getElementById('aboutement-tva-tarif');
//        var tvacontact = document.getElementById('aboutement-tva-contact');
        var tvaerreur = document.getElementById('aboutement-tva-erreur');

        remove_class(tvanumeroinfo, "aboutement-ctr");
        remove_class(tvanumeroinfo, "aboutement-majore");
        add_class(tvanumeroinfo, "aboutement-no");
        remove_class(tvaerreur, "isHidden");
        add_class(tvatexte, "isHidden");
        add_class(tvanumeroinfo, "isHidden");
        add_class(tvanumero, "isHidden");
//        add_class(tvatarif, "isHidden");
        tvatarif.style.display = "none";
//        add_class(tvacontact, "isHidden");
        remove_class(tvainfos, "isHidden");
        add_class(tvaclick, "isHidden");
    }

    this.send = function(siren) {
        if (this.xhr == null) {
            this.onerror();
        }
        this.xhr.open("GET", "/cgi-bin/aboutement-tva?siren=" + siren, true);
        this.xhr.socXhrWrapper = this;
        this.xhr.onload = this.onload;
        this.xhr.onerror = this.onerror;
        this.xhr.setRequestHeader("Cache-Control", "max-age=0, no-store, no-cache, must-revalidate");
        this.xhr.setRequestHeader("Pragma", "no-cache");
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
        this.xhr.send();
        return "Request processing...";
    }
}

abttvaXhrWrapper = new tvaWrapper();

function clickAboutementTVA(siren) {

    /* afficher numero tel pour TVA */
    abttvaXhrWrapper.send(siren);

    /* afficher affiliation compte plus */
    affiliation_compteplus("countTVA");
}

function clickAboutementTVAFree() {

    var hide = document.getElementById("aboutement-tva-free-click");
    var show = document.getElementById("aboutement-tva-free-informations");

    add_class(hide, "isHidden");
    remove_class(show, "isHidden");
}

function affiliation_compteplus(cookie) {

    var date = Date.now();
    
    /* cookie n'existe pas -> le creer */
    if ( readCookie(cookie) == null ) {

        var expire = date + 86400000;

        /* creer le cookie */
        var value = "1/" + expire;
        createCookie(cookie,value);
    }
    /* cookie existe */
    else {

        var valueCookie = readCookie(cookie);
        var valueCookie = valueCookie.split("/");

        /* valeur cookie non conforme */
        if ( isNaN(valueCookie[0]) || isNaN(valueCookie[1]) ) {

            /* modifier le cookie */
            var expire = date + 86400000;

            var value = "1/" + expire;
            createCookie(cookie,value);
        }
        /* valeur cookie conforme */
        else {

            /* si cookie expire */
            if ( valueCookie[1] < date ) {

                /* modifier le cookie */
                var expire = date + 86400000;

                var value = "1/" + expire;
                createCookie(cookie,value);
            }
            /* si cookie en cours */
            else {

                /* comptabiliser les clicks */
                var countClick = parseInt(valueCookie[0]) + 1;
                var copyExpire = valueCookie[1];

                createCookie(cookie,countClick + "/" + copyExpire);

                /* aux multiples de 3 click -> afficher affiliation */
                switch(cookie) {
                    case "countTVA" :
                        var affiliationMobile  = document.getElementById("aboutement-tva-affiliation-mobile");
                        var affiliationDesktop = document.getElementById("aboutement-tva-affiliation-desktop");
                        break;
                    case "countAboutementTel" :
                        var affiliationMobile  = document.getElementById("aboutement-tel-affiliation-mobile");
                        var affiliationDesktop = document.getElementById("aboutement-tel-affiliation-desktop");
                        break;
                }
                

                if ( countClick%3 == 0 ) {

                    remove_class(affiliationMobile, "isHidden");
                    remove_class(affiliationDesktop, "isHidden");
                } else {

                    add_class(affiliationMobile, "isHidden");
                    add_class(affiliationDesktop, "isHidden");
                }
            }
        }
    }
}

abttXhr = getXhr();

function SocXhrWrapper() {

    this.xhr = abttXhr;
    this.timeout = undefined;
    this.test = 1;

    this.responseHandler = function(e) {
        if(this.readyState != 4 || typeof(this.responseXML) == "string") {
            return;
        }

        var tmp;
        try {
            tmp = eval('('+this.responseText+')');
        } catch(e) {
            return;
        } // Case CGI is unavailable : responseText is HTML and evaluating it will throw an exception

//        var telazurdetails = document.getElementById('priceazurdetails');
        var pricedetails = document.getElementById("price_details");
        var pricenodetails = document.getElementById("pricenodetails");
        var telab = document.getElementById("telab");
        var telabnum = document.getElementById("telab-num");
        var telabinfo = document.getElementById("telab-info");

        remove_class(telab, "aboutement-banalise");
        add_class(telab, "aboutement-majore");
        add_class(telab, "aboutement-ctr");
        remove_class(telabnum, "lightorange");
        add_class(telabinfo, "isHidden");
        add_class(pricenodetails, "isHidden");
        remove_class(telab, "isHidden");

        asyncOpenAboutementTel();

        if((typeof(tmp.err) != 'boolean') || (tmp.err == true) || (typeof(tmp.telephone) != 'string') || (tmp.telephone.length < 10) || (tmp.telephone.length > 15) || (typeof(tmp.payant) != 'boolean')) {
 //           add_class(telazurdetails, "isHidden");
            add_class(pricedetails, "isHidden");
            telab.innerHTML = "Pas de numéro disponible";
            if ((typeof(tmp.err) == 'boolean') && (tmp.err == true)) {
                gana_event(null, 'Aboutement annuaire', 'non dispo / err');
            }
            return;
        }

        telabnum.innerHTML = "" + tmp.telephone;
        if(tmp.payant == false) {
            gana_event(null, 'Aboutement annuaire', 'gratuit');
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(pricedetails, "isHidden");
            } else {

                if ( (typeof(tmp.gratuit) == 'boolean') && (tmp.gratuit == true) ) {

                    add_class(telab, "aboutement-banalise");
                    remove_class(telab, "aboutement-majore");
                    add_class(pricedetails, "isHidden");
                } else {

                    remove_class(pricenodetails, "isHidden");
                    add_class(telabinfo, "isHidden");
                    remove_class(telab, "aboutement-ctr");
                    remove_class(telab, "aboutement-banalise");
                    remove_class(telab, "aboutement-majore");
                    add_class(telabnum, "lightorange");
                }                
            }
            add_class(pricedetails, "isHidden");
        } else {
            gana_event(null, 'Aboutement annuaire', 'payant : ' + tmp.telephone);
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(pricedetails, "isHidden");
            } else {
//                add_class(telazurdetails, "isHidden");
                remove_class(pricedetails, "isHidden");
            }
        }

        if (is_phone_device() == true) {
            window.location = 'tel:' + tmp.telephone;
        }
        adnext_cssmove();
    }

    this.url = 0;

    this.setUrl = function(urlToCgi) {
        if(typeof(urlToCgi) != "string") {
            return;
        }

        this.url = urlToCgi;
    }

    this.send = function(siret, nrlead) {
        if((this.xhr.readyState == this.xhr.OPENED) // 1
            || (this.xhr.readyState == this.xhr.HEADERS_RECEIVED) // 2
            || (this.xhr.readyState == this.xhr.LOADING)) { // 3
            return("XHR already in use");
        }

        if(typeof(this.url) != "string") {
            return "URL not set";
        }

        if(typeof(siret) != "string") {
            return "Argument siren is required and must be a string of caracters";
        }

        if (this.timeout != undefined) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
//        this.timeout = setTimeout( 'desactive_number();', 100000);
        this.timeout = setTimeout( 'bar.manageclick("identitetel");', 100000);

        if (nrlead) {
            this.xhr.open("GET", this.url + "?siret=" + siret + "&nrlead=" + nrlead, true);
        } else {
            this.xhr.open("GET", this.url+"?siret=" + siret, true);
        }
        this.xhr.socXhrWrapper = this;
        this.xhr.onreadystatechange = this.responseHandler;
        this.xhr.setRequestHeader("Cache-Control", "max-age=0, no-store, no-cache, must- revalidate");
        this.xhr.setRequestHeader("Pragma", "no-cache");
        this.xhr.send();
        return "Request processing...";
    }
}

function SocXhrWrapperDashboard(id, context) {

    this.xhr = abttXhr;
    this.timeout = undefined;
    this.test = 1;

    this.responseHandler = function(e) {
        if(this.readyState != 4 || typeof(this.responseXML) == "string") {
            return;
        }

        var tmp;
        try {
            tmp = eval('('+this.responseText+')');
        } catch(e) {
            return;
        } // Case CGI is unavailable : responseText is HTML and evaluating it will throw an exception

//        var telazurdetails = document.getElementById('priceazurdetails');
        if ( context && context == "desktop" ) {

            var pricedetails   = document.getElementById("price_details-" + id);
            var pricenodetails = document.getElementById("pricenodetails-" + id);
            var telab          = document.getElementById("telab-" + id);
            var telabnum       = document.getElementById("telab-num-" + id);
            var telabinfo      = document.getElementById("telab-info-" + id);
        }
        else if ( context && context == "mobile" ) {

            var pricedetails   = document.getElementById("price_details-mobile-" + id);
            var pricenodetails = document.getElementById("pricenodetails-mobile-" + id);
            var telab          = document.getElementById("telab-mobile-" + id);
            var telabnum       = document.getElementById("telab-num-mobile-" + id);
            var telabinfo      = document.getElementById("telab-info-mobile-" + id);
        }

        remove_class(telab, "aboutement-banalise");
        add_class(telab, "aboutement-majore");
        add_class(telab, "aboutement-ctr");
        remove_class(telabnum, "lightorange");
        add_class(telabinfo, "isHidden");
        add_class(pricenodetails, "isHidden");
        remove_class(telab, "isHidden");

        /* afficher le numero de tel */
        openAboutementTelDashboard(id, context);

        if((typeof(tmp.err) != 'boolean') || (tmp.err == true) || (typeof(tmp.telephone) != 'string') || (tmp.telephone.length < 10) || (tmp.telephone.length > 15) || (typeof(tmp.payant) != 'boolean')) {
 //           add_class(telazurdetails, "isHidden");
            add_class(pricedetails, "isHidden");
            telab.innerHTML = "Pas de numéro disponible";
            if ((typeof(tmp.err) == 'boolean') && (tmp.err == true)) {
                gana_event(null, 'Aboutement annuaire', 'non dispo / err');
            }
            return;
        }

        telabnum.innerHTML = "" + tmp.telephone;
        if(tmp.payant == false) {
            gana_event(null, 'Aboutement annuaire', 'gratuit');
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
            } else {
                remove_class(pricenodetails, "isHidden");
                add_class(telabinfo, "isHidden");
                remove_class(telab, "aboutement-ctr");
                remove_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(telabnum, "lightorange");
            }
            add_class(pricedetails, "isHidden");
        } else {
            gana_event(null, 'Aboutement annuaire', 'payant : ' + tmp.telephone);
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(pricedetails, "isHidden");
            } else {
//                add_class(telazurdetails, "isHidden");
                remove_class(pricedetails, "isHidden");
            }
        }

        if (is_phone_device() == true) {
            window.location = 'tel:' + tmp.telephone;
        }
        adnext_cssmove();
    }

    this.url = 0;

    this.setUrl = function(urlToCgi) {

        if(typeof(urlToCgi) != "string") {
            return;
        }

        this.url = urlToCgi;
    }

    this.send = function(siret, nrlead) {

        if((this.xhr.readyState == this.xhr.OPENED) // 1
            || (this.xhr.readyState == this.xhr.HEADERS_RECEIVED) // 2
            || (this.xhr.readyState == this.xhr.LOADING)) { // 3
            return("XHR already in use");
        }

        if(typeof(this.url) != "string") {
            return "URL not set";
        }

        if(typeof(siret) != "string") {
            return "Argument siren is required and must be a string of caracters";
        }

        if (this.timeout != undefined) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }

        /* desactiver et cacher le tel */
        stockIdSocietyAboutement = id;
        if ( context && context == "desktop" ) {

            this.timeout = setTimeout( 'desactive_numberDashboard();', 100000);
        }  else if ( context && context == "mobile" ) {

            this.timeout = setTimeout( 'desactive_numberDashboardMobile();', 100000);
        }
        

        if (nrlead) {
            this.xhr.open("GET", this.url + "?siret=" + siret + "&nrlead=" + nrlead, true);
        } else {
            this.xhr.open("GET", this.url+"?siret=" + siret, true);
        }
        this.xhr.socXhrWrapper = this;
        this.xhr.onreadystatechange = this.responseHandler;
        this.xhr.setRequestHeader("Cache-Control", "max-age=0, no-store, no-cache, must- revalidate");
        this.xhr.setRequestHeader("Pragma", "no-cache");
        this.xhr.send();
        return "Request processing...";
    }
}

function SocXhrWrapperRensjur() {
    this.xhr = abttXhr;
    this.timeout = undefined;
    this.test = 1;

    this.responseHandler = function(e) {
        if(this.readyState != 4 || typeof(this.responseXML) == "string") {
            return;
        }

        var tmp;
        try {
            tmp = eval('('+this.responseText+')');
        } catch(e) {
            return;
        } // Case CGI is unavailable : responseText is HTML and evaluating it will throw an exception

//        var telazurdetails = document.getElementById('priceazurdetails-rensjur');
        var pricedetails = document.getElementById("price_details-rensjur");
        var pricenodetails = document.getElementById("pricenodetails-rensjur");
        var telab = document.getElementById("telab-rensjur");
        var telabnum = document.getElementById("telab-rensjur-num");
        var telabinfo = document.getElementById("telab-rensjur-info");
        var aboutement = document.getElementById('aboutement-rensjur');
        var link = document.getElementById('identiteatel-rensjur');


        remove_class(telab, "aboutement-banalise");
        add_class(telab, "aboutement-majore");
        add_class(telab, "aboutement-ctr");
        remove_class(telabnum, "lightorange");
        add_class(telabinfo, "isHidden");
        add_class(pricenodetails, "isHidden");
        remove_class(telab, "isHidden");
        remove_class(aboutement, "isHidden");


        add_class(link, "isHidden");
//        asyncOpenAboutementTel();

        if((typeof(tmp.err) != 'boolean') || (tmp.err == true) || (typeof(tmp.telephone) != 'string') || (tmp.telephone.length < 10) || (tmp.telephone.length > 15) || (typeof(tmp.payant) != 'boolean')) {
//            add_class(telazurdetails, "isHidden");
            add_class(pricedetails, "isHidden");
            telab.innerHTML = "Pas de numéro disponible";
            if ((typeof(tmp.err) == 'boolean') && (tmp.err == true)) {
                gana_event(null, 'Aboutement annuaire', 'non dispo / err');
            }
            return;
        }

        telabnum.innerHTML = "" + tmp.telephone;
        if(tmp.payant == false) {
            gana_event(null, 'Aboutement annuaire', 'gratuit');
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
            } else {
                remove_class(pricenodetails, "isHidden");
                add_class(telabinfo, "isHidden");
                remove_class(telab, "aboutement-ctr");
                remove_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(telabnum, "lightorange");
            }
            add_class(pricedetails, "isHidden");
        } else {
            gana_event(null, 'Aboutement annuaire', 'payant : ' + tmp.telephone);
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(pricedetails, "isHidden");
            } else {
//                add_class(telazurdetails, "isHidden");
                remove_class(pricedetails, "isHidden");
            }
        }

        if (is_phone_device() == true) {
            window.location = 'tel:' + tmp.telephone;
        }
    }

    this.url = 0;

    this.setUrl = function(urlToCgi) {
        if(typeof(urlToCgi) != "string") {
            return;
        }

        this.url = urlToCgi;
    }

    this.send = function(siret, nrlead) {
        if((this.xhr.readyState == this.xhr.OPENED) // 1
            || (this.xhr.readyState == this.xhr.HEADERS_RECEIVED) // 2
            || (this.xhr.readyState == this.xhr.LOADING)) { // 3
            return("XHR already in use");
        }

        if(typeof(this.url) != "string") {
            return "URL not set";
        }

        if(typeof(siret) != "string") {
            return "Argument siret is required and must be a string of caracters";
        }

        if(typeof(nrlead) != "string") {
            return "Argument siret is required and must be a string of caracters";
        }

        if (this.timeout != undefined) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        this.timeout = setTimeout( 'desactive_number_rensjur();', 100000);

        this.xhr.open("GET", this.url + "?siret=" + siret + "&nrlead=" + nrlead, true);
        this.xhr.socXhrWrapper = this;
        this.xhr.onreadystatechange = this.responseHandler;
        this.xhr.setRequestHeader("Cache-Control", "max-age=0, no-store, no-cache, must- revalidate");
        this.xhr.setRequestHeader("Pragma", "no-cache");
        this.xhr.send();
        return "Request processing...";
    }
}

abttXhrWrapper = new SocXhrWrapper();
abttXhrWrapperRensjur = new SocXhrWrapperRensjur();

function closeAboutementOnglet() {

    /* si aboutement tel ouvert -> le fermer */
    if ( is_class_exist(document.getElementById("popup_aboutementtel"), 'isVisible') ) {

        desactive_number(abttXhrWrapper);
    } else {

        openAboutementOnglet()
    }

   //desactive_number(abttXhrWrapper);
}


function openAboutementOnglet() {

    abttXhrWrapper.setUrl('/cgi-bin/aboutement-tel');
    abttXhrWrapper.send(siretabt, nrleadabt);
}


function clickAboutementTel(siret, nrlead) {

    abttXhrWrapperRensjur.setUrl('/cgi-bin/aboutement-tel');
    abttXhrWrapperRensjur.send(siret, nrlead);

    /* afficher affiliation compte plus */
    affiliation_compteplus("countAboutementTel");
}function createScript(url, callback, anchor, async) {
    var a = anchor || document.getElementsByTagName("head")[0];
    var scpt = document.createElement('script');
    scpt.async = async || true;
    scpt.type = "text/javascript";
    scpt.dataset.callbackrun = "0";

    if (callback) {
        if (("load" in scpt) || ("onload" in scpt)) {
            add_event(scpt, "load", function() {
                if (this.dataset.callbackrun == "0") {
                    this.dataset.callbackrun = "1";
                    callback();
                }
            });
        } else {
            if (("readystatechange" in scpt) || ("onreadystatechange" in scpt)) {
                add_event(scpt, "readystatechange", function() {
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        if (this.dataset.callbackrun == "0") {
                            this.dataset.callbackrun = "1";
                            callback();
                        }
                    }
                });
            }
        }
    }
    scpt.src = url;
    a.appendChild(scpt);
} 

var Async = function(id, callback) {
    this.id = id;
    this.callback = callback;
    this.init = false;

    /* Fonction verifiant si l'id et la callback sont ok */
    this.ready = function() {
        if (typeof(this.callback) != "undefined" && document.getElementById(this.id)) {
            return (true);
        }

        return (false);
    }
}

var inits = new Array(
    new Async('documentbody', device_without_touch),
    /*new Async('header', position_modale_cookies),
    new Async('header', manage_cookies),*/
    new Async('input_search', init_search),
    new Async('input_search2', init_search_2),
    new Async('input_search3', init_search_3),
    new Async('actionnaire', init_actfil),
    new Async('actif', init_actif),
    new Async('fullfiche', init_full),
    new Async('cartographie', init_carto),
    new Async('avantages_carto_intro', init_avantages_carto),
    new Async('cartoshop', init_cartoshop),
    new Async('chiffre', init_chiffreclef),
    new Async('compteresultat', init_compteresultat),
    new Async('etat-financier', init_etatfinancier),
    new Async('passif', init_passif),
    new Async('menuentreprise_mobile', init_menuentreprise),
    //new Async('menuentreprise', init_scroll_navbar),
    //new Async('menu-tab-plus', extend_menu_tabs),
    new Async('menu-tab-plus-end', init_menu_tab),
    new Async('qrcodemobile', init_qrcode),
    new Async('synthese', init_synthese),
    new Async('AdvancedSearch', init_recherche),
    new Async('AdvancedSearchDir', init_recherche_dir),
    new Async('rensjur', init_rensjur),
    new Async('minifiche-tbl-rensjur', init_minifiche_rensjur),
    new Async('identite', init_resume),
    new Async('identite', init_resume_onglets),
    new Async('company_identity', init_identity_company),
    new Async('identite-etablissement', init_resume_etablissement),
    new Async('identite-etablissement', init_resume_onglets),
    new Async('actubloc', init_edition),
    //new Async('infos', init_minifiche),
    new Async('bilansociaux', init_sociaux),
    new Async('recbasketcontent', init_panierajout),
    new Async('container', init_addbasket),
    new Async('ie8warning', init_versionwarning),
    new Async('identitelien', init_client_informations),
    new Async('mandatdir', init_mandatdir),
    new Async('edito-summary', init_edito_summary),
    new Async('actu_fiche', get_actu_fiche),
    new Async('footer', open_footer_menu),
    new Async('panier-bar', observe_panierbar),
    new Async('formgeneric', form_placeholder),
    new Async('AdvancedSearch', searchtab_active),
    new Async('container_stats_ranking', init_stats),
    new Async('container_stats_quartile', init_stats),
    new Async('container_stats_parite', init_stats),
    new Async('contact-form', init_contact_form),
    new Async('client_infos_login', form_placeholder),
    new Async('dashboard_beginner', choose_banner_dashboard),
    new Async('active_token_help', active_token_help_display),
    new Async('footer', init_select_option_safari),
    new Async('footer-compte', init_select_option_safari),
    new Async('footer-compte', compte_app_init),
    new Async('dashboard-detail-content', sticky_sticker_dashboard),
    new Async('glossaire', smooth_effect),
    new Async('footer-compte', init_footer_carto),
    new Async('minifichecartodir', move_coldroite_dirigeant),
    new Async('avantages_carto_dirigeant', fiche_dirigeant_IE),
    new Async('menuentreprise_desktop', init_elements_fiche),
    new Async('actu-news-droite', actu_height),
    new Async('renseignement', height_historique_donnees),
    new Async('etablissement', height_historique_donnees),
    //new Async('covid_banner', set_covid_cookie),
    new Async('container', width_etabliste_IE),
    new Async('form_bilanservice', send_form_bilan_service),
    new Async('footer_avantage_plus', init_abonnement_plus),
    new Async('avantages_carto_intro', init_carto_plus),
    new Async('etab', cut_name_etab),
    new Async('contjurlist', init_cont_charts),
    new Async('footer', init_readMore_shop),
    new Async('result_search_end', init_result_search)
);

/* Permet d'ajouter a la volee si besoin des fonctions asynchrone */

function add_async(id, callback) {
    var async = new Async(id, callback);
    inits.push(async);
}
/* Completeload prend vrai si le document est complete */
var completeload = false;

/* On checke quand le document est pret */
add_event(document, "readystatechange", function(){
    if (document.readyState == "complete") {
        completeload = true;
    }
});

/* Fonction permettant l'initialisation si ok */
function async_init() {
    for (var i = 0; i < inits.length; i++) {
        if (!inits[i].init && inits[i].ready()) {
            inits[i].callback();
            inits[i].init = true;
        }
    }
}

/* Permettant ou non de rappeler l'init */
function async_loop() {
    async_init();

    if (!completeload) {
        setTimeout(async_loop, 20);
    } else {
        /* On fait un dernier check au cas où il y aura un init qui
         * ne soit pas encore passe */
        init_addbasket();
        async_init();
        init_pubs();
        adnext_cssmove();
    }
}

async_loop();

function init_versionwarning () {
    if (isltIE9()) {
        display('ie8warning');
    }
}

/**********************************************************/
/*********************** Vus async ************************/
/**********************************************************/

function async_views_callback(placeholder, req) {
    if (req.readyState == 4 && (req.status == 200 || req.status == 0)) {
        var html = document.createElement("div");
        html.innerHTML = req.responseText;

        var nodes = html.getElementsByTagName("TR");
        for (var i = 0, j = 0; i < nodes.length; i++) {
            if (!nodes[i].hasAttribute("data-prodcat")) {
                continue;
            }

            var newid = (prod.length + j++).toString();
            nodes[i].setAttribute("id", newid);
            nodes[i].setAttribute("data-prodnum", newid);

            var children = nodes[i].getElementsByClassName("event-add")[0].children;

            children[0].setAttribute("id", "pn"+newid);
            children[1].setAttribute("id", "ico-plus"+newid);
            children[2].setAttribute("id", "ico-check"+newid);
            children[3].setAttribute("id", "add"+newid);
            children[4].setAttribute("id", "check"+newid);
        }

        var scripts = html.getElementsByTagName("SCRIPT");
        for (var i = 0; i < scripts.length; i++) {
            var tmp = prod.slice();
            prod = [];
            eval(scripts[i].innerHTML);
            prod = tmp.concat(prod);
        }

        placeholder.parentNode.replaceChild(html, placeholder);

        if (scripts.lenght != 0) {
            syncpan();
        }
    }
}

function init_views_async(view, callback) {

    var placeholders = document.getElementsByClassName("placeholder");
    var rncs = document.getElementById("identite-siren").innerHTML;
        rncs = rncs.replaceAll("&nbsp;", "");

    for (var i = 0; i < placeholders.length; i++) {

        if (placeholders[i].getAttribute("called")) {
            continue;
        }

        if (placeholders[i].getAttribute("view") != view) {
            continue;
        }

        var query = "/cgi-bin/"
            + placeholders[i].getAttribute("view") + "?rncs=" + rncs.trim().replaceAll(' ', '');

        if (typeof(callback) === "function") {
            send_query(query, callback, placeholders[i]);
        } else {
            send_query(query, async_views_callback, placeholders[i]);
        }

        placeholders[i].setAttribute("called", "1");
    }
}/* gere l'opacite pour l'autopromo sur les marques */
function init_autopromo_opacity() {
    var autoPromo = document.querySelectorAll('.Card__box, .brands'),
        header    = document.getElementById('identite_fiche_floatable'),
        headerBottom = header.getBoundingClientRect().bottom,
        wHeight = window.innerHeight;

    if(!is_desktop_device()) {
        return;
    }

    for(var i = 0; i < autoPromo.length; i++) {

        if(autoPromo[i].getBoundingClientRect().top < headerBottom + 100) {
            if(!is_class_exist(autoPromo[i], 'setOpacity')) {
                add_class(autoPromo[i], 'setOpacity');
            }
        }

        if(autoPromo[i].getBoundingClientRect().bottom > headerBottom + 150) {
            if(is_class_exist(autoPromo[i], 'setOpacity')) {
                remove_class(autoPromo[i], 'setOpacity');
            }
        }
    }
}

/* positionner btn switch et bloc autopromo sur mobile */
function position_switch_autopromo(context) {

    /* execution fonction que si pas abonne */
    if ( !is_class_exist(document.getElementById(context), 'nocompteplus') ) {

        return;
    }

    var histo = document.getElementById(context).getElementsByClassName("histo-part");

    /* si 1 histo */
    if ( histo.length == 0 ) {

        var autopromo = document.getElementById(context).getElementsByClassName("historiqueDonneesAffiliationDesktop")[0];

        /* verif si items caches */
        var items  = document.getElementById(context).getElementsByClassName("FicheDonnees__item");
        var height = 0;

        for (var i = 0; i < items.length; i++ ) {

            if ( is_class_exist(items[i], 'noOpacity') ) {

                height += items[i].offsetHeight;
            }
        }

        /* repositionnement bloc autopromo */
        if ( height != 0 ) {

            autopromo.style.marginTop = "-" + height + "px";
        } else {

            autopromo.style.marginTop = "";
        }
    }
    /* si 2 histos */
    else {

        var cibleId = "";

        /* cibler l'histo affiche */
        for ( var i = 0; i < histo.length; i++ ) {

            if ( !is_class_exist(histo[i], 'isHidden') ) {

                cibleId = histo[i].getAttribute("id");
            }
        }

        /* repositionner le switch */
        var btnSwitch = context.substring(0, (context.length - 7));
            btnSwitch = btnSwitch + "switch";

        document.getElementById(btnSwitch).style.bottom = "136px"; /* 16 = positionnement d'origine / 120 = hauteur bloc autopromo */

        /* repositionner le bloc autopromo */
        var autopromo = document.getElementById(cibleId).getElementsByClassName("historiqueDonneesAffiliationDesktop")[0];

        /* verif si items caches */
        var items  = document.getElementById(cibleId).getElementsByClassName("FicheDonnees__item");
        var height = 0;

        for (var i = 0; i < items.length; i++ ) {

            if ( is_class_exist(items[i], 'noOpacity') ) {

                height += items[i].offsetHeight;
            }
        }

        /* position horizontale du switch sur IE 11 */
        var documentBody = document.body;

        if ( is_class_exist(documentBody, 'nav-ie11') ) {

            var width            = document.getElementById(context).offsetWidth;
            var left             = Math.round((width - 200) / 2);
            var btnSwitchContent = document.getElementById(btnSwitch).getElementsByClassName("switch")[0];

            btnSwitchContent.style.left = left + "px";
        }

        /* repositionnement bloc autopromo */
        if ( height != 0 ) {

            height = height - 45; /* soustraire btn switch */

            autopromo.style.marginTop = "-" + height + "px";
        } else {

            autopromo.style.marginTop = "45px";
        }
    }
}/* fermeture bandeau temporaire COVID */
/*function close_top_banner(id) {
    var banner     = document.getElementById(id),
        body       = document.getElementById('documentbody_around'),
        navbar     = document.getElementById('navbar'),
        menumobile = document.getElementById('menuentreprisemobile'),
        header     = document.getElementById('header_fiche_floatable'),
        identite   = document.getElementById('identite_fiche_floatable'),
        panier     = document.getElementById('recbasketcontent'),
        pub        = document.getElementById('pubcarre'),
        actu       = document.getElementById('actu'),
        cookie     = readCookie(id + '_display');

    if(panier && typeof (panier) != "undefined") {
        panier.style.top = parseInt(panier.style.top.replace(/\D/g,'')) - 72 +'px';
    }

    if(pub && typeof (pub) != "undefined") {
        pub.style.top = parseInt(pub.style.top.replace(/\D/g,'')) - 72 +'px';
    }

    if(actu && typeof (actu) != "undefined") {
        actu.style.top = parseInt(actu.style.top.replace(/\D/g,'')) - 72 +'px';
    }

    if(navbar && typeof (navbar) != "undefined") {
        remove_class(navbar, 'covid');
    }

    if(menumobile && typeof (menumobile) != "undefined") {
        menumobile.style.top = parseInt(menumobile.style.top.replace(/\D/g,'')) - 72 +'px';
    }

    if(header && typeof (header) != "undefined") {
        remove_class(header, 'covid');
    }

    if(identite && typeof (identite) != "undefined") {
        remove_class(identite, 'covid');
    }

    add_class(banner, 'hide');
    remove_class(body, 'topBanner');

    // repositionner aboutement tel
    var aboutementTel = document.getElementById('popup_aboutementtel');

    if ( is_class_exist(aboutementTel, "isVisible") ) {
        position_aboutement_tel(aboutementTel, "close-covid");
    }

    // repositionner menu fiche
    var menu = document.getElementById("menuentreprise_desktop").getElementsByTagName("ul")[0];

    if ( is_class_exist(menu, "isFixed") ) {
        var menuTop = menu.style.top;
            menuTop = menuTop.substring(0, (menuTop.length - 2));
            menuTop = menuTop - 72;

        menu.style.top = menuTop + "px";
    }
    
    createCookie('covid_banner_display', 11);
}*/

function set_covid_cookie() {
    var banner = document.getElementById('covid_banner');

    /* si pas de COVID ou deja la, on ne fait rien*/
    if(!banner || !is_class_exist(banner, 'hide')) {
        return;
    } else {
        var covidCookie = readCookie('covid_banner_display');

        /* si pas de cookie on le cree, sinon on le met a jour */
        if(!covidCookie) {
            createCookie('covid_banner_display', '1', 304);
        } else {
            var covidCount = parseInt(covidCookie) + 1;

            if(covidCount > 10) {
                createCookie('covid_banner_display', 11, 304);
            } else {
                createCookie('covid_banner_display', covidCount, 304);
            }
        }

        set_covid_banner_display();
    }
}

function set_covid_banner_display() {
    var banner = document.getElementById('covid_banner');

    if(!banner) {
        return;
    } else {
        var covidCookie = readCookie('covid_banner_display');

        if(covidCookie && covidCookie > 10) {
            return;
        } else {
            var body = document.getElementById('documentbody_around');

            remove_class(banner, 'hide');
            add_class(body, 'topBanner')
        }
    }
}/********************************************************/
/***************** BILAN SERVICE ************************/
/********************************************************/
/* verification longueur siren */
function siren_verif(element) {

    var id            = element.getAttribute("id");
    var inputError    = document.getElementById(id + "_error");
    var inputErrorMsg = document.getElementById(id + "_error_msg");

    /* si siren composé de chiffres*/
    if ( is_nan_siren(id) ) {

        /* si siret -> enlever les 5 derniers chiffres */
        if ( element.value.length == 14 ) {

            element.value = element.value.substr(0, (element.value.length - 5) );
        }
        
        /* si pas le bon nb de chiffres */
        if ( element.value.length != 9 ) {

            add_class(inputError, "no-info");
            inputErrorMsg.innerHTML = "Le numéro de siren doit être composé de 9 chiffres";
            return false;
        }
        /* si nb de chiffres OK */
        else {

            /* verif formule de Luhn */
            if ( is_luhn(element) ) {

                remove_class(inputError, "no-info");
                inputErrorMsg.innerHTML = "";
                return true;
            } else {

                add_class(inputError, "no-info");
                inputErrorMsg.innerHTML = "Le numéro de siren est invalide";
                return false;
            }
        }
    } else {
        return false;
    }
}

/* verif validite numero siren */
function is_luhn(element) {
    var len    = element.value.length;
    var parity = len % 2;
    var sum    = 0;
    
    for (var i = len-1; i >= 0; i--) {
        var d = parseInt(element.value.charAt(i));
        if (i % 2 == parity) { 
            d *= 2 
        }
        if (d > 9) { 
            d -= 9 
        }
        sum += d
    }
    
    if ((sum % 10) != 0) {
        return false;
    } else {
        return true;
    }
}


/* verif format date */
function date_verif(element) {

    var id           = element.getAttribute("id");
    var dateError    = document.getElementById(id + "_error");
    var dateErrorMsg = document.getElementById(id + "_error_msg");
    var dateFormat   = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/; 

    /* si date vide */
    if ( element.value == "" ) {

        add_class(dateError, "no-info");
        add_class(element, "red-border");

        dateErrorMsg.innerHTML = "Ce champ est obligatoire.";

        return false;

    } else {

        /* si date n'a pas le bon format */
        if ( dateFormat.test(element.value) == false ) {

            add_class(dateError, "no-info");
            add_class(element, "red-border");

            dateErrorMsg.innerHTML = "La date de clôture doit respecter le format JJ-MM-AAAA.";

            return false;
        }
        /* si date a le bon format */
        else {

            /* verifier valeur date */
            var today            = new Date();
                todayYMD         = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                todayYMD         = Date.parse(todayYMD);
            var clotureDateTable = element.value.split('-');
            var day              = Number(clotureDateTable[0]);
            var month            = Number(clotureDateTable[1]);
            var year             = Number(clotureDateTable[2]);
            var clotureYMD       = new Date(Number(year), ( Number(month) - 1), Number(day));
                clotureYMD       = Date.parse(clotureYMD);

            /* si date dans futur -> error */
            if ( todayYMD < clotureYMD ) {

                add_class(dateError, "no-info");
                add_class(element, "red-border");

                dateErrorMsg.innerHTML = "La date de clôture ne doit pas être postérieure à celle du jour.";

                return false;
            }
            /* si date OK */
            else {

                remove_class(dateError, "no-info");
                remove_class(element, "red-border");

                dateErrorMsg.innerHTML = "";

                return true;
            }            
        }
    }
}

/* afficher le focus */
function has_focus(element) {

    element.setAttribute("datafocus", "true");

    add_event(element, "blur", function(){
        element.setAttribute("datafocus", "false");
    });
}

/* gerer upload fichier pdf */
function upload_filename_pdf(input) {

    var error   = document.getElementById(input + '_error'),
        success = document.getElementById(input + '_success'),
        explain = document.getElementById(input + '_explain'),
        siren   = document.getElementById('bilanservice_siren');
        civil   = document.getElementById('bilanservice_civilite');
        nom     = document.getElementById('bilanservice_nom');
        prenom  = document.getElementById('bilanservice_prenom');
        date    = document.getElementById('bilanservice_date');

    /* relancer les verif sur l'input qui a le focus
       si upload du fichier par glisse/depose le onblur des inputs ne fonctionne pas -> la verif ne se fait pas */
    if ( siren.getAttribute("datafocus") == "true" ) {
        length_siren('bilanservice_siren');
    } else if ( civil.getAttribute("datafocus") == "true" ) {
        verif_empty_select('bilanservice_civilite','-');
    } else if ( nom.getAttribute("datafocus") == "true" ) {
        verif_input_bilan_service('bilanservice_nom');
    } else if ( prenom.getAttribute("datafocus") == "true" ) {
        verif_input_bilan_service('bilanservice_prenom');
    } else if ( date.getAttribute("datafocus") == "true" ) {
        date_verif(date);
    }

    /* cacher les msg */
    add_class(success, 'isHidden');
    add_class(error, 'isHidden');
    remove_class(explain, 'isHidden');

    open_progress_overlay('pdf_upload', "Importation de votre fichier...");

    /* verifier validite fichier */
    verif_pdf(input);
}

/* supprimer upload fichier pdf */
function reset_upload_pdf(input, state) {

    var file     = document.getElementById(input + '_input'),
        icon     = document.getElementById(input + '_icon'),
        filename = document.getElementById(input + '_name'),
        error    = document.getElementById(input + '_error'),
        success  = document.getElementById(input + '_success'),
        explain  = document.getElementById(input + '_explain');  

    file.type = '';
    file.type = 'file';

    /* supprimer le nom de l'upload */
    filename.textContent = '';

    /* reactiver l'input d'upload */
    remove_class(file, 'isHidden');

    /* annulation upload fichier par l'utilisateur */
    if (!state) {

        /* passer le picto en gris */
        remove_class(icon, 'success');
        remove_class(icon, 'error');

        /* effacer msg erreur */
        remove_class(explain, 'isHidden');
        add_class(error, 'isHidden');
        add_class(success, 'isHidden');
    }
}

/* verifier validite fichier pdf */
function verif_pdf(input) {

    var file     = document.getElementById(input + '_input'),
        filename = document.getElementById(input + '_name'),
        icon     = document.getElementById(input + '_icon'),
        error    = document.getElementById(input + '_error'),
        errorMsg = error.getElementsByClassName("uploadFile__msg")[0],
        success  = document.getElementById(input + '_success'),
        explain  = document.getElementById(input + '_explain');

    remove_class(document.getElementsByClassName("uploadFile__container")[0], "error");

    /* si pas de fichier */
    if ( file.files[0] == undefined || file.files[0] == "" ) {

        close_progress_overlay('pdf_upload');

        // revenir a l'etat initial 
        reset_upload_pdf(input);

        return false;
    }

    /* si fichier autre que pdf */
    if( !has_extension(input + '_input', ['.pdf']) && !has_extension(input + '_input', ['.PDF']) ) {

        /* passer le picto en rouge */
        add_class(icon, 'error');
        remove_class(icon, 'success');
        add_class(document.getElementsByClassName("uploadFile__container")[0], "error");

        /* afficher msg erreur */
        errorMsg.innerHTML = "Le fichier doit être au format PDF";
        remove_class(error, 'isHidden');
        add_class(success, 'isHidden');
        add_class(explain, 'isHidden');

        /* supprimer upload fichier */
        reset_upload_pdf('pdf_upload', 'error_type');

        /* reactiver l'input d'upload */
        remove_class(file, 'isHidden');

        close_progress_overlay('pdf_upload');

        return false;
    }
    /* si fichier pdf */
    else {

        /* si fichier trop/pas assez lourd */
        if ( file.files[0].size < 500 || file.files[0].size > 64000000) {

            /* passer le picto en rouge */
            add_class(icon, 'error');
            remove_class(icon, 'success');
            add_class(document.getElementsByClassName("uploadFile__container")[0], "error");

            /* afficher msg erreur */
            if (file.files[0].size < 500) {

                errorMsg.innerHTML = "La taille du fichier ne doit pas être inférieure à 500 octets";
            } else  if (file.files[0].size > 64000000) {

                errorMsg.innerHTML = "La taille du fichier ne doit pas dépasser 64Mo";
            }
            remove_class(error, 'isHidden');
            add_class(success, 'isHidden');
            add_class(explain, 'isHidden');
           
            /* supprimer upload fichier */
            reset_upload_pdf('pdf_upload', 'error_type');

            /* reactiver l'input d'upload */
            remove_class(file, 'isHidden');

            close_progress_overlay('pdf_upload');

            return false;
        }
        /* si fichier ok */
        else {

            /* si nom du fichier trop long */
            if ( file.value.length > 255 ) {

                /* passer le picto en rouge */
                add_class(icon, 'error');
                remove_class(icon, 'success');
                add_class(document.getElementsByClassName("uploadFile__container")[0], "error");

                /* afficher msg erreur */
                errorMsg.innerHTML = "Le nom du fichier ne doit pas dépasser 255 caractères";

                remove_class(error, 'isHidden');
                add_class(success, 'isHidden');
                add_class(explain, 'isHidden');
               
                /* supprimer upload fichier */
                reset_upload_pdf('pdf_upload', 'error_type');

                /* reactiver l'input d'upload */
                remove_class(file, 'isHidden');

                close_progress_overlay('pdf_upload');

                return false;
            }

            /* afficher nom fichier */
            var filenameContent   = file.value.split(/(\\|\/)/g).pop(),
                fileType          = file.files[0].type,
                fileTypeSeparator = fileType.indexOf("/"),
                fileTypeSeparator = fileTypeSeparator + 1,
                fileType          = fileType.substr(fileTypeSeparator, fileType.length),
                fileTypeLength    = fileType.length,
                filenamePosition  = filenameContent.length - fileTypeLength - 1,
                filenameShort     = filenameContent.substr(0, filenamePosition);

            /* couper nom fichier si trop long */
            if ( window.innerWidth < 480 ) {
                var max = 18;
            } else if ( window.innerWidth < 600 ) {
                var max = 30;
            } else if ( window.innerWidth > 768 ) {
                var max = 45;
            }
            
            if ( filenameContent.length > max) {

                filenameContent = filenameContent.substr(0, max);
                filename.innerHTML = filenameContent + "...." + fileType;
            } else {

                filename.innerHTML = filenameContent;
            }

            /* passer le picto en vert */
            add_class(icon, 'success');
            remove_class(icon, 'error');
            remove_class(document.getElementsByClassName("uploadFile__container")[0], "error");

            /* afficher msg OK */
            errorMsg.innerHTML = "";
            remove_class(success, 'isHidden');
            add_class(error, 'isHidden');
            add_class(explain, 'isHidden');

            /* desactiver l'input d'upload */
            add_class(file, 'isHidden');

            close_progress_overlay('pdf_upload');

            return true;
        }
    }
}

/* verification validite input */
function verif_input_bilan_service(input) {

    var inputVerif = document.getElementById(input),
        error      = document.getElementById(input + '_error'),
        errorMsg   = document.getElementById(input + '_error_msg'),
        count      = 0;

    if (inputVerif.value != "") {

        var regexp = new RegExp('[0-9]');

        /* s'il y a des chiffres */
        if ( regexp.test(inputVerif.value) ) {

            errorMsg.innerHTML = "Ce champ ne doit pas contenir de chiffres.";
            add_class(error, "no-info");
            add_class(inputVerif, "red-border");

            return false;
        }
        /*  s'il n'y a que des lettres */
        else {

            if ( inputVerif.value.length > 35 ) {

                errorMsg.innerHTML = "Ce champ ne doit pas contenir plus de 35 caractères.";
                add_class(error, "no-info");
                add_class(inputVerif, "red-border");

                return false;
               
            } else {

                remove_class(error, "no-info");
                remove_class(inputVerif, "red-border");
                errorMsg.innerHTML = "";

                return true;
            }
        }
    } 
}

/* envoi formulaire */
function send_form_bilan_service(id) {

    var formBilan = document.forms.namedItem("form_bilanservice");

    formBilan.addEventListener('submit', function(ev) {

        /* si form OK */
        if ( verif_form_bilan_service() ) {

            data = new FormData(document.forms.namedItem("form_bilanservice"));

            req = new XMLHttpRequest();
            req.open("POST", "/cgi-bin/compte-api-bilan-service", true);
            req.send(data);

            /* evolution de la requete */
            req.onreadystatechange = function() {

                /* requete terminee */
                if ( req.readyState == 4 ) {

                    close_progress_overlay('bilan_service', '');

                    if ( req.status == 200 ) {

                        manage_error_api(JSON.parse(req.responseText));
                    } else {

                        switch(req.status) {
                            case 400 :
                                manage_error_cgi(JSON.parse(req.responseText));
                                break;
                            case 401 :
                                open_popup('popup_connect_error');
                                break;
                            case 403 :
                                open_popup('popup_connect_error');
                                break;
                            case 404 :
                                open_popup_message("Envoi du formulaire", 'Votre demande n\'a pu être traitée.', 'red');
                                break;
                            case 409 :
                                open_popup_message("Envoi du formulaire", 'Votre fichier est déjà en cours de traitement.', 'red', reload_bilan_click);
                                break;
                            default :
                                open_popup_message("Envoi du formulaire", 'Afin d\'améliorer nos services, nous effectuons des opérations de maintenance. Nous vous invitons à revenir dans quelques instants et nous excusons pour la gêne occasionnée.', 'red');
                                break;
                        }
                    }
                }
            }

            ev.preventDefault();
        }
        /* si form KO */
        else {
            ev.preventDefault();
        }
    }, false);
}

/* verif form avant envoi */
function verif_form_bilan_service() {

    var form       = document.getElementById("form_bilanservice"),
        inputs     = form.getElementsByTagName("input"),
        errorRecap = false;

    /* length - 1 -> exclure le btn submit */
    for ( var i = 0; i < (inputs.length -1); i++) { 

        var placeholder  = inputs[i].getAttribute("placeholder"),
            value        = inputs[i].value,
            label        = inputs[i].nextElementSibling,
            labelContent = label.innerHTML,
            id           = inputs[i].getAttribute("id"),
            error        = document.getElementById(id + "_error");
            errorMsg     = document.getElementById(id + "_error_msg");

        /* verif SIREN */
        if ( id == "bilanservice_siren" ) {

            if ( is_nan_siren(id) ) {

                /* verif formule de Luhn */
                if ( !siren_verif(document.getElementById(id)) ) {

                    errorRecap = true;
                }
            } else {

                errorRecap = true;
            }
        }

        /* verif civilite */
        if ( id == "bilanservice_civilite" ) {

            if ( document.getElementById(id).value != "M" && document.getElementById(id).value != "Mme" ) {

                add_class(document.getElementsById("bilanservice_civilite_error"), "no-info");
                document.getElementsById("bilanservice_civilite_error_msg").innerHTML = "Le contenu du champ n'est pas valide.";

                errorRecap = true;
            } else {

                remove_class(document.getElementsById("bilanservice_civilite_error"), "no-info");
                document.getElementsById("bilanservice_civilite_error_msg").innerHTML = "";
            }
        }

        /* verif nom et prenom */
        if ( id == "bilanservice_nom" || id == "bilanservice_prenom" ) {

            if ( !verif_input_bilan_service(id) ) {

                errorRecap = true;
            }
        }

        /* verif date cloture */
        if ( id == "bilanservice_date" ) {

            if ( !date_verif(document.getElementById(id)) ) {

                errorRecap = true;
            }
        }

        /* verif upload */
        if ( id == "pdf_upload_input" ) {

            if ( inputs[i].value == "" || inputs[i].value == undefined ) {

                add_class(document.getElementsByClassName("uploadFile__container")[0], "error");
                add_class(document.getElementById("pdf_upload_icon"), "error");
                remove_class(document.getElementById("pdf_upload_error"), "isHidden");
                document.getElementById("pdf_upload_error").getElementsByClassName("uploadFile__msg")[0].innerHTML = "Le fichier PDF est obligatoire";
                add_class(document.getElementById("pdf_upload_success"), "isHidden");
                add_class(document.getElementById("pdf_upload_explain"), "isHidden");

                errorRecap = true;
            }
        }
    }

    /* verif civilite */
    var civilite = document.getElementById("bilanservice_civilite");

    if ( civilite.value == "M" || civilite.value == "Mme" ) {

        remove_class(civilite, "red-border");
        remove_class(document.getElementById("bilanservice_civilite_error"), "no-info");
        document.getElementById("bilanservice_civilite_error_msg").innerHTML = "";
    } else {

        if ( civilite.value == "" ) {

            add_class(civilite, "red-border");
            add_class(document.getElementById("bilanservice_civilite_error"), "no-info");
            document.getElementById("bilanservice_civilite_error_msg").innerHTML = "Ce champ est obligatoire.";
        } else {

            add_class(civilite, "red-border");
            add_class(document.getElementById("bilanservice_civilite_error"), "no-info");
            document.getElementById("bilanservice_civilite_error_msg").innerHTML = "Le contenu de ce champ doit être \"M.\" ou \"Mme\"";
        }

        errorRecap = true;
    }

    /* envoi si pas d'erreur */
    if ( errorRecap == false ) {
        open_progress_overlay('bilan_service', '');
        return true;
    } else {
        return false;
    }
}

/* affichage du champ sur lequel porte l'erreur retournee par le CGI */
function manage_error_cgi(response) {

    var errorMsg   = response["error"];
        errorTable = errorMsg.split(";");
        champ      = "";
        detail     = "";
        content    = "Les paramètres du formulaire sont incorrects. ";

    /* determiner le champ sur lequel porte l'erreur */
    switch(errorTable[0]) {
        case "siren" :
            champ = "Le champ Siren";
            break;
        case "dateclo" :
            champ = "Le champ Date de clôture";
            break;
        case "civ" :
            champ = "Le champ Civilité";
            break;
        case "nom" :
            champ = "Le champ Nom";
            break;
        case "prenom" :
            champ = "Le champ Prénom";
            break;
        case "pdf" :
            champ = "Le fichier";
            break;
        default :
            champ = errorTable[0];
            break;
    }

    /* determiner le detail de l'erreur */
    switch(errorTable[1]) {
        case "manquant" :
            detail = "est manquant.";
            break;
        case "invalide" :
            detail = "est invalide.";
            break;
        case "taille" :
            detail = "dépasse la taille maximale autorisée.";
            break;
        case "format" :
            detail = "n'est pas au format PDF.";
            break;
        default :
            detail = " : " + errorTable[1] + ".";
            break;
    }

    content += champ + " " + detail;
    open_popup_message("Envoi du formulaire", content, 'red');
}

/* affichage du champ sur lequel porte l'erreur retournee par l'API */
function manage_error_api(response) {

    var retour = response["codeRetour"],
        error  = response["detailErreur"];

    if ( retour == "OK" ) {

        open_popup_message("Envoi du formulaire", "Votre formulaire a bien été envoyé.", 'green', reload_bilan_click);
    } else {

        var html = "";
        
        /* determiner le detail de l'erreur */
        switch(error) {
            case "LA DATE DE CLOTURE NE CORRESPOND PAS A UNE FIN DE MOIS" :
                html = "La date de clôture doit être renseignée, doit correspondre à une fin de mois et doit être antérieure à la date d'aujourd'hui.";
                error = "LA DATE DE CLÔTURE NE CORRESPOND PAS À UNE FIN DE MOIS";
                break;
            case "SIREN INVALIDE" :
                html = "Veuillez renseigner un numéro SIREN valide (9 chiffres). Vous pouvez trouver votre numéro SIREN en en-tête de votre liasse fiscale ou en effectuant une recherche sur Societe.com.";
                break;
            case "ACCES AU PRODUIT WS NON AUTORISE" :
                html  = "Veuillez contacter le support sur Societe.com.";
                error = "ACCÈS AU PRODUIT WS NON AUTORISÉ";
                break;
            case "SIREN ABSENT OU ERRONE" :
                html = "Veuillez renseigner un numéro SIREN valide (9 chiffres). Vous pouvez trouver votre numéro SIREN en en-tête de votre liasse fiscale ou en effectuant une recherche sur Societe.com";
                error = "SIREN ABSENT OU ERRONÉ";
                break;
            case "SOCIETE INCONNUE EN BASE" :
                html = "Veuillez vérifier le numéro SIREN (9 chiffres). Vous pouvez retrouver votre numéro SIREN en en-tête de votre liasse fiscale ou en effectuant une recherche sur Societe.com.";
                error = "SOCIÉTÉ INCONNUE EN BASE";
                break;
            case "DATE DE CLOTURE ABSENTE" :
                html = "La date de clôture doit être renseignée, doit correspondre à une fin de mois et doit être antérieure à la date d'aujourd'hui.";
                error = "DATE DE CLÔTURE ABSENTE";
                break;
            case "DATE DE CLOTURE NON VALIDE" :
                html = "La date de clôture doit être renseignée, doit correspondre à une fin de mois et doit être antérieure à la date d'aujourd'hui.";
                error = "DATE DE CLÔTURE NON VALIDE";
                break;
            case "DATE DE CLOTURE SUPERIEURE A LA DATE DU JOUR" :
                html = "La date de clôture doit être renseignée, doit correspondre à une fin de mois et doit être antérieure à la date d'aujourd'hui.";
                error = "DATE DE CLÔTURE SUPÉRIEURE À LA DATE DU JOUR";
                break;
            case "DATE DE CLOTURE TROP ANCIENNE" :
                html = "Nous ne traitons pas les liasses fiscales trop anciennes. Veuillez contacter le support sur Societe.com.";
                error = "DATE DE CLÔTURE TROP ANCIENNE";
                break;
            case "ADRESSE EMAIL NON VALIDE" :
                html = "Vérifiez le format de votre adresse email il doit être du type \"adresse@email.com\"'.";
                break;
            case "LE FICHIER A ENVOYER N'EST PAS RENSEIGNE" :
                html = "Veuillez joindre votre liasse fiscale à votre envoi.";
                error = "LE FICHIER À ENVOYER N'EST PAS RENSEIGNÉ";
                break;
            case "TAILLE DU FICHIER DEPASSE 64Mo" :
                html  = "Votre liasse fiscale jointe ne peut pas dépasser les 64 Mo. Essayez de réduire la taille du fichier envoyé.";
                html += "<a href='https://www.adobe.com/fr/acrobat/online/convert-pdf.html' class='Lien block'><span>https://www.adobe.com/fr/acrobat/online/convert-pdf.html</span></a>";
                error = "LA TAILLE DU FICHIER DÉPASSE 64Mo";
                break;
            case "FICHIER NON VALIDE, OU FORMAT FICHIER NON AUTORISE" :
                html  = "Votre liasse fiscale jointe doit être au format PDF. Vous pouvez convertir la plupart des formats texte en PDF. ";
                html += "<a href='https://www.adobe.com/fr/acrobat/online/convert-pdf.html' class='Lien block'><span>https://www.adobe.com/fr/acrobat/online/convert-pdf.html</span></a>";
                error = "FICHIER NON VALIDE, OU FORMAT DE FICHIER NON AUTORISÉ";
                break;
            case "DONNEES GESTION BILAN NON IDENTIFIEE" :
                html = "Veuillez contacter le support sur Societe.com.";
                error = "DONNÉES GESTION BILAN NON IDENTIFIÉES";
                break;
            case "VALEUR DE LA DONNEES GESTION BILAN NON VALIDE" :
                html = "Veuillez contacter le support sur Societe.com.";
                error = "VALEUR DE LA DONNÉE GESTION BILAN NON VALIDÉE";
                break;
            case "DONNEES GESTION CLIENT NON IDENTIFIEE" :
                html = "Veuillez contacter le support sur Societe.com.";
                error = "DONNÉES GESTION CLIENT NON IDENTIFIÉES";
                break;
            case "VALEUR DE LA DONNEES GESTION CLIENT NON VALIDE" :
                html = "Veuillez contacter le support sur Societe.com.";
                error = "VALEUR DE LA DONNÉE GESTION CLIENT NON VALIDE";
                break;
            case "ERREUR DE COMMUNICATION SUR LE SERVEUR - NAMINGEXCEPTION" :
                html = "Veuillez contacter le support sur Societe.com.";
                break;
            case "ERREUR TECHNIQUE" :
                html = "Veuillez contacter le support sur Societe.com.";
                break;
            case "ERREUR NON IDENTIFIEE" :
                html = "Veuillez contacter le support sur Societe.com.";
                error = "ERREUR NON IDENTIFIÉE";
                break;
            default :
                html = "";
            break;
        }

        if ( html != "" ) {

            open_popup_error_api(error, html);
        } else {

            open_popup_message("Envoi du formulaire", error + ".", 'red');
        }
    }
}


function open_popup_error_api(error, html) {

    var timestamp  = Date.now();

    /* fermer popup ouverte */
    close_popup();

    /* ouvrir popup */
    var popup = document.getElementById('popup');
    
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

    load_content('/pages/popup.html?ch=' + timestamp, "popup_error_bilanservice", 'popup', function() {

        if(document.getElementById("popup_error_bilanservice")) {
            var errorTitle = document.getElementById("popup_error_bilanservice_error"),
                errorTxt   = document.getElementById("popup_error_bilanservice_text");

            errorTitle.innerHTML = error + ".";
            errorTxt.innerHTML = html;

            setTimeout(function(){

                if(document.getElementById("popup_error_bilanservice")) {

                    remove_class(popup, 'isHidden');

                } else {
                    open_popup_message('Une erreur est survenue', 'Votre demande n\'a pu être traitée. Veuillez réessayer ultérieurement.', 'red');
                }
            }, 250);
        } else {
            open_popup_message('Une erreur est survenue', 'Votre demande n\'a pu être traitée. Veuillez réessayer ultérieurement.', 'red');
        }
    });
}










/* recharger page bilan au click sur btn popup */
function reload_bilan_click() {

    var popup      = document.getElementById("popup_message"),
        btn        = popup.getElementsByClassName("Button")[0],
        close      = popup.getElementsByClassName("Popup__close")[0],
        clickBtn   = btn.getAttribute("onclick"),
        clickClose = close.getAttribute("onclick");

    btn.setAttribute("onclick", clickBtn + "reload_bilan();");
    close.setAttribute("onclick", clickClose + "reload_bilan();");
}

/* recharger page pour envoi nvx bilan */
function reload_bilan() {

    document.location.reload(true);
}/* init classes de marques accessibles */
function init_brand_tags() {
    var tags = document.getElementsByClassName('brandTag');

    if(tags) {
        for(var i = 0; i < tags.length; i++) {
            if(tags[i].textContent == "00") {
                add_class(tags[i], 'isInactive');
            }
        }
    }
}///* ----------------- CMP ---------------------------*/
//
//(function(window) {
//    if (document.URL.indexOf("paiement.societe.com") == -1) {
//        window.__cmp = (function() {
//            var listen = window.attachEvent || window.addEventListener;
//            listen('message', function(event) {
//                window.__cmp.receiveMessage(event);
//            });
//
//            var commandQueue = [];
//            var cmp = function(command, parameter, callback) {
//                commandQueue.push({
//                    command: command,
//                    parameter: parameter,
//                    callback: callback
//                });
//            };
//            cmp.commandQueue = commandQueue;
//            cmp.receiveMessage = function(event) {
//                var data = event && event.data && event.data.__cmpCall;
//                if (data) {
//                    commandQueue.push({
//                        callId: data.callId,
//                        command: data.command,
//                        parameter: data.parameter,
//                        event: event
//                    });
//                }
//            };
//            cmp.config = {
//                storePublisherData: true,
//                customPurposeListLocation: '/scripts/purposes.json',
//                globalConsentLocation: '/pages/portal.html',
//            };
//            return (cmp);
//        }());
//    }
//})(window);
//
//
//function cmp_modal_load() {
//    if (document.URL.indexOf("paiement.societe.com") == -1) {
//        var objbody = document.getElementsByTagName('body')[0];
//        add_class(objbody, "cmp_modal");
//
//        __cmp('showConsentTool');
//    }
//}
//
//
//if (typeof(__cmp) != "undefined" && (readCookie("euconsent") == null || readCookie("pubconsent") == null)) {
//    
//    if (document.URL.indexOf("paiement.societe.com") == -1) {
//        __cmp('showConsentTool');
//    }
//    /* --- DEBUT PARTIE MODALE CMP --- */
////    window.addEventListener("DOMContentLoaded", cmp_modal_load, false);
////
////    window.__cmp('addEventListener', 'onSubmit', function(result) {
////        var objbody = document.getElementsByTagName('body')[0];
////        remove_class(objbody, "cmp_modal");
////    });
//    /* ---- FIN PARTIE MODALE CMP --- */
//    
//    /* --- DEBUT PARTIE BANNER CMP --- */
//    /* --- FIN PARTIE BANNER CMP --- */
//}
//
//if (document.URL.indexOf("paiement.societe.com") == -1) {
//    var elem = document.createElement('script');
//    //elem.src = "/scripts/cmp.bundle.js";
//    elem.src = "https://www.societe.mgr.consensu.org/cmp.js"
//    elem.async = true;
//    elem.type = "text/javascript";
//    var scpt = document.getElementsByTagName('script')[0];
//    scpt.parentNode.insertBefore(elem, scpt);
//}
//
//
//
///* --------------------- /CMP ------------------------ *//* ======================================= Gestion compte + surveillance  ======================== */

function redirectSurveillance () {
    var siren = document.getElementById('identite-siren').innerHTML;
    if (typeof(siren) == "string") {
        //window.location = "https://paiement.societe.com/cgi-bin/compte-veilles?act=insert&type=0&param=" + siren;

        /* gestion popup maintenance */
        if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
            open_popup_maintenance();
        } else {
            window.location = "/cgi-bin/compte-veilles?act=insert&type=0&param=" + siren.trim().replaceAll(' ', '');
        }
    }
}


opcXhr = getXhrCors();

function SocOpenConnectWrapper() {

    this.xhr = opcXhr;

    this.onload = function() {
        infos_resume.unlock();
        if (this.responseText == 1) {
            infos_resume.logged();
        } else {
            infos_resume.get_login();
        }
    }

    this.onerror = function() {
        redirectSurveillance();
    }

    this.send = function() {

        if (this.xhr == null) {
            this.onerror();
        }

        infos_resume.lock();
        this.xhr.open("POST", "https://paiement.societe.com/cgi-bin/isxed", true);
        this.xhr.socXhrWrapper = this;
        this.xhr.withCredentials = true;
        this.xhr.onload = this.onload;
        this.xhr.onerror = this.onerror;
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
        this.xhr.send();

        return "Request processing...";
    }
}

cliXhr = getXhrCors();

function SocConnectWrapper() {
    this.xhr = cliXhr;

    this.onload = function() {
        infos_resume.unlock();

        try {
            var response = JSON.parse(this.responseText);
        } catch (e) {
            redirectSurveillance();
        }

        if (typeof(response.Exists) != "undefined") {
            if (response.Exists == true) {
                infos_resume.get_pass();
            } else  {
                if (response.Not_exist == true) {
                    infos_resume.create_pass();
                }
                if (response.Exists == false && response.Created == true && response.Pass == true) {
                    infos_resume.get_code_only();
                }
                if (response.Code == false) {
                    infos_resume.wrong_code();
                }
                if (typeof(response.Confirm) != "undefined") {
                    if (response.Confirm == true) {
                        infos_resume.creation_complete();
                    } else {
                        //redirectSurveillance();
                    }
                }
            }
        } else if (typeof(response.Connected) != "undefined") {
            if (response.Connected == true) {
                infos_resume.logged();
            } else {
                infos_resume.pass_error();
            }
        }
    }

    this.onerror = function() {
        redirectSurveillance();
    }

    this.send = function(email, pass, confirm, code) {
        if (this.xhr == null) {
            this.onerror();
        }

        infos_resume.lock();
        this.xhr.open("POST", "https://paiement.societe.com/cgi-bin/authenticate", true);
        this.xhr.socXhrWrapper = this;
        this.xhr.withCredentials = true;
        this.xhr.onload = this.onload;
        this.xhr.onerror = this.onerror;
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
        if (pass == "") {
            if(code == "" || code == undefined) {
                this.xhr.send("email=" + email);
                return;
            } else {
                this.xhr.send("email=" + email + "&code=" + code);
                return;
            }   
        } else {
            if (confirm == undefined) {
                this.xhr.send("email=" + email + "&pass=" + pass);
                return;
            } else {
                if (code == undefined) {
                    this.xhr.send("email=" + email + "&pass=" + pass + "&confirm=" + confirm);
                    return;
                } else {
                    this.xhr.send("email=" + email + "&code=" + code);
                    return;
                }
            }  
        }
        return "Request processing...";
    }
}

passXhr = getXhrCors();

function SocLostPassWrapper() {
    this.xhr = passXhr;

    this.onload = function() {
        infos_resume.unlock();

        try {
            var response = JSON.parse(this.responseText);
        } catch (e) {
            redirectSurveillance();
        }

        if(response.Success == true) {
            infos_resume.pass_resend_success();
        }
        else if (response.Email_error == true) {
            infos_resume.pass_resend_errmail();
        }
        else if (response.No_email == true) {
            infos_resume.pass_resend_nomail();
        }
        else if (response.Error_tech == true) {
            infos_resume.pass_resend_tech();
        }
        else if (response.Error_confirm == true) {
            infos_resume.pass_resend_noconfirm();
        }
    }

    this.onerror = function() {
        redirectSurveillance();
    }

    this.send = function(email, format) {
        if(this.xhr == null) {
            this.onerror();
        }

        infos_resume.lock();
        this.xhr.open("POST", "https://paiement.societe.com/cgi-bin/compte-renvoimdp", true);
        this.xhr.socXhrWrapper = this;
        this.xhr.withCredentials = true;
        this.xhr.onload = this.onload;
        this.xhr.onerror = this.onerror;
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
        this.xhr.send("email=" + encode_to_hex(email) + "&format=" + format);

        return;
    }
}

survXhr = getXhrCors();

function SocSurvWrapper() {
    this.xhr = survXhr;

    this.onload = function() {

        /* cacher le loader */
        add_class(document.getElementById('CompanyWatch_overlay'), "isHidden");
        remove_class(document.getElementById('CompanyWatch_overlay'), "flex");

        /* si + de 150 veilles */
        if (this.responseText.indexOf('id="ajout_veille_max_veille"') != -1) {
            
            /* afficher contenu limitation */
            show_list(infos_resume.show_maxveille);

        }
        /* si nb veilles OK */
        else {

            /* afficher ajout veille OK */
            show_list(infos_resume.show_logged);
        } 
    }

    this.onerror = function() {
    }

    this.send = function(siren) {
        if (this.xhr == null) {
            redirectSurveillance();
        }
        
        this.xhr.open("GET", "/cgi-bin/compte-veilles?act=insert&type=0&param=" + siren.trim().replaceAll("&nbsp;", ""), true);
        this.xhr.socXhrWrapper = this;
        this.xhr.onerror = this.onerror;
        this.xhr.onload = this.onload;
        this.xhr.withCredentials = true;
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
        this.xhr.send();
        return "Request processing...";
    }
}


function Client() {
    this.setEmail = setEmail;
    this.xhrOpenConnectWrapper = new SocOpenConnectWrapper();
    this.xhrConnectWrapper = new SocConnectWrapper();
    this.xhrSurvWrapper = new SocSurvWrapper();
    this.xhrSocLostPassWrapper = new SocLostPassWrapper();
    this.email = undefined;
    this.cors = (this.xhrConnectWrapper.xhr != null) ? true : false;


    function setEmail(email) {
        this.email = email;
        var client_informations = document.getElementById('client_informations');

        var list = get_elementsbyclassname(client_informations, 'client_infos_email');
//        for (var e in list) {
        for (var i = 0; i < list.length; i++) {
            list[i].innerHTML = email;
        }
    }
}

client = new Client();

/**/
//var _client_close = 0;
//var _client_open = 1;
var _client_get_login = 2;
var _client_login_invalid = 3;
var _client_login_valid = 4;
var _client_get_pass = 5;
var _client_create = 6;
var _client_pass_error = 7;
var _client_inactiv = 8;
var _client_logged = 9;
var _client_creationfailed = 10;


function show_list(list) {
    if (typeof(list) != typeof({})) {
        return;
    }

    for(var i in list) {
        remove_class(list[i], "isHidden");
    }

    adnext_cssmove();
}


function hide_list(list) {
    if (typeof(list) != typeof({})) {
        return;
    }

    for(var i in list) {
        add_class(list[i], "isHidden");
    }

    adnext_cssmove();
}

function InfosClient() {
    this.state = _client_get_login;
    this.closed = true;
    this.setup = setup;

    this.open = open;
    this.close = close;

    this.get_login = get_login;
    this.login_invalid = login_invalid;
    this.login_valid = login_valid;
    this.create_pass = create_pass;
    this.get_code = get_code;
    this.get_code_only = get_code_only;
    this.send_code = send_code;
    this.get_pass = get_pass;
    this.creation_complete = creation_complete;
    this.wrong_code = wrong_code;
    this.code_resent = code_resent;
    this.pass_error = pass_error;
    this.logged = logged;
    this.creationfailed = creationfailed;
    this.pass_resend_success = pass_resend_success;
    this.pass_resend_nomail = pass_resend_nomail;
    this.pass_resend_tech = pass_resend_tech;
    this.pass_resend_errmail = pass_resend_errmail;
    this.pass_resend_noconfirm = pass_resend_noconfirm;
    this.modify_mail = modify_mail

    this.update = update;
    this.updatestate = updatestate;

    this.lock = lock;
    this.unlock = unlock;

    this.id = undefined;
    this.inputemail = undefined;
    this.inputpass = undefined;

    this.elements = {};
    this.elements.bloccontainer = undefined;
    this.elements.blocpass = undefined;
    this.elements.bloccreatepass = undefined;
    this.elements.blocsendcode = undefined;
    this.elements.bloccomplete = undefined;
    this.elements.bloclogin = undefined;
    this.elements.blocsentmail = undefined;
    this.elements.blocinactifmail = undefined;
    this.elements.blocvoirveille = undefined;
    this.elements.blocfreshlog = undefined;
    this.elements.emailinvalid = undefined;
    this.elements.blocmaxveille = undefined;

    this.show_get_login = {};
    this.show_login_invalid = {};
    this.show_login_valid = {};
    this.show_create_pass = {};
    this.show_get_code = {};
    this.show_get_code_only = {};
    this.show_send_code = {};
    this.show_get_pass = {};
    this.show_create = {};
    this.show_pass_error = {};
    this.show_inactiv = {};
    this.show_logged = {};
    this.show_creationfailed = {};
    this.show_maxveille = {};


    function setup (id) {

        this.id = id;

        this.inputemail = document.getElementById('auth-email');
        this.inputpass = document.getElementById('auth-pass');
        this.inputcreatepass = document.getElementById('creat-pass');
        this.inputconfirmpass = document.getElementById('creat-pass_confirm');
        this.buttonvalidlogin = document.getElementById('valid_button_login');
        this.buttonlogin = document.getElementById('valid_button');
        this.buttonvalid = document.getElementById('identite_valid_mail');
        this.codetext = document.getElementById('code_help');
        this.codetextvalid = document.getElementById('code_help_valid');
        this.codetexterror = document.getElementById('code_help_error');
        this.codesend = document.getElementById('resend_code');
        this.codevalid = document.getElementById('code_valid');
        this.codeerror = document.getElementById('code_error');
        this.coderesent = document.getElementById('code_resent');
        this.watchbody = document.getElementById('watch_body');
        this.watchtext = document.getElementById('watch-text');
        this.watchbutton = document.getElementById('button_manage_watch');

        this.digit1 = document.getElementById('digit-1');
        this.digit2 = document.getElementById('digit-2');
        this.digit3 = document.getElementById('digit-3');
        this.digit4 = document.getElementById('digit-4');

        this.overlay = document.getElementById('CompanyWatch_overlay');
        this.overlaytext = document.getElementById('CompanyWatch_progress_status');

        this.elements.bloccontainer = document.getElementById('client_create_container');
        this.elements.blocpass = document.getElementById('client_infos_password');
        this.elements.bloccreatepass = document.getElementById('client_create_password');
        this.elements.blocconfirmpass = document.getElementById('client_confirm_password');
        this.elements.blocsendcode = document.getElementById('client_send_code');
        this.elements.blocmaxveille = document.getElementById('client_maxveille');
        this.elements.bloccomplete_m = document.getElementById('client_complete');
        this.elements.bloccomplete_nm = document.getElementById('client_complete_no_mail');
        this.elements.bloccomplete = document.getElementById((client.email != undefined) ? 'client_complete' : 'client_complete_no_mail');
        this.elements.bloclogin = document.getElementById('client_infos_login');
        this.elements.blocsentmail = document.getElementById('client_infos_sentmail');
        this.elements.blocinactifmail = document.getElementById('client_infos_inactifmail');
        this.elements.blocvoirveille = document.getElementById('client_infos_voirveille');
        this.elements.blocfreshlog = document.getElementById('client_infos_freshlog');

        this.elements.creationfailed = document.getElementById('creation_failed');

        this.show_get_login.bloclogin = this.elements.bloclogin;

        this.show_login_invalid.bloclogin = this.elements.bloclogin;

        this.show_login_valid.bloclogin = this.elements.bloclogin;

        this.show_get_pass.bloclogin = this.elements.bloclogin;
        this.show_get_pass.blocpass = this.elements.blocpass;

        this.show_create_pass.bloccontainer = this.elements.bloccontainer;
        this.show_create_pass.bloccreatepass = this.elements.bloccreatepass;
        this.show_create_pass.blocconfirmpass = this.elements.blocconfirmpass;
        this.show_create_pass.blocsendcode = this.elements.blocsendcode;
        this.show_create_pass.blocvoirveille = this.elements.blocvoirveille;

        this.show_get_code.bloccontainer = this.elements.bloccontainer;
        this.show_get_code.bloccreatepass = this.elements.bloccreatepass;
        this.show_get_code.blocsendcode = this.elements.blocsendcode;
        this.show_get_code.blocvoirveille = this.elements.blocvoirveille;

        this.show_get_code_only.bloccontainer = this.elements.bloccontainer;
        this.show_get_code_only.bloccreatepass = this.elements.bloccreatepass;
        this.show_get_code_only.blocsendcode = this.elements.blocsendcode;
        this.show_get_code_only.blocvoirveille = this.elements.blocvoirveille;

        this.show_pass_error.bloclogin = this.elements.bloclogin;
        this.show_pass_error.blocpass = this.elements.blocpass;
        this.show_pass_error.blocsentmail = this.elements.blocsentmail;

        this.show_create.blocfreshlog = this.elements.blocfreshlog;
        this.show_create.blocvoirveille = this.elements.blocvoirveille;

        this.show_logged.bloccomplete = this.elements.bloccomplete;
        this.show_logged.blocvoirveille = this.elements.blocvoirveille;

        this.show_creationfailed.bloclogin = this.elements.bloclogin;
        this.show_creationfailed.bloccreationfailed = this.elements.creationfailed;

        this.show_maxveille.blocmaxveille = this.elements.blocmaxveille;
    }


    function open() {

        if (this.id == undefined) {
            return;
        }

        hide_list(this.elements);
        remove_class(this.id, "isHidden");
        this.closed = false;
        client.xhrOpenConnectWrapper.send();
    }

    function close() {
        if (this.id == undefined) {
            return;
        }

        add_class(this.id, "isHidden");
        this.closed = true;
    }

    function get_login() {
        if (this.id == undefined) {
            return;
        }

        var popup = document.getElementById('popup');

        if (popup && !popup.classList.contains("isHidden")) {
            close_popup_info();
        }

        if (this.inputpass != undefined) {
            this.inputpass.value = "";
        }

        if (this.buttonvalid != undefined) {
            remove_event(this.buttonvalid, "click", click_valid_create);
            add_event(this.buttonvalid, "click", click_valid_infos);
            this.buttonvalid.textContent = "Valider";
        }

        hide_list(this.elements);
        show_list(this.show_get_login);

        remove_class(this.buttonvalid, "isDisabled");
        move_block(this.buttonlogin, this.buttonvalidlogin);

        this.state = _client_get_login;
    }

    function creationfailed() {
        if (this.id == undefined) {
            return;
        }

        hide_list(this.elements);
        show_list(this.show_creationfailed);

        this.state = _client_creationfailed;
    }

    function login_invalid () {
        if (this.id == undefined) {
            return;
        }

        hide_list(this.elements);
        show_list(this.show_login_invalid);

        display_mail_error("auth-email");

        this.state = _client_login_invalid;
    }

    function login_valid () {
        if (this.id == undefined) {
            return;
        }
        var email = this.inputemail.value;
        var pass = this.inputpass.value;

        hide_list(this.elements);
        show_list(this.show_login_valid);

        client.setEmail(email);
        client.xhrConnectWrapper.send(encode_to_hex(email), encode_to_hex(pass));

        this.state = _client_login_valid;
    }

    function create_pass() {
        if (this.id == undefined ) {
            return;
        }

        var email = document.getElementById('new_mail');

        this.inputcreatepass.value = "";
        this.inputconfirmpass.value = "";

        enable_input('creat-pass');
        enable_input('creat-pass_confirm');

        if (!this.elements.blocsendcode.classList.contains("isDisabled")) {
            add_class(this.elements.blocsendcode, "isDisabled");
        }

        if(!this.codetextvalid.classList.contains("isHidden")) {
            add_class(this.codetextvalid, "isHidden");
        }

        if(!this.codetexterror.classList.contains("isHidden")) {
            add_class(this.codetexterror, "isHidden");
        }

        if(this.codetext.classList.contains('isHidden')) {
            remove_class(this.codetext, 'isHidden');
        }

        remove_class(this.elements.blocsendcode, "valid");
        remove_class(this.elements.blocsendcode, "error");
        remove_class(this.codesend, "isDisabled");

        this.digit1.value = "";
        this.digit2.value = "";
        this.digit3.value = "";
        this.digit4.value = "";

        if (!this.codevalid.classList.contains('isHidden')) {
            add_class(this.codevalid, "isHidden");
        }

        if (!this.codeerror.classList.contains('isHidden')) {
            add_class(this.codeerror, "isHidden");
        }

        if(!this.coderesent.classList.contains('isHidden')) {
            add_class(this.coderesent, "isHidden");
        }

        if(!this.watchbutton.classList.contains("isDisabled")) {
            add_class(this.watchbutton, "isDisabled");
        }

        hide_list(this.elements);
        show_list(this.show_create_pass);

        email.textContent = this.inputemail.value;
        this.inputcreatepass.focus();

        move_block(this.buttonlogin, this.elements.blocconfirmpass);
        remove_event(this.buttonvalid, "click", click_valid_infos);
        add_event(this.buttonvalid, "click", click_valid_create);
        this.buttonvalid.textContent = "Continuer";
    }

    function get_code() {
        if (this.id == undefined ) {
            return;
        }

        var email = this.inputemail.value;
        var pass = this.inputcreatepass.value;
        var confirm = this.inputconfirmpass.value;

        if(!this.codetextvalid.classList.contains("isHidden")) {
            add_class(this.codetextvalid, "isHidden");
        }

        if(!this.codetexterror.classList.contains("isHidden")) {
            add_class(this.codetexterror, "isHidden");
        }

        if(this.codetext.classList.contains("isHidden")) {
            remove_class(this.codetext, "isHidden");
        }

        remove_class(this.elements.blocsendcode, "valid");
        remove_class(this.elements.blocsendcode, "error");
        remove_class(this.codesend, "isDisabled");

        if(!this.watchbutton.classList.contains("isDisabled")) {
            add_class(this.watchbutton, "isDisabled");
        }

        this.digit1.value = "";
        this.digit2.value = "";
        this.digit3.value = "";
        this.digit4.value = "";

        client.xhrConnectWrapper.send(encode_to_hex(email), encode_to_hex(pass), encode_to_hex(confirm));

        disable_input("creat-pass");
        disable_input("creat-pass_confirm");
        add_class(this.buttonvalid, "isDisabled");
        remove_class(this.elements.blocsendcode, "isDisabled");

        this.digit1.focus();
    }

    function get_code_only() {
        if (this.id == undefined ) {
            return;
        }

        var email = document.getElementById('new_mail');

        email.textContent = this.inputemail.value;

        hide_list(this.elements);
        show_list(this.show_get_code_only);

        this.inputcreatepass.value = "default";
        this.inputconfirmpass.value = "default";

        disable_input("creat-pass");
        disable_input("creat-pass_confirm");

        hide_input_error("creat-pass");
        hide_input_error("creat-pass_confirm");

        if (!this.elements.blocsendcode.classList.contains("isDisabled")) {
            add_class(this.elements.blocsendcode, "isDisabled");
        }

        this.digit1.value = "";
        this.digit2.value = "";
        this.digit3.value = "";
        this.digit4.value = "";

        if (!this.codevalid.classList.contains('isHidden')) {
            add_class(this.codevalid, "isHidden");
        }

        if (!this.codeerror.classList.contains('isHidden')) {
            add_class(this.codeerror, "isHidden");
        }

        if(!this.coderesent.classList.contains('isHidden')) {
            add_class(this.coderesent, "isHidden");
        }

        remove_class(this.elements.blocsendcode, "isDisabled");
        add_class(this.elements.blocsendcode, "mt-16");

        this.digit1.focus();
    }

    function send_code() {
        if (this.id == undefined ) {
            return;
        }

        var email = this.inputemail.value;
        var pass = this.inputcreatepass.value;
        var confirm = this.inputconfirmpass.value;
        var code = this.digit1.value + this.digit2.value + this.digit3.value + this.digit4.value;

        this.digit1.blur();
        this.digit2.blur();
        this.digit3.blur();
        this.digit4.blur();

        client.xhrConnectWrapper.send(encode_to_hex(email), encode_to_hex(pass), encode_to_hex(confirm), code);
    }

    function get_pass() {
        if (this.id == undefined) {
            return;
        }

        hide_list(this.elements);
        show_list(this.show_get_pass);

        this.inputpass.focus();

        move_block(this.buttonlogin, this.elements.blocpass);

        this.state = _client_get_pass;
    }

    function creation_complete() {
        if (this.id == undefined) {
            return;
        }

        var siren = document.getElementById('identite-siren').innerHTML.trim();

        if (!this.codeerror.classList.contains('isHidden')) {
            add_class(this.codeerror, "isHidden");
        }

        if(!this.coderesent.classList.contains('isHidden')) {
            add_class(this.coderesent, "isHidden");
        }

        remove_class(this.elements.blocsendcode, "error");
        add_class(this.elements.blocsendcode, "valid");
        remove_class(this.codevalid, "isHidden");
        add_class(this.codesend, "isDisabled");
        remove_class(this.watchbutton, "isDisabled");

        if(!this.codetext.classList.contains("isHidden")) {
            add_class(this.codetext, "isHidden");
        }

        if(!this.codetexterror.classList.contains("isHidden")) {
            add_class(this.codetexterror, "isHidden");
        }

        if(this.codetextvalid.classList.contains("isHidden")) {
            remove_class(this.codetextvalid, "isHidden");
        }

        remove_class(this.codetextvalid, "isHidden");

        client.xhrSurvWrapper.send(siren);

        this.state = _client_create;
    }

    function wrong_code() {
         if (this.id == undefined) {
            return;
        }

        if(!this.coderesent.classList.contains('isHidden')) {
            add_class(this.coderesent, "isHidden");
        }

        add_class(this.elements.blocsendcode, "error");
        remove_class(this.codeerror, "isHidden");

        if(!this.codetext.classList.contains("isHidden")) {
            add_class(this.codetext, "isHidden");
        }

        if(!this.codetextvalid.classList.contains("isHidden")) {
            add_class(this.codetextvalid, "isHidden");
        }

        if(this.codetexterror.classList.contains("isHidden")) {
            remove_class(this.codetexterror, "isHidden");
        }
    }

    function code_resent() {
        if (this.id == undefined) {
            return;
        }

        if(!this.codeerror.classList.contains('isHidden')) {
            add_class(this.codeerror, "isHidden");
        }

        remove_class(this.coderesent, "isHidden");
    }

    function pass_error() {
        if (this.id == undefined) {
            return;
        }

        hide_list(this.elements);
        show_list(this.show_pass_error);

        this.state = _client_pass_error;
    }

    function pass_resend_success() {
        var email = document.getElementById('auth-email');

        /* fonctionnement sur fiche societe */
        if ( document.getElementById("identite") || document.getElementById("identite-etablissement") ) {
            
            var oldText  = document.getElementById("watch_body").innerHTML;
            var newText  = '<p class="green">Un mail avec le lien de reinitialisation de votre mot de passe a été envoyé à ' + email.value + '. Merci de vérifiez votre boite mail.</p>';
                newText += '<p class="wd-100 mt-16 txt-right">';
                newText += '<a id ="client_infos_close2" class="Button levelOne no-arrow" href="javascript:void(0)">OK</a>';
                newText += '</p>';

            /* remplcer le contenu de la popup */
            document.getElementById("watch_body").innerHTML = newText;

            /* retablir le onclick sur client_infos_close2 */
            init_client_informations();

            /* remettre le texte initial dans la popup */
            add_event(document.getElementById("client_infos_close2"), "click", function() {
                document.getElementById("watch_body").innerHTML = oldText;
                init_client_informations();
            });
        }
        /* fonctionnement sur le reste du site */
        else {
 
            open_popup_info("Mot de passe oublié", "Un mail avec le lien de reinitialisation de votre mot de passe a été envoyé à " +email.value+". Merci de vérifiez votre boite mail.", "green");
        }
    }

    function pass_resend_nomail() {
        var email = document.getElementById('auth-email');

        open_popup_info("Mot de passe oublié", "Il n\'y a pas de compte associé à " +email.value+ ".", "red");
    }

    function pass_resend_tech() {
        open_popup_info("Mot de passe oublié", "Une erreur technique est survenu. Merci de réessayer plus tard.", "red");
    }

    function pass_resend_errmail() {
        var email = document.getElementById('auth-email');

        if(email.value.length != 0) {
            open_popup_info("Mot de passe oublié", email.value+" n\'est pas une adresse mail valide.", "red");
        } else {
            open_popup_info("Mot de passe oublié", "Vous devez saisir une adresse mail valide afin que nous puissions vous envoyer un lien de réinitialisation.", "red");
        }
        
    }

    function pass_resend_noconfirm() {
                open_popup_info("Mot de passe oublié", "Le compte doit d\'abord avoir été confirmé avant que nous puissions vous renvoyer votre mot de passe.", "red");
    }

    function modify_mail() {
        var popup      = document.getElementById('popup_body')
            containElt = document.createElement('p'),
            validElt   = document.createElement('a'),
            cancelElt  = document.createElement('a');

        add_class(validElt, 'Button levelFour mr-8');
        add_class(cancelElt, 'Button levelTwo');
        add_class(containElt, 'mt-16 txt-right');

        validElt.textContent = "OUI";
        cancelElt.textContent = "NON";

        validElt.addEventListener("click", function() {
           infos_resume.get_login(); 
        });
        add_event(cancelElt, "click", close_popup_info);

        containElt.appendChild(validElt);
        containElt.appendChild(cancelElt);

        popup.appendChild(containElt);

        open_popup_info("Modification d'adresse mail", "Souhaitez-vous utiliser une autre adresse mail ?");
    }

    function logged() {
        if (this.id == undefined) {
            return;
        }

        var siren = document.getElementById('identite-siren').innerHTML.trim();

        this.watchtext.textContent = '';
        move_block(this.elements.blocvoirveille, this.watchbody);
        remove_class(this.watchbutton, 'isDisabled');

        /* vider contenu popup */
        hide_list(this.elements);

        /* afficher loader */
        remove_class(this.overlay, "isHidden");
        add_class(this.overlay, "flex");

        client.xhrSurvWrapper.send(siren);

        this.state = _client_logged;
    }

    function updatestate() {
        if (client.isConnected() == true && this.state != _client_logged) {
            update(_client_logged);
        } else {
            if (this.state == _client_logged) {
                update(_client_get_login);
            }
        }
    }

    function update(state) {
        if (this.id == undefined) {
            return;
        }

        switch (state) {
            case _client_get_login: this.getlogin(); break;
            case _client_get_pass: this.getpass(); break;
            case _client_create: this.create(); break;
            case _client_pass_error: this.pass_error(); break;
            case _client_creationfailed: this.creationfailed(); break;
            default: break;
        }
    }

    function lock() {
        if (this.id == undefined) {
            return;
        }

        remove_class(this.overlay, "isHidden");
        add_class(this.overlay, "flex");
        remove_event(this.buttonvalid, "click", click_valid_infos);
        remove_event(this.inputemail, "keyup", press_valid_infos);
        remove_event(this.inputpass, "keyup", press_valid_infos);
    }

    function unlock() {
        if (this.id == undefined) {
            return;
        }
        remove_class(this.overlay, "flex");
        add_class(this.overlay, "isHidden");
        add_event(this.buttonvalid, "click", click_valid_infos);
        add_event(this.inputemail, "keyup", press_valid_infos);
        add_event(this.inputpass, "keyup", press_valid_infos);
        add_event(this.inputconfirmpass, "keyup", press_valid_create);
    }
}

function press_valid_infos (event) {
    get_enter_char(event, click_valid_infos);
}

function press_valid_create (event) {
    get_enter_char(event, click_valid_create);
}

infos_resume = new InfosClient();

function valid_email(email) {
    var valid = false;
    var regex = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+\\b";


    if (typeof(email) != "string" || email == '') {
        return(false);
    }

    regex = new RegExp(regex, '');

    valid = regex.test(email);

    return valid;
}

function click_valid_infos () {
    var email = document.getElementById('auth-email').value;

    if (valid_email(email)) {
        infos_resume.login_valid();
    } else {
        infos_resume.get_login();
    }
}

function click_valid_create () {
    var pass    = document.getElementById('creat-pass').value;
    var confirm = document.getElementById('creat-pass_confirm').value;

    if (pass == confirm) {
        infos_resume.get_code();
    } else {
        confirm_password('creat-pass');
        open_popup_info("Création de compte", "Vous devez confirmer votre mot de passe afin de pouvoir continuer.", "red");
    }
}
 
function get_enter_char(ev, fct) {
    if (ev.keyCode == 13) {
        fct();
    }
}

function click_lost_pass() {

    var email = document.getElementById('auth-email').value;
    var format = document.getElementById('format').value;

    client.xhrSocLostPassWrapper.send(email, format);
}

/* etat normal du btn surveiller */
function activeLinkSurveillance() {
    var id   = document.getElementById('buttsurveiller');

    remove_class(id, "identitebuttinactive");
    add_class(id, "identitebutt");
}

/* etat selectionne du btn surveiller */
function inactiveLinkSurveillance() {

    var id   = document.getElementById('buttsurveiller');
    
    remove_class(id, "identitebutt");
    add_class(id, "identitebuttinactive");
}

function closeSurveillance() {
    var id   = document.getElementById('buttsurveiller');

    infos_resume.close();
    activeLinkSurveillance();
}

function openSurveillance() {

    var id = document.getElementById('buttsurveiller');

    if (client.cors == true) {
        //infos_resume.setup(client_informations);
        infos_resume.setup(popup_surveillance_societe);

        infos_resume.open();
        inactiveLinkSurveillance();
    } else {
        redirectSurveillance();
    }
}

function init_client_informations() {
    var client_informations = document.getElementById('client_informations');
    var deno = document.getElementById('identite_deno').innerHTML.trim();
    var validMail = document.getElementById('identite_valid_mail');
    var champMail = document.getElementById('auth-email');
    var champPass = document.getElementById('auth-pass');
    var lostPass = document.getElementById('lost-pass');
    var lostPassError = document.getElementById('lost-pass-error');
    var clickclose = document.getElementById('client_infos_close');
    var clickclose2 = document.getElementById('client_infos_close2');

    var list = get_elementsbyclassname(client_informations, 'client_infos_deno');

    if ( list ) {

        for (var i = 0; i < list.length; i++) {
            list[i].innerHTML = deno;
        }
    }


    add_event(lostPass, "click", click_lost_pass);
    add_event(lostPassError, "click", click_lost_pass);
    add_event(clickclose, "click", function () {bar.manageclick('buttsurveiller');});
    add_event(clickclose2, "click", function () {bar.manageclick('buttsurveiller');});
    add_event(validMail, "click", click_valid_infos);
    add_event(champMail, "keyup", press_valid_infos);
    add_event(champPass, "keyup", press_valid_infos);
}

/* verification des chiffres dans le code de confirmation */
function only_numbers_surveillance(input, form) {
    if(isNaN(input.value)) {
        input.value = "";
        return
    } else {
        var digit1 = document.getElementById("digit-1").value,
            digit2 = document.getElementById("digit-2").value,
            digit3 = document.getElementById("digit-3").value,
            digit4 = document.getElementById("digit-4").value;

        if(digit1 === "" || digit2 === "" || digit3 === "" || digit4 === "") {
            auto_focus_next_input(input);
        } else {
            infos_resume.send_code();
        }     
    }
}

/* verifier si bloc surveillance ouvert au focus */
document.onfocus = function() {
    var watch = document.getElementById('client_informations');
    var codebloc = document.getElementById('client_send_code');

    if(watch != undefined && !watch.classList.contains('isHidden') && codebloc.classList.contains('isDisabled')) {
        var id = document.getElementById('buttsurveiller');
        
        bar.manageclick('buttsurveiller');
        remove_class(id, "identitebuttinactive");
        add_class(id, "identitebutt"); 
    }
}
/*function toggle_service_details(id) {
    var details = document.getElementById(id),
        link    = document.getElementById(id + '_link'),
        icon    = document.getElementById(id + '_icon');

    if(is_class_exist(details, 'open')) {
        remove_class(details, 'open');
    } else {
        add_class(details, 'open');
    }

    if(!is_class_exist(details, 'open')) {
        link.textContent = 'Voir les détails du service';
        icon.className = 'i-plus-2';
    } else {
        link.textContent = 'Masquer les détails du service';
        icon.className = 'i-minus-1';
    }

    // positionnement footer sous IE
    setTimeout(function() {
         footer_IE();
    }, 500);
}*/

function toggle_carto_details(id, cat) {

    var details = document.getElementById(id),
        link    = document.getElementById(id + '_link'),
        icon    = document.getElementById(id + '_icon');
   
      if ( !is_class_exist(details, 'open') ) {

        if ( cat == 'consult' ) {

            link.innerHTML  = '<span>Masquer les consultations</span>';
            link.innerHTML += '<i id="' + icon.id + '" class="material-icons-outlined">expand_less</i>';
        } else {

            link.innerHTML  = '<span>Masquer la légende</span>';
            link.innerHTML += '<i id="' + icon.id + '" class="material-icons-outlined">expand_less</i>';
        }

        add_class(details, "open");
    } else {

        if ( cat == 'consult' ) {

            link.innerHTML  = '<span>Voir les consultations</span>';
            link.innerHTML += '<i id="' + icon.id + '" class="material-icons-outlined">expand_more</i>';
        } else {

            link.innerHTML  = '<span>Voir la légende</span>';
            link.innerHTML += '<i id="' + icon.id + '" class="material-icons-outlined">expand_more</i>';
        }

        remove_class(details, "open");
    }
}

function active_token_help_display() {
    var url   = window.location.href,
        regex = /(actionapi=2)/g,
        help  = document.getElementById('active_token_help');

    if(regex.test(url)) {
        remove_class(help, 'isHidden');
    }
}

function hide_select_option_safari(device) {
    var select = document.getElementsByTagName('select');

    if(select) {
        for(var i = 0; i < select.length; i++) {
            for(var j = 0; j < select[i].options.length; j++) {
                if(detect_device() === device_type.DESKTOP) {
                    if(select[i].options[j].getAttribute('data-safari') === 'mobile_view') {
                        select[i].remove(j);
                    }
                } else {
                    if(select[i].options[j].getAttribute('data-safari') === 'desktop_view') {
                        select[i].remove(j);
                    }
                }
            }
        }
    }
}

function init_select_option_safari() {
    if(is_safari()){ 
        hide_select_option_safari();
    }
}

function copy_to_clipboard(id) {
    var success = document.getElementById('copied-token');

    document.getElementById(id).select();
    document.execCommand("copy");
    remove_class(success, 'isHidden');
}

function authorize_api_display() {
    var email        = document.getElementById('email-menu-fixe-compte-affiche'),
        regex        = new RegExp(/\w+(@societe.com)/, 'g'),
        apiService   = document.getElementById('api_service_container'),
        borderVeille = document.getElementById('border_veille');

    if(regex.test(email.textContent)) {
        remove_class(apiService, 'isHidden');
        add_class(borderVeille, 'pb-30');
    }
}/* ======================================= Contact Annuaire ================================ */


function asyncOpenContactCompany() {
    var id = document.getElementById('contactAnnuaire');
    var ca = document.getElementById('contactannuaire');
    if (typeof(openContactCompany) == "function") {
        add_class(ca, "isHidden");
        remove_class(ca, "isHidden");

        openContactCompany(adnext_cssmove)

        remove_class(id, "identitebutt");
        add_class(id, "identitebuttinactive");
    }
}

function asyncOpenContactCompanyDashboard(id) {

    var newId = id;
    var btn = document.getElementById('contactAnnuaire-' + newId);
    var ca = document.getElementById('contactannuaire-' + newId);

    if (typeof(openContactCompanyDashboard) == "function") {

        add_class(ca, "isHidden");
        remove_class(ca, "isHidden");

        openContactCompanyDashboard(newId);

        remove_class(btn, "identitebutt");
        add_class(btn, "identitebuttinactive");
    }
}

function asyncOpenContactCompanyDashboardMobile(id) {

    var newId = id;
    var ca = document.getElementById('contactannuaire-mobile-' + newId);

    if (typeof(openContactCompanyDashboard) == "function") {

        add_class(ca, "isHidden");
        remove_class(ca, "isHidden");

        openContactCompanyDashboard(newId);
    }
}

function asyncCloseLinkContactCompany() {
    var id = document.getElementById('contactAnnuaire');
    var ca = document.getElementById('contactannuaire');

    remove_class(id, "identitebuttinactive");
    add_class(id, "identitebutt");

    remove_class(ca, "isHidden");
    add_class(ca, "isHidden");
}

function asyncCloseLinkContactCompanyDashboard(id, context) {

    var btn = document.getElementById('contactAnnuaire-' + id);
    var ca = document.getElementById('contactannuaire-' + id);

    remove_class(btn, "identitebuttinactive");
    add_class(btn, "identitebutt");

    remove_class(ca, "isHidden");
    add_class(ca, "isHidden");

    show_society(id, context);
}

function asyncCloseLinkContactCompanyDashboardMobile(id, context) {

    var ca = document.getElementById('contain_contactannuaire_' + id);

    ca.style.display = "none";

    show_society(id, context);
}

function asyncCloseContactCompany() {
    var panel = document.getElementById('contact-company-panel-v2');

    if (typeof(closePopup) == "function") {
        if (panel) {
            closePopup("contact-company-panel-v2", asyncCloseLinkContactCompany);
        } else {
            asyncCloseLinkContactCompany();
        }
    }
}

function asyncCloseContactCompanyDashboard(id, context) {

    var panel = document.getElementById('contact-company-panel-v2');

    if (typeof(closePopup) == "function") {

        if (panel) {

            closePopup("contact-company-panel-v2", function() { asyncCloseLinkContactCompanyDashboard(id, context) });
        } else {

            asyncCloseLinkContactCompanyDashboard(id, context);
        }
    }
}

function asyncCloseContactCompanyDashboardMobile(id, context) {

    var panel = document.getElementById('contact-company-panel-v2');

    if (typeof(closePopup) == "function") {

        if (panel) {

            closePopup("contact-company-panel-v2", function() { asyncCloseLinkContactCompanyDashboardMobile(id, context) });
        } else {

            asyncCloseLinkContactCompanyDashboardMobile(id, context);
        }
    }
}

function asyncContactCompany() {

    sendContactCompany(bar.manageclick('contactAnnuaire'));
}

function ScriptLoader() {

    _that = this;
    this.list = [];
    this.scripts = [];
    this.currScript = undefined;
    this.callback = undefined;
    this.currTimeout = 0;
    this.timeout = 50;
    this.timeoutMax = 5000;

    this.init = init;
    this.addScript = addScript;
    this.addCallback = addCallback;
    this.run = run;
    this.loadNextScript = loadNextScript;

    function init() {
        this.list = [];
        this.scripts = [];
        this.currScripts = undefined;
        this.callback = undefined;
        this.currTimeout = 0;
        this.timeout = 50;
        this.timeoutMax = 5000;
    }

    function addScript(scr) {
        this.list.push(scr);
    }

    function addCallback(callback) {
        this.callback = callback;
    }

    function run() {
        this.loadNextScript();
    }

    function loadNextScript() {
        if (typeof(this.currScript) != "undefined") {
            if (typeof(window[this.currScript.hint]) == "undefined") {
                if (this.currTimeout >= this.timeoutMax) {
                    return;
                }
                this.currTimeout += this.timeout;
                setTimeout(function() {_that.loadNextScript();}, this.timeout);
                return;
            }
        }
        this.currTimeout = 0;

        if (this.list.length == 0) {
            this.callback();
            return;
        }

        var script = document.createElement("script");
        this.currScript = this.list.shift();
        script.src = this.currScript.src;
        document.body.parentNode.appendChild(script);
        this.scripts.push(script);

        if (("load" in script) || ("onload" in script)) {
            add_event(script, "load", function() {_that.loadNextScript()});
        }
        if (("readystatechange" in script) || ("onreadystatechange" in script)) {
            add_event(script, "readystatechange", function() {_that.loadNextScript()});
        }
    }

    this.init();
}

function annuaireLoader() {

    if ($('#pQuestion').maxlength) {
        $('#pQuestion').maxlength  = 500;
    }
    mbPopSelect.init($('#aboutementPopups'));


    if (typeof(asyncOpenContactCompany) == "function") {

        asyncOpenContactCompany();
    }
}

function annuaireLoaderDashboard(id, context) {

    if ($('#pQuestion').maxlength) {
        $('#pQuestion').maxlength  = 500;
    }
    mbPopSelect.init($('#aboutementPopups'));

    if ( context == undefined && typeof(asyncOpenContactCompanyDashboard) == "function") {

        asyncOpenContactCompanyDashboard(id);
    } else if ( context != undefined && typeof(asyncOpenContactCompanyDashboardMobile) == "function") {

        asyncOpenContactCompanyDashboardMobile(id);
    }
}

var annLoader = new ScriptLoader();

function displayContactAnnuaire() {
    if (typeof(openContactCompany) != "function") {
        annLoader.addScript({ "src" : '/scripts/jquery-1.4.4.min.js', "hint" : "jQuery"});
        annLoader.addScript({ "src" : '/scripts/jquery.txtLimiter.js', "hint" : "jQuery"});
        annLoader.addScript({ "src" : '/scripts/mbpopup.js', "hint" : "mbPopSelect"});
        annLoader.addScript({ "src" : '/scripts/annubox.js', "hint" : "openContactCompany"});

        annLoader.addCallback(annuaireLoader);
        annLoader.run();
    } else {
        asyncOpenContactCompany();
    }
}

function displayContactAnnuaireDashboard(id, context) {

    if (typeof(openContactCompanyDashboard) != "function") {

        annLoader.addScript({ "src" : '/scripts/jquery-1.4.4.min.js', "hint" : "jQuery"});
        annLoader.addScript({ "src" : '/scripts/jquery.txtLimiter.js', "hint" : "jQuery"});
        annLoader.addScript({ "src" : '/scripts/mbpopup.js', "hint" : "mbPopSelect"});
        annLoader.addScript({ "src" : '/scripts/annubox.js', "hint" : "openContactCompany"});

        if ( context == undefined ) {
            annLoader.addCallback(function() { annuaireLoaderDashboard(id) });
        } else {
            annLoader.addCallback(function() { annuaireLoaderDashboard(id, "mobile") });
        }
        
        annLoader.run();
    } else {

        if ( context == undefined ) {
            asyncOpenContactCompanyDashboard(id);
        } else {
            asyncOpenContactCompanyDashboardMobile(id);
        }
        
    }
}/* =========== GESTION FORMULAIRE CONTACTE ================ */

function urlencodeISO(str) {
    var entities = new Array(
        {char:"%", entite:"%25"},
        {char:"&", entite:"%26"},
        {char:"+", entite:"%2B"},
        {char:"=", entite:"%3D"},
        {char:"?", entite:"%E1"},
        {char:"?", entite:"%E2"},
        {char:"?", entite:"%E4"},
        {char:"?", entite:"%E7"},
        {char:"?", entite:"%E8"},
        {char:"?", entite:"%E9"},
        {char:"?", entite:"%EA"},
        {char:"?", entite:"%EB"},
        {char:"?", entite:"%EE"},
        {char:"?", entite:"%EF"},
        {char:"?", entite:"%F9"},
        {char:"?", entite:"%FB"},
        {char:"?", entite:"%FC"},
        {char:" ", entite:"+"}
    );

    entities.forEach(function(elem) {
        old = "";
        
        while (old != str) {
            old = str;
            str = old.replace(elem.char, elem.entite);
        }
    });

    return str;
}

function init_contact_form() {
    var select = document.getElementById('select');

    var options = new Array(
        {name: "commande", desc: "Commande non-livrée"},
        {name: "fiche", desc: "Signaler une erreur"},
        {name: "informations-commerciales", desc: "Informations commerciales"},
        {name: "remboursement", desc: "Abonnements et achats"},
        {name: "bilan", desc: "Mon bilan n'est pas à jour"},
        {name: "partenariat", desc: "Demande de partenariat / Presse"},
        {name: "inscription", desc: "Inscription / connexion à mon compte", class: "show-mobile-s", safari: "desktop_view"},
        {name: "inscription", desc: "Inscription / connexion compte", class: "hide-mobile-s", safari: "mobile_view"},
        {name: "support", desc: "Bug / Suggestion / Support technique", class: "show-mobile-s", safari: "desktop_view"},
        {name: "support", desc: "Bug / Suggestion / Support tech", class: "hide-mobile-s", safari: "mobile_view"}
    );

    if (select) {
        options.forEach(function(elem) {
            var opt = document.createElement("option");
            opt.value = elem.name;
            opt.innerText = elem.desc;
            if(elem.class){ opt.className = elem.class; } 
            if(elem.safari){ opt.setAttribute('data-safari', elem.safari); }
            select.appendChild(opt);
        });

        add_event(select, "change", function() {
            if (this.value && this.value != "") {
                send_query("/pages/view-contact-" + this.value + ".html", function(req) {
                    var contact = document.getElementById('contact-form');

                    if (contact && req.readyState == 4 && req.status == 200) {
                        contact.innerHTML = req.responseText;

                        /* Gestion des placeholders */
                        var contactForm = get_elementsbyclassname(contact, 'Form');

                        if(contactForm.length != 0) {
                            for(var i = 0; i < contactForm[0].elements.length; i++) {
                                var getPlaceholder = contactForm[0].elements[i].getAttribute('placeholder');

                                event_input(contactForm[0].elements[i], getPlaceholder);

                                add_event(contactForm[0].elements[i], 'blur', function(){
                                    if(this.value != '') {
                                        add_class(this, 'filled');
                                    } else {
                                        remove_class(this, 'filled');
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    }
}

function submit_contact_form() {
    var select = document.getElementById('select');
    var form = document.getElementById('contact-form');
    var btn = document.getElementById('submit-contact-form');

    if (!btn || is_class_exist(btn, 'isDisabled')) {
        return;
    }

    add_class(document.getElementById('form-contact-confirm'), "isHidden");
    add_class(document.getElementById('form-contact-error'), "isHidden");

    if (form && select && select.value != "") {
        var inputs = form.getElementsByTagName('form')[0].elements;

        //serialize
        var data = ""
        var err = 0;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == '') {
                set_input_error(inputs[i].id, true);
                err++;
                continue
            }

            if (data !== "") {
                data += "&";
            }

            data += inputs[i].name + "=" + urlencodeISO(inputs[i].value) ;
        }

        if (err > 0) {
            return;
        }

        var xhr = getXhr();
        xhr.open("POST", '/cgi-bin/contact-send?page=' + select.value, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                add_class(document.getElementById('submit-contact-progress'), "isHidden");
                if (xhr.status == 200) {
                    remove_class(document.getElementById('form-contact-confirm'), "isHidden");
                } else {
                    remove_class(btn, 'isDisabled');
                    if (xhr.status == 400) {
                        var objRes = JSON.parse(xhr.responseText);
                        for (var i in objRes) {
                            set_input_error(i, true);
                        }
                    } else {
                        remove_class(document.getElementById('form-contact-error'), "isHidden");
                    }
                }
            }
        };
        add_class(btn, 'isDisabled');
        remove_class(document.getElementById('submit-contact-progress'), "isInvisible");
        xhr.send(data);
    }
}

function check_input(elem) {
    if (elem) {
        set_input_error(elem.id, elem.value.length == 0);
    }
}

function set_input_error(i, val) {
    var elemerr = document.getElementById("result-" + i);
    var elem    = document.getElementById(i);

    if (elemerr && elem) {
        if (val == true) {
            add_class(elem, "red-border");
            add_class(elemerr, "no-info");
        } else {
            remove_class(elem, "red-border");
            remove_class(elemerr, "no-info");
        }
    }
}
/********************************************************/
/******************** COOKIES ***************************/
/********************************************************/
/* variable pour position modale cachee */
var positionModale = 0;

/* position modale gestion cookies */
function position_modale_cookies() {

    var hauteurFenetre = window.innerHeight;
    var modaleCookies  = document.getElementById("cookiesmodale-content");

    /* adaptation hauteur modale a la hauteur de la fenetre */
    if ( hauteurFenetre <= 647) {
        modaleCookies.style.height = (hauteurFenetre - 20) + "px";
    } else {
        modaleCookies.style.height = "627px";
    }

    /* positionnement modale isHidden en fonction hauteur de la fenetre */
    var modaleCookies          = document.getElementById("cookiesmodale");
    var hauteurModaleCookies   = modaleCookies.style.height;
        hauteurModaleCookies   = parseFloat(hauteurModaleCookies.replace("px", ""));
        positionModale         = (hauteurFenetre - hauteurModaleCookies) / 2;
        positionModale         = hauteurModaleCookies + positionModale;

    modaleCookies.style.transform = "translate(0,-" + positionModale + "px)";
}

var modaleopentime=0;
/* ouverture modale gestion cookies */
function open_modale_cookies() {

    var hauteurFenetre   = window.innerHeight;
    var cookieBan        = document.getElementById("cookiesmodale");
    var cookieBanContent = document.getElementById("cookiesmodale-content");
    var cookieText       = document.getElementById("choix-cookies");

    var d = new Date();
    modaleopentime = d.getTime();

    gana_event(null, 'modale_cookies', 'open');

    /* faire apparaitre modale */
    cookieBan.style.transform = "translate(0,0)";

    /* ouverture modale */
    remove_class(cookieBan, 'isHidden');
    document.body.style.overflow = "hidden";

    /* recup version mentions legales */
    version_cookies();

    /* btn accepter/refuser tous les cookies */
    choix_all_cookies();

    /* choix cookies */
    cookiePub();
    cookieAnalytics();
    cookieSociaux();

    /* positionner le scroll en haut de la modale (si deja ouverte avant) */
    /* cookieBanContent.scrollTo(0,0); */
}

/* fermeture modale gestion cookies */
function close_modale_cookies() {

    var cookieBan  = document.getElementById("cookiesmodale");
    var d = new Date();
    var modaletime = parseInt((d.getTime() - modaleopentime) / 1000);

    var s = modaletime + "";
    while (s.length < 3) {
        s = "0" + s;
    }
        
    gana_event(null, 'modale_cookies', 'close_' + s);

    /* si page gestion des cookies -> redirection vers homepage */
    if (document.URL.indexOf("cookie-esp") != -1) {

        document.location.href="../index.html";
        return;
    }

    add_class(cookieBan, 'isHidden');
    document.body.style.overflow = "";

    /* positionnement modale isHidden en fonction hauteur de la fenetre */
    cookieBan.style.transform = "translate(0,-" + positionModale + "px)";
}

/* gestion affichage modale cookies */
function manage_cookies() {

    /* si page gestion des cookies ->  */
    if (document.URL.indexOf("cookie-esp") != -1) {

        /* css speciale pour le body */
        add_class(document.body, 'table');

        /* ouverture modale automatiquement */
        open_modale_cookies();
    }

    var cookiePub       = readCookie('soccookiepub');
    var cookieAnalytics = readCookie('soccookieanalytics');
    var cookieSociaux   = readCookie('soccookiesociaux');
    var cookieBan       = document.getElementById("cookiesbanner");
    var cookieText      = document.getElementById("cookietext");

    /* si variables contenant version cookies en BO n'existent pas -> ne pas afficher de banniere */
    if ( lastversion_cookiepub < 0 || lastversion_cookieanalytics < 0 || lastversion_cookiesociaux < 0 ) {
        gana_event(null, "modale", "not open");
        return;
    }

    /* s'il manque au moins un cookie ou au moins un cookie obsolete */
    if ( !cookiePub || !cookieAnalytics || !cookieSociaux || !compareVersionCookie('soccookiepub') || !compareVersionCookie('soccookieanalytics') || !compareVersionCookie('soccookiesociaux') ) {

        /* afficher la modale gestion des cookies */
        open_modale_cookies();
    } else {
        if (document.URL.indexOf("cookie-esp") == -1) {
            gana_event(null, 'modale_cookies', 'not open');
        }
    }

    /* au resize de la fenetre -> reajuster position modale */
    add_event(window, "resize", position_modale_cookies);
}/********************************************************/
/************** HISTORIQUE DES DONNEES ******************/
/********************************************************/

/* afficher historique des donnees */
function show_historique_donnees(idElement) {
    
    var idBase        = idElement.substring(0, (idElement.length - 4));
    var idDescription = idBase + "description";
    var idLibelle     = idBase + "libelle";
    var idContent     = idBase + "content";
    var idAround      = idBase + "around";
    var parts         = document.getElementById(idContent).getElementsByClassName("histo-part");
    var items         = document.getElementById(idContent).getElementsByClassName("FicheDonnees__item");
    var picto         = document.getElementById(idElement).getElementsByClassName("Lien")[0].getElementsByClassName("material-icons-outlined")[0];

    /* si histo ferme */
    if ( is_class_exist(document.getElementById(idContent), 'noOpacity') ) {

        /* changer le picto */
        picto.innerHTML = "expand_less";

        /* cacher les items > 4 */
        count_items_historique_donnees(idBase);

        /* cacher description et afficher historique */
        add_class(document.getElementById(idElement), "open");
        add_class(document.getElementById(idDescription), "isHidden");
        remove_class(document.getElementById(idLibelle), "isHidden");
        remove_class(document.getElementById(idContent), "noOpacity");

        /* si voir plus existe le laisser visible */
        for ( var y = 0; y < items.length; y++) {

            var itemId = items[y].getAttribute("id");

            if ( itemId && itemId.indexOf("-plus") != -1 ) {
 
                remove_class(document.getElementById(itemId), "isHidden");
                remove_class(document.getElementById(itemId), "noOpacity");
            }
        }

        /* gana_event */
        var cat = idBase.substring(0, (idBase.length - 7));

        if ( is_class_exist(document.getElementById(idElement), 'voirPlus') ) {

            gana_event(null, 'Conversion', 'SocietePlus', 'VoirHisto' + cat + '');
        }

        if ( is_class_exist(document.getElementById(idElement), 'donneesPlus') ) {

            gana_event(null, 'SocietePlus', 'Histo', cat);
        }

        /* hauteur de la ligne histo */
        var items  = document.getElementById(idContent).getElementsByClassName("FicheDonnees__item");
        var height = 0;

        for ( var i = 0; i < items.length; i++) {

            if ( !is_class_exist(items[i], 'noOpacity') ) {

                height += items[i].offsetHeight;
            }
        }

        height_historique_donnees(idAround, height);

        /* fermeture histo au resize */
        add_event(window, "resize", function () {
            close_histo_resize(idBase);
        });
    }
    /* si histo ouvert */
    else {

        /* changer le picto */
        picto.innerHTML = "expand_more";

        document.getElementById(idDescription).style.opacity = 0;
        document.getElementById(idDescription).style.position = "absolute";
        remove_class(document.getElementById(idDescription), "isHidden");

        /* hauteur de la ligne histo */
        var height = document.getElementById(idDescription).offsetHeight;

        height_historique_donnees(idAround, height);

        /* cacher historique et afficher description */
        remove_class(document.getElementById(idElement), "open");
        remove_class(document.getElementById(idDescription), "isHidden");
        document.getElementById(idDescription).style.opacity = "";
        document.getElementById(idDescription).style.position = "";
        add_class(document.getElementById(idLibelle), "isHidden");
        add_class(document.getElementById(idContent), "noOpacity");

        /* cacher les items > 4 */
        count_items_historique_donnees(idBase);

        /* si voir plus existe le laisser visible */
        for ( var y = 0; y < items.length; y++) {

            var itemId = items[y].getAttribute("id");

            if ( itemId && itemId.indexOf("-plus") != -1 ) {

                remove_class(document.getElementById(itemId), "isHidden");
                remove_class(document.getElementById(itemId), "noOpacity");
            }
        }
    }
}

/* fermeture histo au resize */
function close_histo_resize(idBase) {
    
    var contentId  = idBase + "content";
    var voirPlusId = idBase + "voir";

    /* seulement si histo ouvert */
    if ( !is_class_exist(document.getElementById(contentId), 'noOpacity') ) {

        show_historique_donnees(voirPlusId);
    }
}

/* determiner si 1 ou 2 histo dans lesquels cacher les items > 4 */
function count_items_historique_donnees(idBase) {

    var cibleId = idBase + "content";
    var cible   = document.getElementById(cibleId);
    var parts   = cible.getElementsByClassName("histo-part");

    /* si 1 seul histo */
    if ( parts.length == 0) {
        
        hide_items_historique_donnees(cibleId);

    }
    /* si 2 histo */
    else {

        for ( var i = 0; i < parts.length; i++) {

            cibleId = parts[i].getAttribute("id");

            hide_items_historique_donnees(cibleId, idBase);
        }

        /* inserer le btn switch */
        insert_btn_switch_historique_donnees(idBase);
    }
}

/* cacher les items > 4 */
function hide_items_historique_donnees(cibleId, idBase) {

    var cible  = document.getElementById(cibleId);
    var items  = cible.getElementsByClassName("FicheDonnees__item");

    if ( !idBase ) {

        var idBase = cibleId.substring(0, (cibleId.length - 7));
    }

    /* si 1 seul item dans histo */
    if ( (items.length) == 1 ) {

        /* mise en forme de la timeline */
        var itemLast     = items[0];
        var timelineLast = itemLast.getElementsByClassName("FicheDonnees__timeline")[0];

        add_class(timelineLast, "alone");

        /* positionner le bloc autopromo */
        if ( is_class_exist(document.getElementById(idBase + "content"), 'nocompteplus') ) {

            add_class(cible, "lessItems");
            
            /* si 2 histo */
            if ( cibleId.indexOf("src-rcs") != -1 || cibleId.indexOf("src-insee") != -1 ) {

                /* agir uniquement pour l'histo visible */
                if ( !is_class_exist(cible, 'isHidden') ) {

                    /* ajouter lessItems sur le content */
                    add_class(cible.parentNode, "lessItems");
                }
            }
        }
    }
    /* si + de 4 items dans histo */
    else if ( items.length > 4 ) {

        /* cacher les items > 4 */
        for ( var i = 4; i < items.length; i++) {

            add_class(items[i], "noOpacity");
        }

        /* inserer lien voir plus */
        insert_voir_plus_historique_donnees(cibleId, idBase);

        /* mise en forme fin de la timeline */
        var itemLast     = items[3];
        var timelineLast = itemLast.getElementsByClassName("FicheDonnees__timeline")[0];

        add_class(timelineLast, "continued");

        /* positionner le bloc autopromo */
        if ( is_class_exist(cible, 'nocompteplus') ) {
            remove_class(cible, "lessItems");
        }
    }
    else {

        /* mise en forme fin de la timeline */
        var itemLast     = items[items.length - 1];
        var timelineLast = itemLast.getElementsByClassName("FicheDonnees__timeline")[0];

        add_class(timelineLast, "last");

        /* positionner le bloc autopromo */
        if ( is_class_exist(document.getElementById(idBase + "content"), 'nocompteplus') ) {

            if ( items.length == 4 ) {

                remove_class(cible, "lessItems");
            } else {

                add_class(cible, "lessItems");
            
                /* si 2 histo */
                if ( cibleId.indexOf("src-rcs") != -1 || cibleId.indexOf("src-insee") != -1 ) {

                    /* agir uniquement pour l'histo visible */
                    if ( !is_class_exist(cible, 'isHidden') ) {

                        /* ajouter lessItems sur le content */
                        add_class(cible.parentNode, "lessItems");
                    }
                }
            }
        }
    }
}

/* inserer le lien voir plus d'items */
function insert_voir_plus_historique_donnees(cibleId, idBase) {

    var cible       = document.getElementById(cibleId);
    var items       = cible.getElementsByClassName("FicheDonnees__item");
    var text        = "";
    var detailHisto = "";
    if (cibleId.indexOf("rcs") != -1 ) {

        detailHisto = "rcs";
    } else {

        detailHisto = "insee";
    }

    /* inserer le voir plus seulement si pas deja fait */
    if ( !document.getElementById(idBase + "plus-" + detailHisto)  ) {

        /* wording du lien */
        if ( cibleId.indexOf("catjur") != -1 ) {

            text = "Voir toutes les formes juridiques";
        } else if ( cibleId.indexOf("ape") != -1 ) {

            text = "Voir toutes les activités";
        } else if ( cibleId.indexOf("effmoy") != -1 ) {

            text = "Voir tous les effectifs moyens";
        } else if ( cibleId.indexOf("trancheeff") != -1 ) {
            
            text = "Voir toutes les tranches d'effectifs";
        } else if ( cibleId.indexOf("capital") != -1 ) {
            
            text = "Voir tous les capitaux";
        }

        /* construire le lien */
        var voirPlus = document.createElement('div');
        var content  = '<div class="FicheDonnees__date"></div>';
            content += '<div class="FicheDonnees__timeline"></div>';
            content += '<div class="FicheDonnees__description">';
            content += '<div class="Lien with picto"><span>' + text + '</span><i class="material-icons-outlined">expand_more</i></div>';
            content += '</div>';

        voirPlus.innerHTML = content;
        voirPlus.setAttribute("class", "FicheDonnees__item");
        voirPlus.setAttribute("id", idBase + "plus-" + detailHisto);

        /* inserer le lien */
        cible.insertBefore(voirPlus, items[4]);

        /* attribuer le onclick selon le nb d'histo */
        var cibleOnclick = document.getElementById(idBase + "plus-" + detailHisto);
            cibleOnclick = cibleOnclick.getElementsByClassName("FicheDonnees__description")[0];

        if ( cibleId == (idBase + "content") ) { /* un seul histo */

            var setOnClick = 'show_items_historique_donnees(this, \'' + cibleId + '\');';

        } else { /* plusieurs histo */

            var setOnClick = 'show_items_historique_donnees_severals(this, \'' + cibleId + '\');';
        }

        cibleOnclick.setAttribute("onclick", setOnClick);
    }
}

/* inserer le btn switch */
function insert_btn_switch_historique_donnees(idBase) {

    var cibleId   = idBase + "content";
    var cible     = document.getElementById(cibleId);
        cible     = cible.parentNode;
    var btnSwitch = document.createElement('div');
    var content   = '<div class="FicheDonnees__date"></div>';
        content  += '<div class="FicheDonnees__timeline"></div>';
        content  += '<div class="FicheDonnees__description">';
        content  += '<div class="switch">';
        content  += '<div class="bg"></div>';
        content  += '<div class="text">';
        content  += '<div id="' + idBase + 'src-rcs" class="src-switch src-rcs" onclick="work_btn_switch_historique_donnees(this, \'' + idBase + '\');">Source RCS</div>';
        content  += '<div id="' + idBase + 'src-insee" class="src-switch src-insee" onclick="work_btn_switch_historique_donnees(this, \'' + idBase + '\');">Source INSEE</div>';
        content  += '</div>';
        content  += '</div>';
        content  += '</div>';

    btnSwitch.innerHTML = content;
    btnSwitch.setAttribute("class", "FicheDonnees__item btn-switch");
    btnSwitch.setAttribute("id", idBase + "switch");

    /* verif si btn switch existe avant de l'inserer */
    if ( !document.getElementById(idBase + "switch") ) {

        cible.appendChild(btnSwitch);
    }

    /* mise en page btn switch */
    personnalize_btn_switch_historique_donnees(idBase);
}

/* mise en page btn switch */
function personnalize_btn_switch_historique_donnees(idBase) {

    var around    = document.getElementById(idBase + "around");
    var srcRcs    = document.getElementById(idBase + "src-rcs");
    var srcInsee  = document.getElementById(idBase + "src-insee");

    /* si src RCS en premier */
    if ( is_class_exist(around, 'imrFirst') ) {

        add_class(srcRcs, "isFocus");
    }
    /* si src INSEE en premier */
    if ( is_class_exist(around, 'inseeFirst') ) {

        add_class(srcInsee, "isFocus");
        add_class(around.getElementsByClassName("bg")[0], "isInsee");
    }
    /* si pas de src RCS */
    if ( is_class_exist(around, 'noDataImr') ) {

        add_class(around.getElementsByClassName('switch')[0], "isDesactive");
        add_class(srcRcs, "isDesactive");
    }
    /* si pas de src INSEE */
    if ( is_class_exist(around, 'noDataInsee') ) {

        add_class(around.getElementsByClassName('switch')[0], "isDesactive");
        add_class(srcInsee, "isDesactive");
    }
}

/* initialiser le fonctionnement du btn switch */
function work_btn_switch_historique_donnees(element, idBase) {

    var bg = element.parentNode.parentNode;
        bg = bg.getElementsByClassName("bg")[0];

    /* ne pas agir sur src desactivee */
    if ( is_class_exist(element, 'isDesactive') ) {
        return;
    }

    /* ne pas agir sur src deja focus */
    if ( is_class_exist(element, 'isFocus') ) {
        return;
    }

    /* effectuer le switch */
    if ( !is_class_exist(element, 'isFocus') ) {

        add_class(element, "isFocus");

        /* click sur src RCS --> definition des elements */
        if ( element.getAttribute("id") == idBase + "src-rcs" ) {

            var originId             = idBase + "content-src-insee";
            var destinationId        = idBase + "content-src-rcs";
            var focusSwitchId        = idBase + "src-insee";

            remove_class(document.getElementById(idBase + "around"), "inseeFirst");
            add_class(document.getElementById(idBase + "around"), "imrFirst");

            /* repositionner le bloc autopromo si 1 a 3 items  */
            if ( is_class_exist(document.getElementById(destinationId), 'lessItems') ) {

                add_class(document.getElementById(destinationId).parentNode, "lessItems");
            } else {

                remove_class(document.getElementById(destinationId).parentNode, "lessItems");
            }
        }
        /* click sur src INSEE --> definition des elements */
        else if ( element.getAttribute("id") == idBase + "src-insee" ) {

            var originId             = idBase + "content-src-rcs";
            var destinationId        = idBase + "content-src-insee";
            var focusSwitchId        = idBase + "src-rcs";

            remove_class(document.getElementById(idBase + "around"), "imrFirst");
            add_class(document.getElementById(idBase + "around"), "inseeFirst");

            /* repositionner le bloc autopromo si 1 a 3 items  */
            if ( is_class_exist(document.getElementById(destinationId), 'lessItems') ) {
                
                add_class(document.getElementById(destinationId).parentNode, "lessItems");
            } else {

                remove_class(document.getElementById(destinationId).parentNode, "lessItems");
            }
        }

        /* changer le libelle dans l'entete de la ligne */
        var firstItem    = document.getElementById(destinationId).getElementsByClassName("FicheDonnees__item")[0];
        var firstLibelle = firstItem.getElementsByClassName("description-txt")[0];
        var description  = document.getElementById(idBase + "description");

        description.innerHTML = firstLibelle.innerHTML;

        /* modif switch */
        remove_class(document.getElementById(focusSwitchId), "isFocus");
        if ( destinationId == idBase + "content-src-insee" ) {

            add_class(bg, "isInsee");
        } else {

            remove_class(bg, "isInsee");
        }

        /* afficher contenu src */
        remove_class(document.getElementById(destinationId), "isHidden");
        add_class(document.getElementById(originId), "isHidden");

        /* calcul la hauteur de la ligne */
        var cible   = idBase + "around";
        var libelle = idBase + "libelle";

        /* hauteur de la ligne histo */
        var items  = document.getElementById(destinationId).getElementsByClassName("FicheDonnees__item");
        var height = document.getElementById(libelle).offsetHeight;

        for ( var i = 0; i < items.length; i++) {

            if ( !is_class_exist(items[i], 'noOpacity') ) {

                height += items[i].offsetHeight;
            }
        }

        /* adapter la hauteur de la ligne */
        height_historique_donnees(cible, height, "work_btn_switch_historique_donnees");

        /* gana_event */
        var category     = idBase.substring(0, (idBase.length - 7));
        var firstLetter  = (category.substring(0, 1)).toUpperCase();
        var otherLetters = category.substring(1, category.length);
            category     = firstLetter + otherLetters;

        gana_event(null, 'SocietePlus', 'Histo', 'switch' + category);
    }
}

/* afficher les items caches si 1 seul historique */
function show_items_historique_donnees(element, cible) {

    var content = document.getElementById(cible);
    var items   = content.getElementsByClassName("FicheDonnees__item");
    var height  = 0;

    for ( var i = 0; i < items.length; i++) {

        if ( is_class_exist(items[i], 'noOpacity') ) {

            remove_class(items[i], "noOpacity");

            height += parseInt(items[i].offsetHeight);
        }
    }

    /* hauteur de la ligne histo */
    var idAround = cible.substring(0, (cible.length - 7));
        idAround = idAround + "around";

    height = height - (element.parentNode.offsetHeight); /* enlever la hauteur du lien voir plus qui va etre mis en display: none */
    height_historique_donnees(idAround, height, "show_items_historique_donnees");

    /* cacher le voir plus */
    add_class(element.parentNode, "isHidden");

    /* cacher la mise en forme de la fin de la timeline sur le 3e item */
    var itemLast     = items[3];
    var timelineLast = itemLast.getElementsByClassName("FicheDonnees__timeline")[0];

    remove_class(timelineLast, "continued");

    /* ajouter la mise en forme fin de la timeline sur le dernier item */
    var itemLastNew     = items[(items.length - 1)]; /* -1 = ne pas compter l'item afficher plus */
    var timelineLastNew = itemLastNew.getElementsByClassName("FicheDonnees__timeline")[0];

    add_class(timelineLastNew, "last");
}

/* afficher les items caches si plusieurs historiques */
function show_items_historique_donnees_severals(element, cible, step) {

    var content = document.getElementById(cible);
    var items   = content.getElementsByClassName("FicheDonnees__item");
    var height  = 0;

    for ( var i = 0; i < items.length; i++) {

        if ( is_class_exist(items[i], 'noOpacity') ) {

            remove_class(items[i], "noOpacity");

            height += parseInt(items[i].offsetHeight);
        }
    }

    /* hauteur de la ligne histo */
    var idAround = content.parentNode.parentNode.getAttribute("id");

    height = height - (element.parentNode.offsetHeight); /* enlever la hauteur du lien voir plus qui va etre mis en display: none */
    height_historique_donnees(idAround, height, "show_items_historique_donnees");

    /* cacher le voir plus */
    add_class(element.parentNode, "isHidden");

    /* cacher la mise en forme de la fin de la timeline sur le 3e item */
    var itemLast     = items[3];
    var timelineLast = itemLast.getElementsByClassName("FicheDonnees__timeline")[0];

    remove_class(timelineLast, "continued");

    /* ajouter la mise en forme fin de la timeline sur le dernier item */
    var itemLastNew     = items[(items.length-1)]; /* -1 = ne pas compter l'item afficher plus */
    var timelineLastNew = itemLastNew.getElementsByClassName("FicheDonnees__timeline")[0];

    add_class(timelineLastNew, "last");

    /* faire la meme chose pour le 2e histo en isHidden */
    if ( !step ) {

        /* initialisation parametres si src rcs affichee */
        if ( cible.indexOf("rcs") != -1 ) {

            var idBase     = cible.substring(0, (cible.length - 15));
            var newCible   = idBase + "content-src-insee";
            var newElement = idBase + "plus-insee";
        }
        /* initialisation parametres si src insee affichee */
        else if ( cible.indexOf("insee") != -1 ) {

            var idBase     = cible.substring(0, (cible.length - 17));
            var newCible   = idBase + "content-src-rcs";
            var newElement = idBase + "plus-rcs";
        }

        newElement = document.getElementById(newElement);

        /* afficher les items de l'histo cache s'il y en a */
        if (newElement) {

            newElement = newElement.getElementsByClassName("FicheDonnees__description")[0];

            show_items_historique_donnees_severals(newElement, newCible, "step2");
        }
    }
}

/* hauteur de la ligne histo */
function height_historique_donnees(cible, height, origin) {

    /* attribuer hauteur au chargement de la page */
    if ( !cible ) {

        var histo = document.getElementsByClassName("FicheDonnees");

        for ( var i = 0; i < histo.length; i++) {

            var heightOrigine = histo[i].offsetHeight;

            histo[i].parentNode.style.height = heightOrigine + "px";
        }
    }
    /* attribuer nouvelle hauteur suite a l'ouverture/fermeture de l'histo */
    else {

        var heightOrigine = document.getElementById(cible).style.height;
            heightOrigine = heightOrigine.substring(0, (heightOrigine.length - 2));
        var idBase        = cible.substring(0, (cible.length - 6));
        var content       = cible.substring(0, (cible.length - 6));
            content       = content + "content";
        var btnSwitch     = document.getElementById(idBase + "switch");
        var switchHeight  = 0;

        /* agrandissement de la ligne */
        if ( parseInt(heightOrigine) < parseInt(height) ) {

            /* switch d'un histo a l'autre */
            if ( origin && origin == "work_btn_switch_historique_donnees") {

                var heightNew = parseInt(height);

                /* si btn switch existe -> prendre en compte sa hauteur */
                if ( btnSwitch ) {

                    switchHeight = 45; /* 21 = hauteur du btn switch / 24 = margin-top du btn switch */
                }

                /* combiens d'items visibles */
                var histos = document.getElementById(content).getElementsByClassName("histo-part");
                var histoVisible = "";

                for ( var i = 0; i < histos.length; i++) {

                    if ( !is_class_exist(histos[i], 'isHidden') ) {

                        histoVisible = histos[i].getAttribute("id");
                    }
                }

                var items = document.getElementById(histoVisible).getElementsByClassName("FicheDonnees__item");

                /* si 1 et 2 items */
                if ( items.length < 3 ) {

                    heightNew = heightNew + 173; /* 173 = min height du content s'il y a un bloc autopromo */
                }
                /* si 3 items */
                else {

                    heightNew = heightNew + switchHeight; /* 173 = min height du content s'il y a un bloc autopromo */
                }

                document.getElementById(cible).style.height = heightNew + "px";
            }
            /* afficher plus d'items */
            else if ( origin && origin == "show_items_historique_donnees" ) {

                var heightNew = parseInt(heightOrigine) + parseInt(height);

                document.getElementById(cible).style.height = heightNew + "px";
            }
            /* ouverture histo */
            else {

                /* si tr d'origine sur plusieurs lignes */
                if ( heightOrigine > 18 ) {

                    var heightOrigine = parseInt(heightOrigine) - ( heightOrigine - 18 );
                }

                /* si btn switch existe -> prendre en compte sa hauteur en desktop */
                if ( btnSwitch ) {

                    switchHeight = 45; /* 21 = hauteur du btn switch / 24 = margin-top du btn switch */
                    btnSwitch.style.width = "";
                    btnSwitch.style.opacity = "";
                }

                /* donnner hauteur min si pas abonne -> place pour afficher bloc autopromo */
                if ( is_class_exist(document.getElementById(content), 'nocompteplus') ) {

                    /* si 1 a 3 items */
                    if ( is_class_exist(document.getElementById(content), 'lessItems') ) {

                        /* sur desktop */
                        if (  window.innerWidth >= 850 ) {

                            /* verif si plusieurs histo */
                            var histos = document.getElementById(content).getElementsByClassName("histo-part");

                            for ( var i = 0; i < histos.length; i++) {

                                if ( !is_class_exist(histos[i], 'isHidden') ) {

                                    var histoVisible = histos[i].getAttribute("id");
                                }
                            }

                            /* si 2 histos */
                            if ( histoVisible ) {

                                /* combiens d'items visibles */
                                var items = document.getElementById(histoVisible).getElementsByClassName("FicheDonnees__item");
                            }
                            /* si 1 histo */
                            else {

                                /* combiens d'items visibles */
                                var items = document.getElementById(content).getElementsByClassName("FicheDonnees__item");
                            }

                            /* si 1 et 2 items */
                            if ( items.length < 3 ) {

                                var heightNew = parseInt(heightOrigine) + 173; /* 173 = min height du content s'il y a un bloc autopromo */
                            }
                            /* si 3 items */
                            else {

                                var heightNew = parseInt(heightOrigine) + parseInt(height) + switchHeight; /* 173 = min height du content s'il y a un bloc autopromo */
                            }
                        }
                        /* sur mobile */
                        else {

                            var heightNew = parseInt(heightOrigine) + parseInt(height) + parseInt(switchHeight) + 120; /* 120 = hauteur bloc autopromo*/
                        }

                        document.getElementById(cible).style.height = heightNew + "px";
                    }
                    /* si plusieurs items */
                    else {

                        var heightNew = parseInt(heightOrigine) + parseInt(height) + parseInt(switchHeight);

                        /* sur mobile */
                        if ( window.innerWidth < 850 ) {

                            heightNew = heightNew + 120; /* 20 = hauteur du bloc autopromo */
                        }

                        document.getElementById(cible).style.height = heightNew + "px";
                    }
                }
                /* si abonne */
                else {

                    /* sur desktop */
                    if (  window.innerWidth >= 850 ) {

                        var heightNew = parseInt(heightOrigine) + parseInt(height);
                    
                        document.getElementById(cible).style.height = heightNew + parseInt(switchHeight) + "px";
                    }
                    /* sur mobile */
                    else {

                        var heightNew = parseInt(heightOrigine) + parseInt(height);
                    
                        document.getElementById(cible).style.height = heightNew + parseInt(switchHeight) + "px";
                    }
                }
            }
        }
        /* retrecissement de la ligne */
        else {

            /* afficher plus d'items */
            if ( origin && origin == "show_items_historique_donnees" ) {

                var heightNew = parseInt(heightOrigine) + parseInt(height);

                document.getElementById(cible).style.height = heightNew + "px";
            }
            /* switch d'un histo a l'autre */
            else if ( origin && origin == "work_btn_switch_historique_donnees" ) {

                /* si pas abonne -> place pour afficher bloc autopromo */
                if ( is_class_exist(document.getElementById(content), 'nocompteplus') ) {

                    /* sur mobile */
                    if ( window.innerWidth < 850 ) {

                        /* recalculer hauteur */
                        var heightNew = parseInt(height);

                        heightNew    = heightNew + 120; /* 120 = hauteur du bloc autopromo */
                        switchHeight = 45;
                    }
                    /* sur desktop */
                    else {

                        /* recalculer hauteur */
                        var heightNew = parseInt(height);

                        /* si 1 a 3 items */
                        if ( is_class_exist(document.getElementById(content), 'lessItems') ) {

                            /* combiens d'items visibles */
                            var histos = document.getElementById(content).getElementsByClassName("histo-part");
                            var histoVisible = "";

                            for ( var i = 0; i < histos.length; i++) {

                                if ( !is_class_exist(histos[i], 'isHidden') ) {

                                    histoVisible = histos[i].getAttribute("id");
                                }
                            }

                            var items = document.getElementById(histoVisible).getElementsByClassName("FicheDonnees__item");

                            /* si 1 et 2 items */
                            if ( items.length < 3 ) {

                                heightNew = 173 + 18; /* 173 = min height du content s'il y a un bloc autopromo */
                                switchHeight = 0;
                            }
                            /* si 3 items */
                            else {

                                heightNew = 173 + 18; /* 173 = min height du content s'il y a un bloc autopromo / 18 = hauteur de la ligne d'origine */
                                switchHeight = 45;
                            }
                        }
                        /* si plusieurs items */
                        else {

                            switchHeight = 45;
                        }
                    }
                }
                /* si abonne */
                else {

                    var heightNew    = parseInt(height);
                        switchHeight = 45; /* 21 = hauteur du btn switch / 24 = margin-top du btn switch */
                }

                document.getElementById(cible).style.height = heightNew + parseInt(switchHeight) + "px";
            }
            /* fermeture histo */
            else {

                var heightNew = parseInt(height);

                document.getElementById(cible).style.height = heightNew + "px";

                /* si btn switch existe -> le cacher */
                if ( btnSwitch ) {
                    
                    btnSwitch.style.opacity = 0; /* pour pouvoir calculer sa hauteur a la reouverture de l'histo */
                    btnSwitch.style.width = "1px"; /* pour ne pas qu'il passe au dessus des autres elements clickables */
                }
            }
        }

        /* repositionnement du btn switch et bloc autopromo sur mobile */
        if ( window.innerWidth < 850) {

            position_switch_autopromo(content);
        }
    }
}

/* positionner btn switch et bloc autopromo sur mobile */
function position_switch_autopromo(context) {

    /* execution fonction que si pas abonne */
    if ( !is_class_exist(document.getElementById(context), 'nocompteplus') ) {

        return;
    }

    var histo = document.getElementById(context).getElementsByClassName("histo-part");

    /* si 1 histo */
    if ( histo.length == 0 ) {

        var autopromo = document.getElementById(context).getElementsByClassName("historiqueDonneesAffiliationDesktop")[0];

        /* verif si items caches */
        var items  = document.getElementById(context).getElementsByClassName("FicheDonnees__item");
        var height = 0;

        for (var i = 0; i < items.length; i++ ) {

            if ( is_class_exist(items[i], 'noOpacity') ) {

                height += items[i].offsetHeight;
            }
        }

        /* repositionnement bloc autopromo */
        if ( height != 0 ) {

            autopromo.style.marginTop = "-" + height + "px";
        } else {

            autopromo.style.marginTop = "";
        }
    }
    /* si 2 histos */
    else {

        var cibleId = "";

        /* cibler l'histo affiche */
        for ( var i = 0; i < histo.length; i++ ) {

            if ( !is_class_exist(histo[i], 'isHidden') ) {

                cibleId = histo[i].getAttribute("id");
            }
        }

        /* repositionner le switch */
        var btnSwitch = context.substring(0, (context.length - 7));
            btnSwitch = btnSwitch + "switch";

        document.getElementById(btnSwitch).style.bottom = "136px"; /* 16 = positionnement d'origine / 120 = hauteur bloc autopromo */

        /* repositionner le bloc autopromo */
        var autopromo = document.getElementById(cibleId).getElementsByClassName("historiqueDonneesAffiliationDesktop")[0];

        /* verif si items caches */
        var items  = document.getElementById(cibleId).getElementsByClassName("FicheDonnees__item");
        var height = 0;

        for (var i = 0; i < items.length; i++ ) {

            if ( is_class_exist(items[i], 'noOpacity') ) {

                height += items[i].offsetHeight;
            }
        }

        /* position horizontale du switch sur IE 11 */
        var documentBody = document.body;

        if ( is_class_exist(documentBody, 'nav-ie11') ) {

            var width            = document.getElementById(context).offsetWidth;
            var left             = Math.round((width - 200) / 2);
            var btnSwitchContent = document.getElementById(btnSwitch).getElementsByClassName("switch")[0];

            btnSwitchContent.style.left = left + "px";
        }

        /* repositionnement bloc autopromo */
        if ( height != 0 ) {

            height = height - 45; /* soustraire btn switch */

            autopromo.style.marginTop = "-" + height + "px";
        } else {

            autopromo.style.marginTop = "45px";
        }
    }
}

function width_etabliste_IE() {

    if ( detect_version_IE().indexOf("nav-ie11") != -1 ) {

        if ( document.getElementById("etablist") ) {

            var widthContent = document.getElementById("container").offsetWidth;
            var items = document.getElementsByClassName("EtabItem__content");

            if ( window.innerWidth < 1268) {

                for ( i = 0; i < items.length; i++ ) {
                    items[i].style.width = (widthContent - 32) + "px";

                    items[i].getElementsByClassName("infos")[0].style.width = (widthContent - 32) + "px";
                }
            } else {

                for ( i = 0; i < items.length; i++ ) {
                    items[i].style.width = (widthContent - 48) + "px";

                    items[i].getElementsByClassName("infos")[0].style.width = (widthContent - 48) + "px";
                }
            }

            add_event(window, "resize", function() {

                width_etabliste_IE();
            });
        }
    }
}/********************************************************/
/******************** DIRIGEANT *************************/
/********************************************************/
/* VIEW_MANDATDIR */
function init_mandatdir() {

    var mandatdir = document.getElementById('mandatdir');

    display_num(mandatdir);

    /* test A/B sur cta afficher numero telephone */
    //choose_tel_fiche("mandatdir");
}

function display_all_mandats() {
    var mandat = document.getElementById('mandatdir');
    var mandatplus = document.getElementById('mandatplus');

    if (mandat) {
        var tab = get_elementsbyclassname(mandat, 'FicheMandatdir__content');
        for (var i = 0; i < tab.length; i++) {
            remove_class(tab[i], "isHidden");
        }

        hide_obj(mandatplus);
    }
}

function display_all_comandats() {
    var comandat = document.getElementById('comandatdir');
    var comandatplus = document.getElementById('comandatplus');

    if (comandat) {
        var tab = get_elementsbyclassname(comandat, 'comandat');
        for (var i = 0; i < tab.length; i++) {
            remove_class(tab[i], "isHidden");
        }

        hide_obj(comandatplus);
    }
}


function close_all_dir() {
    close_all_tel_dir("stel");
    close_all_tel_dir("tel");
}



function close_all_tel_dir(prefix) {
    var abtt = document.getElementById(prefix + 'aboutement');
    var abt = get_elementsbyclassname(abtt, 'aboutementdir');

    if (abt && prefix) {
        for (var i = 0; i < abt.length; i++) {
            if (abt[i].id && abt[i].id.indexOf(prefix + "aboutementbloc_") == 0) {
                var mandatid = abt[i].id.substring(abt[i].id.lastIndexOf("_") + 1);

                var telazurdetails = document.getElementById(prefix + 'priceazurdetails_' + mandatid);
                var pricedetails = document.getElementById(prefix + "price_details_" + mandatid);
                var telab = document.getElementById(prefix + "telab_" + mandatid);
                var aboutement = document.getElementById(prefix + 'aboutement_' + mandatid);
                var link = document.getElementById(prefix + 'link_' + mandatid);
                var bloc = document.getElementById(prefix + 'aboutementbloc_' + mandatid);

                add_class(telab, "isHidden");
                add_class(aboutement, "isHidden");
                remove_class(link, "isHidden");
            }
        }
    }

/*
    if (abtt && prefix) {
        for (i = 0; i < abtt.childElementCount; i++) {
            var mandatid = abtt.children[i].id.substring(abtt.children[i].id.lastIndexOf("_") + 1);

            var telazurdetails = document.getElementById(prefix + 'priceazurdetails_' + mandatid);
            var pricedetails = document.getElementById(prefix + "price_details_" + mandatid);
            var telab = document.getElementById(prefix + "telab_" + mandatid);
            var aboutement = document.getElementById(prefix + 'aboutement_' + mandatid);
            var link = document.getElementById(prefix + 'link_' + mandatid);
            var bloc = document.getElementById(prefix + 'aboutementbloc_' + mandatid);

            add_class(telab, "isHidden");
            add_class(aboutement, "isHidden");
            remove_class(link, "isHidden");
        }
    }
    */
}


function SocXhrWrapperDir() {
    this.xhr = abttXhr;
    this.timeout = undefined;
    this.test = 1;

    this.responseHandler = function(e) {
        if(this.readyState != 4 || typeof(this.responseXML) == "string") {
            return;
        }

        var tmp;
        try {
            tmp = eval('('+this.responseText+')');
        } catch(e) {
            return;
        } // Case CGI is unavailable : responseText is HTML and evaluating it will throw an exception

        var prefix = this.socXhrWrapper.prefix;
        var mandatid = this.socXhrWrapper.mandatid;

//        var telazurdetails = document.getElementById(prefix + 'priceazurdetails_' + mandatid);
        var pricedetails = document.getElementById(prefix + "price_details_" + mandatid);
        var pricenodetails = document.getElementById(prefix + "pricenodetails_" + mandatid);
        var telab = document.getElementById(prefix + "telab_" + mandatid);
        var telabnum = document.getElementById(prefix + "telab-num_" + mandatid);
        var telabinfo = document.getElementById(prefix + "telab-info_" + mandatid);
        var aboutement = document.getElementById(prefix + 'aboutement_' + mandatid);
        var link = document.getElementById(prefix + 'link_' + mandatid);


        remove_class(telab, "aboutement-banalise");
        add_class(telab, "aboutement-majore");
        add_class(telab, "aboutement-ctr");
        remove_class(telabnum, "lightorange");
        add_class(telabinfo, "isHidden");
        add_class(pricenodetails, "isHidden");
        remove_class(telab, "isHidden");
        remove_class(aboutement, "isHidden");
        add_class(link, "isHidden");

        if((typeof(tmp.err) != 'boolean') || (tmp.err == true) || (typeof(tmp.telephone) != 'string') || (tmp.telephone.length < 10) || (tmp.telephone.length > 15) || (typeof(tmp.payant) != 'boolean')) {
//            add_class(telazurdetails, "isHidden");
            add_class(pricedetails, "isHidden");
            telab.innerHTML = "Pas de numéro disponible";
            if ((typeof(tmp.err) == 'boolean') && (tmp.err == true)) {
                gana_event(null, 'Aboutement annuaire', 'non dispo / err');
            }
            return;
        }

        telabnum.innerHTML = "" + tmp.telephone;
        if(tmp.payant == false) {
            gana_event(null, 'Aboutement annuaire', 'gratuit');
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
            } else {
                remove_class(pricenodetails, "isHidden");
                add_class(telabinfo, "isHidden");
                remove_class(telab, "aboutement-ctr");
                remove_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(telabnum, "lightorange");
            }
            add_class(pricedetails, "isHidden");
        } else {
            gana_event(null, 'Aboutement annuaire', 'payant : ' + tmp.telephone);
            gana_event(null, 'Aboutement annuaire', 'dispo');
            if((typeof(tmp.free) == 'boolean') && (tmp.free == true)) {
//                remove_class(telazurdetails, "isHidden");
                add_class(telab, "aboutement-banalise");
                remove_class(telab, "aboutement-majore");
                add_class(pricedetails, "isHidden");
            } else {
//                add_class(telazurdetails, "isHidden");
                remove_class(pricedetails, "isHidden");
            }
        }

        if (is_phone_device() == true) {
            window.location = 'tel:' + tmp.telephone;
        }
    }

    this.url = 0;

    this.setUrl = function(urlToCgi) {
        if(typeof(urlToCgi) != "string") {
            return;
        }

        this.url = urlToCgi;
    }

    this.send = function(siret, nrlead, id, prefix) {
        if((this.xhr.readyState == this.xhr.OPENED) // 1
            || (this.xhr.readyState == this.xhr.HEADERS_RECEIVED) // 2
            || (this.xhr.readyState == this.xhr.LOADING)) { // 3
            return("XHR already in use");
        }

        if(typeof(this.url) != "string") {
            return "URL not set";
        }

        if(typeof(siret) != "string") {
            return "Argument siret is required and must be a string of caracters";
        }

        if(typeof(nrlead) != "string") {
            return "Argument nrlead is required and must be a string of caracters";
        }

        if (this.timeout != undefined) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }

        /* 5min */
        this.timeout = setTimeout("close_all_dir();", 5 * 1000 * 60);

        close_all_dir();
        this.xhr.socXhrWrapper = this;
        this.mandatid = id;
        this.prefix = prefix;
        this.xhr.open("GET", this.url+"?siret="+ siret + "&nrlead=" + nrlead, true);
        this.xhr.onreadystatechange = this.responseHandler;
        this.xhr.setRequestHeader("Cache-Control", "max-age=0, no-store, no-cache, must- revalidate");
        this.xhr.setRequestHeader("Pragma", "no-cache");
        this.xhr.send();
        return "Request processing...";
    }
}



abttXhrWrapperDir = new SocXhrWrapperDir();

function click_aboutement_dir(siret, nrlead, mandatid, prefix) {
    abttXhrWrapperDir.setUrl('/cgi-bin/aboutement-tel');
    abttXhrWrapperDir.send(siret, nrlead, mandatid, prefix);

}


function display_or_hide_aboutementdir() {
    var aboutement = document.getElementById('stelaboutement');

    if (aboutement) {
        display_or_hide('stelaboutement');
        if (is_display(aboutement)) {
            var link = get_elementsbyclassname(aboutement, "Link");
            for (var i = 0; i < link.length; i++) {
                if (link[i].onclick) {
                    link[i].onclick();
                    break;
                }
            }

            inactiveLinkContactDir();
        } else {
            activeLinkContactDir();
        }
    }
}

/* etat normal du btn surveiller */
function activeLinkContactDir() {
    var id = document.getElementById('identiteteldir');

    remove_class(id, "identitebuttinactive");
    add_class(id, "identitebutt");
}

/* etat selectionne du btn surveiller */
function inactiveLinkContactDir() {
    var id = document.getElementById('identiteteldir');

    remove_class(id, "identitebutt");
    add_class(id, "identitebuttinactive");
}/* La vue actfil */
function init_actfil() {
    var act = document.getElementById('actfil');
    display_num(act);
}

/* La vue actif */
function init_actif() {
    var actif = document.getElementById('actif');
    var tableresume = document.getElementById('tableresume');
    display_num(actif);
    display_num(tableresume);

    if (actif) {
        build_table_chiffre(actif);
        display_num(actif);
    }

    add_event(window, "resize", function() {build_table_chiffre(actif); display_num(actif);});
}


/* La vue compte */
function init_compteresultat() {
    var compteres = document.getElementById('compteresultat');
    display_num(compteres);

    if (compteres) {
        build_table_chiffre(compteres);
        display_num(compteres);
    }

    add_event(window, "resize", function() {build_table_chiffre(compteres); display_num(compteres);});
}

function init_etatfinancier() {
    var etatfinancier = document.getElementById('etat-financier');

    display_num(etatfinancier);

    if (etatfinancier) {
        build_table_chiffre(etatfinancier);
        display_num(etatfinancier);
    }

    add_event(window, "resize", function() {build_table_chiffre(etatfinancier); display_num(etatfinancier);});
}

/* La vue passif */
function init_passif() {
    var passif = document.getElementById('passif');
    display_num(passif);

    if (passif) {
        build_table_chiffre(passif);
        display_num(passif);
    }

    add_event(window, "resize", function() {build_table_chiffre(passif); display_num(passif);});
}

/* La vue rensjur */
function init_rensjur() {
    var rensjur = document.getElementById('rensjur');
    var rensjurcomplete = document.getElementById('rensjurcomplete');
    display_num(rensjur);
    display_num(rensjurcomplete);

    /* test A/B sur cta afficher numero telephone */
    //choose_tel_fiche("rensjur");
}

/* La vue minifiche_rensjur */
function init_minifiche_rensjur() {
    var minifiche_rensjur = document.getElementById('minifiche-tbl-rensjur');
    display_num(minifiche_rensjur);
}


/********************************************************/
/*************** VIEW DIR (DISPLAY / HIDE) **************/
/********************************************************/
function display_dir() {
//    var tabledir = document.getElementById('tabledir');
    var elt = document.getElementById('tabledir');

    if (elt) {
        for (var i = 0; i < nb_child(elt); i++) {
            display_obj_block(elt.children[i]);
        }

        hide_obj(document.getElementById('displaydir'));
    }
    /*
    if (tabledir) {
        for (var i = 0; i < nb_child(tabledir); i++) {
            display_obj_block(tabledir.children[i]);
        }

        var elts = tabledir.getElementsByClassName("divdir");
        if (elts) {
            for (var j = 0; j < elts.length; j++) {
                var elt = elts[j];
                for (var i = 0; i < nb_child(elt); i++) {
                    display_obj_block(elt.children[i]);
                }
                display_obj_block(elts[j]);
            }

            hide_obj(document.getElementById('displaydir'));
        }
    }
    */
}

/********************************************************/
/*************** VIEW ETAB (DISPLAY / HIDE) *************/
/********************************************************/
/* La vue etab */
function display_butt_tab(id_tab, id_button) {

    var btn = document.getElementById(id_button);
    var tab = document.getElementById(id_tab);

    if (tab && btn) {
        display_or_hide_table(id_tab);

        if (is_display(tab)) {
            btn.innerHTML  = '<span class="show-mobile-inline-l">Masquer informations avanc&eacute;es</span>';
            btn.innerHTML += '<span class="hide-mobile-inline-l">Voir moins d\'informations</span>';
            btn.innerHTML += '<i class="material-icons-outlined">expand_less</i>';
        } else {
            btn.innerHTML  = '<span class="show-mobile-inline-l">Voir informations avanc&eacute;es</span>';
            btn.innerHTML += '<span class="hide-mobile-inline-l">Voir plus d\'informations</span>';
            btn.innerHTML += '<i class="material-icons-outlined">expand_more</i>';
        }
    }
}

function display_all_etab() {
    var elt = document.getElementById('etabs');
    var butt = document.getElementById('displayetabfiche');

    if (elt) {
        for (var i = 0; i < nb_child(elt); i++) {
            display_obj_block(elt.children[i]);
        }

        if (butt) {
            hide_obj(butt);
        }
    }
}

function cut_name_etab() {

    if ( document.getElementById("etabs") ) {

        var etabs = document.getElementById("etabs"),
        deno  = etabs.getElementsByClassName(" denoEtab");

        for ( var i = 0; i < deno.length; i++) {

            var denoContent = deno[i].innerHTML,
                newContent  = "",
                end         = 0;

            /* calcul nb caracteres max du titre pour resolution < 768 */
            if ( window.innerWidth < 768 ) {

                if ( window.innerWidth < 400 ) {

                    if ( denoContent.length > 38 ) {

                        end = 35;
                    }
                } else if ( window.innerWidth >= 400 && window.innerWidth < 460 ) {

                    if ( denoContent.length > 45 ) {

                        end = 42;
                    }
                } else if ( window.innerWidth >= 460 && window.innerWidth < 520 ) {

                    if ( denoContent.length > 56 ) {

                        end = 53;
                    }
                } else if ( window.innerWidth >= 520 && window.innerWidth < 620 ) {

                    if ( denoContent.length > 67 ) {

                        end = 64;
                    }
                } else if ( window.innerWidth >= 620 && window.innerWidth < 700 ) {

                    if ( denoContent.length > 83 ) {

                        end = 80;
                    }
                } else if ( window.innerWidth >= 700 && window.innerWidth < 768 ) {

                    if ( denoContent.length > 108 ) {

                        end = 105;
                    }
                }

                if ( end != 0 ) {

                    newContent = denoContent.substring(0, end);
                    newContent = newContent + "...";
                } else {

                    newContent = denoContent.substring(0, denoContent.length);
                }

                deno[i].innerHTML = newContent;
            }

            /* calcul largeur max du titre pour resolution > 768 */
            else if ( window.innerWidth > 768 && window.innerWidth < 1740 ) {

                var largeur = document.getElementsByClassName("FicheContent__ContentAround")[0].offsetWidth;
                    largeur = largeur - 16; /* margin du contenu de la page */
                    largeur = largeur - 32; /* padding du bloc etablissements */
                    largeur = largeur - 66; /* largeur du picto etab + margin */
                    largeur = largeur - 65; /* largeur du code postal */
                    largeur = largeur - 64; /* largeur du tag + margin */

                if ( window.innerWidth > 1000 ) {

                    largeur = largeur - 211; /* largeur menu gauche */
                }

                if ( window.innerWidth > 1280 ) {

                    largeur = largeur - 303; /* largeur colonne de droite */
                    largeur = largeur - 30; /* augmentation margin */
                }

                deno[i].style.maxWidth = largeur + "px";
            }

            /* bloquer largeur max du titre pour resolution > 1740 */
            else if ( window.innerWidth > 1740 ) {

                deno[i].style.maxWidth = "560px";
            }
        }
    }
}

/********************************************************/
/************************ VIEW EVENT ********************/
/********************************************************/
function display_event() {
    var tab = document.getElementById('eventtable');
    var index = 0;

    if (tab) {
        var list = tab.getElementsByTagName('tr');

        for (var i = 0; i < list.length; i++) {
            if (list[i].id == 'eventall') {
                index = i;
            } else {
                remove_class(list[i], "isInvisible");
            }
        }

        add_class(list[index], "isInvisible");
    }

    panrefresh();
}

function display_bodacc() {
    var tab = document.getElementById('bodacctable');
    var index = 0;

    if (tab) {
        var list = tab.getElementsByTagName('tr');

        for (var i = 0; i < list.length; i++) {
            if (list[i].id == 'bodaccall') {
                index = i;
            } else {
                remove_class(list[i], "isInvisible");
            }
        }
    }
    tab.deleteRow(index);
    panrefresh();
}

function update_event_view(placeholder, res) {
    if (res.readyState == 4 && (res.status == 200 || res.status == 0)) {
        var trigger = false;
        var more = document.getElementById("eventall");
        if (more) {
            trigger = is_class_exist(more, "isHidden");
        }

        async_views_callback(placeholder, res);

        if (trigger) {
            display_event();
        }

        init_event();
    }
}

function load_event_ws() {
    init_views_async("async-ws-event", update_event_view);
}

function init_event() {
    var preview = (document.getElementById('preview_event') != null);
    var tab = document.getElementById('eventtable');

    if (tab) {
        var list = tab.getElementsByTagName('tr');

        for (var i = 1; i < list.length; i++) {
            var node = list[i];

            if (node.id == 'eventall') {
                node = node.children[0].children[0].children[0];
                add_event(node, "click", display_event);
            }

            if (preview) {
                add_event(node, "click", load_event_ws);
            }

            if (!preview && node.tagName != 'a') {
                add_event(node, "click", function() {
                    pc(this);
                });
            }
        }
    }
}

/* deplacer colonne de droite fiche dirigeant en version mobile */
function move_coldroite_dirigeant() {

    var positionDesktop = document.getElementById('coldroite-dirigeant-position-desktop');
    var positionMobile  = document.getElementById('coldroite-dirigeant-position-mobile');
    var content         = "";

    if ( positionDesktop.innerHTML != "" ) {
        content = positionDesktop.innerHTML;
    } else {
        content = positionMobile.innerHTML;
    }

    /* version mobile */
    if ( window.innerWidth < 1000 ) {

        if ( positionMobile.innerHTML == "" ) {

            positionMobile.innerHTML  = content;
            positionDesktop.innerHTML = "";
        }
    }
    /* version desktop */
    else {

        if ( positionMobile.innerHTML != "" ) {

            positionDesktop.innerHTML  = content;
            positionMobile.innerHTML = "";
        }
    }

    /* relancer fonction pour MAJ content blocs au resize */
    add_event(window, "resize", move_coldroite_dirigeant);
}

/* adapter largeur fiche dirigeant sous IE */
function fiche_dirigeant_IE(loop) {

    /* seulement pour IE 11 */
    if ( detect_version_IE().indexOf("nav-ie11") != -1 ) {

        var footer    = document.getElementById("footer");
        var avantages = document.getElementById("avantages_carto_dirigeant");
        var carto     = document.getElementById("cartographie");
        var container = document.getElementById("container");

        /* seulement pour resolution < 1000 */
        if ( window.innerWidth < 1000 ) {

            if ( !loop ) {
                var loop = 0;
            }

            if ( loop < 5 ) {

                /* si footer charge */
                if ( footer ) {

                    container.style.maxWidth = "";
                    avantages.style.width = (window.innerWidth - 27) + "px";
                    carto.style.width = (window.innerWidth - 25) + "px";
                    footer.style.width = (window.innerWidth - 71) + "px";
                }
                /* sinon */
                else {

                    /* relancer la fonction dans la limite de 5 */
                    loop++;
                    fiche_dirigeant_IE(loop);
                }
            }
        }
        /* pour resolution > 1000 */
        else {

            if ( !loop ) {

                var loop = 0;
            }

            if ( loop < 5 ) {

                /* si footer charge */
                if ( footer ) {

                    avantages.style.width = "";
                    carto.style.width = "";
                    footer.style.width = "";
                    container.style.maxWidth = (window.innerWidth - 320) + "px";
                }
                /* sinon */
                else {

                    /* relancer la fonction dans la limite de 5 */
                    loop++;
                    fiche_dirigeant_IE(loop);
                }
            }
        }

        /* relancer fonction pour MAJ largeur blocs au resize */
        add_event(window, "resize", function() {

            fiche_dirigeant_IE();
        });
    }
}

/* test A/B wording lien afficher le numero sur fiche societe */
function choose_tel_fiche(src) {

    var random05   = Math.random(),
        content    = document.getElementById(src),
        telephone  = content.getElementsByClassName('testAB-telephone'),
        verifClick = 0;

    /* definir contenu du gana_event en fonction page ou on est */
    if ( document.getElementById("rensjur") ) {
        var origin = "Fiche";
    } else {
        var origin = "Fichedir";
    }

    if(random05 <= 0.05) {
        var random50   = Math.random();

        if(random50 <= 0.5) {
            for(var i = 0; i < telephone.length; i++) {
                var icon = telephone[i].getElementsByClassName('i-phone')[0];
                add_class(icon, 'testAB');

                if(i == 0) {
                    gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_A_FullIcon');
                }

                add_event(telephone[i], "click", function() {
                    if (verifClick == 0) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_A_FullClick');
                        verifClick++;
                    }
                });
            }
        } else {
            for(var i = 0; i < telephone.length; i++) {
                if(i == 0) {
                    gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_B_EmptyIcon');
                }

                add_event(telephone[i], "click", function() {
                    if ( verifClick == 0 ) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_B_EmptyClick');
                        verifClick++;
                    }
                });
            }
        }
    } else if (random05 <= 0.1) {

        if(is_phone_device()) {
            var random33 = Math.random();

            if(random33 <= 0.33) {

                for ( var i = 0; i < telephone.length; i++) {

                    var wording = telephone[i].getElementsByClassName('testAB-telephone-content')[0];
                    wording.innerHTML = "Appeler";

                    // n'envoyer qu'un gana_event si plusieurs liens sur la page
                    if ( i == 0) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_A_MobilePrint');
                    }

                    add_event( telephone[i], "click", function() {
                        if ( verifClick == 0 ) {
                            gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_A_MobileClick');
                            verifClick++;
                        }
                    });
                }
            } else if (random33 > 0.33 && random33 <= 0.66) {

                for ( var i = 0; i < telephone.length; i++) {

                    var wording = telephone[i].getElementsByClassName('testAB-telephone-content')[0];
                    if(origin == "Fichedir") {
                        wording.innerHTML = "Appeler le dirigeant";
                    } else {
                        wording.innerHTML = "Appeler l'entreprise";
                    }
                    
                    // n'envoyer qu'un gana_event si plusieurs liens sur la page
                    if ( i == 0) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_B_MobilePrint');
                    }

                    add_event( telephone[i], "click", function() {
                        if ( verifClick == 0 ) {
                            gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_B_MobileClick');
                            verifClick++;
                        }
                    });
                }
            } else {

                for ( var i = 0; i < telephone.length; i++) {

                    var wording = telephone[i].getElementsByClassName('testAB-telephone-content')[0];
                    wording.innerHTML = "Afficher le téléphone";

                    // n'envoyer qu'un gana_event si plusieurs liens sur la page 
                    if ( i == 0) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_C_MobilePrint');
                    }

                    add_event( telephone[i], "click", function() {
                        if ( verifClick == 0 ) {
                            gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_C_MobileClick');
                            verifClick++;
                        }
                    });
                }
            }
        } else {
            var random50 = Math.random();

            if(random50 <= 0.5) {
                for ( var i = 0; i < telephone.length; i++) {

                    var wording = telephone[i].getElementsByClassName('testAB-telephone-content')[0];
                    if(origin == "Fiche") {
                        wording.innerHTML = "Afficher le n° de téléphone";
                    } else {
                        wording.innerHTML = "Afficher le téléphone";
                    }
                    

                    // n'envoyer qu'un gana_event si plusieurs liens sur la page
                    if ( i == 0) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_A_DeskPrint');
                    }

                    add_event( telephone[i], "click", function() {
                        if ( verifClick == 0 ) {
                            gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_A_DeskClick');
                            verifClick++;
                        }
                    });
                }
            } else {

                for ( var i = 0; i < telephone.length; i++) {

                    var wording = telephone[i].getElementsByClassName('testAB-telephone-content')[0];
                    if(origin == "Fichedir") {
                        wording.innerHTML = "Appeler le dirigeant";
                    } else {
                        wording.innerHTML = "Afficher le téléphone";
                    }
                    

                    // n'envoyer qu'un gana_event si plusieurs liens sur la page
                    if ( i == 0) {
                        gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_B_DeskPrint');
                    }

                    add_event( telephone[i], "click", function() {
                        if ( verifClick == 0 ) {
                            gana_event(null, 'Test_AB', 'Telephone_201910', origin + '_B_DeskClick');
                            verifClick++;
                        }
                    });
                }
            }
        }
    }
}

function init_menuentreprise() {

    var menu = document.getElementById('menuentreprise_mobile');

    /* dans quel element recuperer le scroll --> page carto ne recupere pas scroll au sein de window */
    if ( document.getElementById("fiche_carto") && document.getElementById("presentation_carto_banner") ) {
       var reference = document.getElementById("documentbody_around");
    } else {
        var reference = window;
    }

    if (menu) {

        // position des elements au resize
        add_event(reference, "resize", function() { 

            navbar_scroll();
            verif_scroll(reference);
        } );

        // position des elements au scroll
        add_event(reference, "scroll", function() { 

            navbar_scroll();
            verif_scroll(reference);
        } );
    }
}

function verif_scroll(reference) {

    if (window.innerWidth > 1000) {
        return;
    }

    // dans quel element recuperer le scroll --> page carto ne recupere pas scroll au sein de window 
    // page carto -> recuperer scroll au sein de documentbody_around
    if ( reference == document.getElementById("documentbody_around") ) {
        scrollY = getY(reference);
    } else {
        scrollY = getY();
    }

    // position du menu mobile au scroll
    var identite = document.getElementById("identite");

    if ( scrollY >= identite.offsetTop ) {

        scroll_menuentreprise_mobile(scrollY);
    }
}

/* position du menu mobile au scroll */
function scroll_menuentreprise_mobile(scrollY) {

    var menu            = document.getElementById("menuentreprise_mobile"),
        menuDefault     = document.getElementById("menuentreprise_mobile_around"),
        menuBottom      = menuDefault.offsetTop + menuDefault.offsetHeight,
        headFloat       = document.getElementById("navbar"),
        scrollLimitDown =  menuBottom - headFloat.offsetHeight,
        scrollLimitUp   =  menuDefault.offsetTop - headFloat.offsetHeight;

    // menu en fixed 
    if ( menu.getAttribute("class").indexOf("isFixed") == -1 && scrollY >= scrollLimitDown ) {

        menu.style.top = headFloat.offsetHeight + "px";
        add_class(menu, "isFixed");
    }
    // menu en inherit
    else if ( menu.getAttribute("class").indexOf("isFixed") != -1 && scrollY < scrollLimitUp ) {

        remove_class(menu, "isFixed");
        menu.style.top = "";
    }
}

/* gestion du menu mobile sur la fiche */
function init_menu_tab() {

    extend_menu_tabs();
    active_menu_tab();

    add_event(window, "resize", function(){

        active_menu_tab();
        extend_menu_tabs("close");
    });
}

/* Mettre le plus du menu mobile en bleu si un des onglets du submenu est actif */
function active_menu_tab() {

    var link     = document.getElementById('menu-tab-plus'),
        tabList  = document.getElementById('menu-bar-sublist'),
        count    = document.getElementById("submenu_count");

    if ( tabList ) {

        /* determiner onglets submenu */
        /* jusqu'a BP S --> onglet dans sous menu =
           marques, statistiques, dirigeants, beneficiaires, carto, bilans, ratios, analyse, solvabilite, contentieux 
        */
        if ( window.innerWidth < 480 ) {

            var tableRecap = ["sub_marques", "sub_classement", "sub_dirigeant", "sub_rbe", "sub_carto", "sub_bilan", "sub_ratiofi", "sub_anafi", "sub_enquete", "sub_contentieux", "sub_procedure"];
        }

        /* entre BP S et BP M --> onglet dans sous menu =
           marques, statistiques, beneficiaires, carto, bilans, ratios, analyse, solvabilite, contentieux 
        */
        else if ( window.innerWidth >= 480 && window.innerWidth < 600) {

            var tableRecap = ["sub_marques", "sub_classement", "sub_rbe", "sub_carto", "sub_bilan", "sub_ratiofi", "sub_anafi", "sub_enquete", "sub_contentieux", "sub_procedure"];
        }

        /* entre BP M et BP L --> onglet dans sous menu =
           marques, statistiques, beneficiaires, bilans, ratios, analyse, solvabilite, contentieux 
        */
        else if ( window.innerWidth >= 600 && window.innerWidth < 768 ) {

            var tableRecap = ["sub_marques", "sub_classement", "sub_rbe", "sub_bilan", "sub_ratiofi", "sub_anafi", "sub_enquete", "sub_contentieux", "sub_procedure"];
        }

        /* au dessus BP L --> onglet dans sous menu =
           marques, statistiques, bilans, ratios, analyse, solvabilite, contentieux 
        */
        else if ( window.innerWidth >= 768 ) {

            var tableRecap = ["sub_marques", "sub_classement", "sub_bilan", "sub_ratiofi", "sub_anafi", "sub_enquete", "sub_contentieux", "sub_procedure"];
        }

        /* boucler sur les liens du submenu */
        var tabItems = tabList.getElementsByTagName('li');

        for (var i = 0; i < tabItems.length; i++) {

            /* ne pas tenir comptes des li de separation */
            if ( tabItems[i].className.indexOf("isSeparation") == -1 ) {

                /* recuperer le lien actif */
                if ( tabItems[i].className.indexOf("isActive") != -1 ) {

                    var id = tabItems[i].id;
                }                
            }
        }

        /* boucler sur liens visibles du submenu */
        var linkPlusActive = false;

        for ( var x = 0; x < tableRecap.length; x++) {

            /* verifier si lien actif present dans submenu */
            if ( id ) {

                /* verifier si lien actif du submenu est visible */
                if ( tableRecap[x] == id ) {

                    linkPlusActive = true;
                }
            }
        }

        /* activer/desactiver le lien "plus" du menu */
        if ( linkPlusActive == true ) {

            add_class(link, "isActive");
        } else {

            remove_class(link, "isActive");
        }

        /* renseigner le nb de liens dans le submenu */
        count.innerHTML = tableRecap.length;
    }
}

/* afficher submenu fiche mobile */
function extend_menu_tabs(action) {

    var plus = document.getElementById('menu-tab-plus');

    if ( !action ) {

        add_event(plus, "click", function() {

            var height = document.getElementById("menu-bar-sublist_content").offsetHeight;

            if ( this.className.indexOf("open") == -1 ) {

                document.getElementById("menu-bar-sublist").style.height = (height + 24) + "px";

                add_class(plus, "open");
                add_class(plus, "plusActive");
            } else {

                remove_class(plus, "open");
                remove_class(plus, "plusActive");

                document.getElementById("menu-bar-sublist").style.height = "";
            }
        });
    } else {

        if ( action == "open" ) {

            document.getElementById("menu-bar-sublist").style.height = (height + 24) + "px";

            add_class(plus, "open");
            add_class(plus, "plusActive");
        } else if ( action == "close" ) {

            remove_class(plus, "open");
            remove_class(plus, "plusActive");

            document.getElementById("menu-bar-sublist").style.height = "";
        }
    }
}

/* Gestion positionnement elements de la fiche */
var scrollLimitState = false;
var widthLimitState  = false;
function init_elements_fiche() {

    var header       = document.getElementById('header');
    var inputSearch  = document.getElementById("input_search2");
    var identite     = document.getElementById("identite");
    var identiteEtab = document.getElementById("identite-etablissement");
    var menu         = document.getElementById('menuentreprise_desktop');
    var colDroite    = document.getElementById('coldroite');

    /* determiner resolution ecran au chargement */
    if ( window.innerWidth >= 1000 ) {
        widthLimitState = true;
    } else {
        widthLimitState = false;
    }

    if (header) {
        /* position header */
        fixed_header_fiche();

        /* gestion placeholder input search */
        add_event(inputSearch, "click", function (){

            inputSearch.setAttribute("placeholder", "");
            show_advanced_search();
        });

        add_event(inputSearch, "blur", function (){

            inputSearch.setAttribute("placeholder", "Entreprise, dirigeant, SIREN...");
        });
    }

    if (identite || identiteEtab) {

        /* position name societe */
        fixed_namecompany_fiche();

        /* cloner nom societe en fonction resolution */
        add_event(window, "resize", function() {

            if ( window.innerWidth >= 1000 ) {

                if ( scrollLimitState == true && widthLimitState == false ) {

                    clone_namecompany_fiche("fixed");
                    widthLimitState = true;
                } else if ( scrollLimitState == false && widthLimitState == false ) {

                    widthLimitState = true;
                }
            } else {

                if ( scrollLimitState == true && widthLimitState == true ) {

                    clone_namecompany_fiche("no-fixed");
                    widthLimitState = false;
                } else if ( scrollLimitState == false && widthLimitState == true ) {
 
                    widthLimitState = false;
                }
            }
        });
    }

    if (menu) {

        /* menu fix au scroll */
        fixed_menuentreprise_desktop();

        /* gestion des arrondis sur li active */
        active_menuentreprise_desktop();
    }
}

/* Header fiche en fixed */
function fixed_header_fiche() {

    var header          = document.getElementById('header');
    var headerTop       = header.offsetTop;
    var headerHeight    = header.offsetHeight
    var headerFloatable = document.getElementById('header_fiche_floatable');
    var scrollLimit     = headerTop + headerHeight - 49; /* 49px = hauteur de headerFloatable */

    /* dans quel element recuperer le scroll --> page carto ne recupere pas scroll au sein de window */
    if ( document.getElementById("fiche_carto") && document.getElementById("presentation_carto_banner") ) {

        var reference = document.getElementById("documentbody_around");
    } else {

        var reference = window;
    }

    /* page carto -> recuperer scroll au sein de documentbody_around */
    if ( reference == document.getElementById("documentbody_around") ) {
        var scrollY = getY(reference);
    } else {
        var scrollY = getY();
    }

    if ( scrollY >= scrollLimit ) {
        add_class(headerFloatable, "isFixed");

        /* gestion temporaire bandeau COVID */
        /*var banner = document.getElementById('covid_banner');

        if(!is_class_exist(banner, 'hide')) {
            add_class(headerFloatable, "covid");
        }*/
    } else {
        remove_class(headerFloatable, "isFixed");
    }

    add_event(reference, "scroll", function() {

        /* page carto -> recuperer scroll au sein de documentbody_around */
        if ( reference == document.getElementById("documentbody_around") ) {
            scrollY = getY(reference);
        } else {
            scrollY = getY();
        }

        if ( scrollY >= scrollLimit ) {
            add_class(headerFloatable, "isFixed");

            /* gestion temporaire bandeau COVID */
            /*var banner = document.getElementById('covid_banner');

            if(!is_class_exist(banner, 'hide')) {
                add_class(headerFloatable, "covid");
            }*/
        } else {
            remove_class(headerFloatable, "isFixed");
        }
    });
}

/* Name fiche en fixed */
function fixed_namecompany_fiche() {

    /* contexte selon si fiche societe ou fiche etablissement */
    if ( document.getElementById('identite') ) {
        var identite = document.getElementById('identite');
    } else if ( document.getElementById("identite-etablissement") ) {
        var identite = document.getElementById("identite-etablissement");
    }

    var identiteTop       = identite.offsetTop;
    var identiteHeight    = identite.offsetHeight;
    var identiteFloatable = document.getElementById('identite_fiche_floatable');
    var scrollLimit       = identiteTop + identite.offsetHeight - 80 - 49 - 3; /* 80px = hauteur de identiteFloatable / / 49px = hauteur headerFloatable / 3px = hauteur ombre portee de identiteFloatable */

    /* dans quel element recuperer le scroll --> page carto ne recupere pas scroll au sein de window */
    if ( document.getElementById("fiche_carto") && document.getElementById("presentation_carto_banner") ) {
        var reference = document.getElementById("documentbody_around");
    } else {
        var reference = window;
    }

    /* page carto -> recuperer scroll au sein de documentbody_around */
    if ( reference == document.getElementById("documentbody_around") ) {
        var scrollY = getY(reference);
    } else {
        var scrollY = getY();
    }

    if ( scrollY >= scrollLimit ) {

        if ( scrollLimitState == false ) {

            if (widthLimitState == true) {
                clone_namecompany_fiche("fixed");
            }
            
            scrollLimitState = true;
        }

        add_class(identiteFloatable, "isFixed");

        /* gestion temporaire bandeau COVID */
        /*var banner = document.getElementById('covid_banner');

        if(!is_class_exist(banner, 'hide')) {
            add_class(identiteFloatable, "covid");
        }*/
    } else {

        if ( scrollLimitState == true ) {
            
            if (widthLimitState == true) {
                clone_namecompany_fiche("no-fixed");
            }

            scrollLimitState = false;
        }

        remove_class(identiteFloatable, "isFixed");
    }

    add_event(reference, "scroll", function() {
    
        /* determiner a nouveau resolution ecran sur safari -> debug sinon widthLimitState passe a false tout le temps */
        if ( navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ) {

            if ( window.innerWidth >= 1000 ) {
                widthLimitState = true;
            } else {
                widthLimitState = false;
            }
        }

        /* page carto -> recuperer scroll au sein de documentbody_around */
        if ( reference == document.getElementById("documentbody_around") ) {
            var scrollY = getY(reference);
        } else {
            var scrollY = getY();
        }

        /* redefinir les positions des elements une fois tous les elements charges */
        if ( scrollY > 0 && scrollY < 100 ) {

            identiteTop       = identite.offsetTop;
            identiteHeight    = identite.offsetHeight;
            identiteFloatable = document.getElementById('identite_fiche_floatable');
            scrollLimit       = identiteTop + identite.offsetHeight - 80 - 49 - 3; /* 80px = hauteur de identiteFloatable / / 49px = hauteur headerFloatable / 3px = hauteur ombre portee de identiteFloatable */
        }

        if ( scrollY >= scrollLimit ) {

            if ( scrollLimitState == false ) {

                if (widthLimitState == true) {
                    clone_namecompany_fiche("fixed");
                }
                
                scrollLimitState = true;
            }

            add_class(identiteFloatable, "isFixed");

            /* gestion temporaire bandeau COVID */
            /*var banner = document.getElementById('covid_banner');

            if(!is_class_exist(banner, 'hide')) {
                add_class(identiteFloatable, "covid");
            }*/
        } else {

            if ( scrollLimitState == true ) {
                
                if (widthLimitState == true) {
                    clone_namecompany_fiche("no-fixed");
                }

                scrollLimitState = false;
            }

            remove_class(identiteFloatable, "isFixed");
        }
    });
}

/* remplir le name fixed */
function clone_namecompany_fiche(state) {

    var origin            = document.getElementById("company_identity");
    var logoAdressOrigin  = document.getElementById("identite_logo_and_adress");
    var nameCompanyOrigin = document.getElementById("identite_name");
    var ctaOrigin         = document.getElementById("identitelien");
    var cible             = document.getElementById("identite_fiche_floatable");
    var logoAdressCible   = cible.getElementsByClassName("FicheIdentiteFloatable__Details")[0];
    var nameCompanyCible  = cible.getElementsByClassName("FicheIdentiteFloatable__Company__Content")[0];
    var ctaCible          = cible.getElementsByClassName("FicheIdentiteFloatable__Actions")[0];
    var ctaTel            = document.getElementById("identitetel");

    /* fermer aboutement tel */
    remove_class(document.getElementById("popup_aboutementtel"), "isVisible");
    document.getElementById("popup_aboutementtel").style.width = "";

    if ( state == "fixed" ) {

        /* bloquer hauteur name societe */
        origin.style.height = origin.offsetHeight + "px";

        /* remplir name fixed */
        logoAdressCible.innerHTML = logoAdressOrigin.innerHTML;
        logoAdressOrigin.innerHTML = "";

        nameCompanyCible.innerHTML = nameCompanyOrigin.innerHTML;
        nameCompanyOrigin.innerHTML = "";

        ctaCible.innerHTML = ctaOrigin.innerHTML;
        ctaOrigin.innerHTML = "";

        setTimeout(function(){

            /* spliter le nom si trop long */
            var width = document.getElementsByClassName("FicheIdentiteFloatable__Company")[0];
                width = width.offsetWidth;
                //width = width - 170;
                width = width - 70;

            add_class(document.getElementById("identite_deno"), "split");
            document.getElementById("identite_deno").style.maxWidth = width + "px";

            /* afficher adresse complete au survol */
            adresscompany_hover();

            /* test A/B sur deno des cta */
            //choose_deno_cta();
        }, 5);
    } else if ( state == "no-fixed" ) {

        origin.style.height = "";

        logoAdressOrigin.innerHTML = logoAdressCible.innerHTML;
        logoAdressCible.innerHTML = "";

        nameCompanyOrigin.innerHTML = nameCompanyCible.innerHTML;
        nameCompanyCible.innerHTML = "";

        ctaOrigin.innerHTML = ctaCible.innerHTML;
        ctaCible.innerHTML = "";

        /* remettre le nom en entier */
        remove_class(document.getElementById("identite_deno"), "split");
        document.getElementById("identite_deno").style.maxWidth = "";

        /* remettre les cta comme a l'origine */
        reverse_deno_cta();
    }

    init_resume_onglets();
}

/* test A/B sur deno des cta */
var randomTestABFiche     = undefined;
var randomTestABFiche1050 = undefined;
var randomTestABFiche0150 = undefined;
function choose_deno_cta() {

    /* generer le random uniquement au chargement de la page (et non a chaque passage du bloc identite en fixed) */
    if (randomTestABFiche == undefined) {

        randomTestABFiche = Math.random();
    }

    var random          = randomTestABFiche;
    var context         = document.getElementById("bloc_fiche_cta");
    var cta             = context.getElementsByClassName("societeCtaText");
    var ctaTel          = document.getElementById("identitetel").getElementsByTagName("a")[0];
    var ctaSurveillance = document.getElementById("buttsurveiller").getElementsByTagName("a")[0];

    /* test sur 1% des utilisateurs */
    if (random <= 0.01) {

        /* generer le random uniquement au chargement de la page (et non a chaque passage du bloc identite en fixed) */
        if (randomTestABFiche0150 == undefined) {

            randomTestABFiche0150 = Math.random();
        }

        var random50 = randomTestABFiche0150;

        /* pour 50% testes des 1% */
        if (random50 <= 0.5) {

            /* cacher le text des cta */
            for ( var i = 0; i < cta.length; i++) {

                add_class(cta[i], "isHidden");
            }

            /* personnaliser le gana_event */
            if ( ctaTel ) {

                add_event (ctaTel, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Tel sans text 1prct');
                });
            }
            if ( ctaSurveillance ) {

                add_event (ctaSurveillance, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Surveillance sans text 1prct');
                });
            }
        }
        /* pour 50% non testes des 1% */
        else {

            /* personnaliser le gana_event */
            if ( ctaTel ) {

                add_event (ctaTel, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Tel avec text 1prct');
                });
            }
            if ( ctaSurveillance ) {

                add_event (ctaSurveillance, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Surveillance avec text 1prct');
                });
            }
        }
    }
    /* test sur 10% des utilisateurs */
    else if (random > 0.01 && random <= 0.11) {

        /* generer le random uniquement au chargement de la page (et non a chaque passage du bloc identite en fixed) */
        if (randomTestABFiche1050 == undefined) {

            randomTestABFiche1050 = Math.random();
        }

        var random50 = randomTestABFiche1050;

        /* pour 50% testes des 10% */
        if (random50 <= 0.5) {

            /* cacher le text des cta */
            for ( var i = 0; i < cta.length; i++) {

                add_class(cta[i], "isHidden");
            }

            /* personnaliser le gana_event */
            if ( ctaTel ) {

                add_event (ctaTel, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Tel sans text 10prct');
                });
            }
            if ( ctaSurveillance ) {

                add_event (ctaSurveillance, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Surveillance sans text 10prct');
                });
            }
        }
        /* pour 50% non testes des 10% */
        else {

            /* personnaliser le gana_event */
            if ( ctaTel ) {

                add_event (ctaTel, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Tel avec text 10prct');
                });
            }
            if ( ctaSurveillance ) {

                add_event (ctaSurveillance, "click", function() {
                    
                    gana_event(null, 'Fiche_entreprise', 'Onglet-identite-fixed', 'Clicks Surveillance avec text 10prct');
                });
            }
        }
    }
}

/* remettre les cta comme a l'origine */
function reverse_deno_cta() {

    var context         = document.getElementById("identitelien");
    var cta             = context.getElementsByClassName("societeCtaText");

    /* afficher le text des cta */
    for ( var i = 0; i < cta.length; i++) {

        remove_class(cta[i], "isHidden");
    }
}

/* afficher adresse complete au survol */
function adresscompany_hover() {

    var adress           = document.getElementById("companyAdress");
    var adressDetail     = document.getElementById("adressDetail");
    var hover            = document.getElementById("adressHover");

    add_event(adress, "mouseenter", function () {
        
        add_class(hover, "show");

        setTimeout(function(){

            add_class(hover, "visible");
        }, 50);
    });

    add_event(adress, "mouseleave", function () {
        
        remove_class(hover, "visible");

        setTimeout(function(){

            remove_class(hover, "show");
        }, 50);
    });
}

/* Menu entreprise desktop en fixed */
function fixed_menuentreprise_desktop() {

    var content          = document.getElementsByClassName('FicheContent__ContentAround')[0];
    var contentTop       = content.offsetTop;
    var colLeft          = document.getElementsByClassName("FicheContent__ContentLeft")[0];
    var menu             = document.getElementById('menuentreprise_desktop');
    var menuContent      = menu.getElementsByTagName("ul")[0];
    var elmtsFixedHeight = 80 + 49 + 3; 
    var scrollLimit      = contentTop - elmtsFixedHeight;

    /* 80px = hauteur de identiteFloatable / 49px = hauteur de headerFloatable + 3px = ombre portee */
    /* gestion temporaire banner COVID */
    /*if ( document.getElementById("covid_banner") && !is_class_exist(document.getElementById("covid_banner"),"hide") ) {
        elmtsFixedHeight = elmtsFixedHeight + 72;
    }
    var scrollLimit      = contentTop - elmtsFixedHeight*/
    /* gestion temporaire banner COVID */
    /*if ( document.getElementById("covid_banner") && !is_class_exist(document.getElementById("covid_banner"),"hide") ) {
        scrollLimit = scrollLimit + 72;
    }*/

    /* dans quel element recuperer le scroll --> page carto ne recupere pas scroll au sein de window */
    if ( document.getElementById("fiche_carto") && document.getElementById("presentation_carto_banner") ) {
       var reference = document.getElementById("documentbody_around");
    } else {
        var reference = window;
    }

    /* page carto -> recuperer scroll au sein de documentbody_around */
    if ( reference == document.getElementById("documentbody_around") ) {
        var scrollY = getY(reference);
    } else {
        var scrollY = getY();
    }

    /* determiner position du footer */
    if ( document.getElementById("fiche_carto") ) { /* page carto -> arreter le menu a la description des avantages carto */
        
        if ( document.getElementById('avantages_carto') ) { /* si pas abonne */

            var footer = document.getElementById('avantages_carto');
        } else { /* si abonne */

            var footer = document.getElementById('footer-compte');
        }
    } else { /* autres pages -> arreter le menu au footer */

        var footer = document.getElementById('footer');
    }

    if ( footer ) {

        var footerTop = footer.offsetTop;
    } else {

        var footerTop = window.innerHeight;
    }

    /* recalcul au scroll */
    var calcul = 0;
    add_event(reference, "scroll", function() {

        /* refaire les calculs tous les 50ms */
        if ( calcul <= (Date.now() - 50) ) {
            
            /* page carto -> recuperer scroll au sein de documentbody_around */
            if ( reference == document.getElementById("documentbody_around") ) {
                scrollY = getY(reference);
            } else {
                scrollY = getY();
            }

            /* redefinir les positions des elements */
            content          = document.getElementsByClassName('FicheContent__ContentAround')[0];
            contentTop       = content.offsetTop;
            elmtsFixedHeight = 80 + 49 + 3; /* 80px = hauteur de identiteFloatable / 49px = hauteur de headerFloatable + 3px = ombre portee */
            scrollLimit      = contentTop - elmtsFixedHeight;
            /* gestion temporaire banner COVID */
            /*if ( document.getElementById("covid_banner") && !is_class_exist(document.getElementById("covid_banner"),"hide") ) {
                elmtsFixedHeight = elmtsFixedHeight + 72;
            }
            scrollLimit = contentTop - elmtsFixedHeight;*/
            /* gestion temporaire banner COVID */
            /*if ( document.getElementById("covid_banner") && !is_class_exist(document.getElementById("covid_banner"),"hide") ) {
                scrollLimit = scrollLimit + 72;
            } else {
                scrollLimit = scrollLimit;
            }*/

            /* determiner position du footer */
            if ( document.getElementById("fiche_carto") ) { /* page carto -> arreter le menu a la description des avantages carto */
                
                if ( document.getElementById('avantages_carto') ) { /* si pas abonne */

                    footer = document.getElementById('avantages_carto');
                } else { /* si abonne */

                    //footer = document.getElementById('carto_caption');
                    footer = document.getElementById('footer-compte');
                }
            } else { /* autres pages -> arreter le menu au footer */

                footer = document.getElementById('footer');
            }

            if ( footer ) {

                footerTop = footer.offsetTop;
            } else {

                var footerTop = window.innerHeight;
            }

            /* calcul margin-top du menu quand il arrive au niveau du footer */
            var marginTopMenu = (footerTop - 32) - menuContent.offsetHeight - contentTop;
        }

        /* passage du menu en fixed */
        if ( scrollY >= scrollLimit ) {

            /* ne rien faire si menu plus grand q reste de la page */
            if (menuContent && menuContent.offsetHeight > document.getElementById("container").offsetHeight && menuContent.offsetHeight > document.getElementById("coldroite").offsetHeight) {
                return;
            }

            /* donner hauteur au menu en fonction resolution */
            if ( menuContent.offsetHeight > (window.innerHeight - elmtsFixedHeight) ) {
                
                var menuHeight = window.innerHeight - elmtsFixedHeight;
                menuContent.style.height = menuHeight + "px";
            }

            /* reverifier position footer */
            if ( (scrollY + window.innerHeight) >= (footerTop - 200) && (scrollY + window.innerHeight) < (footerTop - 35) ) {

                if ( document.getElementById("fiche_carto") ) { /* page carto -> arreter le menu a la description des avantages carto */
                
                    if ( document.getElementById('avantages_carto') ) { /* si pas abonne */

                        footer = document.getElementById('avantages_carto');
                    } else { /* si abonne */

                        footer = document.getElementById('footer-compte');
                    }
                } else { /* autres pages -> arreter le menu au footer */

                    footer    = document.getElementById('footer');
                }

                if (footer) {

                    footerTop = footer.offsetTop;
                }
            }

            /* bloquer le menu au niveau du footer */
            if ( (scrollY + elmtsFixedHeight + menuContent.offsetHeight) >= (footerTop - 32) ) {

                remove_class(menuContent, "isFixed");
                menu.style.marginTop = marginTopMenu + "px";
                menuContent.style.top = "";
                menu.style.height = "";
            } else {

                add_class(menuContent, "isFixed");
                menuContent.style.top = elmtsFixedHeight + "px";
                menu.style.marginTop = "";
                menu.style.height = "";
            }
        }
        /* passage du menu en float */
        else {

            remove_class(menuContent, "isFixed");
            menuContent.style.top = "";
            menuContent.style.height = "";
        }
    });
}

function active_menuentreprise_desktop() {

    var nav = document.getElementById("menuentreprise_desktop");
        nav = nav.getElementsByTagName("ul")[0];
    var li  = nav.getElementsByTagName("li");

    for ( var i = 0; i < li.length; i++) {

        if ( li[i].getAttribute("class").indexOf("isActive") != -1 ) {

            add_class(li[i-1], "isLinkBefore");
            add_class(li[i+1], "isLinkAfter");
        }
    }
}

/********************************************************/
/*********************** ACTU FICHE *********************/
/********************************************************/
var actu_fiche_page_nb = 1;

function get_actu_fiche() {
    var query_actu = '/cgi-bin/actu-fiche-page?';
    if (is_dirigeant()) {
        var tags = window.location.href.split('/');
        query_actu += 'dirig=' + tags[tags.length - 1].replace('.html', '').split('#')[0];

    } else {

        var siren = document.getElementById("identite-siren").innerHTML,
            siren = siren.replaceAll("&nbsp;", "");

        query_actu +=  'rncs=' + siren;
    }
    send_query(query_actu + '&p=' + actu_fiche_page_nb, function(e) {
        if (e.readyState == 4 && e.status == 200 && e.responseText) {
            var m;
            var ret = JSON.parse(e.responseText);
            var news = ret['news'];
            var tmp;
            if (news) {
                var create_article = function (node, data) {
                    node.children[0].children[1].children[0].innerHTML = data['title'];
                    node.children[0].children[1].children[0].href = data['link'];

                    node.children[0].children[0].children[0].innerHTML = data['date'] + ' à ' +  data['time'];
                    node.children[0].children[0].children[0].href = 'https://www.societe.com/pages/les-actualites-du/' +  data['datelink'] + '.html';
                };
                tmp = document.getElementsByClassName('actufichearticles');
                if (!tmp) {
                    document.getElementById("moreactu").style.display = "none";
                    return ;
                }
                for (var i = 0; i < news.length; i+=2) {

                    m = tmp[0].cloneNode(true);
                    create_article(m.children[0], news[i]);
                    if (i + 1 == news.length) {
                        m.removeChild(m.children[1]);
                    } else {
                        create_article(m.children[1], news[i + 1]);
                    }
                    document.getElementById('actu-fiche').children[1].appendChild(m);
                }
                actu_fiche_page_nb++;
            }
            if (ret['last'] == true || ret['last'] == undefined) {
                document.getElementById("moreactu").style.display = "none";
            }
        }
    });
}

/* ======================================= Liste liens resume ==================================== */

function Onglet (bar, id, open, close) {
    var self = this;
    this.bar = bar;
    this.userOpen = open;
    this.userClose = close;
    this.open = persoOpen;

    this.close = persoClose;
    this.closed = true;

    add_event(document.getElementById(id), "click", function(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        self.bar.manageclick(parentHasId(target, ['buttsurveiller', 'contactAnnuaire', 'identitetel']));
    });

    function persoOpen() {
        this.closed = false;
        this.userOpen();
    }

    function persoClose() {
        this.closed = true;
        this.userClose();
    }
}


function OngletBar() {

    this.onglets = {};

    this.addOnglet = addOnglet;
    this.manageclick = manageclick;

    function addOnglet (id, open, close) {
        
        var onglet = new Onglet(this, id, open, close);
        this.onglets[id] = onglet;
    }

//    function manageclick(event) {
    function manageclick(id) {

        if (id == null) {
            return;
        }

        var ouverture = this.onglets[id].closed;

        for (var e in this.onglets) {
            var onglet = this.onglets[e];
            if (e == id) {
                if (ouverture == true) {
                    onglet.open();
                } else {
                    onglet.close();
                }
            } else {
                if (ouverture == true) {
                    onglet.close();
                }
            }
        }
    }
}

var bar =  bar || new OngletBar();

function init_resume_onglets() {

    bar = bar || new OngletBar();

    bar.addOnglet('buttsurveiller', openSurveillance, closeSurveillance);
    bar.addOnglet('contactAnnuaire', displayContactAnnuaire, asyncCloseContactCompany);
    bar.addOnglet('identitetel', openAboutementOnglet, closeAboutementOnglet);
}

/* section identite fiche */
function init_identity_company() {

    var name         = document.getElementById("identite_deno");
    var nameLogo     = document.getElementById("identite_name");
    var contentLogo  = document.getElementById("identite_logo_content");
    var contentLogo2 = document.getElementById("identite_logo_content2");
    var logo         = document.getElementById("identite_logo");
    var logoImg      = document.getElementById("identite_logo_img");
    var logoImg2     = document.getElementById("identite_logo_img2");
    var logoImgTemp  = new Image();
    var ctaContent   = document.getElementById("identitelien");
    //var ctaButton    = ctaContent.getElementsByClassName('societeCtaIcon');
    var ctaButton    = ctaContent.getElementsByClassName('CtaButton');

    /* ouverture et fermeture cta */
    //init_resume_onglets();

    /* font-size nom entreprise en fonction nb caracteres */
    if ( name.innerHTML.length > 33 ) {

        nameLogo.classList.add("small");
    }

    /* gestion mise en page en fonction presence/absence logo */
    if (  logo != undefined && logo.style.visibility == "hidden" ) {

        add_class(contentLogo, "noLogo");
        add_class(contentLogo2, "noLogo");
        add_class(nameLogo, "noLogo");
        add_class(ctaContent, "noLogo");
    }

    /* gestion mise en page en fonction orientation logo */
    if ( logoImg != undefined ) {

        logoImgTemp.src = logoImg.src; /* recuperer logo a taille reelle */

        if ( logoImgTemp.width > logoImgTemp.height ) {
            add_class(logoImg, "landscape");
            add_class(logoImg2, "landscape");
        }
    }

    /* si seulement cta surveiller entreprise -> cta + gros */
    for ( var i = 0; i < ctaButton.length; i++ ) {

        if ( ctaButton.length == 1 ) {
            add_class(ctaContent, "one_cta");
        }
    }
}

//var globAboutementTelOpen = 0;





/* Gestion reload des pages home + fiche */
/*function reload_page() {
    location.reload();
}*/


/*function ReloadAuto(loaded) {
    var _this = this;
    this.timeout = null;
    this.time = 1200000; // 20 * 60 * 1000 

    this.auth_pathnames = [ "^/societe/", "^(/)*$" ];
    this.auth_page = false;

    this.init = init;
    this.setup = setup;
    this.refresh = refresh;
    this.keymanage = keymanage;
    this.kill = kill;

    function init(isloaded) {
        if (this.timeout != null) {
            return;
        }

        if (this.auth_page == false) {
            var re = new RegExp(this.auth_pathnames.join('|'), "i");
            if (window.location.pathname.match(re) != null) {
                this.auth_page = true;
            }
        }

        if (typeof(isloaded) == "boolean" && isloaded == true) {
            this.setup();
        } else {
            add_event(document, "readystatechange", _this.setup);
        }
    }

    function setup() {
        if (_this.auth_page == false || _this.timeout != null) {
            return;
        }

        _this.refresh();
        add_event(window, "mousemove", _this.refresh);
        add_event(window, "touchmove", _this.refresh);
        add_event(window, "keyup", _this.keymanage);
        add_event(document.getElementById("buttsurveiller"),  "click", _this.kill);
        add_event(document.getElementById("contactAnnuaire"), "click", _this.kill);
        add_event(document.getElementById("input_search"), "focus", _this.kill);
    }

    function refresh() {
        if (_this.auth_page == false || _this.timeout != null) {
            clearTimeout(_this.timeout);
        }
        _this.timeout = setTimeout(reload_page, _this.time);
    }

    function kill() {
        clearTimeout(_this.timeout);
        _this.timeout = null;

        clearTimeout(_this.timetest);
        _this.timetest = null;

        remove_event(window, "mousemove", _this.refresh);
        remove_event(window, "touchmove", _this.refresh);
        remove_event(window, "keyup", _this.keymanage);
        remove_event(document.getElementById("buttsurveiller"),  "click", _this.kill);
        remove_event(document.getElementById("contactAnnuaire"), "click", _this.kill);
        remove_event(document.getElementById("input_search"), "focus", _this.kill);
    }

    function keymanage(event) {
        _this.refresh();
    }

    this.init(loaded);

    return this;
}*/

/*var reloader = new ReloadAuto(completeload);*/

function direct_download(elem, type) {
    var url,
        label;

    switch(type) {
        case 'immat':
            if(typeof elem != "object" || typeof elem.hasAttribute('data-siren') == "undefined" || elem.getAttribute('data-siren') == "") {
                return;
            }
            var siren = elem.getAttribute('data-siren');

            url = "https://data.inpi.fr/entreprises/" + siren + "?format=pdf";
            label = "Clicks Immatriculation RCS";
            break;
        case 'avis':
            if(typeof elem != "object" || typeof elem.hasAttribute('data-siret') == "undefined" || elem.getAttribute('data-siret') == "") {
                return;
            }
            var siret = elem.getAttribute('data-siret');
            url = "https://api.avis-situation-sirene.insee.fr/identification/pdf/" + siret;
            label = "Clicks Avis Situation SIRENE";
            break;
        default:
            return;
    }

    gana_event(null, "Fiche_entreprise", "Onglet-identite", label);

    window.open(url, '_blank');
}

/********************************************************/
/*********************** FULL FICHE *********************/
/********************************************************/

function init_full() {
    var fullfiche = document.getElementById('fullfiche');
    display_num(fullfiche);
}


/* La vue qrcode */
function init_qrcode() {
    var help_qrcode = document.getElementById('activeqrcode');
    hide('helpqrcode');
    add_event(help_qrcode, "click", function(){display_or_hide('helpqrcode');});

    resize_qrcode();
    add_event(window, "resize", resize_qrcode);

//    display('qrcode');
}

function resize_qrcode() {
    var qrcode = document.getElementById('qrcode');
    var qrcodemobile = document.getElementById('qrcodemobile');
    var qrcodedesktop = document.getElementById('qrcodedesktop');

    if (is_phone_device()) {
        move_block(qrcode, qrcodemobile);
    } else {
        move_block(qrcode, qrcodedesktop);
    }

}

/********************************************************/
/********************** SOCIAUX *************************/
/********************************************************/
function init_sociaux() {
    var select = document.getElementById('selectsociaux');
    if (select) {
        add_event(select, 'change', function(){window.location.href = select[select.selectedIndex].value;});
    }
}

function init_edito_summary() {
    var edito = document.getElementById('edito-summary');

    if (!edito) {
        return;
    }

    var links = edito.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var tmp = links[i].href;
        add_event(links[i], "click", function(event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            track_outbound('news', target);
            return false;
        });
    }
}

function init_edition() {
    init_actu();
    add_event(window, "resize", function(){resize_edition();});
}

function init_actu() {
    var pos_desktop = document.getElementById('actucarreafter');
    var pos_mobile = document.getElementById('actucarre');
    var actu = document.getElementById('actubloc');

    if (is_desktop_device()) {
        move_block(actu, pos_desktop);
    } else {
        move_block(actu, pos_mobile);
    }
}

function resize_edition() {
    init_actu();
}

/* La vue chiffre clef */
function init_chiffreclef() {
    var chiffre = document.getElementById('chiffrecle');
    var tableau = document.getElementById('chiffre');

    display_num(chiffre);

    if (chiffre) {
        build_table_chiffre(chiffre);
        display_num(chiffre);
    }

    add_event(window, "resize", function() {build_table_chiffre(chiffre); display_num(chiffre);});
}

/* vue synthese */
function init_synthese() {
    var synthese = document.getElementById('synthese');
    if (synthese != null) {
        var numbers = synthese.getElementsByTagName("span");

        for (var e in numbers) {
            if (numbers[e].className != undefined && numbers[e].className.search("synthesenumber") != -1) {
                numbers[e].innerHTML = number_presenter(numbers[e].innerHTML);
            }
        }
    }
}

/* onclick sur icono copier */
function copy_clipboard(element) {

    var id        = element.getAttribute("id"),
        idCut     = id.split("_"),
        idCut     = idCut[0],
        msg       = document.getElementById(idCut + "_action"),
        msgOrigin = msg.innerHTML,
        number    = document.getElementById(idCut + "_number");

    /* modifier le msg */
    msg.innerHTML = "Copié !";
    msg.style.opacity = "1";

    /* passer le picto en vert */
    add_class(document.getElementById(idCut + "_icon"), "active");

    /* copier contenu input dans presse papier */
    document.getElementById(idCut + "_copy").select();
    document.execCommand("copy");

    /* faire disparaitre msg */
    setTimeout(function() {

        /* faire disparaitre msg */
        remove_class(document.getElementById(idCut + "_icon"), "active");

        if ( msg.style.opacity == "1" ) {

            msg.style.opacity = "";

            setTimeout(function() {

                msg.innerHTML = msgOrigin;
            }, 300);

        } else {

            msg.innerHTML = msgOrigin;
        }
    }, 2000);
}

/* ouverture popup mentions contrat */
function open_popup_copy_mentions() {

    remove_class(document.getElementById("popup_copy_mentions"), "isHidden");

    /* mise en forme des nb */
    var mentions = document.getElementById("mentions-contrat");

    display_num(mentions);
    var numbers = mentions.getElementsByTagName("span");

    for (var e in numbers) {
        if (numbers[e].className != undefined && numbers[e].className.search("synthesenumber") != -1) {
            numbers[e].innerHTML = number_presenter(numbers[e].innerHTML);
        }
    }
}

/* fermeture popup mentions contrat */
function close_popup_copy_mentions() {

    add_class(document.getElementById("popup_copy_mentions"), "isHidden");

    /* remettre btn a son etat initial */
    setTimeout(function() {

        btn_appear("actived");
    }, 300);   
}

/* copier mentions contrat */
function copy_mentions() {

    /* copier mentions -> coller dans input */
    var content = document.getElementById("mentions-contrat").innerHTML;
        content = content.replace(/<strong class="ft-bold">/g,"");
        content = content.replace(/<\/strong>/g,"");
        content = content.replace(/<span class="numdisplay">/g,"");
        content = content.replace(/<span class="synthesenumber">/g,"");
        content = content.replace(/<span class="lowercase">/g,"");
        content = content.replace(/<\/span>/g,"");
        content = content.replace(/&nbsp;/g," ");
        content = content.replace(" ","");

    document.getElementById("mentions-contrat-copy").value = content;    

    /* copier contenu input dans le presse papier */
    document.getElementById("mentions-contrat-copy").select();
    document.execCommand("copy");

    /* modifier apparence btn */
    btn_appear("disabled");
}

/* modifier apparence btn */
function btn_appear(context) {

    var button = document.getElementById("mentions-contrat-button");
    var icon   = button.getElementsByTagName("i")[0];
    var txt    = button.getElementsByTagName("span")[0];

    if ( context == "disabled") {

        add_class(button, "isDisabled");
        remove_class(icon, "i-copy");
        add_class(icon, "i-check");
        txt.innerHTML = "Mentions copiées";
    } else {

        remove_class(button, "isDisabled");
        remove_class(icon, "i-check");
        add_class(icon, "i-copy");
        txt.innerHTML = "Copier les mentions";
    }
}/* =========== GESTION MENU FOOTER ================ */

function open_footer_menu() {
    var eltTitreFooter = get_elementsbyclassname(document, 'Footer__menu');

    for(var i = 0; i < eltTitreFooter.length; i++) {

        add_event(eltTitreFooter[i], 'click', function(){
            var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

            if(w < 768){
                if(is_class_exist(this, 'open')){
                    remove_class(this, 'open');
                } else {
                        add_class(this, 'open');
                }
            }
        });
    }
}/********************************************************/
/*********** Gestion des formulaires generiques *********/
/********************************************************/
/* Gestion disparition des placeholder au click */
function form_placeholder() {
    /* On gere les placeholders aux focus / blur */
    var inputPlaceholder= get_elementsbyclassname(document, 'input-placeholder');

    for(var i = 0; i < inputPlaceholder.length; i++) {
        /* Gestion des placeholders */
        var getPlaceholder = inputPlaceholder[i].getAttribute('placeholder');

        event_input(inputPlaceholder[i], getPlaceholder);

        /* Gestion des mini-labels */
        add_event(inputPlaceholder[i], 'blur', function(){
            if(this.value != '') {
                add_class(this, 'filled');
            } else {
                remove_class(this, 'filled');
            }
        });
    }
}

/* affichage message d'erreur si input vide */
function verif_empty_input(id) {
    if ( document.getElementById(id) != undefined ) {
        var input         = document.getElementById(id);
        var inputError    = document.getElementById(id + "_error");
        var inputErrorMsg = document.getElementById(id + "_error_msg");

        if (id == "create_password_confirm") {
            var password        = document.getElementById("create_password"),
                confirmPasswd   = document.getElementById("create_password_confirm");
                confirmError    = document.getElementById("create_password_confirm_error"),
                confirmErrorMsg = document.getElementById("create_password_confirm_error_msg");

            if(password.value == confirmPasswd.value && password.value != 0) {
                hide_input_error(id);

                return true;
            } else {
                if(!is_class_exist(confirmPasswd, "red-border")) {
                    display_input_error(id, "Ce champ est obligatoire");
                }
                return false;
            }
        }

        /* si value input vide */
        if ( input.value.length ==  0 ) {
            remove_class(input, "filled");
            display_input_error(id, "Ce champ est obligatoire");

            return false;
        }
        /* si value input renseigne */
        else {
            add_class(input, "filled");
            hide_input_error(id);

            return true;
        }
    }
}

/* verif validite adresse mail */
function verif_mail(id){

    var mailRegexp = new RegExp('^[a-z0-9+]+([_|\.|-]{1}[a-z0-9+]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,10}$', "i");

    if ( document.getElementById(id) != undefined ) {

        var mail = document.getElementById(id);

        if ( null == mailRegexp.exec(mail.value) ) {
            return false;
        } else {
            return true;
        }
    }
}

/* Afficher/supprimer message d'erreur selon validite input email */
function display_mail_error(id){
    if ( document.getElementById(id) != undefined ) {

        var mail         = document.getElementById(id);
        var mailError    = document.getElementById(id + "_error");
        var mailErrorMsg = document.getElementById(id + "_error_msg");

        /* si input email vide */
        if ( mail.value.length == 0 ) {
            display_input_error(id, "Ce champ est obligatoire");
            add_class(mail, "red-border");                          /* ajouter border red de l'input si erreur de saisie */
            add_class(mailError, "no-info");                        /* afficher msg d'erreur en dessous input si erreur de saisie */
            mailErrorMsg.innerHTML = "Ce champ est obligatoire.";   /* personnaliser msg d'erreur */

            return false;
        }

        /* si input email renseigne */
        else {
            /* si email non valide */
            if ( !verif_mail(id) ) {
                display_input_error(id, "L'adresse mail n'est pas valide.");
                add_class(mail, "red-border");                                 /* ajouter border red de l'input si erreur de saisie */
                add_class(mailError, "no-info");                               /* afficher msg d'erreur en dessous input si erreur de saisie */
                mailErrorMsg.innerHTML = "L'adresse mail n'est pas valide.";   /* personnaliser msg d'erreur */

                return false;
            } else if (verif_mail_microsoft(id)){
                display_input_error(id, "Nous ne pouvons malheureusement plus accepter d'inscription depuis les plateformes suivantes : hotmail, outlook, live et msn. Nous vous remercions d'utiliser une autre adresse e-mail.");
                add_class(mail, "red-border");                                 /* ajouter border red de l'input si erreur de saisie */
                add_class(mailError, "no-info");                               /* afficher msg d'erreur en dessous input si erreur de saisie */
                mailErrorMsg.innerHTML = "Nous ne pouvons malheureusement plus accepter d'inscription depuis les plateformes suivantes : hotmail, outlook, live et msn. Nous vous remercions d'utiliser une autre adresse e-mail."; /* personnaliser msg d'erreur */

                return false;
            } else {
                hide_input_error(id);
                remove_class(mail, "red-border");     /* enlever border red de l'input si erreur de saisie auparavant */
                remove_class(mailError, "no-info");   /* enlever msg d'erreur en dessous input si erreur de saisie auparavant */
                mailErrorMsg.innerHTML = "";          /* vider msg d'erreur */

                return true;
            }
        }
    }
}

/* au keyup : disparition msg erreur si correction input email */
function keyup_email(id) {

    if ( document.getElementById(id) != undefined ) {

        var mail         = document.getElementById(id);
        var mailError    = document.getElementById(id + "_error");
        var mailErrorMsg = document.getElementById(id + "_error_msg");

        if( verif_mail(id) && !verif_mail_microsoft(id) ) {
            hide_input_error(id);
            remove_class(mail, "red-border");    /* enlever border red de l'input si erreur de saisie auparavant */
            remove_class(mailError, "no-info");  /* enlever msg d'erreur en dessous input si erreur de saisie auparavant */
            mailErrorMsg.innerHTML = "";         /* vider msg d'erreur */
        }

        if ( id == "profil_email" ) {
            var profilForm = document.getElementById('create_confirm_form');
            var profilEmail = document.getElementById('profil_email');

            if ( profilEmail != undefined ) {

                if ( compteProfilEmail != profilEmail.value ) {
                    profilForm.classList.remove('isHidden');
                    profilForm.classList.remove('isDisabled');
                } else {
                    profilForm.classList.add('isHidden');
                    profilForm.classList.add('isDisabled');
                }
            }
        }
    }
}

/* fonction de verification mail microsoft, reactivation depuis un mail microsoft */
function verif_mail_microsoft(id) {

    /* 
    if (document.getElementById(id) != undefined) {
        var mail = document.getElementById(id).value;

        if (mail) {
            if (mail.indexOf("@hotmail.") != -1) {
                return (true);
            }
            
            if (mail.indexOf("@outlook.") != -1) {
                return (true);
            }
            
            if (mail.indexOf("@msn.com") != -1) {
                return (true);
            }
            
            if (mail.indexOf("@live.fr") != -1) {
                return (true);
            }
        }
    }
    */

    return (false);
}

/* au keyup : disparition msg erreur si correction input */
function keyup_input(id) {

    if ( document.getElementById(id) != undefined ) {

        var input         = document.getElementById(id);
        var inputError    = document.getElementById(id + "_error");
        var inputErrorMsg = document.getElementById(id + "_error_msg");

        if( !verif_empty_input(id) ) {
            hide_input_error(id);
        }
    }
}

/* verifier que la confirmation du mdp est correcte a la saisie */
function confirm_password(id) {
    var password        = document.getElementById(id),
        confirmPasswd   = document.getElementById(id+ "_confirm"),
        confirmError    = document.getElementById(id+ "_confirm_error"),
        confirmErrorMsg = document.getElementById(id+ "_confirm_error_msg");

    if(confirmPasswd.value.length > 4) {

        if(password.value == confirmPasswd.value) {
            hide_input_error(id+ "_confirm");
            display_input_check(id+ "_confirm");
            return true;
        } else {
            display_input_error(id+ "_confirm", "Les mots de passe ne sont pas identiques.")
            hide_input_check(id+ "_confirm");
            return false;
        }
    } else {
        if(confirmPasswd.value.length == 0) {
            display_input_error(id+ "_confirm", "Veuillez confirmer le mot de passe.");
            hide_input_check(id+ "_confirm");
            return false;
        }
    }
}

/* active un input desactive */
function enable_input(id) {
    var input = document.getElementById(id);

    remove_class(input, "isDisabled");

    /* si option pour afficher mdp */
    if(document.getElementById(id+ '_show_password')) {
        document.getElementById(id+ '_show_password').classList.remove("isDisabled");
    }
}

/* desactive un input actif */
function disable_input(id) {
    var input = document.getElementById(id);

    if(!is_class_exist(input, "isDisabled")) {
        add_class(input, "isDisabled");
    }

    /* si option pour afficher mdp */
    if(document.getElementById(id+ '_show_password')) {
        document.getElementById(id+ '_show_password').classList.add("isDisabled");
    }
}

/* affiche une icone check dans l'input si value valide */
function display_input_check(id) {
    var check = document.getElementById(id + '_valid');

    remove_class(check, "isHidden");
}

/* masque une icone check dans l'input value invalide */
function hide_input_check(id) {
    var check = document.getElementById(id + '_valid');

    if(!is_class_exist(check, "isHidden")) {
        add_class(check, "isHidden");
    }
}

/* affiche un message d'erreur personnalise sous un input */
function display_input_error(id, text) {
    var input         = document.getElementById(id),
        inputError    = document.getElementById(id+ "_error"),
        inputErrorMsg = document.getElementById(id+ "_error_msg");

    add_class(input, "red-border");
    add_class(inputError, "no-info");
    inputErrorMsg.textContent = text;
}

/* masque un message d'erreur sous un input */
function hide_input_error(id) {
    var input         = document.getElementById(id),
        inputError    = document.getElementById(id+ "_error"),
        inputErrorMsg = document.getElementById(id+ "_error_msg");

    remove_class(input, "red-border");
    remove_class(inputError, "no-info");
    inputErrorMsg.textContent = "";
}

/* afficher/masquer le mdp */
function show_password(id) {
    var password     = document.getElementById(id);
    var showPassword = document.getElementById(id + "_show_password");

    /* changer le wording sans enlever icone check */
    if ( showPassword.firstChild.innerHTML == "Afficher" ) {
        showPassword.firstChild.innerHTML = "Masquer";
        password.setAttribute("type", "text");
    } else {
        showPassword.firstChild.innerHTML = "Afficher";
        password.setAttribute("type", "password");
    }
}

/* au keyup : disparition msg erreur si correction input */
function remove_error_on_keypress(id) {

    if ( document.getElementById(id) != undefined ) {

        var input         = document.getElementById(id);
        var inputError    = document.getElementById(id + "_error");
        var inputErrorMsg = document.getElementById(id + "_error_msg");

        if( !verif_empty_input(id) ) {
            hide_input_error(id);
        }
    }
}

/* verifier que le mot de passe fait 5 caracteres minimum et 20 caracteres minimum */
function check_password_valid(id) {
    var password        = document.getElementById(id),
        passwordConfirm = document.getElementById(id+ '_confirm'),
        progressBar     = document.getElementById('progress_account');

    if(password.value.length > 4 && password.value.length < 21) {
        display_input_check(id);
    } else if (password.value.length < 6 || password.value.length > 20) {
        hide_input_check(id);
    }

    if(password.value.length > 20) {
        display_input_error(id, "Le mot de passe doit contenir entre 5 et 20 caractères.");
    }

    if(passwordConfirm.value.length != 0) {
        /* si mdp modifie alors que la confirmation etait deja valide, on re-checke la confirmation */
        confirm_password(id);
    }
}

/* aide a la saisie des inputs */
function auto_focus_next_input(element) {
    if(element.value.length == element.getAttribute('maxlength')) {
        element.nextSibling.nextSibling.focus();
    }
}

/* clear inputs si nouvelle tentative de saisie de code */
function check_clear_inputs(id) {
    var form = document.getElementById(id),
        inputs = form.getElementsByTagName('input');

    for(var i = 0; i < inputs.length; i++) {
        /* si un input est vide, on arrete */
        if(inputs[i].value.length == 0) {
            return;
        }
        /* si on atteint le dernier input non-vide, on efface tous les inputs */
        if(i == inputs.length - 1) {
            for(var j = 0; j < inputs.length; j++) {
                inputs[j].value = '';
            }
            inputs[0].focus();
        }
    }
}

// COMPTEUR DE CARACTERES RESTANT DISPONIBLES
function update_counter(id) {
    var comment = document.getElementById(id),
        counter = document.getElementById(id + '_counter'),
        count   = document.getElementById(id + '_count'),
        max     = comment.maxLength,
        remain  = max - comment.value.length;

    count.textContent = remain;
 
    /* faire apparaitre le decompte apres avoir ecrit un tiers des caracteres max autorises */
    if(remain <= max - max/3 && counter.classList.contains('isHidden')) {
        counter.classList.remove('isHidden');
    }
  
    /* changer la couleur du decompte en fonction des caracteres restants (5%) */
    if((remain <= (max * 5) / 100) && !counter.classList.contains('red')) {
        counter.classList.add('red');
    } else if(remain > (max * 5) / 100) {
        counter.classList.remove('red');
    }
}/********************************************************/
/************************ AIDE SOCIETE ******************/
/********************************************************/
function resize_aidesociete() {
    var helptablet = document.getElementById('aidesocietetablet');
    var helpphone = document.getElementById('aidesocietemobile');

    if (is_phone_device()) {
        display_obj_table(helpphone);
        hide_obj(helptablet);
    } else {
        display_obj_table(helptablet);
        hide_obj(helpphone);
    }
}

function display_aidesociete() {
    var buttsearch = document.getElementById('buttsearch');
    var divsearch = document.getElementById('divsearch');
    var input = document.getElementById('input_search');
    var helptablet = document.getElementById('aidesocietetablet');
    var helpphone = document.getElementById('aidesocietemobile');

    if (is_phone_device()) {
        display_obj_table(helpphone);
        hide_obj(helptablet);
    } else {
        display_obj_table(helptablet);
        hide_obj(helpphone);
    }

    add_class(input, "borderoninput");
    add_class(buttsearch, "borderonbut");
    add_class(divsearch, "borderondiv");
    add_focus('input_search');

    add_event(window, "resize", function(){resize_aidesociete();});
}
/* creation de listes */
/* recuperation des listes sur le dashboard */
function create_dashboard_lists(response) {

    var popup        = document.getElementById('popup'),
        template     = document.getElementById("list_card_template"),
        templateHtml = template.innerHTML,
        defaultLists = document.getElementById("blank_list"),
        listHtml     = "";
        json         = response,
        date         = new Date(Date.now()); /* date du jour */
        dateNow      = new Date(Date.now()); /* date du jour */
        dateLastWeek = date.setDate(date.getDate() - 2), /* intervalle de definition des listes recentes */
        nbNewLists   = 0, /* nombre de listes recentes */
        newTag       = "";

    /* echappement apostophe dans nom de liste */
    for(key in json['listes']) {
        json['listes'][key]['name'].replace("\'", "\\\\'");
    }

    /* stockage liste des listes */
    stockListsName = [];

    for(key in json['listes']) {
        stockListsName.push({
            "id" : json['listes'][key]['id'],
            "name" : json['listes'][key]['name']
        });
    }

    // tri des listes par alphabetique
    json['listes'].sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
        if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
    });

    // recuperation des listes recentes
    /* for(key in json['listes']) {
        var timestamp = Date.parse(json['listes'][key]['created']);

        if(timestamp > dateLastWeek) {
            move_in_array(json['listes'], i, 0);
            nbNewLists++;
        }
    }

    // split entre listes recentes et anciennes
    var arrNewLists = json['listes'].splice(0, nbNewLists);*/

    // tri des listes recentes par ordre antechronologique
    /*json['listes'].sort(function(a, b) {
        if (a.created < b.created) {return 1;}
        if (a.created > b.created) {return -1;}
    });*/

    // assemblage de toutes les listes dans un seul array
    /*var arrFullList = arrNewLists.concat(json['listes']); */

    // remplissage du template des fiches des listes
    for(var key in json['listes']) {
        var escapedName = encodeURIComponent(json['listes'][key]['name']),
            creationDate = Date.parse(json['listes'][key]['created']);

        if(creationDate <= dateNow && creationDate >= dateLastWeek) {
            newTag = "new";
        } else {
            newTag = "";
        }

        listHtml += templateHtml.replace(/{{id}}/g, json['listes'][key]['id'])
                                .replace(/{{name}}/g, json['listes'][key]['name'])
                                .replace(/{{escapename}}/g, escapedName)
                                .replace(/{{total}}/g, json['listes'][key]['total'])
                                .replace(/{{premium}}/g, json['listes'][key]['premium'])
                                .replace(/{{sans}}/g, json['listes'][key]['sans'])
                                .replace(/{{gratuite}}/g, json['listes'][key]['gratuite'])
                                .replace(/{{new}}/g, newTag);
    }

    if(json['listes'].length != 0) {
        listHtml += defaultLists.innerHTML;
    } else {
        for(var i = 0; i < 2; i++) {
            listHtml += defaultLists.innerHTML;
        }
    }

    var listsContainer = document.getElementById("lists_container");

    listsContainer.innerHTML = listHtml;

    if(json['listes'].length == 0) {
        var lists = listsContainer.getElementsByClassName("Dashboard__card");

        lists[lists.length - 1].classList.add("isDisabled");
    }

    var dashboard101 = document.getElementById('dashboard_101');

    if(dashboard101 && !is_class_exist(dashboard101, 'isHidden')) {
        add_class(dashboard101, 'isHidden');
    }

    init_dashboard_banner();

    /* update de l'affichage du picto de la todo liste si necessaire */
    show_picto_todo();

    /* recuperation panier */
    get_panier();

    /* positionnement footer sous IE */
    footer_IE();

    /* tronquer nom liste si trop grand */
    cut_list_name();

    /* modififer le nom de la liste dans les notifs */
    var count = 0;
    for (key in stockInfosNotifications) {

        count++;
    }
    /* si liste deja ouverte */
    if ( count > 0 ) {

        for (key in stockInfosNotifications) {

            var cardList = document.getElementById(key);
            var newName  = cardList.getElementsByClassName("name-list")[0].innerHTML;
            var oldName  = stockInfosNotifications[key]["listname"];

            if ( oldName != newName ) {

                /* modifie les infos stockees en locale */
                stockInfosNotifications[key]['listname'] = newName;

                return;
            }
        }
    }
    /* sinon */
    else {

        var list     = document.getElementById("dashboard-notifications-list-content-inside");
        var allLists = list.getElementsByClassName("NotificationsList__list");

        for ( var i = 0; i < allLists.length; i++ ) {

            var idList       = allLists[i].getAttribute("id");
            var idListNumber = idList.slice(19, idList.length);
            var cardList     = document.getElementById(idListNumber);
            var newName      = cardList.getElementsByClassName("name-list")[0].innerHTML;
            var oldName      = allLists[i].getElementsByClassName("NotificationsList__list__name")[0].innerHTML;

            if ( oldName != newName ) {

                allLists[i].getElementsByClassName("NotificationsList__list__name")[0].innerHTML = newName;
                return;
            }
        }
    }
}


function update_upload_filename(input) {

    var file        = document.getElementById(input + '_input'),
        filename    = document.getElementById(input + '_name'),
        icon        = document.getElementById(input + '_icon'),
        bar         = document.getElementById(input + '_bar'),
        importButton= document.getElementById(input + '_import'),
        cancel      = document.getElementById(input + '_cancel'),
        importLinks = document.getElementById(input + '_import'),
        topError    = document.getElementById('popup_import_results_error'),
        error       = document.getElementById(input + '_error'),
        success     = document.getElementById(input + '_success'),
        title       = document.getElementById(input + '_title');

    /* cacher les msg */
    add_class(topError, 'isHidden');
    add_class(importLinks, 'isHidden');
    add_class(success, 'isHidden');
    add_class(error, 'isHidden');

    if(file.value != undefined && file.value != '') {
        filename.textContent = file.value.split(/(\\|\/)/g).pop();
        remove_class(cancel, 'isHidden');
        remove_class(icon, 'grey4');
        remove_class(importButton, 'isHidden');
        add_class(icon, 'lightgreen');

        if(title.value == undefined || title.value == '') {
            add_class(bar, 'half');
        } else {
            add_class(bar, 'full');
        }
    } else {
        filename.textContent = '';
        add_class(cancel, 'isHidden');
        add_class(icon, 'grey4');
        add_class(importButton, 'isHidden');
        remove_class(icon, 'lightgreen');
        remove_class(bar, 'full');

        if(title.value == undefined || title.value == '') {
            remove_class(bar, 'half');
        } else {
            add_class(bar, 'half');
        }
    }

    resize_popup_content_height('popup_import_body');
}

function reset_upload_file(input) {
    var file  = document.getElementById(input + '_input'),
        error = document.getElementById('popup_import_results_error');

    file.type = '';
    file.type = 'file';
    if(!error.classList.contains('isHidden')) {
        add_class(error, 'isHidden');
    }
    update_upload_filename(input);
}

function keyup_update_create_list(input) {
    var title     = document.getElementById(input + '_title'),
        filename  = document.getElementById(input + '_name'),
        bar       = document.getElementById(input + '_bar');

    if(title.value != '') {
        if(filename.textContent == '') {
            remove_class(bar, 'full');

            if(!bar.classList.contains('half')) {
                add_class(bar, 'half');
            }
        } else {
            remove_class(bar, 'half');

            if(!bar.classList.contains('full')) {
                add_class(bar, 'full');
            }
        }
    } else {
        if(filename.textContent != '') {
            remove_class(bar, 'full');
            add_class(bar, 'half');
        } else {
            remove_class(bar, 'half');
        }
    }
}

function has_extension(input, extensionArray) {
    var fileName = document.getElementById(input).value;

    return (new RegExp('(' + extensionArray.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}

function submit_list_file_content(input, content, source, callback) {

    var fileSelect  = document.getElementById(input + '_input'),
        fileTitle   = document.getElementById(input + '_title'),
        importLinks = document.getElementById(input + '_import'),
        valid       = document.getElementById(input + '_valid'),
        error       = document.getElementById(input + '_error'),
        success     = document.getElementById(input + '_success'),
        title       = document.getElementById(input + '_title'),
        titleError  = document.getElementById(input + '_title_error'),
        topError    = document.getElementById('popup_import_results_error'),
        file        = fileSelect.files[0],
        formData    = new FormData(),
        xhr         = new XMLHttpRequest();

    /* verif si nom liste renseigne */
    if ( title.value == "" ) {

        close_progress_overlay('popup_import');
        add_class(titleError, "no-info");
        return;
    } else {

        remove_class(titleError, "no-info");
    }

    formData.append('xls_file', content);
    formData.append('xls_upload_title', fileTitle.value);

    if(file.size > 100000) {
        close_progress_overlay('popup_import');
        topError.innerHTML = "Le fichier que vous tentez d'importer dépasse la taille maximale autorisée.";
        remove_class(topError, 'isHidden');
        add_class(importLinks, 'isHidden');
    } else {
        xhr.open('POST', '/cgi-bin/compte-api-liste-fichier', true);

        /*xhr.onload = function () {
            add_class(importLinks, 'isHidden');
            if (xhr.status === 200) {
                remove_class(success, 'isHidden');
                remove_class(valid, 'isHidden');
            } else {
                remove_class(error, 'isHidden');
            }
        };*/

        xhr.send(formData);

        xhr.onreadystatechange = function() {

            /* cacher les msg */
            add_class(topError, 'isHidden');
            add_class(importLinks, 'isHidden');
            add_class(success, 'isHidden');
            add_class(error, 'isHidden');

            var json;

            if ( xhr.readyState == 4 ) {

                close_progress_overlay('popup_import');

                if (xhr.status == 403) {
                    open_popup('popup_connect_error');
                    return;
                }

                if (xhr.status == 200) {
                    try {
                        json = JSON.parse(xhr.responseText);
                    } catch (e) {
                        return;
                    }

                    /* verifier si correspondances trouvees dans le fichier */
                    var keyCount = 0;
                    var keyError = 0;

                    for ( var key in json.listedata ) {
                        keyCount ++;

                        if ( json.listedata[key]['error'] ) {
                            keyError ++;
                        }
                    }

                    if ( keyError == keyCount ) {

                        //error.innerHTML = "Aucune société n'a pu être identifiée dans ce document";

                        topError.innerHTML = "Aucune société n'a pu être identifiée dans ce document.";
                        remove_class(topError, 'isHidden');
                        //remove_class(error, 'isHidden');
                        add_class(success, 'isHidden');
                    } else {

                        callback(content, source, json);
                    }
                    //callback(content, source, json);
                }

                else {

                    //error.innerHTML = "Une erreur est survenue, veuillez réessayer plus tard";
                    //remove_class(error, 'isHidden');
                    topError.innerHTML = "Une erreur est survenue, veuillez réessayer plus tard.";
                    remove_class(topError, 'isHidden');
                }
            }
        }

        //xhr.send(formData);
    }
}

var mainSearch;

function which_form_to_submit(callback) {
    var focus = document.activeElement;

    if(focus.tagName == 'INPUT' || focus.tagName == 'input') {
        var form = focus.form;
    } else {
        return;
    }
    submit_form_ajax(form.getAttribute('id'), callback);
}

function submit_form_ajax(form, callback) {
    var formElements = document.getElementById(form).elements,
        formMethod   = document.getElementById(form).method,
        formQuery    = document.getElementById(form).action,
        formData,
        queryParam   = '';
        error = document.getElementById("popup_search_results_error");

    /* cacher msg erreur s'il existait */
    add_class(error, "isHidden");

    /* si form de siren */
    if ( form == "recherche_entrep1" ) {

        /* verif validite du siren */
        if ( !length_siren('entreprncs') ) {

            return;
        }
    }

    if(formMethod === 'post') {
        formData = new FormData();

        for(var i = 0; i < formElements.length; i++) {
            if(formElements[i].type === 'checkbox' && formElements[i].checked === false) {
                continue;
            } else {
                formData.append(formElements[i].name, formElements[i].value);
            }
        }
    } else {
        for(var i = 0; i < formElements.length - 1; i++) {
            if(formElements[i].type === 'checkbox' && formElements[i].checked === false) {
                continue;
            } else {
                if(i === 0) {
                    queryParam = '?' + formElements[i].name + '=' + formElements[i].value;
                } else {
                    if(formElements[i].value != '') {
                        queryParam += '&' + formElements[i].name + '=' + formElements[i].value;
                    } else {
                        continue;
                    }
                }
            } 
        }
    }

    /* Recuperation du critere principal de recherche */
    for(var i = 0; i < formElements.length; i++) {
        if(formElements[i].value != '' && formElements[i].name != 'format' && formElements[i].name != 'exa') {
            mainSearch = formElements[i].value;
            break;
        }
    }

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request.overrideMimeType) {
            request.overrideMimeType("text/html");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre navigateur ne supporte pas AJAX");
                }
            }
        }
    }
    if (request && request.readyState != 0) {
        request.abort();
    }

    if(formMethod === 'post') {
        request.open('POST', formQuery, true);
        request.send(formData);
    } else {
        request.open('GET', formQuery + queryParam, true);
        request.send();
    }

    /* affichage loader chargement */
    if ( form == "recherche_entrep1" || form == "recherche_entrep2" ) {
        open_progress_overlay('popup_' + form, 'Recherche en cours...');
    } else {
        open_progress_overlay('popup_' + form, 'Création de votre liste...');
    }
    

    request.onreadystatechange = function() {
        var json;

        if ( request.readyState == 4 ) {

            /* cacher loader chargement */
            close_progress_overlay('popup_' + form);

            if ( request.status == 200 ) {
                try {
                    json = JSON.parse(request.responseText);

                    /* si form = recherche avec info entreprise */
                    if ( form == "recherche_entrep2" ) {

                        /* si remplissage form ok */
                        if ( verif_form_search_company() ) {

                            /* verif contenu reponse requete */
                            var errorStatus = false;
                            for ( result in json) {

                                if ( result == "error") {
                                    errorStatus = true;
                                }
                            }

                            /* si erreur -> afficher msg erreur */
                            if ( errorStatus == true ) {
                                remove_class(error, "isHidden");
                                return;
                            }
                        } else {
                            return;
                        }
                    }                    
                } catch (e) {

                    /* afficher msg erreur */
                    close_popup();
                    open_popup_message('Résultat de votre recherche', 'Votre demande n\'a pu être traitée, merci de réessayer ultérieurement.', 'red');
                    return;
                }

                /* si tout est ok -> executer la fonction de callback */
                callback(json);
                return mainSearch;
            } 
            /* si aucun resultat */
            else if ( request.status == 404 ) {

                /* afficher msg erreur */
                remove_class(error, "isHidden");
            }
            /* si erreur technique */
            else {

                /* afficher msg erreur */
                close_popup();
                open_popup_message('Résultat de votre recherche', 'Votre demande n\'a pu être traitée, merci de réessayer ultérieurement.', 'red');
            }
        }
    }
}

/* suppression espaces dans siren */
function clear_siren(element) {

    var value = element.value.replace(/ /g, '');
    element.value = value;
}

/* verifier validite remplissage form recherche entreprise pour crea liste dashboard */
function verif_form_search_company() {

    var form        = document.getElementById("recherche_entrep2");
    var input       = form.getElementsByClassName("verif-empty");
    var inputPrenom = document.getElementById("entreppre");
    var inputApe    = document.getElementById("entrepape");
    var inputDepart = document.getElementById("avancedep");
    var error       = document.getElementById("recherche_entrep2_error");
    var errorMsg    = document.getElementById("recherche_entrep2_error_msg");
    var inputEmpty  = 0;
    var inputStar   = 0;

    /* verif si champs vides */
    for ( var i = 0; i < input.length; i++) {

        if ( input[i].value != "" ) {

            inputEmpty++;

            if ( input[i] == inputPrenom || input[i] == inputApe || input[i] == inputDepart) {
                inputStar++;
            }
        }
    }

    /* gestion des erreurs de saisie */
    /* si tous les champs sont vides */
    if ( inputEmpty == 0 ) {

        errorMsg.innerHTML = "Vous devez remplir au moins 1 champs";
        add_class(error, "no-info");
        return false;
    }
    /* si au moins 1 champs renseign?*/
    else {

        /* si 0 ou 2+ champs avec etoile */
        if ( inputStar != 1 ) {

            remove_class(error, "no-info");
            errorMsg.innerHTML = "";
            return true;
        }
        /* si 1 seul champs avec etoile */
        else {

            errorMsg.innerHTML = "Vous devez remplir un 2e champs comportant une *";
            add_class(error, "no-info");
            return false;
        } 
    }
}

function get_form_data(form) {
    var formElements = document.getElementById(form).elements,
        formMethod   = document.getElementById(form).method,
        formQuery    = document.getElementById(form).action,
        formData,
        queryParam   = '';

    if(formMethod === 'post') {
        formData = new FormData();

        for(var i = 0; i < formElements.length; i++) {
            if(formElements[i].type === 'checkbox' && formElements[i].checked === false) {
                continue;
            } else {
                formData.append(formElements[i].name, formElements[i].value);
            }
        }
        return formData;
    } else {
        for(var i = 0; i < formElements.length - 1; i++) {
            if(formElements[i].type === 'checkbox' && formElements[i].checked === false) {
                continue;
            } else {
                if(i === 0) {
                    queryParam = '?' + formElements[i].name + '=' + formElements[i].value;
                } else {
                    if(formElements[i].value != '') {
                        queryParam += '&' + formElements[i].name + '=' + formElements[i].value;
                    } else {
                        continue;
                    }
                }
            }
        }
        return queryParam;
    }
}

function show_search_results(response) {
    var searchResults = document.getElementById('frame_entrepr_results'),
        resultsCheck  = document.getElementById('search_results_list'),
        json          = response,
        searchPopup   = document.getElementById('popup_search'),
        container     = document.getElementById('popup_search_results'),
        resultCount   = document.getElementById('search_results_total'),
        searchName    = document.getElementById('search_name'),
        titleInput    = document.getElementById('create_list_title')
        button        = document.getElementById('form_create_list_button');

    var resultsCheckHtml  = resultsCheck.innerHTML,
        searchResultsHtml = "";

    for(var key in json.listedata) {
        searchResultsHtml += resultsCheckHtml.replace(/{{id}}/g, key)
                                             .replace(/{{siren}}/g, json.listedata[key]['siren'])
                                             .replace(/{{deno}}/g, json.listedata[key]['deno'])
                                             .replace(/{{ape}}/g, json.listedata[key]['ape'])
                                             .replace(/{{apelib}}/g, json.listedata[key]['apelib'])
                                             .replace(/{{ville}}/g, json.listedata[key]['ville']);
    }

    searchResults.innerHTML = searchResultsHtml;
    resultCount.textContent = document.getElementsByClassName('searchResults').length;
    searchName.textContent = mainSearch;
    add_class(container, 'result');

    document.getElementById('check_results_all').checked = true;

    if(document.getElementsByClassName('searchResults').length == 0) {
        add_class(titleInput, 'isDisabled');
        add_class(button, 'isDisabled');
    } else {
        remove_class(titleInput, 'isDisabled');
        remove_class(button, 'isDisabled');

        document.getElementById('form_create_list').addEventListener('keyup', function bind_submit_event(e) {
            if(e.keyCode == 13) {
               which_form_to_submit(submit_form_ajax_answer);
               document.getElementById('form_create_list').removeEventListener('keyup', bind_submit_event);
            }
        });

        toggleAllCheck('frame_entrepr_results', 'check_results_all');
    }

    resize_popup_content_height('frame_entrepr_results');
}

function show_import_results(content, source, response) {

    var validTemplate    = document.getElementById('import_list_valid'),
        notValidTemplate = document.getElementById('import_list_not_valid'),
        validResults     = document.getElementById('valid_import_results'),
        notValidResults  = document.getElementById('not_valid_import_results'),
        json             = response,
        importFile       = document.getElementById('popup_import_file'),
        container        = document.getElementById('popup_import_results'),
        totalCount       = document.getElementById('total_import'),
        validCount       = document.getElementById('valid_import'),
        notValidCount    = document.getElementById('not_valid_import');

    // TRAITEMENT DES RESULTATS VALIDES
    var validTemplateHtml       = validTemplate.innerHTML,
        validImportResultsHtml = "";

    for(var key in json.listedata) {

        if(json.listedata[key]['error']) {
            continue;
        } else {
            validImportResultsHtml += validTemplateHtml.replace(/{{id}}/g, key)
                                                       .replace(/{{siren}}/g, json.listedata[key]['siren'])
                                                       .replace(/{{deno}}/g, json.listedata[key]['deno'])
                                                       .replace(/{{ape}}/g, json.listedata[key]['ape'])
                                                       .replace(/{{siret}}/g, json.listedata[key]['siret'])
                                                       .replace(/{{effectif}}/g, json.listedata[key]['trancheeff']);
        }
    }

    validResults.innerHTML = validImportResultsHtml;
    validCount.textContent = document.getElementsByClassName('importResults').length;

    // TRAITEMENT DES RESULTATS INVALIDES
    var notValidTemplateHtml      = notValidTemplate.innerHTML,
        notValidImportResultsHtml = "";

    for(var key in json.listedata) {
        if(!json.listedata[key]['error']) {
            continue;
        } else {
            if(source[key]['A'] == null) {
                source[key]['A'] = 'N/A';
            }
            notValidImportResultsHtml += notValidTemplateHtml.replace(/{{id}}/g, key)
                                                             .replace(/{{siren}}/g, source[key]['A']);
        }
    }

    notValidResults.innerHTML = notValidImportResultsHtml;
    notValidCount.textContent = document.getElementsByClassName('importNotValid').length;

    totalCount.textContent = parseInt(validCount.textContent) + parseInt(notValidCount.textContent);

    add_class(container, 'result');
    add_class(importFile, 'importFile');

    resize_popup_content_height('form_create_list_import');

    document.getElementById('check_import_results_all').checked = true;

    document.getElementById('form_create_list_import').addEventListener('keyup', function bind_submit_event(e) {
        if(e.keyCode == 13) {
            which_form_to_submit(submit_form_ajax_answer);
            document.getElementById('form_create_list_import').removeEventListener('keyup', bind_submit_event);
        }
    });

    toggleAllCheck('form_create_list_import', 'check_import_results_all');
}

function show_watch_results(response) {

    open_popup('popup_watch', function() {
        var watchResults = document.getElementById('frame_watch_results'),
            watchCheck   = document.getElementById('search_results_list'),
            json         = response,
            resultCount  = document.getElementById('watch_results_total');

        var watchCheckHtml   = watchCheck.innerHTML,
            watchResultsHtml = "";

        /* suppression des doublons veilles premium/gratuites */
        var cleanJson = remove_duplicates(json['listedata'], 'siren');

        for (var key in cleanJson) {
            watchResultsHtml += watchCheckHtml.replace(/{{id}}/g, key)
                                              .replace(/{{siren}}/g, cleanJson[key]['siren'])
                                              .replace(/{{deno}}/g, cleanJson[key]['deno'])
                                              .replace(/{{ape}}/g, cleanJson[key]['ape'])
                                              .replace(/{{apelib}}/g, cleanJson[key]['apelib'])
                                              .replace(/{{ville}}/g, cleanJson[key]['ville']);
        }

        watchResults.innerHTML  = watchResultsHtml;
        resultCount.textContent = document.getElementsByClassName('searchResults').length;

        resize_popup_content_height('frame_watch_results');

        document.getElementById('check_watch_all').checked = true;

        document.getElementById('form_create_watch_list').addEventListener('keyup', function(e) {
            if(e.keyCode == 13) {
               verif_empty_input('create_watch_list_title');
               which_form_to_submit(submit_form_ajax_answer);
            }
        });

        toggleAllCheck('frame_watch_results', 'check_watch_all');
    });
}

function fill_option_list(url, select, option) {
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request.overrideMimeType) {
            request.overrideMimeType("application/json");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre navigateur ne supporte pas AJAX");
                }
            }
        }
    }
    if (request && request.readyState != 0) {
        request.abort();
    }

    request.open('GET', url, true);
    request.send();

    request.onreadystatechange = function() {

        var selectList = document.getElementById(select),
            optionList = document.getElementById(option),
            json;

        if (request.readyState == 4 && request.status == 200) {
            try {
                json = JSON.parse(request.responseText);
            } catch (e) {
                return;
            }

            var optionListHtml = optionList.innerHTML,
                selectListHtml = "",
                defaultSelect = document.createElement('option');

            for(var key in json.listedata) {
                selectListHtml += optionListHtml.replace(/{{dep}}/g, json.listedata[key]['dep'])
                                                .replace(/{{desc}}/g, json.listedata[key]['desc']);
            }

            selectListHtml = '<option value="">--</option>' + selectListHtml;
            
            selectList.innerHTML = selectListHtml;
        }
    }
}

function submit_form_ajax_answer(response) {
    check_json_response(response);
    get_dashboard_lists();
}

function reset_search_popup(eventCallback, param1, param2) {
    var popup         = document.getElementById('popup'),
        searchForm    = document.getElementById('popup_search_results') ;

    popup.innerHTML = '';
    open_popup('popup_search', submit_form_ajax, 'recherche_entrep2', show_search_results);
    setTimeout(function(){ 
        fill_option_list('/cgi-bin/liste-departement', 'avancedep', 'departments_lists'); 
        init_recherche();
    }, 200);
}

function reset_modify_popup() {
    var listName = document.getElementById('modify_list_title');

    listName.value = '';
    listName.focus();
    listName.blur();

    hide_input_error('modify_list_title');
}

function reset_input(id) {
    var input = document.getElementById(id);

    input.value = "";
    input.focus();
    input.blur();
    hide_input_error(id);
}

function open_list_options(id) {
    var overlay    = document.getElementById('invisible_overlay');
        optionList = document.getElementById(id);

    overlay.addEventListener('click', function() {
        close_list_options(id);
    });

    remove_class(optionList, 'isHidden');
    remove_class(overlay, 'isHidden');
}

function close_list_options(id) {
    var overlay    = document.getElementById('invisible_overlay');
        optionList = document.getElementById(id);

    add_class(optionList, 'isHidden');
    add_class(overlay, 'isHidden');
}

function watch_list(callback, context) {

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request.overrideMimeType) {
            request.overrideMimeType("application/json");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre navigateur ne supporte pas AJAX");
                }
            }
        }
    }
    if (request && request.readyState != 0) {
        request.abort();
    }

    request.open('GET', '/cgi-bin/compte-api-veilles', true);
    request.send();

    /* affichage loader chargement */
    if ( context == "veilles" ) {
        open_progress_overlay('popup_create_list', 'Récupération de vos veilles...');
    }

    request.onreadystatechange = function() {
        var json;

        if ( request.readyState == 4 ) {

            /* cacher loder chargement */
            close_progress_overlay('popup_create_list');

            /* reponse ok */
            if ( request.status === 200 ) {

                try {
                    json = JSON.parse(request.responseText);
                } catch (e) {
                    return;
                }

                callback(json);
            }
            /* reponse ko */
            else {

                open_popup_message('Création d\'une liste depuis Mes Veilles Société', 'Impossible de créer une liste à partir de vos veilles.', 'red');
            } 
        }
    }
}

function toggleAllCheck(form, checkbox) {
    var checkboxes = new Array(),
        checkAll = document.getElementById(checkbox);

    checkboxes = document.getElementById(form).getElementsByTagName('input');

    for (var i = 0; i < checkboxes.length; i++)  {
        if (checkboxes[i].type == 'checkbox' && !checkboxes[i].classList.contains('isDisabled'))   {
            checkboxes[i].checked = checkAll.checked;
        }
    }
}

/* FONCTIONS DE PREPARATION ET EXECUTION DE LA REQUETE */
var rsAPI = new RessourceAPI();

function get_dashboard_lists(response) {
    /* fermeture de popups eventuelles */
    close_popup();
    
    /* uniquement sur home du dashboard */
    if ( document.location.href.indexOf("/reseau") != -1 ) {

        if (detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11") {

            request_wrapper_IE(
                'GET', 
                '/api/liste', 
                null, 
                null,
                function(){ 

                    if ( document.location.href.indexOf("/dashboard") != -1 ) {
                        open_progress_overlay('main', 'Récupération de vos listes...');
                    } 
                }, 
                null, 
                handle_request_error,
                create_dashboard_lists,
                function(){ 
                    if ( document.location.href.indexOf("/dashboard") != -1 ) {
                        close_progress_overlay('main');
                    } 
                }
            );
        } else {
            if (rsAPI == undefined) {
                var rsAPI = new RessourceAPI();
            }
            rsAPI.add("/api/liste", "GET", {
                before : function() { 

                    if ( document.location.href.indexOf("/dashboard") != -1 ) {
                        open_progress_overlay('main', 'Récupération de vos listes...');
                    } 
                },
                running : null,
                error : handle_request_error,
                ok : create_dashboard_lists,
                end : function(){ 

                    if ( document.location.href.indexOf("/dashboard") != -1 ) {
                        close_progress_overlay('main');
                    } 
                }
            });

            if(response) {
                check_json_response(response);
            }

            rsAPI.ressource["/api/liste"].GET.run('');
        }
    }
}

function post_form_data(form, id) {
    var param = get_form_data(form);

    if (detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11") {
        if(id) {
            request_wrapper_IE(
                'POST',
                '/api/liste/' + id,
                param,
                'formData',
                function() { open_progress_overlay('popup_' + form, 'Création de votre liste...')},
                null,
                handle_request_error,
                get_dashboard_lists,
                function() {close_progress_overlay('popup_' + form)}
            );
        } else {
            request_wrapper_IE(
                'POST',
                '/api/liste/',
                param,
                'formData',
                function() { open_progress_overlay('popup_' + form, 'Création de votre liste...')},
                null,
                handle_request_error,
                get_dashboard_lists,
                function() {close_progress_overlay('popup_' + form)}
            );
        }
    } else {
        if(id) {
            rsAPI.add("/api/liste/" + id, "POST", {
                before : function() { open_progress_overlay('popup_' + form, 'Création de votre liste...') },
                running : null,
                error : handle_request_error,
                ok : get_dashboard_lists,
                end : function() {close_progress_overlay('popup_' + form)}
            });

            rsAPI.ressource["/api/liste/" + id].POST.run('', param, 'formData');
        } else {
            rsAPI.add("/api/liste", "POST", {
                before : function() { open_progress_overlay('popup_' + form, 'Création de votre liste...') },
                running : null,
                error : handle_request_error,
                ok : get_dashboard_lists,
                end : function() {close_progress_overlay('popup_' + form)}
            });

            rsAPI.ressource["/api/liste"].POST.run('', param, 'formData');
        }
    }
}

function delete_request(id) {

    if(detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11") {
        if(id) {
            request_wrapper_IE(
                'DELETE',
                '/api/liste/' + id,
                null,
                null,
                function() { open_progress_overlay('popup_delete_list', 'Suppression de votre liste...')},
                null,
                handle_request_error,
                function() {confirm_delete_request(id);},
                function() {close_progress_overlay('popup_delete_list');}
            );
        } else {
            request_wrapper_IE(
                'DELETE',
                '/api/liste/',
                null,
                null,
                function() { open_progress_overlay('popup_delete_list', 'Suppression de votre liste...')},
                null,
                handle_request_error,
                confirm_delete_request,
                function() {close_progress_overlay('popup_delete_list');}
            );
        }
    } else {
        if(id) {
            rsAPI.add("/api/liste?id_liste=" + id, "DELETE", {
                before : function() { open_progress_overlay('popup_delete_list', 'Suppression de votre liste...') },
                running : null,
                error : handle_request_error,
                ok : function() {confirm_delete_request(id);},
                end : function() {close_progress_overlay('popup_delete_list');}
            });

            rsAPI.ressource["/api/liste?id_liste=" + id].DELETE.run('');
        } else {
            rsAPI.add("/api/liste", "DELETE", {
                before : function() { open_progress_overlay('popup_delete_list', 'Suppression de votre liste...') },
                running : null,
                error : handle_request_error,
                ok : confirm_delete_request,
                end : function() {close_progress_overlay('popup_delete_list');}
            });

            rsAPI.ressource["/api/liste"].DELETE.run('');
        }
    }
}

//function confirm_delete_request() {
function confirm_delete_request(id) {

    /* supprimer id de la liste des notifs */
    if (id) {

        var count = 0;
        for (key in stockInfosNotifications) {

            count++;
        }

        /* si stockInfosNotifications rempli */
        if ( count != 0 ) {

            /* supprimer l'id */
            if ( stockInfosNotifications[id] ) {

                delete stockInfosNotifications[id];
            }
        }
        /* sinon */
        else {

            /* supprimer l'id dans le html de la liste des notifs */
            var cible  = document.getElementById("notifications_list_" + id);
            var parent = document.getElementById("dashboard-notifications-list-content-inside");

            if ( cible ) {

                parent.removeChild(cible);
            }
        }

        /* MAJ nb notifs a afficher */
        show_nb_notifs();
    }

    /* mise a jour affichage liste de listes */
    get_dashboard_lists();

    /* rediriger vers home dashboard */
    //window.location.href = '/app/reseau/dashboard';
    router.navigate('/app/reseau/dashboard', true);

    /* affichage notif */
    var notif = {"msg":"La demande de suppression de la liste a bien été prise en compte"};
    check_json_response(notif);
}

function convertlib(input) {

    open_progress_overlay('popup_import', "Importation de votre fichier...");

    var data = document.getElementById(input + "_input");
    var isCSV = has_extension(input + "_input", ['.csv']);
    var isXLS = has_extension(input + "_input", ['.xls', '.xlsx']);

    if(!has_extension(input + '_input', ['.xls', '.xlsx', 'csv'])) {
        close_progress_overlay('popup_import');
        alert('Le fichier n\'est pas valide.');
        reset_upload_file('xls_upload');
        close_progress_overlay('popup');
        return;
    }

    var fr = new FileReader();
    fr.onload = function() {
        var res = fr.result;
        if (isCSV) {
            var wb = XLSX.read(res, {type: 'binary'});
        }
        if (isXLS) {
            var wb = XLSX.read(res, {type: 'array'});
        }
        var ws = wb.Sheets[wb.SheetNames[0]];
        var content = XLSX.utils.sheet_to_csv(ws);
        var source = XLSX.utils.sheet_to_json(ws, {header:"A", raw:false, defval:null});

        var listName = document.getElementById('xls_upload_title');
        var listImportName = document.getElementById('name_create_list_import');

        listImportName.value = listName.value;
        submit_list_file_content(input, content, source, show_import_results);
    }
    if (isCSV) {
        fr.readAsBinaryString(data.files[0]);
    }
    if (isXLS) {
        fr.readAsArrayBuffer(data.files[0]);
    }
}

function open_accordion(id, callback) {
    var accordion = document.getElementById(id);

    if(!accordion.classList.contains('open')) {
        add_class(accordion, 'open');

        setTimeout(function() {
            if(callback) {
                callback(id);
            }
        }, 200);
    }
}

function close_accordion(id, callback) {
    var accordion = document.getElementById(id);

    if(accordion.classList.contains('open')) {
        remove_class(accordion, 'open');
        reset_anim_dashboard();

        if(callback) {
            callback(id);
        }
    }
}

function turnon_opacity(id, callback) {
    var accordion = document.getElementById(id);

    if(!accordion.classList.contains('visible')) {
        add_class(accordion, 'visible');

        if(callback) {
            callback(id);
        }
    }
}

function turnoff_opacity(id, callback) {
    var accordion = document.getElementById(id);

    if(accordion.classList.contains('visible')) {
        remove_class(accordion, 'visible');

        if(callback) {
            callback(id);
        }
    }
}

function init_dashboard_banner() {
    var beginner   = document.getElementById('dashboard_beginner'),
        advanced   = document.getElementById('dashboard_advanced'),
        lists      = document.getElementById('lists_container'),
        listsCount = lists.childElementCount;

    if(listsCount > 2) {
        remove_class(advanced, 'isHidden');
        if(!beginner.classList.contains('isHidden')) {
            add_class(beginner, 'isHidden');
        }
    } else {
        remove_class(beginner, 'isHidden');
        if(!advanced.classList.contains('isHidden')) {
            add_class(advanced, 'isHidden');
        }
    }
}

var animArray = [];

function load_dashboard_anim(callback) {
    var animMobile  = ['anim-mobile-1', 'anim-mobile-2', 'anim-mobile-3'],
        animDesktop = ['anim-desktop-1', 'anim-desktop-2', 'anim-desktop-3'],
        autoplay    = [true, false, false],
        lottie1     = document.getElementById('lottie1'),
        svg         = lottie1.getElementsByTagName('svg'),
        checklist1  = document.getElementById('checklist_anim1'),
        checklist2  = document.getElementById('checklist_anim2'),
        checklist3  = document.getElementById('checklist_anim3'),
        overlay1    = document.getElementById('lottie1_overlay'),
        overlay2    = document.getElementById('lottie2_overlay'),
        overlay3    = document.getElementById('lottie3_overlay');

    if(svg.length == 0) {
        if(detect_device() === device_type.DESKTOP) {
            for(var i = 0; i < animDesktop.length; i++) {
                var params = {
                    container: document.getElementById('lottie' + (i+1)),
                    renderer: 'svg',
                    loop: false,
                    autoplay: autoplay[i],
                    name: animDesktop[i],
                    path: '/scripts/' + animDesktop[i] + '.json'
                }

                animArray[i] = lottie.loadAnimation(params);
            }

            setInterval(function() {
                add_class(checklist1, 'open');
            }, 3000);

            animArray[0].addEventListener('complete', function() {
                animArray[0].goToAndStop(5, true);
                add_class(overlay1, 'end');
                if(!is_class_exist(overlay2, 'end')) {
                    animArray[1].play();
                    if(!is_class_exist(checklist2, 'open')) {
                        setInterval(function() {
                            add_class(checklist2, 'open');
                        }, 2000);
                    }
                }
            });

            animArray[1].addEventListener('complete', function() {
                animArray[1].stop(); 
                add_class(overlay2, 'end');
                if(!is_class_exist(overlay3, 'end')) {
                    animArray[2].play();
                    if(!is_class_exist(checklist3, 'open')) {
                        setInterval(function() {
                            add_class(checklist3, 'open');
                        }, 1000);
                    }
                }
            });

            animArray[2].addEventListener('complete', function() {
                animArray[2].stop(); 
                add_class(overlay3, 'end');
            });
        } else {
            for(var i = 0; i < animMobile.length; i++) {
                var params = {
                    container: document.getElementById('lottie' + (i+1)),
                    renderer: 'svg',
                    loop: false,
                    autoplay: autoplay[i],
                    name: animMobile[i],
                    path: '/scripts/' + animMobile[i] + '.json'
                }

                animArray[i] = lottie.loadAnimation(params);
            }

            animArray[0].addEventListener('complete', function() {
                animArray[0].goToAndStop(5, true);
                add_class(overlay1, 'end');
            });

            animArray[1].addEventListener('complete', function() {
                animArray[1].stop();
                add_class(overlay2, 'end');
            });

            animArray[2].addEventListener('complete', function() {
                animArray[2].stop();
                setTimeout(function() {
                     add_class(overlay3, 'end');
                }, 1000);
            });

            document.onscroll = function(e){
                if(overlay2.getBoundingClientRect().top <= 250 && animArray[1].isPaused && !is_class_exist(overlay2, 'end')) {
                    animArray[1].play();
                }

                if(overlay3.getBoundingClientRect().top <= 250 && animArray[2].isPaused && !is_class_exist(overlay3, 'end')) {
                    animArray[2].play();
                }
            }
        }
    }
}

function reset_anim_dashboard() {
    var animations = document.getElementsByClassName('Dashboard__video');

    for(var j = 0; j < animArray.length; j++) {
        animArray[j].destroy();
    }

    for(var i = 0; i < animations.length; i++) {
        animations[i].innerHTML = '<div id="lottie'+ (i + 1) +'_overlay" class="Dashboard__videoReplay"><div id="replay_button'+ (i + 1) +'" class="button">Replay</div></div>';
    }
}

function start_pause_anim(anim, overlay) {
    if(anim.isPaused) {
        document.getElementById(overlay).classList.remove('end');
        anim.play();
    } else {
        anim.pause();
        document.getElementById(overlay).classList.add('end');
    }
}

function check_import_IE() {
    if(detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11") {
        add_class(document.getElementById('xls_cta'), 'isDisabled');
        remove_class(document.getElementById('xls_cta_message'), 'isHidden');
    }
}

function get_modify_list_id(id, name) {
    open_popup('popup_modify_list', function() {
        var listName = document.getElementById('modify_list_name');

        listName.textContent = name;

        if(document.getElementById('modify_list_button')) {
            var button = document.getElementById('modify_list_button');

            document.getElementById('modify_list_form').action = '/api/liste/' + id;
            add_event(button, 'click', function() { 
                post_form_data('modify_list_form', id);
            });

            document.getElementById('modify_list_form').addEventListener('keyup', function bind_submit_event(e) {
                if(e.keyCode == 13) {
                   post_form_data('modify_list_form', id);
                   document.getElementById('modify_list_form').removeEventListener('keyup', bind_submit_event);
                }
            });
        }
    });
}

function get_delete_list_confirmation(id, name) {

    open_popup('popup_delete_list', function() {
        var button = document.getElementById('delete_list_confirmation_button');

        document.getElementById('delete_list_name').textContent = name;
        add_event(button, 'click', function() {delete_request(id); });
    });
}

function resize_popup_content_height(content) {
    if(document.getElementById(content)) {
        var wHeight   = window.innerHeight,
            wWidth    = window.innerWidth,
            container = document.getElementById(content);

        if(container.offsetHeight < wHeight) {
            return;
        } else {
            switch(content) {
                case "frame_entrepr_results":
                    // Fonction affine valable pour le formulaire de recherche (f(x)=-0.004x + 4.772)
                    container.style.height = wHeight / (-0.004 * wHeight + 4.772) + "px";
                    break;
                case "frame_watch_results":
                    // Fonction affine valable pour la liste des veilles (f(x)=-0.004x + 4.772)
                    container.style.height = wHeight / (-0.004 * wHeight + 4.772) + "px";
                    break;
                case "popup_import_body":
                    // Fonction affine valable pour le formulaire d'import (f(x)=-0.0018x + 2.2024)
                    container.style.height = wHeight / (-0.0018 * wHeight + 2.2024) + "px";
                    break;
                case "form_create_list_import":
                    // Fonction affine valable pour le tableau de resultats de l'import (f(x)=-0.001x + 2.47)
                    //container.style.height = wHeight / (-0.0015 * wHeight + 2.692) + "px";;
                    container.style.height = wHeight / (-0.001 * wHeight + 2.47) + "px";
                    break;
                default:
                    break; 
            }
        }
    }
}

function sticky_sticker_dashboard() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        sticker = document.getElementById('dashboard-sticker');

    window.addEventListener('resize', sticky_sticker_dashboard, false);

    if(x >= 1280 && x <= 1720) {
        w.addEventListener('scroll', function(e) {
            if(w.scrollY >= 90 && !is_class_exist(sticker, 'sticky')) {
                add_class(sticker, 'sticky');
            } else if(w.scrollY < 90 && is_class_exist(sticker, 'sticky')) {
                remove_class(sticker, 'sticky');
            }
        });
    }
}

/* puce de couleur pour les veilles */
function colorize_watch_bullet() {
    var cell = document.getElementsByClassName('cellWatch');

    for(var i = 0; i < cell.length; i++) {
        select = cell[i].getElementsByTagName('select'),
        bullet = cell[i].getElementsByClassName('i-circle');

        switch(select[0].value) {
            case "sans":
                remove_class(bullet[0], "gratuite premium");
                add_class(bullet[0], "sans");
                break;

            case "gratuite":
                remove_class(bullet[0], "sans premium");
                add_class(bullet[0], "gratuite");
                break;

            case "premium":
                remove_class(bullet[0], "sans gratuite");
                add_class(bullet[0], "premium");
                break;
        }
    }
}

/* MISE EN PLACE TESTS A/B POUR BANNIERE DASHBOARD */
function choose_banner_dashboard() {
    var random50    = Math.random(),
        random33    = Math.random(),
        openBannerA = document.getElementById('open_banner_A'),
        openBannerB = document.getElementById('open_banner_B'),
        openBannerC = document.getElementById('open_banner_C'),
        startListA  = document.getElementById('start_list_A'),
        startListB  = document.getElementById('start_list_B');

    if(random33 <= 0.33) {
        remove_class(openBannerA, 'isHidden');
        gana_event(null, 'dashboard', 'AB_201901_BannerList_A_display'); 
    } else if (random33 > 0.33 && random33 <= 0.66) {
        remove_class(openBannerB, 'isHidden');
        gana_event(null, 'dashboard', 'AB_201901_BannerList_B_display'); 
    } else {
        remove_class(openBannerC, 'isHidden');
        gana_event(null, 'dashboard', 'AB_201901_BannerList_C_display'); 
    }

    if(random50 >= 0.5) {
        remove_class(startListA, 'isHidden');
        gana_event(null, 'dashboard', 'AB_201901_StartList_A_display'); 
    } else {
        remove_class(startListB, 'isHidden');
        gana_event(null, 'dashboard', 'AB_201901_StartList_B_display'); 
    }
}
/********************************************************/
/*************** VIEW MINIFICHE SCROLLING ***************/
/********************************************************/

function init_minifiche_view() {
    var id = document.getElementById('minifichecarto');
    if (!id) {
        setTimeout(init_minifiche_view, 20);
    } else {
        init_minifiche_resume();
        init_minifiche_bilan();
        setTimeout(init_minifiche_view, 20);
    }
}

/* La vue minifiche-resume */
function init_minifiche_resume() {
    var resume = document.getElementById('minifiche_resume');
    display_num(resume);
}

/* La vue minifiche-resume */
function init_minifiche_bilan() {
    var bilan = document.getElementById('minifiche_bilan');
    display_num(bilan);
}

function set_minificheinit() {
    var coldroite = document.getElementById('coldroite');
    var off = 0;
    var offbis = 0;

    off = get_offset_top('infosref');
    offbis = get_offset_top('coldroite');

    if ((offbis + 50) > off) {


        /* On corrige le bug d'offset du au table-cell */
        for (var i = 0; i < nb_child(coldroite); i++) {
            if (coldroite.children[i].id == 'infosref') {
                break;
            }

            off += get_height(coldroite.children[i]);
        }
    }

    minifiche_posinit = parseInt(off);
}

function init_minifiche() {
    var id = document.getElementById('infoscontent');
    if (id) {
        set_minificheinit();
        if (id) {
            id.style.top = minifiche_posinit + "px";
            if (document.addEventListener) { /* ie 8+ */
                add_event(window, "scroll", function() {scroll_minifiche(id);});
                scroll_minifiche(id);
            }
        }

        init_minifiche_view();
    }
}

function scroll_minifiche(id) {
    var minifiche = document.getElementById('infos');
    var footer = document.getElementById('footer') || document.getElementById('footer-compte');

    if ( minifiche && footer) {

        if (typeof(footer) == "undefined") {
            return;
        }

        set_minificheinit();
        var scrollY = getY();
        var height = get_height(minifiche);

        if ((scrollY) >= (minifiche_posinit) && is_desktop_device()) {
            if (((scrollY + height + 16) > footer.offsetTop)) {
                id.style.top = footer.offsetTop - (scrollY + height) - 8 +  "px";
            } else {
                id.style.top = 0.2 + "em";
            }

            add_class(id, "floatable");
        } else {
            remove_class(id, "floatable");
        }
    }
}
/********************************************************/
/********************** ABONNEMENT PLUS *****************/
/********************************************************/

/* fonctionnement page offres d'abonnement */
function init_abonnement_plus() {

    /* ouvrir tableau comparatif au chargement */
    forced_opening_comparatif();

    /* effet scroll fluide */
    smooth_effect();

    /* donner meme hauteur aux offres dirigeant + et societe + */
    setTimeout( function(){

        height_offres_plus();
    }, 10);

    /* donner hauteur a l'intro du tableau comparatif */
    setTimeout( function(){

        height_intro_compare();
    }, 10);

    /* gestion btns switch */
    abonnement_switch_onload();
}

/* fonctionnement page carto */
function init_carto_plus() {

    /* donner meme hauteur aux offres dirigeant + et societe + */
    setTimeout( function(){

        height_offres_plus();
    }, 10);

    /* donner hauteur a l'intro du tableau comparatif */
    setTimeout( function(){

        height_intro_compare();
    }, 10);

    /* gestion btns switch */
    abonnement_switch_onload();
}

/* ouvrir tableau comparatif au chargement */
function forced_opening_comparatif() {

    if ( document.location.href.indexOf('comparatif=open') != -1 ) {

        show_abonnement_comparatif('open', 'page_abonnement');
    }
}

/* afficher l'offre cachee */
function show_offre(origin, idCible) {

    var origin = document.getElementById(origin),
        cible  = document.getElementById(idCible),
        list   = document.getElementById("offres_list");

    /* afficher l'offre cachee */
    setTimeout( function(){

        if ( window.innerWidth > 1300 ) {
            cible.style.height = "0";
            cible.style.opacity = "0";
        }
        remove_class(cible, "isClosed");
    }, 5);

    /* donner meme hauteur aux offres dirigeant + et societe + */
    setTimeout( function(){
        cible.style.height = "";
        height_offres_plus();
    }, 300);

    /* faire apapraitre bloc apres calcul hauteur */
    setTimeout( function(){
        cible.style.opacity = "";
    }, 300);

    /* afficher le btn switch qui va avec */
    if ( idCible == "offre_societe_plus" ) {

        var btnSwitch = document.getElementById("switch_societe_plus");
    } else if ( idCible == "offre_dirigeant_plus" ) {

        var btnSwitch = document.getElementById("switch_dirigeant_plus");
    }

    if ( window.innerWidth <= 1000 ) {

        list.appendChild(btnSwitch.parentNode);

        setTimeout( function(){
            remove_class(btnSwitch, "isHidden");
        }, 5);
    } else {

        if ( document.getElementById("avantages_carto_dirigeant") ) {

            setTimeout( function(){
                remove_class(btnSwitch, "isHidden");
            }, 5);
        }

        add_event(window, "resize", function() {

            if ( window.innerWidth <= 1000 ) {

                remove_class(btnSwitch, "isHidden");
            }
        });
    }

    /* enlever le focus dans l'offre duo */
    remove_class(origin, "isFocus");

    /* ajouter les classes pour gestion des margin */
    if ( idCible == "offre_societe_plus" ) {

        add_class(list, "societeVisible");
    } else if ( idCible == "offre_dirigeant_plus" ) {

        add_class(list, "dirigeantVisible");
    }

    /* positionner le scroll */
    if ( window.innerWidth < 1000 && !document.getElementById("avantages_carto_dirigeant") ) {

        setTimeout(function(){

            /* sur page carto ou dirigeant */
            if ( document.getElementById("fiche_carto") ) {

                var scrollY  = getY(document.getElementById("documentbody_around"));

                if ( window.innerWidth < 480 ) {

                    var cibleTop = scrollY + 400;
                } else if ( window.innerWidth > 480 && window.innerWidth < 600 ) {

                    var cibleTop = scrollY + 500;
                } else if ( window.innerWidth > 600 && window.innerWidth < 768 ) {

                    var cibleTop = scrollY + 600;
                }  else if ( window.innerWidth > 768 ) {

                    var cibleTop = scrollY + 700;
                }
            }
            /* sur pages abonnement */
            else if ( !document.getElementById("avantages_carto_dirigeant") ) {

                var cibleTop = cible.offsetTop;

                if ( idCible == "offre_societe_plus" ) {

                    cibleTop = cibleTop + 400;
                }
            }

            if ( !is_class_exist(document.body, 'nav-ie11') ) {

                document.getElementById("documentbody_around").scrollTo(0,cibleTop);
            } else {

                document.getElementById("documentbody_around").scrollTop = cibleTop;
            }
        }, 50);
    }

    /* sur dirigeant */
    if ( document.getElementById("avantages_carto_dirigeant") ) {

        setTimeout(function() {

            /* recalculer hauteur du bloc */
            open_avantages_carto("show-offer");

            /* positionner scroll */
            var scrollY  = getY(document.getElementById("documentbody_around"));

            if ( window.innerWidth < 480 ) {

                var cibleTop = scrollY + 200;
            } else if ( window.innerWidth > 480 && window.innerWidth < 600 ) {

                var cibleTop = scrollY + 300;
            } else if ( window.innerWidth > 600 && window.innerWidth < 768 ) {

                var cibleTop = scrollY + 400;
            }  else if ( window.innerWidth > 768 ) {

                var cibleTop = scrollY + 500;
            }
            
            if ( !is_class_exist(document.body, 'nav-ie11') ) {

                document.getElementById("documentbody_around").scrollTo(0,cibleTop);
            } else {

                document.getElementById("documentbody_around").scrollTop = cibleTop;
            }
        }, 500);
    }
}

/* donner meme hauteur aux offres dirigeant plus et societe plus */
function height_offres_plus() {

    var SocietePlus   = document.getElementById("offre_societe_plus"),
        DirigeantPlus = document.getElementById("offre_dirigeant_plus");

    if ( !is_class_exist(SocietePlus, "isClosed") && !is_class_exist(DirigeantPlus, "isClosed") ) {

        var offreSociete   = document.getElementById('offre_societe_plus_around'),
            btnSociete     = offreSociete.getElementsByClassName('Button'),
            offreDirigeant = document.getElementById('offre_dirigeant_plus_around'),
            btnDirigeant   = offreDirigeant.getElementsByClassName('Button');

        /* seulement quand blocs cote a cote */
        if ( window.innerWidth >= 1300 ) {

            if ( offreSociete.offsetHeight > offreDirigeant.offsetHeight ) {

                var diff = offreSociete.offsetHeight - offreDirigeant.offsetHeight;

                for ( var i = 0; i < btnDirigeant.length; i++) {

                    btnDirigeant[i].style.marginTop = (diff + 2) + "px";
                }
            } else if ( offreDirigeant.offsetHeight > offreSociete.offsetHeight ) {

                var diff = offreDirigeant.offsetHeight - offreSociete.offsetHeight;

                for ( var x = 0; x < btnSociete.length; x++) {

                   btnSociete[x].style.marginTop = (diff + 2) + "px";
                }
            } else {

                for ( var y = 0; y < btnDirigeant.length; y++) {

                    btnDirigeant[y].style.marginTop = "";
                }

                for ( var z = 0; z < btnSociete.length; z++) {

                    btnSociete[z].style.marginTop = "";
                }
            }
        } else {

            for ( var v = 0; v < btnDirigeant.length; v++) {

                btnDirigeant[v].style.marginTop = "";
            }

            for ( var w = 0; w < btnSociete.length; w++) {

                btnSociete[w].style.marginTop = "";
            }
        }
    } else {
        return;
    }
}

/* donner hauteur a l'intro du tableau comparatif */
function height_intro_compare() {

    /* url + ?comparatif=open -> forcer ouverture tableau comparatif*/
    if ( document.location.href.indexOf('comparatif=open') == -1 ) {

        var intro      = document.getElementById("abonnement_comparatif_intro"),
            content    = intro.getElementsByTagName("p"),
            height     = 0,
            introHeight = intro.style.height,
            introHeight = introHeight.substring(0, introHeight.length - 2);

        for ( var i = 0; i < content.length; i++) {

            height = height + content[i].offsetHeight;
        }
        var heightFinal = height + 25;

        /* introHeight pas determine -> appliquer hauteur */
        if (introHeight == "" ) {

            intro.style.height = heightFinal + "px";
        } else {

            /* introHeight determine -> n'appliquer une hauteur q si elle change */
            if (heightFinal != introHeight) {

                intro.style.height = heightFinal + "px";
            }
        }
    } else {
        return;
    }
}

/* ouvrir tableau comparatif des abonnements */
function show_abonnement_comparatif(action, context) {

    var intro   = document.getElementById("abonnement_comparatif_intro"),
        table   = document.getElementById("abonnement_comparatif_table"),
        content = document.getElementById("abonnement_comparatif_table_content"),
        button  = document.getElementById("abonnement_comparatif_table_button"),
        close   = document.getElementById("compare-btn_close");

    if ( action == "open" ) {

        /* cacher intro */
        add_class(intro, "isClosed");
        intro.style.height = "";

        /* afficher table */
        remove_class(close, "isHidden");
        remove_class(table, "isClosed");
        table.style.height = (content.offsetHeight + button.offsetHeight + 28) + "px";

        /* repositionner la croix de fermeture */
        add_class(document.getElementById("abonnement_comparatif"), "open");

        /* agrandir le contenant sur la fiche de dirigeant */
        if ( document.getElementById("avantages_carto_dirigeant") ) {

            var heightInitial = document.getElementById("avantages_carto").offsetHeight,
                introHeight   = intro.offsetHeight,
                tableHeight   = document.getElementById("abonnement_comparatif_table_content").offsetHeight;

                if ( window.innerwidth < 1000 ) {
                    var more = 16;
                } else {
                    var more = 46;
                }

            document.getElementById("avantages_carto").style.height = (heightInitial + tableHeight - introHeight + more) + "px";
        }

        /* positionner le scroll */
        setTimeout(function() {

            var scrollY = getY(document.getElementById("documentbody_around"));

            if ( context && context == "page_abonnement" ) {
                var compare    = document.getElementById("abonnement_comparatif"),
                    compareTop = compare.offsetTop;

                if ( !is_class_exist(document.body, 'nav-ie11') ) {

                    document.getElementById("documentbody_around").scrollTo(0,compareTop);
                } else {

                    document.getElementById("documentbody_around").scrollTop = compareTop;
                }
            } else if ( context && context == "page_carto" ) {

                var newScroll = document.getElementById("avantages_carto").offsetTop,
                    newScroll = newScroll + document.getElementById("degrade").offsetHeight,
                    newScroll = newScroll + document.getElementsByClassName("AvantagesCarto__arguments")[0].offsetHeight,
                    newScroll = newScroll + document.getElementById("avantages_carto_offres").offsetHeight;

                if ( window.innerWidth > 1300 ) {

                    newScroll = newScroll - 200;
                }

                if ( !is_class_exist(document.body, 'nav-ie11') ) {

                    document.getElementById("documentbody_around").scrollTo(0,newScroll);
                } else {

                    document.getElementById("documentbody_around").scrollTop = newScroll;
                }
            }  
        }, 250);
    } else if ( action == "close" || action == "closeResize" ) {

        /* cacher table */
        add_class(table, "isClosed");
        add_class(close, "isHidden");
        table.style.height = "";

        /* diminuer le contenant sur la fiche de dirigeant */
        if ( action == "close" && document.getElementById("avantages_carto_dirigeant") ) {

            var heightInitial = document.getElementById("avantages_carto").offsetHeight,
                tableHeight = document.getElementById("abonnement_comparatif_table_content").offsetHeight;

            if ( window.innerwidth < 768 ) {

                var introHeight = 124;
            } else if ( window.innerwidth > 768 && window.innerwidth < 1740 ) {

                var introHeight = 140;
            } else {

                var introHeight = 159;
            }

            if ( window.innerwidth < 1000 ) {

                var more = 16;
            } else {

                var more = 46;
            }

            document.getElementById("avantages_carto").style.height = (heightInitial - tableHeight + introHeight - more) + "px"; /* 106 = hauteur du contenu initial qui disparait pour laisser la place au tableau */
        }

        /* afficher intro */
        remove_class(intro, "isClosed");
        height_intro_compare();

        /* repositionner la croix de fermeture */
        remove_class(document.getElementById("abonnement_comparatif"), "open");
    } 

    /* fermer le tableau au resize */
    add_event(window, "resize", function(){

        show_abonnement_comparatif("closeResize");
    });
}

/* affichage btns switch au chargement */
function abonnement_switch_onload() {

    var labelSwitch = document.getElementsByClassName("label-exter"),
        inputSwitch = document.getElementsByClassName("onoffswitch-checkbox"),
        prelevement = document.getElementsByClassName("prelevement-annuel");

    /* positionner le switch sur annuel */
    if ( window.innerWidth <= 768 ) {

        /* gestion du wording */
        for (var i = 0; i < labelSwitch.length; i++) {

            if ( is_class_exist(labelSwitch[i], "label-month") ) {

                remove_class(labelSwitch[i], "checked");
            } else {

                add_class(labelSwitch[i], "checked");
            }
        }

        /* gestion input */
        for (var x = 0; x < inputSwitch.length; x++) {

            inputSwitch[x].checked = true;
            inputSwitch[x].value = "annuel";

            /* attribuer valeur au switch */
            var id      = inputSwitch[x].getAttribute("id"),
                element = document.getElementById(id);

            abonnement_switch_onchange(element, "noscroll");
        }

        /* gestion asterisque bas */
        for (var y = 0; y < prelevement.length; y++) {

            remove_class(prelevement[y], "noOpacity");
        }

        /* gestion prix Societe+ */
        remove_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
        add_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

        /* gestion prix Dirigeant+ */
        remove_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
        add_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

        /* gestion prix Duo+ */
        remove_class(document.getElementById("price_title_duo_annuel"), "isHidden");
        add_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

        /* gestion CTA Societe+ */
        remove_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

        /* gestion CTA Dirigeant+ */
        remove_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

        /* gestion CTA Duo+ */
        remove_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
    }
    /* positionner le switch sur mensuel */
    else {

        /* gestion du wording */
        for (var i = 0; i < labelSwitch.length; i++) {

            if ( is_class_exist(labelSwitch[i], "label-month") ) {

                add_class(labelSwitch[i], "checked");
            } else {

                remove_class(labelSwitch[i], "checked");
            }
        }

        /* gestion input */
        for (var x = 0; x < inputSwitch.length; x++) {

            inputSwitch[x].checked = false;
            inputSwitch[x].value = "mensuel";

            /* attribuer valeur au switch */
            var id      = inputSwitch[x].getAttribute("id"),
                element = document.getElementById(id);

            abonnement_switch_onchange(element, "noscroll");
        }

        /* gestion asterisque bas */
        for (var y = 0; y < prelevement.length; y++) {

            add_class(prelevement[y], "noOpacity");
        }

        /* gestion prix Societe+ */
        add_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

        /* gestion prix Dirigeant+ */
        add_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

        /* gestion prix Duo+ */
        add_class(document.getElementById("price_title_duo_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

        /* gestion CTA Societe+ */
        add_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

        /* gestion CTA Dirigeant+ */
        add_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

        /* gestion CTA Duo+ */
        add_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
    }

    /* au resize reinitialiser les switch */
    add_event(window, "resize", function() {

        if ( window.innerWidth <= 768 ) {

            /* gestion du wording */
            for (var i = 0; i < labelSwitch.length; i++) {

                if ( is_class_exist(labelSwitch[i], "label-month") && is_class_exist(labelSwitch[i], "checked") ) {

                    add_class(labelSwitch[i], "checked");
                }
            }

            /* gestion input */
            for (var x = 0; x < inputSwitch.length; x++) {

                inputSwitch[x].checked = true;
                inputSwitch[x].value = "annuel";

                /* attribuer valeur au switch */
                var id      = inputSwitch[x].getAttribute("id"),
                    element = document.getElementById(id);

                abonnement_switch_onchange(element, "noscroll");
            }

            /* gestion asterisque bas */
            for (var y = 0; y < prelevement.length; y++) {

                remove_class(prelevement[y], "noOpacity");
            }

            /* gestion prix Societe+ */
            remove_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
            add_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

            /* gestion prix Dirigeant+ */
            remove_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
            add_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

            /* gestion prix Duo+ */
            remove_class(document.getElementById("price_title_duo_annuel"), "isHidden");
            add_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

            /* gestion CTA Societe+ */
            remove_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

            /* gestion CTA Dirigeant+ */
            remove_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

            /* gestion CTA Duo+ */
            remove_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
        } else {

            /* gestion du wording */
            for (var i = 0; i < labelSwitch.length; i++) {

                if ( is_class_exist(labelSwitch[i], "label-month") && !is_class_exist(labelSwitch[i], "checked") ) {

                    add_class(labelSwitch[i], "checked");
                }
            }

            /* gestion input */
            for (var x = 0; x < inputSwitch.length; x++) {

                inputSwitch[x].checked = false;
                inputSwitch[x].value = "mensuel";

                /* attribuer valeur au switch */
                var id      = inputSwitch[x].getAttribute("id"),
                    element = document.getElementById(id);

                abonnement_switch_onchange(element, "noscroll");
            }

            /* gestion asterisque bas */
            for (var y = 0; y < prelevement.length; y++) {

                add_class(prelevement[y], "noOpacity");
            }

            /* gestion prix Societe+ */
            add_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

            /* gestion prix Dirigeant+ */
            add_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

            /* gestion prix Duo+ */
            add_class(document.getElementById("price_title_duo_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

            /* gestion CTA Societe+ */
            add_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

            /* gestion CTA Dirigeant+ */
            add_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

            /* gestion CTA Duo+ */
            add_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
        }
    });
}

/* gestion btns switch */
function abonnement_switch_onchange(element, scroll) {

    var parent     = element.parentNode.parentNode,
        labelMonth = parent.getElementsByClassName("label-month")[0],
        labelYear  = parent.getElementsByClassName("label-year")[0],
        id         = element.getAttribute("id"),
        value      = "";

    /* si abonnement annuel */
    if ( element.checked == true ) {

        /* mettre l'abonnement annuel en bleu */
        add_class(labelYear, "checked");
        remove_class(labelMonth, "checked");

        value = "annuel";
    }
    /* si abonnement mensuel */
    else {

        /* mettre l'abonnement mensuel en bleu */
        add_class(labelMonth, "checked");
        remove_class(labelYear, "checked");

        value = "mensuel";
    }

    /* modifier la value du switch */
    element.value = value;

    /* action du btn switch en fonction de son emplacement */
    switch(id) {
        case 'abonnement-societe-plus' : 
            action_societe_plus(value, scroll);
            break;
        case 'abonnement-dirigeant-plus' : 
            action_dirigeant_plus(value, scroll);
            break;
        case 'abonnement-duo' : 
            action_duo(value, scroll);
            break;
        case 'abonnement-first-line' : 
            action_first_line(value, scroll);
            break;
        case 'abonnement-second-line' : 
            action_second_line(value, scroll);
            break;
        case 'abonnement-all' : 
            action_all(value, scroll);
            break;
    }
}

function action_societe_plus(value, scroll) {

    /* afficher le prix par mois */
    if ( value == "mensuel") {

        /* affichage du prix */
        add_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

        /* cacher asterisque */
        add_class(document.getElementById('asterisque_societe_plus'),"noOpacity");

        /* parametres du CTA */
        add_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");
    }
    /* afficher le prix par an */
    else {

        /* affichage du prix */
        remove_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
        add_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

        /* afficher asterisque */
        remove_class(document.getElementById('asterisque_societe_plus'),"noOpacity");

        /* parametres du CTA */
        remove_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");
    }
}

function action_dirigeant_plus(value, scroll) {

    /* afficher le prix par mois */
    if ( value == "mensuel") {

        /* affichage du prix */
        add_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

        /* cacher asterisque */
        add_class(document.getElementById('asterisque_dirigeant_plus'),"noOpacity");

        /* parametres du CTA */
        add_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");
    }
    /* afficher le prix par an */
    else {

        /* affichage du prix */
        remove_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
        add_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

        /* afficher asterisque */
        remove_class(document.getElementById('asterisque_dirigeant_plus'),"noOpacity");

        /* parametres du CTA */
        remove_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");
    }
}

function action_duo(value, scroll) {

    /* afficher le prix par mois */
    if ( value == "mensuel") {

        /* affichage du prix */
        add_class(document.getElementById("price_title_duo_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

        /* cacher asterisque */
        add_class(document.getElementById('asterisque_duo'),"noOpacity");

        /* parametres du CTA */
        add_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
    }
    /* afficher le prix par an */
    else {

        /* affichage du prix */
        remove_class(document.getElementById("price_title_duo_annuel"), "isHidden");
        add_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

        /* afficher asterisque */
        remove_class(document.getElementById('asterisque_duo'),"noOpacity");

        /* parametres du CTA */
        remove_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
    }
}

function action_first_line(value) {

    var liste = document.getElementById("offres_list");

    /* afficher le prix par mois */
    if ( value == "mensuel") {

        /* si mise en avant dirigeant plus */
        if ( is_class_exist(liste, "isDirigeantPlus") ) {

            /* affichage du prix dirigeant plus */
            add_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

            /* parametres du CTA dirigeant plus */
            add_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");
        }
        /* si page sans intention ou mise en avant societe plus */
        else {

            /* affichage prix societe plus */
            add_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

            /* parametres du CTA societe plus */
            add_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");
        }

        /* cacher asterisque first line */
        add_class(document.getElementById('asterisque_first_line'),"noOpacity");
    }
    /* afficher le prix par an */
    else {

        /* si mise en avant dirigeant plus */
        if ( is_class_exist(liste, "isDirigeantPlus") ) {

            /* affichage prix dirigeant plus */
            remove_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
            add_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

            /* parametres du CTA dirigeant plus */
            remove_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");
        }
        /* si page sans intention ou mise en avant societe plus */
        else {

            /* affichage prix societe plus */
            remove_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
            add_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

            /* parametres du CTA societe plus */
            remove_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");
        }

        /* afficher asterisque first line */
        remove_class(document.getElementById('asterisque_first_line'),"noOpacity");
    }
}

function action_second_line(value) {

    var liste = document.getElementById("offres_list");

    /* afficher le prix par mois */
    if ( value == "mensuel") {

        /* si mise en avant dirigeant plus */
        if ( is_class_exist(liste, "isDirigeantPlus") ) {

            /* affichage prix societe plus */
            add_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

            /* parametres du CTA societe plus */
            add_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

            /* affichage du prix duo plus */
            add_class(document.getElementById("price_title_duo_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

            /* parametres du CTA duo plus */
            add_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
        }
        /* si page sans intention ou mise en avant societe plus */
        else {

            /* affichage prix dirigeant plus */
            add_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

            /* parametres du CTA dirigeant plus */
            add_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

            /* affichage du prix duo plus */
            add_class(document.getElementById("price_title_duo_annuel"), "isHidden");
            remove_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

            /* parametres du CTA duo plus */
            add_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
            remove_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
        }

        /* cacher asterisque first line */
        add_class(document.getElementById('asterisque_second_line'),"noOpacity");
    }
    /* afficher le prix par an */
    else {

        /* si mise en avant dirigeant plus */
        if ( is_class_exist(liste, "isDirigeantPlus") ) {

            /* affichage prix societe plus */
            remove_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
            add_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

            /* parametres du CTA societe plus */
            remove_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

            /* affichage du prix duo plus */
            remove_class(document.getElementById("price_title_duo_annuel"), "isHidden");
            add_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

            /* parametres du CTA duo plus */
            remove_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
        }
        /* si page sans intention ou mise en avant societe plus */
        else {

            /* affichage prix dirigeant plus */
            remove_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
            add_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

            /* parametres du CTA dirigeant plus */
            remove_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

            /* affichage du prix duo plus */
            remove_class(document.getElementById("price_title_duo_annuel"), "isHidden");
            add_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

            /* parametres du CTA duo plus */
            remove_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
            add_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");
        }

        /* afficher asterisque first line */
        remove_class(document.getElementById('asterisque_second_line'),"noOpacity");
    }
}

function action_all(value) {

    /* afficher le prix par mois */
    if ( value == "mensuel") {

        /* affichage prix societe plus */
        add_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

        /* parametres du CTA societe plus */
        add_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

        /* affichage prix dirigeant plus */
        add_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

        /* parametres du CTA dirigeant plus */
        add_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

        /* affichage du prix duo plus */
        add_class(document.getElementById("price_title_duo_annuel"), "isHidden");
        remove_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

        /* parametres du CTA duo plus */
        add_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
        remove_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");

        /* cacher asterisque all */
        add_class(document.getElementById('asterisque_all'),"noOpacity");
    }
    /* afficher le prix par an */
    else {

        /* affichage prix societe plus */
        remove_class(document.getElementById("price_title_societe_plus_annuel"), "isHidden");
        add_class(document.getElementById("price_title_societe_plus_mensuel"), "isHidden");

        /* parametres du CTA societe plus */
        remove_class(document.getElementById("cta_abonnement_societe_plus_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_societe_plus_mensuel"), "isHidden");

        /* affichage prix dirigeant plus */
        remove_class(document.getElementById("price_title_dirigeant_plus_annuel"), "isHidden");
        add_class(document.getElementById("price_title_dirigeant_plus_mensuel"), "isHidden");

        /* parametres du CTA dirigeant plus */
        remove_class(document.getElementById("cta_abonnement_dirigeant_plus_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_dirigeant_plus_mensuel"), "isHidden");

        /* affichage du prix duo plus */
        remove_class(document.getElementById("price_title_duo_annuel"), "isHidden");
        add_class(document.getElementById("price_title_duo_mensuel"), "isHidden");

        /* parametres du CTA duo plus */
        remove_class(document.getElementById("cta_abonnement_duo_annuel"), "isHidden");
        add_class(document.getElementById("cta_abonnement_duo_mensuel"), "isHidden");

        /* afficher asterisque first line */
        remove_class(document.getElementById('asterisque_all'),"noOpacity");
    }
}

/* Ajout compteplus au panier */
function ajout_abonnement_plus(elem) {

    if ( document.getElementById('nbprod') == undefined || document.getElementById('nbprod') == null ) {

        alert("Fonctionnalité indisponible pour le moment, merci de réessayer dans quelques instants.");
        return;
    }

    var url = "https://paiement.societe.com/pages/paiement-new.html",
        nbprod    = parseInt(document.getElementById('nbprod').innerHTML),
        offre     = "";

    /* gestion popup maintenance */
    if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
        open_popup_maintenance();
        return
    }
        
    if ((nbprod) < MAX_BASKET) {

        addbasket(prod[elem.id]);

        /* Determiner le produit */
        if ( elem.parentNode.getAttribute("id").indexOf("societe_plus") != -1 ) {

            offre = "Abonnement-S+";
        } else if ( elem.parentNode.getAttribute("id").indexOf("dirigeant_plus") != -1 ) {

            offre = "Abonnement-D+";
        }  else if ( elem.parentNode.getAttribute("id").indexOf("duo") != -1 ) {

            offre = "Abonnement-Duo+";
        }

        /* si abonnement mensuel */
        if ( elem.getAttribute("data-period") == "mensuel") {

            /* gestion popup maintenance */
            if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
                open_popup_maintenance();
            } else {
                gana_event(url, offre, 'Click', 'Mensuel');
            }
        }
        /* si abonnement annuel */
        else {

            /* gestion popup maintenance */
            if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
                open_popup_maintenance();
            } else {
                gana_event(url, offre, 'Click', 'Annuel');
            }
        }
    } else {

        alert("Impossible de rajouter un produit. Nombre maximum atteint.");
        return;
    }
}

/* slide arguments sur page carto */
function slide_carto_arguments(element) {

    var id     = element.getAttribute("id"),
        number = id.substring(9,id.length),
        list   = document.getElementById("arguments_list");

    /* afficher le slide */
    switch(number) {
        case "one":
            list.style.marginLeft = "0";
            remove_class(document.getElementById("timeline_two"), "focus");
            remove_class(document.getElementById("timeline_three"), "focus");
            remove_class(document.getElementById("timeline_four"), "focus");
            break;
        case "two":
            list.style.marginLeft = "-337px";
            remove_class(document.getElementById("timeline_one"), "focus");
            remove_class(document.getElementById("timeline_three"), "focus");
            remove_class(document.getElementById("timeline_four"), "focus");
            break;
        case "three":
            list.style.marginLeft = "-674px";
            remove_class(document.getElementById("timeline_one"), "focus");
            remove_class(document.getElementById("timeline_two"), "focus");
            remove_class(document.getElementById("timeline_four"), "focus");
            break;
        case "four":
            list.style.marginLeft = "-1011px";
            remove_class(document.getElementById("timeline_one"), "focus");
            remove_class(document.getElementById("timeline_two"), "focus");
            remove_class(document.getElementById("timeline_three"), "focus");
            break;
    }

    /* passer l'element en focus */
    add_class(element, "focus");

    /* reinitialiser le ul au resize */
    add_event(window, "resize", function() {
        
        if ( window.innerWidth > 768 ) {

            if ( document.getElementById("arguments_list").style.marginLeft != "" ) {

                document.getElementById("arguments_list").style.marginLeft = "";
                add_class(document.getElementById("timeline_one"), "focus");
                remove_class(document.getElementById("timeline_two"), "focus");
                remove_class(document.getElementById("timeline_three"), "focus");
                remove_class(document.getElementById("timeline_four"), "focus");
            }
        }
    });
}/********************************************************/
/******************** SCROLL PANIER  ********************/
/********************************************************/
/* hauteur bloc actu */
function actu_height() {

    var actu = document.getElementById('actu');
    var news = document.getElementById('actu-news-droite');

    if (actu && news) {
        actu.style.height = news.offsetHeight + "px";
    }
}
/* Initialisation panier (gestion du scroll) */
function set_panierinit() {

    var coldroite = document.getElementById('coldroite');
    var off       = 0;
    var offbis    = 0;

    off = get_offset_top('recbasketref');

    offbis = get_offset_top('coldroite');
    
    /* On corrige le bug d'offset du au table-cell */

    if ((offbis + 50) > off) {
        for (var i = 0; i < nb_child(coldroite); i++) {
            if (coldroite.children[i].id == 'recbasketref') {
                break;
            }

            off += get_height(coldroite.children[i]);
        }
    }

    panier_posinit = parseInt(off) + 8;
}

function init_panierajout() {

    /* si fichepremiumshop -> panier aligne en haut */
    if (document.location.href.indexOf("cgi-bin/vitrine#fichepremiumshop") != -1 ) {

        add_class(document.getElementById("coldroite"), "fichepremiumshop");
    }

    var id = document.getElementById('recbasketcontent');
    if (id) {
        set_panierinit();
        if (id) {

            console.log("ajout top au panier = " + panier_posinit);
            id.style.top = panier_posinit + "px";
            if (document.addEventListener) { /* ie 8+ */
                add_event(window, "scroll", function() {scroll_panier(id);});
                scroll_panier(id);
            }
        }
    }
}

/* calcul hauteur max menu */
function init_height_basket() {

    var panier       = document.getElementById("panier"),
        recbasketTop = document.getElementById("recbasket").offsetTop,
        windowHeight = window.innerHeight;
        basketMax    = 0;
        scrollY      = getY();

    /* sur la fiche */
    if ( document.getElementById("identite") ) {

        /* si panier non fix au scroll */
        if ( !is_class_exist(document.getElementById('recbasketcontent'), "floatable") ) {

            basketMax = windowHeight - recbasketTop - 127;
            basketMax = basketMax + scrollY;
        } else {

            basketMax = windowHeight - 271; /* 271 = elements fixes du panier + elements en floatable */
        }
    }
    else {

        basketMax = windowHeight - recbasketTop - 127; /* 127 = elements fixes du panier */
    }

    panier.style.maxHeight = basketMax + "px";

    /* recaler la scrollbar du panier sur IE */
    if ( is_class_exist(document.getElementById("documentbody"), "nav-ie11") ) {
        position_scrollbar_IE();
    }
}

function scroll_panier(id) {

    var panier    = document.getElementById('panierajout');
    var footer    = document.getElementById('footer');
    var colDroite = document.getElementById("coldroite");
    var container = document.getElementById("container");
    var menu      = document.getElementById('menuentreprise_desktop');

    if (menu) {
        menu = menu.getElementsByTagName("ul")[0];
    }
        
    /* si pas de footer -> return */
    if ( !footer ) {
        return;
    }

    set_panierinit();
    var scrollY = getY();
    var height = get_height(panier);

    /* si pas de panier -> return */
    if (!height) {
        return;
    }

    /* si colonne de droite plus grande que contenu page -> return */
    if (container && colDroite) {

        if (colDroite.offsetHeight > container.offsetHeight) {
            return;
        }
    }

    /* sur la fiche, si menu + grand que contenu et q colonne de droite -> return */
    if (menu.offsetHeight > container.offsetHeight && menu.offsetHeight > colDroite.offsetHeight) {
        return;
    }

    /* panier en sticky au scroll */
    /* sur une fiche societe -> header et identite en fixed */
    if ( document.getElementById("menuentreprise_desktop") && document.getElementById("menuentreprise_desktop").getAttribute("class").indexOf("noMenu") == -1 ) {

        scroll_panier_fiche(id);
    }
    /* sur une fichepremiumshop -> header et identite pas en fixed */
    else if ( document.location.href.indexOf("#fichepremiumshop") != -1 && document.getElementById("menuentreprise_desktop").getAttribute("class").indexOf("noMenu") != -1 ) {

        scroll_panier_fichepremiumshop(id);
    }
}

/* gestion sticky colonne droite sur fiche */
var colDroiteBottomFixed = 0;
var pub1TopFinal         = 0;
var actuTopFinal         = 0;
var pub2TopFinal         = 0;
var scrollFooter         = 0;
var scrollFooter2        = 0;

function scroll_panier_fiche(id) {

    var panierHeight = id.offsetHeight;
    var panierTop    = id.offsetTop;
    var page         = document.getElementById("page");
    var container    = document.getElementById("container");
    var scrollY      = getY();
        scrollY      = Math.round(scrollY);

    /* recaler la scrollbar du panier sur IE */
    if ( is_class_exist(document.getElementById("documentbody"), "nav-ie11") ) {
        position_scrollbar_IE();
    }

    /* calcul hauteur de la page pour calcul scrollLimit en fonction % hauteur */
    var boxReseau    = document.getElementById("boxreseaux");
    if ( boxReseau ) {
        var boxReseauHeight = boxReseau.offsetHeight;
    } else {
        var boxReseauHeight = 0;
    }

    var header       = document.getElementById("header");
    if ( header ) {
        var headerHeight = header.offsetHeight;
    } else {
        var headerHeight = 0;
    }

    var pubBanner    = document.getElementById("pubbanner");
    if ( pubBanner ) {
        var pubBannerHeight = pubBanner.offsetHeight;
    } else {
        var pubBannerHeight = 0;
    }
    
    var identite     = document.getElementById("identite");
    if ( identite ) {
        var identiteHeight = identite.offsetHeight;
    } else {
        var identiteHeight = 0;
    }

    /* calcul hauteur max du panier */
    var windowHeight          = window.innerHeight;
    var basketMaxBeforeScroll = windowHeight - boxReseauHeight - headerHeight - pubBannerHeight - identiteHeight;
        basketMaxBeforeScroll = basketMaxBeforeScroll - 203; /* 193 = elements fixes du panier */

    document.getElementById("panier").style.maxHeight = (basketMaxBeforeScroll + scrollY) + "px";

    /* calcul scroll 1 (colonne droite en fixed) */
    /*if(!is_class_exist(document.getElementById('covid_banner'), 'hide')) {
        var scrollPanier = container.offsetTop + 34 + 72; // 34 = hauteur du titre de la page + 72px COVID 
    } else {*/
        var scrollPanier = container.offsetTop + 34; /* 34 = hauteur du titre de la page */
    //}
        scrollPanier = scrollPanier - 49 - 80; /* 49 = hauteur header fixed - 80 = hauteur bloc identite fixed */

    /* calcul scroll 2 (pub1 passe sous le panier, actu se colle au panier) */
    var pub1 = document.getElementsByClassName('mpu1')[0];
    if ( pub1 ) {
        var pub1Height = pub1.offsetHeight;
        var pub1Top    = pub1.offsetTop;
    } else {
        var pub1Height = 0;
        var pub1Top    = panierTop + panierHeight;
    }

    /* calcul scroll 3 (actu passe sous le panier, pub2 se colle au panier) */
    var actu = document.getElementById("actu");
    if ( actu ) {

        var news = document.getElementById('actu-news-droite');

        /* donner hauteur bloc actu */
        if (news) {
            actu.style.height = news.offsetHeight + "px";
        }

        var actuHeight = actu.offsetHeight;
        var actuTop    = actu.offsetTop;
    } else {

        if ( pub1 ) {

            var actuHeight = 0;
            var actuTop    = pub1Top + pub1Height;
        } else {

            var actuHeight = 0;
            var actuTop    = panierTop + panierHeight;
        }
    }

    var pub2 = document.getElementsByClassName('mpu2')[0];
    if ( pub2 ) {
        var pub2Height = pub2.offsetHeight;
        var pub2Top    = pub2.offsetTop;
    }

    /* determiner les scroll en fonction de elements visible dans la colonne droite */
    var count = 0;
    if ( pub1Height && pub1Height > 0 ) {
        count++;
    }
    if ( actuHeight && actuHeight > 0 ) {
        count++;
    }
    if ( pub2Height && pub2Height > 0 ) {
        count++;
    }

    switch(count) {

        case 1:
            /* si 1 elements (actu) -> determiner un seul scrolllimit */
            var scrollActu = document.getElementById("footer").offsetTop - panierHeight - actuHeight - 143 - 32;
            break;
        case 2:
            /* si 2 elements (actu + pub1 ou pub 2) -> determiner un seul scrolllimit */
            if ( pub1Height && pub1Height > 0 ) {
                var scrollPub1 = page.offsetHeight + identiteHeight + pubBannerHeight + headerHeight + boxReseauHeight;
                    scrollPub1 = Math.round(scrollPub1 * 0.5);
                var scrollActu = document.getElementById("footer").offsetTop - panierHeight - actuHeight - 143 - 32;
            } else {
                var scrollPub2 = page.offsetHeight + identiteHeight + pubBannerHeight + headerHeight + boxReseauHeight;
                    scrollPub2 = Math.round(scrollPub2 * 0.5);
            }
            break;
        case 3:
            /* si 3 elements (actu + pub1 + pub 2) -> determiner deux scrolllimit */
            var scrollPub1 = page.offsetHeight + identiteHeight + pubBannerHeight + headerHeight + boxReseauHeight;
                scrollPub1 = Math.round(scrollPub1 * 0.3);
            var scrollPub2 = page.offsetHeight + identiteHeight + pubBannerHeight + headerHeight + boxReseauHeight;
                scrollPub2 = Math.round(scrollPub2 * 0.7);
            break;
        default:
            break;
    }

    /* passage elements en non sticky */
    if ( scrollY < scrollPanier ) {

        /* panier */
        remove_class(id, "floatable");

        /* pub 1 */
        if ( pub1 ) {

            pub1.style.position = "";
            pub1.style.top = "";
        }

        /* actu */
        if ( actu ) {

            actu.style.position = "";
            actu.style.top = "";
        }

        /* pub 2 */
        if ( pub2 ) {

            pub2.style.position = "";
            pub2.style.top = "";
        }
    }
    /* scroll 1 : passage elements en sticky */
    else {

        /* calcul hauteur max du panier */
        var basketMaxAfterScroll = windowHeight - 49 - 80; /* 49 = hauteur header fixed - 80 = hauteur bloc identite fixed */
            basketMaxAfterScroll = basketMaxAfterScroll - 143; /* 193 = elements fixes du panier */

        document.getElementById("panier").style.maxHeight = basketMaxAfterScroll + "px";

        /* panier */
        add_class(id, "floatable");
        /* gestion temporaire COVID */
        /*if(!is_class_exist(document.getElementById('covid_banner'), 'hide')) {
            id.style.top = "215px";
        } else {*/
            id.style.top = "127px";
        //}

        panierTop    = id.style.top;
        panierTop    = panierTop.substring(0,(panierTop.length-2));
        panierTop    = parseInt(panierTop) + 4
        panierHeight = parseInt(panierHeight);

        /* pub 1 */
        if ( pub1 ) {

            pub1Top    = panierTop + panierHeight;
            pub1Height = parseInt(pub1.offsetHeight);
            pub1.style.position = "fixed";
            pub1.style.top = pub1Top + "px";
        } else {
            pub1Top    = panierTop + panierHeight;
            pub1Height = 0;
        }

        /* actu */
        if ( actu ) {

            actuTop    = pub1Top + pub1Height + 4;
            actuHeight = parseInt(actu.offsetHeight);
            actu.style.position = "fixed";
            actu.style.top = actuTop + "px";
        } else {
            actuTop = pub1Top + pub1Height;
            actuHeight = 0;
        }

        /* pub 2 */
        if ( pub2 ) {

            pub2Top = actuTop + actuHeight + 16;
            pub2.style.position = "fixed";
            pub2.style.top = pub2Top + "px";
        }
    }

    /* si juste actu -> passage sous panier */
    if ( scrollActu && !scrollPub1 && !scrollPub2 && scrollY >= scrollActu ) {

        var diff = scrollY - scrollActu;
        var newActuTop = (actuTop - diff);

        actu.style.top = newActuTop + "px";
    }
    /* si actu + pub */
    else {

        /* scroll 2 : passage pub1 sous panier */
        if ( scrollPub1 && scrollY >= scrollPub1 ) {

            var diff = scrollY - scrollPub1;

            /* pub 1 */
            if ( pub1 ) {

                var newPub1Top = (pub1Top - diff);

                pub1.style.top = newPub1Top + "px";
            }

            /* actu */
            if ( actu ) {

                var newActuTop = (actuTop - diff);

                actu.style.top = newActuTop + "px";

                if ( pub1Top && newActuTop <= pub1Top ) {

                    actu.style.top = pub1Top + "px";
                }
            }

            /* pub 2 */
            if ( pub2 ) {

                var newPub2Top = (pub2Top - diff);

                pub2.style.top = newPub2Top + "px";

                if ( actu && actu.offsetHeight > 0 ) {

                    var newActuTop = actu.offsetTop;

                    if ( newActuTop == (panierTop + panierHeight) ) {

                        pub2.style.top = newActuTop + actuHeight + 16 + "px";
                    }
                } else if ( pub1 && pub1.offsetHeight > 0 ) {

                    if ( pub1Top && newPub2Top <= pub1Top ) {

                        pub2.style.top = pub1Top + "px";
                    }
                } 
            }
        }

        /* scroll 3 : passage actu sous panier */
        if ( scrollPub2 && scrollY >= scrollPub2 ) {

            var diff2   = scrollY - scrollPub2;
                actuTop = actu.style.top;
                actuTop = actuTop.substring(0,(actuTop.length-2));
                actuTop = parseInt(actuTop);

            /* actu */
            if ( actu ) {

                var newActuTop2 = (actuTop - diff2);

                actu.style.top = newActuTop2 + "px";
            }

            /* pub2 */
            if ( pub2 ) {

                    pub2Top = pub2.offsetTop;
                var newPub2Top = (pub2Top - diff2);

                pub2.style.top = newPub2Top + "px";

                if ( newPub2Top && newPub2Top <= actuTop ) {

                    pub2.style.top = actuTop + "px";
                }
            }
        }
    }

    /* calcul footerLimit */
    var coldroite       = document.getElementById("coldroite");
    var elements        = coldroite.getElementsByClassName("ContentAside__element");
    var nbElements      = elements.length;

    if ( elements.length != 0 ) {
 
            nbElements      = nbElements - 1;
        var elementTop      = elements[nbElements].offsetTop;
        var elementHeight   = elements[nbElements].offsetHeight;
        var elementBottom   = elementTop + elementHeight;
        var colDroiteBottom = scrollY + elementBottom;
    }

    var panierBottom    = 143 + panierHeight;

    if ( colDroiteBottom && colDroiteBottom >= (document.getElementById("footer").offsetTop - 32) ) {

        /* determiner position des elements quand on atteind le scroll 4 */
        if (colDroiteBottomFixed == 0) {

            colDroiteBottomFixed = colDroiteBottom;

            if (pub1) {
                pub1TopFinal = pub1.offsetTop;
            }
            if (actu) {
                actuTopFinal = actu.offsetTop;
            }
            if (pub2) {
                pub2TopFinal = pub2.offsetTop;
            }

            scrollFooter = scrollY;
        }

        /* faire remonter les elements sous le panier */
        var diff3 = scrollY - scrollFooter;
        if ( diff3 < 0 ) {

            if (pub1) {
                pub1.style.top = (pub1TopFinal + diff3) + "px";
            }

            if (actu) {
                actu.style.top = (actuTopFinal + diff3) + "px";
            }
            
            if (pub2) {
                pub2.style.top = (pub2TopFinal + diff3) + "px";
            }
            
        } else {

            if (pub1) {
                //pub1.style.top = (pub1TopFinal - diff3) + "px";
                pub1.style.top = (pub1TopFinal - diff3 + 4) + "px";
            }

            if (actu) {
                actu.style.top = (actuTopFinal - diff3) + "px";
            }
            
            if (pub2) {
                pub2.style.top = (pub2TopFinal - diff3) + "px";
            }
        }
    }

    /* bloquer le panier */
    // actu + pub 1
    if ( scrollActu && scrollPub1 && !scrollPub2 ) {

        if ( (scrollY + panierBottom + actuHeight + 32) >= (document.getElementById("footer").offsetTop - 16) ) {

            if ( scrollFooter2 == 0 ) {
                scrollFooter2 = scrollY;
            }

            var diff4 = scrollFooter2 - scrollY;
            actu.style.top = (actu.offsetTop + diff4) + "px";

            if ( (scrollY + panierBottom ) >= (document.getElementById("footer").offsetTop - 16) ) {

                id.style.top = (143 + diff4) + "px";
            }
        }
    }
    // autres cas
    else {

        if ( (scrollY + panierBottom ) >= (document.getElementById("footer").offsetTop - 16) ) {

            if ( scrollFooter2 == 0 ) {
                scrollFooter2 = scrollY;
            }

            var diff4 = scrollFooter2 - scrollY;
            id.style.top = (143 + diff4) + "px";
        }
    }
}

/* recaler la scrollbar du panier sur IE */
function position_scrollbar_IE() {

    var panier   = document.getElementById("panier"),
        panierTr = panier.getElementsByTagName("tr"),
        height   = 0;

        /* si contenu du panier plus grand que hauteur max du panier*/
        for ( var i = 0; i < (panierTr.length - 1 ); i++ ) {

            height += panierTr[i].offsetHeight;
        }

        if ( height > panier.offsetHeight ) {

            for ( var x = 0; x < (panierTr.length - 1 ); x++ ) {

                /* diminuer largeur des tr pour ne pas q la scrollbar passe par dessus */
                panierTr[x].getElementsByTagName("td")[0].style.maxWidth = "255px";

                if ( is_class_exist( panierTr[x], "total") ) {
                    panierTr[x].getElementsByTagName("td")[0].style.maxWidth = "277px";
                }
            }
        }
}

/* gestion sticky colomne droite sur fiche premium */
function scroll_panier_fichepremiumshop(id) {

    var container   = document.getElementById("container");
    var scrollLimit = container.offsetTop;
    if ( detect_version_IE() == "nav-ie11" ) {
        var scrollY = getY();
    }

    /* passage panier en sticky */
    if ( scrollY >= scrollLimit ) {

        id.style.position = "fixed";
        id.style.top = "14px";
    }
    /* passage panier en non sticky */
    else {

        id.style.position = "";
    }
}

/********************************************************/
/******************** Gestion du panier *****************/
/********************************************************/
var addbasketr = '';

function init_addbasket() {
    if (document.getElementById('recbasket')) {
        window.onfocus = panrefresh;
        panrefresh();
    }
}

/* Gestion de l'event click pour un ajout / suppression panier */
function pc(elem) {

    var i = 0;
    var j = 0;
    var p = 0;

    var prodcat = elem.getAttribute("data-prodcat");
    var zone = elem.getAttribute("data-prodzone");
    var prodprice = elem.getAttribute("data-prodprice");

    var icoPlus = document.getElementById('ico-plus' + elem.id);
    var icoCheck = document.getElementById('ico-check' + elem.id);
    var addNotif = document.getElementById('add' + elem.id); 

    if(elem.classList.contains('isSelected')) {
        remove_class(elem, 'isSelected');
        remove_class(icoPlus, 'isInvisible');
        remove_class(addNotif, 'add');
        add_class(icoCheck, 'isInvisible');
    } else {
        add_class(elem, 'isSelected');
        add_class(icoPlus, 'isInvisible');
        add_class(addNotif, 'add');
        remove_class(icoCheck, 'isInvisible');
    }

    if (elem) {
        var check = document.getElementById("check" + elem.id);
        if (check) {
            if (check.getAttribute("data-state") == "1") {
                if (document.getElementById(prod[elem.id])) {
                    if (prodcat != null && zone != null && prodprice != null) {
                        gana_event(null, zone, 'Retrait', prodcat, parseInt(prodprice));
                    }
                    rembasket(prod[elem.id]);
                    addbasketr = '';
                } else {
                    alert("Ce produit est déjà inclu dans un Pack Essentiel");
                }
            } else {
                var nbprod = parseInt(document.getElementById('nbprod').innerHTML);
                if ((nbprod) < MAX_BASKET) {
                    if (prodcat != null && zone != null && prodprice != null) {
                        gana_event(null, zone, 'Ajout', prodcat, parseInt(prodprice));
                    }
                    addbasket(prod[elem.id]);
                } else {
                    alert("Impossible de rajouter un produit. Nombre maximum atteint.");
                    return;
                }
            }
        }
    }
}

/* empecher ajout prdt au panier quand click sur lien "specimen" contenu dans un <tr> evc onclick="pc(this);" */
function pc_onclicktd(url) {
    window.location=url;
    event.stopPropagation();
}


/* Gestion de l'event click pour un ajout / suppression panier + redirect vers vitrine */
function pcr(elem, redir) {

    //pas de redirection automatique
    //addbasketr = redir;
    pc(elem);

    return (true);
}


/* Suppresion d'un element */
function rembasket(post) {
    sendrequestbasket("/cgi-bin/addbasket-new", "delp=" + post);
}

/* Ajout d'un element */
function addbasket(post) {
    sendrequestbasket("/cgi-bin/addbasket-new", "prod=" + post);
}

function rmbask(elem, rm) {
    if (elem) {
        var prodcat = elem.getAttribute("data-prodcat");
        var zone = elem.getAttribute("data-prodzone");
        var prodprice = elem.getAttribute("data-prodprice");

        if (prodcat && zone && prodprice) {
            gana_event(null, zone, 'Retrait', prodcat, parseInt(prodprice));
        }
    }

    if (rm == true) {
        rembasket(elem.id);
    }
}

/* Fonction supprimant tous les paniers */
function delbasketall() {
    if (confirm('Supprimer tous les produits du panier ?')) {
        delbasket('all');
    }
}

/* Function appelé lors d'un clic sur la croix */
function delbasketitem(itemobj) {
    //rmbask(itemobj.parentNode, true);
    rmbask(itemobj.parentNode.parentNode.parentNode.parentNode, true);
}

/* Suppression panier */
function delbasket(post) {
    var produits = null;

    if (document.getElementsByClassName) {
        produits = document.getElementsByClassName("produittag");
    } else {
        produits = getElementsByClass("produittag", document.getElementById('recbasket'), "TR");
    }

    if (produits) {
        for (var index = 0; index < produits.length; index++) {
            rmbask(produits[index], false);
        }
    }

    sendrequestbasket("/cgi-bin/addbasket-new", "tdel=" + post);
}

/* Envoi de la requete addbasket */
function sendrequestbasket(url, post) {

    var i = 0;

    var unix = Math.round(+new Date());
    post += "&unix=" + unix;

    for (i = 0; i < ri; i++) {
        if (!reqbasket[i] || reqbasket[i].readyState <= 0) {
            reqbasket[i] = null;
            break;
        }
    }

    if (i == ri) {
        ri++;
    }

    if (ri > maxri) {
        if (reqbasket[0]) {
            reqbasket[0].abort();
        }
        reqbasket[0] = null;
    }

    if (window.XMLHttpRequest) {
        reqbasket[i] = new XMLHttpRequest();
        if (reqbasket[i].overrideMimeType) {
            reqbasket[i].overrideMimeType("text/html; charset=ISO-8859-1;");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                reqbasket[i] = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    reqbasket[i] = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    alert("Votre browser est incompatible avec AJAX");
                    return;
                }
            }
        }
    }

    reqpost[i] = post;
    reqbasket[i].onreadystatechange = getresponsebasket;
    reqbasket[i].open("POST", url, true);
    reqbasket[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
    reqbasket[i].setRequestHeader("Cache-Control", "max-age=0");
    reqbasket[i].send(post);
}

/* Fonction de la reponse */
function getresponsebasket() {

    var sres = 0;
    var res = 0;

    for (i = 0; i < ri; i++) {
        sres = getresponse(reqbasket[i]);


        if (sres != null) {
            break;
        }
    }

    if (i >= ri) {
        return;
    }

    rec = document.getElementById('recbasket');

    if (rec) {
        rec.innerHTML = sres;

        var nbtot              = document.getElementById('nbprod');
        var pub                = document.getElementById('pubcarre2');
        var pubmobile          = document.getElementById('pubmobile');
        var index              = document.location.href.indexOf("societe.com/actualites/");
        var basketbutton       = document.getElementById('basket_content');
        var basketbuttonFloat  = document.getElementById('basket_content2');
        var actfree            = document.getElementById('actfree');
        var eventshop          = document.getElementById("eventshoptable");
        var eventshopfree      = document.getElementById("eventshopfreetable");
        var bitfree            = document.getElementById('bitfree');
        var shop               = document.getElementById("compteshoptable");
        var shopfree           = document.getElementById("compteshopfreetable");
        var facturht           = document.getElementById('facturht');
        var panierEmpty        = document.getElementById("panier-empty");
        var panierFull         = document.getElementById("panier-full");
        var panierTable        = document.getElementById("panier");
        var commandButton      = document.getElementById("addbasketcommander");


        /* si panier vide */
        if(nbtot) {
            
            if (nbtot.innerHTML == 0) {

                /* MAJ nb produit dans header */
                if (basketbutton) {

                    if (basketbutton.getElementsByClassName("article")[0] > 0) {

                        basketbutton.innerHTML  = '<span class="intro show-mobile-s">&nbsp;</span>';
                        basketbutton.innerHTML += '<span class="content show-mobile-s">Panier</span>';
                        basketbutton.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';

                        if (basketbuttonFloat) {

                            basketbuttonFloat.innerHTML  = '<span class="intro">&nbsp;</span>';
                            basketbuttonFloat.innerHTML += '<span class="content">Panier</span>';
                            basketbuttonFloat.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';
                        }
                    } else {
        
                        basketbutton.innerHTML  = '<span class="intro show-mobile-s">&nbsp;</span>';
                        basketbutton.innerHTML += '<span class="content show-mobile-s">Panier</span>';
                        basketbutton.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';

                        if (basketbuttonFloat) {

                            basketbuttonFloat.innerHTML  = '<span class="intro">&nbsp;</span>';
                            basketbuttonFloat.innerHTML += '<span class="content">Panier</span>';
                            basketbuttonFloat.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';
                        }
                    }
                }

                /* gestion du contenu */
                remove_class(panierEmpty, "isHidden");

                add_class(panierFull, "isHidden");
                add_class(panierTable, "isHidden");
                add_class(commandButton, "isHidden");

                var panierLink   = document.getElementById("panier-link");
                var panierButton = document.getElementById("panier-command-button");

                /* si on est sur la fiche */
                if ( document.getElementById("identite") || document.getElementById("identite-etablissement") ) {

                    if ( document.getElementById("identite_deno") ) {

                        var deno  = document.getElementById("identite_deno").getAttribute('data-deno');
                        var siren = document.getElementById("identite-siren");

                        if ( deno && siren ) {

                            /* afficher la phrase en bleu */
                            panierLink.innerHTML = "Voir tous les documents disponibles sur <span class='deno'>" + deno + "</span>";
                            panierLink.setAttribute("href", "/cgi-bin/vitrine?rncs=" + siren.innerHTML.replace(/\D/g,''));

                            /* lien sur btn commander */
                            panierButton.setAttribute("href", "/cgi-bin/vitrine?rncs=" + siren.innerHTML.replace(/\D/g,''));
                            panierButton.innerHTML = "Consulter documents officiels";
                        }
                    }
                }
                /* sur reste du site */
                else {

                    /* afficher la phrase en bleu */
                    //panierLink.innerHTML = "Accéder au réseau d'influence de 4 millions <br/>de dirigeants";
                    //panierLink.setAttribute("href", "/pages/avantages-plus.html?dirigeant-plus");

                    /* lien sur btn commander */
                    //panierButton.setAttribute("href", "/pages/avantages-plus.html?dirigeant-plus");
                }
            }
            /* si panier remplit */
            else {

                /* afficher le contenu */
                remove_class(panierFull, "isHidden");
                remove_class(panierTable, "isHidden");
                remove_class(commandButton, "isHidden");

                add_class(panierEmpty, "isHidden");
                
                /* gestion du contenu */
                if (facturht) {
                    var vttc = get_elementsbyclassname(document, "vsomttc");
                    for (var idx = 0; idx < vttc.length; idx++) {
                        if (facturht.getAttribute("data-facturht") == "1")  {
                            hide_obj(vttc[idx]);
                        } else {
                            display_obj_inline(vttc[idx]);
                        }
                    }
                }

                if (shop && shopfree) {
                    if (bitfree && bitfree.getAttribute("data-bitfree") == "1") {
                        hide("compteshoptable");
                        display("compteshopfreetable");
                    } else {
                        hide("compteshopfreetable");
                        display("compteshoptable");
                    }
                }

                if (eventshop && eventshopfree) {
                    if (actfree && actfree.getAttribute("data-actfree") == "1") {
                        hide("eventshoptable");
                        display("eventshopfreetable");
                        hide("statutshoptable");
                        display("statutshopfreetable");
                    } else {
                        hide("eventshopfreetable");
                        display("eventshoptable");
                        hide("statutshopfreetable");
                        display("statutshoptable");
                    }
                }

                if (nbtot && parseInt(nbtot.innerHTML) > 0) {

                    if (basketbutton) {

                        basketbutton.innerHTML  = '<span class="intro show-mobile-s">&nbsp;</span>';
                        basketbutton.innerHTML += '<span class="content show-mobile-s">Panier</span>';
                        basketbutton.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';

                        if (basketbuttonFloat) {

                            basketbuttonFloat.innerHTML  = '<span class="intro">&nbsp;</span>';
                            basketbuttonFloat.innerHTML += '<span class="content">Panier</span>';
                            basketbuttonFloat.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';
                        }
                    }
                } else {
                    if (basketbutton) {

                        basketbutton.innerHTML  = '<span class="intro show-mobile-s">&nbsp;</span>';
                        basketbutton.innerHTML += '<span class="content show-mobile-s">Panier</span>';
                        basketbutton.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';

                        if (basketbuttonFloat) {

                            basketbuttonFloat.innerHTML  = '<span class="intro">&nbsp;</span>';
                            basketbuttonFloat.innerHTML += '<span class="content">Panier</span>';
                            basketbuttonFloat.innerHTML += '<span class="article">' + parseInt(nbtot.innerHTML) + '</span>';
                        }
                    }
                }

                if ((nbtot && parseInt(nbtot.innerHTML) > 0) || !is_desktop_device()) {
                    if (pub) {
                        pub.style.visibility = "hidden";
                    }

                    if (pubmobile) {
                        pubmobile.style.visibility = "hidden";
                    }

                    if (index != -1) {
                        remove_class(document.getElementById('recbasket'), "isHidden");
                    }

                } else {
                    if (pub) {
                        pub.style.visibility = "visible";
                    }

                    if (pubmobile) {
                        pubmobile.style.visibility = "visible";
                    }

                    if (index != -1) {
                        add_class(document.getElementById('recbasket'), "isHidden");
                    }

                    var deno  = document.getElementById('identite_deno');
                    var siren = document.getElementById('identite-siren');

                    var obj = document.getElementById('addbasketcommander');
                    add_class(obj, "isHidden");

                    obj = document.getElementById('addbasketcommanderempty');
                    remove_class(obj, "isHidden");

                    if (siren && deno) {
                        obj = document.getElementById('addbasketsiren');
                        if (obj) {
                            var link = document.createElement("a");
                            var text = document.createTextNode("Voir tous les Documents Officiels disponibles sur l'entreprise " + deno.innerHTML.replace("&amp;", "&"));
                            link.appendChild(text);
                            link.setAttribute("href", "https://www.societe.com/cgi-bin/vitrine?rncs=" + siren.innerHTML.replace(/\D/g,''));
                            link.setAttribute("class", "Link");
                            obj.appendChild(link);
                            remove_class(obj, "isHidden");
                        }

                        link = document.getElementById('addbasketcommanderemptylink');
                        if (link) {
                            link.setAttribute("href", "https://www.societe.com/cgi-bin/vitrine?rncs=" + siren.innerHTML.replace(/\D/g,''));
                        }
                    } else {
                        obj = document.getElementById('addbasketnosiren');
                        if (obj) {
                            remove_class(obj, "isHidden");
                        }
                    }
                }

                /* calcul hauteur max menu */
                init_height_basket();
            }
        }
        

        // Chargement de event-ws si le panier plein
        if (window.location.pathname.match("^/societe/")) {
            load_event_ws();
        }

        adnext_cssmove();
    }

    reqbasket[i] = null;
    if (i == (ri - 1)) {
        ri--;
    }

    syncpan();

    if (addbasketr.length != 0) {
        window.location = addbasketr;
        return (true);
    }
    //scroll_panier(rec);
}

/* Rafraichit le panier. Appelé en fin de cgi */
function panrefresh() {
    sendrequestbasket("/cgi-bin/addbasket-new", "disp=pan");
}

/* On synchronise le panier entre les packs et les items */
function syncpan() {
    var fullpack = 0;

    for (var i = 0; i < prod.length; i++) {
        if (prod[i]) {
            var produit = document.getElementById(i);
            if (produit) {
                hl(produit, '');
            }
            if (document.getElementById(prod[i])) {
                updateprodnumdisp(i, 0);
            } else {
                updateprodnumdisp(i, 1);
            }
        }
    }

    /* Constituer des packs automatiquement en fonction des produits selectionnes */
    for (var i = 0; i < pack.length; i++) {
        if (pack[i]) {
            for (var j = 0; j < pack[i].length; j++) {
                if (!document.getElementById(prod[i])) {
                    fullpack = 1;
                    for (var k =  0; k < pack[i].length; k++) {
                        if (document.getElementById("check" + pack[i][k]).getAttribute("data-state") == "0") {
                            fullpack = 0;
                            break;
                        }
                    }

                    if (fullpack) {
                        addbasket(prod[i]);
                    }
                }
            }
        }
    }

    /* Enlever les produits selectionnees qui sont deja dans un pack selectionnes */
    for (var i = 0; i < prod.length; i++) {
        /* Produit dans panier */
        if (prod[i] && document.getElementById(prod[i])) {
            /* Produit dans pack */
            if (pack[i]) {
                for (var j = 0; j < pack[i].length; j++) {
                    p = prod[pack[i][j]];
                    if (p) {
                        for (var k = 0; k < prod.length; k++) {
                            if (prod[k] == p) {
                                if (document.getElementById(prod[k])) {
                                    rembasket(prod[k]);
                                } else {
                                    updateprodnumdisp(k, 0);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* Passe-t-on d'un panier vide a un panier plein ou vice-versa */
    if (oldnbprod != nbprod && (oldnbprod == 0 || nbprod == 0)) {
        imgpanier = document.getElementById("imgpanier");
        if (imgpanier) {
            imgpanier.src = "/cgi-bin/dispbask?dummy=" + nbprod;
        }
    }
    orldnbprod = nbprod;
    if (nbprod > 15) {
        buttonrepeat = document.getElementById("buttonrepeat");
        if (buttonrepeat) {
            buttonrepeat.style.display = "inline";
        }
    }

    init_panier_prod();
}

function hl(t, c) {
    var cn = null;
    var pn = null;
    var pcn = null;
    var i = 0;

    if (t.tagName == "TD") {
        cn = t.parentNode.childNodes;
    } else {
        cn = t.childNodes;
    }

    for (i = 0; i < cn.length - 2; i++) {
        if (cn[i].tagName == "TD" && cn[i].rowSpan < 2 && cn[i].className != "nohl") {
            cn[i].style.backgroundColor = c;
        }
    }

    if (prod[t.id]) {
        pn = document.getElementById(prod[t.id]);
        if (pn) {
            pcn = pn.childNodes;
            for (i = 0; i < pcn.lenght - 2; i++) {
                if (pcn[i].tagName == "TD") {
                    pcn[i].style.backgroundColor = c;
                }
            }
        }
    }
}

function updateproddisp(post, trig) {
    var prodnum = prod.indexOf(post);
    updateprodnumdisp(prodnum, trig);
}

function updateprodnumdisp(prodnum, trig) {
    /* trig : 0 si produit dans panier */
    /* trig : 1 si produit pas dans panier */
    /* trig : -1 pour se fier au 'checkbox' du produit et le passer a son etat oppose */

    var produit = document.getElementById("check" + prodnum);
    if (!produit) {
        return;
    }

    var mcheck = true;
    if (trig == 1) {
        mcheck = true;
    } else if (trig == 0) {
        mcheck = false;
    } else {
        if (produit.getAttribute("data-state") == "0") {
            mcheck = false;
        } else {
            mcheck = true;
        }
    }

    var row,
        icoPlus,
        icoCheck,
        add;
        
    if (mcheck == false) {
        produit.setAttribute("data-state", "1");
        row = document.getElementById(prodnum);
        icoPlus = document.getElementById('ico-plus' + prodnum);
        icoCheck = document.getElementById('ico-check' + prodnum);
        add = document.getElementById('add' + prodnum);

        add_class(row, 'isSelected');
        add_class(icoPlus, 'isInvisible');
        add_class(add, 'add');
        remove_class(icoCheck, 'isInvisible');

    } else {
        produit.setAttribute("data-state", "0");
        row = document.getElementById(prodnum);
        icoPlus = document.getElementById('ico-plus' + prodnum);
        icoCheck = document.getElementById('ico-check' + prodnum);
        add = document.getElementById('add' + prodnum);

        var tab = document.getElementById(prodnum.toString()).parentNode;
        var lines = tab.getElementsByTagName("tr");
        for (var j = 0; j < lines.length; j++) {
            if (lines[j].id == prodnum.toString()) {

                remove_class(row, 'isSelected');
                remove_class(icoPlus, 'isInvisible');
                remove_class(add, 'add');
                add_class(icoCheck, 'isInvisible');
            }
        }
    }
}

function only_one_product_by_classname(row, classname) {
    var products = document.getElementsByClassName(classname);

    if (products && row) { 
        for(var i = 0; i < products.length; i++) {
            remove_class(products[i], 'isSelected');
        }

        row.classList.add('isSelected');
    }
}

function only_one_product(row) {
    only_one_product_by_classname(row, 'subProduct');
}

function check_panierbar() {
    var target = document.getElementById('panier-bar'),
        eltCopyright = document.getElementById('copyright');

    if(target && target.style.display == 'block'){
        add_class(eltCopyright, 'panierbar');
    } else {
        remove_class(eltCopyright, 'panierbar');
    }
}

function observe_panierbar() {
    if(typeof MutationObserver == "function") {
        var target = document.getElementById('panier-bar');

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                check_panierbar();
            });
        });

        var config = {
            attributes: true
        };

        observer.observe(target, config);
    }
}/* GESTION POPUP PERSONNALISEE */
function open_popup_info(title, text, color) {
    var popup = document.getElementById('popup'),
        body  = document.getElementsByTagName('body')[0],
        popTitle = document.getElementById('popup_title'),
        popText  = document.getElementById('popup_text');

    remove_class(popup, "isHidden");
    add_class(popup, "flex");

    if(color != undefined) {
        add_class(popText, color);
    }

    body.style.overflow = "hidden";
    popTitle.textContent = title;
    popText.textContent = text;
}

function close_popup_info() {
    var popup    = document.getElementById('popup'),
        body     = document.getElementsByTagName('body')[0],
        popTitle = document.getElementById('popup_title'),
        popText  = document.getElementById('popup_text'),
        popBody  = document.getElementById('popup_body');

    remove_class(popup, "flex");
    add_class(popup, "isHidden");

    setTimeout(function(){ 
        remove_class(popText, 'red');
        remove_class(popText, 'green');
        body.style.overflow = "auto";
        popTitle.textContent = "";
        popBody.innerHTML = '<p id="popup_text" class="fs-14"></p>';
    }, 700);
}

function close_popup_content(content, delay) {
    var popup = document.getElementById('popup');
    var body  = document.getElementsByTagName('body')[0];

    if ( content != undefined ) {
        popContent = document.getElementsByClassName(content);
    } else {
        popContent = document.getElementsByClassName('Popup__content');
    }
        
    add_class(popup, "isHidden");
    remove_class(popup, "flex");

    //body.style.overflow = "auto";

    if (delay == 'no-delay' ) {

        body.style.overflow = "auto";
        for(var i = 0; i < popContent.length; i++) {
            if(!popContent[i].classList.contains('isHidden')) {
                add_class(popContent[i], "isHidden");
            }
        }
    } else {

        setTimeout(function(){ 
            body.style.overflow = "auto";
            for(var i = 0; i < popContent.length; i++) {
                if(!popContent[i].classList.contains('isHidden')) {
                    add_class(popContent[i], "isHidden");
                }
            }
        }, 700);
    }
}

function open_progress_overlay(frame, text) {

    var overlay = document.getElementById(frame + '_overlay'),
        status  = document.getElementById(frame + '_progress_status');

    if ( overlay != undefined ) {

        remove_class(overlay, 'isHidden');
        add_class(overlay, 'flex');

        /* pour main_overlay */
        if ( frame == "main" ) {

            var overflow = document.getElementById("overflow-hidden-compte");

            /* positionner l'overlay */
            if ( text == "Récupération de votre liste...") {
                overlay.style.top = "0";
            } else {
                overlay.style.top = scrollCourant + "px";
            }
            
            /* bloquer le scroll */
            add_class(overflow, "isFixed");
            overflow.style.top = "-" + scrollCourant + "px";
        }
    }

    if ( status != undefined ) {

        status.textContent = text;
    }
} 

function close_progress_overlay(frame) {

    var overlay = document.getElementById(frame + '_overlay'),
        status  = document.getElementById(frame + '_progress_status');

    if ( status != undefined ) {

        status.textContent = '';
    }

    if ( overlay != undefined ) {

        remove_class(overlay, 'flex');
        add_class(overlay, 'isHidden');

        if ( frame == "main" ) {

            var overflow = document.getElementById("overflow-hidden-compte");

            /* reinitialiser position overlay */
            overlay.style.top = "";

            /* autoriser le scroll */
            remove_class(overflow, "isFixed");
            overflow.style.height = "100vh";
        }
    }
}

/* CHARGEMENT DE CONTENU DEPUIS UN AUTRE FICHIER */
function load_content(url, content, target, callback) {

    var req;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        req = new XMLHttpRequest();
    }
    else { // code for IE6, IE5
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            var resp = req.responseText;
            var doc = new DOMParser().parseFromString(resp, "text/html");

            if (doc && doc.getElementById(content) && document.getElementById(target)) {
                var clone = doc.getElementById(content).cloneNode(true);

                document.getElementById(target).appendChild(clone);
            }
            if(callback != undefined) {
                callback();
            }
        }
    }

    req.open("GET", url, true);
    req.send();
}

function open_popup(content, eventCallback, param1, param2) {

    var timestamp = Date.now();

    /* fermer popup ouverte */
    close_popup();

    /* ouvrir popup */
    var popup = document.getElementById('popup');
    
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

    load_content('/pages/popup.html?ch=' + timestamp, content, 'popup', function() {

        if(document.getElementById(content)) {
            remove_class(popup, 'isHidden');
            form_placeholder();
            if(eventCallback) {
                if ( param1 == undefined && param2 == undefined && typeof eventCallback == "function" ) {
                    eventCallback();
                }
                /*popup.addEventListener('keyup', function bind_submit_event(e) {
                    if(e.keyCode == 13 && document.activeElement.form.getAttribute('id') != 'recherche_entrep2') {
                        if(param2) {
                            eventCallback(param1, param2);
                        } else {
                            eventCallback(param1);
                        }
                        popup.removeEventListener('keyup', bind_submit_event);
                    }
                });*/
            }
        } else {
            open_popup_message('Une erreur est survenue', 'Votre demande n\'a pu être traitée. Veuillez réessayer ultérieurement.', 'red');
        }

        /* fermer loader chargement */
        close_progress_overlay('loader_' + content);
    });
}

function close_popup(callback) {

    var popup = document.getElementById('popup');

    /* fermer sous-menu selection si ouvert */
    var sousMenu = document.getElementById("dashboard-list-nav");

    if (sousMenu && sousMenu.getAttribute("class").indexOf("open") != -1 ) {
        hide_action_selection("manual");
    }
    
    if(popup && !popup.classList.contains('isHidden')) {
        add_class(popup, 'isHidden');
    }

    if(callback != undefined && callback != '') {

        callback();
    }
}

function empty_popup() {
    var popup = document.getElementById('popup');

    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }
}

function open_popup_message(title, text, color, callback) {

    var timestamp = Date.now();

    /* fermer popup ouverte */
    close_popup();

    /* ouvrir popup */
    var popup = document.getElementById('popup');

    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

    load_content('/pages/popup.html?ch=' + timestamp, 'popup_message', 'popup', function() {
        if(document.getElementById('popup_message_title')) {
            var popTitle = document.getElementById('popup_message_title'),
                popText  = document.getElementById('popup_message_text');

            popTitle.textContent = title;
            popText.textContent = text;

            if(color != undefined) {
                add_class(popText, color);
            }

            remove_class(popup, 'isHidden');

            if ( typeof callback == "function" ) {
                callback();
            }
        }
    });
}

function redirect_login_popup() {
    var redirect = document.getElementById('redirect_login'),
        urlBack  = encode_to_hex(window.location.href);

    window.location.href = '/cgi-bin/compte-login?back=' + urlBack;
}/********************************************************/
/******************** VIEW_PUBLICATION ******************/
/********************************************************/
function retract_animation() {
    var summary = document.getElementById('summary');
    if (!summary) {
        return;
    }

    var offset = get_height(summary);
    if (offset > 0) {
        offset -= 20;

        if (offset < 0) {
            hide_obj(summary);
            offset = 0;
        }

        summary.style.height = offset + "px";
        setTimeout(function(){retract_animation()}, 5);
    }
}

function display_iframe() {
    var input = document.getElementById('partner_form_input');
    var sep = document.getElementById('partner_form_sep');
    var iframe = document.getElementById('partner_form_iframe');

    hide_obj(input);
    hide_obj(sep);
    display_obj_block(iframe);

    /* Gestion de l'animation */
    setTimeout(function(){retract_animation();}, 5);
}/* Verifie l'etat de la reponse */
function getresponse(req) {

    if (req && req.readyState == 4) {
        return (req.responseText);
    }
    return (null);
}

/* FONCTION GLOBALE DE QUEUE */
function getXhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function Request(beforeRequest, requestRunning, localError, requestReturn, endRequest) {
    this.xmlhttp = getXhr();
    this.xmlhttp.wrapper = this;
    this.orsc = orsc;
    add_event(this.xmlhttp, "readystatechange", this.orsc);

    this.beforeRequest  = (typeof(beforeRequest)    == "function") ? beforeRequest  : defunc;
    this.requestRunning = (typeof(requestRunning)   == "function") ? requestRunning : defunc;
    this.localError     = (typeof(localError)       == "function") ? localError     : defunc;
    this.requestReturn  = (typeof(requestReturn)    == "function") ? requestReturn  : defunc;
    this.endRequest     = (typeof(endRequest)       == "function") ? endRequest     : defunc;

    this.send = function (method, querystring, async, parameters) {
        this.beforeRequest();
        this.xmlhttp.open(method, querystring, (async != false) ? true : false);
        //this.xmlhttp.setRequestHeader('Content-type', 'text/html; charset=iso-8859-1');
        this.xmlhttp.send(parameters);
    }

    function orsc () {
        var response;
        var jsonResponse;
        var wrapper = this.wrapper;

        if (this.readyState != 4 || this.status < 200) {
            wrapper.requestRunning();
            return;
        }

        /*if (this.status == 401 || this.status == 403) {
            wrapper.endRequest();
            open_popup('popup_connect_error');
            return;
        }*/

        if (this.status > 300) {
            wrapper.endRequest();
            wrapper.localError(this);
            return;
        }

        response = this.responseText;
        
        wrapper.endRequest();

        try {
            jsonResponse = JSON.parse(response);
        } catch(e) {
            wrapper.localError(response);
            return;
        }

        wrapper.requestReturn(jsonResponse);
    }

    function defunc() {
        return;
    }
}

function Queue() {
    this.queue = [];
    this.running = 0;

    this.add = add;
    this.addFirst = addFirst;
    this.run = run;

    function add(fct, params) {
        this.queue.push({fonction:fct, parametre:params});
        if (this.running == 0) {
            this.run();
        }
    }

    function addFirst(fct, params) {
        this.queue.unshift({fonction:fct, parametre:params});
        if (this.running == 0) {
            this.run();
        }
    }

    function run() {
        var obj = this.queue.shift();
        if (obj == undefined) {
            this.running = 0;
            return;
        }
        this.running = 1;
        obj.fonction(obj.parametre, this);
    }
}


/* Modele :
 * ressource/parameter/parameter/parameter
 */
 function RessourceAPI() {

    this.ressource = {};

    this.add = add;

    function add(ressource, method, steps) {
        if (typeof (this.ressource[ressource]) != "object") {
            this.ressource[ressource] = {
                "queueParent" : new Queue()
            }
        }

        if (typeof (this.ressource[ressource][method]) == "object") {
            return false;
        }

        /* Possibilite d'avoir une queue par methode ou une queue par ressource.
         * On peut aussi envisager la possibilite de n'avoir qu'une seule queue globale
         */

        // Une queue par methode :
        //queue = new Queue();

        // Une queue par ressource :
        if (typeof (this.ressource[ressource].queue) != "object") {
            this.ressource[ressource].queue = new Queue();
        }

        var queue = this.ressource[ressource].queue;

        this.ressource[ressource][method] = {
            "queue" : queue,
            "ressource" : ressource,
            "steps" : steps,
            "method" : method,
            "request" : function () {
                var req = new Request(
                    steps["before"],
                    steps["running"],
                    steps["error"],
                    steps["ok"],
                    steps["end"]
                );

                req.queue = queue;

                req.endRequest = function () {
                    this.queue.run();
                    if (steps["end"]) {
                        steps["end"]();
                    }
                }

                return req; /* I think that there is a place in hell for people like me, fortunately, I'm not a big believer */
            }(),
            "run" : function(id, parameters, format) { /* TODO : try to conform to : https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
                    */
                var query = this.ressource;
                if (id) {
                    if (typeof(id) == "object") {
                        query = query + id.join('/');
                    } else {
                        if (typeof(id) == "string") {
                            query = query + id;
                        } else { 
                            return;
                        }
                    }
                }

                var params = "";
                if (parameters) {

                    if ( format == "string" ) {

                        var i = 0;
                        for(var name in parameters) {
                            if (i != 0) {
                                params = params + "&";
                            } else {
                                i = 1;
                            }
                            params = params + name + "=" + parameters[name];
                        }
                    }
                    else if ( format == "formData" ) {

                        params = parameters;
                    }
                }

                /*this.queue.add((params, that) => {
                    this.request.send(params.method, params.query, true, params.params);
                }, {
                    "method": this.method, 
                    "query": query,
                    "params": params
                });*/
                var thatRequest = this.request,
                    thatMethod  = this.method;

                this.queue.add(function (params, that) {
                    thatRequest.send(params.method, params.query, true, params.params);
                }, {
                    "method": thatMethod,
                    "query": query,
                    "params": params
                });
            }
        }

        return true;
    }
}

/* FONCTION DE QUEUE POUR IE11 */
function request_wrapper_IE(method, url, param, paramType, before, running, error, callback, end) {

    var parameters = "";

    this.xmlhttp = getXhr();
    this.xmlhttp.wrapper = this;
    this.orsc = orsc;
    add_event(this.xmlhttp, "readystatechange", this.orsc);

    this.before   = (typeof(before)  == "function") ? before   : defunc;
    this.running  = (typeof(running) == "function") ? running  : defunc;
    this.error    = (typeof(error)   == "function") ? error    : defunc;
    this.callback = (typeof(callback)== "function") ? callback : defunc;
    this.end      = (typeof(end)     == "function") ? end      : defunc;

    /* annulation de la requete en cours si 2 requetes */
    if (this.xmlhttp && this.xmlhttp.readyState != 0){
        this.xmlhttp.abort();
    }

    this.before();

    /* requete */
    if(param) {
        if(paramType == 'formData') {

            parameters = param;
        } else if (paramType == 'string') {

            var i = 0;
            for(var name in param) {
                if (i != 0) {
                    parameters += "&";
                } else {
                    i = 1;
                }
                parameters += name + "=" + param[name];
            }
        } else {
            for(var i = 0; i < param.length; i++) {
                if(i = 0) {
                    url += '?' + param[i].name + '=' + param[i].value;
                } else {
                    url += '&' + param[i].name + '=' + param[i].value;
                }
            }
        }

        this.xmlhttp.open(method, url, true);
        this.xmlhttp.send(parameters);
    } else {

        this.xmlhttp.open(method, url, true);
        this.xmlhttp.send();
    }

    function orsc() {
        var response;
        var jsonResponse;
        var wrapper = this.wrapper;

        if (this.readyState != 4 || this.status < 200) {
            wrapper.running();
            return;
        }

        if (this.status == 403) {
            wrapper.endRequest();
            open_popup('popup_connect_error');
            return;
        }

        response = this.responseText;

        console.log(response);

        if (this.status > 300) {
            wrapper.end();
            //wrapper.error(this);
            wrapper.error(response);
            return;
        }
        
        wrapper.end();

        try {
            jsonResponse = JSON.parse(response);
        } catch(e) {
            wrapper.error(response);
            return;
        }

        wrapper.callback(jsonResponse);
    }

    function defunc() {
        return;
    }
}

/* afficher msg d'erreur suite a une requete */
function handle_request_error(response) {

    var title = "";

    if ( detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11" ) {

        var title = "Mon réseau";
    }
    else {

        /* definir le title de l'erreur */
        if ( response.responseURL.indexOf("api/liste") != -1 ) {

            if ( response.responseURL.indexOf("/element") != -1 ) {
                title = "Mes entreprises";
            }
            else if ( response.responseURL.indexOf("/commentaire") != -1 ) {
                title = "Mes commentaires";
            }
            else {
                title = "Mes listes";
            }
        }
        else if ( response.responseURL.indexOf("compte-veilles") != -1 ) {

            if ( response.responseURL.indexOf("act=insert") != -1 ) {
                title = "Ajout de veilles";
            }
            else if ( response.responseURL.indexOf("act=suppr") != -1 ) {
                title = "Suppression de veilles";
            }
            else {
                title = "Mes veilles";
            }
        }
        else if ( response.responseURL.indexOf("/addbasket-new") != -1 ) {

            if ( response.responseURL.indexOf("disp=") != -1 ) {
                title = "Récupération de votre panier";
            }
            else if ( response.responseURL.indexOf("prod=") != -1 ) {

                title = "Ajout d'une veille au panier";
            } else if ( response.responseURL.indexOf("delp=") != -1 ) {

                title = "Suppression d'une veille du panier";
            }
            else {
                title = "Mon panier";
            }
        }
        else if ( response.responseURL.indexOf("/compte-api-minifiche") != -1 || response.responseURL.indexOf("/compte-api-fiche") != -1 ) {

            title = "Résumé de l\'entreprise";
        }
        else {
            title = "Mon réseau";
        }
    }

    gana_event(null, 'Dashboard', 'Erreur', response.status);


    /* afficher msg erreur */
    switch(response.status) {
        case 400 :
            open_popup_message(title, 'Votre demande n\'a pu être traitée.', 'red');
            break;
        case 401 :
            open_popup('popup_connect_error');
            break;
        case 403 :
            open_popup('popup_connect_error');
            break;
        case 404 :
            open_popup_message(title, 'Votre demande n\'a pu être traitée..', 'red');
            break;
        /*case undefined :
            break;*/
        default :
            open_popup_message(title, 'Afin d\'améliorer nos services, nous effectuons des opérations de maintenance. Nous vous invitons à revenir dans quelques instants et nous excusons pour la gêne occasionnée.', 'red');
            break;
    }
}

var router;

function compte_app_init() {

    createScript('/scripts/router.js', function() {
        router = new Navigo(window.location.origin);

        var title      = document.getElementsByTagName("title")[0],
            dashHome   = document.getElementById('dashboard_home'),
            dashDetail = document.getElementById('dashboard_liste_detail');

        router.on({
            '/app/reseau/dashboard*': function() {
                title.innerHTML = "Réseau d'entreprises - Societe.com";

                if (dashDetail) {
                    add_class(dashDetail, 'isHidden');
                }

                if (dashHome) {
                    remove_class(dashHome, 'isHidden');
                } 
                get_dashboard_lists();
                display_explain_dashboard("show");
            },
            '/app/reseau/:name/:id': function(params, query) {
                /* Possible de faire une 404 ici si on ne trouve pas de liste d'id {id} pour le client */
                title.innerHTML = params.name + " - Societe.com";

                if (dashDetail) {
                    remove_class(dashDetail, 'isHidden');
                }

                if (dashHome) {get_dashboard_lists
                    add_class(dashHome, 'isHidden');
                }

                /* recuperation liste des listes si utilisateur ne passe pas par la home dashboard */
                if ( stockListsName.length == 0 ) {
                    get_dashboard_lists();
                }

                get_dashboard_list_detail(params.id);
                display_explain_dashboard("hide");
            },
            '/app/reseau/*': function() {
                /* Par defaut on affiche le dashboard */
                router.navigate('/app/reseau/dashboard', true);
            },
            '/app/reseau': function() {
                /* Faire une 404 avec un retour vers le dashboard */
                router.navigate('/app/reseau/dashboard', true);
            },
            '/*': function() {
                /* Faire une 404 avec un retour vers le dashboard */
                if ( document.location.href.indexOf("cgi-bin/compte-liste-dashboard") != -1 ) {
                    router.navigate('/app/reseau/dashboard', true);
                }
            }
        }).resolve();
    });
}function init_search() {
    var input = document.getElementById("input_search");
    var getPlaceholder = input.getAttribute('placeholder');

    event_input(input, getPlaceholder);

    if (input) {
        add_event(input, "focus", function () {
            this.setAttribute("autocapitalize", "none");
            this.setAttribute("autocorrect", "off");
        });
    }
}

function init_search_2() {
    event_input("input_search2", "Entreprise, dirigeant, SIREN...");
}

function init_search_3() {
    event_input("input_search3", "Entreprise, dirigeant, SIREN...");
}

/********************************************************/
/******************** RECHERCHE AVANCEE *****************/
/********************************************************/
/* Placement de la barre sous l'onglet actif */
function searchtab_active(){
    var activeFrame = document.getElementById('frame-entrepr')
                || document.getElementById('frame-etab')
                || document.getElementById('frame-dirigeant');

    switch(activeFrame.id) {
    case 'frame-entrepr':
        var activeTab = document.getElementById('tab-entrepr');
        add_class(activeTab, 'isActive');
        break;

    case'frame-etab':
        var activeTab = document.getElementById('tab-etab');
        add_class(activeTab, 'isActive');
        break;

    case 'frame-dirigeant':
        var activeTab = document.getElementById('tab-dirigeant');
        add_class(activeTab, 'isActive');
        break;
    }
}

/* Fonction permettant la gestion de fonctionnalite de
 * la recherche avancee */
function init_recherche() {
    var apeavance = document.getElementById('avanceape');
    var apeentrep = document.getElementById('entrepape');
    var ville = document.getElementById('avanceville');

    if (apeavance) {
        add_event(apeavance, "keyup", function() {ape_keyup(apeavance);});
    }

    if (apeentrep) {
        add_event(apeentrep, "keyup", function() {ape_keyup(apeentrep);});
    }

    if (ville) {
        add_event(ville, "keyup", function() {ville_keyup(ville);});
    }

    /* On gere les placeholders aux focus / blur */
    var inputEtab = get_elementsbyclassname(document, 'input-etab');
    var inputEntrepr = get_elementsbyclassname(document, 'input-entrepr');

    for(var i = 0; i < inputEtab.length; i++) {
        /* Gestion des placeholders */
        var getPlaceholder = inputEtab[i].getAttribute('placeholder');

        event_input(inputEtab[i], getPlaceholder);

        /* Gestion des mini-labels */
        add_event(inputEtab[i], 'blur', function(){
            if(this.value != '') {
                add_class(this, 'filled');
            } else {
                remove_class(this, 'filled');
            }
        });
    }

    for(var i = 0; i < inputEntrepr.length; i++) {
        /* Gestion des placeholders */
        var getPlaceholder = inputEntrepr[i].getAttribute('placeholder');

        event_input(inputEntrepr[i], getPlaceholder);

        /* Gestion des mini-labels */
        add_event(inputEntrepr[i], 'blur', function(){
            if(this.value != '') {
                add_class(this, 'filled');
            } else {
                remove_class(this, 'filled');
            }
        });
    }
}

function init_recherche_dir() {
    var inputDir = get_elementsbyclassname(document, 'input-dir');

    for(var i = 0; i < inputDir.length; i++) {
        /* Gestion des placeholders */
        var getPlaceholder = inputDir[i].getAttribute('placeholder');

        event_input(inputDir[i], getPlaceholder);
        /* Gestion des mini-labels */
        add_event(inputDir[i], 'blur', function(){
            if(this.value != '') {
                add_class(this, 'filled');
            } else {
                remove_class(this, 'filled');
            }
        });
    }
}

function submit_recherche() {
    var adr = document.getElementById('avanceadr');
    var ville = document.getElementById('avanceville');

    if (adr.value == "N'indiquez pas rue, avenue, ...") {
        adr.value = "";
    }

    if (ville.value == "Par exemple Lyon, Paris 16, ...") {
        ville.value = "";
    }

    submit('recherche_avance');
    return (true);
}

/* Fonction gerant la saisie ape */
function ape_keyup(itemobj) {
    if (!itemobj) {
        return;
    }

    if (itemobj.value.replace(/ /g, "").length > 1) {
        sendrequest_act(itemobj);
    } else {
        cleanup_act();
    }
}

/* On supprime tout (resultat ape) + on cache les
 * blocs (div) pour la saisie ape */
function cleanup_act() {
    var res = document.getElementById('actresult');
    var div = document.getElementById('actbloc');
    var rec = document.getElementById('actrecherche');
    var auc = document.getElementById('actaucunes');
    var ape = document.getElementById('avanceape') || document.getElementById('entrepape');

    remove_class(div, 'no-info');
    remove_class(div, 'list');
    hide_obj(rec);
    remove_class(ape, 'red-border');

    for (var i = nb_child(res) - 1; i >= 0; i--) {
        if (res.children[i].id.indexOf("div_act_") != -1) {
            res.removeChild(res.children[i]);
        }
    }

}

/* Envoi de la requete vers /cgi-bin/recape */
function sendrequest_act(itemobj) {
    var req = null;


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

    req.onreadystatechange = function() {getresponse_act(req, itemobj);};
    req.open("POST", "/cgi-bin/recape", true);
    req.setRequestHeader("Content-type", "application/x-www-from-urlencode;");
    req.send("q=" + escape(itemobj.value));
}

/* Recuperation du resultat de recape */
function getresponse_act(req, itemobj) {
    if (req.readyState != 4) {
        return;
    }

    if (req.status != 200) {
        cleanup_act();
        return;
    }

    var div = document.getElementById('actbloc');
    var res = document.getElementById('actresult');
    var rec = document.getElementById('actrecherche');
    var auc = document.getElementById('actaucunes');
    var ape = document.getElementById('avanceape') || document.getElementById('entrepape');

    var sres = req.responseText;
    if (sres == "") {
        cleanup_act();
        add_class(div, 'no-info');
        add_class(ape, 'red-border');
    } else if (sres != "" && sres.indexOf("Internal Server Error") == -1) {
        var lines = sres.split("\n");

        cleanup_act();
        add_class(div, 'list');

        /* on n'affiche pas de code APE de 2 chiffres tant que la recherche ne peut pas retourner de resultats */
        /*if(ape.value.length <= 2) {
            var i = 1;
        } else {
            var i = 0;
        }*/

        for (var i = 0; i < lines.length; i++) {
            if (lines[i] != '') {
                var infos = lines[i].split("\t");
                var template = document.getElementById('actresult_item').cloneNode(true);
                var id = "act_" + i;
                var divid = "div_" + id;
                template.id = divid;

                var disp = template.getElementsByTagName('p')[0];
                disp.id = "act_content_" + i;
                disp.setAttribute("data-naf", infos[0]);
                disp.setAttribute("data-text", infos[1]);

                if (i % 2 == 0) {
                    disp.style.backgroundColor = "#f1f1f1";
                }

                var code = disp.getElementsByTagName('span')[0];
                var text = disp.getElementsByTagName('span')[1];

                code.innerHTML = infos[0];
                text.innerHTML = infos[1];

                add_event(disp, "click", function(){onclick_act(this, itemobj);});

                res.appendChild(template);
                display_obj_block(template);
            }
        }

        if(ape.value.length <= 2) {
            document.getElementById('div_act_0').style.cursor = "not-allowed";
            document.getElementById('act_content_0').style.cursor = "not-allowed";
            document.getElementById('act_content_0').style.pointerEvents = "none";
            return;
        } else {
            document.getElementById('act_content_0').style.cursor = "pointer";
            document.getElementById('act_content_0').style.pointerEvents = "auto";
        }
    }
}

/* Fonction permettant de setter le code naf dans le champ */
function onclick_act(elem, itemobj) {
    itemobj.value = elem.getAttribute("data-naf");
    cleanup_act();
}

/* Fonction gerant la saisie commune */
function ville_keyup(itemobj) {
    if (!itemobj) {
        return;
    }

    if (itemobj.value.replace(/ /g, "").length > 1) {
        sendrequest_ville(itemobj);
    } else {
        cleanup_ville();
    }
}

/* Permet de tout clean (resultat) + cacher les zones pour ville */
function cleanup_ville() {
    var div = document.getElementById('villebloc');
    var res = document.getElementById('villeresult');
    var rec = document.getElementById('villerecherche');
    var auc = document.getElementById('villeaucunes');
    var ville = document.getElementById('avanceville');

    remove_class(div, 'no-info');
    remove_class(div, 'list');
    hide_obj(rec);
    remove_class(ville, 'red-border');

    for (var i = nb_child(res) - 1; i >= 0; i--) {
        if (res.children[i].id.indexOf("div_ville_") != -1) {
            res.removeChild(res.children[i]);
        }
    }

}

/* Envoi de la requete vers /cgi-bin/villes */
function sendrequest_ville(itemobj) {
    var req = null;


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

    req.onreadystatechange = function() {getresponse_ville(req, itemobj);};
    req.open("POST", "/cgi-bin/villes", true);
    req.setRequestHeader("Content-type", "application/x-www-from-urlencode;");
    req.send("q=" + escape(itemobj.value));
}

/* Retour de la requete + construction de l'affichage */
function getresponse_ville(req, itemobj) {
    if (req.readyState != 4) {
        return;
    }

    if (req.status != 200) {
        cleanup_ville();
        return;
    }

    var div = document.getElementById('villebloc');
    var res = document.getElementById('villeresult');
    var rec = document.getElementById('villerecherche');
    var auc = document.getElementById('villeaucunes');
    var ville = document.getElementById('avanceville');

    var sres = req.responseText;
    if (sres == "") {
        cleanup_ville();
        add_class(div, 'no-info');
        add_class(ville, 'red-border');
    } else if (sres != "" && sres.indexOf("Internal Server Error") == -1) {
        var lines = sres.split("\n");

        cleanup_ville();
        add_class(div, 'list');

        for (var i = 0; i < lines.length; i++) {
            if (lines[i] != '') {
                var infos = lines[i].split("\t");
                var template = document.getElementById('villeresult_item').cloneNode(true);

                var id = "ville_" + i;
                var divid = "div_" + id;
                template.id = divid;

                var disp = template.getElementsByTagName('p')[0];
                disp.id = "ville_content_" + i;
                disp.setAttribute("data-text", infos[0]);
                disp.setAttribute("data-cp", infos[1]);

                if (i % 2 == 0) {
                    disp.style.backgroundColor = "#f1f1f1";
                }

                var code = disp.getElementsByTagName('span')[0];
                var text = disp.getElementsByTagName('span')[1];
                code.innerHTML = infos[1];
                text.innerHTML = infos[0];

                add_event(disp, "click", function(){onclick_ville(this, itemobj);});

                res.appendChild(template);
                display_obj_block(template);
            }
        }
    }
}

/* On sette lors d'un clic sur un resultat la reponse dans le champ */
function onclick_ville(elem, itemobj) {
    itemobj.value = elem.getAttribute("data-text");
    cleanup_ville();
}

/* afficher recherche avancee dans header en fixed */
function show_advanced_search() {

    var search      = document.getElementById("form_search2");

    add_class(search, "searchAdvanced");
}

/********************************************************/
/******************* LISTE RECHERCHE ********************/
/********************************************************/
function display_liste() {
    var list = document.getElementById('listehide');
    var butt = document.getElementById('buttliste');

    if (list) {
        list.style.display = "block";
    }

    if (butt) {
        butt.style.display = "none";
    }
}


/********************************************************/
/******************* RESULTATS RECHERCHE ****************/
/********************************************************/
function init_result_search() {

    /* arreter loading quand page chargee */
    end_loading_search();

    /* gestion btn afficher plus de resultats */
    if ( document.getElementById("search_details") ) {
        display_results();
    }

    /* remplir nb recap */
    if ( document.getElementById("search") && document.getElementById("result_search_recap_dirigeant") ) {
        recap_result_search_number("dirigeant");
    } else if (document.getElementById("search") && document.getElementById("result_search_recap_societe")) {
        recap_result_search_number("societe");
    }

    /* afficher infos contexte sur haut page result detailles */
    display_infos_result_detailles();

    /* ajouter separateur de milliers */
    display_num(document.getElementById("page"));

    /* surligner les termes de la recherche */
    search_highlight();

    /* col gauche fixe au scroll */
    //Seulement sur les pages generiques
    if ( (document.getElementById("result_search_recap_dirigeant") && document.getElementById("result_search_recap_dirigeant").getAttribute("data-context") == null) || (document.getElementById("result_search_recap_societe") && document.getElementById("result_search_recap_societe").getAttribute("data-context") == null) ) {
        recap_search_scroll();
    }
}

/* arreter loading quand page chargee */
function end_loading_search() {

    //sur societe
    if ( document.getElementById("result_search_recap_societe") ) {

        //result generiques
        if ( document.getElementById("result_search_nav_societe") ) {

            var verifLoading = setInterval("verif_loading('societe')", 500);

            if ( verif_loading('societe') == true ) {

                clearInterval(verifLoading);

                setTimeout(function(){
                    recap_result_loading();
                }, 500);
            }
        }
        //result specifiques
        else {

            var verifLoading = setInterval("verif_loading_specifique('societe')", 500);

            if ( verif_loading_specifique('societe') == true ) {

                clearInterval(verifLoading);

                setTimeout(function(){
                    recap_result_loading_specifique();
                }, 500);
            }
        }
    }
    //sur dirigeant
    else if ( document.getElementById("result_search_recap_dirigeant") ) {

        //result generiques
        if ( document.getElementById("result_search_nav_dirigeant") ) {

            var verifLoading = setInterval("verif_loading('dirigeant')", 500);

            if ( verif_loading('dirigeant') == true ) {

                clearInterval(verifLoading);

                setTimeout(function(){
                    recap_result_loading();
                }, 500);
            }
        }
        //result specifiques
        else {

            var verifLoading = setInterval("verif_loading_specifique('dirigeant')", 500);

            if ( verif_loading_specifique('dirigeant') == true ) {

                clearInterval(verifLoading);

                setTimeout(function(){
                    recap_result_loading_specifique();
                }, 500);
            }
        }
    }
}

/* surligner les termes de la recherche */
function search_highlight(string) {

    var bloc = document.getElementsByClassName("bloclist");

    /* faire le remplacement dans tous les blocs */
    for (var i = 0; i < bloc.length; i++) {

        var cible  = bloc[i],
            search = "";

        /* page result detailles */
        if ( document.getElementById("recapsearch") ) {

            search = document.getElementById("recapsearch").innerText;
        }
        /* page result */
        else {

            if ( document.getElementById("recap_search_general") ) {

                search = document.getElementById("recap_search_general").innerText;
            } 
        }

        if ( search && search != "" && search != " ") {

            var searchTable = search.toUpperCase().split(" "),
                name        = cible.getElementsByClassName("deno"),
                obj         = {};

            searchTable.sort(function(a, b) {

                return (b.length - a.length);
            });

            /* boucler sur tous les resultats */
            for ( var n = 0; n < name.length; n++) {

                var deno = name[n].innerText,
                    deno = remove_accents(deno);

                /* boucler sur les differents termes de la recherche */
                for ( var s = 0; s < searchTable.length; s++ ) {

                    obj[searchTable[s]] = "<span class='highlight'>" + searchTable[s] + '</span>';
                }

                var regexarr = Object.keys(obj);
                var reg = "";
                for ( var idx = 0; idx < regexarr.length; idx++ ) {
                    if (idx > 0) {
                        reg += "|";
                    }
                    reg += "\\b" + regexarr[idx].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b";
                }
                var regex = new RegExp(reg, "gi");

                result = deno.replace(regex, function(matched) {
                    return obj[matched.toUpperCase()];
                });

                /* remplacer la deno par le terme surligne */
                name[n].innerHTML = result;
            }
        }

        /* refaire la recherche sans accent */
        if ( search != remove_accents(search) ) {

            if ( remove_accents(search) && remove_accents(search) != "" && remove_accents(search) != " ") {

                var searchTable = remove_accents(search).toUpperCase().split(" "),
                    name        = cible.getElementsByClassName("deno"),
                    obj         = {};

                searchTable.sort(function(a, b) {

                    return (b.length - a.length);
                });

                /* boucler sur tous les resultats */
                for ( var n = 0; n < name.length; n++) {

                    var deno = name[n].innerText,
                        deno = remove_accents(deno);

                    /* boucler sur les differents termes de la recherche */
                    for ( var s = 0; s < searchTable.length; s++ ) {

                        obj[searchTable[s]] = "<span class='highlight'>" + searchTable[s] + '</span>';
                    }

                    var regexarr = Object.keys(obj);
                    var reg = "";
                    for ( var idx = 0; idx < regexarr.length; idx++ ) {
                        if (idx > 0) {
                            reg += "|";
                        }
                        reg += "\\b" + regexarr[idx].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b";
                    }
                    var regex = new RegExp(reg, "gi");

                    result = deno.replace(regex, function(matched) {
                        return obj[matched.toUpperCase()];
                    });

                    /* remplacer la deno par le terme surligne */
                    name[n].innerHTML = result;
                }
            }
        }
    }
}


/* enlever les accents d'un texte */
function remove_accents(string){

    var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž',
        accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz",
        x          = "";

      string = string.split('');

      for (var i = 0; i < string.length; i++) {

        if ( (x = accents.indexOf(string[i]) ) != -1) {

          string[i] = accentsOut[x];
        }
      }

      return string.join('');
}

/* verif si tous les elements sont charges sur page results generiques */
function verif_loading(context) {

    /* sur societe */
    if ( context == "societe" ) {

        if ( document.getElementById("recap_deno_nb") && document.getElementById("recap_rs_nb") && document.getElementById("recap_etab_nb") && document.getElementById("recap_dirsoc_nb") && document.getElementById("recap_marque_nb") && document.getElementById("recap_dir_nb") && document.getElementById("recap_doc_nb") ) {
            return true;
        } else {
            return false;
        }
    }
    /* sur dirigeant */
    if ( context == "dirigeant" ) {

        /* page resultats recherche avancee */
        if ( document.getElementById("page").getAttribute("data-view") == "result_search_dirigeant" ) {

            if ( document.getElementById("recap_dir_nb") ) {
                return true;
            } else {
                return false;
            }
        }
        /* page resultats recherche simple */
        else {

            if ( document.getElementById("recap_dir_nb") && document.getElementById("recap_dirsoc_nb") && document.getElementById("recap_deno_nb") && document.getElementById("recap_doc_nb") ) {
                return true;
            } else {
                return false;
            }
        }
    }
}

/* verif si tous les elements sont charges sur page results specifiques */
function verif_loading_specifique(context) {

    /* sur societe */
    if ( context == "societe" ) {

        if ( document.getElementById("recap_soc_nb") ) {
            return true;
        } else {
            return false;
        }
    }
    /* sur dirigeant */
    if ( context == "dirigeant" ) {

        if ( document.getElementById("recap_dir_nb") ) {
            return true;
        } else {
            return false;
        }
    }
}

/* recup les nb de resultats sur page results generique */
function recap_result_loading() {

    var loadingNav   = document.getElementsByClassName("nav-bloc-load"),
        loadingRecap = document.getElementsByClassName("recap-bloc-load");
    

    /* ajouter link sur bloc recap */
    for ( var x = 0; x < loadingRecap.length; x++ ) {

        var id = loadingRecap[x].parentNode.id;

        /* cas du bloc societe */
        if ( id == "bloc_recap_societe" ) {

            var cible = document.getElementById("recap_societe_nb_details"),
                blocs = cible.getElementsByClassName("bloc__recapdetails");

            for ( var b = 0; b < blocs.length; b++ ) {

                if ( blocs[b].getElementsByClassName("numberdetails")[0].innerHTML != "" && blocs[b].getElementsByClassName("numberdetails")[0].innerHTML != 0 ) {

                    var idBloc   = blocs[b].id,
                        idBloc   = idBloc.substring(11, idBloc.length),
                        linkBloc = "#result_" + idBloc;

                    blocs[b].setAttribute("onclick", "location.href='" + linkBloc + "';");
                    blocs[b].style.cursor = "pointer";
                }
            }
        }
        /* cas generique */
        else {

            id = id.substring(11, id.length);

            if ( document.getElementById("result_" + id) ) {

                var link = "#result_" + id;

                loadingRecap[x].parentNode.setAttribute("onclick", "location.href='" + link + "';");
                loadingRecap[x].parentNode.style.cursor = "pointer";
            }
        }
    }

    /* ajouter link sur onglet societe du haut */
    for ( var i = 0; i < loadingNav.length; i++ ) {

        if ( loadingNav[i].parentNode.parentNode.id == "nav_onglet_societe" ) {

            /* verif si deno existe */
            if ( document.getElementById("result_deno_societe") ) {

                var link = "#result_deno_societe";
            }
            /* sinon verif si rs existe */
            else if ( document.getElementById("result_rs_societe") ) {

                var link = "#result_rs_societe";
            }
            /* sinon verif si dirsoc existe */
            else if ( document.getElementById("result_dirsoc_societe") ) {

                var link = "#result_dirsoc_societe";
            }
            /* sinon verif si etab existe */
            else if ( document.getElementById("result_etab_societe") ) {

                var link = "#result_etab_societe";
            }

            if ( link ) {

                document.getElementById("nav_onglet_societe").getElementsByTagName("a")[0].setAttribute("href", link);
            }
        }
    }

    /* gif loading */
    add_class(document.getElementById("recap_total_nb_loading"), "isHidden");

    /* gif loading onglets du haut */
    for ( var i = 0; i < loadingNav.length; i++ ) {

        /* gif loading onglets du haut */
        add_class(loadingNav[i], "isHidden");
        remove_class(loadingNav[i].parentNode, "loading");
    }

    /* gif loading blocs recap colonne gauche */
    for ( var x = 0; x < loadingRecap.length; x++ ) {

        add_class(loadingRecap[x], "isHidden");
        remove_class(loadingRecap[x].parentNode, "loading");
    }
}

/* cacher loading sur page results specifiques */
function recap_result_loading_specifique() {

    var loadingRecap = document.getElementsByClassName("recap-bloc-load");

    /* gif loading */
    add_class(document.getElementById("recap_total_nb_loading"), "isHidden");

    /* gif loading blocs recap colonne gauche */
    for ( var x = 0; x < loadingRecap.length; x++ ) {

        add_class(loadingRecap[x], "isHidden");
        remove_class(loadingRecap[x].parentNode, "loading");
    }
}

/* remplir nb recap sur page resultats */
function recap_result_search_number(context) {

    /* exclure page resultat dirigeant recherche avancee */
    if ( document.getElementById("page").getAttribute("data-view") != "result_search_dirigeant" ) {

        var totalSociete = 0;

        /* societe - deno */
        if ( document.getElementById("recap_deno_nb") ) {

            if ( document.getElementById("recap_deno_nb").innerHTML != "" ) {

                document.getElementById("recap_deno_nb_recap").innerHTML = document.getElementById("recap_deno_nb").innerHTML;
                totalSociete = totalSociete + parseInt(document.getElementById("recap_deno_nb").innerHTML);
            } else {

                document.getElementById("recap_deno_nb_recap").innerHTML = "0";
            }
        } else {

            document.getElementById("recap_deno_nb_recap").innerHTML = "0";
        }

        /* societe - rs */
        if ( document.getElementById("recap_rs_nb") ) {

            if ( document.getElementById("recap_rs_nb").innerHTML != "" ) {

                document.getElementById("recap_rs_nb_recap").innerHTML = document.getElementById("recap_rs_nb").innerHTML;
                totalSociete = totalSociete + parseInt(document.getElementById("recap_rs_nb").innerHTML);
            } else {

                document.getElementById("recap_rs_nb_recap").innerHTML = "0";
            }
        } else {

            /* uniquement pour site societe */
            if ( context && context == "societe" ) {

                document.getElementById("recap_rs_nb_recap").innerHTML = "0";
            }
        }

        /* societe - dir */
        if ( document.getElementById("recap_dirsoc_nb") ) {

            if ( document.getElementById("recap_dirsoc_nb").innerHTML != "" ) {

                document.getElementById("recap_dirsoc_nb_recap").innerHTML = document.getElementById("recap_dirsoc_nb").innerHTML;
                totalSociete = totalSociete + parseInt(document.getElementById("recap_dirsoc_nb").innerHTML);
            } else {

                document.getElementById("recap_dirsoc_nb_recap").innerHTML = "0";
            }
        } else {

            document.getElementById("recap_dirsoc_nb_recap").innerHTML = "0";
        }

        /* societe - etab -> uniquement sur site societe */
        if ( context && context == "societe" ) {

            if ( document.getElementById("recap_etab_nb") ) {

                if ( document.getElementById("recap_etab_nb").innerHTML != "" ) {

                    document.getElementById("recap_etab_nb_recap").innerHTML = document.getElementById("recap_etab_nb").innerHTML;
                    totalSociete = totalSociete + parseInt(document.getElementById("recap_etab_nb").innerHTML);
                } else {

                    document.getElementById("recap_etab_nb_recap").innerHTML = "0";
                }
            } else {

                document.getElementById("recap_etab_nb_recap").innerHTML = "0";
            }
        }

        /* total societes */
        document.getElementById("recap_societe_nb_nav").innerHTML = totalSociete;
        document.getElementById("recap_societe_nb_recap").innerHTML = totalSociete;
        // pluriel
        if ( document.getElementById("recap_societe_nb_nav").innerHTML > 1 ) {

            var pluriel = document.getElementsByClassName("result-societe-pluriel");

            for ( var p = 0; p < pluriel.length; p++) {

                remove_class(pluriel[p], "isHidden");
            }
        }
        //no result
        else if ( document.getElementById("recap_societe_nb_nav").innerHTML == 0 ) {

            add_class(document.getElementById("nav_onglet_societe"), "isDisabled");
            add_class(document.getElementById("recap_societe_nb_details"), "isHidden");
        }

        /* marques -> uniquement sur site societe */
        if ( context && context == "societe" ) {

            if ( document.getElementById("recap_marque_nb") ) {

                if ( document.getElementById("recap_marque_nb").innerHTML != "" ) {

                    document.getElementById("recap_marque_nb_nav").innerHTML = document.getElementById("recap_marque_nb").innerHTML;
                    document.getElementById("recap_marque_nb_recap").innerHTML = document.getElementById("recap_marque_nb").innerHTML;
                } else {

                    document.getElementById("recap_marque_nb_nav").innerHTML = "0";
                    document.getElementById("recap_marque_nb_recap").innerHTML = "0";
                }
                
            } else {

                document.getElementById("recap_marque_nb_nav").innerHTML = "0";
                document.getElementById("recap_marque_nb_recap").innerHTML = "0";
            }
            // pluriel
            if ( document.getElementById("recap_marque_nb_nav").innerHTML > 1 ) {

                var pluriel = document.getElementsByClassName("result-marque-pluriel");

                for ( var p = 0; p < pluriel.length; p++) {

                    remove_class(pluriel[p], "isHidden");
                }
            }
            //no result
            else if ( document.getElementById("recap_marque_nb_nav").innerHTML == 0 ) {

                add_class(document.getElementById("nav_onglet_marque"), "isDisabled");
            }
        }

        /* docs */
        if ( document.getElementById("recap_doc_nb") ) {

            if ( document.getElementById("recap_doc_nb").innerHTML != "" ) {

                document.getElementById("recap_doc_nb_nav").innerHTML = document.getElementById("recap_doc_nb").innerHTML;
                document.getElementById("recap_doc_nb_recap").innerHTML = document.getElementById("recap_doc_nb").innerHTML;
            } else {

                document.getElementById("recap_doc_nb_nav").innerHTML = "0";
                document.getElementById("recap_doc_nb_recap").innerHTML = "0";
            }
            
        } else {

            document.getElementById("recap_doc_nb_nav").innerHTML = "0";
            document.getElementById("recap_doc_nb_recap").innerHTML = "0";
        }
        // pluriel
        if ( document.getElementById("recap_doc_nb_nav").innerHTML > 1 ) {

            var pluriel = document.getElementsByClassName("result-doc-pluriel");

            for ( var p = 0; p < pluriel.length; p++) {

                remove_class(pluriel[p], "isHidden");
            }
        }
        //no result
        else if ( document.getElementById("recap_doc_nb_nav").innerHTML == 0 ) {

            add_class(document.getElementById("nav_onglet_doc"), "isDisabled");
        }
    }

    /* dirigeants */
    if ( document.getElementById("recap_dir_nb") ) {

        if ( document.getElementById("recap_dir_nb").innerHTML != "" ) {

            document.getElementById("recap_dir_nb_nav").innerHTML = document.getElementById("recap_dir_nb").innerHTML;
            document.getElementById("recap_dir_nb_recap").innerHTML = document.getElementById("recap_dir_nb").innerHTML;
        } else {

            document.getElementById("recap_dir_nb_nav").innerHTML = "0";
            document.getElementById("recap_dir_nb_recap").innerHTML = "0";
        }
        
    } else {

        document.getElementById("recap_dir_nb_nav").innerHTML = "0";
        document.getElementById("recap_dir_nb_recap").innerHTML = "0";
    }
    // pluriel
    if ( document.getElementById("recap_dir_nb_nav").innerHTML > 1 ) {

        var pluriel = document.getElementsByClassName("result-dir-pluriel");

        for ( var p = 0; p < pluriel.length; p++) {

            remove_class(pluriel[p], "isHidden");
        }
    }
    //no result
    else if ( document.getElementById("recap_dir_nb_nav").innerHTML == 0 ) {

        add_class(document.getElementById("nav_onglet_dir"), "isDisabled");
    }

    /* ajouter pluriel sur total resultats */
    if ( document.getElementById("recap_total_nb_nav").innerHTML > 1 ) {

        var pluriel = document.getElementsByClassName("result-pluriel");

        for ( var p = 0; p < pluriel.length; p++) {

            remove_class(pluriel[p], "isHidden");
        }
    }
}

/* si plus de 50 resultats -> bloquer la liste detaillee a 50 */
function redirection_results_details(element) {

    var url   = element.getAttribute("data-href"),
        nb    = element.getElementsByClassName("numdisplay")[0].innerHTML.replace("&nbsp;", "");
        param = "";

    if ( nb > 50) {

        param = "&nrpp=50";
    }

    url += param;

    document.location = url;
}

/* afficher infos contexte sur haut page result detailles */
function display_infos_result_detailles() {

    /* seulement sur result detailles */
    if ( document.getElementById("search_details") ) {

        /* verif de quels resultats il s'agit */
        var bloc = document.getElementById("search_details").getElementsByClassName("ResultBloc")[0].getAttribute("data-viewname");

        switch(bloc) {
            case "view-searchdetail-societe" :
                document.getElementById("recap_category_result_name").innerHTML = "société";
                document.getElementById("recap_category_result_verb").innerHTML = "trouvée";
                break;
            case "view-searchdetail-etab" :
                document.getElementById("recap_category_result_name").innerHTML = "établissement";
                document.getElementById("recap_category_result_verb").innerHTML = "trouvé";
                break;
            case "view-searchdetail-marque" :
                document.getElementById("recap_category_result_name").innerHTML = "marque";
                document.getElementById("recap_category_result_verb").innerHTML = "trouvée";
                break;
            case "view-searchdetail-dir" :
                document.getElementById("recap_category_result_name").innerHTML = "dirigeant";
                document.getElementById("recap_category_result_verb").innerHTML = "trouvé";
                break;
            case "view-searchdetail-doc" :
                document.getElementById("recap_category_result_name").innerHTML = "document";
                document.getElementById("recap_category_result_verb").innerHTML = "trouvé";
                break;
        }
    }
}

/* gestion btn afficher plus de resultats */
function display_results() {

    /* sur dirigeant */
    if ( location.href.indexOf("&nrpp=") != -1 ) {

        var url      = location.href,
            urlTable = url.split("&nrpp="),
            total    = document.getElementById("recap_total_nb").innerHTML;

        /* bloquer affichage resultats a 200 */
        if ( total <= 200 ) {

            diff = total - parseInt(urlTable[1]);
        } else {

            diff = 200 - parseInt(urlTable[1]);
        }

        /* afficher btn si encore des resultats a afficher */
        if ( diff > 0 ) {

            if ( diff == 1 ) {

                document.getElementById("search_display_results").getElementsByTagName("a")[0].innerHTML = "Afficher le résultat suivant";
            } else if ( diff > 1 && diff <= 50 ) {

                document.getElementById("search_display_results").getElementsByTagName("a")[0].innerHTML = "Afficher les&nbsp;<span id='recap_total_diff'>" + diff + "</span>&nbsp;résultats suivants";
            } else {

                document.getElementById("search_display_results").getElementsByTagName("a")[0].innerHTML = "Afficher les&nbsp;<span id='recap_total_diff'>50</span>&nbsp;résultat suivant";
            }

            remove_class(document.getElementById("search_display_results"), "isHidden");
        } else {

            add_class(document.getElementById("search_display_results"), "isHidden");
        }
    }

    /* sur societe */
    else {

        /* si autres resultats a afficher */
        if ( document.getElementById("display_results") ) {

            var nb      = document.getElementById("display_results_nb"),
                cible   = document.getElementById("search_details"),
                results = cible.getElementsByClassName("listehidden");

            if ( results.length < 50 ) {

                nb.innerHTML = parseInt(results.length);
            }
        }
    }
}

/* afficher les resultats suivant sur dirigeant */
function display_results_action_dir() {

    if ( location.href.indexOf("&nrpp=") != -1 ) {

        var url      = location.href,
            urlTable = url.split("&nrpp=");

        /* nb resultats affiches */
        if ( document.getElementById("recap_total_diff") ) {

            var nb = parseInt(document.getElementById("recap_total_diff").innerHTML);
        } else {

            var nb = 1;
        }

        /* nvx nb resultats a afficher */
        var nbNew = parseInt(urlTable[1]) + nb;

        document.location = urlTable[0] + "&nrpp=" + nbNew;
    }
}

/* afficher les resultats suivant sur societe */
function display_results_action_soc() {

    var cible   = document.getElementById("search_details"),
        results = cible.getElementsByClassName("listehidden"),
        count   = 0;

    /* combien de resultats caches */
    for ( var r = 0; r < results.length; r++ ) {

        if ( results[r].getAttribute("class").indexOf("isHidden") != -1 ) {

            count++;
        }
    }

    /* si resultats caches */
    if ( count > 0 ) {

        /* cacher le btn si dernier affichage possible */
        if ( count <= 50 ) {

            add_class(document.getElementById("display_results"), "isHidden");
        }

        /* afficher les 50 resultats suivants */
        var limit = 0;

        for ( var r = 0; r < results.length; r++ ) {

            if ( results[r].getAttribute("class").indexOf("isHidden") != -1 && limit < 50 ) {

                remove_class(results[r], "isHidden");

                limit++;
            }
        }

        /* mettre a jour le btn */
        if ( (count - limit) > 50 ) {

            document.getElementById("display_results_nb").innerText = "50";
        } else {

            document.getElementById("display_results_nb").innerText = parseInt((count - limit));
        }
    } 
}

/* col gauche fixe au scroll */
function recap_search_scroll() {

    /* determiner les points de transition */
    var top = 0;
    //societe
    if ( ( document.getElementById("result_deno_societe") || document.getElementById("result_rs_societe") || document.getElementById("result_etab_societe") || document.getElementById("result_dirsoc_societe") ) && document.getElementById("bloc_recap_societe") ) {

        var bloc   = document.getElementsByClassName("bloclist societe"),
            topSoc = 0;

        for ( var b = 0; b < bloc.length; b++) {

            var top = bloc[b].offsetTop;

            /* si on est sur premier bloc societe */
            if ( topSoc == 0 ) {

                var cibleSoc       = document.getElementById("bloc_recap_societe"),
                    cibleSoc       = cibleSoc.getElementsByClassName("bloc__title")[0],
                    cibleSocHeight = cibleSoc.offsetHeight;

                topSoc = top - cibleSocHeight;
            }

            /* si on est sur dernier bloc societe */
            if (b == (bloc.length - 1)) {

                var topLastSoc = top,
                    idLastSoc  = bloc[b].id,
                    endSoc     = topLastSoc + bloc[b].offsetHeight;
            }
        }

        //limite ou recap en position no fixed
        if ( top == 0 || topSoc < top ) {

            top = topSoc;       
        }
    }

    //marques
    if ( document.getElementById("result_marque") && document.getElementById("bloc_recap_marque") ) {

        var cibleMarques       = document.getElementById("bloc_recap_marque"),
            cibleMarques       = cibleMarques.getElementsByClassName("bloc__title")[0],
            cibleMarquesHeight = cibleMarques.offsetHeight,
            topMarques         = document.getElementById("result_marque").offsetTop,
            topMarques         = topMarques - cibleMarquesHeight,//soustraire cibleHeight pour aligner bloc col gauche et bloc col droite
            endMarques         = topMarques + document.getElementById("result_marque").offsetHeight;

        //limite ou recap en position no fixed
        if ( top == 0 || topMarques < top ) {

            top = topMarques;       
        }
    }

    //dirigeants
    if ( document.getElementById("result_dir") && document.getElementById("bloc_recap_dir") ) {

        var cibleDir       = document.getElementById("bloc_recap_dir"),
            cibleDir       = cibleDir.getElementsByClassName("bloc__title")[0],
            cibleDirHeight = cibleDir.offsetHeight,
            topDir         = document.getElementById("result_dir").offsetTop,
            topDir         = topDir - cibleDirHeight,//soustraire cibleHeight pour aligner bloc col gauche et bloc col droite
            endDir         = topDir + document.getElementById("result_dir").offsetHeight;

        //limite ou recap en position no fixed
        if ( top == 0 || topDir < top ) {

            top = topDir;       
        }
    }

    //docs
    if ( document.getElementById("result_doc") && document.getElementById("bloc_recap_doc") ) {

        var cibleDoc       = document.getElementById("bloc_recap_doc"),
            cibleDoc       = cibleDoc.getElementsByClassName("bloc__title")[0],
            cibleDocHeight = cibleDoc.offsetHeight,
            topDoc         = document.getElementById("result_doc").offsetTop,
            topDoc         = topDoc - cibleDocHeight,//soustraire cibleHeight pour aligner bloc col gauche et bloc col droite
            endDoc         = topDoc + document.getElementById("result_doc").offsetHeight;

        //limite ou recap en position no fixed
        if ( top == 0 || topDoc < top ) {

            top = topDoc;       
        }
    }

    /* gestion position blocs recap */
    var scrollFooter = 0;
    var currentScroll = 0;

    add_event(window, "scroll", function() {

        /* verifier les points de transition */
        //societe
        if ( ( document.getElementById("result_deno_societe") || document.getElementById("result_rs_societe") || document.getElementById("result_etab_societe") || document.getElementById("result_dirsoc_societe") ) && document.getElementById("bloc_recap_societe") ) {
            
            var bloc = document.getElementsByClassName("bloclist societe");

            if ( topSoc != ( bloc[0].offsetTop - document.getElementById("bloc_recap_societe").getElementsByClassName("bloc__title")[0].offsetHeight) ) {

                topSoc = (bloc[0].offsetTop - document.getElementById("bloc_recap_societe").getElementsByClassName("bloc__title")[0].offsetHeight);
                topLastSoc = bloc[(bloc.length - 1)].offsetTop
                idLastSoc  = bloc[(bloc.length - 1)].id;
                top = topSoc;
            }
        }

        //marques
        if ( document.getElementById("result_marque") && document.getElementById("bloc_recap_marque") ) {
            
            if ( topMarques != (document.getElementById("result_marque").offsetTop - document.getElementById("bloc_recap_marque").getElementsByClassName("bloc__title")[0].offsetHeight) ) {

                topMarques = (document.getElementById("result_marque").offsetTop - document.getElementById("bloc_recap_marque").getElementsByClassName("bloc__title")[0].offsetHeight);
                endMarques = topMarques + document.getElementById("result_marque").offsetHeight;
                //limite ou recap en position no fixed
                if ( top == 0 || topMarques < top ) {

                    top = topMarques;       
                }
            }
        }

        //dir
        if ( document.getElementById("result_dir") && document.getElementById("bloc_recap_dir") ) {
            
            if ( topDir != (document.getElementById("result_dir").offsetTop - document.getElementById("bloc_recap_dir").getElementsByClassName("bloc__title")[0].offsetHeight) ) {

                topDir = (document.getElementById("result_dir").offsetTop - document.getElementById("bloc_recap_dir").getElementsByClassName("bloc__title")[0].offsetHeight);
                endDir = topDir + document.getElementById("result_dir").offsetHeight;

                //limite ou recap en position no fixed
                if ( top == 0 || topDir < top ) {

                    top = topDir;       
                }
            }
        }

        //doc
        if ( document.getElementById("result_doc") && document.getElementById("bloc_recap_doc") ) {
            
            if ( topDoc != (document.getElementById("result_doc").offsetTop - document.getElementById("bloc_recap_doc").getElementsByClassName("bloc__title")[0].offsetHeight) ) {
  
                topDoc = (document.getElementById("result_doc").offsetTop - document.getElementById("bloc_recap_doc").getElementsByClassName("bloc__title")[0].offsetHeight);
                endDoc = topDoc + document.getElementById("result_doc").offsetHeight;

                //limite ou recap en position no fixed
                if ( top == 0 || topDoc < top ) {

                    top = topDoc;       
                }
            }
        }

        /* position footer */
        var topFooter = document.getElementById("footer").offsetTop - window.innerHeight;

        /* position des blocs recap */
        var blocDoc    = document.getElementById("bloc_recap_doc"),
            blocEnd    = document.getElementById("bloc_recap_end"),
            blocHeight = window.innerHeight - blocDoc.offsetHeight - 37 - 8;

        /* position du scroll */
        var scroll = getY(),
            cible  = document.getElementById("result_search_recap_around"),
            fixed  = false;

        /* fixer col gauche */
        if ( cible.parentNode.getAttribute("class").indexOf("scrollFixed") == -1 ) {

            //societe
            if ( topSoc && scroll >= topSoc ) {

                fixed = true;
            }

            //marques
            if ( topMarques && scroll >= topMarques ) {

                fixed = true;
            }

            //dir
            if ( topDir && scroll >= topDir ) {

                fixed = true;
            }

            //doc
            if ( topDoc && scroll >= topDoc ) {

                fixed = true;
            }

            if ( fixed == true ) {

                add_class(cible.parentNode, "scrollFixed");
                cible.style.height = (window.innerHeight - 8) + "px";
                blocEnd.style.height = blocHeight + "px";
            }
        }
        /* remettre col gauche en position initiale */
        else {

            if ( top && scroll < top ) {

                remove_class(cible.parentNode, "scrollFixed");
                cible.style.height = "";
            }

            else if ( top && scroll > top && scroll < topFooter ) {

                cible.style.height = (window.innerHeight - 8) + "px";
                blocEnd.style.height = blocHeight + "px";
            }

            else if ( scroll >= topFooter ) {

                var diff = topFooter - scroll;

                cible.style.height = ((window.innerHeight - 16) + diff - 16) + "px";
                blocEnd.style.height = (blocHeight + diff - 8) + "px";

                if ( scroll >= (document.getElementById("footer").offsetTop - 32 ) ) {

                    cible.parentNode.style.opacity = "0";
                } else {

                    cible.parentNode.style.opacity = "";
                }
            }
        }

        /* positionner blocs col gauche */
        /* sur dirigeant */
        if ( location.href.indexOf("dirigeant.") != -1 ) {

            var context = "dirigeant";

            /* scroll vers le bas */
            if ( scroll > currentScroll ) {

                /* determiner limite affichage chaque bloc */
                //dir
                if ( topSoc != undefined ) {

                    var limitDir = topSoc;
                } else {

                    if ( topDoc != undefined ) {

                        var limitDir = topDoc;
                    } else {

                        var limitDir = endDir;
                    }
                }
                //societe
                if ( topDoc != undefined ) {

                    var limitSoc = topDoc;
                } else {

                    var limitSoc = endSoc;
                }
                //doc
                if ( topDoc != undefined ) {

                    //var limitDoc = endDoc;
                    var limitDoc = topDoc;
                }

                /* adapter affichage col gauche */
                //dir
                if ( topDir != undefined && scroll >= topDir && scroll < limitDir ) {

                    var bloc = "bloc_recap_dir";
                }
                //societe
                else if ( topSoc != undefined && scroll >= topSoc && scroll < limitSoc ) {

                    var bloc = "bloc_recap_societe";
                }
                //doc
                else if ( topDoc != undefined && scroll >= limitDoc ) {

                    var bloc = "bloc_recap_doc";
                }
            }

            /* scroll vers le haut */
            else {

                /* determiner limite affichage chaque bloc */
                //dir
                if ( topSoc != undefined ) {

                    var limitDir = topSoc + 200;
                } else {

                    if ( topDoc != undefined ) {

                        var limitDir = topDoc + 200;
                    } else {

                        //var limitDir = topDir + document.getElementById("result_dir").offsetHeight;
                    }
                }
                //societe
                if ( topDoc != undefined ) {

                    var limitSoc = topDoc + 200;

                } else {

                    //var limitSoc = topLastSoc + document.getElementById(idLastSoc).offsetHeight;
                }

                /* adapter affichage col gauche */
                //dir
                if ( topDir != undefined && (scroll + window.innerHeight) < limitDir ) {

                    var bloc = "bloc_recap_dir";
                }
                //societe
                else if ( topSoc != undefined && (scroll + window.innerHeight) < limitSoc ) {

                    var bloc = "bloc_recap_societe";
                }
            }

            if ( bloc ) {
                recapbloc_search_scroll(bloc, context);
            }
        }
        /* sur societe */
        else {

            var context = "société";

            /* scroll vers le bas */
            if ( scroll > currentScroll ) {

                /* determiner limite affichage chaque bloc */
                //societe
                if ( topMarques != undefined ) {

                    var limitSoc = topMarques;
                } else {

                    if ( topDir != undefined ) {

                        var limitSoc = topDir;
                    } else {

                        if ( topDoc != undefined ) {

                            var limitSoc = topDoc;
                        } else {

                            var limitSoc = topSoc;
                        }
                    }
                }
                //marques
                if ( topDir != undefined ) {

                    var limitMarques = topDir;
                } else {

                    if ( topDoc != undefined ) {

                        var limitMarques = topDoc;
                    } else {

                        var limitMarques = endMarques;
                    }
                }
                //dir
                if ( topDoc != undefined ) {

                    var limitDir = topDoc;
                } else {

                    var limitDir = endDir;
                }

                //doc
                if ( topDoc != undefined ) {

                    //var limitDoc = endDoc;
                    var limitDoc = topDoc;
                } else {

                }

                /* adapter affichage col gauche */
                //societe
                if ( topSoc != undefined && (scroll >= topSoc) && (scroll < limitSoc) ) {

                        var bloc = "bloc_recap_societe";

                }

                //marques
                else if ( topMarques!= undefined && (scroll >= topMarques) && (scroll < limitMarques) ) {

                        var bloc = "bloc_recap_marque";

                }

                //dir
                else if ( topDir != undefined && (scroll >= topDir) && (scroll < limitDir) ) {

                        var bloc = "bloc_recap_dir";

                }

                //doc
                else if ( topDoc != undefined && (scroll >= limitDoc) ) {

                        var bloc = "bloc_recap_doc";

                }
            }
            /* scroll vers le haut */
            else {

                /* determiner limite affichage chaque bloc */
                //societe
                if ( topMarques != undefined ) {

                    var limitSoc = topMarques + 200;
                } else {

                    if ( topDir != undefined ) {

                        var limitSoc = topDir + 200;
                    } else {

                        if ( topDoc != undefined ) {

                            var limitSoc = topDoc + 200;

                        } else {

                            //var limitSoc = topLastSoc + document.getElementById(idLastSoc).offsetHeight;
                        }
                    }
                }
                //marques
                if ( topDir != undefined ) {

                    var limitMarques = topDir + 200;
                } else {

                    if ( topDoc != undefined ) {

                        var limitMarques = topDoc + 200;
                    } else {

                        //var limitMarques = topMarques + document.getElementById("result_marque").offsetHeight;
                    }
                }
                //dir
                if ( topDoc != undefined ) {

                    var limitDir = topDoc + 200;
                } else {

                    //var limitDir = topDir + document.getElementById("result_dir").offsetHeight;
                }

                /* adapter affichage col gauche */
                //societe
                if ( topSoc != undefined && ((scroll + window.innerHeight) < limitSoc) ) {

                    var bloc = "bloc_recap_societe";
                }

                //marques
                else if ( topMarques != undefined && ((scroll + window.innerHeight) < limitMarques) ) {

                    var bloc = "bloc_recap_marque";
                }

                //dir
                else if ( topDir != undefined && ((scroll + window.innerHeight) < limitDir) ) {

                    var bloc = "bloc_recap_dir";
                }
            }

            if ( bloc ) {
                recapbloc_search_scroll(bloc, context);
            }
        }

        /* mise a jour direction du scroll */
        currentScroll = scroll;
    });
}

/* modifier position bloc col gauche selon scroll col droite */
function recapbloc_search_scroll(id, context) {

    var cible = document.getElementById("bloc_recap_end");

    /* sur dirigeant */
    if ( context && context == "dirigeant" ) {

        var recap      = document.getElementById("result_search_recap_around"),
            blocSoc    = document.getElementById("bloc_recap_societe"),
            blocDir    = document.getElementById("bloc_recap_dir"),
            blocDoc    = document.getElementById("bloc_recap_doc"),
            blocEnd    = document.getElementById("bloc_recap_end"),
            topSoc     = blocSoc.offsetTop,
            topDir     = blocDir.offsetTop,
            topDoc     = blocDoc.offsetTop;

        switch(id) {
            case "bloc_recap_dir":
                recap.scrollTop = 0;
                break;
            case "bloc_recap_societe":
                recap.scrollTop = topSoc - 13;
                break;
            case "bloc_recap_doc":
                recap.scrollTop = topDoc - 13;
                break;
        }
    }
    /* sur societe */
    else {

        var recap      = document.getElementById("result_search_recap_around"),
            blocSoc    = document.getElementById("bloc_recap_societe"),
            blocMarque = document.getElementById("bloc_recap_marque"),
            blocDir    = document.getElementById("bloc_recap_dir"),
            blocDoc    = document.getElementById("bloc_recap_doc"),
            blocEnd    = document.getElementById("bloc_recap_end"),
            topSoc     = blocSoc.offsetTop,
            topMarque  = blocMarque.offsetTop,
            topDir     = blocDir.offsetTop,
            topDoc     = blocDoc.offsetTop;

        switch(id) {
            case "bloc_recap_societe":
                recap.scrollTop = 0;
                break;
            case "bloc_recap_marque":
                recap.scrollTop = topMarque - 13;
                break;
            case "bloc_recap_dir":
                recap.scrollTop = topDir - 13;
                break;
            case "bloc_recap_doc":
                recap.scrollTop = topDoc - 13;
                break;
        }
    }
}

/* onclick sur icono copier */
function copy_info_bo(element) {

    /* passer le picto en vert */
    add_class(element.getElementsByTagName("a")[0], "active");

    /* copier contenu input dans presse papier */
    element.getElementsByTagName("input")[0].select();
    document.execCommand("copy");

    /* repasser le picto en gris */
    setTimeout(function() {

        remove_class(element.getElementsByTagName("a")[0], "active");

    }, 2000);

    event.stopPropagation();
}

/* hover bloc recherche */
function mouseon_block_search(element, context) {


    if ( context && context == "first" ) {

        add_class(element.parentNode, "hover");
    } else if ( context && context == "second" ) {

        add_class(element.parentNode.parentNode, "hover");
    }
    
}

function mouseout_block_search(element, context) {

    if ( context && context == "first" ) {

        remove_class(element.parentNode, "hover");
    } else if ( context && context == "second" ) {

        remove_class(element.parentNode.parentNode, "hover");
    }
    
}
function display_all_compteshop() {
    var compte = document.getElementById('compteshoptable');
    var index = 0;

    if (compte) {
        var tab = compte.getElementsByTagName("tr");
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == "compteshopplus") {
                index = i;
            }
            remove_class(tab[i], "isInvisible");
        }

        compte.deleteRow(index);
        panrefresh();
    }
}

function display_all_compteshopfree() {
    var compte = document.getElementById('compteshopfreetable');
    var index = 0;

    if (compte) {
        var tab = compte.getElementsByTagName("tr");
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == "compteshopfreeplus") {
                index = i;
            }
            remove_class(tab[i], "isInvisible");
        }

        compte.deleteRow(index);
        panrefresh();
    }
}

function display_all_eventshop() {
    var eventshop = document.getElementById('eventshoptable');
    var index = 0;

    if (eventshop) {
        var tab = eventshop.getElementsByTagName("tr");
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == "eventshopplus") {
                index = i;
            }
            remove_class(tab[i], "isInvisible");
        }

        eventshop.deleteRow(index);
        panrefresh();
    }
}

function display_all_eventshopfree() {
    var eventshop = document.getElementById('eventshopfreetable');
    var index = 0;

    if (eventshop) {
        var tab = eventshop.getElementsByTagName("tr");
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == "eventshopfreeplus") {
                index = i;
            }
            remove_class(tab[i], "isInvisible");
        }

        eventshop.deleteRow(index);
        panrefresh();
    }
}

function display_all_bilanshop() {
    var bilan = document.getElementById('bilanshoptable');
    var index = 0;

    if (bilan) {
        var tab = bilan.getElementsByTagName("tr");
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == "bilanshopplus") {
                index = i;
            }
            remove_class(tab[i], "isInvisible");
        }

        bilan.deleteRow(index);
        panrefresh();
    }
}

function init_readMore_shop() {
    
    if (window.matchMedia("(min-width: 768px)").matches) {
        return;
    } else if (window.matchMedia("(min-width: 580px)").matches) {
        var readJsInstance = readJs_Initialize({ 
            "maximumLengthOfText": 120,
            "useStyledContainers": false
        });
    } else {
        var readJsInstance = readJs_Initialize({
            "maximumLengthOfText": 92,
            "useStyledContainers": false
        });
    }
}/* =========== GESTION FORMATAGE DES NOMBRES ================ */

function init_stats() {
    var staff = document.getElementsByClassName('numdisplay');

    if(staff) {
        for(var i = 0; i < staff.length; i++) {
            if(staff[i].textContent === '-1') {
                staff[i].textContent = 'NC';
            }
        }
    }

    display_num(document.getElementById('container'));
    set_rank_display();
    set_rank_medals();
}

/* =========== GESTION SELECTION ANNEE ================ */

function fetch_year_data(e) {
    var request,
        siren = e.getAttribute('data-rncs'),
        year = e.value,
        type = e.getAttribute('data-type'),
        typeLower = type.toLowerCase(),
        jsonURL = '/cgi-bin/classement-ajax?rncs=' +siren+ '&year=' +year+ '&type=' +typeLower+ '';

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request.overrideMimeType) {
            request.overrideMimeType("text/html");
        }      
    } else {
        if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre browser ne supporte pas AJAX");
                }
            }   
        }
    }
    if (request && request.readyState != 0){
        request.abort();
    }

    request.open('GET', jsonURL, true);
    request.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    request.send();

    var animFadeTargets = document.getElementsByClassName('refresh-anim-' +type),
        animBlinkTargets = document.getElementsByClassName('refresh-blink-' +type);

    for(var i = 0; i < animBlinkTargets.length; i++) {
        animBlinkTargets[i].classList.remove('blinker-anim');
    }

    for(var i = 0; i < animFadeTargets.length; i++) {
        animFadeTargets[i].classList.add('opacity-off');
    }

    request.onreadystatechange = setTimeout(function() {
        var dataUpdateText = request.response,
            dataUpdate = JSON.parse(dataUpdateText);
        
        switch(typeLower) {
            case 'ca':
                var rankingType = 'CA';
                break;
            case 'rex':
                var rankingType = 'REX';
                break;
        }

        var total = document.getElementById(rankingType+ '-total'),
            medianApeCountry = document.getElementById(rankingType+ '-median-ape-country'),
            medianApeRegion = document.getElementById(rankingType+ '-median-ape-region'),
            rankApeCountry = document.getElementById('rank-' +rankingType+ '-ape-country'),
            partApeCountry = document.getElementById('part-' +rankingType+ '-ape-country'),
            totalApeCountry = document.getElementById('total-' +rankingType+ '-ape-country'),
            rankApeRegion = document.getElementById('rank-' +rankingType+ '-ape-region'),
            partApeRegion = document.getElementById('part-' +rankingType+ '-ape-region'),
            totalApeRegion = document.getElementById('total-' +rankingType+ '-ape-region'),
            medianAllCountry = document.getElementById(rankingType+ '-median-all-country'),
            medianAllRegion = document.getElementById(rankingType+ '-median-all-region'),
            rankAllCountry = document.getElementById('rank-' +rankingType+ '-all-country'),
            partAllCountry = document.getElementById('part-' +rankingType+ '-all-country'),
            totalAllCountry = document.getElementById('total-' +rankingType+ '-all-country'),
            rankAllRegion = document.getElementById('rank-' +rankingType+ '-all-region'),
            partAllRegion = document.getElementById('part-' +rankingType+ '-all-region'),
            totalAllRegion = document.getElementById('total-' +rankingType+ '-all-region'),
            rankYear = document.getElementsByClassName('year-' +rankingType),
            trophyCountry = document.getElementById('trophy-' +rankingType+ '-country'),
            trophyRegion = document.getElementById('trophy-' +rankingType+ '-region'),
            statusCountry = document.getElementById('status-' +rankingType+ '-country'),
            statusRegion = document.getElementById('status-' +rankingType+ '-region');

        total.textContent = dataUpdate['value_top'];
        total.setAttribute('data-chiffre', dataUpdate['value_top']);

        medianApeCountry.textContent = dataUpdate['median_ape2'];
        medianApeCountry.setAttribute('data-chiffre', dataUpdate['median_ape2']);

        rankApeCountry.textContent = dataUpdate['classement_ape2'];
        rankApeCountry.setAttribute('data-chiffre', dataUpdate['classement_ape2']);

        partApeCountry.textContent = ' ' + dataUpdate['classement_ape2_part'];

        totalApeCountry.textContent = dataUpdate['total_ape2_classement'];
        totalApeCountry.setAttribute('data-chiffre', dataUpdate['total_ape2_classement']);

        medianApeRegion.textContent = dataUpdate['median_ape2xregion'];
        medianApeRegion.setAttribute('data-chiffre', dataUpdate['median_ape2xregion']);

        rankApeRegion.textContent = dataUpdate['classement_ape2xregion'];
        rankApeRegion.setAttribute('data-chiffre', dataUpdate['classement_ape2xregion']);

        partApeRegion.textContent = ' ' + dataUpdate['classement_ape2xregion_part'];

        totalApeRegion.textContent = dataUpdate['total_ape2xregion_classement'];
        totalApeRegion.setAttribute('data-chiffre', 'total_ape2xregion_classement');

        medianAllCountry.textContent = dataUpdate['median_france'];
        medianAllCountry.setAttribute('data-chiffre', dataUpdate['median_france']);

        rankAllCountry.textContent = dataUpdate['classement_france'];
        rankAllCountry.setAttribute('data-chiffre', dataUpdate['classement_frances']);

        partAllCountry.textContent = ' ' + dataUpdate['classement_france_part'];

        totalAllCountry.textContent = dataUpdate['total_classement_france'];
        totalAllCountry.setAttribute('data-chiffre', dataUpdate['total_classement_france']);

        medianAllRegion.textContent = dataUpdate['median_region'];
        medianAllRegion.setAttribute('data-chiffre', dataUpdate['median_region']);

        rankAllRegion.textContent = dataUpdate['classement_region'];
        rankAllRegion.setAttribute('data-chiffre', dataUpdate['classement_region']);

        partAllRegion.textContent = ' ' + dataUpdate['classement_region_part'];

        totalAllRegion.textContent = dataUpdate['total_classement_region'];
        totalAllRegion.setAttribute('data-chiffre', dataUpdate['total_classement_region']);

        for(var i = 0; i < rankYear.length; i++) {
            rankYear[i].textContent = dataUpdate['previous_year'];
        }

        trophyCountry.className = 'i-trophy i-trophy';
        trophyRegion.className = 'i-trophy i-trophy';
        statusCountry.className = 'rank-status';
        statusRegion.className = 'rank-status';

        if((dataUpdate['classement_ape2_arrow'] == undefined) && (dataUpdate['classement_ape2xregion_arrow'] == undefined)) {
            return;
        } else {
            trophyCountry.classList.add(dataUpdate['classement_ape2_arrow']);
            statusCountry.classList.add(dataUpdate['classement_ape2_arrow']);
            trophyRegion.classList.add(dataUpdate['classement_ape2xregion_arrow']);
            statusRegion.classList.add(dataUpdate['classement_ape2xregion_arrow']);
        }
    }, 400);

    var displayRankingsLoop = setInterval(init_stats, 100);

    setTimeout(function(){
        clearInterval(displayRankingsLoop);
    }, 1000);

    setTimeout(function(){
        for(var i = 0; i < animFadeTargets.length; i++) {
            animFadeTargets[i].classList.remove('opacity-off');
        }

        for(var i = 0; i < animBlinkTargets.length; i++) {
            animBlinkTargets[i].classList.add('blinker-anim');
        }
    }, 800);
 }

/* =========== GESTION CHOIX ANNEES STATS ========= */

function refresh_data(year) {
    var url = window.location.href;
        redirection = url.substring(0, url.length - 9);

    redirection += year + '.html';

    document.location.href = redirection;
}

/* =========== GESTION CLASSEMENTS ================ */

function set_rank_display() {
    var rankElt = document.getElementsByClassName('rank'),
        rankNumber = document.getElementsByClassName('rank-number');

    for(var i = 0; i < rankElt.length; i++) {
        if(rankNumber[i].textContent.length >= 5) {
            rankElt[i].style.paddingLeft = '0';
        }
    }
}

function set_rank_medals() {
    var rank = document.getElementsByClassName('rank'),
        rankNumber = document.getElementsByClassName('rank-number'),
        rankStatus = document.getElementsByClassName('rank-status'),
        rankTrophy = document.getElementsByClassName('i-trophy'),
        rankTag = document.getElementsByClassName('progress-tag');

    for(var i = 0; i < rank.length; i++) {
        switch(rankNumber[i].textContent) {
            case '1':
                rank[i].className = 'rank gold';
                rankStatus[i].className = 'rank-status gold';
                rankTrophy[i].className = 'i-trophy i-trophy-1';
                rankStatus[i].style.paddingTop = '12px';
                rankTag[i].textContent = 'Leader';
                break;
            case '2':
                rankTag[i].innerHTML = '<i class="i-arrow"></i><span class="progress ft-bold"></span>';

                rank[i].className = 'rank silver';

                if(!(rankStatus[i].classList.contains('up')) && !(rankStatus[i].classList.contains('down'))) {
                    rankStatus[i].className = 'rank-status silver';
                    rankStatus[i].style.paddingTop = '12px';
                }
                if(rankStatus[i].classList.contains('up')) {
                    rankStatus[i].className = 'rank-status up silver';
                    rankStatus[i].style.paddingTop = '5px';
                }
                if(rankStatus[i].classList.contains('down')) {
                    rankStatus[i].className = 'rank-status down silver';
                    rankStatus[i].style.paddingTop = '5px';
                }

                rankTrophy[i].className = 'i-trophy i-trophy-2';
                break;
            case '3':
                rankTag[i].innerHTML = '<i class="i-arrow"></i><span class="progress ft-bold"></span>';

                rank[i].className = 'rank bronze';

                if(!(rankStatus[i].classList.contains('up')) && !(rankStatus[i].classList.contains('down'))) {
                    rankStatus[i].className = 'rank-status bronze';
                    rankStatus[i].style.paddingTop = '12px';
                }
                if(rankStatus[i].classList.contains('up')) {
                    rankStatus[i].className = 'rank-status up bronze';
                    rankStatus[i].style.paddingTop = '5px';
                }
                if(rankStatus[i].classList.contains('down')) {
                    rankStatus[i].className = 'rank-status down bronze';
                    rankStatus[i].style.paddingTop = '5px';
                }

                rankTrophy[i].className = 'i-trophy i-trophy-3';
                break;
            default :
                rankTag[i].innerHTML = '<i class="i-arrow"></i><span class="progress ft-bold"></span>';

                rank[i].className = 'rank';

                rankNumber[i].className = 'numdisplay bold rank-number';

                if(!(rankStatus[i].classList.contains('up')) && !(rankStatus[i].classList.contains('down'))) {
                    rankStatus[i].className = 'rank-status';
                    rankStatus[i].style.paddingTop = '12px';
                }
                if(rankStatus[i].classList.contains('up')) {
                    rankStatus[i].className = 'rank-status up';
                    rankStatus[i].style.paddingTop = '5px';
                }
                if(rankStatus[i].classList.contains('down')) {
                    rankStatus[i].className = 'rank-status down';
                    rankStatus[i].style.paddingTop = '5px';
                }

                if(!(rankTrophy[i].classList.contains('up')) && !(rankTrophy[i].classList.contains('down'))) {
                    rankTrophy[i].className = 'i-trophy i-trophy';
                }
                if(rankTrophy[i].classList.contains('up')) {
                    rankTrophy[i].className = 'i-trophy i-trophy up';
                    rankStatus[i].style.paddingTop = '5px';
                }
                if(rankTrophy[i].classList.contains('down')) {
                    rankTrophy[i].className = 'i-trophy i-trophy down';
                    rankStatus[i].style.paddingTop = '5px';
                }
                break;
        }
    }
}

/* =========== GESTION BARRES STATISTIQUES ================ */

function fill_stat_bars() {
    var barElts = document.getElementsByClassName('Stat__bar__front');

    for(var i = 0; i < barElts.length; i++) {
        var barLength = barElts[i].textContent;

        barElts[i].style.width = barLength.replace(',', '.');
    }
}

/* =========== GESTION LONGUE DENOMINATION ============== */

function max_name_length() {
    var denoQuart = document.getElementsByClassName('deno-quart');

    for(var i = 0; i < denoQuart.length; i++) {
        var denoQuartStrLength = denoQuart[i].textContent.length;

        if(denoQuartStrLength > 23) {
            var maxQuart;

            if(is_desktop_device()) {
                maxQuart = denoQuart[i].textContent.slice(0,20);
                denoQuart[i].style.fontSize = '.8125rem';
            } else {
                maxQuart = denoQuart[i].textContent.slice(0,16);
            }

            maxQuart += '...';
            denoQuart[i].textContent = maxQuart;
        } else {
            if(denoQuartStrLength > 16 && denoQuartStrLength <= 23 && is_desktop_device()) {
                denoQuart[i].style.fontSize = '.8125rem';
            }
        }
    }
}

/* =========== INITIALISATION QUARTILES ============== */

function init_quartiles() {
    fill_stat_bars();
    max_name_length();
}

/* =========== GESTION DONUT PARITE ================ */

function radian(degrees) {
    return degrees * Math.PI / 180;
}

function get_x_pos(percent) {
    var splitAngle = 360 * (percent / 100);

    return 25 * (Math.cos(radian(splitAngle))) + 25;
}

function get_y_pos(percent) {
    var splitAngle = 360 * (percent / 100);

    return 25 * (Math.sin(radian(splitAngle))) + 25;
}

function set_split_pos(percent) {
    if(percent > 100) {
        return;
    }

    var splitElt = document.getElementById('donut-split');

    if(isNaN(percent)) {
        splitElt.setAttribute('x2', 0);
        splitElt.setAttribute('y2', 25);
        return;
    }

    splitElt.setAttribute('x2', get_x_pos(percent));
    splitElt.setAttribute('y2', get_y_pos(percent));
}

function set_segment_pos(percent) {
    if(percent > 100) {
        return;
    }

    var segmentElt = document.getElementById('donut-segment');

    segmentElt.setAttribute('stroke-dasharray', percent + ' ' + (100 - percent));
}

function create_donut() {
    var percentWomen = document.getElementById('woman-percent');
    percentWomen = percentWomen.textContent.replace('%', '');

    var percentMen = document.getElementById('man-percent');
    percentMen = percentMen.textContent.replace('%', '');

    if(percentWomen == 0 && percentMen == 0 || isNaN(percentMen) || isNaN(percentWomen)) {
        var donutSegment = document.getElementById('donut-segment'),
            donutBase    = document.getElementById('donut-base'),
            donutSplit   = document.getElementById('donut-split');
        var statPercent  = document.getElementsByClassName('Stat__percent');

        for(var i = 0; i < statPercent.length; i++) {
            statPercent[i].style.color = '#DDDDDD';
        }

        donutBase.setAttribute('stroke', '#EBECED');
        donutSegment.setAttribute('stroke', '#EBECED');
    }

    set_segment_pos(percentWomen);
    set_split_pos(percentWomen);
}

/* =========== GESTION BARRES PARITE ================ */

function create_parity_bar() {
    var tagMan = document.getElementsByClassName('Stat__tag man'),
        tagWoman = document.getElementsByClassName('Stat__tag woman'),
        barMan = document.getElementsByClassName('Stat__parityBar man'),
        barWoman = document.getElementsByClassName('Stat__parityBar woman');

    for(var i = 0; i < tagMan.length; i++) {
        var percentMan = tagMan[i].textContent.replace(',', '.'),
            percentWoman = tagWoman[i].textContent.replace(',', '.'),
            valueMan = percentMan.replace('%', ''),
            valueWoman = percentWoman.replace('%', '');

        barMan[i].style.width = percentMan;
        barWoman[i].style.width = percentWoman;

        if(valueMan > 50) {
            tagWoman[i].classList.remove('big');

            if(valueMan == 100) {
                tagWoman[i].classList.add('isInvisible');
                barMan[i].style.borderTopRightRadius = '8px';
                barMan[i].style.borderBottomRightRadius = '8px';
            }

            tagMan[i].style.marginLeft = valueMan * 0.023 + 'rem';
        } else {
            if(valueMan != 50) {
                tagMan[i].classList.remove('big');

                if(valueWoman == 100) {
                    tagMan[i].classList.add('isInvisible');
                    barWoman[i].style.borderTopLeftRadius = '8px';
                    barWoman[i].style.borderBottomLeftRadius = '8px';
                }

                tagWoman[i].style.marginRight = valueWoman * 0.023 + 'rem';
            }
        }
    }
}/* FONCTIONS DU SYSTEME DE NOTIFICATION "TOASTER" */
function toast_all(list) {
    var listNotif = document.getElementById(list),
        listItems = listNotif.getElementsByTagName('li');

    for(var i = 0; i < listItems.length; i++) {
        listItems[i].classList.toggle('open');
        dismiss_notif_timer("item-" + (parseInt(i) + 1), 5000);
    }
}

function toast_it(item) {
    var listItem = document.getElementById(item);

    listItem.classList.toggle('open');
    dismiss_notif_timer(item, 5000);
}

function dismiss_notif(item) {
    var item = document.getElementById(item);

    if(detect_version_IE() == "nav-ie10" || detect_version_IE() == "nav-ie11") {
        var parent = item.parentNode;

        item.classList.remove('open');
        setTimeout(function(){
            parent.removeChild(item);
        }, 400);
    } else {
        if(item) {
            item.classList.remove('open');
            setTimeout(function(){
                item.remove();
            }, 400);
        }
    }
}

function dismiss_notif_timer(id, timer) {
    setTimeout(function() {
        dismiss_notif(id);
    }, timer);
}

function toast_notif_list(list, item, data) {
    var notifList = document.getElementById(list),
        notifItem = document.getElementById(item),
        json      = data,
        notifItemHtml = notifItem.innerHTML,
        notifListHtml = "",
        i = 1;

    for (var key in json) {
        if(json[key] === 'error') {
            open_popup_message('Une erreur est survenue', json[key]['error'], 'red');
        } else {
            notifListHtml += notifItemHtml.replace(/{{id}}/g, i)
                                          .replace(/{{message}}/g, json[key])
                                          .replace(/{{icon}}/g, 'i-check');
        }

        i++;
    }

    notifList.innerHTML = notifListHtml;

    var loop = 0;
    var checkExist = setInterval(function() {
        loop++;
        if(document.getElementById(list).hasChildNodes()) {
            toast_all(list);
            clearInterval(checkExist);
        }

        if(loop > 5) {
            clearInterval(checkExist);
        }
    }, 250);
}

function add_to_toast_notif_list(list, item, data) {
    var notifList      = document.getElementById(list),
        notifItem      = document.getElementById(item),
        json           = data,
        listItemLength = notifList.getElementsByTagName('li').length;

    var notifItemHtml = notifItem.innerHTML,
        notifListHtml = "";

    var i = 1;

    for (var key in json) {
        if(json[key] === 'error') {
            open_popup_message('Une erreur est survenue', json[key]['error'], 'red');
        } else {
            notifListHtml += notifItemHtml.replace(/{{id}}/g, (parseInt(i) + listItemLength))
                                          .replace(/{{message}}/g, json[key])
                                          .replace(/{{icon}}/g, 'i-check');
        }

        i++;
    }

    var newListLength = listItemLength + i;

    notifList.insertAdjacentHTML('beforeend', notifListHtml);

    var loop = 0;
    var checkExist = setInterval(function() {
        if(document.getElementById(list).hasChildNodes()) {
            for(var i = listItemLength; i < newListLength; i++ ) {
                toast_it("item-" + (parseInt(i) + listItemLength - 1));
            }
            clearInterval(checkExist);
        }
        if(loop > 5) {
            clearInterval(checkExist);
        }
    }, 250);
}

function check_json_response(response) {
    var json          = response,
        notifList     = document.getElementById('notif_list'),
        notifListItem = notifList.getElementsByTagName('li');

    close_popup(empty_popup);

    if(notifListItem.length != 0) {
        add_to_toast_notif_list('notif_list', 'notif_item_template', json);
    } else {
        toast_notif_list('notif_list', 'notif_item_template', json);
    }
}
// FONCTION DE TRI D'UN JSON PAR DEUX CRITERES
var sort_by = function() {
    var fields = [].slice.call(arguments),
        n_fields = fields.length;

    return function(A, B) {
        var a, b, field, key, primer, reverse, result;
        for (var i = 0, l = n_fields; i < l; i++) {
            result = 0;
            field = fields[i];

            key = typeof field === 'string' ? field : field.name;

            a = A[key];
            b = B[key];

            if (typeof field.primer !== 'undefined') {
                a = field.primer(a);
                b = field.primer(b);
            }

            reverse = (field.reverse) ? -1 : 1;

            if (a < b) result = reverse * -1;
            if (a > b) result = reverse * 1;
            if (result !== 0) break;
        }
        return result;
    }
}

function parentHasId(node, idlist) {
    if (!node) {
        return(null);
    }

    if (node.id) {
        for (var i = 0 ; i < idlist.length; i++) {
            if (node.id == idlist[i]) {
                return(node.id);
            }
        }
    } else {
        return parentHasId(node.parentNode, idlist);
    }
}

/* Ajout classe specifique si device pas tactile */
function device_without_touch() {

    if ( !is_touch_device() ) {

        var body = document.getElementById("documentbody");
        
        add_class(body, "no-touch");   
    } 
}/******************** VIEW_CARTO ************************/
/********************************************************/
var infos = document.getElementById('infos');
var infost;

function infoshow(delaysec) {
    if (infos) {
        infos.style.visibility = 'visible';
        clearTimeout(infost);
        if (delaysec) {
            infost = setTimeout("javascript:infos.style.visibility='hidden';", delaysec * 1000);
        }
    }
}

function infohide() {
    if (infos) {
        infos.style.visibility = 'hidden';
        clearTimeout(infost);
    }
}

/* Fonction permettant de gerer l'affichage de la carto */
var ratio_phone = 3/2;
var ratio_tablet = 4/3;
var ratio_desktop = 7/5;

function ratio_device() {
    if (is_phone_device()) {
        return (ratio_phone);
    } else if (is_tablet_device()) {
        return (ratio_tablet);
    }

    return (ratio_desktop);
}

function link_carto(param, xsize, ysize, ext) {
    if (!param) {
        return "";
    }

    var link = "/cgi-bin/cartoc?param=" + param + "&format=";
    /* Cas ie8 - */
    if (document.all && !document.addEventListener) {
        link += "vml";
    } else {
        link += "svg";
    }

    link += "&xsize=" + xsize + "&ysize=" + ysize;

    return (link);
}

function xsize_carto(ext) {

    var xsize = 0;

    /* avec un bloc identite */
    if (!ext && document.getElementById('company_identity')) {

        var obj = document.getElementById('company_identity');

        xsize = get_width(obj);

        /* sur carto societe */
        if (!document.getElementById('identitedir')) {

            if (is_desktop_device()) {

                if (window.innerWidth < 1280) {
                    xsize -= 360; /* enlever colonne droite */
                } else {
                    xsize -= 610; /* enlever colonne droite et menu gauche */
                }
            } else {
                xsize -= 50;
            }
        }
        /* sur carto dirigeant */
        else {

            if (is_desktop_device()) {
                xsize -= 350; /* enlever colonne droite */
            } else {
                xsize -= 50;
            }
        }
    }
    else if (!ext && !document.getElementById('company_identity')) {
        var obj = document.getElementById('identite');
        if (!obj) {
            obj = document.getElementById('identitedir');
        }
         xsize = get_width(obj);

         if (is_desktop_device()) {
            xsize -= 350;
        } else {
            xsize -= 50;
        }
    }
    else {
        xsize = get_width(document.getElementById('headercartoext'));

        if (is_desktop_device()) {
            xsize -= 350;
        } else {
            xsize -= 50;
        }
    }

    /* Cas ie8 - */
    if (isNaN(xsize) || (document.all && !document.addEventListener)) {
        xsize = 998;
    }

    xsize = Math.round(xsize);

    return (xsize);
}

function ysize_carto(xsize) {
    var ysize = Math.round(xsize * ratio_device());

    return (ysize);
}

function build_carto(param, ext) {
    if (!param) {
        return ("");
    }

    var xsize = xsize_carto(ext);
    var ysize = ysize_carto(xsize);
    var link = link_carto(param, xsize, ysize, ext);

    if (is_societe()) {
        link += "&isficheentreprise=1";
    }

    if (document.all && !document.addEventListener) {
        var carto = "<iframe src='" + link + "' ";
        carto += "frameborder='0'";
        carto += "id='theframe' ";
        carto += "type='text/html' ";
        carto += "width='" + xsize + "' ";
        carto += "height='" + ysize + "' ";
        carto += "></iframe>";

        return (carto);
    } else {
        var carto = "<object data='" + link + "' ";
        carto += "type='image/svg+xml' ";
        carto += "id='theframe' ";
        carto += "width='" + xsize + "' ";
        carto += "height='" + ysize + "' ";
        carto += "></object>";

        return (carto);
    }

}

function add_carto(param) {

    if (param) {
       var carto = build_carto(param, 0);
        document.getElementById('cartosvgnoext').innerHTML = carto;
    }

    if (document.addEventListener) { /* ie 8+ */
        add_event(window, "resize", function(){resize_carto(param, 0);});
    }
}

function resize_carto(param, ext) {
    var frame = document.getElementById("theframe");

    if (frame && param) {
        var xsize = xsize_carto(ext);
        var ysize = ysize_carto(xsize);
        var link = link_carto(param, xsize, ysize);

        if (is_societe()) {
            link += "&isficheentreprise=1";
        }

        /* on teste si ie8- */
//            frame.setAttribute("src", link);
//        } else {
            frame.setAttribute("data", link);
//        }

        frame.width = xsize;
        frame.height = ysize;
    }
}

function add_carto_ext(param) {

    if (param) {
        var carto = build_carto(param, 1);
        document.getElementById('cartosvgext').innerHTML = carto;

        if (document.addEventListener) { /* ie 8+ */
            add_event(window, "resize", function(){resize_carto(param, 1);});
        }
    }
}

/* Decoupe /minicarto/356000000/x/y */
function extract_carto_x(url) {
    var tab;
    var x = 0;

    if (url) {
        tab = url.split('/');

        if (tab.length < 5) {
            return (0);
        }

        x = parseInt(tab[tab.length - 2]);
    }

    return (x);
}

function extract_carto_y(url) {
    var tab;
    var y;

    if (url) {
        tab = url.split('/');

        if (tab.length < 5) {
            return (0);
        }

        y = parseInt(tab[tab.length - 1]);
    }

    return (y);
}

/* On est oblige a cause du parametre a envoyer */
function init_carto() {
    event_input('pident', "mot de p");
}

/* fonctionnement nouveau design page carto*/
function init_avantages_carto() {

    height_avantages_carto();
    smooth_effect();
}

/* calcul hauteur bloc avec bg en degrade */
function height_avantages_carto() {

    var avantageAround = document.getElementById("avantages_carto");
    var avantage       = document.getElementById("avantages_carto_intro");
    var degrade        = document.getElementById("degrade");

    avantage.style.height = degrade.offsetHeight + "px";

    /* bloquer hauteur bloc parent su Dirigeant */
    if ( document.getElementById("avantages_carto_dirigeant" ) ) {
        avantageAround.style.height = degrade.offsetHeight + "px";
    }

    add_event(window, "resize", function(){

        /* ne resizer le bloc que sur Dirigeant et s'il n'est pas deja ouvert */
        if ( document.getElementById("avantages_carto_dirigeant" ) && avantageAround.getAttribute("class").indexOf("open") == -1 ) {

            avantageAround.style.height = degrade.offsetHeight + "px";
        }
        avantage.style.height = degrade.offsetHeight + "px";
    });
}

/* hauteur div contenant page carto pour effet smooth scroll */
function smooth_effect() {

    var content = document.getElementById("documentbody_around");

    if ( content ) {

        content.style.height = window.innerHeight + "px";
        add_class(content, "smooth-effect");

        add_event(window, "resize", function(){

            content.style.height = window.innerHeight + "px";
        });
    }
}

/* Ajout carto mensuelle au panier */
function ajout_carto(elem) {

    /* gestion popup maintenance */
    if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
        open_popup_maintenance();
        return
    }

    var url       = "https://paiement.societe.com/pages/paiement-new.html";
    var src       = document.location.href;
    var nbprod    = parseInt(document.getElementById('nbprod').innerHTML);

    if ((nbprod) < MAX_BASKET) {

        addbasket(prod[elem.id]);

        /* gana_event specifique a la page carto */
        if ( src.indexOf("dirigeant") != -1 ) { /* si sur dirigeant */

            //gana_event(url, 'Fiche_dirigeant', 'Onglet-carto', 'Premium');
            /* gestion popup maintenance */
            if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
                open_popup_maintenance();
            } else {
                gana_event(url, 'Fiche_dirigeant', 'Onglet-carto', 'Premium');
            }
        } else {

            if ( src.indexOf("avantages-dirigeant-plus.html") != -1 ) { /* si sur pages/avantages-dirigeant-plus.html */

                //gana_event(url, 'Avantage_carto', 'Click', 'Premium');
                /* gestion popup maintenance */
                if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
                    open_popup_maintenance();
                } else {
                    gana_event(url, 'Avantage_carto', 'Click', 'Premium');
                }
            } else {

                //gana_event(url, 'Fiche_entreprise', 'Onglet-carto', 'Premium');
                /* gestion popup maintenance */
                if ( typeof(maintenance) == "number" && maintenance == 1 ) { 
                    open_popup_maintenance();
                } else {
                    gana_event(url, 'Fiche_entreprise', 'Onglet-carto', 'Premium');
                }
            }
        }
    } else {
        alert("Impossible de rajouter un produit. Nombre maximum atteint.");
        return;
    }
}

/* lien vers carto societe */
function linkcartodir(element, src) {

    var url = document.location.href;

    if ( url.indexOf("dirigeant") != -1 ) { /* si sur dirigeant */

        switch(src) {
            case 'descriptioncarto' : /* si lien vers description bas */
                /* ouverture du bloc descriptif abonnement carto */
                open_avantages_carto();
                break;
            case 'connexion' : /* si btn se connecter */
                var link = element.getAttribute("data-link");
                gana_event(link, 'Fiche_dirigeant', 'Onglet-carto', 'Connexion');
                break;
            case 'abogratuit' : /* si btn abonnement gratuit */
                gana_event(null, 'Fiche_dirigeant', 'Onglet-carto', 'Gratuit');
                break;
            case 'vitrine' : /* si btn tarifs */
                var link = "https://www.societe.com/cgi-bin/vitrine?or=dir";
                gana_event(link, 'Fiche_dirigeant', 'Onglet-carto', 'Decouvrir');
                break;
        }
    } else { /* si sur societe */

        if ( url.indexOf("avantages-dirigeant-plus.html") != -1 ) { /* si sur pages/avantages-dirigeant-plus.html */

            switch(src) {
                 case 'descriptioncarto' : /* si lien vers description bas */
                    gana_event('#avantages_carto_arguments', 'Avantage_carto', 'Click', 'Acquisition');
                    break;
                case 'connexion' : /* si btn se connecter */
                    var link = element.getAttribute("data-link");
                    gana_event(link, 'Avantage_carto', 'Click', 'Connexion');
                    break;
                case 'abogratuit' : /* si btn abonnement gratuit */
                    gana_event(null, 'Avantage_carto', 'Click', 'Gratuit');
                    break;
                case 'vitrine' : /* si btn tarifs */
                    var link = "https://www.societe.com/cgi-bin/vitrine?or=dir";
                    gana_event(link, 'Avantage_carto', 'Click', 'Decouvrir');
                    break;
            }
        } else {

            switch(src) {
                case 'descriptioncarto' : /* si lien vers description bas */
                    gana_event('#avantages_carto_arguments', 'Fiche_entreprise', 'Onglet-carto', 'Acquisition');
                    break;
                case 'connexion' : /* si btn se connecter */
                    var link = element.getAttribute("data-link");
                    gana_event(link, 'Fiche_entreprise', 'Onglet-carto', 'Connexion');
                    break;
                case 'abogratuit' : /* si btn abonnement gratuit */
                    gana_event(null, 'Fiche_entreprise', 'Onglet-carto', 'Gratuit');
                    break;
                case 'vitrine' : /* si btn tarifs */
                    var link = "https://www.societe.com/cgi-bin/vitrine?or=dir";
                    gana_event(link, 'Fiche_entreprise', 'Onglet-carto', 'Decouvrir');
                    break;
            }
        }
    }
}

/* ouverture du bloc descriptif abonnement carto */
function open_avantages_carto(context) {

    var avantages = document.getElementById("avantages_carto"),
        intro     = avantages.getElementsByClassName("AvantagesCarto__intro")[0],
        argmts    = avantages.getElementsByClassName("AvantagesCarto__arguments")[0],
        abnmt     = avantages.getElementsByClassName("Abonnements__offres")[0],
        compare   = avantages.getElementsByClassName("Abonnements__compare")[0];

    var newHeight = intro.offsetHeight + argmts.offsetHeight + abnmt.offsetHeight + compare.offsetHeight + 10;
    
    /* ajout class open pour eviter le redimensionnement au resize */
    add_class(avantages, "open");

    /* ouverture bloc */
    avantages.style.height = newHeight + "px";

    /* scroll */
    if ( context && context == "show-offer" ) {

        gana_event(null, 'Fiche_dirigeant', 'Onglet-carto', 'Acquisition');
    } else {

        gana_event('#avantages_carto', 'Fiche_dirigeant', 'Onglet-carto', 'Acquisition');
    }

    add_event(window, "resize", function(){

        setTimeout( function(){

            var newHeightResize = intro.offsetHeight + argmts.offsetHeight + abnmt.offsetHeight + compare.offsetHeight + 10;

            avantages.style.height = newHeightResize + "px";
        }, 300);
    });
}

/* formulaire de connexion via la carto */
function login_carto() {
    var request,
        back = "",
        mail = document.getElementById("email"),
        pass = document.getElementById("passwd_field"),
        perm = document.getElementById("perm");

    if(document.getElementById('back') != null) {
        back = document.getElementById('back').value;
    }

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request.overrideMimeType) {
            request.overrideMimeType("text/html");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    window.alert("Votre navigateur ne supporte pas AJAX");
                }
            }
        }
    }
    if (request && request.readyState != 0){
        request.abort();
    }

    if(mail.value.length != 0 && pass.value.length != 0) {
        /* envoi de la requete de creation de compte */
        request.open('POST', 'https://paiement.societe.com/cgi-bin/compte-login', true);
        request.send('email=' +encode_to_hex(mail.value)+ '&password=' +encode_to_hex(pass.value)+ '&user_type=old&back=' +back+ "&perm=" +perm.value);

        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                window.location.href = "https://paiement.societe.com/cgi-bin/compte-login";
                //location.reload();
            }
        }
    }
}

/* trigger requete ajax si appui sur entree */
function login_carto_enter(id) {
    var formInputs = document.getElementById(id).elements;

    for(var i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("keypress", function(e) {
            if (e.keyCode == 13 && this.getAttribute('data-form') == id) {
                login_carto();
            }
        });
    }
}

/********************************************************/
/***************** VIEW CARTOSHOP VITRINE ***************/
/********************************************************/
/* Initialisation cartoshop */
function init_cartoshop() {
    init_videocarto();
    add_event(window, "resize", function(){init_videocarto()});
}

function init_videocarto() {
    var link = document.getElementById('cartoshoplink');
    var video = document.getElementById('cartoshopvideo');

    if (is_phone_device()) {
        if (link) {
            link.style.display="block";
        }

        if (video) {
            video.style.display="none";
        }
    } else {
        if (link) {
            link.style.display="none";
        }

        if (video) {
            video.style.display="block";
        }
    }
}

/* fix position footer pour la carto */
function init_footer_carto() {
    if(document.URL.indexOf('/cgi-bin/carto') != -1) {
        var footer = document.getElementById('footer-compte');

        add_class(footer, 'block');
    } 
}/***********************************************/
/* STRIPE.JS                                    */
/***********************************************/

/* creation formulaire carte bancaire Stripe */
function create_stripe_card_form() {
    fetch("/cgi-bin/stripe-intent")
        .then(function(e) { return e.json() })
        .then(function(data) {

        if (data.error) {
            const displayError = document.getElementById('card-errors');
            if (displayError) {
                displayError.textContent = error;
                return;
            }

            return;
        }

        var stripe = Stripe(data.pk);
        var elements = stripe.elements();

        var style = {
            base: {
                iconColor: '#c4f0ff',
                color: '#000000',
                fontWeight: 500,
                fontFamily: 'Roboto-Regular-webfont, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                    color: '#000000',
                },
                '::placeholder': {
                    color: '#7F7F7F',
                }
            },
            invalid: {
                iconColor: '#CC0000',
                color: '#CC0000',
                backgroundColor: '#F8E4E4'
            },
            complete: {
                //color: '#418C24',
                color: '#000000',
                backgroundColor: '#DCFFE3'
            }
        };

        // Card number
        var card = elements.create('cardNumber', {
            style: style,
            showIcon: true
        });
        card.mount('#card-number');

        // CVC
        var cvc = elements.create('cardCvc', {
            style: style
        });
        cvc.mount('#card-cvc');

        // Card expiry
        var exp = elements.create('cardExpiry', {
            style: style
        });
        exp.mount('#card-exp');

        /* forcer css */
        var inputcss = document.querySelectorAll('#card-element .__PrivateStripeElement');
        var form = document.getElementById('payment-form');
        var submit = document.getElementById('submit'); 

        for(i in inputcss) {
            inputcss[i].style = 'margin: 4px !important; padding: 8px !important; border: 1px solid #B4B4B4 !important; display: block !important; background: transparent none repeat scroll 0% 0% !important; position: relative !important; opacity: 1 !important; border-radius: 3px;';
        }
        
        card.on('change', function(handle) {
            const displayError = document.getElementById('card-errors');
            if (handle.error) {
                displayError.textContent = handle.error.message;
            } else {
                displayError.textContent = '';
            }

            if (displayError.textContent == '' && handle.brand) {
                if (handle.brand != "visa" 
                    && handle.brand != "mastercard"
                    && handle.brand != "amex") {
                    displayError.textContent = 'Carte non supportÃ©';
                }
            }

            if (displayError.textContent === '') {
                submit.style.display = 'inline-block';
            } else {
                submit.style.display = 'none';
            }
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            card.update({disabled: true});

            stripe.confirmCardSetup(data.secret, {
                payment_method: {
                    card: card
                }
            }).then(function(res) {
                const displayError = document.getElementById('card-errors');
                
                card.update({disabled: false});

                if (displayError && res.error) {
                    displayError.textContent = res.error.message;
                    return;
                }

                if (res.setupIntent) {
                    window.location='/cgi-bin/compte-mode-paiement?mode=attach&pm=' + res.setupIntent.payment_method;
                }
            });
        });
    });
}
/***********************************************/
/* CHART.JS                                    */
/***********************************************/

function format_chart_date(inputDate) {
    var datePart = inputDate.match(/\d+/g),
        year = datePart[0], 
        month = datePart[1], 
        day = datePart[2];

    return day+'/'+month+'/'+year;
}

function format_chart_data(data, type, color) {
    var period           = document.getElementById('table-surv-period'),
        labels           = new Array,
        years            = new Array,
        values           = new Array,
        backgroundColors = new Array,
        borderColors     = new Array,
        bgColor,
        bColor;

    if(period.innerHTML != '{{period}}') {
        period.innerHTML = '{{period}}';
    }

    switch(color) {
        case 'primary':
            bgColor = 'rgba(234, 241, 248, 0.75)';
            bColor  = 'rgba(2, 113, 219, 1)';
            break;
        case 'secondary':
            bgColor = 'rgba(241, 154, 39, 0.4)';
            bColor  = 'rgba(241, 154, 39, 1)';
    }

    for(var i in data) {

        switch(type) {
            case 'day':
                if(data[i].date == "") {
                    labels.unshift('NC');
                } else {
                    labels.unshift(format_chart_date(data[i].date));
                }

                years.push('');
                break;
            case 'week':
                window.matchMedia("(min-width: 1280px)").matches ? 
                    labels.unshift('S.' + data[i].week) : labels.unshift('Semaine ' + data[i].week);
                
                years.unshift(data[i].date);
                break;
            case 'month':
                switch (data[i].date.slice(-2)){
                    case '01': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Jan.') : labels.unshift('Janvier'); 
                        break; 
                    case '02': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Fév.') : labels.unshift('Février'); 
                        break; 
                    case '03': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Mar.') : labels.unshift('Mars'); 
                            break; 
                    case '04': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Avr.') : labels.unshift('Avril'); 
                            break; 
                    case '05': 
                            labels.unshift('Mai'); 
                            break; 
                    case '06': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Jui.') : labels.unshift('Juin');
                            break; 
                    case '07': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Jui.') : labels.unshift('Juillet'); 
                            break; 
                    case '08': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Aoû.') : labels.unshift('Août'); 
                            break; 
                    case '09': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Sep.') : labels.unshift('Septembre'); 
                            break;
                    case '10': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Oct.') : labels.unshift('Octobre'); 
                            break; 
                    case '11': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Nov.') : labels.unshift('Novembre'); 
                            break; 
                    case '12': 
                        window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches ? 
                            labels.unshift('Déc.') : labels.unshift('Décembre'); 
                            break; 
                }
                years.unshift(data[i].date.slice(0, 4));
                break;     
        }

        if(typeof data[i].nb_global != "number") {
            values.unshift('0');
        } else {
            values.unshift(data[i].nb_global);
        }

        backgroundColors.push(bgColor);
        borderColors.push(bColor);
    }

    switch(type) {
        case 'day': period.innerHTML = period.innerHTML.replace(/{{period}}/g, 'Jours'); break;
        case 'week': period.innerHTML = period.innerHTML.replace(/{{period}}/g, 'Semaines'); break;
        case 'month': period.innerHTML = period.innerHTML.replace(/{{period}}/g, 'Mois'); break;
    }

    var chart_data = {
        'labels': labels,
        'years' : years,
        'values': values, 
        'backgroundColors': backgroundColors,
        'borderColors': borderColors
    };

    return chart_data;
}

function get_chart_data(id, type) {
    var req,
        jsonURL = '/cgi-bin/statsurv?type=' + type + '&state=select';

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/html");
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

    req.open('GET', jsonURL, true);
    req.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    req.send();

    /* afficher loader chargement */
    open_progress_overlay('surv-chart', 'Récupération des données...');

    req.onreadystatechange = function() {
        var json;

        if ( req.readyState == 4 ) {

            /* cacher loader chargement */
            close_progress_overlay('surv-chart');

            /* reponse ok */
            if ( req.status === 200 ) {

                try {
                    json = JSON.parse(req.responseText);
                } catch (e) {
                    return;
                }

                var style = document.getElementById('chart-surv-style').value,
                    mixed = document.getElementById('chart-surv-mixed').value;

                if(mixed == 'single') {
                    build_single_chart(id, type, json, style);
                } else {
                    build_mixed_chart(id, type, json, style);
                }
            }
            /* reponse ko */
            else {


                if(!is_class_exist(document.getElementById('popup'), 'isHidden')) {
                    return;
                } else {
                    open_popup_message('Statistiques des surveillances', 'Une erreur technique est survenue, veuillez réessayer plus tard.', 'red');
                }
            } 
        }
    }
}

function get_chart_style(id, style) {
        var req,
            type = document.getElementById('chart-surv-type').value,
            jsonURL = '/cgi-bin/statsurv?type=' + type + '&state=select';

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/html");
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

    req.open('GET', jsonURL, true);
    req.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    req.send();

    /* afficher loader chargement */
    open_progress_overlay('surv-chart', 'Récupération des données...');

    req.onreadystatechange = function() {
        var json;

        if ( req.readyState == 4 ) {

            /* cacher loader chargement */
            close_progress_overlay('surv-chart');

            /* reponse ok */
            if ( req.status === 200 ) {

                try {
                    json = JSON.parse(req.responseText);
                } catch (e) {
                    return;
                }

                var mixed = document.getElementById('chart-surv-mixed').value;

                if(mixed == 'single') {
                    build_single_chart(id, type, json, style);
                } else {
                    build_mixed_chart(id, type, json, style);
                }

                build_single_chart(id, type, json, style);
            }
            /* reponse ko */
            else {

                if(!is_class_exist(document.getElementById('popup'), 'isHidden')) {
                    return;
                } else {
                    open_popup_message('Statistiques des surveillances', 'Une erreur technique est survenue, veuillez réessayer plus tard.', 'red');
                }
            } 
        }
    }
}

function get_chart_mixed(id, mixed) {
    var req,
        type = document.getElementById('chart-surv-type').value,
        jsonURL = '/cgi-bin/statsurv?type=' + type + '&state=select';

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/html");
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

    req.open('GET', jsonURL, true);
    req.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    req.send();

    /* afficher loader chargement */
    open_progress_overlay('surv-chart', 'Récupération des données...');

    req.onreadystatechange = function() {
        var json;

        if ( req.readyState == 4 ) {

            /* cacher loader chargement */
            close_progress_overlay('surv-chart');

            /* reponse ok */
            if ( req.status === 200 ) {

                try {
                    json = JSON.parse(req.responseText);
                } catch (e) {
                    return;
                }

                var style = document.getElementById('chart-surv-style').value;

                if(mixed == 'single') {
                    build_single_chart(id, type, json, style);
                } else {
                    build_mixed_chart(id, type, json, style);
                }
            }
            /* reponse ko */
            else {

                if(!is_class_exist(document.getElementById('popup'), 'isHidden')) {
                    return;
                } else {
                    open_popup_message('Statistiques des surveillances', 'Une erreur technique est survenue, veuillez réessayer plus tard.', 'red');
                }
            } 
        }
    }
}

var myChart;

function build_single_chart(id, type, json, style) {
    var ctx            = document.getElementById(id),
        chartLabels    = json['liste n'],
        chartLabels_n1 = json['liste n-1'],
        formatData     = format_chart_data(chartLabels, type, 'primary'),
        formatData_n1  = format_chart_data(chartLabels_n1, type, 'secondary');

    switch(type) {
        case 'day':
            type = 'jour';
            break;
        case 'week':
            type = 'semaine';
            break;
        case 'month':
            type = 'mois';
            break;
    }

    switch(style) {
        case 'bar':
            var data = {
                labels: formatData.labels,
                datasets: [{
                    label: 'Mises en surveillance par ' + type + ' (' + chartLabels[0].date.substring(0, 4) + ')',
                    data: formatData.values,
                    backgroundColor: formatData.backgroundColors,
                    borderColor: formatData.borderColors,
                    borderWidth: 1
                }],

            };
            break;
        case 'line':
            var data = {
                labels: formatData.labels,
                datasets: [{
                    label: 'Mises en surveillance par ' + type + ' (' + chartLabels[0].date.substring(0, 4) + ')',
                    data: formatData.values,
                    lineTension: 0,
                    fill: true,
                    pointBorderColor: formatData.borderColors[0],
                    pointBackgroundColor: formatData.backgroundColors[0],
                    backgroundColor: formatData.backgroundColors[0],
                    borderColor: formatData.borderColors[0],
                    borderWidth: 2,
                    pointRadius: 2,
                    pointBackgroundColor: formatData.borderColors[0]
                }]
            };
            break;
        case 'horizontalBar':
            var data = {
                labels: formatData.labels,
                datasets: [{
                    label: 'Mises en surveillance par ' + type + ' (' + chartLabels[0].date.substring(0, 4) + ')',
                    data: formatData.values,
                    backgroundColor: formatData.backgroundColors,
                    borderColor: formatData.borderColors,
                    borderWidth: 1
                }]
            };
            break;
    }

    var options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 8
                }
            }]
        },
        tooltips: {
            // Disable the on-canvas tooltip
            enabled: false,

            custom: function(tooltipModel) {
                // Tooltip Element
                var tooltipEl = document.getElementById('chartjs-tooltip');
                var arrowEl = document.createElement('span');

                // Create element on first render
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<table></table>';
                    document.body.appendChild(tooltipEl);

                    arrowEl.id = 'chartjs-tooltip-arrow';
                    tooltipEl.appendChild(arrowEl);
                }

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = 0;
                    return;
                }

                function getBody(bodyItem) {
                    return bodyItem.lines;
                }

                // Set Text
                if (tooltipModel.body) {
                    var titleLines = tooltipModel.title || [];
                    var bodyLines = tooltipModel.body.map(getBody);
                    var innerHtml = '<thead>';

                    titleLines.forEach(function(title) {
                        innerHtml += '<tr><th style="text-align:left; font-size:13px;">' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function(body, i) {
                        var colors = tooltipModel.labelColors[i];
                        var style = 'background:' + colors.backgroundColor;

                        style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';

                        var span = '<span style="' + style + '"></span>';

                        body = body[i].match(/[0-9]+(?!.*[0-9])/);

                        innerHtml += '<tr><td>' + span + '<span style="color:#FF7043; font-size:16px; font-weight:bold;">' + body + '</span> <span style="font-size:12px;">mises en surveillance</span></td></tr>';

                    });
                    innerHtml += '</tbody>';

                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall tooltip
                var position = this._chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 12 + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.offsetHeight / 2 + 'px';
                tooltipEl.style.fontFamily = "'Roboto-Regular-webfont', sans-serif";
                tooltipEl.style.fontSize = '12px';
                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                tooltipEl.style.padding = '8px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.borderRadius = '3px';
                tooltipEl.style.border = "1px solid #0271DB";
                tooltipEl.style.backgroundColor = "#FFFFFF";

                // Display, position for arrow
                arrowEl.style.display = 'block';
                arrowEl.style.position = 'absolute';
                arrowEl.style.left = '-4px';
                arrowEl.style.top = tooltipEl.offsetHeight / 2 - 4 + 'px';
                arrowEl.style.width = '7px';
                arrowEl.style.height = '7px';
                arrowEl.style.backgroundColor = '#FFFFFF';
                arrowEl.style.borderLeft = '1px solid #0271DB';
                arrowEl.style.borderBottom = '1px solid #0271DB';
                arrowEl.style.transform = 'rotate(45deg)';
            }
        }
    };

    if(myChart != null) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: style,
        data: data,
        options: options
    });

    get_compare_arrays(formatData.labels, formatData.values, formatData_n1.values, formatData.years);
}

function build_mixed_chart(id, type, json, style) {
    var ctx            = document.getElementById(id),
        chartLabels    = json['liste n'],
        chartLabels_n1 = json['liste n-1'],
        formatData     = format_chart_data(chartLabels, type, 'primary'),
        formatData_n1  = format_chart_data(chartLabels_n1, type, 'secondary');

    switch(type) {
        case 'day':
            type = 'jour';
            break;
        case 'week':
            type = 'semaine';
            break;
        case 'month':
            type = 'mois';
            break;
    }

    var options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    if(myChart != null) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Mises en surveillance par ' + type + ' (' + chartLabels[0].date.substring(0, 4) + ')',
                data: formatData.values,
                backgroundColor: formatData.backgroundColors,
                borderColor: formatData.borderColors,
                borderWidth: 1,
                order: 1
            }, {
                label: 'Mises en surveillance par ' + type + ' (' + chartLabels_n1[0].date.substring(0, 4) + ')',
                data: formatData_n1.values,
                type: 'line',
                lineTension: 0,
                fill: false,
                borderColor: formatData_n1.borderColors[0],
                pointBackgroundColor: formatData_n1.backgroundColors[0],
                pointBorderColor: formatData_n1.borderColors[0],
                borderWidth: 2,
                order: 2
            }],
            labels: formatData.labels
        },
        options: options
    });

    get_compare_arrays(formatData.labels, formatData.values, formatData_n1.values, formatData.years);
}

function onload_build_single_chart() {
    var month = document.getElementById('month'),
        week  = document.getElementById('week'),
        day   = document.getElementById('day');

    if(month.checked) {
        get_chart_data('chart-surv', month.value);
    } else if(week.checked) {
        get_chart_data('chart-surv', week.value);
    } else if(day.checked) {
        get_chart_data('chart-surv', day.value);
    }
}

function get_compare_arrays(labels, values, valuesN1, years) {
    var percValue,
        percArray = new Array,
        percClass = new Array,
        percYears = new Array;

    for(var i in values) {

        if(typeof values[i] != "number" || typeof valuesN1[i] != "number" || values[i] == 0 || valuesN1[i] == 0) {
            percValue = 'NC';
            percClass.push('');
            percArray.push(percValue);
        } else {
            percValue = ((values[i] - valuesN1[i]) / valuesN1[i]) * 1000;
            percValue = Math.round(percValue) / 10;

            if(percValue < 0) {
                percClass.push('red');
            } else {
                percClass.push('green');
            }

            percArray.push(percValue + '%');
        }
    }

    var perc = {
        'labels': labels,
        'values': values,
        'perc': percArray,
        'class': percClass,
        'years' : years
    }

    build_compare_table(perc);
}

function build_compare_table(table) {
    var template     = document.getElementById('line-surv-perc-template'),
        templateHTML = template.innerHTML,
        lineHTML     = "",
        labels       = table.labels,
        values       = table.values,
        perc         = table.perc,
        percClass    = table.class,
        percYears    = table.years,
        tableHTML    = document.getElementById('table-surv-perc-body');

    for(var i in labels) {
        lineHTML += templateHTML.replace(/{{date}}/g, labels[i])
                                .replace(/{{nb_global}}/g, values[i])
                                .replace(/{{perc_n1}}/g, perc[i])
                                .replace(/{{percClass}}/g, percClass[i])
                                .replace(/{{year}}/g, percYears[i]);      
    }

    tableHTML.innerHTML = lineHTML;
}

function fill_surv_nb() {
    var req,
        nb = document.getElementById('nb-surv');

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/html");
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

    req.open('GET', '/cgi-bin/statsurv?state=count', true);
    req.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    req.send();

    req.onreadystatechange = function() {
        var json;

        if ( req.readyState == 4 ) {

            /* reponse ok */
            if ( req.status === 200 ) {

                try {
                    json = JSON.parse(req.responseText);
                } catch (e) {
                    return;
                }

                nb.innerHTML = nb.innerHTML.replace(/{{nbsurveillances}}/g, json.nbsirenenveille);
                display_num(document.getElementById('container'));
                remove_class(nb, 'isHidden');
            }
            /* reponse ko */
            else {

                nb.innerHTML = nb.innerHTML.replace(/{{nbsurveillances}}/g, '1384827');
                display_num(document.getElementById('container'));
                remove_class(nb, 'isHidden');
            } 
        }
    }
}

/************************************/
/* BAROMETRE                        */
/************************************/

function get_barometer_data(id, ape, postal) {
    var req,
        jsonURL;

    if(ape != undefined && postal != undefined) {
        jsonURL = '/cgi-bin/barometre?ape=' + ape + '&postal=' + postal + '&state=select';
    } else {
        jsonURL = '/cgi-bin/barometre?state=select';
    }

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        if (req.overrideMimeType) {
            req.overrideMimeType("text/html");
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

    req.open('GET', jsonURL, true);
    req.setRequestHeader("Content-type", "text/html;charset=iso-8859-1");
    req.send();

    /* afficher loader chargement */
    open_progress_overlay('baro-chart', 'Récupération des données...');

    req.onreadystatechange = function() {
        var json;

        if ( req.readyState == 4 ) {

            /* cacher loader chargement */
            close_progress_overlay('baro-chart');

            /* reponse ok */
            if ( req.status === 200 ) {

                try {
                    json = JSON.parse(req.responseText);
                } catch (e) {
                    return;
                }


                build_baro_chart(id, json);
            }
            /* reponse ko */
            else {

                if(!is_class_exist(document.getElementById('popup'), 'isHidden')) {
                    return;
                } else {
                    open_popup_message('Baromètre Societe.com', 'Une erreur technique est survenue, veuillez réessayer plus tard.', 'red');
                }
            } 
        }
    }
}

function format_baro_data(json) {
    var wSize  = window.innerWidth,
        dates  = new Array,
        immats = new Array,
        radis  = new Array,
        deltas = new Array,
        data   = new Object;

    for (var i in json.liste) {
        switch (json.liste[i].date.slice(-2)) {
            case '01': dates.unshift('Janvier ' + json.liste[i].date.substring(0, 4)); break; 
            case '02': dates.unshift('Février ' + json.liste[i].date.substring(0, 4)); break; 
            case '03': dates.unshift('Mars ' + json.liste[i].date.substring(0, 4)); break; 
            case '04': dates.unshift('Avril ' + json.liste[i].date.substring(0, 4)); break; 
            case '05': dates.unshift('Mai ' + json.liste[i].date.substring(0, 4)); break; 
            case '06': dates.unshift('Juin ' + json.liste[i].date.substring(0, 4)); break; 
            case '07': dates.unshift('Juillet ' + json.liste[i].date.substring(0, 4)); break; 
            case '08': dates.unshift('Août ' + json.liste[i].date.substring(0, 4)); break; 
            case '09': dates.unshift('Septembre ' + json.liste[i].date.substring(0, 4)); break;
            case '10': dates.unshift('Octobre ' + json.liste[i].date.substring(0, 4)); break; 
            case '11': dates.unshift('Novembre ' + json.liste[i].date.substring(0, 4)); break; 
            case '12': dates.unshift('Décembre ' + json.liste[i].date.substring(0, 4)); break; 
        }

        immats.unshift(json.liste[i].immat);
        radis.unshift(json.liste[i].radi);
        deltas.unshift(parseInt(json.liste[i].immat) - parseInt(json.liste[i].radi));
    }

    /* ne laisser qu'un label sur trois */
    for (var i in dates) {

        if(i != 0) {
            
            if(i % 3 != 0) {
                dates[i] = '';
            }
        }
    }

    for (radi in radis) {
        radis[radi] = '-' + radis[radi];
    }

    if(window.matchMedia("(max-width: 600px)").matches) {

        dates  = dates.slice(Math.max(dates.length - 12, 1));
        immats = immats.slice(Math.max(immats.length - 12, 1));
        radis  = radis.slice(Math.max(radis.length - 12, 1));
        deltas = deltas.slice(Math.max(deltas.length - 12, 1));

    } else if(window.matchMedia("(max-width: 1000px)").matches) {

        dates  = dates.slice(Math.max(dates.length - 18, 1));
        immats = immats.slice(Math.max(immats.length - 18, 1));
        radis  = radis.slice(Math.max(radis.length - 18, 1));
        deltas = deltas.slice(Math.max(deltas.length - 18, 1));

    }

    data = {
        'dates': dates,
        'immats': immats,
        'radis': radis,
        'deltas': deltas
    }

    return data;
    
}

var myBaroChart;

function build_baro_chart(id, json) {
    var ctx   = document.getElementById(id).getContext('2d'),
        data  = format_baro_data(json),
        wSize = window.innerWidth,
        showLabel,
        legendLabel;

    if(myBaroChart != null) {
        myBaroChart.destroy();
    }

    myBaroChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Baromètre',
                data: data.deltas,
                type: 'line',
                lineTension: 0,
                fill: false,
                borderWidth: 2,
                borderColor: '#FF4500',
                backgroundColor: '#FF4500',
                lineTension: 0,
                pointStyle: 'line',
                pointBorderWidth: 0
            }, {
                label: 'Immatriculations (par mois)',
                backgroundColor: "#7CE7E4",
                data: data.immats,
            }, {
                label: 'Radiations (par mois)',
                backgroundColor: "#FECF81",
                data: data.radis,
            }],
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: true
                    },
                    categoryPercentage: 1,
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            if(value < 100000) {
                                value = value.toString();
                                return value.substring(0, 2) + 'K';
                            } else {
                                value = value.toString();
                                return value.substring(0, 3) + 'K';
                            }
                        }
                    },
                    type: 'linear',
                }]
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: { 
                position: 'top',
                align: 'center'
            },
            tooltips: {
                enabled: true,
                mode: 'index',
                position: 'average',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                titleFontSize: 14,
                titleFontStyle: 'bold',
                titleFontColor: '#000000',
                titleSpacing: 4,
                titleMarginBottom: 24,
                titleAlign: 'center',
                bodyFontColor: '#000000',
                borderColor: '#0271DB',
                bodySpacing: 14,
                bodyFontStyle: 'bold',
                borderWidth: 1,
                cornerRadius: 3,
                caretSize: 12,
                xPadding: 12,
                yPadding: 12,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '',
                            value = tooltipItem.yLabel.toString();

                        if (label) {
                            label += ': ';
                        }
                        if (value.indexOf("-") != -1) {
                            tooltipItem.yLabel = value.substring(1);
                            tooltipItem.yLabel = parseInt(tooltipItem.yLabel);
                        }

                        var valuePresenter = Math.round(tooltipItem.yLabel * 100) / 100;

                        valuePresenter = number_presenter(valuePresenter.toString());

                        label += valuePresenter;

                        return label;
                    }
                }
            }
        }
    });
}

/************************************/
/* CONTENTIEUX                      */
/************************************/

function build_donut_chart(id, data) {
    var chart = document.getElementById(id);

    /* modification pour les arrondis */
    Chart.pluginService.register({
        afterUpdate: function (chart) {
            if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
                arc.round = {
                    x: (chart.chartArea.left + chart.chartArea.right) / 2,
                    y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                    radius: (chart.outerRadius + chart.innerRadius) / 2,
                    thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
                    backgroundColor: arc._model.backgroundColor
                }
            }
        },

        afterDraw: function (chart) {
            if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                var ctx = chart.chart.ctx;
                var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
                var startAngle = Math.PI / 2 - arc._view.startAngle;
                var endAngle = Math.PI / 2 - arc._view.endAngle;

                ctx.save();
                ctx.translate(arc.round.x, arc.round.y);
                ctx.fillStyle = arc.round.backgroundColor;
                ctx.beginPath();
                ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        },
    });

    /* modification pour le texte au centre du donut */
    Chart.pluginService.register({
        afterUpdate: function (chart) {
            if (chart.config.options.elements.center) {
                var helpers = Chart.helpers;
                var centerConfig = chart.config.options.elements.center;
                var globalConfig = Chart.defaults.global;
                var ctx = chart.chart.ctx;

                var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
                var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

                if (centerConfig.fontSize)
                    var fontSize = centerConfig.fontSize;
                    // figure out the best font size, if one is not specified
                else {
                    ctx.save();
                    var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                    var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                    var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

                    do {
                        ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                        var textWidth = ctx.measureText(maxText).width;

                        // check if it fits, is within configured limits and that we are not simply toggling back and forth
                        if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                            fontSize += 1;
                        else {
                            // reverse last step
                            fontSize -= 1;
                            break;
                        }
                    } while (true)
                    ctx.restore();
                }

                // save properties
                chart.center = {
                    font: helpers.fontString(fontSize, fontStyle, fontFamily),
                    fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
                };
            }
        },
        afterDraw: function (chart) {
            if (chart.center) {
                var centerConfig = chart.config.options.elements.center;
                var ctx = chart.chart.ctx;

                ctx.save();
                ctx.font = chart.center.font;
                ctx.fillStyle = chart.center.fillStyle;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                ctx.fillText(centerConfig.text, centerX, centerY);
                ctx.restore();
            }
        },
    });

    if(data == "contjurprofile") {
        var percent  = document.getElementById('dem').getAttribute('data-percent'),
            dem      = document.getElementById('dem').getAttribute('data-name'),
            def      = document.getElementById('def').getAttribute('data-name'),
            demColor = document.getElementById('dem').getAttribute('data-color'),
            defColor = document.getElementById('def').getAttribute('data-color'),
            text     = percent;

        if(noCont == true) {
            percent = 0;
            demColor = '#EBEBEB';
            defColor = '#EBEBEB';
        }

        if(percent == "X" || percent == 'XX') {
            percent = 50;
        }

        if(percent >= 50) {
            var labels = [dem, def];

            var datasets = [{
                    data: [percent, 100 - percent],
                    backgroundColor: [
                        demColor,
                        defColor
                    ]
                }];

            var fontColor = demColor;

            if(percent != 50) {
                add_class(document.getElementById('dem'), 'fs-24')
            }

        } else {
            var labels = [def, dem];

            if(noCont == true) {
                var data = [0, 100 - percent];
            } else {
                var data = [100 - percent, percent];
            }

            var datasets = [{
                    data: data,
                    backgroundColor: [
                        defColor,
                        demColor
                    ]
                }];

            var fontColor = defColor;

            if(text != 'X' || text != 'XX') {
                text = 100 - percent;
            }

            if(noCont == true) {
                text = 0;
            }

            if(percent != 50) {
                add_class(document.getElementById('def'), 'fs-24')
            }
        }
    }

    if(data == "contjurproblem") {
        var percent = document.getElementById('paypercent').getAttribute('data-percent'),
            text    = percent;

        if(percent == "X" || percent == 'XX') {
            percent = 50;
        }

        percent = parseInt(percent);

        var labels = ['Problème de paiement', 'Autres'];

        if(noCont == true) {
            var data = [0, 100 - percent];
        } else {
            var data = [percent, 100 - percent];
        }

        if(noCont == true) {
            var datasets = [{
                data: data,
                backgroundColor: [
                    '#EBEBEB',
                    '#EBEBEB'
                ]
            }];

            var fontColor = '#EBEBEB';
        } else {
            var datasets = [{
                data: data,
                backgroundColor: [
                    '#B4B4B4',
                    '#EBEBEB'
                ]
            }];

            var fontColor = '#B4B4B4';
        }
    }

    /* ajout data et options */
    var config = {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            cutoutPercentage: 80,
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                arc: {
                    roundedCornersFor: 0
                },
                center: {
                    // the longest text that could appear in the center
                    //maxText: '100%',
                    text: text + '% ',
                    fontColor: fontColor,
                    fontFamily: "'Roboto', sans-serif",
                    fontStyle: 'normal',
                    // fontSize: 12,
                    // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                    // if these are not specified either, we default to 1 and 256
                    minFontSize: 12,
                    maxFontSize: 34,
                }
            }
        }
    };

    var ctx = document.getElementById(id).getContext("2d");
    var myChart = new Chart(ctx, config);
}

function format_contJur_data(json, type) {
    switch(type) {
        case 'profile':
            var years = new Array,
                dem   = new Array,
                def   = new Array;

            for(var i in json.liste) {
                years.push(json.liste[i].year);
                dem.push(json.liste[i].nbdem);
                def.push(json.liste[i].nbdef);
            }

            var data = {
                'years': years,
                'dem': dem,
                'def': def
            }

            return data;
            break;

        case 'type':
            var years  = new Array,
                pcl    = new Array,
                pay    = new Array,
                others = new Array;

            for(var i in json.liste) {
                years.push(json.liste[i].year);
                pcl.push(json.liste[i].nbpcl);
                pay.push(json.liste[i].nbpay);
                others.push(json.liste[i].nbother);
            }

            var data = {
                'years': years,
                'pcl': pcl,
                'pay': pay,
                'others': others
            }

            return data;
            break; 
    }
}

var contJurHistChart;

function build_stacked_bar_chart(id, type, json) {
    if(json == null || json.liste.length == 0) {
        var json = {"liste": [
            {
              "year": 2010,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2011,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2012,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2013,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2014,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2015,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2016,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2017,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2018,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2019,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
            {
              "year": 2020,
              "nbdem": 0,
              "nbdef": 0,
              "nbpcl": 0,
              "nbpay": 0,
              "nbother": 0
            },
        ]};
    }

    var ctx   = document.getElementById(id).getContext('2d'),
        data  = format_contJur_data(json, type),
        wSize = window.innerWidth,
        showLabel,
        legendLabel;

    if(contJurHistChart != null) {
        contJurHistChart.destroy();
    }

    switch(type) {
        case 'profile':

            if(noCont == true) {
                var demColor = '#656565',
                    defColor = '#B4B4B4';
            } else {
                var demColor = '#FFCBB4',
                    defColor = '#6EACDB';
            }

            var datasets = {
                labels: data.years,
                datasets: [{
                    label: 'Demandeur',
                    data: data.dem,
                    borderWidth: 2,
                    borderColor: demColor,
                    backgroundColor: demColor
                }, {
                    label: 'Défendeur',
                    data: data.def,
                    borderWidth: 2,
                    borderColor: defColor,
                    backgroundColor: defColor
                }]
            };

            break;
        case 'type':

            var datasets = {
                labels: data.years,
                datasets: [{
                    label: 'Action en paiement',
                    data: data.pay,
                    borderColor: '#1a6b9d',
                    backgroundColor: '#1a6b9d'
                }, {
                    label: 'Procédure collective',
                    data: data.pcl,
                    borderWidth: 2,
                    borderColor: '#6babdd',
                    backgroundColor: '#6babdd'
                }, {
                    label: 'Autres',
                    data: data.others,
                    borderWidth: 2,
                    borderColor: '#bfcbd7',
                    backgroundColor: '#bfcbd7'
                }]
            };

            break;
    }

    if(window.matchMedia("(max-width: 480px)").matches) {
        var aspectRatio = 1;
    } else if (window.matchMedia("(max-width: 600px)").matches){
        var aspectRatio = 1.5;
    } else {
        var aspectRatio = 2;
    }

    contJurHistChart = new Chart(ctx, {
        type: 'bar',
        data: datasets,
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: true
                    }
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        beginAtZero: true
                    },
                    type: 'linear',
                }]
            },
            responsive: true,
            aspectRatio: aspectRatio,
            maintainAspectRatio: true,
            legend: { 
                position: 'top',
                align: 'left'
            }
        }
    });
}

function init_cont_charts() {
    build_donut_chart('donut-contjurprofile', 'contjurprofile');
    build_donut_chart('donut-contjurproblem', 'contjurproblem');
    build_stacked_bar_chart('chart-contjurhist', 'profile', jsonContHist);
}
/******************************************/
/*              API GOOGLE MAPS           */
/******************************************/
var allGeo = new Array;

function initMap(container, map, array) {
	var geocoder  = new google.maps.Geocoder(),
		addresses = fetchAdress(container);
	
	/* ancien appel a la geolocalisation */
	/* geocodeAddress(geocoder, addresses, map); */

	setTimeout(function() {
		if(array.length > 1) {
			showAllLocationsMap(map, list_coord);
		} else {
			showOneLocationMap(map, list_coord);
		}
	}, 1000);
}

function containsObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].lat == obj.lat && list[i].lng == obj.lng) {
            return true;
        }
    }
    return false;
}

function fetchAdress(containerId) {
	var container = document.getElementById(containerId),
		addresses = container.getElementsByClassName('address'),
		addArray  = new Array,
		result    = new Array ;

	// recuperation des adresses dans un tableau
	for(var i = 0; i < addresses.length; i++) {
		addArray.push(addresses[i].getAttribute('data-address'));
	}

	// nettoyage des adresses du tableau pour les comparer
	for(var i = 0; i < addArray.length; i++) {
		if(typeof addArray[i] === 'string') {
			addArray[i] = addArray[i].toLowerCase();
		}
	}

	// creation du tableau avec adresses uniques
	result = Array.from(new Set(addArray));

	return result;
}

function handle_geocoding_error(status) {
	switch(status) {
		case "ZERO_RESULTS":
			var error = document.getElementsByClassName('map-error');

			for(var i = 0; i < error.length; i++) {
				error[i].textContent = 'Le service de gÃ©olocalisation n\'est pas en mesure de dÃ©terminer l\'emplacement de cette adresse.';
				remove_class(error[i], 'isHidden');
			}			
			break;
		default:
			break;
	}	
}

function showOneLocationMap(map, array) {
	var map  = document.getElementsByClassName(map),
		lat  = array[0].lat,
		lng  = array[0].lng,
		key  = "AIzaSyDzqN-rLQzMXZ6uO_PaGhlOoBYYFYsNnDk",
		size = '768x768',
		url  = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=17&size=" + size + "&scale=1&markers=color:red%7c" + lat + "," + lng + "&key=" + key;

	for(var i = 0; i < map.length; i++) {
		map[i].getElementsByTagName('img')[0].setAttribute('src', url);
		if(map[i].getAttribute('src') != "") {

			if(map[i].getAttribute('id') == "map-coldroite") {
				map[i].style.height = "360px";
				document.getElementById('address-coldroite').innerHTML = document.getElementById('address-result-name').innerHTML;
				remove_class(document.getElementById('frame-coldroite'), 'h-0');
			} else {
				map[i].style.height = "270px";
			}
		}
	}
}

function showAllLocationsMap(map, array) {
	var selectArray = array.slice(0, 9),
		map         = document.getElementsByClassName(map),
		mapCenter   = Math.round(selectArray.length / 2),
		key       = "AIzaSyDzqN-rLQzMXZ6uO_PaGhlOoBYYFYsNnDk",
		size      = '768x768',
		url       = "https://maps.googleapis.com/maps/api/staticmap?center=" + array[mapCenter].lat + "," + array[mapCenter].lng + "&zoom=18&size=" + size + "&scale=1";

	for(var i = 0; i < array.length; i++) {
		var label = i + 1,
			lat   = array[i].lat,
			lng   = array[i].lng,
			mrk   = "&markers=color:0x0071DB%7clabel:" + label + "%7c" + lat + "," + lng + "%7c";

		url += mrk;

		if(i == array.length - 1) {
			url += "&key=" + key;
		}
	}

	for(var i = 0; i < map.length; i++) {
		map[i].getElementsByTagName('img')[0].setAttribute('src', url);
	}

	if(map[0].getAttribute('src') != "") {
		map[0].style.height = "270px";
	}
}

/* fonction de recuperation des coordonnees de geolocalisation - n'est plus utilise en front */
function geocodeAddress(geocoder, addresses, map) {

	if(Array.isArray(addresses) && addresses.length > 1) {
		var max;

		if(addresses.length > 9) {
			max = 9;
		} else {
			max = addresses.length;
		}

		for(var i = 0; i < max; i++) {
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({
			address: addresses[i]
			}, function (results, status) {
				if (status === "OK") {
					var lat = results[0].geometry.location.lat(),
					    lng = results[0].geometry.location.lng(),
					    loc = { lat: lat, lng: lng };

					allGeo.push(loc);
					
				} else {
					handle_geocoding_error(status);
				}
			});
		}

		setTimeout(function(){ showAllLocationsMap(map, allGeo); }, 1000);
	} else {
		geocoder.geocode({
		address: addresses[0]
		}, function (results, status) {
			if (status === "OK") {
				var lat = results[0].geometry.location.lat(),
				    lng = results[0].geometry.location.lng(),
				    geo = new Array;

				geo.push(lat, lng);

				showOneLocationMap(map, geo);
			} else {
				handle_geocoding_error(status);
			}
		});
	}
}var tabcolor = [
    "#ECF8F6",
    "#FEEAA1",
    "#D6955B",
    "#FFAE9D",
    "#FAF2EA",
    "#B39188",
    "#B8CBD0",
    "#C49D83",
    "#97999B",
    "#CFC486",
    "#80856D",
    "#F5DF4D",
    "#C49FFF",
    "#C89F9C",
    "#e76f51",
    "#E8D5CC",
    "#f5efe6",
    "#D2D2EB"
];



function random_color() {
    return (tabcolor[Math.floor(Math.random() * tabcolor.length)]);
}



function debug_inactive() {
    var list = document.getElementsByClassName("debughtml");
    if (list) {
        for (var i = list.length - 1; i >= 0; i--) { /* fonctionne uniquement dans ce sens */
            list[i].remove();
        }
    }
    console.log("MODE DEBUG : desactive");
}



function debug_active() {
    var list = document.querySelectorAll('[data-viewname]');
    if (list) {
        for (var i = 0; i < list.length; i++) {
            var obj = document.createElement("div");

            var viewname = "viewname N/C"
            if (list[i].dataset && list[i].dataset.viewname) {
                viewname = list[i].dataset.viewname;
            }

            var col = random_color();

            textobj = document.createElement("p");
            textobj.innerHTML = viewname;
            textobj.style.font = "bold 15px arial,serif"
            textobj.style.color = "#000000";
            textobj.style.zIndex = "2147483647";

            obj.appendChild(textobj);

            if (viewname == "header-body" || viewname == "header-bodydir") {
                obj.style.backgroundColor = "#FFFFFF";
                obj.style.opacity = "0.4";
            } else {
                obj.style.backgroundColor = col;
                obj.style.opacity = "0.9";
            }
            obj.style.zIndex = "2147483647";
            obj.style.position = "absolute";
            obj.style.width = "100%";
            obj.style.height = "100%";
            obj.style.border = "1px solid black";
            obj.className = "debughtml"

            list[i].style.position = "relative";
            list[i].style.zIndex = "0";
            list[i].insertBefore(obj, list[i].firstChild);
        }
    }
    console.log("MODE DEBUG : active");
}
/**
 READMORE
**/

function readJs_Initialize( options, containerID, elementTags ) {
    return new readJs( options, containerID, elementTags );
}

function readJs( options, containerID, elementTags ) {
    var _options = {},
        _elements = {},
        _elementTypes = {},
        _this = this,
        _document = null,
        _attributeName = "data-read-more",
        _capturedReadMores = {},
        _capturedReadLessName = "readLess",
        _capturedReadMoreName = "readMore";

    function build( baseElementsContainer, baseElementContainerTagTypes ) {
        var elementTagTypes = baseElementContainerTagTypes.split( "," ),
            elementTagTypesLength = elementTagTypes.length,
            elementsContainer = !isDefined( baseElementsContainer ) ? _document.body : baseElementsContainer;

        for ( var elementTypeIndex = 0; elementTypeIndex < elementTagTypesLength; elementTypeIndex++ ) {
            var elementType = elementTagTypes[ elementTypeIndex ],
                elements = getElementsByTagName( elementsContainer, elementType ),
                elementsLength = elements.length;

            for ( var elementIndex = 0; elementIndex < elementsLength; elementIndex++ ) {
                var element = elements[ elementIndex ],
                    elementAttributeData = element.getAttribute( _attributeName );
    
                if ( elementAttributeData != null ) {
                    var elementAttributeJson = getAttributeObject( elementAttributeData ),
                        text = element.innerText;
    
                    if ( text.length > _options.maximumLengthOfText ) {
                        buildView( element, elementAttributeJson, text );
                    }
                }
            }
        }
    }

    function buildView( element, elementAttributeJson, text ) {
        if ( !isDefined( elementAttributeJson.ignore ) || !elementAttributeJson.ignore ) {
            var startText = text.substring( 0, _options.maximumLengthOfText ),
                endText = text.substring( _options.maximumLengthOfText ),
                useStyledContainer = isSettingTrue( elementAttributeJson, "useStyledContainer" ) || _options.useStyledContainers,
                newContainer = null,
                capturedReadMoreGuid = newGuid();

            element.innerText = "";
            element.innerHTML = "";
    
            if ( useStyledContainer ) {
                newContainer = createElement( "div" );
                newContainer.className = "rjs-text-container";
                element.appendChild( newContainer );
            } else {
                newContainer = element;
            }

            var newStartTextContainer = createElement( "span" );
            newStartTextContainer.innerHTML = startText;
            newContainer.appendChild( newStartTextContainer );
    
            var newEllipsisContainer = createElement( "span" );
            newEllipsisContainer.innerHTML = _options.ellipsisText;
            newContainer.appendChild( newEllipsisContainer );
    
            var newEndTextContainer = createElement( "span" );
            newEndTextContainer.style.display = "none";
            newEndTextContainer.innerHTML = endText;
            newContainer.appendChild( newEndTextContainer );
    
            var newReadMoreLink = createElement( "a" );
            newReadMoreLink.className = "rjs-read-more";
            newReadMoreLink.innerText = _options.readMoreText;
            newContainer.appendChild( newReadMoreLink );
    
            var readLess = function () {
                newEndTextContainer.style.display = "none";
                newEllipsisContainer.style.display = "inline";
                newReadMoreLink.innerText = _options.readMoreText;
                newReadMoreLink.className = "rjs-read-more";
            };
    
            var readMore = function () {
                newEndTextContainer.style.display = "inline";
                newEllipsisContainer.style.display = "none";
                newReadMoreLink.innerText = _options.readLessText;
                newReadMoreLink.className = "rjs-read-less";
            };

            _capturedReadMores[ capturedReadMoreGuid ] = {};
            _capturedReadMores[ capturedReadMoreGuid ][ _capturedReadLessName ] = readLess;
            _capturedReadMores[ capturedReadMoreGuid ][ _capturedReadMoreName ] = readMore;

            if ( isSettingTrue( elementAttributeJson, "visible" ) ) {
                readMore();
            }
    
            newReadMoreLink.addEventListener( "click", function () {
                if ( newEndTextContainer.style.display === "none" ) {
                    readMore();
                    triggerOptionsEvent( "onReadMore" );
                } else {
                    readLess();
                    triggerOptionsEvent( "onReadLess" );
                }
            });
        }
    }

    function triggerOptionsEvent( name ) {
        if ( _options !== null && isDefined( _options[ name ] ) && isFunction( _options[ name ] ) ) {
            _options[ name ]();
        }
    }

    function isSettingTrue( elementAttributeJson, setting ) {
        return isDefined( elementAttributeJson[ setting ] ) && elementAttributeJson[ setting ];
    }

    function newGuid() {
        var result = [];

        for ( var charIndex = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( "-" );
            }

            var character = Math.floor( Math.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( "" );
    }

    function createElement( type ) {
        var result = null,
            nodeType = type == null ? "div" : type.toLowerCase(),
            isText = nodeType === "text";

        if ( !_elementTypes.hasOwnProperty( nodeType ) ) {
            _elementTypes[ nodeType ] = isText ? _document.createTextNode( "" ) : _document.createElement( nodeType );
        }

        result = _elementTypes[ nodeType ].cloneNode( false );

        return result;
    }

    function getElementByID( id ) {
        if ( !_elements.hasOwnProperty( id ) || _elements[ id ] === null ) {
            _elements[ id ] = _document.getElementById( id );
        }

        return _elements[ id ];
    }

    function getElementsByTagName( element, elementType ) {
        var elementsResult = [],
            elements = element.getElementsByTagName( elementType ),
            elementsLength = elements.length;

        for ( var elementIndex = 0; elementIndex < elementsLength; elementIndex++ ) {
            elementsResult.push( elements[ elementIndex ] );
        }

        return elementsResult;
    }

    function getAttributeObject( attributeData ) {
        var result = null;

        try {
            result = JSON.parse( attributeData );
        } catch ( e1 ) {

            try {
                result = eval( "(" + attributeData + ")" );
            } catch ( e2 ) {
                console.error( "Errors in attribute: " + e1.message + ", " + e2.message );
                result = null;
            }
        }

        return result;
    }

    function isDefined( data ) {
        return data !== undefined && data !== null && data !== "";
    }

    function isFunction( object ) {
        return typeof object === "function";
    }

    this.setOptions = function ( newOptions ) {
        if ( newOptions !== null && typeof newOptions === "object" ) {
            _options = newOptions;
        } else {
            _options = {};
        }

        if ( !isDefined( _options.readMoreText ) ) {
            _options.readMoreText = "Voir plus >";
        }

        if ( !isDefined( _options.readLessText ) ) {
            _options.readLessText = "Voir moins";
        }

        if ( !isDefined( _options.ellipsisText ) ) {
            _options.ellipsisText = "...";
        }

        if ( !isDefined( _options.maximumLengthOfText ) ) {
            _options.maximumLengthOfText = 200;
        }

        if ( !isDefined( _options.useStyledContainers ) ) {
            _options.useStyledContainers = true;
        }
    };

    this.openAll = function () {
        executeCapturedReadMoreEvent( _capturedReadMoreName );
    };

    this.closeAll = function () {
        executeCapturedReadMoreEvent( _capturedReadLessName );
    };

    function executeCapturedReadMoreEvent( eventName ) {
        for ( var propertyName in _capturedReadMores ) {
            if ( _capturedReadMores.hasOwnProperty( propertyName ) ) {
                _capturedReadMores[ propertyName ][ eventName ]();
            }
        }
    }

    ( function ( documentObject ) {
        options = !isDefined( options ) ? {} : options;

        _document = documentObject;

        var elementsContainer = isDefined( containerID ) ? getElementByID( containerID ) : null,
            elementTagTypes = isDefined( elementTags ) ? elementTags : "*";

        _this.setOptions( options );

        build( elementsContainer, elementTagTypes );

    } ) ( document );
}