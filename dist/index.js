var t=function(t){this._queue=[],this._onEmptyCallback=t};t.prototype.queue=function(t){this._queue.push(t),1!==this._queue.length||this._active||this._progressQueue()},t.prototype._progressQueue=function(){if(this._queue.length){var t=this._queue.shift();this._active=!0;var e=this.next.bind(this);t&&t(e)}else this._onEmptyCallback()},t.prototype.clear=function(){this._queue=[]},t.prototype.next=function(){this._active=!1,this._progressQueue()};var e=function(t,e,i){this._el=t,this._data=e.config,this._path=e.image,this._currentFrameIndex=0,this._currentFrame=void 0,this._exiting=!1,this._currentAnimation=void 0,this._endCallback=void 0,this._started=!1,this._sounds={},this.currentAnimationName=void 0,this.preloadSounds(i),this._overlays=[this._el];var n=this._el;this._setupElement(this._el);for(var o=1;o<this._data.overlayCount;o++){var r=document.createElement("div"),s=this._setupElement(r);n.append(s),this._overlays.push(s),n=s}};e.prototype._setupElement=function(t){var e=this._data.framesize;return t.style.display="none",t.style.width=e[0]+"px",t.style.height=e[1]+"px",t.style.background="url('"+this._path+"') no-repeat",t},e.prototype.animations=function(){var t=[],e=this._data.animations;for(var i in e)t.push(i);return t},e.prototype.preloadSounds=function(t){for(var e=0;e<this._data.sounds.length;e++){var i=this._data.sounds[e],n=t[e];n&&(this._sounds[i]=new Audio(n))}},e.prototype.hasAnimation=function(t){return!!this._data.animations[t]},e.prototype.exitAnimation=function(){this._exiting=!0},e.prototype.showAnimation=function(t,e){return this._exiting=!1,!!this.hasAnimation(t)&&(this._currentAnimation=this._data.animations[t],this.currentAnimationName=t,this._started||(this._step(),this._started=!0),this._currentFrameIndex=0,this._currentFrame=void 0,this._endCallback=e,!0)},e.prototype._draw=function(){var t=[];this._currentFrame&&(t=this._currentFrame.images||[]);for(var e=0;e<this._overlays.length;e++)if(e<t.length){var i=t[e],n=-i[0]+"px "+-i[1]+"px";this._overlays[e].style.backgroundPosition=n,this._overlays[e].style.display="block"}else this._overlays[e].style.display="none"},e.prototype._getNextAnimationFrame=function(){if(!this._currentAnimation)return 0;if(!this._currentFrame)return 0;var t=this._currentFrame,e=this._currentFrame.branching;if(this._exiting&&void 0!==t.exitBranch)return t.exitBranch;if(e)for(var i=100*Math.random(),n=0;n<e.branches.length;n++){var o=e.branches[n];if(i<=o.weight)return o.frameIndex;i-=o.weight}return this._currentFrameIndex+1},e.prototype._playSound=function(){var t,e=null===(t=this._currentFrame)||void 0===t?void 0:t.sound;if(e){var i=this._sounds[e];i&&i.play()}},e.prototype._atLastFrame=function(){return!!this._currentAnimation&&this._currentFrameIndex>=this._currentAnimation.frames.length-1},e.prototype._step=function(){if(this._currentAnimation){var t=Math.min(this._getNextAnimationFrame(),this._currentAnimation.frames.length-1),i=!this._currentFrame||this._currentFrameIndex!==t;this._currentFrameIndex=t,this._atLastFrame()&&this._currentAnimation.useExitBranching||(this._currentFrame=this._currentAnimation.frames[this._currentFrameIndex]),this._draw(),this._playSound(),this._loop=window.setTimeout(this._step.bind(this),this._currentFrame.duration),this._endCallback&&i&&this._atLastFrame()&&(this._currentAnimation.useExitBranching&&!this._exiting?this._endCallback(this.currentAnimationName,e.States.WAITING):this._endCallback(this.currentAnimationName,e.States.EXITED))}},e.prototype.pause=function(){window.clearTimeout(this._loop)},e.prototype.resume=function(){this._step()},e.States={WAITING:1,EXITED:0};var i=function(){var t=void 0!==window.pageXOffset,e="CSS1Compat"===(document.compatMode||"");return{scrollLeft:t?window.pageXOffset:e?document.documentElement.scrollLeft:document.body.scrollLeft,scrollTop:t?window.pageYOffset:e?document.documentElement.scrollTop:document.body.scrollTop}};function n(t){if(!t.getClientRects().length)return{top:0,left:0};var e=t.getBoundingClientRect(),i=t.ownerDocument.defaultView||{pageXOffset:0,pageYOffset:0};return{top:e.top+i.pageYOffset,left:e.left+i.pageXOffset}}function o(t,e){if("inner"===e)return t.clientWidth;if("outer"===e)return t.offsetWidth;var i=window.getComputedStyle(t,null);return"width"===e?t.clientWidth-parseInt(i.getPropertyValue("padding-left"))-parseInt(i.getPropertyValue("padding-right")):"full"===e?t.offsetWidth+parseInt(i.getPropertyValue("margin-left"))+parseInt(i.getPropertyValue("margin-right")):null}function r(t,e){if("inner"===e)return t.clientHeight;if("outer"===e)return t.offsetHeight;var i=window.getComputedStyle(t,null);return"height"===e?t.clientHeight-parseInt(i.getPropertyValue("padding-top"))-parseInt(i.getPropertyValue("padding-bottom")):"full"===e?t.offsetHeight+parseInt(i.getPropertyValue("margin-top"))+parseInt(i.getPropertyValue("margin-bottom")):null}var s=function(){var t=this;this.promise=new Promise((function(e,i){t.resolve=e,t.reject=i}))},a=function(t){this._hiding=null,this._loop=null,this._active=!0,this._hold=!1,this._addWord=null,this._targetEl=t,this._hidden=!0,this._setup()};a.prototype._setup=function(){var t=document.createElement("div");t.className="clippy-balloon",t.setAttribute("hidden","true");var e=document.createElement("div");e.className="clippy-tip";var i=document.createElement("div");i.className="clippy-content",t.appendChild(e),t.appendChild(i),this._balloon=t,this._content=i,this._targetEl.insertAdjacentElement("afterend",t)},a.prototype.reposition=function(){for(var t=["top-left","top-right","bottom-left","bottom-right"],e=0;e<t.length;e++){var i=t[e];if(this._position(i),!this._isOut())break}},a.prototype._position=function(t){if(this._balloon){var e=n(this._targetEl),s=r(this._targetEl,"height"),a=o(this._targetEl,"width"),l=i(),h=l.scrollLeft,u=l.scrollTop;e.top-=h,e.left-=u;var p=r(this._balloon,"outer"),d=o(this._balloon,"outer");this._balloon.classList.remove("clippy-top-left"),this._balloon.classList.remove("clippy-top-right"),this._balloon.classList.remove("clippy-bottom-right"),this._balloon.classList.remove("clippy-bottom-left");var c=0,_=0;switch(t){case"top-left":c=e.left+a-d,_=e.top-p-15;break;case"top-right":c=e.left,_=e.top-p-15;break;case"bottom-right":c=e.left,_=e.top+s+15;break;case"bottom-left":c=e.left+a-d,_=e.top+s+15}this._balloon.style.top=_+"px",this._balloon.style.left=c+"px",this._balloon.classList.add("clippy-"+t)}},a.prototype._isOut=function(){if(this._balloon){var t=n(this._balloon),e=r(this._balloon,"outer"),s=o(this._balloon,"outer"),a=document.querySelector("html").clientWidth,l=document.querySelector("html").clientHeight,h=i(),u=h.scrollLeft,p=h.scrollTop,d=t.top-u,c=t.left-p;return d-5<0||c-5<0||(d+e+5>l||c+s+5>a)}},a.prototype.speak=function(t,e,i){this._hidden=!1,this.show();var n=this._content;n&&(n.style.height="auto",n.style.width="auto",n.innerHTML=e,n.style.height=n.style.height||"",n.style.width=n.style.width||"",n.innerHTML="",this.reposition(),this._complete=t,this._sayWords(e,i,t))},a.prototype.show=function(){this._balloon&&(this._hidden||this._balloon.removeAttribute("hidden"))},a.prototype.hide=function(t){var e;t?null===(e=this._balloon)||void 0===e||e.setAttribute("hidden","true"):this._hiding=window.setTimeout(this._finishHideBalloon.bind(this),2e3)},a.prototype._finishHideBalloon=function(){var t;this._active||(null===(t=this._balloon)||void 0===t||t.setAttribute("hidden","true"),this._hidden=!0,this._hiding=null)},a.prototype._sayWords=function(t,e,i){var n=this;this._active=!0,this._hold=e;var o=t.split(/[^\S-]/),r=this._content,s=1;this._addWord=function(){var t;n._active&&(s>o.length?(n._addWord=null,n._active=!1,n._hold||(i(),n.hide(!1))):(r&&(r.innerHTML=o.slice(0,s).join(" ")),s++,n._loop=window.setTimeout(null===(t=n._addWord)||void 0===t?void 0:t.bind(n),200)))},this._addWord()},a.prototype.close=function(){this._active?this._hold=!1:this._hold&&this._complete&&this._complete()},a.prototype.pause=function(){this._loop&&window.clearTimeout(this._loop),this._hiding&&(window.clearTimeout(this._hiding),this._hiding=null)},a.prototype.resume=function(){this._addWord?this._addWord():this._hold||this._hidden||(this._hiding=window.setTimeout(this._finishHideBalloon.bind(this),2e3))};var l=function(i){this._hidden=!1,this._offset={top:0,left:0};var n=i.agent,o=i.selector;this._queue=new t(this._onQueueEmpty.bind(this));var r=document.createElement("div");r.className="clippy",r.setAttribute("hidden","true"),this._el=r,((o?document.getElementsByClassName(o)[0]:void 0)||document.body).appendChild(this._el);var s=Object.values(i.agent.soundMp3);this._animator=new e(this._el,n,s),this._balloon=new a(this._el),this._setupEvents()};function h(t){return new Promise((function(e,i){import("./agents/"+t+".js").then((function(t){e(t.default)})).catch((function(t){i(t)}))}))}l.prototype.gestureAt=function(t,e){var i=this._getDirection(t,e),n="Gesture"+i,o="Look"+i,r=this.hasAnimation(n)?n:o;return this.play(r)},l.prototype.hide=function(t,e){var i=this;return this._hidden=!0,this._el,this.stop(),t?(this._el.setAttribute("hidden","true"),this.stop(),this.pause(),void(e&&e())):this._playInternal("Hide",(function(){i._el.setAttribute("hidden","true"),i.pause(),e&&e()}))},l.prototype.moveTo=function(t,i,n){var o=this,r="Move"+this._getDirection(t,i);void 0===n&&(n=1e3),this._addToQueue((function(s){if(0===n)return o._el.style.top=i+"px",o._el.style.left=t+"px",o.reposition(),void s();if(!o.hasAnimation(r)){var a=function(){o._el.removeEventListener("animationend",a),s()};return o._el.addEventListener("animationend",a),void o._el.animate({top:i,left:t},{duration:n,iterations:1})}o._playInternal(r,(function(r,a){if(a===e.States.EXITED&&s(),a===e.States.WAITING){var l=function(){o._el.removeEventListener("animationend",l),o._animator.exitAnimation()};o._el.addEventListener("animationend",l),o._el.animate({top:i+"px",left:t+"px"},{duration:n,iterations:1})}}))}),this)},l.prototype._playInternal=function(t,e){var i=this;this._isIdleAnimation()&&this._idleDfd&&this._idleDfd.promise.then((function(){i._playInternal(t,e)})),this._animator.showAnimation(t,e)},l.prototype.play=function(t,i,n){var o=this;return!!this.hasAnimation(t)&&(void 0===i&&(i=5e3),this._addToQueue((function(r){var s=!1;i&&window.setTimeout((function(){s||o._animator.exitAnimation()}),i),o._playInternal(t,(function(t,i){i===e.States.EXITED&&(s=!0,n&&n(),r())}))}),this),!0)},l.prototype.show=function(t){if(void 0===t&&(t=!0),this._hidden=!1,t)return this._el.removeAttribute("hidden"),this.resume(),void this._onQueueEmpty();var e=this._el.style.top,n=this._el.style.left;if("auto"===e||"auto"!==n){var o=.8*document.querySelector("html").clientWidth,r=.8*(document.querySelector("html").clientHeight+i().scrollLeft);this._el.style.top=r+"px",this._el.style.left=o+"px"}return this.resume(),this.play("Show")},l.prototype.speak=function(t,e){var i=this;void 0===e&&(e=!1),this._addToQueue((function(n){i._balloon.speak(n,t,e)}),this)},l.prototype.closeBalloon=function(){this._balloon.hide()},l.prototype.delay=function(t){var e=this;t=t||250,this._addToQueue((function(i){e._onQueueEmpty(),window.setTimeout(i,t)}))},l.prototype.stopCurrent=function(){this._animator.exitAnimation(),this._balloon.close()},l.prototype.stop=function(){this._queue.clear(),this._animator.exitAnimation(),this._balloon.hide()},l.prototype.hasAnimation=function(t){return this._animator.hasAnimation(t)},l.prototype.animations=function(){return this._animator.animations()},l.prototype.animate=function(){var t=this.animations(),e=t[Math.floor(Math.random()*t.length)];return 0===e.indexOf("Idle")?this.animate():this.play(e)},l.prototype._getDirection=function(t,e){var i=n(this._el),s=r(this._el,"height"),a=o(this._el,"width"),l=i.left+a/2,h=i.top+s/2-e,u=l-t,p=Math.round(180*Math.atan2(h,u)/Math.PI);return-45<=p&&p<45?"Right":45<=p&&p<135?"Up":135<=p&&p<=180||-180<=p&&p<-135?"Left":-135<=p&&p<-45?"Down":"Top"},l.prototype._onQueueEmpty=function(){if(!this._hidden&&!this._isIdleAnimation()){var t=this._getIdleAnimation();this._idleDfd=new s,this._animator.showAnimation(t,this._onIdleComplete.bind(this))}},l.prototype._onIdleComplete=function(t,i){var n;i===e.States.EXITED&&(null===(n=this._idleDfd)||void 0===n||n.resolve(void 0))},l.prototype._isIdleAnimation=function(){var t=this._animator.currentAnimationName;return t&&0===t.indexOf("Idle")},l.prototype._getIdleAnimation=function(){for(var t=this.animations(),e=[],i=0;i<t.length;i++){var n=t[i];0===n.indexOf("Idle")&&e.push(n)}return e[Math.floor(Math.random()*e.length)]},l.prototype._setupEvents=function(){window.addEventListener("resize",this.reposition.bind(this)),this._el.addEventListener("mousedown",this._onMouseDown.bind(this)),this._el.addEventListener("dblclick",this._onDoubleClick.bind(this))},l.prototype._onDoubleClick=function(){this.play("ClickedOn")||this.animate()},l.prototype.reposition=function(){if("true"===this._el.getAttribute("hidden")){var t=n(this._el),e=r(this._el,"outer"),s=o(this._el,"outer"),a=document.querySelector("html").clientWidth,l=document.querySelector("html").clientHeight,h=i(),u=h.scrollLeft,p=h.scrollTop,d=t.top-u,c=t.left-p;d-5<0?d=5:d+e+5>l&&(d=l-e-5),c-5<0?c=5:c+s+5>a&&(c=a-s-5),this._el.style.left=c+"px",this._el.style.top=d+"px",this._balloon.reposition()}},l.prototype._onMouseDown=function(t){t.preventDefault(),this._startDrag(t)},l.prototype._startDrag=function(t){this.pause(),this._balloon.hide(!0),this._offset=this._calculateClickOffset(t),this._moveHandle=this._dragMove.bind(this),this._upHandle=this._finishDrag.bind(this),window.addEventListener("mousemove",this._moveHandle),window.addEventListener("mouseup",this._upHandle),this._dragUpdateLoop=window.setTimeout(this._updateLocation.bind(this),10)},l.prototype._calculateClickOffset=function(t){var e=t.pageX,i=t.pageY,o=n(this._el);return{top:i-o.top,left:e-o.left}},l.prototype._updateLocation=function(){this._el.style.top=(this._targetY||0)+"px",this._el.style.left=(this._targetX||0)+"px",this._dragUpdateLoop=window.setTimeout(this._updateLocation.bind(this),10)},l.prototype._dragMove=function(t){t.preventDefault();var e=t.clientX-this._offset.left,i=t.clientY-this._offset.top;this._targetX=e,this._targetY=i},l.prototype._finishDrag=function(){window.clearTimeout(this._dragUpdateLoop),this._moveHandle&&window.removeEventListener("mousemove",this._moveHandle),this._upHandle&&window.removeEventListener("mouseup",this._upHandle),this._balloon.show(),this.reposition(),this.resume()},l.prototype._addToQueue=function(t,e){e&&(t=t.bind(e)),this._queue.queue(t)},l.prototype.pause=function(){this._animator.pause(),this._balloon.pause()},l.prototype.resume=function(){this._animator.resume(),this._balloon.resume()};var u={Bonzi:function(){return h("Bonzi")},Clippy:function(){return h("Clippy")},F1:function(){return h("F1")},Genie:function(){return h("Genie")},Genius:function(){return h("Genius")},Links:function(){return h("Links")},Merlin:function(){return h("Merlin")},Peedy:function(){return h("Peedy")},Rocky:function(){return h("Rocky")},Rover:function(){return h("Rover")},Otto:function(){return h("Otto")}},p=[],d=[];!function(t,e){if(t&&"undefined"!=typeof document){var i,n=!0===e.prepend?"prepend":"append",o=!0===e.singleTag,r="string"==typeof e.container?document.querySelector(e.container):document.getElementsByTagName("head")[0];if(o){var s=p.indexOf(r);-1===s&&(s=p.push(r)-1,d[s]={}),i=d[s]&&d[s][n]?d[s][n]:d[s][n]=a()}else i=a();65279===t.charCodeAt(0)&&(t=t.substring(1)),i.styleSheet?i.styleSheet.cssText+=t:i.appendChild(document.createTextNode(t))}function a(){var t=document.createElement("style");if(t.setAttribute("type","text/css"),e.attributes)for(var i=Object.keys(e.attributes),o=0;o<i.length;o++)t.setAttribute(i[o],e.attributes[i[o]]);var s="prepend"===n?"afterbegin":"beforeend";return r.insertAdjacentElement(s,t),t}}('.clippy, .clippy-balloon {\n    position: fixed;\n    z-index: 1000;\n    cursor: pointer;\n}\n\n.clippy-balloon {\n\n    background: #FFC;\n    color: black;\n    padding: 8px;\n    border: 1px solid black;\n    border-radius: 5px;\n\n}\n\n.clippy-content {\n    max-width: 200px;\n    min-width: 120px;\n    font-family: "Microsoft Sans", sans-serif;\n    font-size: 10pt;\n}\n\n.clippy-tip {\n    width: 10px;\n    height: 16px;\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAMAAAAlvKiEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF///MAAAA////52QwgAAAAAN0Uk5T//8A18oNQQAAAGxJREFUeNqs0kEOwCAIRFHn3//QTUU6xMyyxii+jQosrTPkyPEM6IN3FtzIRk1U4dFeKWQiH6pRRowMVKEmvronEynkwj0uZJgR22+YLopPSo9P34wJSamLSU7lSIWLJU7NkNomNlhqxUeAAQC+TQLZyEuJBwAAAABJRU5ErkJggg==) no-repeat;\n    position: absolute;\n}\n\n.clippy-top-left .clippy-tip {\n    top: 100%;\n    margin-top: 0px;\n    left: 100%;\n    margin-left: -50px;\n}\n\n.clippy-top-right .clippy-tip {\n    top: 100%;\n    margin-top: 0px;\n    left: 0;\n    margin-left: 50px;\n    background-position: -10px 0;\n\n}\n\n.clippy-bottom-right .clippy-tip {\n    top: 0;\n    margin-top: -16px;\n    left: 0;\n    margin-left: 50px;\n    background-position: -10px -16px;\n}\n\n.clippy-bottom-left .clippy-tip {\n    top: 0;\n    margin-top: -16px;\n    left: 100%;\n    margin-left: -50px;\n    background-position: 0px -16px;\n}\n\n',{});var c={load:function(t){var e=t||{},i=e.name,n=e.successCb,o=e.failCb,r=e.selector;u[i]().then((function(t){var e=new l({agent:t,selector:r});n&&n(e)})).catch((function(t){o&&o(t)}))},agents:{}};export{c as default};
//# sourceMappingURL=index.js.map
