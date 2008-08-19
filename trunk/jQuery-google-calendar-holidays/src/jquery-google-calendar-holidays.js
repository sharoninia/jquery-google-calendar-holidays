/**
 * google calendar holidays for jQuery
 *
 * Copyright (c) 2008 Yoshiomi KURISU
 * Licensed under the MIT (MIT-LICENSE.txt)  licenses.
 *
 */
(function($){
    $.gHolidayData = {
        "us": ["United States", "usa__en"],
        "ja": ["Japan", "japanese__ja"],
        "au": ["Australia", "australian__en"],
        "at": ["Austria", "austrian__en"],
        "br": ["Brazil", "brazilian__en"],
        "ca": ["Canada", "canadian__en"],
        "cn": ["China", "china__en"],
        "dk": ["Denmark", "danish__en"],
        "nl": ["Netherlands", "dutch__en"],
        "fi": ["Finland", "finnish__en"],
        "fr": ["France", "french__en"],
        "de": ["Germany", "german__en"],
        "gr": ["Greece", "greek__en"],
        "hk": ["Hong Kong", "hong_kong__en"],
        "in": ["India", "indian__en"],
        "id": ["Indonesia", "indonesian__en"],
        "ie": ["Ireland", "irish__en"],
        "it": ["Italy", "italian__en"],
        "my": ["Malaysia", "malaysia__en"],
        "mx": ["Mexico", "mexican__en"],
        "nz": ["New Zealand", "new_zealand__en"],
        "no": ["Norway", "norwegian__en"],
        "ph": ["Philippines", "philippines__en"],
        "pl": ["Poland", "polish__en"],
        "pt": ["Portugal", "portuguese__en"],
        "ru": ["Russian Federation", "russian__en"],
        "sg": ["Singapore", "singapore__en"],
        "za": ["South Africa", "sa__en"],
        "kr": ["South Korea", "south_korea__en"],
        "es": ["Spain", "spain__en"],
        "se": ["Sweden", "swedish__e"],
        "tw": ["Taiwan", "taiwan__en"],
        "th": ["Thailand", "thai__en"],
        "gb": ["United Kingdom", "uk__en"],
        "vn": ["Viet Nam", "vietnamese__en"]
    }
    
    $.getGCalendarSubset = function(){
        var val = [];
        for (p in $.gHolidayData) {
            val.push([$.gHolidayData[p][0], p]);
        }
        return val;
    }
    
    $.getGHoliday = function(p){
        var account = ($.gHolidayData[p.country]) ? $.gHolidayData[p.country][1] : $.gHolidayData["us"][1];
        var url = 'http://www.google.com/calendar/feeds/' + account + '@holiday.calendar.google.com/public/full-noattendees';
        var fmtDate = function(p){
            var p = new Date(p);
            p = (p) ? p : new Date();
            var pad = function(_in){
                _in = "" + _in;
                if (_in.length == 1) 
                    return '0' + _in;
                else 
                    return _in;
            }
            if (p.getTime) 
                return p.getFullYear() + '-' + pad(p.getMonth() + 1) + '-' + pad(p.getDate());
        }
        if (p.callbackFuncName && p.callbackFuncName.split) {
            var param = {
                "start-min": fmtDate((p.start) ? p.start : new Date()),
                "start-max": fmtDate((p.end) ? p.end : new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000))),
                "max-results": (p.count) ? p.count : "100",
                "alt": "json-in-script",
                "callback": p.callbackFuncName
            }
            var gp = [];
            for (p in param) {
                gp.push(p + '=' + param[p]);
            }
            url += '?' + gp.join('&');
            $.getScript(url);
        }
        
    }
    
    $.getHolidaysObject = function(data){
        var holidays = data.feed.entry;
        var val = [];
        for (var i = 0, len = holidays.length; i < len; i++) {
            var h = holidays[i];
            val.push({
                "date": h.gd$when[0].startTime,
                "title": h.title.$t
            });
        }
        return val;
    }
    
})(jQuery);
