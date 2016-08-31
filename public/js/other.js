$(".region-list > li > ul > li > a").on("click", function() {
    window.createCookie('country_selected', 'true', 1);
});

customerAudience = 'dispatch';

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return "";
}
function setCookie(name, val, expDays, path) {
    path = path || '/';
    var t = new Date();
    t.setTime(t.getTime() + (expDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + t.toUTCString();
    document.cookie = name + "=" + val + "; " + expires + "; path=" + path;
}
function displayPopupSuccessRegistration_2399() {
    if (typeof flyOver != "undefined") {
        var oL = document.getElementsByClassName("signup-overlay");
        oL[0].style.visibility = "hidden";
        setCookie('skip-signup-overlay', 'on', 30);
    }
    var colorboxHeight = "55%";
    var colorboxWidth = "60%";
    if ($.fn.colorbox) {
        $.colorbox({
            height: colorboxHeight,
            width: colorboxWidth,
            html: "<div class='newsletter-confirm'><img alt='newsletter' src='" + sdltfoRootUrl + "assets-re1/css/img/newsletter.png'><h2>Merci d'avoir souscrit aux actualités de Schneider Electric!</h2><span>Vous recevrez bientôt un e-mail de confirmation dans lequel sera décrit le programme des prochaines semaines.</span></div>"
        });
    }
}
function initRegistrationForm_2399(aform) {
    aform.find("input[name=MiddleName]").hide();
    aform.find("input[name='keyCode']").attr("Value", "z609v"); //Set keyCode
    aform.find("input[name$='EInferredCountry']").attr("Value", "FR"); //Set inferredCountry using ISO 2 characters code
    aform.find("input[name$='EInferredLanguage']").attr("Value", "fr"); //Set inferredLanguage using ISO 2 characters code
    var customerAudienceForm = "";
    if (typeof customerAudience !== 'undefined') {
        customerAudience = customerAudience.toLowerCase();
        switch (customerAudience) {
            case "dispatch":
                customerAudienceForm = "";
                break;
            case "home":
                customerAudienceForm = "home.";
                break;
            case "partners":
                customerAudienceForm = "partners.";
                break;
            case "work":
                customerAudienceForm = "work.";
                break;
            default:
                break;
        }
    }
    var co = "electric";
    var sourceDetailVal = $(location).attr('hostname');
    var pos = sourceDetailVal.toString().indexOf(co);
    if (pos > 0) {
        pos = pos + co.length;
        sourceDetailVal = customerAudienceForm.toLowerCase() + "SE" + sourceDetailVal.substring(pos, sourceDetailVal.length) + " - Email Subscription Web Footer";
    }
    aform.find("input[name='SourceDetail__c']").attr("Value", sourceDetailVal); //Set SourceDetails
    var d = new Date();
    aform.find("input[name$='mailFooterPostingDate']").attr("Value", d.toUTCString()); //Set ISO DateTime - Use the toUTCString method
    aform.find("input[name='Email']").attr("placeholder", "Email"); //Set Email
    //aform.find("input[name='Email']").attr("value","Email"); //Set Email
}


initRegistrationForm_2399($("#mktoForm_2399"));
$("#mktoForm_2399").find("input[name='_mktoReferrer']").attr("value", window.location);
$("#mktoForm_2399").find("input[name='referringURL']").attr("value", document.referrer);
var ck = document.cookie.split(";"), cVal = '';
for (i = 0; i < ck.length; i++) {
    if (ck[i].split('=')[0].trim() == '_mkto_trk') {
        if (typeof ck[i].split('=')[1] == 'undefined') {
            cVal = '';
        } else {
            cVal = ck[i].split('=')[1];
        }
    }
}
cVal = decodeURIComponent(cVal);
$("#mktoForm_2399").find("input[name='_mkt_trk']").attr("value", cVal);
$("#mktoForm_2399").submit(function() {
    $(".tooltip").remove();
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!re.test($("#mktoForm_2399").find("input[name='Email']").val())) {
        var input = $("#mktoForm_2399").find("input[name=Email]");
        var tooltip = $("<span class=\"tooltip\">Votre email n'est pas valide</span>");
        $(".tooltip").remove();
        $(tooltip).clone().appendTo("body")
            .offset(input.offset())
            .css({"margin-top": input.outerHeight() + 8})
            .css({"margin-left": input.outerWidth() * .15})
            .css({"color": "#D90749"})
            .fadeIn(100).delay(6000)
            .fadeOut(100, function() {
                $(this).remove();
            });
        return false;
    }
    $.post(sdltfoRootUrl.replace(/\/+$/, "") + '/responsys/submit.request', {
        "pageUri": "tcm:30-17355",
        "responsys-settings": "tcm:30-17355",
        "email": $("#mktoForm_2399").find("input[name='Email']").val()
    }).done(function(result) {
        console.log("responsys request post success");
        var formData = {};
        var fields = $("#mktoForm_2399").serializeArray();
        $.each(fields, function(i, field) {
            formData[field.name] = field.value;
        });
        $.post(sdltfoRootUrl.replace(/\/+$/, "") + '/marketo/submit.request', formData
        ).done(function(result1) {
            console.log("marketo request post success");
            displayPopupSuccessRegistration_2399();
            // If user already signed up, disable popin from displaying. Popin code will check for this cookie.
            if (getCookie('newsletterPopInDisplay').length <= 0) {
                setCookie('newsletterPopInDisplay', '0', 365 * 10);
            }
        }).fail(function(result1) {
            console.log("marketo request post failed : " + result1);
            alert('Error registration 2');
        });
    }).fail(function(result) {
        console.log("responsys request post failed : " + result);
        alert('Error registration 1');
    });
    return false;
});


var MESSAGE_OUTDATED_BROWSER = '<span class="version">%s</span><span class="message">Pour une meilleure utilisation, nous vous recommandons de mettre à jour votre navigateur en installant la dernière version disponible. Vous bénéficierez, ainsi, des dernières fonctionnalités et technologies utilisées sur ce site.</span>';

function setCookieWithMainDomain(cookiename, value, d, isFirst) {
    var d = d || {toUTCString: function(){return 'asd'}};
    var strDomain = document.domain;
    var arrDomain = strDomain.split(".");
    arrDomain.shift();
    strDomain = arrDomain.join(".");
    strDomain = "." + strDomain;
    if (typeof isFirst != 'undefined' && isFirst == true) {
        document.cookie = "optListExp=" + encodeURIComponent(d.toUTCString()) + ";path=/;domain=" + strDomain + ";expires=" + d.toUTCString();
        document.cookie = cookiename + "=" + encodeURIComponent(value) + ";path=/;domain=" + strDomain + ";expires=" + d.toUTCString();
    } else if (d == -1) {
        document.cookie = cookiename + "=" + encodeURIComponent(value) + ";path=/;domain=" + strDomain + ";expires=" + d.toUTCString();
    } else {
        var getExpiry = getCookieValue('optListExp');
        if (getExpiry == '') {
            document.cookie = "optListExp=" + encodeURIComponent(d.toUTCString()) + ";path=/;domain=" + strDomain + ";expires=" + d.toUTCString();
            getExpiry = getCookieValue('optListExp');
        }
        document.cookie = cookiename + "=" + encodeURIComponent(value) + ";path=/;domain=" + strDomain + ";expires=" + getExpiry;
    }
}
function getCookieValue(cookieName) {
    var ck = document.cookie.split(";"), cVal = '';
    for (i = 0; i < ck.length; i++) {
        if (ck[i].split('=')[0].trim() == cookieName) {
            if (typeof ck[i].split('=')[1] == 'undefined') {
                cVal = '';
            } else {
                cVal = ck[i].split('=')[1];
            }
        }
    }
    return decodeURIComponent(cVal);
}
function appendCountryCode(country) {
    var cValue = getCookieValue('optList');
    if (cValue.indexOf(country) == -1) {
        cValue = cValue + country + '_0,';
        setCookieWithMainDomain('optList', cValue);
    }
}
var c_expiry = new Date();
c_expiry.setTime(c_expiry.getTime() + (365 * 24 * 60 * 60 * 1000));
var cntr_code = 'B:fr';
var cVal = getCookieValue('optList');
if (cVal !== "") {
    if (cVal.indexOf(cntr_code) > -1) {
        if (cVal.indexOf(cntr_code + '_0') > -1) {
            setCookieWithMainDomain('mkto_preference', true);
            setCookieWithMainDomain('mkto_expiry', c_expiry);
        } else if (cVal.indexOf(cntr_code + '_1') > -1) {
            setCookieWithMainDomain('mkto_preference', false);
            setCookieWithMainDomain('mkto_expiry', c_expiry);
        }
    } else {
        appendCountryCode(cntr_code);
        setCookieWithMainDomain('mkto_preference', true);
        setCookieWithMainDomain('mkto_expiry', c_expiry);
    }
} else {
    setCookieWithMainDomain('mkto_preference', true, c_expiry, true);
    setCookieWithMainDomain('mkto_expiry', c_expiry, c_expiry);
    setCookieWithMainDomain('optList', '', c_expiry);
    appendCountryCode(cntr_code);
}

var MESSAGE_COOKIE_NOTIFICATION = '<div id="cookie-notification" class="notification"><div><span><a class="notification-close"><span>×</span></a><p>Ce site web utilise des cookies. Certains permettent un bon fonctionnement du site et d autres vous apportent des contenus adaptés. Pour en savoir plus et savoir comment refuser les cookies vous pouvez <a href="http://www.schneider-electric.fr/sites/france/fr/general/mentions-legales/mentions-legales.page">cliquer ici</a>. En choisissant de poursuivre la navigation nous présumons que vous acceptez notre utilisation des cookies. </p></span></div></div>';
if (cVal !== "") {
    if (cVal.indexOf(cntr_code) <= -1) {
        $('body').prepend(MESSAGE_COOKIE_NOTIFICATION);
    }
} else {
    $('body').prepend(MESSAGE_COOKIE_NOTIFICATION);
} 
