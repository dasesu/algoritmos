function reload_problems_pagelet(a,b){var c=$("#practice-link").attr("link");c+="?sort_by="+b,a!=""&&(c+="&p_level="+a),window.location=c}$(document).ready(function(){$("#sort-by").live("change",function(a){reload_problems_pagelet($("#diff-filter").val(),$(this).val()),$(".opacity-loader").removeClass("hidden")}),$("#diff-filter").live("change",function(a){reload_problems_pagelet($(this).val(),$("#sort-by").val()),$(".opacity-loader").removeClass("hidden")}),$(".load-prob-pagination").on("click",function(){$(".opacity-loader").removeClass("hidden")}),$("#view-tutorial-editorial").live("click",function(){$(".tutorial-editorial-content").addClass("hidden"),$(".tutorial-editorial-content2").removeClass("hidden")}),$(".subtopic-name").on("click",function(){var a=$(this).children(".fa-angle");a.hasClass("fa-angle-down")?($(this).siblings(".subtopics-container").slideDown(),a.removeClass("fa-angle-down").addClass("fa-angle-up")):($(this).siblings(".subtopics-container").slideUp(),a.removeClass("fa-angle-up").addClass("fa-angle-down"))}),$("#practice-problems").on("click",function(){$(".opacity-loader").removeClass("hidden")}),$("#tutorial-tab").on("click",function(){$(".opacity-loader").removeClass("hidden"),$("#tutorial-problem").addClass("hidden")})});