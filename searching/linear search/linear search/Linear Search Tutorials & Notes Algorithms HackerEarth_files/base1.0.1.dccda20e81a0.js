var debug = false;

// Scripts to be loaded using loadScripts()
var G_SCRIPTS = [];
var G_SCRIPTS_LOADED = false;

// regex for matching an email
var EMAIL_RE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

var AJAX_OK = 'OK';
var AJAX_ERROR = 'ERROR';
var MAX_HEIGHT = 250;
var ALLOWED_IMAGE_FORMATS = ['png', 'jpg', 'jpeg'];

var LINKEDIN = 'linkedin';
var GITHUB = 'github';
var SPOJ = 'spoj';
var CODECHEF = 'codechef';
var TOPCODER = 'topcoder';
var STACKOVERFLOW = 'stackoverflow';

// this id is clicked by history.js?v=0.1
var ID_CLICK_BY_HISTORY = null;

var MESSAGE_FADEOUT_TIME = 5000;

// Defaulting this to an invalid value
var USER_TIMEZONE = 'NA';

var niceScrollArgs = {
    cursorwidth: "7px",
    cursorcolor: "#CCC",
    cursorborder: "none",
    cursorborderradius: "0px",
    autohidemode: false,
    background: "#EEE",
    nativeparentscrolling: false,
    enablescrollonselection: false,
};

var niceScrollDarkArgs = {
    cursorwidth: "10px",
    cursorcolor: "#888",
    cursorborder: "none",
    cursorborderradius: "0px",
    autohidemode: false,
    background: "#CCC",
    nativeparentscrolling: false,
    enablescrollonselection: false,
};

var customScrollbarArgs = {
    scrollButtons:{enable:false},
    theme:"my-theme",
    scrollbarPosition:"outside",
    autoHideScrollbar: false,
    scrollInertia: 100,
}

// capitalizes the first letter of the word
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

// tells if a string is empty or not
function isEmptyString(s) {
    if (s.length == 0) {
        return true;
    } else {
        return false;
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                                results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// returns the parent form of an input field
function getParentForm(element) {
    var form = element[0].form;
    form = $(form);
    return form;
}

// call this function with the modal id to show the modal
function showModal(target_id) {
    var target = $('#'+target_id);
    // show the modal window
    target.show();
    target.modal({
        onClose: function(dialog){
            dialog.data.fadeOut(300);
            dialog.container.fadeOut(300, function () {
                dialog.overlay.hide();
                $.modal.close();
                $('.modal-window').hide();
            });
        },
        onOpen: function(dialog){
            dialog.overlay.fadeIn(300);
            dialog.data.show();
            dialog.container.fadeIn(300);
        }
    });
}

function addImageData(form, return_value) {

    var image_field = form.find('input:file');
    var file = image_field[0].files[0];
    var fileName = image_field.val();
    fileName = fileName.toLowerCase();
    var fileExt = fileName.split('.');

    // find out the image extension
    var startIndex = (fileName.indexOf('\\') >= 0 ? fileName.lastIndexOf('\\') : fileName.lastIndexOf('/'));
    var baseFileName = fileName.substring(startIndex);
    if (baseFileName.indexOf('\\') === 0 || baseFileName.indexOf('/') === 0) {
        baseFileName = baseFileName.substring(1);
    }
    var extension_found = false;
    for (var i = 0; i < ALLOWED_IMAGE_FORMATS.length; i++) {
        if(ALLOWED_IMAGE_FORMATS[i] == fileExt[fileExt.length-1]) {
            extension_found = true;
            break;
        }
    }

    // see if this extension is allowed or not
    if (!extension_found)  {
        console.log('extension is not allowed');
        return_value = { error: true };
    } else {
        console.log('extension is allowed');
        reader = new FileReader();
        reader.onload = function(event) {
            alert('file has been read');
            var img = event.target.result;
            var file = img.split(',')[1];
            var type = img.split(',')[0].split(':')[1].split('/')[1].split(';')[0];
            image_data = {
                type: 'base64',
                key: '88wvr0jnjv6xapcyfdmmf5x8gl47zawv',
                image_name: baseFileName,
                image_data: file,
            }
            return_value = { error: false, image: image_data };
            console.log('returning the image data');
            console.log(return_value['image']);
            alert('setting asyncCompleted to true');
        }
        reader.onerror = function(stuff) {
            alert(stuff.getMessage());
            return_value = { error: true };
            asyncCompleted = true;
        }
        reader.readAsDataURL(file);
    }
}

// run this set of triggers/functions whenever a dom element
// is injected, this function is called whenever elements
// are dynamically injected in the DOM
function domElementLive() {

    try {
        // process tool-tip class if any such element was loaded
        $('.tool-tip').tipTip({defaultPosition: 'top'});
        $('.no-escape-tool-tip').tipTip({defaultPosition: 'top', noEscape: true});
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    try {
        // add custom scroll-bar if any such element was loaded
        $('.nice-scrollbar').niceScroll(niceScrollArgs);
        var niceScrollObj = $('.nice-scrollbar').getNiceScroll();
        niceScrollObj.resize();
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    try {
        $('.custom-scrollbar').mCustomScrollbar(customScrollbarArgs);
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    /*
     * nicescroll is not working in modal window.
    try {
        $('.nice-scrollbar-modal').niceScroll(niceScrollArgs);
    } catch(err) {
        if (debug)
            console.log(err.message);
    }
    */

    try {
        // add custom scroll-bar if any such element was loaded
        $('.nice-scrollbar-dark').niceScroll(niceScrollArgs);
        var niceScrollObj = $('.nice-scrollbar-dark').getNiceScroll();
        niceScrollObj.resize();
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    try {
        styleCode();
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    // disable all input fields of a form
    // which has the class disabled
    $('form.disabled').each(function() {
        $(this).find('input').each(function() {
            $(this).attr('disabled', 'disabled');
        });
    });

    init_sticky();
}

function init_sticky() {
    $('.sticky-item').each(function(index) {
        var $this = $(this);

        // check if this is already sticky
        var is_sticky = $this.attr('is-sticky');
        if (is_sticky !== undefined){
            return;
        }

        var options = {};

        var top_spacing = $this.attr('sticky-top');
        if (top_spacing === undefined) {
            top_spacing = 0;
        }
        else {
            top_spacing = parseInt(top_spacing);
        }
        options['topSpacing'] = top_spacing;

        var bottom_spacing = $this.attr('sticky-bottom');
        if (bottom_spacing === undefined) {
            bottom_spacing = 0;
        } else {
            bottom_spacing = parseInt(bottom_spacing);
        }

        options['bottomSpacing'] = bottom_spacing;
        options['responsiveWidth'] = true;

        $this.sticky(options);
        $this.attr('is-sticky', 'true');
        $this.width($this.width()+'px');
        // Set height auto for the sticky wrapper added automatically, this
        // keeps the HTML sane.
        $this.parent().css('height', 'auto');
    });
}


// Load script dynamically and then use callback to perform some operation
function loadScripts(array, callback, error_callback){

    // if no error_callback provided
    if(typeof error_callback != "undefined") {
        var _continue = false;
        var _started = false;

        // set timeout for scripts loading - 40s
        var scripts_watcher = function() {
            error_callback && error_callback();
            return false;
        };
        var _scripts_loading_tracker = setTimeout(scripts_watcher, 40*1000);
    }

    var loader = function(src, handler) {
        if(typeof error_callback != "undefined") {
            _continue = false;
            _started = true;
        }

        var script = document.createElement("script");
        script.src = src;

        //To log errors for dynamically added scripts
        script.crossOrigin = 'anonymous';

        // Other browsers
        script.onload = function(){
            if(typeof error_callback != "undefined") {
                _continue = true;
                clearTimeout(_scripts_loading_tracker);
            }
            handler();

        }

        // MSIE browser
        script.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                if(typeof error_callback != "undefined") {
                    _continue = true;
                    clearTimeout(_scripts_loading_tracker);
                }
                handler();
            }
        }

        // on error
        if(typeof error_callback != "undefined") {
            script.addEventListener('error', function(){
                _continue = false;
                 clearTimeout(_scripts_loading_tracker);
                 handler();

            }, true);
        }

        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function(){

        // error in loading one of the scripts
        if(typeof error_callback != "undefined") {
            if(_continue == false && _started == true) {
                error_callback && error_callback();
                return false;
            }
        }

        // no error
        if(array.length!=0){
            loader(array.shift(),arguments.callee);
        }else {
            callback && callback();
            return false;
        }
    })();
}

// Include CSS files dynamically
function loadCSS(array, callback){
    var loader = function(src, handler){
        var link = document.createElement("link");
        link.href = src;
        link.rel = 'stylesheet';
        var head = document.getElementsByTagName("head")[0];
        link.onload = link.onreadystatechange = function(){
        link.onreadystatechange = link.onload = null;
            handler();
        }
        head.appendChild(link);
    };
    (function(){
        if(array.length !=0 ){
            loader(array.shift(),arguments.callee);
        }else{
            callback && callback();
        }
    })();
}

function loadScriptsReady() {
    if (typeof loadScripts != 'undefined') {
        loadScripts(G_SCRIPTS, function() {
            G_SCRIPTS_LOADED = true;
            $('.load-javascript-div').show();
            $('.load-javascript').hide();
        });
    }
    else {
        setTimeout(loadScriptsReady, 100);
    }
}


var LOADER_HTML = "<div class='dots-loader'></div>";
var HORIZONTAL_LOADER_HTML = "<div class='horizontal-loader'></div>";
var LOADER_HTML_NO_MARGIN = "<div class='dots-loader-no-margin'></div>";
var LOADER_HTML_WITH_MARGIN = "<div class='dots-loader' style='margin: 30px 0 30px 0';></div>";

/*
  Definition of Genric Loader Starts here

  updateAncestorsOnLoaderMount,
  updateAncestorsOnLoaderUnmount,
  insertLoader,
  removeLoader,

*/

/*
    Called when a loader is mounted on its parent
    Arguments:
        startNode i.e ParentNode of the loader
        The level upto which no-scroll class should be applied for ancestors of the startNode
*/

function updateAncestorsOnLoaderMount(startNode, level) {
    if(level <= 0) {
        return;
    } else {
        var parents = startNode.parents();
        for (var i = 0;
            (i < parents.length && i < level); i++) {
            $(parents[i]).addClass("no-scroll");
        }
    }
}

/*
    Called when A Loader is unmounted from its parent
    Arguments:
        startNode i.e ParentNode of the loader
        The level upto which no-scroll class should be removed from ancestors of the startNode
*/

function updateAncestorsOnLoaderUnmount(startNode, level) {
    if (level <= 0) {
        return;
    } else {
        var parents = startNode.parents();
        for (var i = 0;
            (i < parents.length && i < level); i++) {
            $(parents[i]).removeClass("no-scroll");
        }
    }
}

/*
    Called when a loader is required to cover its parent
    Arguments:
        parentJqueryObj i.e Parent Jquery Object which the loader is going to cover
        config:
        {
            loaderText: <string>; // used as the display text above the dots loader

            fontSize: <string>; // defaults to 20px (inherited from CSS Class 'large-20') eg 2px, 2em, 2%, etc

            isOpaque: <boolean>; // used to make the bg of loader opaque or translucent.

            noScrollParentsLevel: <number> // The level upto which no-scroll class should be applied to ancestors of the parent.
        }
*/

function insertLoader(parentJqueryObj, config) {
    if(typeof config === 'undefined' || config === null) {
        config = {};
    }
    var forRender = '<div class="generic-loader-wrapper';
    if (config.isOpaque) {
        forRender += ' white-background';
        // hide all siblings from view but don't remove them
        parentJqueryObj.children().addClass('forced-not-visible');
    }
    forRender += '">';
    if (config.loaderText) {
        forRender += '<div class="loading-heading align-center standard-margin larger dark weight-700 large-20"';
        if (config.fontSize) {
            forRender += 'style="font-size: ' + config.fontSize + '"';
        }
        forRender += ">" + config.loaderText + "</div>";
    }
    forRender +=
        '   <div class="dots-loader" style="margin:20px auto;"></div></div>';
    // make parentJqueryObj relative if no position is set; for position absolute and fixed, we got no problem
    if (parentJqueryObj.css("position") === "static") {
        parentJqueryObj.css("position", "relative").data("setInitialPos", "static");
    }
    parentJqueryObj.addClass("no-scroll full-height");
    if (config.noScrollParentsLevel === undefined) {
        config.noScrollParentsLevel = 0;
    }
    updateAncestorsOnLoaderMount(parentJqueryObj, config.noScrollParentsLevel);
    parentJqueryObj.data("noScrollParentsLevel", config.noScrollParentsLevel).append(forRender);
}

function removeLoader(parentJqueryObj) {
    updateAncestorsOnLoaderUnmount(parentJqueryObj, parentJqueryObj.data("noScrollParentsLevel"));
    parentJqueryObj.removeClass("no-scroll full-height");
    parentJqueryObj.children().removeClass('forced-not-visible');
    if (parentJqueryObj.data("setInitialPos") === "static") {
        parentJqueryObj.css("position", "static");
    }
    parentJqueryObj.children(".generic-loader-wrapper").remove();
}
/**
  Definition of Generic Loader Ends here
**/

function hideAlertContainer() {
    var messageHolder = $('#alert-message-holder');
    if(messageHolder.length == 0) {
        messageHolder = $("#fancy-alert-message-holder");
    }
    var messages = messageHolder.find('.alert-message');

    // assuming there is always a message on the page
    var message = messages.first();

    // make a clone, there should always be
    // an element which we can override for adding
    // a new message
    var clone = message.clone();
    clone.addClass('hidden');

    messages.each(function() {
        var message = $(this);
        if (message.hasClass('hidden')) {
            message.remove();
        } else {
            if (!message.hasClass('permanent')) {
                if (message.hasClass('fancy-alert-message')) {
                    setTimeout(function() {
                        message.slideUp(1000);
                    }, 2000);
                }
                else {
                    // fade out the element and then remove it
                    setTimeout(function(){
                        message.fadeOut(function() {
                            message.remove();
                        })
                    }, MESSAGE_FADEOUT_TIME);
                }
            }
        }
    });

    // after all the messages have been removed or
    // faded out append the final message
    messageHolder.append(clone);
}

// add an alert in the alert placeholder
function addAlert(message_text, permanent) {
    var messageHolder = $('#alert-message-holder');
    if (messageHolder.length == 0) {
        messageHolder = $('#fancy-alert-message-holder');
    }
    var messages = messageHolder.find('.alert-message');

    // there will always be one message
    var message = messages.first();
    var clone = message.clone();
    clone.find('.message').text(message_text);

    // blindly remove the permanent and
    // hidden class
    clone.removeClass('permanent');
    clone.removeClass('hidden');

    // add the permanent class if required
    if (typeof permanent != undefined) {
        if (permanent == true) {
            clone.addClass('permanent');
        }
    }
    messageHolder.append(clone);
    hideAlertContainer();
}

function getBrowserInfo() {
    navigator.sayswho= (function(){
        var ua= navigator.userAgent,
            N= navigator.appName, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
        M= M[2]? [M[1], M[2]]:[N, navigator.appVersion, '-?'];
        if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
        return M.join(' ');
    })();

    var browser = navigator.sayswho;
    var parts = browser.split(" ");
    browser = parts[0].toLowerCase();
    version = parts[1];
    var version_parts = version.split(".");
    version = parseInt(version_parts[0]);
    return {
        name: browser,
        version: version
    }
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

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

function eraseCookie(name) {
    createCookie(name,"",-1);
}

// function for closing all modal windows on the page.
// can be called from execute, execute-on-error of any
// ajax call
function closeAllModals() {
    $('.simplemodal-close').click();
}

function resizeIframe(iframeClass){
    var iFrames = $('.' + iframeClass);
    for (var i = 0, j = iFrames.length; i < j; i++) {
        iFrames[i].style.height = iFrames[i].contentWindow.document.body.scrollHeight + 'px';
    }
}

jQuery.fn.extend({
    tag_selectize: function(urls, shouldCreate, showAll) {
        /// shouldCreate: variable is used to control
        // creation of tag in tag select
        // by default it will be true i.e Add tag will be on
        // explicitly passing false only will restrict the
        // Addition of tag while selection

        // showAll: variable is used to differentiate the tags
        // to be shown in setter and recruiter
        // some of tags in are the one's which are not yet
        // to be visible to the recruiters but setters should be
        // allowed to use those tags while creating problems hence this variable.
        var isShowAll = !!showAll;
        if (urls.constructor != Array) {
            urls = [urls];
        }
        $(this).selectize({
            delimiter: ',',
            valueField: 'tag',
            labelField: 'tag',
            sortField: 'tag',
            searchField: 'tag',
            plugins: ['remove_button'],
            persist: false,
            create: !(shouldCreate === false),
            render: {
                option: function(item, escape) {
                    return '<div>' + escape(item.tag.trim()) + '</div>';
                }
            },
            load: function(query, callback) {
                for (var url_index in urls) {
                    $.ajax({
                        url: urls[url_index] + '?term=' + query + '&show_all=' + isShowAll,
                        type: 'GET',
                        dataType: 'json',
                        error: function() {
                            callback();
                        },
                        success: function(res) {
                            var tags = res.map(function(tag) {
                                return {'tag': tag};
                            });
                            callback(tags);
                        },
                    });
                }
            },
        });
    }
});

function toggle_display_text_feedback(mode){
    var text_feedback = $('#text_feedback_comment');
    var text_feedback_div = text_feedback.parent('div');
    if(mode){
        text_feedback_div.fadeIn();
    } else {
        text_feedback_div.fadeOut();
    }
}

function feedback_success_action(){
    var feedback_div = $('#feedback-popup-container');
    var check_flag = feedback_div.find(".save-feedback-popup").hasClass('clicked');
    if(check_flag){
        var cross = feedback_div.find('#feedback_cross_flag').val();
        if(cross != ''){
            feedback_div.slideUp();
        } else {
            //feedback_div.find('#feedback-title').hide();
            feedback_div.find('.feedback-prompt').hide();
            feedback_div.find('.cross-feedback-popup').hide();
            feedback_div.find('#feedback-success-message').show();
            feedback_div.delay(2000).slideUp();
        }
    }
}

function executeFromStr(strOfFunctions, executeArg) {
    // Execute all functions from a space-separated string of functions
    // This function currently takes only one argument as a parameter
    if (strOfFunctions) {
        // Store all the strings of functions in a list
        var executeList = strOfFunctions.split(" ");
        for(var i = 0; i < executeList.length; i++) {
            var command = executeList[i];
            // Execute the functions
            if (executeArg)
                window[command](executeArg);
            else
                window[command]();
        }
    }
}

$(document).ready(function() {

    try {
        $('.nice-scrollbar').niceScroll(niceScrollArgs);
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    try {
        $('.custom-scrollbar').mCustomScrollbar(customScrollbarArgs);
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    try {
        $('.tool-tip').tipTip({defaultPosition: 'top'});
        $('.no-escape-tool-tip').tipTip({defaultPosition: 'top', noEscape: true});
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    try {
        $('.nice-scrollbar-dark').niceScroll(niceScrollDarkArgs);
    } catch(err) {
        if (debug)
            console.log(err.message);
    }

    // Initialize all sticky elements.
    init_sticky();

    // call this to hide all the alert boxes
    // that have been added on page load
    hideAlertContainer();

    $('.init-carousel').live('click', function() {
        $('#recommend-event-slider').tinycarousel();
        $('#slide-bars').removeClass('hidden');
    });

    $('.slide-up-div').live('click', function() {
        var $this = $(this);
        var target = $this.attr('target');
        $('.'+target).slideUp();
    });

    // remove the message on clicking cross
    $('.alert-message .cross-holder .small-cross').live('click', function() {
        $(this).parent().parent().remove();
    });

    if (typeof profile_completeness_percentage != 'undefined' && profile_completeness_percentage >= 0) {
        var profile_completeness_color;
        if (profile_completeness_percentage >= 75) {
            profile_completeness_color = '#73b369';
        } else if (profile_completeness_percentage >= 50) {
            profile_completeness_color = '#f1c40f';
        } else if (profile_completeness_percentage >= 25) {
            profile_completeness_color = '#e67e22';
        } else if (profile_completeness_percentage > 0) {
            profile_completeness_color = '#dd4b39';
        } else {
            profile_completeness_color = '#dd4b39';
            profile_completeness_percentage = 2;
        }
        $(".profile-complete-bar-head .profile-complete-bar-done").width(profile_completeness_percentage+"%").css("background-color", profile_completeness_color);
    }

    $("#searchbar-input").focusin(function() {
        $("#search-icon-container").addClass("in-focus");
    });

    $("#searchbar-input").focusout(function() {
        $("#search-icon-container").removeClass("in-focus");
    });

    $(".expand-sub-header a").on("mouseenter", function() {
        $(".sub-header").hide();
        $("." + $(this).parent().attr("id") + "-header").show().css('left', Math.round($(this).parent().offset().left) + 10);
        $("." + $(this).parent().attr("id") + "-header").find(".menu-arrow").css('left', Math.round(($(this).parent().width())/2) - 18);
    });

    $(".expand-sub-header").on("mouseleave", function(e) {
        if ((e.pageY < $(this).position().top + $(this).height() && $(e.relatedTarget).hasClass("menu-arrow") !== true) ||
            (!$(e.relatedTarget).hasClass("menu-arrow") && !$(e.relatedTarget).hasClass("sub-nav-bar"))) {
            $(".sub-header").hide();
        }
    });

    $(".sub-header").on("mouseleave", function() {
        $(".sub-header").hide();
    });

    $('.mobile-menu-btn').one('click', function(e) {
        var temp;
        if ($(".nav-bar .nav-bar-menu").length > 0) {
            $mobile = $('<ul/>').addClass("tablet-show nav-mobile nav-bar");
            $(".nav-bar > li").each(function() {
                if ($(this).hasClass("expand-sub-header")) {
                    temp = $("." + $(this).attr("id") + "-header").find(".sub-nav-bar");
                    $mobile.append(temp.html());
                } else if ($(this).attr('id') == "hacker-dd-icon") {
                    temp = $(this).attr("expand");
                    $mobile.append($("#" + temp + " > ul").html());
                } else {
                    $mobile.append($(this).clone());
                }
            });
            $mobile.find("hr").remove();
            $mobile.find("a li").contents().unwrap();
            $mobile.find("a.tablet-hide").remove();
            $mobile.children("a").wrap('<li/>');
            $(".right-nav-bar").after($mobile);
            $(".nav-mobile li").on("click", function() {
                $('.mobile-menu-btn').trigger("click");
            });
        }
    }).on('click', function(e) {
        var nav_bar = $('.nav-bar.nav-mobile');
        var menu_btn = $(this);
        var body = $('body');
        var isHeaderPrimaryAvailable = $('#header-primary').length > 0;
        var mobileMenuExpandPrimary = $('#mobile-menu-expand-primary');
        /* 'visible' class check is only used here to handle
        hide and show of mobileMenuExpandPrimary */
        function slideBodyRight() {
            menu_btn.fadeOut(function() {
                menu_btn.removeClass("fa-bars").addClass("fa-arrow-left");
            });
            body.addClass("right-transform");
            menu_btn.fadeIn();
        }
        function resetBody() {
            menu_btn.fadeOut(function() {
                menu_btn.removeClass("fa-arrow-left").addClass("fa-bars");
            });
            body.removeClass("right-transform");
            menu_btn.fadeIn();
        }
        if (isHeaderPrimaryAvailable) {
            if (mobileMenuExpandPrimary.hasClass('visible')) {
                resetBody();
                mobileMenuExpandPrimary.removeClass('visible');
            } else {
                slideBodyRight();
                mobileMenuExpandPrimary.addClass('visible');
            }
        } else {
            if (nav_bar.hasClass('visible')) {
                resetBody();
                nav_bar.removeClass('visible');
            } else {
                slideBodyRight();
                nav_bar.addClass('visible');
            }
        }
        e.preventDefault();
    });

    $('.nav-bar.nav-mobile').on('swipeleft', function() {
        var nav_bar = $('.nav-bar.nav-mobile');
        var menu_btn = $(this);
        var body = $('body');
        var isHeaderPrimaryAvailable = $('#header-primary').length > 0;
        var mobileMenuExpandPrimary = $('#mobile-menu-expand-primary');
        if($(this).hasClass('visible')) {
            menu_btn.fadeOut(function() {
                menu_btn.removeClass("fa-arrow-left").addClass("fa-bars");
            });
            body.removeClass("right-transform");
            menu_btn.fadeIn();
            if (isHeaderPrimaryAvailable) {
                mobileMenuExpandPrimary.removeClass('visible');
            } else {
                nav_bar.removeClass('visible');
            }
        }
    });

    /*** DROPDOWN MENU ***/
    /* Generic implementation to show the drop down menu. */
    var $gdropdownthis;

    $('.nav-menu').live('click', function(event) {
        var gdropdowntimer;
        var $id_dropdownthis;

        // If we are clicking on the same dropdown, then hide the expand box.
        if (typeof $gdropdownthis !== 'undefined' && $gdropdownthis !== null && $(this).html() === $gdropdownthis.html()) {
            $('.expand-box').hide();
            $gdropdownthis.removeClass('selected');
            return;
        }

        // Remove the selected class from previously hover element
        if (typeof $gdropdownthis !== 'undefined' && $gdropdownthis !== null) {
            $gdropdownthis.removeClass('selected');
        }

        $gdropdownthis = $(this);
        var id_dropdownthis = $gdropdownthis.attr('id');
        if (typeof(id_dropdownthis) === 'undefined' || id_dropdownthis === 'undefined') {
            return;
        }

        var $id_dropdownthis = $('#'+id_dropdownthis);
        var box = $('#'+$id_dropdownthis.attr('expand'));
        if (typeof box === 'undefined') {
            return;
        }

        // Hide all expand boxes
        $('.expand-box').hide();

        // Add selected class to nav-menu label
        $id_dropdownthis.addClass('selected');

        // adjust the postion of box
        var pos = $id_dropdownthis.offset();
        var pos_func = $gdropdownthis.attr('pos');
        if (typeof pos_func !== 'undefined' && pos_func === 'position') {
            pos = $id_dropdownthis.position();
        }

        // adjust the position due to scroll
        var pos_func = $gdropdownthis.attr('adjust-scrolltop-pos');
        if (typeof pos_func !== 'undefined' && pos_func === 'fix-scrolltop') {
            pos.top = $id_dropdownthis.offset().top - scrollY;
        }

        var height = $id_dropdownthis.outerHeight();

        var left = pos.left;
        var topPos = pos.top + height;

        var position_adjust = box.attr('position-adjust');
        if (position_adjust === 'add-scrolltop') {
            try {
                var scroll_class = box.attr('scroll-class');
                var scroll_obj = $('.'+scroll_class).getNiceScroll();
                topPos += scroll_obj[0].scrollTop();
            } catch(err) {
                if (debug)
                    console.log(err.message);
            }
        }

        var width = $id_dropdownthis.outerWidth();
        var leftPos = left + width - box.outerWidth();

        box.css({
            'left': leftPos + 'px',
            'top': topPos + 'px',
        });

        if(box.is(':hidden')) {
            box.show();
        }

        event.stopPropagation();
        return false;
    });

    $('.expand-box').live('click', function(event) {
        event.stopPropagation();
    });

    $('body').live('click', function(event) {
        $('.expand-box').hide();
        if (typeof($gdropdownthis) !== 'undefined' && $gdropdownthis !== null) {
            $gdropdownthis.removeClass('selected');
        }
        $gdropdownthis = null;
    });

    $(window).scroll(function(event) {
        $('.expand-box').hide();
        if (typeof($gdropdownthis) !== 'undefined' && $gdropdownthis !== null) {
            $gdropdownthis.removeClass('selected');
        }
        $gdropdownthis = null;
    });
    /** DROPDOWN MENU END **/

    /* Generic function to simulate tab clicks. */
    $('.tab-large-linear').live('click', function(e) {
        var $childEl = $(this).children();
        // Remove selected class from all tabs
        // We need to reference from parent as other types of tab
        // may be present in the same DOM.
        $(this).parent().find('.tab-name').each(function() {
            $(this).removeClass('selected');
            var $data_container = $('.' + $(this).attr('data-container'));
            $data_container.hide();
        });

        // Add selected class to this tab
        $childEl.addClass('selected');
        var $data_container = $('.' + $($childEl[0]).attr('data-container'));
        //$data_container.show();
        var url = $($childEl[0]).attr('ajax');
        var cache = $($childEl[0]).attr('cache');

        if (typeof cache !== 'undefined' && cache !== false) {
            cache = true;
        }

        var make_ajax;
        if(cache) {
            make_ajax = false;
        } else {
            make_ajax = true;
        }

        if(!$.trim($data_container.html())) {
            $data_container.html(LOADER_HTML);
            make_ajax = true;
        }

        if(make_ajax) {
            var xhr = $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                success: function(response) {
                    if(response['status'] == AJAX_OK) {
                        if(response) {
                            $data_container.html(response['container-html']);
                            latexifyAjaxDiv($data_container);
                        }
                    }
                    else {
                        $data_container.html('');
                    }
                    domElementLive();
                }
            });
        }
        $data_container.show();
        return;
    });

    $('.tab').live('click', function(e) {
        var make_ajax;
        var $childEl = $(this).children();
        // Remove selected class from all tabs
        // We need to reference from parent as other types of tab
        // may be present in the same DOM.
        $(this).parent().find('.tab-name').each(function() {
            $(this).removeClass('selected');
            var $data_container = $('.' + $(this).attr('data-container'));
            $data_container.hide();
        });

        // Add selected class to this tab
        $childEl.addClass('selected');
        var $data_container = $('.' + $($childEl[0]).attr('data-container'));
        //$data_container.show();
        var url = $($childEl[0]).attr('ajax');
        var cache = $($childEl[0]).attr('cache');

        if (cache === 'true' || cache === 'True' || cache === true) {
            cache = true;
        } else {
            cache = false;
        }

        if(cache) {
            make_ajax = false;
        } else if (!cache && typeof url !== 'undefined' && url !== '') {
                make_ajax = true;
                $data_container.html('');
        }

        if(!$.trim($data_container.html())) {
            $data_container.html(LOADER_HTML);
            make_ajax = true;
        }

        if(typeof(url)!=='undefined' && make_ajax) {
            var xhr = $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                success: function(response) {
                    if(response['status'] == AJAX_OK) {
                        if(response) {
                            $data_container.html(response['container-html']);
                            latexifyAjaxDiv($data_container);
                        }
                    }
                    else {
                        $data_container.html('');
                    }
                    domElementLive();
                }
            });
        }
        $data_container.show();
        return;
    });

    // use this when some feeds have to be loaded
    // on click of a button
    $('.load-feeds').live('click', function(){
        var $this = $(this);
        var url = $this.attr('feeds_url');
        var success = $this.attr('success');

        $.init_scroll({
            url: url,
            replaceData: true,
            success: success,
            post_data: (typeof filterParams == 'undefined') ? {} : filterParams,
        });
        $('.load-feeds').each(function() {
            $(this).removeClass('selected');
        });
        $this.addClass('selected');

    });


    // mimic text from one input to a div
    $('.copy-text').live('keyup', function() {
        var target_id = $(this).attr('target');
        var val = $(this).val();
        var target = $('#'+target_id);
        target.text(val);
    });
    // end mimic text


    $('.ajax-get').live('click', function(event) {
        var $this = $(this);

        // if the button is disabled then
        // don't let it be submitted
        if ($this.hasClass('disabled')) {
            return false;
        }

        var target_id = $this.attr('target');
        var target;
        if (target_id) {
            target = $('#'+target_id);
        } else {
            target = null;
        }

        var noreplace = $this.attr('noreplace');

        var execute = $this.attr('execute');
        var url = $this.attr('ajax');
        var success = $this.attr('success');
        var csrfEnabled = $this.attr('csrfenabled');

        // the value of button
        var input_value = $this.text();
        var clicked_value = $this.attr('clicked');
        if (clicked_value) {
            $this.text(clicked_value);
        }

        // add clicked class
        $this.addClass('clicked');

        var check = $this.attr('confirm');
        if(check) {
            if(!confirm('Are you sure you want to perform this action?')) {
                return false;
            }
        }

        // Execute get request only one time
        var execute_once = $this.attr('executeonce');
        var executed = $this.attr('executed');
        if(execute_once=="true") {
            if(executed=="true") {
                return false;
            } else {
                $this.attr('executed', 'true');
            }
        }

        // make the GET request
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr) {
                if (csrfEnabled) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function(response) {

                // execute any function that have to be executed
                if (response['status'] == AJAX_OK) {
                   // if there is any target whose data needs
                    // to be updated then update that
                    if (target) {
                        data = response['data'];
                        if (success == 'REPLACE') {
                            target.html(data);
                        } else {
                            target.append(data);
                        }
                    }

                    // execute any function that needs to be executed
                    executeFromStr(execute, response.execute_args);

                    // if there is any alert message to be showed
                    // then show the alert message
                    if (response['alert_message']) {
                        addAlert(response['alert_message']);
                    }

                    // if there is any alert to be showed
                    // then show the alert message uusing
                    // javascript alert box
                    if (response['alert']) {
                        alert(response['alert']);
                    }

                    // if there is any url in the data then
                    // it needs to be replaced
                    if (noreplace == 'false' || noreplace == undefined){
                        if (response['url']) {
                            window.location.href = response['url'];
                        } else {
                            // change the input value to the initial value
                            if (clicked_value) $this.text(input_value);

                            // remove to the clicked class
                            $this.removeClass('clicked');
                        }
                    }
                } else {

                    // change the input value to the initial value
                    if (clicked_value) $this.text(input_value);

                    // remove to the clicked class
                    $this.removeClass('clicked');
                    if(response['alert_message']) {
                        addAlert(response['alert_message']);
                    }

                }
            },
            error: function(response) {
                // change the input value to the initial value
                if (clicked_value) $this.val(input_value);

                // remove to the clicked class
                $this.removeClass('clicked');
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                }
            }
        });
        return false;
    });

    $(".ajax-form input[type=submit]").live('click',function() {
        if(!$(this).hasClass('track-problem-hint')){
            $("input[type=submit]", $(this).parents("ajax-form")).removeAttr("pressed");
            $(this).attr("pressed", "true");
        }
    });

    // to submit the form
    $('.ajax-form').live('submit', function(event) {
        var $this = $(this);

        // if the form is disabled then
        // don't let it be submitted
        if ($this.hasClass('disabled')) {
            return false;
        }

        var target_id = $this.attr('target');
        var target;
        if (target_id) {
            target = $('#'+target_id);
        } else {
            target = null;
        }

        var input = $this.find("input[type=submit][pressed=true]");
        var url = $this.attr('ajax');
        var data = new FormData($(this)[0]);
        var success = $this.attr('success');
        var on_error = $this.attr('error');
        var errorList = $this.find('.errorlist');
        var execute = $this.attr('execute');
        var execute_on_error = $this.attr('execute-error');
        var loader_class = $this.attr('loader');
        var isMcqBulkUpload = $this.attr('data-mcq-bulk-upload');
        var pType = $this.data('ptype');

        var loader = null;
        if (loader_class){
            loader = $('.'+loader_class);
        }

        if (loader_class){
            loader.removeClass('not-visible');
        }
        var execute_complete = $this.attr('execute-complete');
        var execute_complete_on_error = $this.attr('execute-complete-error');

        // append submit as True to the FormData object
        data.append('submit', 'True');
        // append pressed input button name, value to the FormData object
        var input_attr_name = input.attr('name');
        var input_attr_value = input.attr('value');
        if(input_attr_name && input_attr_value)
            data.append(input_attr_name, input_attr_value);

        // reset the content of the error list
        errorList.hide();

        // remove error class from all input fields
        $this.find(':input').each(function() {
            $(this).removeClass('error');
        });

        // find the submit button for this form and move
        // it to a transient state
        var inputs = $this.find('input[type="submit"]:not(.cancel), button');

        // if the input button has clicked class then
        // return false
        if (inputs.hasClass('clicked')) {
            event.preventDefault();
            return;
        }

        var input_value = input.val();

        if (input.val() == 'Save' || input.val() == 'save') {
            input.val(SAVING_TEXT);
        } else {
            var clicked_value = input.attr('clicked');
            input.val(clicked_value);
        }

        // add clicked class
        input.addClass('clicked');

        // default initialization with jquery ajax method
        var _ajax = $.ajax;

        // track upload progress if the 'show-progress' attribute is set
        if($this.attr("show-progress")) {
            // get progressbar parent block
            var progressbar_block_id = $this.attr("progress-block-id");
            var progressbar_block = $("#" + progressbar_block_id);
            // initialize a new 'HEProgressBar' object and bind to the current form
            var progressbar_widget = new HEProgressBar($this, progressbar_block);
            // wrapper over jquery ajax method
            _ajax = progressbar_widget.ajax;
        }

        // submit the form
        _ajax({
            url: url,
            type: 'POST',
            data: data,
            contentType: false,
            processData: false,
            success: function(response) {
                // execute any function that have to be executed
                if (response['status'] == AJAX_OK) {
                    // if there is any target whose data needs
                    // to be updated then update that
                    if (target) {
                        data = response['data'];
                        if (success == 'REPLACE') {
                            target.html(data);
                        } else {
                            target.append(data);
                        }
                    }

                    if (window.getQuestions) {
                        window.getQuestions();
                    }

                    if (loader_class){
                        loader.addClass('not-visible');
                    }

                    // show any alert message
                    if (response['alert_message']) {
                        addAlert(response['alert_message']);
                    }

                    // if there is any url in the data then
                    // it needs to be replaced
                    if (response['url']) {
                        window.location.href = response['url'];
                    } else {
                        // change the input value to the initial value
                        input.val(input_value);

                        // remove to the clicked class
                        input.removeClass('clicked');

                        // show the message only if there is no redirect
                        var message = $this.find('.save-message');
                        message.show();
                        if (!message.hasClass('permanent')) {
                            message.fadeOut(3000);
                        }
                    }

                    // the form may need to be updated after
                    // the save
                    if (response['form'])  {
                        $this.html(response['form']);
                        latexifyAjaxDiv($this.html);
                    }

                    // execute any function that needs to be executed
                    if (execute) {
                        var execute_args = response.execute_args;
                        execute_list = execute.split(" ");
                        for(var i=0; i < execute_list.length; i++) {
                            var command = execute_list[i];
                            if(execute_args) {
                                window[command](execute_args);
                            }else if(command.indexOf('(')>=0){
                                command = command.split(/\(|\)/);
                                window[command[0]](command[1]);
                            }
                            else {
                                window[command]();
                            }
                        }
                    }

                    if (isMcqBulkUpload) {
                        window.handleBulkUpload(response);
                    }
                } else {
                    if (loader_class){
                        loader.addClass('not-visible');
                    }

                    // change the input value to the initial value
                    input.val(input_value);

                    // remove to the clicked class
                    input.removeClass('clicked');

                    // add the errors to the errorlist div
                    if (response['form']) {

                        // if error attribute is set for form, then
                        // replace the target with form html.
                        if (on_error == 'REPLACE') {
                            target.html(response['form'])
                        } else {
                            $this.html(response['form']);
                            latexifyAjaxDiv($this.html);
                        }
                    }

                    var errors = response['errors'];
                    // XXX: Maybe we need to do errorList.show()
                    if(errors !== undefined) {
                        for (var i=0; i < errors.length; i++) {
                            var err = errors[i];
                            var input_field = $this.find('#id_'+err.field);
                            input_field.addClass('error');
                            var error_html = '<li>' + capitalize(err.field) + ':  ' + err.error +  '</li>';
                            errorList.append(error_html);
                        }
                    }
                    // execute any function that needs to be executed if form errors
                    executeFromStr(execute_on_error);

                    // show any alert message
                    if (response['alert_message']) {
                        addAlert(response['alert_message']);
                    }

                    // To show error message in question listing app
                    if (window.getQuestions) {
                        window.getQuestions(null, true);
                    }

                    if (isMcqBulkUpload) {
                        window.handleBulkUpload(response);
                    }
                }

                if (response['messages']) {
                    messages = response['messages'];
                    for (var i = 0; i < messages.length; i++) {
                        addAlert(messages[i]);
                    };
                }
            },
            error: function(response) {
                if (loader_class){
                    loader.addClass('not-visible');
                }

                // change the input value to the initial value
                input.val(input_value);

                // remove to the clicked class
                input.removeClass('clicked');

                // To show error message in question listing app
                if (window.getQuestions) {
                    window.getQuestions(null, true);
                }
            },
            complete: function(response) {
                var response = JSON.parse(response['responseText']);
                if (response['status'] == AJAX_OK) {

                    // execute any function that needs to be executed
                    // in complete of the ajax call
                    executeFromStr(execute_complete);
                }
                else{
                    // execute any function that needs to be executed if form errors
                    executeFromStr(execute_complete_on_error);
                }
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                },
                429: function(response) {
                    var response = JSON.parse(response['responseText']);
                    window.addAlert(response.message);
                }
            }
        });

        // cancel the submit action
        return false;
    });
    // end function to submit any form


    // to show an inline form
    $('.show-inline-form').live('click', function(event) {
        var $this = $(this);
        var target = $this.attr('target');
        var url = $this.attr('ajax');
        var copyClass = $this.attr('copyclass');
        if (typeof copyClass !== 'undefined' && copyClass !== false) {
            copyClass = true;
        } else {
            copyClass = false;
        }
        var execute = $this.attr('execute');

        // get the ids for data and form divs
        var dataId = target + '-data';
        var formId = target + '-form';

        // get the divs
        var dataDiv = $('#'+dataId);
        var formDiv = $('#'+formId);

        if (formDiv.length > 0) {
            formDiv.show();
            dataDiv.hide();
            executeFromStr(execute);
        } else {

            // create a new formDiv
            var newFormDiv = $("<div>");
            newFormDiv.attr('id', formId);
            newFormDiv.insertAfter(dataDiv);
            if (copyClass) {
                newFormDiv.attr('class', dataDiv.attr('class'));
            }
            dataDiv.hide();
            newFormDiv.html(LOADER_HTML);

            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                success: function(res) {
                    if(res['status'] == AJAX_OK) {
                        newFormDiv.html(res['form']);
                        executeFromStr(execute);
                    } else {
                        // show the data div and hide the form div
                        dataDiv.show();
                        newFormDiv.hide();
                        alert("There was some error in accessing the resource, please re-load the page.");
                    }
                },
                error: function(response) {
                    dataDiv.show();
                    newFormDiv.remove();
                    alert("There was some error in accessing the resource, please re-load the page.");
                },
                statusCode: {
                    404: function() {
                        alert("There was some error in accessing the resource, re-loading the page.");
                        window.location.reload();
                    },
                    403: function() {
                        window.location.reload();
                    }
                }
            }); // end ajax
        }
        return false;
    });

    $('.cancel-edit-basic-details').live('click', function(event) {
        var name = $('#id_full_name').attr('value');
        event.stopPropagation();
        return false;
    });

    $('.cancel-inline-form').live('click', function(event) {
        // if the form is being cancelled we can safely assume
        // that the data div is already there
        var $this = $(this);
        var form = $this.closest('.inline-form');
        var target = form.attr('target');

        // get the ids for data and form divs
        var dataId = target + '-data';
        var formId = target + '-form';

        // get the remove attribute from the cancel link tag
        var removeFlag = $this.attr('remove');

        // get the divs
        var dataDiv = $('#'+dataId);
        var formDiv = $('#'+formId);

        if (removeFlag == "true"){
            formDiv.remove();
            dataDiv.show();
        }
        else{
            formDiv.hide();
            dataDiv.show();
        }

        if (!$this.hasClass('no-scroll')) {
            var scrollOffset = dataDiv.offset().top;
            if (scrollOffset > 50) {
                scrollOffset = scrollOffset - 50;
            }
            $('html,body').animate({
                scrollTop: scrollOffset,
            }, 'fast');
        }

        return false;
    });

    // to delete an item inline
    $('.inline-form .delete-item').live('click', function(event) {
        var $this = $(this);
        var url = $this.attr('ajax');
        var form = $this.closest('.inline-form');
        var target = form.attr('target');

        // get the ids for data and form divs
        var dataId = target + '-data';
        var formId = target + '-form';

        // get the divs
        var dataDiv = $('#'+dataId);
        var formDiv = $('#'+formId);

        var r = confirm('Are you sure you want to delete this?');
        if (r == true) {

            $this.after(HORIZONTAL_LOADER_HTML);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function(res) {
                    if(res['status'] == AJAX_OK) {
                        formDiv.remove();
                        dataDiv.remove()
                    } else {
                        $this.next().remove();
                    }
                },
                error: function(response) {
                    $this.next().remove();
                    alert("There was some error in accessing the resource, please re-load the page.");
                },
                statusCode: {
                    404: function() {
                        $this.next().remove();
                        alert("There was some error in accessing the resource, re-loading the page.");
                        window.location.reload();
                    },
                    403: function() {
                        $this.next().remove();
                        window.location.reload();
                    }
                }
            }); // end ajax
        }
        return false;

    });

    $('.inline-form').live('submit', function(event) {
        var $this = $(this);
        var url = $this.attr('ajax');
        var data = $this.serialize();
        var target = $this.attr('target');

        // find the submit button for this form and move
        // it to a transient state
        var input = $this.find('input[type="submit"]:not(.cancel), button');
        var input_value = input.val();

        // if the input button has clicked class then
        // return false
        if (input.hasClass('clicked')) {
            event.preventDefault();
            return;
        }

        if (input.val() == 'Save' || input.val() == 'save') {
            input.val('Saving..');
        }

        if (input.is('[clicked]')) {
            var clicked_value = input.attr('clicked');
            input.val(clicked_value);
        }

        // add clicked class
        input.addClass('clicked');

        // get the ids for data and form divs
        var dataId = target + '-data';
        var formId = target + '-form';

        // get the divs
        var dataDiv = $('#'+dataId);
        var formDiv = $('#'+formId);

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: 'json',
            success: function(res) {
                input.removeClass('clicked');
                input.val(input_value);
                if(res['status'] == AJAX_OK) {
                    formDiv.hide();
                    dataDiv.show()
                    dataDiv.replaceWith(res['data']);

                    // scroll to the datadiv
                    /*
                    var scrollOffset = dataDiv.offset().top;
                    if (scrollOffset > 50) {
                        scrollOffset = scrollOffset - 50;
                    }
                    $('html, body').animate({
                        scrollTop: scrollOffset,
                    }, 'fast');
                    */
                } else {
                    // if there is an error then update this form
                    // with the new form data that has error messages
                    $this.replaceWith(res['form']);
                }
            },
            error: function(response) {
                input.removeClass('clicked');
                input.val(input_value);
                alert("There was some error in accessing the resource, please re-load the page.");
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                }
            }
        }); // end ajax

        return false;
    }); // end save-inline-form

    $('.render-create-form').live('click', function(event) {
        var $this = $(this);
        var form = $this.parent().next();
        var url = $this.attr('ajax');

        $this.hide();
        form.show();
        form.html(LOADER_HTML);

        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            success: function(response) {
                if(response['status'] == AJAX_OK) {
                    form.html(response['form']);
                } else {
                    form.html('');
                    form.hide();
                    $this.show();
                    alert('There was an error, please reload the page and try again.');
                }

            },
            error: function(response) {
                form.html('');
                form.hide();
                $this.show();
                alert('There was an error, please reload the page and try again.');
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                }
            }
        });
        return false;
    });

    // cancel create form
    $('.cancel-create-form').live('click', function(event) {
        var $this = $(this);
        var form = $this.closest('form');

        // clear this form and show the call to action
        var call_to_action = form.prev().find('.render-create-form');
        form.html('');
        form.hide();
        call_to_action.show();

        var scrollPos = call_to_action.offset().top;
        if (scrollPos > 100) {
            scrollPos = scrollPos - 50;
        }
        $('html,body').animate({
            scrollTop: scrollPos,
        }, 'fast');

        event.preventDefault();
    });

    // save an inline create form that was rendered using the above function
    $('.inline-create-form').live('submit', function(event) {
        var $this = $(this);
        var url = $this.attr('ajax');
        var target_id = $this.attr('target');
        var target = $('#'+target_id);
        var success = $this.attr('success');
        var data = $this.serialize();
        var append = false;
        var execute = $this.attr('execute');
        if (success == 'APPEND') {
            append = true;
        }

        // find the submit button for this form and move
        // it to a transient state
        var input = $this.find('input[type="submit"]:not(.cancel), button');

        // if the input button has clicked class then
        // return false
        if (input.hasClass('clicked')) {
            event.preventDefault();
            return;
        }

        var input_value = input.val();

        if (input.val() == 'Save' || input.val() == 'save') {
            input.val('Saving..');
        }

        if (input.is('[clicked]')) {
            var clicked_value = input.attr('clicked');
            input.val(clicked_value);
        }

        // submit the form
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response) {

                // execute any function that have to be executed
                if (response['status'] == AJAX_OK) {
                    executeFromStr(execute);

                    // if there is any target whose data needs
                    // to be updated then update that
                    if (target) {
                        data = response['data'];

                        // if the data has to be appended then append
                        // else replace it
                        if (append) {
                            target.append(data);
                        } else {
                            target.html(data);
                        }

                        // clear this form and show the call to action
                        var call_to_action = $this.prev().find('.render-create-form');
                        $this.html('');
                        $this.hide();
                        call_to_action.show();
                    }

                    // if there is any url in the data then
                    // it needs to be replaced
                    if (response['url']) {
                        window.location.href = response['url'];
                    } else {

                        // change the input value to the initial value
                        input.val(input_value);

                        // remove to the clicked class
                        input.removeClass('clicked');

                        // show the message only if there is no redirect
                        var message = $this.find('.save-message');
                        if (message.length) {
                            message.show();
                            if (!message.hasClass('permanent')) {
                                message.fadeOut(3000);
                            }
                        }
                    }

                    // the form may need to be updated after
                    // the save
                    if (response['form'])  {
                        $this.html(response['form']);
                    }

                } else {

                    // change the input value to the initial value
                    input.val(input_value);

                    // remove to the clicked class
                    input.removeClass('clicked');

                    // add the errors to the errorlist div
                    if (response['form'])  {
                        $this.html(response['form']);
                    }
                }
            },
            error: function(response) {
                // change the input value to the initial value
                input.val(input_value);

                // remove to the clicked class
                input.removeClass('clicked');
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                }
            }
        }); // end ajax
        return false;
    });

    // to submit any form
    $('.inline-ajax-form').live('submit', function(event) {
        var $this = $(this);

        // if the form is disabled then
        // don't let it be submitted
        if ($this.hasClass('disabled')) {
            return false;
        }

        var target_id = $this.attr('target');
        var target;
        if (target_id) {
            target = $('#'+target_id);
        } else {
            target = null;
        }
        var url = $this.attr('ajax');
        var data = $this.serialize();
        var success = $this.attr('success');
        var errorList = $this.find('.errorlist');
        var execute = $this.attr('execute');

        // reset the content of the error list
        errorList.hide();

        // remove error class from all input fields
        $this.find(':input').each(function() {
            $(this).removeClass('error');
        });

        // find the submit button for this form and move
        // it to a transient state
        var input = $this.find('input[type="submit"]:not(.cancel), button');

        // if the input button has clicked class then
        // return false
        if (input.hasClass('clicked')) {
            event.preventDefault();
            return;
        }

        var input_value = input.val();

        if (input.val() == 'Save' || input.val() == 'save') {
            input.val('Saving..');
        }

        if (input.is('[clicked]')) {
            var clicked_value = input.attr('clicked');
            input.val(clicked_value);
        }

        // add clicked class
        input.addClass('clicked');

        // submit the form
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response) {

                // execute any function that have to be executed
                if (response['status'] == AJAX_OK) {
                    executeFromStr(execute);

                    // if there is any target whose data needs
                    // to be updated then update that
                    if (target) {
                        data = response['data'];
                        if (success == 'REPLACE') {
                            target.html(data);
                        } else {
                            target.append(data);
                        }
                    }

                    // if there is any url in the data then
                    // it needs to be replaced
                    if (response['url']) {
                        window.location.href = response['url'];
                    } else {
                        // change the input value to the initial value
                        input.val(input_value);

                        // remove to the clicked class
                        input.removeClass('clicked');

                        // show the message only if there is no redirect
                        var message = $this.find('.save-message');
                        message.show();
                        if (!message.hasClass('permanent')) {
                            message.fadeOut(3000);
                        }
                    }

                    // the form may need to be updated after
                    // the save
                    if (response['form'])  {
                        $this.html(response['form']);
                    }

                } else {

                    // change the input value to the initial value
                    input.val(input_value);

                    // remove to the clicked class
                    input.removeClass('clicked');

                    // add the errors to the errorlist div
                    if (response['form'])  {
                        $this.html(response['form']);
                    }

                    var errors = response['errors'];
                    for (var i=0; i < errors.length; i++) {
                        var err = errors[i];
                        var input_field = $('#id_'+err.field);
                        input_field.addClass('error');
                        var error_html = '<li>' + capitalize(err.field) + ':  ' + err.error +  '</li>';
                        errorList.append(error_html);
                    }
                }
            },
            error: function(response) {
                // change the input value to the initial value
                input.val(input_value);

                // remove to the clicked class
                input.removeClass('clicked');
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                }
            }
        });

        // cancel the submit action
        return false;
    });
    // end function to submit any form


    // generic function to delete an item
    $('.delete-item-ajax').live('click', function(event) {

        var $this = $(this);
        var confirmation_required = $this.attr('confirmation-required');
        var sure = false;
        if(confirmation_required) {
            var conf_msg = $this.attr('confirmation-message');
            if(!conf_msg) {
                conf_msg = 'Are you sure you want to delete this?';
            }
            sure = confirm(conf_msg);
        }
        else {
            sure = true;
        }
        if (sure) {
            var url = $this.attr('ajax');
            var target_id = $this.attr('target');
            var target = $('#'+target_id);
            var execute = $this.attr('execute');
            target.hide();
            if(!url) {
                return false;
            }
            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    if (response['status'] == AJAX_ERROR) {
                        target.show();

                        // if there is an alert message to be shown
                        // show the alert message
                        if (response['alert']) {
                            alert(response['alert']);
                        }
                    } else {
                        if ('max_score' in response) {
                            $('#id_score').val(response['max_score']);
                        }
                        target.remove();
                        executeFromStr(execute);
                    }
                },
                error: function(response) {
                    target.show();
                }
            });
        }
        return false;
    });
    // end generic function to delete an item

    // show the message next to the button
    $('.show-message').live('click', function() {
        var $this = $(this);
        var target_id = $this.attr('target');
        var message = $('#'+target_id);
        message.show();
        message.fadeOut(3000);
    });
    // end show message function

    // to show a modal window
    $('.show-modal').live('click', function() {
        var target_id = $(this).attr('target');
        var target = $('#'+target_id);

        // show the modal window
        target.show();
        target.modal({
            onClose: function(dialog){
                dialog.data.fadeOut(300);
                dialog.container.fadeOut(300, function () {
                    dialog.overlay.hide();
                    $.modal.close();
                    $('.modal-window').hide();
                });
            },
            onOpen: function(dialog){
                dialog.overlay.fadeIn(300);
                dialog.data.show();
                dialog.container.fadeIn(300);
            },
            onShow: function(dialog){
                var execute = target.attr('execute-on-show');
                if (execute) {
                    execute_commands = execute.split(" ");
                    for (var i=0; i<execute_commands.length; i++) {
                        window[execute_commands[i]]();
                    }
                }
            }
        });
        return false;
    });
    // end show modal

    $('.show-signup-in-modal').live('click', function() {
        // show the signup form instead of the login form
        $('.signup-form-div').show();
        $('.login-form').hide();
    });

    $('.login-modal-redirect').live('click', function() {
        // set a custom redirect url for login/signup modals
        var url = $(this).attr('modal-redirect');
        var target_id = $(this).attr('target');
        var target = $('#'+target_id);

        if (target){
            var login_form_next = target.find('input[name=next]');
            login_form_next.val(url);
            var location_path = encodeURIComponent(document.location.pathname);
            var signup_form = target.find('#modal-signup-form');
            var facebook_link = target.find('.btn-facebook');
            var google_link = target.find('.btn-google');
            var ajax_url = encodeURIComponent(signup_form.attr('ajax'));
            var new_url = ajax_url.replace(location_path, encodeURIComponent(url));
            new_url = decodeURIComponent(new_url);
            signup_form.attr('ajax', new_url);

            if (facebook_link){
                for (var i = 0; i < facebook_link.length; i++){
                    var fb_url = encodeURIComponent(facebook_link[i].href);
                    var new_fb_url = fb_url.replace(location_path, encodeURIComponent(url));
                    new_fb_url = decodeURIComponent(new_fb_url);
                    facebook_link[i].href = new_fb_url;
                }
            }

            if (google_link){
                for (var i = 0; i < google_link.length; i++){
                    var google_url = encodeURIComponent(google_link[i].href);
                    var new_google_url = google_url.replace(location_path, encodeURIComponent(url));
                    new_google_url = decodeURIComponent(new_google_url);
                    google_link[i].href = new_google_url;
                }
            }
        }
    });

    $('.show-popup').live('click', function() {
        // show a js window popup
        var url = $(this).attr('url');
        var height = $(this).attr('height');
        var width = $(this).attr('width');
        var p_left = $(this).attr('left');
        var p_top = $(this).attr('top');
        var minimal = $(this).attr('minimal');

        if (!height){
            height = 500;
        }
        if (!width){
            width = 500;
        }
        if (!p_left){
            p_left = (screen.width/2)-(width/2);
        }
        if (!p_top){
            p_top = (screen.height/2)-(height/2);
        }

        if (url){
            if (minimal){
                popupWindow = window.open(
                        url,
                        'popUpWindow',
                        'height='+height+',width='+width+',left='+p_left+',top='+p_top+',resizable=no,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no'
                        );
            }else{
                popupWindow = window.open(
                        url,
                        'popUpWindow',
                        'height='+height+',width='+width+',left='+p_left+',top='+p_top+',resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=yes,status=yes'
                        );
            }
        }
    });

    // end show ajax modal
    $('.ajax-modal').live('click', function() {
        var url = $(this).attr('ajax');
        var target_id = $(this).attr('target');
        var target = $('#'+target_id);
        var method = $(this).attr('method')
        if (!method){
            method = 'POST'
        }
        // show the div and then attach the modal window to it
        target.show();
        if (target.hasClass('large-modal')) {
            target.modal({
                onClose: function(dialog){
                    $.modal.close();
                    $('.modal-window').hide();
                },
                minHeight: 600,
                minWidth: 830,
            });
        } else if (target.hasClass('very-large-modal')) {

            target.modal({
                onClose: function(dialog){
                    $.modal.close();
                    $('.modal-window').hide();
                },
                minHeight: 600,
                minWidth: 960,
            });

        } else if (target.hasClass('fix-modal-top')) {
            // for ajax modal as the content is loaded later,
            // top align of the modal is not appropriate. So min
            // height is being set.
            target.modal({
                onClose: function(dialog){
                    $.modal.close();
                    $('.modal-window').hide();
                },
                minHeight: 450,
            });

        } else {

            target.modal({
                onClose: function(dialog){
                    $.modal.close();
                    $('.modal-window').hide();
                },
            });

        }
        // add the ajax loader to the modal window
        target.find('.modal-content').prepend(LOADER_HTML);

        $.ajax({
            type: method,
            url: url,
            dataType: 'json',
            success: function(response) {
                if(response['status'] == AJAX_OK) {
                    target.html(response['data']);
                    var url = response['url'];
                    if (url)  {
                        window.open(url, '_blank');
                    }
                    if (response['alert_message']) {
                        addAlert(response['alert_message']);
                    }
                } else {
                    $.modal.close();
                    $('.modal-window').hide();
                }
                domElementLive();

            },
            error: function(response) {

                $.modal.close();
                $('.modal-window').hide();
            },
            statusCode: {
                404: function() {
                    alert("There was some error in accessing the resource, re-loading the page.");
                    window.location.reload();
                },
                403: function() {
                    window.location.reload();
                }
            }
        });
        return false;
    });



    // custom class to close any modal window
    $('.close-modal-window').live('click', function() {
        $.modal.close();
        $('.modal-window').hide();
    });

    $('.close-overlay').live('click', function() {
        $('.page-overlay').addClass('hidden');
    });

    $('#simplemodal-container .modal-form').live('submit', function() {
        var submit = $('#simplemodal-container .submit-modal-form');
        submit.click();
        return false;
    })

    // submit a form in a modal window
    $('.submit-modal-form').live('click', function(event) {

        var $this = $(this);

        // if this form is not contained inside the modal
        // window then return
        if (!$.contains($('#simplemodal-container'), $this)) {
            return;
        }

        // in case there are multiple forms in the same modal
        if (!$this.is(':visible')) {
            return;
        }

        if ($this.hasClass('clicked')) {
            event.preventDefault();
            return;
        }

        // get the form data
        var form = $('#simplemodal-container .modal-form');
        var form_errors = false;
        if (form.hasClass('validate-field')) {
            $('#simplemodal-container .modal-form :input').each(function() {
            });
        }
        var data = form.serializeArray();
        var url = $this.attr('ajax');
        var clicked_text = $this.attr('clicked_text');
        var button_text = $this.text();
        var target_id = $this.attr('target');
        var execute = $this.attr('execute');
        var execute_on_error = $this.attr('execute-error');
        var target = null;
        if (target_id) {
            target = $('#'+target_id);
        }

        // change the button text and state
        $this.text(clicked_text);
        $this.addClass('clicked');

        // Hide the error box if there is any
        var error = $this.parent().find('.error-placeholder');
        error.hide();

        var image_field = form.find('input:file');
        if (form.hasClass('image-file') && image_field.val()) {

            var file = image_field[0].files[0];
            var fileName = image_field.val();
            fileName = fileName.toLowerCase();
            var fileExt = fileName.split('.');

            // find out the image extension
            var startIndex = (fileName.indexOf('\\') >= 0 ? fileName.lastIndexOf('\\') : fileName.lastIndexOf('/'));
            var baseFileName = fileName.substring(startIndex);
            if (baseFileName.indexOf('\\') === 0 || baseFileName.indexOf('/') === 0) {
                baseFileName = baseFileName.substring(1);
            }
            var extension_found = false;
            for (var i = 0; i < ALLOWED_IMAGE_FORMATS.length; i++) {
                if(ALLOWED_IMAGE_FORMATS[i] == fileExt[fileExt.length-1]) {
                    extension_found = true;
                    break;
                }
            }

            // see if this extension is allowed or not
            if (!extension_found)  {
                alert('The file extension is not allowed');

                // change the button state
                $this.text(button_text);
                $this.removeClass('clicked');
                return false;

            } else {
                reader = new FileReader();
                reader.onload = function(event) {
                    var img = event.target.result;
                    var file = img.split(',')[1];
                    var type = img.split(',')[0].split(':')[1].split('/')[1].split(';')[0];
                    data.push({ name: 'type', value: 'base64' });
                    data.push({ name: 'key', value: '88wvr0jnjv6xapcyfdmmf5x8gl47zawv' });
                    data.push({ name: 'image_name', value: baseFileName });
                    data.push({ name: 'image_data', value: file });

                    // make the ajax call
                    $.ajax({
                        url: url,
                        data: data,
                        type: 'POST',
                        dataType: 'json',
                        success: function(response) {

                            // change the button state
                            $this.text(button_text);
                            $this.removeClass('clicked');

                            if (response['status'] == AJAX_OK) {

                                // if there is any data then show it
                                // in the appropriate div
                                if(target) {
                                    // the center div
                                    target.html(response['data']);
                                }

                                // execute any function that needs to be executed
                                executeFromStr(execute);
                                // if there is any url in the data then
                                // it needs to be replaced
                                if (response['url']) {
                                    window.location.href = response['url'];
                                }

                                // if there are any updates in the form
                                // then show that
                                if (response['form']) {
                                    form.html(response['form']);
                                }

                                // show any alert message
                                if (response['alert_message']) {
                                    addAlert(response['alert_message']);
                                }

                                // close the modal window
                                $.modal.close();
                                $('.modal-window').hide();
                            } else {
                                // show the error message
                                error.show();

                                // if there is any form error
                                // that needs to be shown then show that
                                if (response['form']) {
                                    form.html(response['form']);
                                }
                            }
                        },
                        error: function(response) {

                            // change the button state
                            $this.text(button_text);
                            $this.removeClass('clicked');

                            // show the error message
                            error.show();
                        }
                    });
                }
                reader.onerror = function(stuff) {
                    alert(stuff.getMessage());
                    return false;
                }
                reader.readAsDataURL(file);
            }

        } else {

            // make the ajax call
            $.ajax({
                url: url,
                data: data,
                type: 'POST',
                dataType: 'json',
                success: function(response) {

                    // change the button state
                    $this.text(button_text);
                    $this.removeClass('clicked');

                    if (response['status'] == AJAX_OK) {

                        // if there is any data then show it
                        // in the appropriate div
                        if(target) {
                            // the center div
                            target.html(response['data']);
                        }

                        // execute any function that needs to be executed
                        executeFromStr(execute);

                        // if there is any url in the data then
                        // it needs to be replaced
                        if (response['url']) {
                            window.location.href = response['url'];
                        }

                        // if there are any updates in the form
                        // then show that
                        if (response['form']) {
                            form.html(response['form']);
                        }

                        // show any alert message
                        if (response['alert_message']) {
                            addAlert(response['alert_message']);
                        }

                        // close the modal window
                        $.modal.close();
                        $('.modal-window').hide();
                    } else {
                        // show the error message
                        error.show();

                        // if there is any form error
                        // that needs to be shown then show that
                        if (response['form']) {
                            form.html(response['form']);
                        }
                        executeFromStr(execute_on_error);
                    }
                },
                error: function(response) {

                    // change the button state
                    $this.text(button_text);
                    $this.removeClass('clicked');

                    // show the error message
                    error.show();
                }
            });
        }
        return false;
    });

    // custom file upload button
    $('.nice-file-input').live('change', function() {
        var $this = $(this);

        var content_span = $this.parent().parent().parent().find('.filepath');
        var label = $this.parent().parent().find('.label-text');

        // get the file name
        var filename = $this.val();
        var startIndex = (filename.indexOf('\\') >= 0 ? filename.lastIndexOf('\\') : filename.lastIndexOf('/'));
        filename = filename.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }

        // put the file name in the filename span
        if (filename) {
            content_span.html(filename);

            // if its an input field
            content_span.val(filename);
        }

        // change the label of the file field
        label.text('Change');
    });
    // end custom file upload button

    // to upload files via js
    $('.js-file-upload input:file').live('change', function(event) {
        file = this.files[0];
        var url = $(this).parent().attr('ajax');
        reader = new FileReader();
        reader.onload = function(event) {
            var file_input = event.target.result;
            var data = { 'input': file_input }
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: 'json',
            });
        }
        reader.onerror = function(stuff) {
            alert(stuff.getMessage());
        }
        reader.readAsText(file); //readAsdataURL
    });
    // end upload files via js

    $('.js-avatar-upload').live('change', function(event) {
        var $this = $(this);
        file = this.files[0];
        var url = $this.attr('ajax');
        var size = $this.attr('size');
        var target_id = $this.attr('target');
        var target = $('#'+target_id);
        var fileName = $this.val();
        var imageTargets = $this.attr('imageTargets');
        fileName = fileName.toLowerCase();
        var fileExt = fileName.split('.');

        // find out the image extension
        var startIndex = (fileName.indexOf('\\') >= 0 ? fileName.lastIndexOf('\\') : fileName.lastIndexOf('/'));
        var baseFileName = fileName.substring(startIndex);
        if (baseFileName.indexOf('\\') === 0 || baseFileName.indexOf('/') === 0) {
            baseFileName = baseFileName.substring(1);
        }
        var extension_found = false;
        for (var i = 0; i < ALLOWED_IMAGE_FORMATS.length; i++) {
            if(ALLOWED_IMAGE_FORMATS[i] == fileExt[fileExt.length-1]) {
                extension_found = true;
                break;
            }
        }
        if (!extension_found) {
            alert('The give file extension is not allowed');
            return false;
        } else {
            reader = new FileReader();
            reader.onload = function(event) {
                var img = event.target.result;
                var file = img.split(',')[1];
                var type = img.split(',')[0].split(':')[1].split('/')[1].split(';')[0];
                var loader = target.find('span.horizontal-loader');
                loader.removeClass('not-visible');
                var image = target.find('img');
                image.addClass('faded');
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {
                        type: 'base64',
                        key: '88wvr0jnjv6xapcyfdmmf5x8gl47zawv',
                        name: baseFileName,
                        image: file,
                        size: size,
                    },
                    dataType: 'json',
                    success:function(data) {
                        if (data['status'] == AJAX_OK) {
                            image.replaceWith(data['img']);
                            if (imageTargets) {
                                image_targets = imageTargets.split(" ");
                                for (var i=0; i < image_targets.length; i++) {
                                    var img_target = $('#'+image_targets[i]);
                                    img_target.find('img').replaceWith(data['img']);
                                }
                            }
                        }
                        loader.addClass('not-visible');
                    },
                    error: function(data) {
                        loader.addClass('not-visible');
                    }
                });
            }
            reader.onerror = function(stuff) {
                alert(stuff.getMessage());
            }
            reader.readAsDataURL(file);
        }
    });

    // js to show the custom drop down list
    $('.dropdown-1 .dd-label').live('click', function(e) {
        e.stopPropagation();
        var $this = $(this);
        var list = $this.next();

        if (list.is(':hidden')) {

            $this.addClass('clicked');
            // get the position of the list where
            // it  has to be shown
            var position = $this.position();
            var height = $this.height();
            var topPos = position.top + height - 1;
            if ($this.hasClass('set-pos')) {
                topPos = topPos + parseInt($this.attr('top-pos'));
            }
            var leftPos = position.left;

            list.css({
                'position': 'absolute',
                'top': topPos+'px',
                'left': leftPos+'px',
            });
            list.show();
        } else {
            $this.removeClass('clicked');
            list.hide();
        }
    });

    // change background color when input field in dropdown
    // is selected
    $('.dropdown-1 input').live('change', function(e) {
        var $this = $(this);
        if (this.checked) {
            $this.parent().parent().addClass('clicked');
        } else {
            $this.parent().parent().removeClass('clicked');
        }
    })

    // hide the dropdown list if clicked anywhere
    // else in the body other than the dropdown list itself
    $('body').click(function (e) {
        var $this = $(e.target);
        if ($this.hasClass('dd-label')) {
            return true;
        }
        if ($this.is('.dropdown-1 .dd-list *')) {
            return true;
        }
        else {
            $('.dropdown-1 .dd-list').hide();
        }
    });

    // show a div and hide another div
    $('.show-hide').live('click', function(event) {
        var $this = $(this);
        var hide_id = $this.attr('hide');
        var hide = $('#'+hide_id);
        var show_id = $this.attr('show');
        var show = $('#'+show_id);
        hide.hide();
        show.show();
        event.preventDefault();
    });
    // end show-hide

    $('.slide-toggle').live('click', function(event) {
        var $this = $(this);
        var target_id = $this.attr('target');
        var target = $('#' + target_id);

        /*$(".slide-toggle").removeClass("open");*/
        /*$(".slide-close").not(target).slideUp();*/
        if (target.is(":visible")) {
            target.slideUp();
            $this.removeClass("open");
        } else {
            target.slideDown();
            $this.addClass("open");
        }
    });
    // end show-hide

    // show a div and hide another div
    $('.show-hide-many').live('click', function(event) {
        var $this = $(this);
        var hide_class = $this.attr('hide');
        var hide = $('.'+hide_class);
        var show_class = $this.attr('show');
        var show = $('.'+show_class);
        hide.hide();
        show.show();
        event.preventDefault();
    });
    // end show-hide

    // toggle div
    $('.show-hide-toggle').live('click', function(event) {
        var $this = $(this);
        var toggle_id = $this.attr('target');
        if(toggle_id) {
            $('#'+toggle_id).toggle();
        }
        event.preventDefault();
    });
    // end toggle

    // show target element on hovering another element
    $('.show-hover').live('mouseover', function(event) {
        var $this = $(this);
        var show_id = $this.attr('show-target');
        if(show_id) {
            $('#'+show_id).removeClass('forced-hidden');
        }
    });

    // Remove show target if mouse moves away
    $('.show-hover').live('mouseleave', function(event) {
        var $this = $(this);
        var show_id = $this.attr('show-target');
        if(show_id) {
            $('#'+show_id).addClass('forced-hidden');
        }
    });

    // select button that triggers an ajax request
    $('.ajax-select').live('change', function() {
        var $this = $(this);
        var url = $this.attr('ajax');
        var value = $this.val();
        var get = $this.attr('param');
        var data = get+'='+value;
        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: "json",
        });
    });
    // end select button

    $('.ajax-select-wrapper select').live('change', function() {
        var $this = $(this);
        var wrapper = $this.parent();
        var url = wrapper.attr('ajax');
        var get = wrapper.attr('param');
        var data = get+'='+value;
        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: "json",
        });
    }); // end ajax-select-wrapper

    $('.clicked-button').live('submit', function() {

        // if there is clicked class then prevent the
        // default action
        if($(this).hasClass('clicked')) {
            return false;
        }

        var submit = $(this).find('input[type=submit]');
        var clicked_text = submit.attr('clicked_text');
        submit.val(clicked_text);
        submit.addClass('clicked');
        return true;
    });

    $('.row-overlay').live('mouseover', function() {
        var scroll_pos = $('#full-body-div').scrollTop();
        var div_overlay = $('#' + $(this).attr('overlay'));
        var height = div_overlay.height();
        var bottom_width = $(this).css('width', '-=20');
        var bottom_height = $(this).css('height');
        var row_position = $(this).position();
        bottom_top = row_position.top;
        bottom_left = row_position.left;
        div_overlay.css({
            position: 'absolute',
            top: bottom_top + scroll_pos,
            right: '35px',
            width: bottom_width,
            height: bottom_height
        });
        div_overlay.show();
    });
    $('.row-overlay').live('mouseleave', function(){
        var div_overlay = $('#' + $(this).attr('overlay'));
        div_overlay.hide();
    });

    // inplace ajax execute
    $('.ajax-execute').live('click', function(){
        var $this = $(this).parent();
        var url = $(this).attr('ajax');
        var target_id = $(this).attr('target');
        var target = $('#'+target_id);
        var success_text = $('.ajax-success').html();
        var error_text = $('.ajax-error').html();

        $(this).parent().html(LOADER_HTML_NO_MARGIN);

        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            success: function(response) {
                if(response['status'] == AJAX_OK) {
                    $this.parent().html(success_text);
                } else {
                    $this.parent().html(error_text);
                }
            },
            error: function(response) {
                $this.parent().html(error_text);
            }
        });
    });

    // for the follow action when the user is not following
    $('.polls-unset').live('click', function() {
        var url = $(this).attr('link');
        var $this = $(this);

        // change the polls clasess
        $this.removeClass('polls-unset');
        $this.addClass('polls-set');

        // change the styling classes
        $this.removeClass('btn-white');
        $this.addClass('btn-blue');

        var currentText = $this.text();

        $this.text('Following');
        $.ajax({
            url: url,
            type: 'POST',
            complete: function(response) {
                if (response.responseText == 'error') {

                    // reverse the polls classes
                    $this.addClass('polls-unset');
                    $this.removeClass('polls-set');

                    // change the styling classes
                    $this.addClass('btn-white');
                    $this.removeClass('btn-blue');

                    // restore the text
                    $this.text(currentText);
                }
            },
        });
        return false;
    });

    // for the follow action when the user is following
    $('.polls-set').live('click', function() {
        var url = $(this).attr('link');
        var $this = $(this);

        // change the polls clasess
        $this.removeClass('polls-set');
        $(this).addClass('polls-unset');

        // change the styling classes
        $this.addClass('btn-white');
        $this.removeClass('btn-blue');

        // change the text
        var currentText = $this.text();
        $this.text('Follow');

        $.ajax({
            url: url,
            type: 'POST',
            complete: function(response) {
                if (response.responseText == 'error') {

                    // reverse the polls classes
                    $this.addClass('polls-set');
                    $this.removeClass('polls-unset');

                    // change the styling classes
                    $this.removeClass('btn-white');
                    $this.addClass('btn-blue');
                }
            }
        });
        return false;
    });


    // change the button state on hover
    $('.polls-follow').live({
        mouseenter: function() {
            var $this = $(this);
            var text = $this.text();
            $this.text('Unfollow');
        },
        mouseleave: function() {
            var $this = $(this);
            var text = $this.text();
            if ($this.hasClass('polls-set')) {
                if (text==='Unfollow') {
                    $this.text('Following');
                }
            }
        }
    });

    // To show the next elemnt just after
    // the current element
    $('.show-next').live('click', function() {
        $(this).next().show();
        $(this).hide();
        return false;
    });

    // Fast scroll to the target element on clicking an element
    $('.fast-scroll').live('click', function(e) {
        var $this = $(this);
        var target = $('#' + $this.attr('scroll-target'));
        var offset = $this.attr('scroll-offset');
        var no_background_change = $this.attr('no-background');

        //offset: height of the sticky profile card header and profile tabs
        // if offset attribute, position scroll-target div to offset
        if (offset) {
            $('html,body').animate({
                scrollTop: target.offset().top - offset
            }, 'fast');
        } else {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 'fast');
        }

        if (!no_background_change) {
            target.css({'background-color':'#fffcdf'});
            target.animate({
                backgroundColor: "#fff"
            }, 3000);
        }
        e.preventDefault();
    });

    /*
     * Hides the content if content is too big and on clicking more button shows more content.
     */
    var ellipsestext = "...";
    var showChar = 100;
    var moreText = 'Show More';
    var lessText = 'Show Less';
    $('.more').each(function() {
        showChar = parseInt($(this).data('max-char')) || showChar;
        moreText = $(this).data('more-text') || moreText;
        lessText = $(this).data('less-text') || lessText;
        content = $(this).html();

        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var readmore = '<a href="#">' + moreText + '</a>';
            $(this).html(c);

            $(readmore).on('click',function(e) {
                e.preventDefault();
                $(this).parent().html(c+h);
            }).appendTo($(this));
        }
    });

    /*
     * Simply send GET request to ajax url on click.
     */

    $('.clicky-ajax').live('click', function() {
        var $this = $(this);
        var url = $this.attr('ajax');
        var redirect = $(this).attr('clicky-redirect');

        var xhr = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            async: false,
            this_this: $this,
            redirect: redirect,
            success: function(response) {
                if (response['status'] == AJAX_OK) {
                    if (typeof(redirect) !== 'undefined' && redirect !== '')
                        window.open(redirect, '_blank');
                }
            },
            error: function(response) {
                // XXX: Nothing to do now.
            },
        });
    });

    /*
     * To make an entire div clickable, just apply the class clicky-item.
     */
    $('.clicky-item').live('click', function(event) {
        var target = $(event.target);

        // If the click was on a tag inside div, use a tag behaviour.
        if (typeof(target) !== 'undefined' && target.is('.clicky-item a')) {
            return true;
        }

        var url = $(this).attr('clicky-redirect');
        if (typeof(url) !== 'undefined' && url !== '') {
            window.open(url, '_blank');
        }
    });

    /*
     * Mark all notifs read.
     */
    $('.notif-mark-all-read').live('click', function(event) {
        $('.notifications-container>div.unseen').removeClass('unseen');
        $('#notifications-feed>div.unseen').removeClass('unseen');
        $('.notif-count').remove();
        event.stopPropagation();
        return false;
    });

    /*
     * To toggle content depending on the value of the selet button
     */
    $('.select-toogle').live('change', function() {
        var id = $(this).val();
        var div = $("'#"+id+"'");
        $('.option-content').hide();
        div.show();
    });

    /* For loading live events widget. */
    $('#live-events-placeholder').live('click', function(){
        var toggleWidth = null;
        if($('#live-events-loading').width() > 300){
            toggleWidth = "0px";
            toggleOpacity=0.9;
        }
        else if($('#live-events-loading').width() < 1){
            toggleWidth = "330px";
            toggleOpacity=0.0;
        }
        if(toggleWidth == "330px"){
            var no_events = parseInt($('#live-events-widget-count').text());
            var toggleHeight = "304px";
            if(no_events <= 4){
                var minHeight = no_events*75 + 5;
                toggleHeight = minHeight.toString()+"px";
            }
            $('#live-events-loading').height(104);
            $('#live-events-loading')
                .animate({
                    width: toggleWidth,
                }, 400)
                .animate({
                        height: toggleHeight,
                    },
                    {
                        duration: 350,
                        complete: function(){
                            $('.live-events-widget-container').show();
                        }
                    }
                );
        } else {
            $('.live-events-widget-container').hide();
            var toggleHeight="105px";
            $('#live-events-loading').removeClass("live-events-loaded");
            $('#live-events-loading')
                .animate({
                    height: toggleHeight,
                }, 350)
                .animate({
                    width: toggleWidth,
                }, {
                    duration: 400,
                    complete: function(){},
                });
        }
    });

    if (getParameterByName('scroll-id') && getParameterByName('scroll-trigger')) {
        $("#" + getParameterByName('scroll-id')).trigger(getParameterByName('scroll-trigger'));
        $('body').append("<div class='page-loader'><i class='fa fa-pulse fa-spinner'></i></div>");
        $('html body').animate({
            scrollTop: $("#" + getParameterByName('scroll-id')).offset().top
        }, 1000);
    }

    /* For scrolling to the id defined in the url */
    $(document).on("ajaxStop", function() {
        if (window.location.hash && $(window.location.hash).length > 0) {
            setTimeout(function() {
                $('html body').animate({
                    scrollTop: $(window.location.hash).offset().top - 40
                }, 2000, function() {
                    var origBackgroundColor = $(window.location.hash).css('background-color');
                    $(window.location.hash).animate({
                        backgroundColor: '#fffcdf'
                    }, 400).animate({
                        backgroundColor: origBackgroundColor
                    }, 2000, function() {
                        if (origBackgroundColor === 'rgba(0, 0, 0, 0)') {
                            $(window.location.hash).css('background-color', 'rgba(0, 0, 0, 0)');
                        }
                    });
                });
            }, 200);
            $(document).off("ajaxStop");
        }
        $('.page-loader').remove();
    });

    // Feedback Popup JS
    $('#feedback-popup-container').delay(5000).slideDown(1000);

    $('#feedback-popup-container').on('click', '.cross-feedback-popup', function(){
        $('#feedback_cross_flag').val('true');
        $('.save-feedback-popup').attr('pressed', 'true');
        $('.feedback-prompt-form').trigger("submit");
    });

    $("#feedback-popup-container").on('click', '#penta-feedback-popup .penta-star-rating', function() {
        var value = $(this).attr('value');
        if (value !== 'undefined'){
            if($('body').find('#feedback_penta_score') !== null){
                var val  = parseInt(value);
                for (var i = 1; i <= val ; i++){
                    var id = '#star-id-' + i.toString();
                    var star_id1 = id + '-1';
                    var star_id2 = id + '-2';
                    $(star_id1).addClass('yellow-star');
                    $(star_id2).addClass('yellow-star');
                }
                for (var i = val+1; i <= 5; i++){
                    var id = '#star-id-' + i.toString();
                    var star_id1 = id + '-1';
                    var star_id2 = id + '-2';
                    $(star_id1).removeClass('yellow-star');
                    $(star_id2).removeClass('yellow-star');
                }
                $('#feedback_penta_score').val(value);

                if(value < 4){
                    toggle_display_text_feedback(true); // show text feedback div
                    $('#penta-feedback-popup').fadeOut();
                } else {
                    $('.save-feedback-popup').attr('pressed', 'true');
                    $('.feedback-prompt-form').trigger("submit");
                }
            }
        }
    });

    $("#feedback-popup-container").on("click",".feedback-helpful", function (e) {
        $('#thumbsdown').addClass('opacity-5');
        $('#thumbsdown-circle').addClass('opacity-5');

        if ($('#thumbsup').hasClass('opacity-5'))
            $('#thumbsup').removeClass('opacity-5');
        if ($('#thumbsup-circle').hasClass('opacity-5'))
            $('#thumbsup-circle').removeClass('opacity-5');

        if ($('#thumbsdown').hasClass('red-text')){
            $('#thumbsdown').removeClass('red-text');
            $('#thumbsdown').addClass('light');
        }
        if ($('#thumbsdown').hasClass('white-text')){
            $('#thumbsdown').removeClass('white-text');
            $('#thumbsdown').addClass('light');
        }
        if ($('#thumbsdown').hasClass('fa-thumbs-down')){
            $('#thumbsdown').removeClass('fa-thumbs-down');
            $('#thumbsdown').addClass('fa-thumbs-o-down');
        }

        if ($('#thumbsdown-circle').hasClass('red-text')){
            $('#thumbsdown-circle').removeClass('red-text');
            $('#thumbsdown-circle').addClass('light');
        }
        if ($('#thumbsdown-circle').hasClass('white-text')){
            $('#thumbsdown-circle').removeClass('white-text');
            $('#thumbsdown-circle').addClass('light');
        }
        if ($('#thumbsdown-circle').hasClass('fa-circle')){
            $('#thumbsdown-circle').removeClass('fa-circle');
            $('#thumbsdown-circle').addClass('fa-circle-thin');
        }
        if ($('#thumbsdown-text').hasClass('dark')){
            $('#thumbsdown-text').removeClass('dark');
            $('#thumbsdown-text').addClass('light');
        }
        if ($('#thumbsup-text').hasClass('light')){
            $('#thumbsup-text').removeClass('light');
            $('#thumbsup-text').addClass('dark');
        }

        if ($('#thumbsup').hasClass('green-text') && $('#thumbsup-circle').hasClass('fa-circle-thin')){
            $('#thumbsup').removeClass('green-text');
            $('#thumbsup').addClass('white-text');
            $('#thumbsup').removeClass('fa-thumbs-o-up');
            $('#thumbsup').addClass('fa-thumbs-up');
            $('#thumbsup-circle').removeClass('fa-circle-thin');
            $('#thumbsup-circle').addClass('fa-circle');
        }
        if ($('#thumbsup').hasClass('light') && $('#thumbsup-circle').hasClass('fa-circle-thin')){
            $('#thumbsup').removeClass('light');
            $('#thumbsup').addClass('white-text');
            $('#thumbsup').removeClass('fa-thumbs-o-up');
            $('#thumbsup').addClass('fa-thumbs-up');
            $('#thumbsup-circle').removeClass('light');
            $('#thumbsup-circle').addClass('green-text');
            $('#thumbsup-circle').removeClass('fa-circle-thin');
            $('#thumbsup-circle').addClass('fa-circle');
        }
        $('input[name="acceptance-status-action"]').val("THUMBS_UP");
        $('.save-feedback-popup').attr('pressed', 'true');
        $('.feedback-prompt-form').trigger("submit");
    });

    $("#feedback-popup-container").on("click",".feedback-not-helpful", function (e) {
        $('#thumbsup').addClass('opacity-5');
        $('#thumbsup-circle').addClass('opacity-5');

        if ($('#thumbsdown').hasClass('opacity-5'))
            $('#thumbsdown').removeClass('opacity-5');
        if ($('#thumbsdown-circle').hasClass('opacity-5'))
            $('#thumbsdown-circle').removeClass('opacity-5');


        if ($('#thumbsup').hasClass('green-text')){
            $('#thumbsup').removeClass('green-text');
            $('#thumbsup').addClass('light');
        }
        if ($('#thumbsup').hasClass('white-text')){
            $('#thumbsup').removeClass('white-text');
            $('#thumbsup').addClass('light');
        }
        if ($('#thumbsup').hasClass('fa-thumbs-up')){
            $('#thumbsup').removeClass('fa-thumbs-up');
            $('#thumbsup').addClass('fa-thumbs-o-up');
        }

        if ($('#thumbsup-circle').hasClass('green-text')){
            $('#thumbsup-circle').removeClass('green-text');
            $('#thumbsup-circle').addClass('light');
        }
        if ($('#thumbsup-circle').hasClass('white-text')){
            $('#thumbsup-circle').removeClass('white-text');
            $('#thumbsup-circle').addClass('light');
        }
        if ($('#thumbsup-circle').hasClass('fa-circle')){
            $('#thumbsup-circle').removeClass('fa-circle');
            $('#thumbsup-circle').addClass('fa-circle-thin');
        }
        if ($('#thumbsup-text').hasClass('dark')){
            $('#thumbsup-text').removeClass('dark');
            $('#thumbsup-text').addClass('light');
        }
        if ($('#thumbsdown-text').hasClass('light')){
            $('#thumbsdown-text').removeClass('light');
            $('#thumbsdown-text').addClass('dark');
        }


        if ($('#thumbsdown').hasClass('red-text') && $('#thumbsdown-circle').hasClass('fa-circle-thin')){
            $('#thumbsdown').removeClass('red-text');
            $('#thumbsdown').addClass('white-text');
            $('#thumbsdown').removeClass('fa-thumbs-o-down');
            $('#thumbsdown').addClass('fa-thumbs-down');
            $('#thumbsdown-circle').removeClass('fa-circle-thin');
            $('#thumbsdown-circle').addClass('fa-circle');
        }
        if ($('#thumbsdown').hasClass('light') && $('#thumbsdown-circle').hasClass('fa-circle-thin')){
            $('#thumbsdown').removeClass('light');
            $('#thumbsdown').addClass('white-text');
            $('#thumbsdown').removeClass('fa-thumbs-o-down');
            $('#thumbsdown').addClass('fa-thumbs-down');
            $('#thumbsdown-circle').removeClass('light');
            $('#thumbsdown-circle').addClass('red-text');
            $('#thumbsdown-circle').removeClass('fa-circle-thin');
            $('#thumbsdown-circle').addClass('fa-circle');
        }
        $('input[name="acceptance-status-action"]').val("THUMBS_DOWN");
        toggle_display_text_feedback(true);
        $(this).parents('.acceptance-status').fadeOut();
    });

    initLeakedQuestion();
    initLoadExternalURL();
    // for creating blank test
    $("#create-blank-test-btn, #create-blank-test-from-test-page").on("click", createBlankTest);

    // to add recaptcha v3 on click handler
    $(".recaptcha-v3").on("click", function(event) {
        var $this = $(this);

        // do not trigger for China
        var countryCode = $this.attr("country-code");
        if (countryCode === undefined || countryCode === null || countryCode === "CN") {
            return false;
        }
        if ($this.hasClass("disabled")) {
            return false;
        }
        var recaptchaSiteKey = $this.attr("recaptcha-site-key") || RECAPTCHA_V3_SITE_KEY;
        var payload = {
            action: $this.attr("data-action")
        }

        // Clean all empty keys
        Object.keys(payload).forEach(function (key) {
            var data = payload[key];
            (data === null || data === undefined) && delete payload[key];
        })

        grecaptcha.ready(function() {
            grecaptcha.execute(recaptchaSiteKey, payload).then(function(token) {
                var targetFormId = $this.attr("target-form");
                if (targetFormId) {
                    var $recaptchaField = $('#' + targetFormId + ' input[name="g-recaptcha-response"]');
                    if ($recaptchaField) {
                        // add a v3 identifier to prevent key mismatch
                        $recaptchaField.val("HACKV3"+token);
                    }
                } else {
                    // TODO add an api that can validate the token received
                }

            });
        });

    });
    // End add recaptcha v3 to onclick
    switchToNewHeader();
});

function endTestCTAOnError() {
    typeof addAlert !== "undefined" && addAlert(SOMETHING_WENT_WRONG_ERROR_TEXT);
}

function parseName(str) {
    var str_len = str.length;
    var atPos = str.lastIndexOf('@');
    if (atPos >=0  && atPos < str_len-1) {
       return str.substr(atPos+1, str_len-1);
    } else {
        return '';
    }
}

var auto_mention_id = null;
var last_empty_query = '';
/*
 * @author Lalit Khattar
 * Show facebook like name when user types in textbox
 * Will make it generic in future to suggest company pages,
 * notes, problem names etc while typing in textbox
 */
$('.mentionable').live('keyup', function(e) {
    var url = $(this).attr('ajax');
    var result_div_id = $(this).attr('result-div-id');
    var name_str = 'developer'; // will be made generic
    var val = $(this).val();
    var cursorPos = $(this).prop('selectionStart');
    val = val.substr(0, cursorPos);

    if (!url || !result_div_id || !val || !name_str) {
        return false;
    }
    var result_div = $('#' + result_div_id);
    // Set timestamp
    result_div.attr('timestamp', $.now());

    // ESC key pressed
    if(e.keyCode==27) {
        $(this).blur();
        result_div.html('');
        result_div.hide();
        return true;
    }

    if( e.keyCode === 40)  { //down
        var $focused = $('.focused');
        var $results = result_div.children();
        if( $focused.length < 1 ) {
            // put the focus on first search result
            $results.first().addClass('focused');
        }
        else {
            var id = parseInt($focused.attr('result-index'));
            var next_id = id+1;
            $results.removeClass('focused');
            $('#'+'search-result-'+next_id).addClass('focused');
        }
        e.preventDefault();
        return true;
    }
    if(e.keyCode === 38) {  //up
        var $focused = $('.focused');
        var $results = result_div.children();
        if( $focused.length < 1 ) {
            // put the focus on first search result
            $results.last().addClass('focused');
        }
        else {
            var id = parseInt($focused.attr('result-index'));
            var prev_id = id-1;
            $results.removeClass('focused');
        var $results = $(".result-wrapper");
            $('#'+'search-result-'+prev_id).addClass('focused');
        }
        e.preventDefault();
        return true;
    }

    if (e.keyCode === 13) { // enter key
        $focused = $('.focused');
        if($focused.length>0) {
            var username = $focused.attr('username');
            var full_name = $focused.attr('user-full-name');
            if(username) {
                var val = $(this).val();
                var val_len = val.length;
                var atPos = val.lastIndexOf('@');
                var cursorPos = $(this).prop('selectionStart');
                if(atPos < cursorPos) {
                    var new_val = val.substr(0, atPos) +
                        '[' + name_str + ':' +username + ']' +
                        val.substr(cursorPos, val_len-1);
                    $(this).val(new_val);
                }
                $('.result-wrapper').removeClass('focused');
                result_div.html('');
                result_div.hide();
            }
            e.preventDefault();
        }
        return true;
    }

    var q = parseName(val);
    if(!q || q.length<=2 || (last_empty_query!='' && q.substring(0, last_empty_query.length)==last_empty_query)) {
        result_div.hide();
        return false;
    }

    result_div.html('<div class="dots-loader"></div>');
    result_div.show();

    // clear any previous ajax request first
    clearTimeout(auto_mention_id);
    var params = {
        url: url,
        type: 'GET',
        data: {'q': q},
        id: $.now(),
        q: q,
    };

    // Specific registered users search for sprint chat
    var sprint_chat_attr = $(this).attr('for');
    if(sprint_chat_attr != undefined){
        if(sprint_chat_attr == 'sprint_chat'){
            params.userpk = '{{user.id}}';
            params.challengepk = '{{event.id}}';
        }
    }

    auto_mention_id = setTimeout(function() {
        $.ajax(params).done(function(data, method) {
            if(method==='success') {
                var r_time = this.id;
            } else {
                var r_time = $.now();
            }
            var data_time = result_div.attr('timestamp');
            if(data_time===undefined || data_time<r_time) {
                var html = $.trim(data.html);
                var result_count = data.result_count;
                // Set last empty query string
                if(result_count==0) {
                    last_empty_query = this.q;
                } else {
                    last_empty_query = '';
                }
                result_div.html(html);
                if(html.length>0) {
                    result_div.show();
                }
                result_div.attr('timestamp', r_time);
            }
        }).fail(function() {
            console.log('Ajax failed');
        });
    }, 500);
});

$('.mentionable').live('keydown', function(e) {
    if(e.keyCode===38 || e.keyCode===40) {
        e.preventDefault();
        return;
    }
});

$('.focused').live('click', function() {
    var e = $.Event("keyup");
    e.keyCode = 13;
    // This is used to select appropritate mentionalbe class used in case of edit comments
    var target_mentionable_parent =  $(this).parent().attr('target-mentionable-parent');
    if (target_mentionable_parent){
        $('#' + target_mentionable_parent).find('.mentionable').trigger(e);
    }
    else {
        $('.mentionable').trigger(e);
    }
});

$(document).mouseup(function (e) {
    var container = $('.mention-suggestion');
    if(container.length<0)
        return;
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) {// ... nor a descendant of the container
        container.html('');
        container.hide();
    }
});

// Notifications: Fade out and move to hyperlinks in click
$('#common-notification').on('click', '.notification-container', function(e) {
    var notificationLink = $(this).find('.notification-link')[0];
    if (notificationLink){
        $(this).hide();
        notificationLink.click();
    }
});

$('#common-notification').on('click', '.notification-close', function(e) {
    e.stopPropagation();
    $(this).parent().hide();
});


// Defining a utility function to add instance methods
// and static instance attributes on a class.
// instance methods take instance as first explicit argument
Function.prototype.add_instance_methods = function(object){
    var target = this.prototype;
    for (var prop in object) {
        var prop_value = object[prop];
        if (typeof prop_value == "function") {
            // assigning a function wrapper
            target[prop] = (function(target, object, prop){
                return function(){
                    // Adding `this` to the beginning of `arguments`
                    Array.prototype.unshift.call(arguments, this);
                    // calling original function
                    return object[prop].apply(this, arguments);
                };
            })(target, object, prop);
        } else {
            target[prop] = prop_value;
        }
    }
};

// Defining a utility function to add static methods
// and static attributes on a class.
Function.prototype.add_static_properties = function(object){
    var target = this;
    for (var prop in object) {
        var prop_value = object[prop];
        target[prop] = prop_value;
    }
};

// Defining a utility function to extend a class on another.
// To accomplish Inheritance
Function.prototype.extend_class = function(base_class){
    this.prototype = Object.create(base_class.prototype);
    this.prototype.constructor = this;
};

var avatar_errors=[], avatar_errors_sent=[];

function handle_avatar_error(img) {
    var username = $(img).attr('alt');
    if (!(username in avatar_errors)) {
        avatar_errors.push(username);
    }
}

function check_avatar_errors() {
    var errors_to_send = [];
    if (avatar_errors.length > 0) {
        for (var i=0;i<avatar_errors.length;i++) {
            var username = avatar_errors[i];
            if (!(username in avatar_errors_sent)) {
                errors_to_send.push(username);
            }
        }
        avatar_errors=[];
    }
    if (errors_to_send.length > 0) {
        var usernames = errors_to_send.join(',');
        $.post("/avatar/AJAX/handle_client_errors/", {
            usernames: usernames,
        }, function() {
            for (var i=0; i<errors_to_send.length; i++) {
                avatar_errors_sent.push(errors_to_send[i]);
            }
        });
    }
}

$(window).load(function() {
    check_avatar_errors();
    setInterval(check_avatar_errors, 5*1000);
});


$('.layout-container').parent().find("header.header").addClass('new-layout-header');

// Object.assign polyfill
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
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
  };
}

// Function analogous to python string format function
String.prototype.format = function() {
    var args = arguments;
    this.unkeyed_index = 0;
    return this.replace(/\{(\w*)\}/g, function(match, key) {
        if (key === '') {
            key = this.unkeyed_index;
            this.unkeyed_index++
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? args[key]
                : match;
        } else {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    }.bind(this));
};

function set_profile_timezone(timezone_element) {
    // Ajax call to set user system timezone as the profile timezone
    var ajax_url = $(timezone_element).attr('ajax');
    $.ajax({
        url: ajax_url,
        type: 'POST',
        success: function() {
            // Reload the page using forceGet,since the time information may change
            // now
            location.reload(true);
        }
    });
}

// Utility to encode and decode string in Base64
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};


function changeUserLocale(select, current_locale, is_authenticated) {
    if(select.value && select.value != current_locale) {
        var target_url = $('option:selected', select).attr('url');
        var page_url = $(select).attr('page_url');
        var locale = select.value;
        if(is_authenticated) {
            var url = $(select).attr('ajax_url');
            var data = {
                'locale': locale,
                'page_url': page_url
            };
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function(response) {
                    if(response['status'] == AJAX_OK) {
                        if(response['redirect_required']) {
                            window.location.href = response['redirect_url'];
                        } else {
                            $(select).val(current_locale);
                        }
                    }
                }
            });
        } else {
            encoded_value = Base64.encode(locale);
            createCookie('ulang', encoded_value);
            createCookie('plang', encoded_value);
            window.location.href = target_url;
        }
    }
}

function changeAdminLocale(element, current_locale) {
    var locale = $(element).attr('language_code');
    var locale_verbose = $(element).attr('language');
    if(locale != current_locale) {
        var url = $(element).attr('ajax_url');
        var data = {
            'locale': locale,
            'page_url': window.location.pathname,
        };
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function(response) {
                if(response['status'] == AJAX_OK) {
                    if(response['redirect_required']) {
                        window.location.href = response['redirect_url'];
                    } else {
                        $('#current-user-language').attr('language_code', locale);
                        $('#current-user-language').children('#language').text(locale_verbose);
                    }
                }
            }
        });
    }
}

/* Event allowed language switcher */
$('.event-language-option').live('click', function() {
    var selected_option = $(this);
    var selected_language_code = $(selected_option).attr('language-code');
    var selected_language = $(selected_option).attr('language');
    var target_url = $(selected_option).attr('target_url');
    var current_language = $('#current-event-language');
    var current_language_code = $(current_language).attr('language_code');
    $('#current-event-language').find('#language').html(selected_language);
    $(selected_option).parents('#event-languages-box').hide();

    if(current_language_code != selected_language_code &&
        selected_language != undefined && target_url != undefined) {
        //createCookie('user_lang', selected_language_code);
        //createCookie('page_lang', selected_language_code);
        window.location = target_url;
    }
});

/* External link preview modal starts here */
function addExternalLinkModalClassAndTargetAttr(selector) {
    $.each($(selector), function(idx, item) {
        $(item).addClass("show-modal load-external-url").attr("target", "external-link-modal");
    });
}

function openExternalLinksInModal() {
    addExternalLinkModalClassAndTargetAttr('.problem-description a');
    addExternalLinkModalClassAndTargetAttr('.problem-statement a');
}

function readAndLoadExternalLinkInModal(fileURL) {
    // remove the existing url in src
    var externalContentWrapper = $("#external-link-content-wrapper > pre");
    externalContentWrapper.html(LOADER_HTML);

    $.ajax({
        url: fileURL,
        type: 'GET',
        crossDomain: true,
        success: function(data) {
            // update the body of iframe with the response data
            externalContentWrapper.text(data);
        },
        error: function(error) {
            // update the body of iframe with the error text
            externalContentWrapper.text(SOMETHING_WENT_WRONG_ERROR_TEXT);
        }
    });
}

function initLoadExternalURL() {
    // For now only plain text formats are supported.
    $("body").on('click', '.load-external-url', function() {
        var url = $(this).attr('href');

        if (!url) {
            return false;
        }

        readAndLoadExternalLinkInModal(url);
    });
}
/* External link preview modal ends here */

// For leaked question tag, showing modal - Start
function initLeakedQuestion() {
    $("body").on('click', '.leaked-question-container', function(e) {
        e.stopPropagation();
        var clickedUrl = $(this).data('url');
        var $desc = $(this).find('.description').html();
        var $leakedQuestionModal = $("#leakedQuestionModal");
        // incase of individual reports
        if ($leakedQuestionModal.length === 0) return;

        if (clickedUrl) {
            $leakedQuestionModal.find('.leaked-url').attr('href', clickedUrl).find('.leaked-url-text').text(clickedUrl);

            if ($desc) {
                $leakedQuestionModal.find(".description").html($desc);
                $leakedQuestionModal.find(".show-hide-cta").hide();
                $leakedQuestionModal.find(".description").removeClass('hidden');
            }
            showModal('leakedQuestionModal');
        }
    });
}
// For leaked question tag, showing modal - End

// for create-test in the dashboard and all-test page - Start
function createBlankTest() {
    var $this = $(this);
    var defaultText = $this.text();
    var clicked = $this.data('clicked');
    $this.text(clicked);
    $this.attr("disabled");
    $this.addClass("disabled");
    var data = {
      "testDuration": 0,
      "questionSetData": []
    }

    $.post(testCreationUrls.createTestApi, { "data": JSON.stringify(data) })
        .done(function(response) {
            if (response.status === AJAX_OK) {
                window.location.href = response.eventUrl;
            }
        })
        .fail(function() {
            if (typeof window.addAlert !== "undefined") {
                window.addAlert(window.SOMETHING_WENT_WRONG_ERROR_TEXT);
            }
        })
        .always(function() {
            $this.text(defaultText);
            $this.removeAttr("disabled");
            $this.removeClass("disabled");
        })
};
// for create-test in the dashboard and all-test page - End

function switchToNewHeader() {
    var $el = $(".switch-to-new-header");
    if (!$el.length) {
        return;
    }

    $el.on('click', function() {
        var featureName = 'recruiter-header'
        var url = '/canary/api/features/'+featureName+'/change-visibility/';
        var lang = window.LANGUAGE_PREFIX;

        if (lang) {
            url = '/'+lang+url;
        }
        var postData = {
            visible: true,
            feedback: {
              reasons: [],
              comment: '',
              rating: 0,
            },
        };

        $.ajax({
            url: url,
            type: 'POST',
            data: postData,
            success: function() {
                sessionStorage.setItem('showGreetings', "true");
                window.location.reload();
            },
            error: function() {
                addAlert(FALL_BACK_MESSAGE)
            }
        })
    })
}