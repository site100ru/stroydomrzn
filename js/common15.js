var $ = jQuery.noConflict();

$("body").on("contextmenu", false);

function windowSize() {

}


// или "два-в-одном", вместо двух последних строк:
$(window).on('load resize', windowSize);

$(document).ready(function () {
    $('.topmenu .child').bind('click', function () {
        cur_id = $(this).attr('id');
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.topmenu .child#' + cur_id + ' ul').hide();
        } else {
            $(this).addClass('open');
            $('.topmenu .child#' + cur_id + ' ul').show();
        }
    });


    $('.list_spicers1').children().prependTo($('.list_spicers3'))
    $('.list_spicers2').children().prependTo($('.list_spicers3'))

    block_4s = $('.block_4')
    if (block_4s[0]) {
        block_4s[0].remove()
    }
    if (block_4s[1]) {
        block_4s[1].remove()
    }


    speakersBlocks = $('.list_spicers .el')
    speakersCounter = speakersBlocks.length
    for (var j = 11; j < speakersCounter - 1; j++) {
        $(speakersBlocks[j]).addClass('speakers-hidden');
    }

    $('#more_spick').on('click', function (e) {
        e.preventDefault
        var
            count = 8;
        $loadMoreBlocks = $('.speakers-hidden'),
            loadMoreBlocks_count = $loadMoreBlocks.length;

        if (loadMoreBlocks_count / count > 1) {
            for (var j = 0; j < count; j++) {
                $($loadMoreBlocks[j]).removeClass('speakers-hidden');
            }
        } else {
            for (var j = loadMoreBlocks_count - 1; j >= 0; j--) {
                $($loadMoreBlocks[j]).removeClass('speakers-hidden');
            }
            $(this).addClass('d-none');
        }


    })

    $('.extraInfo svg').on('click mosedown touchstart', function () {
        target = $(this).next('.extraInfo--popup')
        if (target.hasClass('active')) {
            target.removeClass('active')
        } else {
            target.addClass('active')
        }
    })

    $('.el').on('mouseleave', function () {
        target = $(this).find('.extraInfo--popup')
        if (target.hasClass('active')) {
            target.removeClass('active')
        }
    })

    $('.programm__part__showHidden').on('click', function (e) {
        $('.programm__part2').addClass('programm__part2--oppened')
        this.remove()
    })

    if ($(window).width() <= 1200) {
        $('.programm__video2--1 .scheduleList').children().prependTo($('.programm__video1--1 .scheduleList'))
    }

    if ($('.premiumPerks')[0]) {
        headerHeight = $('.siteHeader__body').height()
        $('.premiumPerks').css('padding-top', headerHeight)
    }

    // ComplectsTabs functionality
    $('.complectsTabs__item').on('click', function(e) {
        e.preventDefault();

        var clickedIndex = $(this).index();

        // Remove active class from all tab items
        $('.complectsTabs__item').removeClass('active');

        // Add active class to clicked tab item
        $(this).addClass('active');

        // Remove active class from all tab bodies
        $('.complectsTabs__body').removeClass('active');

        // Add active class to corresponding tab body
        $('.complectsTabs__body').eq(clickedIndex).addClass('active');
    });
});


$(document).ready(function () {
    init();
    dop_images();
});
$(window).resize(function () {
    floating_block();
    floating_bottom_block();
});

function preload(data_load, i) {


}

var load_dialog_map = false;
if (typeof (data_load) != 'undefined') {
    $(window).scroll(function () {
        if (false) { // data_load отключён: донорские фото /image/cache/data отсутствуют
            for (i = 0; i < data_load.length; i++) {
                var _o = $(data_load[i].el_id).offset(); if(!_o){ data_load.splice(i,1); i--; continue; } var l_block = _o.top
                if ((l_block - $(window).scrollTop() > 0) && (l_block - $(window).scrollTop() < window.innerHeight + 2800)) {
                    $(data_load[i].template).appendTo(data_load[i].el_id);

                    data_load.splice(i, 1);
                    imgLoad();
                    formsMask();
                    loadLazyImages();

                }

                //map dialog
                $('.show-map').bind('click', function (e) {
                    e.preventDefault();
                    $("#dialog-form").dialog({
                        autoOpen: false,
                        modal: true,
                        title: '',
                        dialogClass: 'dialog_map',
                        close: function () {
                            load_dialog_map = false;
                        }
                    });
                    html = '';
                    if (!load_dialog_map) {
                        load_dialog_map = true;
                        $.get("/index.php?route=information/building", function (data) {

                            html += '<div class="head_map block_black"><div class="container">';
                            html += '<div class="h3 text-uppercase margin_0 col-md-4">Карта наших<br/>объектов</div>';
                            html += '<div class="col-md-6">Заполните форму обратной связи и наш менеджер подберет для Вас удобное транспортное направление, а также нужный этап строительства объекта для просмотра.</div>';
                            html += '<div class="col-md-2"><a href="" onclick="getForm({id:\'order_call\',mailindex:5,title:\'Связаться с нами\',button:\'Отправить\',utm:\'discont\',fields:{name:\'require\',phone:\'require\',project1:\'\',locality:\'\'}});return false;" class="btn btn-fixed-width">Связаться с нами</a></div>';
                            html += '</div></div>';
                            html += data;
                            $("#dialog-form").html(html);
                            $("#dialog-form").dialog("open");
                        });
                    }
                });


            }

            init();
        }

        return false;
    });
}

function init() {
    slick_nav();
    imgLoad();
    owl_carousel();

    owl_cloned();
    photobox();
    nav_tabs();
    accord();
    tabs_mini();
    ful_d_right();
    setTimeout(floating_block, 100);
    floating_block();
    setTimeout(floating_bottom_block, 100);
    floating_bottom_block();
    carousel_swipe();
}


//Search
$(document).ready(function () {
    $('#search').bind('click', function () {
        if ($(this).hasClass('full_search')) {

        } else {
            $(this).addClass('full_search');
            $('input[name="filter_name"]').focus();
            $('.button-search').bind('click', function () {
                s();
            });
        }
    });
    $(document).mouseup(function (e) {
        var container = $('#search');
        if (container.has(e.target).length === 0) {
            $(container).removeClass('full_search');
            $('.button-search').unbind('click');
        }
    });
});
//End Search

//Menu
$(document).ready(function () {
    $('#close_navbar').bind('click', function () {
        $('.navbar').removeClass('full_menu');
        $('button.navbar-toggle').attr('aria-expanded', 'false');
        $('div#bs-example-navbar-collapse-1').attr('aria-expanded', 'false');
        $('div#bs-example-navbar-collapse-1').removeClass('in');
    });
});
//end menu

//Фильтр в категориях
$(document).ready(function () {
    if (getCookie("full_filter") != undefined && getCookie("full_filter") == 1) {
        $($('#but_filter').parent()).addClass('full_filter');
        $('#but_filter').parent().removeClass('short_filter');
        $('#but_filter .text').html('Свернуть фильтры');

    } else {
        $($('#but_filter').parent()).addClass('short_filter');
        $('#but_filter').parent().removeClass('full_filter');
        $('#but_filter .text').html('Развернуть фильтры');
    }

    $('#but_filter').bind('click', function () {
        if ($(this).parent().hasClass('full_filter')) {
            $($(this).parent()).removeClass('full_filter');
            $(this).parent().addClass('short_filter');
            $('#but_filter .text').html('Развернуть фильтры');
            setCookie("full_filter", "0", {
                expires: 2592000,
                path: '/'
            });
        } else {
            $($(this).parent()).addClass('full_filter');
            $(this).parent().removeClass('short_filter');
            $('#but_filter .text').html('Свернуть фильтры');


            setCookie("full_filter", "1", {
                expires: 2592000,
                path: '/'
            });
        }
    });
    $('.tags .head_tags .but_tag').on('click', function () {
        if ($(this).hasClass('hide_t')) {
            $(this).removeClass('hide_t');
            $(this).html('развернуть теги');
            $(this).addClass('show_t');
            $('.tags .list_tag').slideUp();
        } else {
            $(this).removeClass('show_t');
            $(this).html('свернуть теги');
            $(this).addClass('hide_t');
            $('.tags .list_tag').slideDown();
        }


    });
});

// End Фильтр в категориях


function send(data) {
    var rule = {
        name: {},
        lastname: {},
        phone: {},
        region: {},
        mail: {},
        comment: {},
        project: {},
        project1: {},
        locality: {},
        price_house: {},
        sum_credit: {},
        time_credit: {},
        accessories: {},
        count_tickets: {},
        promo: {}
    };
    var validateEvents = {onfocusout: true, onkeyup: true, onclick: true, onsubmit: true};
    if (data.fields.name == 'require') {
        rule.name = {
            required: true,
            minlength: 2,
            NameFormat: true
        }
    }
    if (data.fields.lastname == 'require') {
        rule.lastname = {
            required: true,
            minlength: 2
        }
    }
    if (typeof data.fields.promo != "undefined") {
        rule.promo = {
            required: (data.fields.promo == 'require') ? true : false,
            minlength: 4
        }
    }
    if (data.fields.locality == 'require') {
        rule.locality = {
            required: true,
            minlength: 2
        }
    }
    if (data.fields.price_house == 'require') {
        rule.price_house = {
            required: true,
            minlength: 2,
            number: true
        }
    }
    if (data.fields.sum_credit == 'require') {
        rule.sum_credit = {
            required: true,
            minlength: 2,
            number: true
        }
    }
    if (data.fields.count_tickets == 'require') {
        rule.count_tickets = {
            required: true,
            minlength: 1,
            number: true
        }
    }
    if (data.fields.time_credit == 'require') {
        rule.time_credit = {
            required: true,
            number: true
        }
    }
    if (data.fields.phone == 'require') {
        rule.phone = {
            required: true,
            PhoneFormat: true,
        }
    }
    if (data.fields.mail == 'require') {
        rule.mail = {
            required: true,
            email: true
        }
    }
    if (data.fields.comment == 'require') {
        rule.comment = {
            required: true,
            minlength: 10
        }
    }
    if (data.fields.project1 == 'require') {
        rule.project1 = {
            required: true,
            minlength: 2
        }
    }
    if (data.fields.region == 'require') {
        rule.region = {
            required: true,
            minlength: 2,
            RegionFormat: true
        }
    }
    if (data.fields.project) {
        if (data.fields.project.valid == 'require') {
            rule.project = {
                required: true
            }
        }
    }
    if (data.error == 'dialog') {
        validateEvents.onfocusout = false;
        validateEvents.onkeyup = false;
        validateEvents.onclick = false;
    }

    $("#form_" + data.id).validate({
        rules: rule,
        onfocusout: validateEvents.onfocusout,
        onkeyup: validateEvents.onkeyup,
        onclick: validateEvents.onclick,
        onsubmit: validateEvents.onsubmit,
        messages: {
            mail: {
                required: "Нужно указать email адрес",
                email: "Email адрес должен быть корректным"
            },
            phone: {
                required: "Нужно указать ваш телефон",
                PhoneFormat: "Не верный формат телефона"
            },
            name: {
                required: "Нужно указать ваше имя",
                minlength: "Нужно указать ваше имя",
                NameFormat: "Имя должно содержать только буквы!"
            },
            lastname: {
                required: "Нужно указать вашу фамилию",
                minlength: "Нужно указать вашу фамилию"
            },
            locality: {
                required: "Нужно указать интересующий вас район",
                minlength: "Нужно указать интересующий вас район"
            },
            project1: {
                required: "Нужно указать интересующий вас проект",
                minlength: "Нужно указать интересующий вас проект"
            },
            time_credit: {
                required: "Нужно указать время кредита",
                number: "Нужно указать время кредита"
            },
            price_house: {
                required: "Нужно указать стоимость дома",
                minlength: "стоимость дома слишком мала",
                number: "Укажите только число"
            },
            sum_credit: {
                required: "Нужно указать сумму кредита",
                minlength: "Слишком маленькая сумма кредита",
                number: "Укажите только число"
            },
            count_tickets: {
                required: "Неверно указано количество билетов",
                minlength: "Неверно указано количество билетов",
                number: "Неверно указано количество билетов"
            },
            project: {
                required: "Выберите проект"
            },
            comment: {
                required: "Поле обязательное для заполнения",
                minlength: "Поле обязательное для заполнения"
            },
            region: {
                required: "Поле обязательное для заполнения",
                minlength: "Поле обязательное для заполнения",
                RegionFormat: "Регион должен содержать только буквы!"
            }
        },
        errorPlacement: function (error, element) {
            if (data.error == 'dialog') {
                $("#dialog-form").dialog("destroy");
                $("#dialog-form").dialog({
                    autoOpen: false,
                    height: 55,
                    width: 320,
                    modal: true,
                    title: 'Ошибка ввода телефона'
                });

                html = '';
                for (i = 0; i < error.length; i++) {

                }
                $('#dialog-form').html(html);
                $("#dialog-form").dialog("open");
            } else {
                error.appendTo(element.next());
                element.next().show();
            }
        },
        submitHandler: function (form) {
            var timeStamp = Math.floor(Date.now());
            $("#form_" + data.id).append('<input type="hidden" name="track_code" value="' + timeStamp + '"/>');
            if (data.data_foto) {
                $("#form_" + data.id).append('<input type="hidden" name="data_foto" value="' + data.data_foto + '"/>');
            }
            var d = new Date();
            if (d.getDay() == 0 || d.getHours() >= 19) {
                $("#form_" + data.id).append('<input type="hidden" name="out_time" value="1"/>');
            }

            if ($('[data-project_model]').length) {
                $("#form_" + data.id).append('<input type="hidden" name="project_model" value="' + $('[data-project_model]').data('project_model') + '"/>');
            }
            if ($('[data-project_material]').length) {
                $("#form_" + data.id).append('<input type="hidden" name="project_material" value="' + $('[data-project_material]').data('project_material') + '"/>');
            }

            if (typeof (data.return_url) == 'undefined') {
                data.return_url = window.location.href;
            }
            $("#form_" + data.id).append('<input type="hidden" name="return_url" value="' + data.return_url + '"/>');
            if (data.auto_answer_template) {
                $("#form_" + data.id).append('<input type="hidden" name="auto_answer_template" value="' + data.auto_answer_template + '"/>');
            }
            if (data.auto_answer_sms) {
                $("#form_" + data.id).append('<input type="hidden" name="auto_answer_sms" value="' + data.auto_answer_sms + '"/>');
            }
            if (data.mail_title) {
                $("#form_" + data.id).append('<input type="hidden" name="mail_title" value="' + data.mail_title + '"/>');
            }
            if (typeof (data.fields.project) != 'undefined' && typeof (data.fields.project.hidden) != 'undefined') {
                $("#form_" + data.id).append('<input type="hidden" name="project" value="' + data.fields.project.id + '"/>');
            }
            if (typeof (data.fields.price_to_crm) != 'undefined') {
                $("#form_" + data.id).append('<input type="hidden" name="our_price" value="' + data.fields.price_to_crm + '"/>');
            }

            if (typeof (data.utm_to_crm) != 'undefined') {
                $("#form_" + data.id).append('<input type="hidden" name="utm_to_crm" value="' + data.utm_to_crm + '"/>');
            }
            captcha_key_site_v3 = '6Le7itolAAAAAG85tVBl2yl8v5nEGAmhJ3Oxzr_N';
            if (typeof grecaptcha != 'undefined' && typeof captcha_key_site_v3 != 'undefined') {
                grecaptcha.ready(function () {
                    grecaptcha.execute(captcha_key_site_v3, {action: 'submit'}).then(function (token) {
                        if(token) {
                            if ($("#form_" + data.id).find('input[name="captcha_token_v3"]').length > 0) {
                                $("#form_" + data.id).find('input[name="captcha_token_v3"]').val(token)
                            } else {
                                $("<input>").attr({
                                    type: 'hidden',
                                    name: 'captcha_token_v3',
                                    value: token
                                }).appendTo("#form_" + data.id);
                                console.log($("#form_" + data.id).find('input[name="captcha_token_v3"]'));
                            }
                            $("#form_" + data.id).ajaxForm();
                            // отправим форму - большинство параметров как у $.ajax()
                            $("#form_" + data.id).ajaxSubmit({
                                url: $("#" + data.id).attr("action"),
                                dataType: 'json',
                                beforeSend: function () {

                                    if ($("#dialog-form").dialog("instance")) {

                                        $("#dialog-form").dialog("close");
                                        $("#dialog-form").dialog("destroy");
                                    }
                                    $("#dialog-form").dialog({
                                        autoOpen: false,

                                        modal: true,
                                        title: '<p style="color:#fff;text-align:center;font-size:25px!important;">Сообщение отправляется</p>'
                                    });
                                    html = '<div  class="dialog_loading"><p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">';
                                    html += 'Ваша заявка отправляется.</p><p style="text-align:center;min-height:150px;"><img style="width:150px;"src="/catalog/view/theme/aps2019/image/loading_dialog.gif" /></p></div>';
                                    $('#dialog-form').html(html);
                                    $("#dialog-form").dialog("open");
                                },
                                success: function (json) {

                                    if (json) {
                                        if (json.redirect) {
                                            window.location = json.redirect;
                                            return false;
                                        } else {
                                            if ($("#dialog-form").dialog("instance")) {
                                                $("#dialog-form").dialog("close");
                                                $("#dialog-form").dialog("destroy");
                                            }

                                            window.dataLayer = window.dataLayer || [];
                                            window.dataLayer.push({
                                                'event': 'all_forms',
                                                'category': 'send_form',
                                                'action': data.utm
                                            });

                                            $('input[name=\'track_code\']').remove();


                                            if (!json.error_subscr && !json.error_field) {
                                                $("#dialog-form").dialog({
                                                    autoOpen: false,
                                                    modal: true,
                                                    title: '<p style="color:#fff;text-align:center;font-size:25px!important;">Спасибо!</p>'
                                                });

                                                if (typeof (data.redirect_to) != 'undefined') {

                                                    html += '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Вы так же можете перейти на основной сайт и познакомится с компанией АПС ДСК.</p>';

                                                    html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="window.location = \'' + data.redirect_to + '\';return false;">Перейти</span></p>';
                                                } else {
                                                    html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="$( \'#dialog-form\' ).dialog( \'close\' );">Вернуться на сайт</span></p>';
                                                }


                                                if ($("#dialog-form").dialog("instance")) {
                                                    html = '';
                                                    var d = new Date();
                                                    if (data.mailindex == 6) {
                                                        html += '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Благодарим вас за подписку. В ближайшее время мы вернемся к вам с новой и интересной информацией!</p>';
                                                    }
                                                    else if (d.getDay() == 0 || d.getHours() >= 19) {
                                                        html += '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Ваша заявка принята в обработку. С вами свяжутся завтра как можно скорее.</p>';
                                                    } else {
                                                        html += '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Ваша заявка принята в обработку. Менеджер свяжется с вами в течение 60 минут.</p>';
                                                    }
                                                    html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="$( \'#dialog-form\' ).dialog( \'close\' );">Вернуться на сайт</span></p>';
                                                    console.log(data.mailindex)
                                                    if (data.mailindex == 6) {
                                                        console.log('sub')
                                                    }
                                                }


                                            } else {

                                                $("#dialog-form").dialog({
                                                    autoOpen: false,
                                                    modal: true,
                                                    title: '<p style="color:#fff;text-align:center;font-size:25px!important;">Ошибка!</p>'
                                                });

                                                if (json.error_field) {
                                                    html = '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Форма заполнена не верно или не верный способ отправки.</p>';
                                                    html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="$( \'#dialog-form\' ).dialog( \'close\' );">Вернуться на сайт</span></p>';
                                                } else {
                                                    html = '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Такой E-mail уже зарегистрирован. Введите другой E-mail.</p>';
                                                    html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="$( \'#dialog-form\' ).dialog( \'close\' );">Вернуться на сайт</span></p>';
                                                }
                                            }

                                            $('#dialog-form').html(html);
                                            $("#dialog-form").dialog("open");

                                        }

                                    }

                                }
                            });
                        }
                    })
                })
            }
        }

    });

    console.log(data.error)

}

//End forms
function s() {
    url = $('base').attr('href') + 'index.php?route=product/search';

    var filter_name = $('input[name=\'filter_name\']').val();

    if (filter_name) {
        url += '&filter_name=' + encodeURIComponent(filter_name);
    }

    location = url;
}

//search
$(document).ready(function () {

    $('input[name=\'filter_name\']').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            url = $('base').attr('href') + 'index.php?route=product/search';

            var filter_name = $('input[name=\'filter_name\']').val();

            if (filter_name) {
                url += '&filter_name=' + encodeURIComponent(filter_name);
            }

            location = url;
        }
    });

    $('input[name=\'filter_name\']').autocomplete({
        delay: 0,
        source: function (request, response) {
            minChars: 2,
                $.ajax({
                    url: 'index.php?route=product/search/mini&filter_name=' + encodeURIComponent(request.term),
                    dataType: 'html',
                    success: function (json) {
                        $('#search_response').html(json);
                        $('#search_response').show();
                    }
                });
        },
        select: function (event, ui) {
            $('input[name=\'filter_name\']').val(ui.item.label);
            return false;
        },
        focus: function (event, ui) {
            return false;
        }
    });
})

//end search

function setCoord(lat, lng, address_id) {
    $.post("/index.php?route=information/building/setcoord", {lat: lat, lng: lng, address_id: address_id});
}

//end map dialog

//Button Gallery
$(document).ready(function () {
    $('div#big').bind('click', function () {
        $('div#big').addClass('active');
        if ($('div#gallery').hasClass('small')) {
            $('div#gallery').removeClass('small');
        }
        if ($('div#small').hasClass('active')) {
            $('div#small').removeClass('active');
        }
    });
    $('div#small').bind('click', function () {
        $('div#small').addClass('active');
        if ($('div#big').hasClass('active')) {
            $('div#big').removeClass('active');
        }
        $('div#gallery').addClass('small');
    });
});
//End Button Gallery

//Button Category
$(document).ready(function () {
    $('div#big_p').bind('click', function () {
        $('div#big_p').addClass('active');
        if ($('div#bp').hasClass('small')) {
            $('div#bp').removeClass('small');
        }
        if ($('div#small_p').hasClass('active')) {
            $('div#small_p').removeClass('active');
        }
    });
    $('div#small_p').bind('click', function () {
        $('div#small_p').addClass('active');
        if ($('div#big_p').hasClass('active')) {
            $('div#big_p').removeClass('active');
        }
        $('div#bp').addClass('small');
    });
});
//End Button Category


//geo
$(document).ready(function () {
    if (false) { // гео-попап отключён в статике
        var regionConfirmPopup = $(window).width() > 1170 ? $('#regionConfirmPopup') : $('.header-fixed-contacts--mobile #regionConfirmPopup');
        $.ajax({
            url: 'index.php?route=module/geo_tracking/getModal',
            type: 'get',
            dataType: 'json',
            success: function (json) {
                regionConfirmPopup.html(json.template)
                regionConfirmPopup.show();
            }
        });
        setCookie("show_geo", "1", {
            expires: 3600,
            path: '/'
        });
    } else {

    }
});

$('.select_gorod').bind('click', function () {
    getGeoCity();
});


function getGeoCity() {
    $.ajax({
        url: 'index.php?route=module/geo_tracking/getlistform',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            $("#dialog-form").dialog({
                autoOpen: false,
                //width: 350,
                resizable: false,
                title: json.title_dialog,
                modal: true,
                dialogClass: 'd_city',
                close: function (event, ui) {

                }

            });
            $('#dialog-form').html(json.template);
            $('#dialog-form').dialog('open');

            $(document).ready(function () {
                $('input[name=\'city_search\']').autocomplete({
                    delay: 0,
                    zIndex: 9999,
                    autoFill: true,
                    classes: {
                        "ui-autocomplete": "menu_city",
                    },
                    source: function (request, response) {
                        $.ajax({
                            url: '/index.php?route=module/geo_tracking/getlist',
                            type: 'post',
                            data: 'city_search=' + encodeURIComponent(request.term),
                            dataType: 'json',
                            success: function (json) {
                                response($.map(json, function (item) {
                                    return {
                                        label: item.fullname,
                                        value: item.city_id
                                    }
                                }));
                            }
                        });
                    },
                    select: function (event, ui) {
                        $('input[name=\'city_search\']').val(ui.item.label);
                        $.ajax({
                            type: "POST",
                            url: '/index.php?route=module/geo_tracking/setregion',
                            data: 'city_id=' + ui.item.value,
                            dataType: 'json',
                            success: function (json) {
                                if (json) {
                                    $('.gorod').html(json.city);
                                    window.location = location.href;

                                }
                                ;
                                $('#dialog-form').dialog('close');

                                if (typeof checkout == 'function') {

                                }
                                ;

                            },
                            error: function (XHR, Status, errorThrown) {

                            },
                            complete: function () {

                            }
                        });
                        return false;
                    },
                    focus: function (event, ui) {
                        return false;
                    }
                });


                $('input[name=\'geo_zone_id\']').on('change', function () {
                    console.log(this.value);
                    $.ajax({
                        type: "POST",
                        url: '/index.php?route=module/geo_tracking/setregion',
                        data: 'geo_zone_id=' + this.value,
                        dataType: 'json',
                        success: function (json) {

                            window.location = location.href;

                        },
                        error: function (XHR, Status, errorThrown) {

                        },
                        complete: function () {

                        }
                    });
                })


            })


        }
    });
}

$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let city = urlParams.get('city');

    if (city === 'spb') {
        console.log("City parameter is 'spb'");
        $.ajax({
            type: "POST",
            url: '/index.php?route=module/geo_tracking/setregion',
            data: 'geo_zone_id=4',
            dataType: 'json',
            success: function(json) {
                // Redirect to the same page without query parameters
                window.location.href = window.location.pathname;
            },
            error: function(XHR, Status, errorThrown) {
                // Handle errors appropriately (e.g., display an error message)
                console.error("AJAX Error:", Status, errorThrown, XHR);
            }
        });
    }
});
//end geo

$(document).ready(function () {
    $('.link_tag').bind('click', function () {
        $('.link_tag').removeClass('active');
        $(this).addClass('active');
        $('#link_all').attr('style', 'display: inline-block;');
        scroll_data.url = $(this).attr('data-id');

        $(scroll_data.append_selector).fadeOut(500, function () {
            scroll_data.replace = true;
            moreProgect(scroll_data);
        });

        $(scroll_data.append_selector).fadeIn(700);


    });

})

///подгрузка
var inProgress = false;

if (typeof (scroll_data) != 'undefined') {

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 5000 && !inProgress) {
            if (!scroll_data.is_last_page && scroll_data.is_button != true) {
                inProgress = true;
                moreProgect(scroll_data);
                console.log('moreProgect');
            }
        }
        return false;
    });
}
//догрузка проектов в каталоге по кнопке используем moreProgect и дополняем scroll_data в других местах - по скролу
$(document).ready(function () {
    if (typeof (scroll_data) != 'undefined') {
        if (scroll_data.is_button == true && !scroll_data.is_last_page) {
            $(scroll_data.btn_selector).show();
        }
        $(scroll_data.btn_selector).bind('click', function () {
            inProgress = true;

            $(scroll_data.btn_selector).hide();
            moreProgect(scroll_data);
        });
    }
});

function fancybox_init(){
    $(".fancybox").attr('rel', 'fancybox').fancybox({
        maxWidth  : 800,
        maxHeight : 600,
        fitToView : true,
        width     : '70%',
        height    : '70%',
        autoSize  : true,
        closeClick    : false,
        openEffect    : 'none',
        closeEffect   : 'none'
    });
}

function moreProgect(scroll_data) {
    return; // отключено: каталог работает на WordPress (пагинация WP), без догрузки с aps-dsk.ru
    url = scroll_data.url.replace(/\&amp;/g, '&');
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: '',
        beforeSend: function () {
            inProgress = true;
        },
        complete: function () {
        },
        success: function (json) {
            if (json) {
                $(scroll_data.load_selector).hide();
                if (typeof (scroll_data.replace) != 'undefined' && scroll_data.replace) {
                    $(scroll_data.append_selector).html(json.tpl);
                    scroll_data.replace = false;
                    fancybox_init()
                } else {
                    $(json.tpl).appendTo(scroll_data.append_selector);
                }

                imgLoad();
                loadLazyImages();

                if (scroll_data.is_button != true) {
                    javascript:scroll(0, $(window).scrollTop());
                } else {
                    $(scroll_data.btn_selector).show();
                }
                scroll_data.url = json.next_page
                scroll_data.is_last_page = json.is_last_page;
                if (json.is_last_page == true) {

                    $(scroll_data.btn_selector).hide();
                }

                inProgress = false;
                var slider = $('.block_products .el_product .carousel:not(.slick-initialized)').slick({arrows: false, dots: false});
                loadLazySlick(slider);
                $(".carousel.slick").slick({arrows: true, dots: false});
            }
        }
    });

    dop_images();

}

/////


///cookies
function setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        deleteCookie(name);
    }
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (typeof (getCookie('new')) == 'undefined') {
    deleteAllCookies();
    setCookie('new', '1', {
        expires: 2592000,
        path: '/'
    })
}
deleteCookie('selected');


//Pop-up info
$('.btn_pop_up_info').bind('click', function (e) {
    cur_id = $(this).attr('id');
    $("#dialog-form").dialog({
        autoOpen: false,
        modal: true,
        title: '',
        dialogClass: 'dialog_pop_up_info'
    });
    var indormation_id = $(this).attr('data-information-id');

    $.get('index.php?route=information/information/data&info_id=' + indormation_id, function (data) {
        $("#dialog-form").html(data);
        $("#dialog-form").dialog("open");
        init();

        $(document).ready(function () {
            init();
            javascript:scroll(0, 0);
        });
    });


    $("#dialog-form").bind("dialogclose", function (event, ui) {
        $(document).ready(function () {
            init();
        });
    });

    return false;
});

//End Pop-up info


function scrollToBottom(id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

$(window).scroll(function () {
    if (($(this).scrollTop() > 192)) {
        $('.ui-dialog-titlebar-close').addClass('btn-fixed');
    } else if (($(this).scrollTop() <= 192)) {
        $('.ui-dialog-titlebar-close').removeClass('btn-fixed');
    }
});


//Dop images in category
function dop_images() {

    $('.dop_images span').hover(function (e) {
        cur_id = $(this).parent().parent().attr('id');
        $('#' + cur_id + ' .dop_images span').removeClass('active');
        $(this).addClass('active');
        $('#' + cur_id + ' > img').attr('src', $(this).attr('data-img'));
    });

    $('.el_product .dop_images').mouseleave(function () {
        var parents = $(this).closest(".img").attr('id');
        $('#' + cur_id + ' .dop_images span').removeClass('active');
        var firstImg = $('#' + cur_id + ' .dop_images span').eq(0).addClass("active").attr('data-img');
        $('#' + cur_id + ' > img').attr('src', firstImg);
    });

}

//End Dop images in category

// $(document).ready(function () {
//     $('#scroll_to_work').on('click', function () {
//         $('html, body').animate({
//             scrollTop: $('.works_full').offset().top
//         }, 500);
//     });
// });


function floating_block() {
    $('.block_floating').each(function (key, el) {
        height_el = parseInt($(el).css('height'));
        floating = Math.round(height_el * 0.2);
        if (parseInt($(this).find('.wrap-carousel-indicators').css('height')) > 0) {
            floating = height_el - parseInt($(this).find('.wrap-carousel-indicators').css('height'));
        }
        if (floating > 0) {
            $(el).css({
                'margin-top': '-' + floating + 'px',
                'position': 'static'
            });
            $(el).prev().css({
                'padding-bottom': floating + 'px',
                'position': 'relative'
            });
        }
    });
}

function floating_bottom_block() {
    $('.block_floating_bottom').each(function (key, el) {
        height_el = parseInt($(el).css('height'));
        floating = Math.round(height_el * 0.2);
        if (floating > 0) {
            $(el).css({
                'z-index': '10',
                'position': 'relative'
            });
            if ($(el).next().hasClass('b_padding_left_text') || $(el).next().hasClass('b_padding_right_text') || $(el).next().hasClass('b_padding_left') || $(el).next().hasClass('b_padding_right')) {
                $(el).next().children('div').first().children('div').first().children('div').first().css({
                    'padding-top': Math.round(floating * 1.2) + 'px'
                });
            } else {
                $(el).next().css({
                    'padding-top': floating + 'px'
                });
            }
            $(el).next().css({
                'margin-top': '-' + floating + 'px',
                'position': 'static'
            });
        }
    });
}

function imgLoad() {
    $('.wrap_body').fadeIn(100);

    $('div[background-image-load], span[background-image-load]').each(function (index, object) {
        if (object.getAttribute('background-image-load')) {
            object.setAttribute('style', 'background-image:' + object.getAttribute('background-image-load'));
        }
    });

    $('img[data-src]:not(.lazy-img)').each(function (index, object) {
        object.setAttribute('src', object.getAttribute('data-src'));
        object.onload = function () {
            object.removeAttribute('data-src');
        };
    });
    $('img[data_src]:not(.lazy-img)').each(function (index, object) {
        object.setAttribute('src', object.getAttribute('data_src'));
        object.onload = function () {
            object.removeAttribute('data_src');
        };
    });
}

function photobox() {
    $('.b_photobox').each(function (key, el) {
        cur_id = $(el).attr('id');
        $('#' + cur_id).find('a[class!=cloned]').fancybox({
            protect: true,
            margin: [44, 0, 22, 0],
            loop: true,
            thumbs: {
                autoStart: true,
                axis: 'x'
            },
            mobile: {
                thumbs: false
            },
            buttons: [
                "slideShow",
                "fullScreen",
                "thumbs",
                "close",
            ],
        });
    });

}

function accord() {
    $('.accord .el').bind('click', function () {
        id_parent = $(this).parent().attr('id');
        $('#' + id_parent + ' .el').removeClass('active');
        $(this).addClass('active');
    });
}

//End Accordeon


function ful_d_right() {
    $('.ful_d_right').parent().attr('style', 'position:relative');

    $('.d_with_right_pp .el').bind('click', function (e) {
        cur_id = $(this).attr('id');
        $('.ful_d_right .el').hide();
        $('.ful_d_right #d_' + cur_id).show();
        $('.ful_d_right').show();
        $(".d_with_right_pp").removeClass("active");
        $(".d_with_right_pp").addClass("active");
    });
    $('.ful_d_right .el .close').bind('click', function () {
        $('.ful_d_right').hide();
        $(".d_with_right_pp").removeClass("active");
    });
}

function tabs_mini() {
    //For Tabs для маленьких экранов

    $('.select_nav_tabs').on('change', function (e) {
        cur_id = $(this).attr('id');
        num = $(this).val();
        console.log($('#ul_' + cur_id + ' li a').eq(num).attr('role') == 'tab');
        if ($('#ul_' + cur_id + ' li a').eq(num).attr('role') == 'tab') {
            $('#ul_' + cur_id + ' li a').eq(num).click();
        } else {
            window.location = $('#ul_' + cur_id + ' li a').eq(num).attr('href');
        }

    });

//End For Tabs для маленьких экранов
}


function slick_nav() {
    $('.slick_nav').each(function (key, el) {
        vertical = true;
        if ($(el).attr('data-vertical') && $(el).attr('data-vertical') == 'false') {
            vertical = false;
        }
        data_arrows = false;
        if ($(el).attr('data-arrows') && $(el).attr('data-arrows') == 'true') {
            data_arrows = true;
        }
        slidesToShow = 3;
        if ($(el).attr('data-slidesToShow')) {
            slidesToShow = Number($(el).attr('data-slidesToShow'));
        }

        if (!$(el).hasClass('slick_work')) {
            if ($(el).parent().hasClass('tab-pane') && !$(el).parent().hasClass('active')) {

            } else {

                if ($(el).hasClass('slide_with_arrows')) {
                    console.log('BUBU');
                    $(el).addClass('slick_work');
                    cur_id = $(el).attr('id');

                    var sliderMain = $('#' + cur_id + ' .slick-for');
                    if (!sliderMain.hasClass('slick-initialized')) {
                        sliderMain.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: data_arrows,
                            fade: true,
                            asNavFor: '#' + cur_id + ' .slick-nav'
                        });
                        loadLazySlick(sliderMain);
                    }

                    var sliderNav = $('#' + cur_id + ' .slick-nav')
                    var sliderInRow;
                    if (sliderNav.hasClass('slick-vertical')) {
                        sliderInRow = 3;
                    } else {
                        sliderInRow = 7;
                    }
                    if (!sliderNav.hasClass('slick-initialized')) {
                        sliderNav.slick({
                            infinite: true,
                            slidesToShow: sliderInRow,
                            slidesToScroll: 1,
                            asNavFor: '#' + cur_id + ' .slick-for',
                            dots: false,
                            arrows: true,
                            centerMode: false,
                            focusOnSelect: true,
                            vertical: vertical,
                            responsive: [
                                {
                                    breakpoint: 1500,
                                    settings: {
                                        slidesToShow: 6,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 1300,
                                    settings: {
                                        slidesToShow: 5,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 1180,
                                    settings: {
                                        slidesToShow: 6,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 900,
                                    settings: {
                                        slidesToShow: 5,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 700,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 500,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        });
                        loadLazySlick(sliderNav);
                    }
                }
                else {
                    $(el).addClass('slick_work');
                    cur_id = $(el).attr('id');

                    var sliderMain = $('#' + cur_id + ' .slick-for');
                    if (!sliderMain.hasClass('slick-initialized')) {
                        sliderMain.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: data_arrows,
                            fade: true,
                            asNavFor: '#' + cur_id + ' .slick-nav'
                        });
                        loadLazySlick(sliderMain);
                    }

                    var sliderNav = $('#' + cur_id + ' .slick-nav')
                    var sliderInRow;
                    if (sliderNav.hasClass('slick-vertical')) {
                        sliderInRow = 3;
                    } else {
                        sliderInRow = 6;
                    }
                    if (!sliderNav.hasClass('slick-initialized')) {
                        sliderNav.slick({
                            infinite: true,
                            slidesToShow: sliderInRow,
                            slidesToScroll: 1,
                            asNavFor: '#' + cur_id + ' .slick-for',
                            dots: false,
                            arrows: false,
                            centerMode: true,
                            focusOnSelect: true,
                            vertical: vertical,
                            responsive: [
                                {
                                    breakpoint: 680,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 480,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        });
                        loadLazySlick(sliderNav);
                    }
                }
            }
        }
    });

    $('#ul_nav_tabs_p_foto li a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        slick_nav();
    })


}

function owl_carousel() {
    $('.wrap_owl_carousel').each(function (key, el) {
        cur_id = $(el).attr('id');
        if ($('#' + cur_id).attr('data-items')) {
            items = $('#' + cur_id).attr('data-items');
        } else {
            items = 4;
        }
        if ($('#' + cur_id).attr('data-r0')) {
            r0 = $('#' + cur_id).attr('data-r0');
        } else {
            r0 = 1;
        }
        if ($('#' + cur_id).attr('data-r600')) {
            r600 = $('#' + cur_id).attr('data-r600');
        } else {
            r600 = 2;
        }
        if ($('#' + cur_id).attr('data-r768')) {
            r768 = $('#' + cur_id).attr('data-r768');
        } else {
            r768 = 3;
        }
        if ($('#' + cur_id).attr('data-r1280')) {
            r1280 = $('#' + cur_id).attr('data-r1280');
        } else {
            r1280 = 4;
        }
        if ($('#' + cur_id).attr('data-video')) {
            video = $('#' + cur_id).attr('data-video');
        } else {
            video = 'false';
        }
        loop = 'false';
        if ($('#' + cur_id).attr('data-loop')) {
            loop = $('#' + cur_id).attr('data-loop');
        } else {
            loop = $('#' + cur_id).attr('data-loop');
        }
        autoWidth = false;
        if ($('#' + cur_id).attr('data-autoWidth')) {
            autoWidth = $('#' + cur_id).attr('data-autoWidth');
        } else {
            autoWidth = $('#' + cur_id).attr('data-autoWidth');
        }
        dots = false;
        if ($('#' + cur_id).attr('data-dots')) {
            dots = $('#' + cur_id).attr('data-dots');
        } else {
            dots = $('#' + cur_id).attr('data-dots');
        }


        if (($('#' + cur_id).attr('data-margin')) == 0) {
            margin = 0;
        } else {
            margin = 50;
        }


        $('#' + cur_id + ' .owl-carousel').owlCarousel({
            items: items,
            autoWidth: autoWidth,
            video: video,
            loop: loop,
            dots: dots,
            margin: margin,
            nav: true,
            autoplay: false,
            smartSpeed: 1000,
            autoplayTimeout: 2000,
            navContainer: '#' + cur_id + ' .nav_carousel',

            responsive: {
                0: {items: r0},
                600: {items: r600},
                768: {items: r768},
                1280: {items: r1280}
            }
        });
    });
}

function nav_tabs() {

    $('.nav-tabs:not(#ul_nav_tabs_p_foto)').append('<li class="helper"></li>');

    $('.nav-tabs.nt_carousel').each(function (key, el) {
        var owlMargin = $(el).data('owl-margin') > 0 ? $(el).data('owl-margin') : 50;
        $(el).find('li.helper').remove();
        $(el).addClass('owl-carousel');
        $(el).wrapAll('<div class="wrap_owl_carousel wrap_nt_carousel"  id="carousel_nav_tabs' + key + '"></div>');
        $(el).before('<div class="head_carousel"><div class="nav_carousel"></div></div>');
        $(el).find('li').addClass('item');

        cur_id = $(el).attr('id');
        $('#carousel_nav_tabs' + key + ' .owl-carousel').owlCarousel({
            autoWidth: true,
            loop: false,
            margin: owlMargin,
            nav: true,
            autoplay: false,
            smartSpeed: 1000,
            autoplayTimeout: 2000,
            navContainer: '#carousel_nav_tabs' + key + ' .nav_carousel'
        });
    });

    $('.nt_carousel .owl-stage-outer .owl-stage .owl-item li').bind('click', function (key, el) {
        $(this).parent().parent().find('li').removeClass('active');
    });
    $('.owl_team').owlCarousel({
        loop: false,
        margin: 11,
        nav: true,
        autoplay: false,
        smartSpeed: 1000,
        dots: false,
        autoplayTimeout: 2000,
        responsive: {
            0: {items: 1},
            600: {items: 2},
            768: {items: 2},
            1280: {items: 4}
        }
    });
    $('.slider_pro').owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        autoplay: false,
        smartSpeed: 1000,
        dots: false,
        autoplayTimeout: 2000,
        responsive: {
            0: {items: 1.2},
            1000: {items: 2},
            1280: {items: 2.5},
            1700: {items: 3.5}
        }
    });
    $('.owl-lots').owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        autoplay: false,
        smartSpeed: 1000,
        dots: false,
        autoplayTimeout: 2000,
        responsive: {
            0: {items: 1.2},
            600: {items: 2},
            768: {items: 2},
            1280: {items: 3.5}
        }
    });

    $('.sp-owl').owlCarousel({
        loop: true,
        margin: 1,
        nav: true,
        autoplay: false,
        smartSpeed: 1000,
        dots: true,
        autoplayTimeout: 15000,
        responsive: {
            0: {items: 1},
            600: {items: 1},
            768: {items: 1},
            1280: {items: 1}
        }
    });
    $('.house-owl').owlCarousel({
        loop: true,
        margin: 1,
        nav: true,
        autoplay: false,
        smartSpeed: 1000,
        dots: true,
        autoplayTimeout: 15000,
        responsive: {
            0: {items: 1},
            600: {items: 1},
            768: {items: 1},
            1280: {items: 1}
        }
    });


}


$(document).ready(function () {
    $('.navbar.full_menu .collapse .navbar-nav > li > ul.dropdown-menu > li > a').bind('click', function () {
        $('.navbar.full_menu').removeClass('full_menu');

    });
});
$(document).ready(function() {
    $('.subtoggle').on('click', function() {
        $(this).toggleClass('active');
        $(this).closest('.readyHouses__item').find('.readyHousesItem__list').toggleClass('active');
    });
});

//кнопки для переключения планировок
$('#but_plan span').bind('click', function () {
    cur = $(this).attr('data-cur');
    if (cur > 0) {
        cur = 0;
    } else {
        cur = 1;
    }

    $('#ul_nav_tabs_plan li a').eq(cur).tab('show');
    $('#but_plan span').attr('data-cur', cur);
});

//End кнопки для переключения планировок

function owl_cloned() {
    $('.owl-item.cloned').each(function (key, el) {
        $(this).find('a').addClass("cloned");
    });
}

function carousel_swipe() {

}

//крутилка для мобильных
$(document).ready(function () {
    $('.carousel').bcSwipe({threshold: 50});
});

//вызов функции поделиться
$(document).ready(function () {
    $(".icon-share").click(function (e) {
        e.preventDefault();

        var shareTitle = document.title,
            shareLink = location.href;

        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                url: shareLink,
            });
        } else {
            $(".addthis-smartlayers").fadeToggle();
        }
    });
});

$(document).mouseup(function (e) {
    var div = $(".icon-share");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        $(".addthis-smartlayers").fadeOut();
    }
});

//кнопка вверх
$(document).ready(function () {
    var toTop = $(".to_top"),
        top_show = 150,
        delay = 1000;

    function to_top_show() {
        if ($(this).scrollTop() > top_show)
            toTop.fadeIn();
        else
            toTop.fadeOut();
    }

    to_top_show();

    $(window).scroll(function () {
        to_top_show();
    });
    toTop.click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, delay);
    });
});

//листалка на странице проектов для планшетной и мобильной версий
$(document).ready(function () {
    var slider = $('.block_products .el_product .carousel:not(.slick-initialized)').slick({arrows: false, dots: false});
    loadLazySlick(slider);

    $(".carousel.slick").slick({arrows: true, dots: false});
});

//правка выпадающего списка в проекте
$(document).ready(function () {
    $(".processSelect").mousedown(function () {
        console.log("123");
        $(this).find("select").click();
    });
});

//шапка redesign
$(document).ready(function () {
    var scrollTop = $(window).scrollTop();
    if ($(window).width() > 480) {
        if (scrollTop > 20) {
            $(".header-fixed").addClass("do");
        } else {
            $(".header-fixed").removeClass("do");
        }
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 20) {
                $(".header-fixed").addClass("do");
            } else {
                $(".header-fixed").removeClass("do");
            }
            imgLoad();
        });
    }

    imgLoad();
});

//quiz
$(document).ready(function () {

    //выбор пункта
    $(".quiz-step-list-item").click(function () {
        $(this).closest(".quiz-step-list").find(".quiz-step-list-item").not($(this)).removeClass("active");
        $(this).closest(".quiz-step-list-item").addClass("active");
    });

    //Кнопки назад и далее
    $(".quiz-welcome-btn").click(function (e) {
        e.preventDefault();
    });

    //предыдущий слайд
    $(".quiz-step-prev").click(function () {
        quizPrev();
    });

    function quizPrev() {
        var currentSection = $(".quiz-section.active").index() - 1;
        $(".quiz-section.active").removeClass("active");
        $(".quiz-section").eq(currentSection - 1).addClass("active");
    }

    //следующий слайд
    $(".quiz-step-next").click(function () {
        quizNext();
    });

    function quizNext() {
        var currentSection = $(".quiz-section.active").index() - 1;
        console.log(currentSection)
        $(".quiz-section.active").removeClass("active");
        $(".quiz-section").eq(currentSection + 1).addClass("active");
    }

    //добавляем скрытый инпут с результатами
    $(".quiz-getFinish").click(function () {
        //добавляем выбранные ответы
        var quizSelect = "";

        $(".quiz-step").each(function () {
            var quiz_question = $(this).find(".quiz-step-question").text(),
                quiz_selected = $(this).find(".quiz-step-list-item.active").text();
            quizSelect += quiz_question + ':' + quiz_selected.replace(/['"«»]/g, '') + '<br />';
        });

        $(".quiz-step-form").append('<textarea name="comment" class="comment" style="display:none;">' + quizSelect + '</textarea>');
    });

});

function quizsend(data) {
    var rule = {mail: {}, phone: {}};
    var validateEvents = {onfocusout: true, onkeyup: true, onclick: true, onsubmit: true};
    if (data.fields.mail == 'require') {
        rule.mail = {
            required: true,
            email: true
        }
        $("#form_" + data.id + ' input[name=\'mail\']').val($("#form_" + data.id + ' input[name=\'mail\']').val().replace(/^\s*/, '').replace(/\s*$/, ''));
    }
    if (data.fields.phone == 'require') {
        rule.phone = {
            required: true,
            PhoneFormat: true,
        }
    }
    if (data.error == 'dialog') {
        validateEvents.onfocusout = false;
        validateEvents.onkeyup = false;
        validateEvents.onclick = false;
    }

    $("#form_" + data.id).validate({
        rules: rule,
        onfocusout: validateEvents.onfocusout,
        onkeyup: validateEvents.onkeyup,
        onclick: validateEvents.onclick,
        onsubmit: validateEvents.onsubmit,
        messages: {
            mail: {
                required: "Нужно указать email адрес",
                email: "Email адрес должен быть корректным"
            },
            phone: {
                required: "Нужно указать ваш телефон",
                PhoneFormat: "Не верный формат телефона"
            },
        },
        errorPlacement: function (error, element) {
            if (data.error == 'dialog') {
                $("#dialog-form").dialog("destroy");
                $("#dialog-form").dialog({
                    autoOpen: false,
                    height: 55,
                    width: 320,
                    modal: true,
                    title: 'Ошибка ввода телефона'
                });

                html = '';
                for (i = 0; i < error.length; i++) {

                }
                $('#dialog-form').html(html);
                $("#dialog-form").dialog("open");
            } else {
                error.appendTo(element.next());
                element.next().show();
            }
        },
        submitHandler: function (form) {
            var timeStamp = Math.floor(Date.now());
            $("#form_" + data.id).append('<input type="hidden" name="track_code" value="' + timeStamp + '"/>');
            if (data.data_foto) {
                $("#form_" + data.id).append('<input type="hidden" name="data_foto" value="' + data.data_foto + '"/>');
            }
            var d = new Date();
            if (d.getDay() == 0 || d.getHours() >= 19) {
                $("#form_" + data.id).append('<input type="hidden" name="out_time" value="1"/>');
            }

            if (typeof (data.return_url) == 'undefined') {
                data.return_url = window.location.href;
            }
            $("#form_" + data.id).append('<input type="hidden" name="return_url" value="' + data.return_url + '"/>');

            data.quizcomment = $(".quizcomment").val();

            $("#form_" + data.id).ajaxForm();
            $("#form_" + data.id).ajaxSubmit({
                url: $("#" + data.id).attr("action"),
                dataType: 'json',
                beforeSend: function () {
                    if ($("#dialog-form").dialog("instance")) {
                        //alert(json.message);
                        $("#dialog-form").dialog("close");
                        $("#dialog-form").dialog("destroy");
                    }
                    $("#dialog-form").dialog({
                        autoOpen: false,
                        modal: true,
                        title: '<p style="color:#fff;text-align:center;font-size:25px!important;">Сообщение отправляется</p>'
                    });
                    html = '<div  class="dialog_loading"><p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">';
                    html += 'Ваша заявка отправляется.</p><p style="text-align:center;min-height:150px;"><img style="width:150px;"src="/catalog/view/theme/aps2019/image/loading_dialog.gif" /></p></div>';
                    $('#dialog-form').html(html);
                    $("#dialog-form").dialog("open");
                },
                success: function (json) {
                    if (json) {
                        if (json.redirect) {
                            window.location = json.redirect;
                            return false;
                        } else {
                            if ($("#dialog-form").dialog("instance")) {
                                $("#dialog-form").dialog("close");
                                $("#dialog-form").dialog("destroy");
                            }

                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                                'event': 'all_forms',
                                'category': 'send_form',
                                'action': data.utm
                            });

                            $('input[name=\'track_code\']').remove();

                            if (!json.error_subscr) {
                                $("#dialog-form").dialog({
                                    autoOpen: false,
                                    modal: true,
                                    title: '<p style="color:#fff;text-align:center;font-size:25px!important;">Спасибо!</p>'
                                });

                                var d = new Date();
                                html = '';
                                if (d.getDay() == 0 || d.getHours() >= 19) {
                                    html += '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Вы сделали правильный выбор! С вами свяжутся завтра как можно скорее.</p>';
                                } else {
                                    html += '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Вы сделали правильный выбор! Менеджер свяжется с вами в течении 60 минут.</p>';
                                }
                                html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="$( \'#dialog-form\' ).dialog( \'close\' );">Вернуться на сайт</span></p>';


                            } else {
                                $("#dialog-form").dialog({
                                    autoOpen: false,
                                    modal: true,
                                    title: '<p style="color:#fff;text-align:center;font-size:25px!important;">Ошибка!</p>'
                                });
                                html = '<p style="color:#fff;text-align:center;font-family: OpenSans,Arial;">Такой E-mail уже зарегистрирован. Введите другой E-mail.</p>';
                                html += '<p style="text-align:center;margin:40px 0 20px;"><span class="btn btn-fixed-width btn-white" onClick="$( \'#dialog-form\' ).dialog( \'close\' );">Вернуться на сайт</span></p>';
                            }
                            $('#dialog-form').html(html);
                            $("#dialog-form").dialog("open");
                        }
                    }

                }
            });
        }

    });

}

/* redesign */
$(document).ready(function () {
    $(".dropmenu").click(function (e) {
        e.preventDefault();
        $(".topmenu").toggleClass("open");
        $(this).toggleClass("is-active");
    });
    $(".topmenu_school li a").click(function (e) {
        $(".topmenu").toggleClass("open");
        $(".dropmenu").toggleClass("is-active");
    });


    if ($(window).width() < 1170) {
        $(".dropdown").click(function () {
            $(this).toggleClass("open");
            $(this).find("ul").slideToggle();
        });
        $(".dropdown > a").click(function (e) {
            e.preventDefault();
        });
    } else {

        $(".wrap_constructor header .container .row .header-fixed-menu .topmenu .dropdown").click(function () {
            $(this).toggleClass("open");
            $(this).find("ul").slideToggle();
        });
        $(".dropdown > a").click(function (e) {
            e.preventDefault();
        });
    }
});


$(document).ready(function () {
    $('#scroll_to_work').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.works_full').offset().top - 70
        }, 100);
    });
});


//Landing Houseconf
$(document).ready(function () {
    $('.landing_26 .block_5 .container .row .list_q .el').bind('click', function () {
        if ($(this).hasClass('open')) {
            $('.landing_26 .block_5 .container .row .list_q .el').removeClass('open');
            $(this).removeClass('open');
        } else {
            $('.landing_26 .block_5 .container .row .list_q .el').removeClass('open');
            $(this).addClass('open');
        }
    });
    $('.landing_26 .block_10 .close').bind('click', function () {
        $('.landing_26 .block_10').hide();
    });


    $('.buttons #more_sponsor').bind('click', function () {
        count_all = $('.landing_26 .block_8 .container .row .list1').children('img').length;
        data_show = $('.landing_26 .block_8 .container .row .list1').attr('data_show');
        class_el = 'line' + data_show;
        count_show = data_show * 4 - 4;
        $('.landing_26 .block_8 .container .row .list1 img.' + class_el).show();
        data_show = Number(data_show) + 1;
        $('.landing_26 .block_8 .container .row .list1').attr('data_show', data_show);
        count_show = count_show + 4;
        if (count_show >= count_all) {
            $(this).hide();
        }
    });

});


$(document).ready(function () {



    /*! rangeslider.js - v2.1.1 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
    !function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery);
    }(function (a) {
        "use strict";

        function b() {
            var a = document.createElement("input");
            return a.setAttribute("type", "range"), "text" !== a.type;
        }

        function c(a, b) {
            var c = Array.prototype.slice.call(arguments, 2);
            return setTimeout(function () {
                return a.apply(null, c);
            }, b);
        }

        function d(a, b) {
            return b = b || 100, function () {
                if (!a.debouncing) {
                    var c = Array.prototype.slice.apply(arguments);
                    a.lastReturnVal = a.apply(window, c), a.debouncing = !0;
                }
                return clearTimeout(a.debounceTimeout), a.debounceTimeout = setTimeout(function () {
                    a.debouncing = !1;
                }, b), a.lastReturnVal;
            };
        }

        function e(a) {
            return a && (0 === a.offsetWidth || 0 === a.offsetHeight || a.open === !1);
        }

        function f(a) {
            for (var b = [], c = a.parentNode; e(c);) b.push(c), c = c.parentNode;
            return b;
        }

        function g(a, b) {
            function c(a) {
                "undefined" != typeof a.open && (a.open = a.open ? !1 : !0);
            }

            var d = f(a), e = d.length, g = [], h = a[b];
            if (e) {
                for (var i = 0; e > i; i++) g[i] = d[i].style.cssText, d[i].style.setProperty ? d[i].style.setProperty("display", "block", "important") : d[i].style.cssText += ";display: block !important", d[i].style.height = "0", d[i].style.overflow = "hidden", d[i].style.visibility = "hidden", c(d[i]);
                h = a[b];
                for (var j = 0; e > j; j++) d[j].style.cssText = g[j], c(d[j]);
            }
            return h;
        }

        function h(a, b) {
            var c = parseFloat(a);
            return Number.isNaN(c) ? b : c;
        }

        function i(a) {
            return a.charAt(0).toUpperCase() + a.substr(1);
        }

        function j(b, e) {
            if (this.$window = a(window), this.$document = a(document), this.$element = a(b), this.options = a.extend({}, n, e), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = o.orientation[this.orientation].dimension, this.DIRECTION = o.orientation[this.orientation].direction, this.DIRECTION_STYLE = o.orientation[this.orientation].directionStyle, this.COORDINATE = o.orientation[this.orientation].coordinate, this.polyfill && m) return !1;
            this.identifier = "js-" + k + "-" + l++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = a('<div class="' + this.options.fillClass + '" />'), this.$handle = a('<div class="' + this.options.handleClass + '" />'), this.$range = a('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: "0"
            }), this.handleDown = a.proxy(this.handleDown, this), this.handleMove = a.proxy(this.handleMove, this), this.handleEnd = a.proxy(this.handleEnd, this), this.init();
            var f = this;
            this.$window.on("resize." + this.identifier, d(function () {
                c(function () {
                    f.update(!1, !1);
                }, 300);
            }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function (a, b) {
                if (!b || b.origin !== f.identifier) {
                    var c = a.target.value, d = f.getPositionFromValue(c);
                    f.setPosition(d);
                }
            });
        }

        Number.isNaN = Number.isNaN || function (a) {
            return "number" == typeof a && a !== a;
        };
        var k = "rangeslider", l = 0, m = b(), n = {
            polyfill: !0,
            orientation: "horizontal",
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            horizontalClass: "rangeslider--horizontal",
            verticalClass: "rangeslider--vertical",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        }, o = {
            orientation: {
                horizontal: {
                    dimension: "width",
                    direction: "left",
                    directionStyle: "left",
                    coordinate: "x"
                }, vertical: {dimension: "height", direction: "top", directionStyle: "bottom", coordinate: "y"}
            }
        };
        return j.prototype.init = function () {
            this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit();
        }, j.prototype.update = function (a, b) {
            a = a || !1, a && (this.min = h(this.$element[0].getAttribute("min"), 0), this.max = h(this.$element[0].getAttribute("max"), 100), this.value = h(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = h(this.$element[0].getAttribute("step"), 1)), this.handleDimension = g(this.$handle[0], "offset" + i(this.DIMENSION)), this.rangeDimension = g(this.$range[0], "offset" + i(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, b);
        }, j.prototype.handleDown = function (a) {
            if (this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), !((" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
                var b = this.getRelativePosition(a), c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                    d = this.getPositionFromNode(this.$handle[0]) - c,
                    e = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
                this.setPosition(e), b >= d && b < d + this.handleDimension && (this.grabPos = b - d);
            }
        }, j.prototype.handleMove = function (a) {
            a.preventDefault();
            var b = this.getRelativePosition(a),
                c = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
            this.setPosition(c);
        }, j.prototype.handleEnd = function (a) {
            a.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$element.trigger("change", {origin: this.identifier}), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value);
        }, j.prototype.cap = function (a, b, c) {
            return b > a ? b : a > c ? c : a;
        }, j.prototype.setPosition = function (a, b) {
            var c, d;
            void 0 === b && (b = !0), c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos)), d = this.getPositionFromValue(c), this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = d + "px", this.setValue(c), this.position = d, this.value = c, b && this.onSlide && "function" == typeof this.onSlide && this.onSlide(d, c);
        }, j.prototype.getPositionFromNode = function (a) {
            for (var b = 0; null !== a;) b += a.offsetLeft, a = a.offsetParent;
            return b;
        }, j.prototype.getRelativePosition = function (a) {
            var b = i(this.COORDINATE), c = this.$range[0].getBoundingClientRect()[this.DIRECTION], d = 0;
            return "undefined" != typeof a["page" + b] ? d = a["client" + b] : "undefined" != typeof a.originalEvent["client" + b] ? d = a.originalEvent["client" + b] : a.originalEvent.touches && a.originalEvent.touches[0] && "undefined" != typeof a.originalEvent.touches[0]["client" + b] ? d = a.originalEvent.touches[0]["client" + b] : a.currentPoint && "undefined" != typeof a.currentPoint[this.COORDINATE] && (d = a.currentPoint[this.COORDINATE]), d - c;
        }, j.prototype.getPositionFromValue = function (a) {
            var b, c;
            return b = (a - this.min) / (this.max - this.min), c = Number.isNaN(b) ? 0 : b * this.maxHandlePos;
        }, j.prototype.getValueFromPosition = function (a) {
            var b, c;
            return b = a / (this.maxHandlePos || 1), c = this.step * Math.round(b * (this.max - this.min) / this.step) + this.min, Number(c.toFixed(this.toFixed));
        }, j.prototype.setValue = function (a) {
            (a !== this.value || "" === this.$element[0].value) && this.$element.val(a).trigger("input", {origin: this.identifier});
        }, j.prototype.destroy = function () {
            this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + k), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0]);
        }, a.fn[k] = function (b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var d = a(this), e = d.data("plugin_" + k);
                e || d.data("plugin_" + k, e = new j(this, b)), "string" == typeof b && e[b].apply(e, c);
            });
        }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);";
    });

})

$(document).ready(function() {
    $('form').each(function() {
        var form = $(this);
        if (!(form.find('input[name="family"]').length === 0 && form.find('input[name="acceptance"]').length === 0)) {
            return;
        }
        var newHtml = '<div class="el" style="height: 1px; overflow: hidden; opacity: 0;"><input style="color: black" name="family" placeholder="Фамилия" type="text"/></div><div style="height: 1px; opacity: 0; overflow: hidden;"><input name="acceptance" type="checkbox" value="agreed"/> Я прочитал правила пользования и согласен на всё</div>';
        form.append(newHtml);
    });
    $('#cookiesf_doc_body').hide();
});

$(document).ready(function() {
    if ($("#gallerynew").length > 0) {
        console.log('START')
        $.ajax({
            url: 'index.php?route=common/foto', // Путь к контроллеру
            type: 'POST', // Тип запроса (POST или GET)
            data: { // Параметры запроса, если необходимы
                foto_group_id: 1 // ID продукта
            },
            dataType: 'json', // Тип данных ответа (JSON)
            success: function(response) {
                console.log(response);
                // Обработка полученных данных
                if (response.success) {
                    // Отображение фотографий в блоке '#gallerynew'
                    $('#gallerynew').html(''); // Очистить блок
                    $.each(response.photos, function(index, photo) {
                        // Создать HTML для каждой фотографии
                        let imgHtml = '<img src="' + photo.image + '" alt="' + photo.description + '">';
                        $('#gallerynew').append(imgHtml);
                    });
                } else {
                    // Обработка ошибки
                    alert('Ошибка загрузки фотографий!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Обработка ошибки
                console.log('Ошибка AJAX запроса:', jqXHR, textStatus, errorThrown);
            }
        });
    }
});

$(document).ready(function() {
    $(".allphoto").click(function() {
        let sliderNum = $(this).data("num-slider");
        $(".allphotos_" +sliderNum).show();
        $("#my-slider-" +sliderNum).hide();
    });

    $(".minphoto").click(function() {
        let sliderN = $(this).data("num-slider");

        $(".allphotos_" +sliderN).hide();
        $('#fta' + sliderN).find(".slider_left_a").show();
    });
});
$(document).ready(function() {
    $(".el_stoy").click(function() {
        $(".el_stoy").removeClass('active');
        $(this).addClass('active');
        var backSrc = $(this).data("back-src"); // Получаем значение data-back-src
        $(".preim_main").css("background-image", "url('" + backSrc + "')"); // Обновляем фон
    });
});
$(document).ready(function() {
    const annualInterestRate = 10.9 / 100; // Годовая процентная ставка
    const annualInterestRateTwo = 12.9 / 100; // Годовая процентная ставка
    const monthlyInterestRate = annualInterestRate / 12; // Месячная процентная ставка
    const monthlyInterestRateTwo = annualInterestRateTwo / 12; // Месячная процентная ставка

    function formatNumber(number) {
        return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function parseFormattedNumber(formattedNumber) {
        return parseFloat(formattedNumber.replace(/\s/g, ''));
    }

    function getYearsLabel(years) {
        if (years % 10 === 1 && years % 100 !== 11) {
            return 'год';
        } else if ((years % 10 >= 2 && years % 10 <= 4) && (years % 100 < 12 || years % 100 > 14)) {
            return 'года';
        } else {
            return 'лет';
        }
    }

    function calculateMonthlyPayment() {
        const housingCost = parseFormattedNumber($('#housingCostInput').val());
        const downPaymentValue = parseFormattedNumber($('#downPaymentInput').val());
        const termInYears = parseInt($('#term').val());

        const loanAmount = housingCost - downPaymentValue; // Остаток суммы кредита
        const numberOfPayments = termInYears * 12; // Общее количество месячных платежей

        if (loanAmount <= 0) {
            $('#monthlyPayment').text(0);
            return;
        }

        // Формула для расчета ежемесячного платежа
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments));

        $('#monthlyPayment').text(formatNumber(Math.round(monthlyPayment)));
    }

    function calculateMonthlyPaymentTwo() {
        const housingCost = parseFormattedNumber($('#housingCostInputTwo').val());
        const downPaymentValue = parseFormattedNumber($('#downPaymentInputTwo').val());
        const termInYears = parseInt($('#termTwo').val());

        const loanAmount = housingCost - downPaymentValue; // Остаток суммы кредита
        const numberOfPayments = termInYears * 12; // Общее количество месячных платежей

        if (loanAmount <= 0) {
            $('#monthlyPaymentTwo').text(0);
            return;
        }

        // Формула для расчета ежемесячного платежа
        const monthlyPayment = (loanAmount * monthlyInterestRateTwo) / (1 - Math.pow((1 + monthlyInterestRateTwo), -numberOfPayments));

        $('#monthlyPaymentTwo').text(formatNumber(Math.round(monthlyPayment)));
    }

    function updateDownPayment() {
        const housingCost = parseFormattedNumber($('#housingCostInput').val());
        const downPaymentValue = parseFormattedNumber($('#downPaymentInput').val());

        $('#downPaymentPercent').text(Math.round((downPaymentValue / housingCost) * 100));

        calculateMonthlyPayment();
    }

    function updateDownPaymentTwo() {
        const housingCost = parseFormattedNumber($('#housingCostInputTwo').val());
        const downPaymentValue = parseFormattedNumber($('#downPaymentInputTwo').val());

        $('#downPaymentPercentTwo').text(Math.round((downPaymentValue / housingCost) * 100));

        calculateMonthlyPaymentTwo();
    }

    $('#housingCost').on('input', function() {
        const newValue = $(this).val();
        $('#housingCostInput').val(formatNumber(newValue)); // Синхронизация с полем ввода

        const minDownPayment = Math.ceil(newValue * 0.05);
        const maxDownPayment = Math.floor(newValue * 0.90);

        $('#downPayment').attr('min', minDownPayment).attr('max', maxDownPayment).val(minDownPayment);
        updateDownPayment();
    });

    $('#housingCostTwo').on('input', function() {
        const newValue = $(this).val();
        $('#housingCostInputTwo').val(formatNumber(newValue)); // Синхронизация с полем ввода

        const minDownPayment = Math.ceil(newValue * 0.05);
        const maxDownPayment = Math.floor(newValue * 0.90);

        $('#downPaymentTwo').attr('min', minDownPayment).attr('max', maxDownPayment).val(minDownPayment);
        updateDownPaymentTwo();
    });

    $('#downPayment').on('input', function() {
        const newValue = $(this).val();
        $('#downPaymentInput').val(formatNumber(newValue)); // Синхронизация с полем ввода
        updateDownPayment();
    });

    $('#downPaymentTwo').on('input', function() {
        const newValue = $(this).val();
        $('#downPaymentInputTwo').val(formatNumber(newValue)); // Синхронизация с полем ввода
        updateDownPaymentTwo();
    });

    $('#term').on('input', function() {
        const termValue = $(this).val();
        $('#termValue').text(termValue);
        $('#termInput').val(termValue); // Синхронизация с отключенным полем
        $('#termLabel').text(getYearsLabel(termValue)); // Обновление текста с правильной формой слова
        calculateMonthlyPayment();
    });

    $('#termTwo').on('input', function() {
        const termValue = $(this).val();
        $('#termValueTwo').text(termValue);
        $('#termInputTwo').val(termValue); // Синхронизация с отключенным полем
        $('#termLabelTwo').text(getYearsLabel(termValue)); // Обновление текста с правильной формой слова
        calculateMonthlyPaymentTwo();
    });

    // Обработчик для ручного ввода стоимости жилья
    $('#housingCostInput').on('input', function() {
        let newValue = $(this).val();

        // Удаляем пробелы и форматируем
        newValue = newValue.replace(/s/g, '');
        if (!isNaN(newValue) && newValue !== '') {
            $('#housingCost').val(newValue).trigger('input'); // Синхронизация с ползунком
            $(this).val(formatNumber(newValue)); // Форматируем для отображения
        }
    });

    $('#housingCostInputTwo').on('input', function() {
        let newValue = $(this).val();

        // Удаляем пробелы и форматируем
        newValue = newValue.replace(/s/g, '');
        if (!isNaN(newValue) && newValue !== '') {
            $('#housingCostTwo').val(newValue).trigger('input'); // Синхронизация с ползунком
            $(this).val(formatNumber(newValue)); // Форматируем для отображения
        }
    });

    // Обработчик для ручного ввода первоначального взноса
    $('#downPaymentInput').on('input', function() {
        let newValue = $(this).val();

        // Удаляем пробелы и форматируем
        newValue = newValue.replace(/s/g, '');

        if (!isNaN(newValue) && newValue !== '') {
            $('#downPayment').val(newValue).trigger('input'); // Синхронизация с ползунком
            $(this).val(formatNumber(newValue)); // Форматируем для отображения
        }
    });

    $('#downPaymentInputTwo').on('input', function() {
        let newValue = $(this).val();

        // Удаляем пробелы и форматируем
        newValue = newValue.replace(/s/g, '');

        if (!isNaN(newValue) && newValue !== '') {
            $('#downPaymentTwo').val(newValue).trigger('input'); // Синхронизация с ползунком
            $(this).val(formatNumber(newValue)); // Форматируем для отображения
        }
    });


    // Инициализация
    if ($('#downPaymentInput').length > 0) {
        calculateMonthlyPayment();
    }
    if ($('#downPaymentInputTwo').length > 0) {
        calculateMonthlyPaymentTwo();
    }

    if ( ($('.calc_qua').length == 3) && ($('#info_153').length < 1) ) {
        let maxHeight = $($('.calc_qua')[0]).children('.calc_ipote').outerHeight();
        if ($($('.calc_qua')[2]).children('.calc_ipote').outerHeight() > maxHeight) {
            $($('.calc_qua')[2]).children('.calc_ipote').addClass('calc_ipote--hidden');
            $($('.calc_qua')[2]).children('.calc_ipote').css('max-height', maxHeight);
            $($('.calc_qua')[2]).children('.calc_ipote').append("<button class='calc_showMore'>Читать далее</button>");
        }

        $('.calc_showMore').on('click', function() {
            $(this).parent().toggleClass('calc_ipote--hidden');
            $(this).parent().css('max-height', '1000px');
            $(this).remove();
        })
    }

    if ( ([2, 3].includes($('.calc_qua').length)) ) {
        let maxHeight = $($('.calc_qua')[0]).children('.calc_ipote').outerHeight();
        if ($($('.calc_qua')[1]).children('.calc_ipote').outerHeight() > maxHeight) {
            $($('.calc_qua')[1]).children('.calc_ipote').addClass('calc_ipote--hidden');
            $($('.calc_qua')[1]).children('.calc_ipote').css('max-height', maxHeight);
            $($('.calc_qua')[1]).children('.calc_ipote').append("<button class='calc_showMore'>Читать далее</button>");
        }
        if ($($('.calc_qua')[2]).children('.calc_ipote').outerHeight() > maxHeight) {
            $($('.calc_qua')[2]).children('.calc_ipote').addClass('calc_ipote--hidden');
            $($('.calc_qua')[2]).children('.calc_ipote').css('max-height', maxHeight);
            $($('.calc_qua')[2]).children('.calc_ipote').append("<button class='calc_showMore'>Читать далее</button>");
        }

        $('.calc_showMore').on('click', function() {
            $(this).parent().toggleClass('calc_ipote--hidden');
            $(this).parent().css('max-height', '1000px');
            $(this).remove();
        })
    }

    $('.proj_and_eng_works__showMore').on('click', function(e) {
        e.preventDefault();
        $(this).next('.b_form').addClass('proj_and_eng_works__showForm');
    })

    $('#proj_and_eng_works .form__closer').on('click', function(e) {
        e.preventDefault();
        $(this).parent().removeClass('proj_and_eng_works__showForm');
    })
    function adjustSlideHeights() {
        var maxHeight = 0;
        $("#info_153 .house-owl.owl-carousel .item").each(function () {
            var thisHeight = $(this).outerHeight();
            maxHeight = Math.max(maxHeight, thisHeight);
        });
        $("#info_153 .house-owl.owl-carousel .item").each(function () {
            $(this).css("height", maxHeight + "px");
        });
    }
    // Adjust heights dynamically
    adjustSlideHeights();

    // Adjust heights after carousel redraw
    $("#info_153 .house-owl.owl-carousel").on("changed.owl.carousel", function () {
        adjustSlideHeights();
    });


    $('.owl-nav-custom').on('click', '[data-owl-nav]', function() {
        var trigger = $(this),
            target = trigger.data('owl-nav'),
            wrapper = $('[data-owl-carousels="' + target + '"]'),
            owl = wrapper.find('.owl-loaded');

        if (owl.length) {
            if (trigger.hasClass('owl-next')) {
                owl.trigger('next.owl.carousel');
            } else {
                owl.trigger('prev.owl.carousel');
            }
        }
    });


    $('.readyHousesItem__slide').on('touchstart mousedown', function(e) {
        e.stopPropagation();
    });
    $('.readyHousesItem__slide img').on('click', function(e) {
        e.stopPropagation();

        var trigger = $(this),
            images = trigger.closest('.readyHousesItem__slide').find('.slick-slide:not(.slick-cloned) img'),
            galleryItems = [];

        images.each(function() {
            galleryItems.push({ src: $(this).attr('src') });
        });

        $.fancybox.open(galleryItems, { }, trigger.closest('.slick-slide').index() - 1 );
    })


    $(document).on('click', '.js-whatsapp', function () {
        var url = $(this).attr('href'),
            userId = Cookies.get('_ym_uid'),
            projectMaterial = $('[data-project_material]').length ? $('[data-project_material]').data('project_material') : '',
            projectModel = $('[data-project_model]').length ? $('[data-project_model]').data('project_model') : '';

        if (userId) {
            url = decodeURI(url);

            var urlParse = new URL(url);
            var text = urlParse.searchParams.get('text'); // Замените 'key' и 'value' на необходимые вам значения для URL
            if (text) {
                text += ' ###' + userId;
                text += ' ###' + projectMaterial;
                text += ' ###' + projectModel;
                urlParse.searchParams.set('text', text);

                var link = urlParse.href.split('text=');
                url = link.length == 2 ? link[0] + 'text=' + link[1].split('+').join('%20') : urlParse.href;
            }
            // console.log(url);

            window.location.href = url;
            return false;
        }
    });

    var maxPayload = '';
    $(document).on('click', '.js-max', function () {
        var trigger = $(this),
            url = trigger.attr('href'),
            userId = Cookies.get('_ym_uid'),
            projectMaterial = $('[data-project_material]').length ? $('[data-project_material]').data('project_material') : '',
            projectModel = $('[data-project_model]').length ? $('[data-project_model]').data('project_model') : '';

        if (trigger.hasClass('processing') || maxPayload != '') {
            return false;
        }

        if (userId && !trigger.hasClass('processing')) {
            trigger.addClass('processing');

            var formData = new FormData();
            formData.set('userId', userId);
            formData.set('projectMaterial', projectMaterial);
            formData.set('projectModel', projectModel);

            $.ajax({
                url: 'index.php?route=common/forms/getMaxLink',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                timeout: 1500,
                async: false,
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.deeplink) {
                        maxPayload = response.deeplink;

                        if (maxPayload) {
                            url = decodeURI(url);
                            var urlParse = new URL(url);

                            urlParse.searchParams.set('start', maxPayload);
                            window.location.href = urlParse.href;
                        }
                    }
                    trigger.removeClass('processing');
                }
            });
        }

        if (maxPayload == '') {
            return true;
        }

        return false;
    });



    var sliderMainWrap = $('.product-slider-main-wrap'),
        sliderPreviewWrap = $('.product-slider-nav-wrap');

    if (sliderPreviewWrap.length) {
        var swiperPreview = new Swiper(sliderPreviewWrap.find('.swiper').get(0), {
            loop: true,
            init: false,
            spaceBetween: 0,
            slidesPerView: 3,
            watchSlidesProgress: true,
            speed: 700,
            breakpoints: {
                0: {
                    slidesPerView: 3,
                },
                700: {
                    slidesPerView: 4,
                },
                900: {
                    slidesPerView: 5,
                },
                1180: {
                    slidesPerView: 6,
                },
                1300: {
                    slidesPerView: 7,
                }
            }
        });

        swiperPreview.on('init', function() {
            loadLazySlider(swiperPreview);
        });

        swiperPreview.init();

        var swiperMain = new Swiper(sliderMainWrap.find('.swiper').get(0), {
            loop: true,
            init: false,
            spaceBetween: 0,
            // autoplay: {
            //     delay: 7000,
            //     pauseOnMouseEnter: true,
            // },
            speed: 700,
            thumbs: {
                swiper: swiperPreview,
            },
        });

        swiperMain.on('init', function() {
            loadLazySlider(swiperMain);
        });

        swiperMain.init();
    }

    $('.newGallerySidebarTitle__btn').on('click', function() {
        $(this).toggleClass('newGallerySidebarTitle__btn--active');
        if ($(window).width() > 968) {
            $(this).parent().toggleClass('newGallerySidebarTitle--active');
            $(this).parent().parent().next('.newGallerySidebar__section').toggleClass('hidden');
        } else {
            $('.newGallerySidebar__section').toggleClass('shown');
        }
    })


    $('.works-nav button').on('click', function() {
        // Find the closest active complects tab body to ensure navigation only affects the current tab
        var activeTabBody = $(this).closest('.complectsTabsBody.active'),
            navTabs, current, target;

        if (activeTabBody.length) {
            // If we're inside a complects tab, only look for navigation tabs within this specific tab body
            navTabs = activeTabBody.find('.li_pr_f');
            current = navTabs.filter('.active');
        } else {
            // Fallback to original behavior if not inside complects tabs
            var container = $(this).closest('.works_full');
            navTabs = container.find('.li_pr_f');
            current = navTabs.filter('.active');
        }

        target = current;
        if ($(this).hasClass('owl-next')) {
            target = current.next('.li_pr_f').length ? current.next('.li_pr_f') : navTabs.first();
        } else {
            target = current.prev('.li_pr_f').length ? current.prev('.li_pr_f') : navTabs.last();
        }

        target.find('[data-toggle="tab"]').trigger('click');
    });

    checkTagsSlider();
    $(window).on('resize', function() {
        checkTagsSlider();
    });

    $('[data-tabs-nav] [data-tab]').on('click', function() {
        var container = $(this).closest('[data-tabs-container]'),
            items = container.find('[data-tabs] [data-tab]'),
            target = items.filter('[data-tab="' + $(this).data('tab') + '"]');

        if (!$(this).hasClass('active')) {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            items.removeClass('active');
            target.addClass('active');
        }
    });

    checkPlansSlider();
    $(window).on('resize', function() {
        checkPlansSlider();
    });
    function loadActiveImages(swiper) {

        $(swiper.slides)
            .filter('.swiper-slide-active, .swiper-slide-next')
            .find('img.lazy-img')
            .each(function () {

                const $img = $(this);

                if ($img.attr('data-src') && !$img.data('loaded')) {

                    $img.attr('src', $img.attr('data-src'));
                    $img.removeAttr('data-src');
                    $img.data('loaded', true);

                    // optional fade-in
                    $img.css('opacity', 0).animate({ opacity: 1 }, 300);
                }
            });
    }
    let slidersWorks = $('.works_full .swiper-works');
    slidersWorks.each(function () {
        new Swiper(this, {
            loop: true,
            speed: 700,
            navigation: {
                prevEl: $(this).find('.swiper-button-prev')[0],
                nextEl: $(this).find('.swiper-button-next')[0]
            },

            on: {
                init(swiper) {
                    loadActiveImages(swiper);
                },
                slideChangeTransitionStart(swiper) {
                    loadActiveImages(swiper);
                }
            }
        });
    });
    $('.telegramTopLink__closer').on('click', function(e) {
        e.preventDefault();
        setCookie('tgTop', '1', {
            expires: 86400,
            path: '/'
        });
        $('.telegramTopLink').hide();
    })

    $('.work-steps-toggle').on('click', function(e) {
        e.preventDefault();
        let newText = $(this).data('toggle-text');
        let oldText = $(this).text();
        $(this).text(newText);
        $(this).data('toggle-text', oldText);
        $(this).parent().next('.work-steps-inner').slideToggle();
    })

});

var swiperTags;
function checkTagsSlider() {
    var mobile = window.matchMedia("(max-width: 680px)");
    var sliderTagsWrap = $('.list_tag'),
        sliderTags = sliderTagsWrap.find('.swiper');

    if (mobile.matches && false) {
        if (!sliderTagsWrap.hasClass('js-inited')) {
            swiperTags = new Swiper(sliderTags.get(0), {
                spaceBetween: 10,
                loop: false,
                init: false,
                speed: 700,
                watchActiveIndex: true,
                watchSlidesProgress: true,
                slidesPerView: 2, // Number of slides visible per row
                grid: {
                    rows: 2, // Number of rows
                },
                navigation: false,
                allowSlideNext: false,
                allowSlidePrev: false,
                breakpoints: {
                    768: {
                        grid: {
                            rows: 1, // Number of rows
                        },
                        slidesPerView: 'auto',
                        navigation: {
                            prevEl: sliderTagsWrap.find('.swiper-prev').get(0),
                            nextEl: sliderTagsWrap.find('.swiper-next').get(0),
                            lockClass: 'disabled'
                        },
                        scrollbar: {
                            el: sliderTagsWrap.find('.swiper-scrollbar').get(0),
                            hide: false,
                            draggable: true,
                        },
                    }
                }
            });

            swiperTags.on('init', function() {
                sliderTagsWrap.addClass('js-inited');
            });

            swiperTags.on('afterInit', function() {
                swiperTags.slideTo(sliderTagsWrap.find('.active').index(), 0);
            });

            swiperTags.init();
        }
    } else if (sliderTagsWrap.hasClass('js-inited')) {
        swiperTags.destroy(true, true);
        sliderTagsWrap.removeClass('js-inited')
    }
}

var swiperPlans;
function checkPlansSlider() {
    var mobile = window.matchMedia("(max-width: 900px)");
    var sliderPlansWrap = $('.plans-nav-wrap'),
        sliderPlans = sliderPlansWrap.find('.swiper');

    if (mobile.matches) {
        if (!sliderPlansWrap.hasClass('js-inited')) {
            swiperPlans = new Swiper(sliderPlans.get(0), {
                spaceBetween: 10,
                slidesPerView: 'auto',
                loop: false,
                init: false,
                speed: 700,
                watchActiveIndex: true,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: sliderPlansWrap.find('.swiper-prev').get(0),
                    nextEl: sliderPlansWrap.find('.swiper-next').get(0),
                    lockClass: 'disabled'
                },
                scrollbar: {
                    el: sliderPlansWrap.find('.swiper-scrollbar').get(0),
                    hide: false,
                    draggable: true,
                },
            });

            swiperPlans.on('init', function() {
                sliderPlansWrap.addClass('js-inited');
            });

            swiperPlans.on('afterInit', function() {
                swiperPlans.slideTo(sliderPlansWrap.find('.active').index(), 0);
            });

            swiperPlans.init();
        }
    } else if (sliderPlansWrap.hasClass('js-inited')) {
        swiperPlans.destroy(true, true);
        sliderPlansWrap.removeClass('js-inited')
    }
}
