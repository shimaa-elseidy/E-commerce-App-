import './polyfills.server.mjs';
import{a as A}from"./chunk-JHEGYETZ.mjs";import{a as w}from"./chunk-CX6CO7AG.mjs";import"./chunk-E3EVZCWB.mjs";import{l as O}from"./chunk-GLGEAX7W.mjs";import{l as P,o as D}from"./chunk-OBCDUCAI.mjs";import{Cb as I,Hb as t,Ib as y,Jb as a,Ma as x,Ob as C,Qa as r,Ub as b,Wb as _,Y as m,aa as c,fb as h,hb as l,mb as g,nb as u,ob as v,pb as i,qb as e,rb as s,sb as S,tb as E,zb as f}from"./chunk-XICHFWCK.mjs";import"./chunk-VVCT4QZE.mjs";function N(d,p){if(d&1&&(i(0,"div",15),s(1,"img",18),i(2,"div",19)(3,"h4",5),t(4),e(),i(5,"p")(6,"strong",20),t(7,"Count:"),e(),t(8),e(),i(9,"p")(10,"strong",20),t(11,"Price:"),e(),t(12),e()()()),d&2){let n=p.$implicit;r(),I("alt",n.product.title),l("src",n.product.imageCover,x),r(3),y(n.product.title),r(4),a(" ",n.count,""),r(4),a(" ",n.price," EGP")}}function k(d,p){if(d&1&&(S(0),i(1,"div",2)(2,"h1",3),t(3,"Order Details"),e(),i(4,"div",4)(5,"p")(6,"strong",5),t(7,"Order Created At:"),e(),t(8),b(9,"date"),e()(),i(10,"div",6)(11,"div",7)(12,"h2",8),t(13,"User Information:"),e(),i(14,"p")(15,"strong",5),t(16,"Name:"),e(),t(17),e(),i(18,"p")(19,"strong",5),t(20,"Phone:"),e(),t(21),e()(),i(22,"div",9)(23,"h2",8),t(24,"Order Information:"),e(),i(25,"p")(26,"strong",5),t(27,"Order ID:"),e(),t(28),e(),i(29,"p")(30,"strong",5),t(31,"Payment Method:"),e(),t(32," Cash"),e(),i(33,"p")(34,"strong",5),t(35,"Payment Status:"),e(),i(36,"span",10),t(37,"Not Paid"),e()(),i(38,"p")(39,"strong",5),t(40,"Delivery Status:"),e(),i(41,"span",11),t(42,"Not Delivered"),e()(),i(43,"p")(44,"strong",5),t(45,"Total Order Price:"),e(),t(46),e()(),i(47,"div",12)(48,"h2",8),t(49,"Shipping Address:"),e(),i(50,"p")(51,"strong",5),t(52,"Details:"),e(),t(53),e(),i(54,"p")(55,"strong",5),t(56,"City:"),e(),t(57),e()()(),i(58,"div",13)(59,"h2",8),t(60,"Cart Items:"),e(),i(61,"div",14),u(62,N,13,5,"div",15,g),e(),i(64,"div",16)(65,"strong"),t(66,"Total Price:"),e(),t(67),e(),s(68,"hr"),i(69,"button",17),t(70,"Go To Home Page"),e()()(),E()),d&2){let n=f();r(8),a(" ",_(9,8,n.order.createdAt,"medium"),""),r(9),a(" ",n.order.user.name,""),r(4),a(" ",n.order.shippingAddress.phone,""),r(7),a(" ",n.order.id,""),r(18),a(" ",n.order.totalOrderPrice," EGP"),r(7),a(" ",n.order.shippingAddress.details,""),r(4),a(" ",n.order.shippingAddress.city,""),r(5),v(n.order.cartItems),r(5),a(" ",n.order.totalOrderPrice," EGP ")}}var R=(()=>{class d{constructor(){this._OrdersService=m(A),this._AuthServiceService=m(w),this.userId=null,this.orderList=[]}ngOnInit(){this.userId=this._AuthServiceService.saveUserToken(),this.ordersSub=this._OrdersService.getAllOrders(this.userId).subscribe({next:n=>{console.log(n),this.orderList=n,this.order=this.orderList[0]},error:n=>{console.log(n)}})}ngOnDestroy(){this.ordersSub?.unsubscribe()}static{this.\u0275fac=function(o){return new(o||d)}}static{this.\u0275cmp=c({type:d,selectors:[["app-cash-detail"]],standalone:!0,features:[C],decls:2,vars:1,consts:[[1,"order-section","bg-main-light","rounded-4","my-2","p-2","shadow"],[4,"ngIf"],[1,"container"],[1,"text-main","h2","text-center","my-3","fw-bold"],[1,"order-timestamp"],[1,"text-main","small","fw-semibold"],[1,"order-details","grid-container"],[1,"user-details","bg-main-light","rounded-4","my-2","p-2","shadow"],[1,"small","fw-semibold","text-center","text-main"],[1,"order-summary","bg-main-light","rounded-4","my-2","p-2","shadow"],[1,"status","unpaid"],[1,"status","not-delivered"],[1,"shipping-address","bg-main-light","rounded-4","my-2","p-2","shadow"],[1,"cart-items","bg-main-light","rounded-4","my-2","p-2","shadow"],[1,"row","flex-row"],[1,"col-md-4","cart-item","my-1"],[1,"total-price","text-main","text-center"],["routerLink","/home",1,"btn-main","mt-3","d-block","mx-auto"],[1,"w-25","my-1",3,"src","alt"],[1,"item-details"],[1,"text-main"]],template:function(o,T){o&1&&(i(0,"section",0),h(1,k,71,11,"ng-container",1),e()),o&2&&(r(),l("ngIf",T.order))},dependencies:[P,D,O]})}}return d})();export{R as CashDetailComponent};
