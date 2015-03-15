(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret}})(name,prop[name]):prop[name]}function Class(){if(!initializing&&this.init){this.init.apply(this,arguments)}}Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;return Class}})();(function(window){var Porthole={trace:function(s){if(window.console!==undefined){window.console.log("Porthole: "+s)}},error:function(s){if(window.console!==undefined){window.console.error("Porthole: "+s)}}};Porthole.WindowProxy=function(){};Porthole.WindowProxy.prototype={post:function(data,targetOrigin){},addEventListener:function(f){},removeEventListener:function(f){}};Porthole.WindowProxyBase=Class.extend({init:function(targetWindowName){if(targetWindowName===undefined){targetWindowName=""}this.targetWindowName=targetWindowName;this.origin=window.location.protocol+"//"+window.location.host;this.eventListeners=[]},getTargetWindowName:function(){return this.targetWindowName},getOrigin:function(){return this.origin},getTargetWindow:function(){return Porthole.WindowProxy.getTargetWindow(this.targetWindowName)},post:function(data,targetOrigin){if(targetOrigin===undefined){targetOrigin="*"}this.dispatchMessage({data:data,sourceOrigin:this.getOrigin(),targetOrigin:targetOrigin,sourceWindowName:window.name,targetWindowName:this.getTargetWindowName()})},addEventListener:function(f){this.eventListeners.push(f);return f},removeEventListener:function(f){var index;try{index=this.eventListeners.indexOf(f);this.eventListeners.splice(index,1)}catch(e){this.eventListeners=[]}},dispatchEvent:function(event){var i;for(i=0;i<this.eventListeners.length;i++){try{this.eventListeners[i](event)}catch(e){}}}});Porthole.WindowProxyLegacy=Porthole.WindowProxyBase.extend({init:function(proxyIFrameUrl,targetWindowName){this._super(targetWindowName);if(proxyIFrameUrl!==null){this.proxyIFrameName=this.targetWindowName+"ProxyIFrame";this.proxyIFrameLocation=proxyIFrameUrl;this.proxyIFrameElement=this.createIFrameProxy()}else{this.proxyIFrameElement=null;throw new Error("proxyIFrameUrl can't be null")}},createIFrameProxy:function(){var iframe=document.createElement("iframe");iframe.setAttribute("id",this.proxyIFrameName);iframe.setAttribute("name",this.proxyIFrameName);iframe.setAttribute("src",this.proxyIFrameLocation);iframe.setAttribute("frameBorder","1");iframe.setAttribute("scrolling","auto");iframe.setAttribute("width",30);iframe.setAttribute("height",30);iframe.setAttribute("style","position: absolute; left: -100px; top:0px;");if(iframe.style.setAttribute){iframe.style.setAttribute("cssText","position: absolute; left: -100px; top:0px;")}document.body.appendChild(iframe);return iframe},dispatchMessage:function(message){var encode=window.encodeURIComponent;if(this.proxyIFrameElement){var src=this.proxyIFrameLocation+"#"+encode(Porthole.WindowProxy.serialize(message));this.proxyIFrameElement.setAttribute("src",src);this.proxyIFrameElement.height=this.proxyIFrameElement.height>50?50:100}}});Porthole.WindowProxyHTML5=Porthole.WindowProxyBase.extend({init:function(proxyIFrameUrl,targetWindowName){this._super(targetWindowName);this.eventListenerCallback=null},dispatchMessage:function(message){this.getTargetWindow().postMessage(Porthole.WindowProxy.serialize(message),message.targetOrigin)},addEventListener:function(f){if(this.eventListeners.length===0){var self=this;this.eventListenerCallback=function(event){self.eventListener(self,event)};window.addEventListener("message",this.eventListenerCallback,false)}return this._super(f)},removeEventListener:function(f){this._super(f);if(this.eventListeners.length===0){window.removeEventListener("message",this.eventListenerCallback);this.eventListenerCallback=null}},eventListener:function(self,nativeEvent){var data=Porthole.WindowProxy.unserialize(nativeEvent.data);if(data&&(self.targetWindowName==""||data.sourceWindowName==self.targetWindowName)){self.dispatchEvent(new Porthole.MessageEvent(data.data,nativeEvent.origin,self))}}});if(typeof window.postMessage!=="function"){Porthole.trace("Using legacy browser support");Porthole.WindowProxy=Porthole.WindowProxyLegacy.extend({})}else{Porthole.trace("Using built-in browser support");Porthole.WindowProxy=Porthole.WindowProxyHTML5.extend({})}Porthole.WindowProxy.serialize=function(obj){if(typeof JSON==="undefined"){throw new Error("Porthole serialization depends on JSON!")}return JSON.stringify(obj)};Porthole.WindowProxy.unserialize=function(text){if(typeof JSON==="undefined"){throw new Error("Porthole unserialization dependens on JSON!")}try{var json=JSON.parse(text)}catch(e){return false}return json};Porthole.WindowProxy.getTargetWindow=function(targetWindowName){if(targetWindowName===""){return top}else{if(targetWindowName==="top"||targetWindowName==="parent"){return window[targetWindowName]}}return parent.frames[targetWindowName]};Porthole.MessageEvent=function MessageEvent(data,origin,source){this.data=data;this.origin=origin;this.source=source};Porthole.WindowProxyDispatcher={forwardMessageEvent:function(e){var message,decode=window.decodeURIComponent,targetWindow,windowProxy;if(document.location.hash.length>0){message=Porthole.WindowProxy.unserialize(decode(document.location.hash.substr(1)));targetWindow=Porthole.WindowProxy.getTargetWindow(message.targetWindowName);windowProxy=Porthole.WindowProxyDispatcher.findWindowProxyObjectInWindow(targetWindow,message.sourceWindowName);if(windowProxy){if(windowProxy.origin===message.targetOrigin||message.targetOrigin==="*"){windowProxy.dispatchEvent(new Porthole.MessageEvent(message.data,message.sourceOrigin,windowProxy))}else{Porthole.error("Target origin "+windowProxy.origin+" does not match desired target of "+message.targetOrigin)}}else{Porthole.error("Could not find window proxy object on the target window")}}},findWindowProxyObjectInWindow:function(w,sourceWindowName){var i;if(w.RuntimeObject){w=w.RuntimeObject()}if(w){for(i in w){if(w.hasOwnProperty(i)){try{if(w[i]!==null&&typeof w[i]==="object"&&w[i] instanceof w.Porthole.WindowProxy&&w[i].getTargetWindowName()===sourceWindowName){return w[i]}}catch(e){}}}}return null},start:function(){if(window.addEventListener){window.addEventListener("resize",Porthole.WindowProxyDispatcher.forwardMessageEvent,false)}else{if(document.body.attachEvent){window.attachEvent("onresize",Porthole.WindowProxyDispatcher.forwardMessageEvent)}else{Porthole.error("Cannot attach resize event")}}}};if(typeof window.exports!=="undefined"){window.exports.Porthole=Porthole}else{window.Porthole=Porthole}})(this);