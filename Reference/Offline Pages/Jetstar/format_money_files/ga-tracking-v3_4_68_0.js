var jetstarGATracking=(function(){var culture="en-AU",country="None",pageName="",userType="Guest",workFlow="SB",fullPageName="",pageViewURL="",holidayPackageCode="byo",orderID="",mode="None",cityPair="",countries={"en-au":"Australia","zh-cn":"China","en-tt":"Indonesia","id-id":"Indonesia","ja-jp":"Japan","ms-my":"Malaysia","en-gb":"Malaysia","en-nz":"New Zealand","en-ca":"Singapore","zh-sg":"Singapore","th-th":"Thailand","en-zw":"Thailand","en-us":"United States","en-za":"Vietnam","vi-vn":"Vietnam"},searchPages={"Search.aspx":"bookingengine-flight",holidays:"compactsearch-holiday",home:"compactsearch-flight"},paymentType={creditcard:"creditcard",directdeposit:"directdeposit",VO:"voucher",PP:"paypal",PO:"poli",OP:"onepay",AP:"alipay",WN:"wellnet",GC:"gcash",manila:"manila",SE:"seleven",SP:"singpost",BD:"bank",AT:"bidvatm",VP:"vnpost",AG:"agencycredit",BL:"pacificbooking",HOLD:"holdpayment"};return{VisitorType:function(){var vistorType="anonymous";if(userType.indexOf("member")!=-1){vistorType="member"}if(userType.indexOf("agent")!=-1){vistorType="Trade"}return vistorType},SkySalesPOS:function(){return culture.toLowerCase()},POS:function(){return country},Mode:function(){return mode},init:function(){if(window.console==undefined){window.console={log:function(){}}}if(typeof(_gaq)=="undefined"){return false}this.setCustomVariables();this.setPageViewUrls();this.trackOutboundTraffic();this.scheduleTracking();if(pageName=="Select.aspx"||pageName=="HPSelect.aspx"||pageName=="QFFSelect.aspx"){this.selectTracking()}if(pageName=="Pay.aspx"){this.paymentTracking()}if(pageName=="C3Payment.aspx"||pageName=="Pay.aspx"){jetstarGATracking.setCookie("pageRefreshStatus","freshPage")}if(pageName.indexOf("HP")==0){this.holidayTracking()}if(pageName=="/new-booking/Itinerary.aspx"||pageName=="/manage-booking/Itinerary.aspx"){var pageRefreshStatus=jetstarGATracking.getCookie("pageRefreshStatus");if(pageRefreshStatus=="freshPage"){var pnrTimer=setInterval((function(){var reservationNumber="";if($(".reference .ref-number span").length>0){reservationNumber=$(".reference .ref-number span").text()}else{if($(".reservation-number span.pnr").length>0){reservationNumber=$(".reservation-number span.pnr").text()}}if(reservationNumber!=""){clearInterval(pnrTimer);jetstarGATracking.createTransaction(reservationNumber)}}),1000)}}if(pageName=="bookinglist.aspx"&&document.referrer.toLowerCase().indexOf("login.aspx")!=-1){this.trackMemberLogin()}if(pageName.indexOf("Seats.aspx")!=-1){this.seatsTracking()}this.trackMemberLogout();this.trackExtendSession();this.trackPageErrorMsg();this.itineraryConfirmationAdTracking()},setCulture:function(pCulture){culture=(typeof(pCulture)=="undefined"||pCulture=="")?culture:pCulture;country=(typeof(countries[culture.toLowerCase()])=="undefined")?"None":countries[culture.toLowerCase()]},setUserType:function(pUserType){userType=(typeof(pUserType)=="undefined")?"":pUserType.toLowerCase()},setHolidayPackageCode:function(pHolidayPackageCode){holidayPackageCode=(typeof(pHolidayPackageCode)=="undefined"||pHolidayPackageCode=="")?"byo":pHolidayPackageCode},setWorkFlow:function(pWorkFlow){workFlow=pWorkFlow},setMode:function(pMode){mode=(typeof(pMode)=="undefined"||pMode=="")?"None":pMode},setCityPair:function(pCityPair){cityPair=(typeof(pCityPair)=="undefined"||pCityPair=="")?"None":pCityPair},setCustomVariables:function(){if(userType.indexOf("member")!=-1){_gaq.push(["_setCustomVar",1,"Visitor Type","Member",2])}if(userType.indexOf("agent")!=-1){_gaq.push(["_setCustomVar",1,"Visitor Type","Trade",2])}_gaq.push(["_setCustomVar",3,"Skysales POS",culture.toLowerCase(),2]);_gaq.push(["_setCustomVar",4,"Country POS",country,2]);_gaq.push(["_setCustomVar",5,"Mode",mode,2])},trackOutboundTraffic:function(){var domain="jetstar";if(debug){console.log("Run trackOutboundTraffic")}$('a[href*="http"]:not([href*="'+domain+'"])').click(function(){if(debug){console.log("GA Push _trackPageview = ","/outbound-traffic-book/"+$(this).attr("href"))}_gaq.push(["_trackPageview","/outbound-traffic-book/"+$(this).attr("href")])})},trackMemberLogout:function(){$("a[href*='logout=true'], a.signout-button").click(function(){_gaq.push(["_trackEvent","my-jetstar-login","successful-logout"])})},trackMemberLogin:function(){_gaq.push(["_trackEvent","my-jetstar-login","successful-login"])},createTransaction:function(reservationNumber){var dt=new Date(),commaDecimal=(culture=="vi-VN"||culture=="ms-MY"||culture=="id-ID")?true:false,crossRate=currencyConverter.formatFloat($("#conversion-rates").length?$("#conversion-rates").attr("to-aud"):"1"),currency=$("#xmlOutputCurrencyCode").length?$("#xmlOutputCurrencyCode").attr("value"):"AUD",fareTotal=currencyConverter.formatFloat($("#xmloutput_XTOTAL").attr("value")),paymentFee=currencyConverter.formatFloat($("#xmloutput_payment_fee").attr("value"));if(!Date.prototype.toISOString){(function(){function pad(number){var r=String(number);if(r.length===1){r="0"+r}return r}Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+pad(this.getUTCMonth()+1)+"-"+pad(this.getUTCDate())+"T"+pad(this.getUTCHours())+":"+pad(this.getUTCMinutes())+":"+pad(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1000).toFixed(3)).slice(2,5)+"Z"}}())}orderID=(workFlow=="SB")?"NEW":"CHG";orderID+="_"+reservationNumber+"_";orderID+=new Date().toISOString();if(debug){console.log("[GARFCDIGNORE: "+orderID+"]")}fareTotal*=crossRate;paymentFee*=crossRate;if(fareTotal>0){_gaq.push(["_addTrans",orderID,currency,fareTotal.toString(),"",paymentFee.toString(),"","",""]);this.createTransactionItems(orderID,TransactionItems,crossRate);_gaq.push(["_trackTrans"])}jetstarGATracking.setCookie("pageRefreshStatus","")},createTransactionItems:function(orderID,items,crossRate){for(var index in items){if(index!=undefined){for(var inner in items[index]){if(items[index][inner] instanceof Array){combineGADuplicateItem(items[index][inner]);this.createTransactionItems(orderID,items[index],crossRate)}else{if(inner!=undefined){var tranxItem=(typeof items[index][inner]==="object")?items[index][inner]:items[index];_gaq.push(["_addItem",orderID,tranxItem.ProductCode,tranxItem.ProductName,tranxItem.Category,currencyConverter.formatFloat(tranxItem.UnitPrice)*crossRate,tranxItem.Quantity]);if(!items[index].length){break}}}}}}function combineGADuplicateItem(arrayItems){for(var indx=0;indx<arrayItems.length;indx++){for(var innerx=(indx+1),flag=1;innerx<arrayItems.length;innerx++){if(arrayItems[indx]["ProductCode"]==arrayItems[innerx]["ProductCode"]&&arrayItems[indx]["ProductName"]==arrayItems[innerx]["ProductName"]){arrayItems[indx]["Quantity"]=Number(arrayItems[indx]["Quantity"])+Number(arrayItems[innerx]["Quantity"]);arrayItems.splice(innerx,1);innerx--}}}}},setPageViewUrls:function(){var url=window.location.pathname;pageName=url.substring(url.lastIndexOf("/")+1);if((!/QFFItinerary.aspx/gi.test(pageName))&&(!/HPItinerary.aspx/gi.test(pageName))){if(/(itinerary|\/c3itinerary)/gi.test(document.URL)){if(workFlow=="C3"){pageName="/manage-booking/Itinerary.aspx"}else{if(workFlow=="SC"){pageName="/schedule-change/Itinerary.aspx"}else{if(workFlow=="SB"&&/(\/bookinglist)/gi.test(document.referrer)){pageName="/booking-list/Itinerary.aspx"}else{if(workFlow=="WCI"){pageName="/ItineraryConfirmation.aspx"}else{if((userType=="masteragent"||userType=="agent")&&/(\/c3itinerary)/gi.test(document.URL)){pageName="/manage-booking/Itinerary.aspx"}else{pageName="/new-booking/Itinerary.aspx"}}}}}}}if(pageName=="Select.aspx"||pageName=="HPSelect.aspx"||pageName=="QFFSelect.aspx"){var referralString=document.referrer.split("/"),referralPage=referralString[referralString.length-1].split("?")[0];if(searchPages[referralPage]&&cityPair!=""&&cityPair!="-"){pageName+="?searchquery="+cityPair+"&searchcategory="+searchPages[referralPage]}}if(pageName=="DeeplinkChangeItinerary.aspx"||pageName=="ManageMyTrip.aspx"||pageName=="Select.aspx"||pageName=="Preferences.aspx"){if(analyticsDataLayer.get("utm_source")!=undefined||analyticsDataLayer.get("utm_medium")!=undefined||analyticsDataLayer.get("utm_content")!=undefined||analyticsDataLayer.get("utm_campaign")!=undefined||analyticsDataLayer.get("rrid")!=undefined||analyticsDataLayer.get("rmid")!=undefined){_gaq.push(["_set","campaignParams",analyticsDataLayer.get("all_params")])}}_gaq.push(["_trackPageview",pageName]);if(debug){console.log("_trackPageview = ",pageName)}},seatsTracking:function(){$("a[href='#bottom']").click(function(){runSeatTracking("top-click","accept")});$(".clear-selection").click(function(){runSeatTracking("top-click","remove")});$(".toolbar-buttons .prev").click(function(){runSeatTracking("seatmap-click","prevflight")});$(".toolbar-buttons .next").click(function(){runSeatTracking("seatmap-click","nextflight")});$(".feuxCheckbox, .priority-boarding label").click(function(){var isChecked=$(".feuxCheckbox").hasClass("checked");runSeatTracking("pbrd-click",isChecked?"pbrd-uncheck":"pbrd-check")});$(".btn-continue").click(function(){runSeatTracking("bottom-click","continue")});$("p.skip-selection").click(function(){runSeatTracking("bottom-click","skip")});function runSeatTracking(action,label){_gaq.push(["_trackEvent","seats",action,label])}},trackSeatPassengerSelect:function(label){_gaq.push(["_trackEvent","seats","paxflightselect",label])},trackSeatMapSelect:function(dataGroup){var seatGroup=["","std","leg","upf"];_gaq.push(["_trackEvent","seats","seatmap-click","seatselect-"+seatGroup[Number(dataGroup)]])},holidayTracking:function(){_gaq.push(["_trackEvent","Holiday Packages Skysales",pageName.split("?")[0],holidayPackageCode])},memberTracking:function(){function runMemberTracking(action){_gaq.push(["_trackEvent","my-jetstar-login",action])}},selectTracking:function(){$(".topbar .logo").click(function(){runSelectTracking("1-top","jetstar.com_CLICK")});$(".return-link").click(function(){runSelectTracking("1-top","back-to-home_CLICK")});$("#nav .fares .first").click(function(){runSelectTracking("2-progress-bar","step-1-search_CLICK")});$(".modify").click(function(){runSelectTracking("3-outbound-search","modify-your-search_CLICK")});$(".section:first .day-picker .dates .prev, .section:first .day-picker .dates ul li:not(.active):not(.active ~ li)").click(function(){runSelectTracking("3-outbound-search","earlier-days_CLICK")});$(".section:first .day-picker .dates .next, .section:first .day-picker .dates ul li.active ~ li").click(function(){runSelectTracking("3-outbound-search","later-days_CLICK")});$(".section:first .flexible").click(function(){runSelectTracking("3-outbound-search","month-view_CLICK")});$(".section:not(:first) .day-picker .dates .prev, .section:not(:first) .day-picker .dates ul li:not(.active):not(.active ~ li)").click(function(){runSelectTracking("5-inbound-search","earlier-days_CLICK")});$(".section:not(:first) .day-picker .dates .next, .section:not(:first) .day-picker .dates ul li.active ~ li").click(function(){runSelectTracking("5-inbound-search","later-days_CLICK")});$(".section:not(:first) .flexible").click(function(){runSelectTracking("5-inbound-search","month-view_CLICK")});$(".close-notification").click(function(){runSelectTracking("4-fare-types","close_CLICK")});$(".fare-notification .launch-modal").click(function(){runSelectTracking("4-fare-types","learn-more_CLICK")});$(".dont-show-notification").click(function(){runSelectTracking("4-fare-types","dont-show-again_CLICK")});$(".depart .trigger-fare-inclusions").click(function(){runSelectTracking("4-outbound-flight","see-inclusions_CLICK")});$(".depart .trigger-airport-info").mouseenter(function(){runSelectTracking("4-outbound-flight","location-info_CLICK")});$(".depart .trigger-flight-detail").mouseenter(function(){runSelectTracking("4-outbound-flight","flight-info_CLICK")});$(".depart .starter .radio").click(function(){runSelectTracking("4-outbound-flight","starter-flight_CLICK")});$(".depart .business .radio").click(function(){runSelectTracking("4-outbound-flight","business-flight_CLICK")});$(".return .trigger-fare-inclusions").click(function(){runSelectTracking("6-inbound-flight","see-inclusions_CLICK")});$(".return .trigger-airport-info").mouseenter(function(){runSelectTracking("6-inbound-flight","location-info_CLICK")});$(".return .trigger-flight-detail").mouseenter(function(){runSelectTracking("6-inbound-flight","flight-info_CLICK")});$(".return .starter .radio").click(function(){runSelectTracking("6-inbound-flight","starter-flight_CLICK")});$(".return .business .radio").click(function(){runSelectTracking("6-inbound-flight","business-flight_CLICK")});$(".depart .starter-baggage-yes").change(function(){runSelectTracking("4a-outbound-flight-options","yes-"+$(".depart .starter-baggage-yes option:selected").prop("value"))});$(".depart .baggage-no").click(function(){runSelectTracking("4a-outbound-flight-options","no-thanks_CLICK")});$(".depart .baggage-yes").click(function(){runSelectTracking("4a-outbound-flight-options","yes-please_CLICK")});$(".depart .starter-plus-yes").click(function(){runSelectTracking("4a-outbound-flight-options","plus-tick_CLICK")});$(".depart .starter-max-yes").click(function(){runSelectTracking("4a-outbound-flight-options","max-tick_CLICK")});$('.depart a.inline[href*="carry-on-baggage"]').click(function(){runSelectTracking("4a-outbound-flight-options","carryon-info_CLICK")});$('.depart a[href*="fare-rules#item02"]').click(function(){runSelectTracking("4a-outbound-flight-options","plus-rules_CLICK")});$('.depart a[href*="fare-rules#item03"]').click(function(){runSelectTracking("4a-outbound-flight-options","max-rules_CLICK")});$(".depart .promo .button").click(function(){runSelectTracking("4a-outbound-flight-options","business-upgrade_CLICK")});$(".return .starter-baggage-yes").change(function(){runSelectTracking("6a-inbound-flight-options","yes-"+$(".return .starter-baggage-yes option:selected").prop("value"))});$(".return .baggage-no").click(function(){runSelectTracking("6a-inbound-flight-options","no-thanks_CLICK")});$(".return .baggage-yes").click(function(){runSelectTracking("6a-inbound-flight-options","yes-please_CLICK")});$(".return .starter-plus-yes").click(function(){runSelectTracking("6a-inbound-flight-options","plus-tick_CLICK")});$(".return .starter-max-yes").click(function(){runSelectTracking("6a-inbound-flight-options","max-tick_CLICK")});$('.return a.inline[href*="carry-on-baggage"]').click(function(){runSelectTracking("6a-inbound-flight-options","carryon-info_CLICK")});$('.return a[href*="fare-rules#item02"]').click(function(){runSelectTracking("6a-inbound-flight-options","plus-rules_CLICK")});$('.return a[href*="fare-rules#item03"]').click(function(){runSelectTracking("6a-inbound-flight-options","max-rules_CLICK")});$(".return .promo .button").click(function(){runSelectTracking("6a-inbound-flight-options","business-upgrade_CLICK")});$(".btn-continue").click(function(){runSelectTracking("7-summary","continue_CLICK")});$("#footer-slim .logo").click(function(){runSelectTracking("8-footer","logo-home_CLICK")});$('.links a[title*="Contact"]').click(function(){runSelectTracking("8-footer","contact-us_CLICK")});$('.links a[title*="Privacy"]').click(function(){runSelectTracking("8-footer","privacy_CLICK")});$('.links a[title*="Terms"]').click(function(){runSelectTracking("8-footer","terms_CLICK")});$('.footer-notes a[href*="qantas"]').click(function(){runSelectTracking("8-footer","qantas-group_CLICK")});function runSelectTracking(action,label){_gaq.push(["_trackEvent","select-page",action,label])}},passengerTracking:function(){var city=($(".transfers-top").attr("data-arrival-airport")!=undefined)?$(".transfers-top").attr("data-arrival-airport").toLowerCase():"";if($(".transfers-confirmation").length){var route=$(".transfers-confirmation").attr("data-transfer-type").toLowerCase().replace(/ /g,""),destinationPair=$(".transfers-confirmation").attr("data-transfer-from")+"-"+$(".transfers-confirmation").attr("data-transfer-to");runPassengerTracking("load","transfer-reservation-"+destinationPair.toLowerCase().replace("airport",city)+"-"+route);$(".transfers-confirmation a.cancel").click(function(e){runPassengerTracking("click","transfer-cancel-"+destinationPair.toLowerCase().replace("airport",city)+"-"+route)})}else{if($(".transfers-top:visible").length){runPassengerTracking("load","transfer-"+city);$(".transfers .extras-options input").click(function(){var destinationPair=$(this).attr("data-transfer-description").match(/(airport|city)/ig),route=$(this).attr("data-transfer-type").toLowerCase().replace(/ /g,""),checked=$(this).prop("checked")?"transferselect":"deselect";runPassengerTracking(checked,"transfer-"+destinationPair.join("-").toLowerCase().replace("airport",city)+"-"+route)})}else{if($(".passenger-section:has(.transfers)").find(".no-results").length){runPassengerTracking("load","transfer-not-available")}}}function runPassengerTracking(action,label){_gaq.push(["_trackEvent","passenger",action,label])}},baggageTracking:function(){$("p.carry-on-baggage a").click(function(){runBaggageTracking("info-click","limits")});$("p.excess-carry-on a").click(function(){runBaggageTracking("info-click","charges")});$("a.manage-baggage-trigger").click(function(){var amount=getAmountTotal();runBaggageTracking("compact-manageperpax-click",getJourneyTotal()+"journeys-"+getPaxNum()+"pax-"+amount,amount);jetstarGATracking.bgControlLoadTracking()});$("a.manage-baggage-all-trigger").click(function(){var amount=getAmountTotalPerPax();runBaggageTracking("expanded-manageforall-click",getJourneyTotal()+"journeys-"+getPaxNum()+"pax-"+amount,amount);jetstarGATracking.bgControlLoadTracking()});$(".baggage-content div.manage-baggage a.baggage").click(function(){var sibling=$(this).siblings("select");var weight=sibling.val();var price=sibling.find("option:selected").attr("data-price");if(weight=="none"){weight="0"}else{weight=weight.substring(2)}runBaggageTracking("expanded-copytoall",sibling.attr("data-dir")+"-"+getPaxNum()+"pax-"+weight+"kg",Math.round(price));runBaggageTracking("expanded-dropdown-copy",sibling.attr("data-dir")+"-pax"+sibling.attr("pax-owner")+"-"+weight+"kg",Math.round(price));$(this).parent().siblings().children("select").each(function(){runBaggageTracking("expanded-dropdown-copy",$(this).attr("data-dir")+"-pax"+$(this).attr("pax-owner")+"-"+weight+"kg",Math.round(price))})});$(".baggage-content div.baggage-target select").change(function(e){if(e.originalEvent===undefined){return}var weight=$(this).val();var price=$(this).find("option:selected").attr("data-price");if(weight=="none"){weight="0"}else{weight=weight.substring(2)}runBaggageTracking("compact-dropdown-click",$(this).attr("data-dir")+"-"+getPaxNum()+"pax-"+weight+"kg",Math.round(price))});$(".baggage-content div.manage-baggage select").change(function(e){if(e.originalEvent===undefined){return}var weight=$(this).val();var price=$(this).find("option:selected").attr("data-price");if(weight=="none"){weight="0"}else{weight=weight.substring(2)}runBaggageTracking("expanded-dropdown-click",$(this).attr("data-dir")+"-pax"+$(this).attr("pax-owner")+"-"+weight+"kg",Math.round(price))});function getJourneyTotal(){var i=0,stop=false;while(!stop){if(document.getElementById("journey"+i.toString())){i++}else{stop=true}}return i}function getPaxNum(){var i=1;$("#journey0 div.manage-baggage div label").each(function(){if($(this).hasClass("b-p"+i.toString())){i++}});return i-1}function getAmountTotal(){var sum=0;$(".baggage-content div.baggage-target select option:selected").each(function(){var price=$(this).attr("price-all-pax").toString();if(price==undefined||price==""){price=0}else{price=Math.round(price)}sum+=price});return sum}function getAmountTotalPerPax(){var sum=0;$(".baggage-content div.manage-baggage select option:selected").each(function(){var price=$(this).attr("data-price").toString();if(price==undefined||price==""){price=0}else{price=Math.round(price)}sum+=price});return sum}function runBaggageTracking(action,label,value){_gaq.push(["_trackEvent","ancil-baggage",action,label,value])}},bgControlLoadTracking:function(){if($(".baggage-content div.baggage-target").css("display")=="none"){$(".baggage-content div.manage-baggage select").each(function(){var weight=$(this).val();var price=$(this).find("option:selected").attr("data-price");if(weight=="none"){weight="0"}else{weight=weight.substring(2)}runBaggageTracking("expanded-load",$(this).attr("data-dir")+"-pax"+$(this).attr("pax-owner")+"-"+weight+"kg",Math.round(price))})}else{$(".baggage-content div.baggage-target select").each(function(){var weight=$(this).val();var price=$(this).find("option:selected").attr("data-price");if(typeof weight=="undefined"||weight=="none"||weight==null){weight="0"}else{weight=weight.substring(2)}if(typeof price=="undefined"||price==null){price=0}runBaggageTracking("compact-load",$(this).attr("data-dir")+"-"+getPaxNum()+"pax-"+weight+"kg",Math.round(price))})}function getPaxNum(){var i=1;$("#journey0 div.manage-baggage div label").each(function(){if($(this).hasClass("b-p"+i.toString())){i++}});return i-1}function runBaggageTracking(action,label,value){_gaq.push(["_trackEvent","ancil-baggage",action,label,value])}},unselectBaggageTracking:function(currentAmount,journey){var i=1,amount=0;$("#journey0 div.manage-baggage div label").each(function(){if($(this).hasClass("b-p"+i.toString())){i++}});if(currentAmount!=undefined){amount=Math.round(currentAmount)}runBaggageTracking("compact-nothanks-click",journey+"-"+(i-1)+"pax",amount);function runBaggageTracking(action,label,value){_gaq.push(["_trackEvent","ancil-baggage",action,label,value])}},baggageRedesignTracking:function(){$(".baggage-content a.manage-baggage-trigger").click(function(){runBaggageTracking("per-pax-selection","control-"+culture)});$(".baggage-content .btn-toggle button.baggage-per-pax").click(function(){runBaggageTracking("per-pax-selection","orange-button-"+culture)});$(".baggage-content .btn-single-toggle a.btn-is-selected").click(function(){runBaggageTracking("per-pax-selection","orange-border-"+culture)});function runBaggageTracking(action,label){_gaq.push(["_trackEvent","passenger-page",action,label])}},unaccompaniedMinorTracking:function(){$(".unaccompanied-travel a.default-disc").click(function(){runBaggageTracking("children-travelling-alone","independent-traveller")});$(".unaccompanied-travel a.affirmed-disc-not-able").click(function(){runBaggageTracking("children-travelling-alone","link-1-clicked-yes")});$(".unaccompanied-travel a.affirmed-disc-do-not-meet").click(function(){runBaggageTracking("children-travelling-alone","link-2-clicked-yes")});function runBaggageTracking(action,label){_gaq.push(["_trackEvent","passenger-page",action,label])}},unaccompaniedMinorValidationTracking:function(){_gaq.push(["_trackEvent","passenger-page","children-travelling-alone","validation-loaded"])},paymentTracking:function(){$('#toolbar a[href*="bookinglist.aspx"]').click(function(){runPaymentTracking("toolbar_click","myjetstar_mybookings")});$('#toolbar a[href*="logout=true"]').click(function(){runPaymentTracking("toolbar_click","myjetstar_logout")});$(".topbar .logo").click(function(){runPaymentTracking("top_click","jetstarlogo")});$(".return-link").click(function(){runPaymentTracking("top_click","backtohome")});$('#nav .fares a[href*="Search.aspx"]').click(function(){runPaymentTracking("breadcrumbs_click","search")});$('#nav .fares a[href*="Select.aspx"]').click(function(){runPaymentTracking("breadcrumbs_click","select")});$('#nav .fares a[href*="Passenger.aspx"]').click(function(){runPaymentTracking("breadcrumbs_click","passenger")});$('#nav .fares a[href*="SeatSelection.aspx"]').click(function(){runPaymentTracking("breadcrumbs_click","seats")});$('#nav .fares a[href*="Seats.aspx"]').click(function(){runPaymentTracking("breadcrumbs_click","seats")});$('#nav .fares a[href*="Extras.aspx"]').click(function(){runPaymentTracking("breadcrumbs_click","extras")});if($(".error-message .declined, .error-message-long .declined, .alert .declined").length!=0){runPaymentTracking("paymentdeclined_load","paymentdeclinedmessage")}if($(".error-message-long .pending, .alert .pending").length!=0){runPaymentTracking("paymentpending_load","paymentpendingdmessage")}if($(".error-message-long .fraud, .alert .fraud").length!=0){runPaymentTracking("fraud_prevention","card_decline_x3")}$(".bubble .departing th").click(function(){runPaymentTracking("bookingsummary_click","departing")});$(".bubble .returning th").click(function(){runPaymentTracking("bookingsummary_click","returning")});$(".bubble .additional-summary th").click(function(){runPaymentTracking("bookingsummary_click","additionalextras")});$(".bubble .hotels-summary th").click(function(){runPaymentTracking("bookingsummary_click","hotels")});$(".bubble .cars-summary th").click(function(){runPaymentTracking("bookingsummary_click","cars")});$(".bubble .activities-summary th").click(function(){runPaymentTracking("bookingsummary_click","activities")});var paymentTypes=$(".payment-type"),paymentOptions="";$.each(paymentTypes,function(){var dataType=$(this).attr("data-type"),paymentName=(typeof(paymentType[dataType])=="undefined")?dataType:paymentType[dataType];isActive=/active/.test($(this).attr("class"));if(isActive){runPaymentTracking("options_default_load",paymentName)}$(this).click(function(){runPaymentTracking("options_open_click",paymentName)});paymentOptions+=("-"+paymentName)});runPaymentTracking("options_all_load_1",paymentOptions.replace(/-/,""));$(".directdeposit a[href=#TNC]").click(function(){runPaymentTracking("method_directdeposit_click","proceed")});$(".paypal a[href=#TNC]").click(function(){runPaymentTracking("method_paypal_click","proceed")});$(".poli a[href*=consumers]").click(function(){runPaymentTracking("method_poli_click","whatis")});$(".poli a[href*=supportedbanks]").click(function(){runPaymentTracking("method_poli_click","banks")});$(".poli a[href=#]").click(function(){runPaymentTracking("method_poli_click","how")});$(".poli a[href=#TNC]").click(function(){runPaymentTracking("method_poli_click","proceed")});$(".onepay a[href=#TNC]").click(function(){runPaymentTracking("method_onepay_click","proceed")});$(".alipay a[href=#TNC]").click(function(){runPaymentTracking("method_alipay_click","proceed")});$(".wellnet a[href=#TNC]").click(function(){runPaymentTracking("method_wellnet_click","proceed")});$(".gcash dl dt a").first().click(function(){runPaymentTracking("method_gcash_click","how")});$(".gcash dl dt a").last().click(function(){runPaymentTracking("method_gcash_click","payment")});$(".gcash a[href=#TNC]").click(function(){runPaymentTracking("method_gcash_click","proceed")});$(".manila dl dt a").first().click(function(){runPaymentTracking("method_jmbo_click","how")});$(".manila a[href=#TNC]").click(function(){runPaymentTracking("method_jmbo_click","proceed")});$(".seleven dl dt a").first().click(function(){runPaymentTracking("method_711_click","how")});$(".seleven a[href=#TNC]").click(function(){runPaymentTracking("method_711_click","proceed")});$(".singpost dl dt a").first().click(function(){runPaymentTracking("method_singpost_click","how")});$(".seleven a[href=#TNC]").click(function(){runPaymentTracking("method_singpost_click","proceed")});$(".bank a[href*=vietcombank], .bank a[href*=techcombank], .bank a[href*=bidv], .bank a[href*=hdbank]").click(function(){runPaymentTracking("method_bank_click","points")});$(".bank dl dt a").first().click(function(){runPaymentTracking("method_bank_click","how")});$(".bank a[href=#TNC]").click(function(){runPaymentTracking("method_bank_click","proceed")});$(".bidvatm dl dt a").first().click(function(){runPaymentTracking("method_bidv_click","how")});$(".bidvatm a[href=#TNC]").click(function(){runPaymentTracking("method_bidv_click","proceed")});$(".vnpost dl dt a").first().click(function(){runPaymentTracking("method_vnpost_click","how")});$(".vnpost a[href=#TNC]").click(function(){runPaymentTracking("method_vnpost_click","proceed")});$(".agencycredit a[href=#TNC]").click(function(){runPaymentTracking("method_agency_click","proceed")});$(".pacificbooking dl dt a").first().click(function(){runPaymentTracking("method_pacific_click","how")});$(".pacificbooking a[href=#TNC]").click(function(){runPaymentTracking("method_pacific_click","proceed")});$(".holdpayment a[href=#TNC]").click(function(){runPaymentTracking("method_hold_click","proceed")});$(".voucher button.png").click(function(){runPaymentTracking("method_voucher_click","submit")});$(".generic-table.voucher-table a.button").click(function(){runPaymentTracking("payment_summary_click","remove_voucher")});$(".menu li a[href=#item01]").click(function(){runPaymentTracking("information_click","flightsorschedules")});$(".menu li a[href=#item02]").click(function(){runPaymentTracking("information_click","baggagepolicy")});$(".menu li a[href=#item03]").click(function(){runPaymentTracking("information_click","checkintimes")});$(".menu li a[href=#item04]").click(function(){runPaymentTracking("information_click","visas")});$(".menu li a[href=#item05]").click(function(){runPaymentTracking("information_click","connections")});$(".menu li a[href=#item06]").click(function(){runPaymentTracking("information_click","independenttraveller")});$(".menu li a[href=#item07]").click(function(){runPaymentTracking("information_click","infants")});$(".menu li a[href=#item08]").click(function(){runPaymentTracking("information_click","special assistance")});$(".menu li a[href=#item09]").click(function(){runPaymentTracking("information_click","pets")});$(".menu li a[href=#item10]").click(function(){runPaymentTracking("information_click","bulkyitems")});$(".terms-conditions").change(function(){if(this.checked){runPaymentTracking("terms_click","tick")}else{runPaymentTracking("terms_click","untick")}});$(".submit-payment a[href*=terms-and-conditions]").click(function(){runPaymentTracking("terms_click","farerules")});$(".submit-payment a[href*=conditions-of-carriage]").click(function(){runPaymentTracking("terms_click","conditions")});$(".submit-payment a[href*=specific-assistance]").click(function(){runPaymentTracking("terms_click","independenttraveller")});$(".submit-payment a[href*=privacy-policy]").click(function(){runPaymentTracking("terms_click","privacy")});$(".submit-payment").find("button").click(function(){runPaymentTracking("purchase_click","purchase")});$("#footer-slim .logo").click(function(){runPaymentTracking("footer_click","jetstarlogo")});$('.links a[title*="Contact"]').click(function(){runPaymentTracking("footer_click","contactus")});$('.links a[title*="Privacy"]').click(function(){runPaymentTracking("footer_click","privacy")});$('.links a[title*="Terms"]').click(function(){runPaymentTracking("footer_click","terms")});$('.footer-notes a[href*="qantas"]').click(function(){runPaymentTracking("footer_click","qantas")});function runPaymentTracking(action,label){_gaq.push(["_trackEvent","paymentpage",action,label])}},scheduleTracking:function(){var timer=function(){if($("#SCAvailabilitySearchInputSearchChangeView_marketOutboundConfirm0").length){_gaq.push(["_trackEvent","Customer Portal","Load","Accept Outbound"])}};setTimeout(timer,500);$("#SCAvailabilitySearchInputSearchChangeView_marketOutboundConfirm0").change(function(){runScheduleTracking("Accept Outbound")});$("#SCAvailabilitySearchInputSearchChangeView_RadioButtonBeforeMkt00").change(function(){runScheduleTracking("Outbound Change Opt 1")});$("#SCAvailabilitySearchInputSearchChangeView_RadioButtonAfterMkt01").change(function(){runScheduleTracking("Outbound Change Opt 2")});$("#additionalOptions0").change(function(){if($(this).is(":checked")){runScheduleTracking("Outbound Refund")}});$("#CancelConfirm0").change(function(){if($(this).is(":checked")){runScheduleTracking("Outbound Cancel")}});$("#SCAvailabilitySearchInputSearchChangeView_marketOutboundConfirm1").change(function(){runScheduleTracking("Accept Return")});$("#SCAvailabilitySearchInputSearchChangeView_RadioButtonBeforeMkt10").change(function(){runScheduleTracking("Return Change Opt 1")});$("#SCAvailabilitySearchInputSearchChangeView_RadioButtonAfterMkt11").change(function(){runScheduleTracking("Return Change Opt 2")});$("#additionalOptions1").change(function(){if($(this).is(":checked")){runScheduleTracking("Return Refund")}});$("#CancelConfirm1").change(function(){if($(this).is(":checked")){runScheduleTracking("Return Cancel")}});$("#SCAvailabilitySearchInputSearchChangeView_SCSubmit").click(function(){runScheduleTracking("Continue")});$(".changeMenuItem").click(function(){runScheduleTracking($(this).find("#changeMenuItemText a").text())});$("#SCBackButton_btn").click(function(){runScheduleTracking("Back")});$("#SCBackButton_LinkButtonFinalize1").click(function(){runScheduleTracking("Finalise_bottom")});function runScheduleTracking(label){_gaq.push(["_trackEvent","Customer Portal","Click",label])}},trackExtendSession:function(){$("#timeout-warning").find("a").click(function(){_gaq.push(["_trackEvent","session_extension","session_extended",pageName])})},trackSessionTimeOutAlert:function(){_gaq.push(["_trackEvent","session_extension","overlay_load",pageName])},trackValidationErrorMessage:function(displayedMsg){var message=displayedMsg.replace(/<(.|\n)*?>/g,"");_gaq.push(["_trackEvent","error-messages","skysales",message])},trackPageErrorMsg:function(){var onlyCulture=culture.substring(0,2)=="en";if(onlyCulture==true){var noParamPageName=pageName.replace(/\?[a-zA-Z0-9-]+\=[a-zA-Z0-9-]+/g,"");if(($("#errorSectionContent").length>0)&&((noParamPageName=="SessionExpired.aspx")||(noParamPageName=="AnErrorHasOccurred.aspx"))){var $this=$("#errorSectionContent"),errorContainer=$this.find("p"),errMsg=errorContainer.text().replace(/\n/g,"");_gaq.push(["_trackEvent","error-messages","skysales",errMsg])}}},itineraryConfirmationAdTracking:function(){var eventLabel="";if($(".adbox img").on){$(".adbox img").one("load",function(){eventLabel="IMG_"+$(this).attr("alt")+", URL_"+$(this).parent("a").attr("href");_gaq.push(["_trackEvent","itinerary-page","banner_LOAD",eventLabel]);if(debug){console.log("Itinerary Advertisement Banner: "+eventLabel)}}).on("click",function(){eventLabel="IMG_"+$(this).attr("alt")+", URL_"+$(this).parent("a").attr("href");_gaq.push(["_trackEvent","itinerary-page","banner_CLICK",eventLabel]);if(debug){console.log("Itinerary Advertisement Banner: "+eventLabel)}}).each(function(){if(this.complete){$(this).load()}})}},setCookie:function(c_name,value,exdays){var exdate=new Date();exdate.setDate(exdate.getDate()+exdays);var c_value=escape(value)+((exdays==null)?"":"; expires="+exdate.toUTCString());document.cookie=c_name+"="+c_value},getCookie:function(c_name){var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++){x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y)}}}}})();window.onload=function(){if($("#SCAvailabilitySearchInputSearchChangeView_marketOutboundConfirm1").length){_gaq.push(["_trackEvent","Customer Portal","Load","Accept Return"])}};