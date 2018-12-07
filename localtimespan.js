function getLocalTimespan(utcstart,utcend, options) {

	// var utcstart=1536623100*1000;
	// var utcend=1536630300*1000;

	if (!utcstart) utcstart = (new Date()).getTime();
	if (!utcend) utcend = utcstart;
	if (!options) options = {
		year: 'numeric', month: 'short', day: '2-digit',
		hour: '2-digit', minute: '2-digit', second: '2-digit',
		weekday: 'short', hour12: false, timeZoneName: 'long'
	};
	var formatter = new Intl.DateTimeFormat(navigator.language, options)
	var arr2hash = function(a,c) { a[c.type]=c.value; return a; }
	var start = formatter.formatToParts(utcstart).reduce(arr2hash,new Array());
	var end = formatter.formatToParts(new Date(utcend)).reduce(arr2hash,new Array());
	
	// gives 
	/* {
		day: "11"
		hour: "01"
		literal: " "
		minute: "45"
		month: "09"
		second: "00"
		timeZoneName: "Central European Summer Time"
		weekday: "Tue"
		year: "18"
	}
	*/
	
	//console.log(start,end);
	
	if (utcstart==utcend) {
		
		// same times
		// Tue Sep 11 2018, 01:45 (Central European Summer Time)
		// = weekday month year, hour:minute (timeZoneName)
		timespan = start.weekday+' ';
		timespan += start.day+' ';
		timespan += start.month+' ';
		timespan += start.year+', ';
		timespan += start.hour+':';
		timespan += start.minute+' (';
		timespan += start.timeZoneName+')';
		
	} else if (start.day==end.day && start.month==end.month && start.year==end.year) {
		
		// same dates, other time
		// Tue Sep 11 2018, 01:45 - 03:45 (Central European Summer Time)
		// = weekday month year, hour:minute - hour:minute (timeZoneName)
		
		timespan = start.weekday+' ';
		timespan += start.day+' ';
		timespan += start.month+' ';
		timespan += start.year+', ';
		timespan += start.hour+':';
		timespan += start.minute+' - ';
		timespan += end.hour+':';
		timespan += end.minute+' (';
		timespan += start.timeZoneName+')';
	
	} else {
		
		// totally different
		// Tue Sep 11 2018, 01:45 - Wed Sep 12 2018, 03:45 (Central European Summer Time)
		// = weekday month year, hour:minute - weekday month year, hour:minute (timeZoneName)
		
		timespan = start.weekday+' ';
		timespan += start.day+' ';
		timespan += start.month+' ';
		timespan += start.year+', ';
		timespan += start.hour+':';
		timespan += start.minute+' - ';
		timespan += end.weekday+' ';
		timespan += end.day+' ';
		timespan += end.month+' ';
		timespan += end.year+', ';
		timespan += end.hour+':';
		timespan += end.minute+' (';
		timespan += start.timeZoneName+')';
		
	}
	return timespan;
}

function getLocalTimezone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_',' ');
}
