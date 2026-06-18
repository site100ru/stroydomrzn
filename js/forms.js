//Forms
function formsMask(){
	var input = 'body input[name="phone"]';
    $(input).inputmask({
        mask: "+7 (999) 999-99-99[9]",
        greedy: false,
        onBeforePaste: function(pastedValue, opts) {
            var processedValue = pastedValue.replace(/^8/, '').replace(/^\+7/, '');
            return processedValue;
        }
    });
    $(input).attr('placeholder','+7 (___) ___-__-__');
    jQuery.validator.addMethod("PhoneFormat", function (value, element) {
        return this.optional(element) || value.match(/\d/g).length >= 11;
    }, "Enter a valid phone number.");
    jQuery.validator.addMethod("NameFormat", function (value, element) {
        return value == '' || value.trim().length != 0;
    }, "Enter a valid name.");
	jQuery.validator.addMethod("RegionFormat", function (value, element) {
        return this.optional(element) ||/^[a-zA-Zа-яА-Я]+$/.test(value);
    }, "Enter a valid region.");
    if ($('#add_file').length > 0) {
        $.getScript('catalog/view/javascript/jquery/ajaxupload.js', function () {

          ajaxupload();
        });
    }
}

$(document).on("ajaxComplete", function() {
	//formsMask();
});

$(document).ready(function(){
	formsMask();
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  formsMask();
	});
});

function ajaxupload() {
    new AjaxUpload('#add_file', {
        action: 'index.php?route=common/forms/upload',
        name: 'image',
        autoSubmit: false,
        responseType: 'json',
        onChange: function (file, extension) {
            //console.log(file);
            //console.log(extension);

            this.submit();
        },
        onSubmit: function (file, extension) {
            $('.all_upload_conteiner').append('<div class="upload_conteiner"><div class="upload_data" data="' + file + '"><img src="catalog/view/theme/aps_2015/image/loading.gif" class="loading"  /></div><div class="remove_upload"></div></div>');
            $('.remove_upload').bind('click', function () {
                $(this).parent().remove();
            });
            //$('#upload').append('<img src="view/image/loading.gif" class="loading" style="padding-left: 5px;" />');
        },
        onComplete: function (file, json) {
            if (json.image) {
                $('div[data=\'' + file + '\']').html('<img src="' + json.image + '" /><input type="hidden" name="file[]" value="' + json.path + '"  />');
            }

            /*if (json.success) {
             var tree = $.tree.focused();

             tree.select_branch(tree.selected);

             alert(json.success);
             }*/

            if (json.error) {
               console.log(json.error);
                $('div[data=\'' + file + '\']').parent().remove();
            }

            //$('.loading').remove();
        }
    });
}

function stripHtml(html){
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

function getForm(options) {
    options.return_url = window.location.href;
	var title = options.title;
	if (options.id == "newyear2020") {
		var title = "<span>"+options.subTitle+"</span>";
	}
	var dialogClass = '';
	if (typeof options.dialogClass != 'undefined') {
		var dialogClass =options.dialogClass;
	}
    $.ajax({
        url: 'index.php?route=common/forms',
        type: 'post',
        dataType: 'html',
        data: options,
        success: function (html) {
            $("#dialog-form").dialog({
                autoOpen: false,
                //height: 500,
                //width: 500,
                modal: true,
                title: title,
				dialogClass: dialogClass
            });
            $('#dialog-form').html(html);
            // grecaptcha.ready(function() {
            //     grecaptcha.execute('6LfE_3ckAAAAAHnKQFYx0cyOOcDaxsG_9WEjbAXY', {action: 'homepage'}).then(function(token) {
            //         document.getElementById('token2').value = token
            //     });
            // });
            $('.ui-dialog-titlebar-close').addClass('btn-fixed');
            $("#dialog-form").dialog("open");
			var dialogTitleNY = $('#form_newyear2020').find('.h1');
			dialogTitleNY.html(title);
            $('#tel, .mask').inputmask({
                mask: "+7 (999) 999-99-99[9]",
                greedy: false,
                onBeforePaste: function(pastedValue, opts) {
                    var processedValue = pastedValue.replace(/^8/, '').replace(/^\+7/, '');
                    return processedValue;
                }
            });

            if ($('#add_file').length > 0) {
                $.getScript('catalog/view/javascript/jquery/ajaxupload.js', function () {

                    ajaxupload();
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
           // alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
           console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
