(this["webpackJsonproad-runners"]=this["webpackJsonproad-runners"]||[]).push([[0],{13:function(e,t,l){},14:function(e,t,l){},15:function(e,t,l){"use strict";l.r(t);var o=l(0),n=l.n(o),r=l(7),a=l.n(r),i=(l(13),l(1)),s=l(2),c=l(4),y=l(3),m=l(5),p=(l(14),[{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#000000"},{saturation:35},{lightness:40},{visibility:"off"}]},{elementType:"labels.text.stroke",stylers:[{color:"#000000"},{lightness:15},{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:15},{weight:1}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"},{weight:2}]},{featureType:"administrative.country",elementType:"labels.text.stroke",stylers:[{weight:2}]},{featureType:"administrative.province",elementType:"geometry.fill",stylers:[{weight:1}]},{featureType:"administrative.province",elementType:"geometry.stroke",stylers:[{color:"#ffc107"},{visibility:"on"},{weight:1}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"landscape",elementType:"labels.text.fill",stylers:[{color:"#000040"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#0080ff"},{visibility:"on"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:30},{visibility:"on"},{weight:2}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#004b97"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"transit.line",elementType:"geometry.fill",stylers:[{color:"#95004a"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:15}]}]),u={path:"M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm379.5 27.5l-123-123c-4.7-4.7-12.3-4.7-17 0l-123 123c-7.6 7.6-2.2 20.5 8.5 20.5h246c10.7 0 16.1-12.9 8.5-20.5z",fillColor:"white",strokeColor:"white",strokeWeight:5,anchor:new window.google.maps.Point(25,25),scale:.1};window.google=window.google||{};var d={width:"100vw",height:"100vh"},g=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(y.a)(t).call(this,{}))).state={speed:0},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t={lat:48.83238,lng:2.234953},l=new window.google.maps.Map(document.getElementById("map"),{center:t,mapTypeId:"roadmap",zoom:18,disableDefaultUI:!0,styles:p}),o=new window.google.maps.Marker({position:t,icon:u,fillColor:"White",map:l});navigator.geolocation&&navigator.geolocation.watchPosition((function(t){o.setPosition({lat:t.coords.latitude,lng:t.coords.longitude}),l.panTo({lat:t.coords.latitude,lng:t.coords.longitude}),e.setState({speed:t.coords.speed})}),(function(){alert("Failed to pan to new position!!!")}),{enableHighAccuracy:!0,maximumAge:0,timeout:1e3})}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{id:"map",style:d}),n.a.createElement("div",null,n.a.createElement("h2",null,this.state.speed?3.6*this.state.speed:"NA")))}}]),t}(o.Component),h=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App grid-container"},n.a.createElement("div",{className:"menu"},n.a.createElement("h5",null,"Menu")),n.a.createElement("div",{className:"header"},n.a.createElement("h4",null,"Header")),n.a.createElement("div",{className:"content"},n.a.createElement("h4",null,"Contents"),n.a.createElement(g,null)),n.a.createElement("div",{className:"footer"},n.a.createElement("h5",null,"footer")))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(n.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,l){e.exports=l(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.fd9c908e.chunk.js.map