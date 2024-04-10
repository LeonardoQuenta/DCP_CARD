function selectLanguages(value){
    var action  = 'lang/'+ "@id",
        action  = action.replace("@id", value);

    $("#formLanguage").prop("action", action);
    $('#submit').click();
}

window.selectLanguages = selectLanguages;

var x = window.matchMedia("(max-width: 670px)");

if(x.matches){
    $("body > div.profile-page.tx-13.m-b-50 > div > div > div > div > div.row.language-currency > label").text($("#localeSession").val() == "es" ? "IDIOMA" : "LANGUAGE")
}


function iconFromValue(val){
    if(val.element){
        val = `<span class="select2-option-img"><img src="${val.element.dataset.getRoute}"><span> ${val.text}`;
    }
    return val;
}

function check(id) {
    if(document.getElementById(id).checked){
      $(`#${id}`).val(1)
    }else{
      $(`#${id}`).val(0)
    }
}

window.check = check;


$(".select2").select2({
    dropdownAutoWidth: true,
    width: "100%",
    minimumResultsForSearch: -1,
    language: {
        noResults: function () {
            return $("#localeSession").val() == "es" ? "No se encontraron resultados." : "No results found.";
        },
        searching: function () {
            return $("#localeSession").val() == "es" ? "Buscando..." : "Searching...";
        },
    },
    templateResult: iconFromValue,
    templateSelection: iconFromValue,
    escapeMarkup: function(m) { return m; }
});

$(".letras_numeros").bind("keypress", function(event) {
    var regex = new RegExp("^[a-zA-ZäÄëËïÏöÖüÜáéíóúÁÉÍÓÚñÑ 0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
    event.preventDefault();
    return false;
    }
});

$(".letras_extra").bind("keypress", function(event) {
    var regex = new RegExp("^[ &#?:/a-zA-ZäÄëËïÏöÖüÜáéíóúÁÉÍÓÚñÑ0-9@()\._-]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
    event.preventDefault();
    return false;
    }
});

$(".solo_letras").bind("keypress", function (event) {
    var regex = new RegExp("^[a-zA-ZäÄëËïÏöÖüÜáéíóúÁÉÍÓÚñÑ ]+$");
    var key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
    );
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});

$(".solo_numeros_telefono").bind("keypress", function (event) {
    var regex = new RegExp("^[0-9-+()]+$");
    var key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
    );
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});

/*Validar formato de correo*/
$.validator.addMethod("is_email", function (value, element) {
    return (
        this.optional(element) ||
        value ==
            value.match(
                /^[a-zA-Z0-9._-]+[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/i
            )
    );
});


/*Validar formato de telefono*/
$.validator.addMethod("is_phone", function (phone_number, element) {
    if (phone_number.length > 7 && phone_number.length < 12) {
        return (
            this.optional(element) ||
            phone_number.match(/^(\+?[1-9]{1,4})?([0-9-]{7,13})$/)
        );
    } else {
        return true;
    }
})

jQuery.validator.addMethod("name_company", function (value, element) {
    return this.optional(element) || /^[ &#?:/a-zA-ZäÄëËïÏöÖüÜáéíóúÁÉÍÓÚñÑ0-9@()\._-]+$/i.test(value);
}, $("#localeSession").val() ? "Nombre de la empresa contiene caracteres no permitidos." : "Name of the company contains invalid characters.");

$(".mask-phone").inputmask({ mask: "999-999-999" });

    const showSwalTop = (type,message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            // timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: type,
            title: message
        })
    };

$("#interChangeContact form").validate({
    rules: {
        first_name: {
            required: true,
            maxlength: 30
        },
        last_name: {
            required: true,
            maxlength: 30
        },
        company_name: {
            required: true,
            maxlength: 1000,
            name_company: true
        },
        primary_email: {
            is_email: true,
            required: true,
            maxlength: 80
        },
        primary_phone: {
            required: true,
            is_phone:true
        },

    },
    messages: {
        first_name: {
            required: $("#localeSession").val() == "es" ? "Su nombre es requerido" : "Name is required",
            maxlength: $("#localeSession").val() == "es" ? "Máximo 30 caracteres" : "Maximum 30 characters"
        },
        last_name: {
            required: $("#localeSession").val() == "es" ? "Su apellido es requerido" : "Lastname is required",
            maxlength: $("#localeSession").val() == "es" ? "Máximo 30 caracteres" : "Maximum 30 characters"
        },
        primary_email: {
            required: $("#localeSession").val() == "es" ? "El correo es requerido" : "E-mail is required",
            is_email: $("#localeSession").val() == "es" ? "Formato de correo inválido" : "Invalid e-mail format",
            maxlength: $("#localeSession").val() == "es" ? "Máximo 80 caracteres" : "Maximum 80 characters"
        },
        company_name: {
            required: $("#localeSession").val() == "es" ? "La empresa es requerida" : "Company is required",
            maxlength: $("#localeSession").val() == "es" ? "Máximo 1000 caracteres" : "Maximum 1000 characters"
        },
        primary_phone: {
            required: $("#localeSession").val() == "es" ? "Ingrese su número de contacto" : "Phone is required",
            is_phone: $("#localeSession").val() == "es" ? "Número de teléfono incompleto" : "Invalid phone number"
        },

    },
    highlight: function (element) {
        $(element).parent().addClass('has-error')
    },
    unhighlight: function (element) {
        $(element).parent().removeClass('has-error')
    },
    errorElement: 'span',
    errorClass: 'error',
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});


/* Interchange contact */
$(`#btn-send-success`).click(function () {
    var dataFrom = $(`#interChangeContact form`).serialize();
    var urlSend = $(`#interChangeContact form`).attr("action");

    var id_form = $(`#interChangeContact form`).attr("id");
    if (!$("#" + id_form).valid()) {
        return true;
    }

    if( $('#checkbox_policies').is(':checked') ) {

    $.ajax({
        url: urlSend,
        type: "POST",
        data: dataFrom,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            $(".show_wait_load").removeClass("d-none");
            $(".actions").hide();
        },
        complete: function () {
            $(".show_wait_load").addClass("d-none");
            $(".actions").show();
        },
        success: function (data) {
            if (data.status == true) {
                $(".input_inter_change").val("");
                $('#checkbox_policies').val(0);
                $('#checkbox_policies').prop( "checked", false );
                $(".block-policies").removeClass('efect-checkbox');
                showSwalTop('success',data.message);
                $(`#interChangeContact`).modal("hide");
                return false;
            }
            showSwalTop('info',data.message);
        },
        error: function (data) {
            showSwalTop('error',$("#localeSession").val() == "es" ? "Ocurrio un error mientras se realizaba el proceso intente más tarde." : "An error occurred while processing, please try again later.");
        },
    });
    return false;

    }else{
        $(".block-policies").addClass('efect-checkbox');
        showSwalTop('info',$("#localeSession").val() == "es"  ? '<div class="text-center text-danger">Debe aceptar las políticas de privacidad</div>' : '<div class="text-center text-danger">You must accept the privacy policies</div>');
    }
});


$(window).on("load", function() {
    sessionStorage.setItem("image-profile", $("body > div.profile-page > div > div > div > div > div > div > div > div.col-lg-4.offset-lg-2.col-md-12.col-sm-12.col-xs-12 > div > img.profile-pic").attr("src"));
    $(".image-load").val(sessionStorage.getItem("image-profile"));
    $("#btn-store-contactform").removeClass('disabled');
    sessionStorage.removeItem("image-profile");
    // console.log(sessionStorage.getItem("image-profile"))
});

//  Funcionalidad cambio de colores en el banner

let button1 = $("#button_color").val(),
        letter = $("#color_letter").val();

    // Estilo personalizado
    const styleCustomize = `
        background-color: ${button1} !important;
        color: ${letter} !important;
        border-color: ${button1} !important;`;

    //Estilo por default
    const styleDefault = `
        background-color: #fff !important;
        color: #000; !important;
        border-color: none`;

    //Estilo por default mobile
    const styleDefaultMobile = `
        background-color: #FFF !important;
        color: #3C82FF !important;
        border-color: 1px solid #3C82FF !important`;

    // Buton activo por default
    const element = document.querySelector(".tab-profile-button");
    element.style.cssText = styleCustomize;

    function changeStyle() {
        event.preventDefault();

        const selectButton = document.querySelectorAll('button.nav-link.m-1');

        selectButton.forEach(e => {
            // console.log(e.classList.contains("active"))
            if(e.classList.contains("active")){
                e.style.cssText = styleCustomize;
            }else{
                e.style.cssText = styleDefault;
            }
        });
    }


    // Buton activo por default mobile
    const elementMobile = document.querySelector("button.accordion-button");
    elementMobile.style.cssText = styleCustomize;

    function changeStyleMobile() {
        event.preventDefault();

        const selectButton = document.querySelectorAll('button.accordion-button');

        selectButton.forEach(mobile => {
            // console.log(mobile.getAttribute("aria-expanded"))
            if(mobile.getAttribute("aria-expanded") && !mobile.classList.contains("collapsed")){
                mobile.style.cssText = styleCustomize;
            }else{
                mobile.style.cssText = styleDefaultMobile;
            }
        });
    }

    // Conteo de click solo para los enlaces con la clase .link-count
    $("a.link-count").click(function() {
        // e.preventDefault();

        let _this       = $(this),
            profileId   = $("#profile_id").val(),
            rrss        = $(this).data('rrss'),
            href        =  _this.attr("href");

            _this.attr("disabled",true);
            _this.addClass("disabled",true);

        $.ajax({
            url: 'count-link-click',
            type: 'POST',
            // async: false,
            data: {link:rrss,url:href,profile_id:profileId},
            success: function(data) {
                if(data.status){
                    _this.attr("href",href);
                    _this.attr("disabled",false);
                    _this.removeClass("disabled",false);
                }
            }
        });
    });

//     var footerHeight = 0,
//         footerTop = 0,
//         $footer = $("#footer");

//     positionFooter();

//     function positionFooter() {

//         footerHeight = $footer.height();
//         footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";

//         if (($(document.body).height() + footerHeight) < $(window).height()) {
//             $footer.css({
//                 position: "absolute"
//             }).animate({
//                 top: footerTop
//             })
//         } else {
//             $footer.css({
//                 position: "static"
//             })
//         }

//     }

//     $(window)
//         .scroll(positionFooter)
//         .resize(positionFooter)

// });


function selectTabDefault(){

    // Desktop
    let tabItem = document.getElementsByClassName('tab-profile-button'),
        tabLink = tabItem[0],

        tabItemDiv = document.getElementsByClassName('tab-profile-active'),
        tabLinkDiv = tabItemDiv[0],
    // Mobile
        tabItemMobile = document.getElementsByClassName('accordion-collapse'),
        tabLinkMobile = tabItemMobile[0];


    if(tabLink != null && tabLinkDiv != null){
        tabLink.className += ' active';
        tabLinkDiv.className += ' show active';
    }

    if(tabLinkMobile != null){
        tabLinkMobile.className += ' collapse show';
    }
}

window.selectTabDefault = selectTabDefault;

selectTabDefault();

// Verificar algunos tabs para mostrar si tiene contenido o no
// Bloque extra
const countBlockExtra = () => {

    let countBlockExtra = document.querySelectorAll(".block-additional-links > p > span");

    if(countBlockExtra.length >= 1){
        $(".info-not-load-1").addClass('d-none');
        $(".block-additional-links").removeClass('d-none');
        return false;
    }

    $(".info-not-load-1").removeClass('d-none');
    $(".block-additional-links").addClass('d-none');

};
// Bloque empresa
const countBlockEnterprise = () => {

    let countBlockEnterprise = document.querySelectorAll(".block-rrss-enterprise > a");

    if(countBlockEnterprise.length >= 1){
        $(".info-not-load").addClass('d-none');
        $(".block-rrss-enterprise").removeClass('d-none');
        return false;
    }

    $(".info-not-load").removeClass('d-none');
    $(".block-rrss-enterprise").addClass('d-none');

};
countBlockExtra();
countBlockEnterprise();


function showMessageInfo(message) {
    showSwalTop('info',message);
}

window.showMessageInfo = showMessageInfo;


// Descarga de contacto directo
$(".btn-store-contact,.store-mobile").click(function(e) {
    showSwalTop('success',$("#localeSession").val() == "es" ? "Descargando información espere un momento por favor." : "Downloading information please wait a moment.");

    $('.btn-store-contact,.store-mobile').prop("disabled", true);
    $('.btn-store-contact,.store-mobile').addClass("disabled");
    $('#form_store_contact').attr("action", 'store-contact');
    $('#form_store_contact').submit();
    setTimeout(function() {
        $('.btn-store-contact,.store-mobile').prop("disabled", false);
        $('.btn-store-contact,.store-mobile').removeClass("disabled");
    }, 5000);
});
