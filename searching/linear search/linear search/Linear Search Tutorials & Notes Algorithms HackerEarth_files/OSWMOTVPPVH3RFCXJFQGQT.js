(function () {
  var scheme = (("https:" == document.location.protocol) ? "https" : "http");
  var adnxs_domain = 'secure.adnxs.com';
  var aol_domain = 'secure.leadback.advertising.com';
  window.adroll_seg_eid = "OSWMOTVPPVH3RFCXJFQGQT";
  window.adroll_sendrolling_cross_device = true;
  window.adroll_form_fields = JSON.parse("[]");
  if (typeof __adroll._form_attach != 'undefined') {
    __adroll._form_attach();
  }
  window.adroll_rule_type = "p";
  var rule = ["*", "*"];
  if (scheme=='http') { adnxs_domain = 'ib.adnxs.com'; aol_domain = 'leadback.advertising.com';}
  var el = document.createElement("div");
  el.style["width"] = "1px";
  el.style["height"] = "1px";
  el.style["display"] = "inline";
  el.style["position"] = "absolute";
  var cm_urls = ["/cm/r/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/b/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/x/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/l/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/o/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/g/out?advertisable=FEPHET2J7RHDNBQYLJDVN2&google_nid=adroll5"];
  var img_tag = '<img height="1" width="1" style="border-style:none;" alt="" src="{}"/>\n';
  var content = '';
  for(var i = 0; i < cm_urls.length; i++) {
    content += img_tag.replace("{}", __adroll._srv(cm_urls[i]));
  }

  if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','//connect.facebook.net/en_US/fbevents.js');
  }

  try {
      try {
          
(function() {
var rtb = document.createElement("div");
rtb.style["width"] = "1px";
rtb.style["height"] = "1px";
rtb.style["display"] = "inline";
rtb.style["position"] = "absolute";
rtb.innerHTML = ["/cm/index/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/n/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/outbrain/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/pubmatic/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/taboola/out?advertisable=FEPHET2J7RHDNBQYLJDVN2","/cm/triplelift/out?advertisable=FEPHET2J7RHDNBQYLJDVN2"].reduce(function (acc, cmURL) {
    return acc + '<img height="1" width="1" style="border-style:none;" alt="" src="' + __adroll._srv(cmURL) + '"/>';
}, '');
__adroll._head().appendChild(rtb);
})();

      } catch(e) {}
      try {
          
(function(){
    var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = "//s.adroll.com/j/sendrolling.js";
    ((document.getElementsByTagName("head") || [null])[0] || document.getElementsByTagName("script")[0].parentNode).appendChild(scr);
}());

      } catch(e) {}
      try {
          if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
    var fbLimitedDataUse = true;
    if(typeof __adroll.fb === 'undefined'){
    if (fbLimitedDataUse) {
        fbq('dataProcessingOptions', ['LDU'], 0, 0);
    }
    fbq('init', '453239785067342');
    fbq('set', 'autoConfig', 'false', '453239785067342');
    __adroll.fb=true;

    var __fbcd = {segment_eid: "OSWMOTVPPVH3RFCXJFQGQT"};
    for (var prop in __adroll.get_external_data()){
        __fbcd['ar_' + prop] = __adroll.get_external_data()[prop];
    }

    fbq('track', "PageView", __fbcd);
    } else {
    var __fbcd = {event: "EventSegment", segment_eid: "OSWMOTVPPVH3RFCXJFQGQT"};
    for (var prop in __adroll.get_external_data()){
        __fbcd['ar_' + prop] = __adroll.get_external_data()[prop];
    }

    fbq('track', "CustomEvent", __fbcd);
    }
}

      } catch(e) {}
  } catch(e) {}

  var r = Math.random()*10000000000000000;
  content = content.replace(/\[ord\]/gi, r);
  content = content.replace(/\[protocol\]/gi, scheme);
  content = content.replace(/\[adnxs_domain\]/gi, adnxs_domain);
  content = content.replace(/\[aol_domain\]/gi, aol_domain);
  var adroll_tpc = __adroll._global('adroll_tpc');
  if (adroll_tpc) {
    var srv_parts = __adroll._srv().split('?');
    var srv_host = srv_parts[0].substr(srv_parts[0].indexOf(':') + 1);
    var srv_re = new RegExp(srv_host + '([^\?\"\'\>\#\S]+)\\?*', 'gi');
    content = content.replace(srv_re, srv_host + '$1?' + srv_parts[1] + '&');
  }
  content = __adroll.replace_external_data(content);
  el.innerHTML = content;
  __adroll._head().appendChild(el);
  if (typeof __adroll.set_pixel_cookie != 'undefined') {__adroll.set_pixel_cookie(adroll_adv_id, adroll_pix_id, "OSWMOTVPPVH3RFCXJFQGQT");}
}());
