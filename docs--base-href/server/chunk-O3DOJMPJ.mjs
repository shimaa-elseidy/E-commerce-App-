import './polyfills.server.mjs';
import{a as w}from"./chunk-JHEGYETZ.mjs";import{a as S,b as f,c as E,d as O,f as I,g as T,h as N,j as D,l as q}from"./chunk-LONSOCWI.mjs";import"./chunk-E3EVZCWB.mjs";import{h as b}from"./chunk-GLGEAX7W.mjs";import{l as F}from"./chunk-OBCDUCAI.mjs";import{Hb as m,Ob as y,Qa as l,Y as v,aa as C,fb as s,hb as d,lb as g,pb as o,qb as r,rb as h,yb as x,zb as p}from"./chunk-XICHFWCK.mjs";import"./chunk-VVCT4QZE.mjs";function R(e,a){e&1&&(o(0,"div"),m(1,"Details is required."),r())}function A(e,a){e&1&&(o(0,"div"),m(1,"details must be more than 10 char."),r())}function G(e,a){if(e&1&&(o(0,"div",6),s(1,R,2,0,"div",13)(2,A,2,0,"div",13),r()),e&2){let t,i,n=p(2);l(),d("ngIf",(t=n.ordersForm.get("details"))==null?null:t.hasError),l(),d("ngIf",(i=n.ordersForm.get("details"))==null?null:i.hasError("minlength"))}}function M(e,a){if(e&1&&s(0,G,3,2,"div",12),e&2){let t,i=p();d("ngIf",(t=i.ordersForm.get("details"))==null?null:t.invalid)}}function B(e,a){e&1&&(o(0,"div"),m(1,"Phone number is required."),r())}function V(e,a){e&1&&(o(0,"div"),m(1,"Enter valid phone."),r())}function k(e,a){if(e&1&&(o(0,"div",6),s(1,B,2,0,"div",13)(2,V,2,0,"div",13),r()),e&2){let t,i,n=p(2);l(),d("ngIf",(t=n.ordersForm.get("phone"))==null?null:t.hasError("required")),l(),d("ngIf",(i=n.ordersForm.get("phone"))==null?null:i.hasError)}}function L(e,a){if(e&1&&s(0,k,3,2,"div",12),e&2){let t,i=p();d("ngIf",(t=i.ordersForm.get("phone"))==null?null:t.invalid)}}function P(e,a){e&1&&(o(0,"div"),m(1,"City is required."),r())}function j(e,a){if(e&1&&(o(0,"div",6),s(1,P,2,0,"div",13),r()),e&2){let t,i=p(2);l(),d("ngIf",(t=i.ordersForm.get("city"))==null?null:t.hasError)}}function $(e,a){if(e&1&&s(0,j,2,1,"div",12),e&2){let t,i=p();d("ngIf",(t=i.ordersForm.get("city"))==null?null:t.invalid)}}var ee=(()=>{class e{constructor(){this._FormBuilder=v(D),this._ActivatedRoute=v(b),this._OrdersService=v(w),this.cartId="",this.ordersForm=this._FormBuilder.group({details:[null,[f.required,f.minLength(10)]],phone:[null,[f.required,f.pattern(/^01[0125][0-9]{8}$/)]],city:[null,[f.required]]})}ngOnInit(){this._ActivatedRoute.paramMap.subscribe({next:t=>{this.cartId=t.get("id"),console.log(this.cartId)}})}onSubmit(){this.ordersForm.valid&&(console.log(this.ordersForm.value),this.ordersSub=this._OrdersService.checkout(this.cartId,this.ordersForm.value).subscribe({next:t=>{console.log(t),t.status=="success"&&window.open(t.session.url,"_self")}}))}ngOnDestroy(){this.ordersSub?.unsubscribe()}static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=C({type:e,selectors:[["app-orders"]],standalone:!0,features:[y],decls:22,vars:5,consts:[[1,"h2","text-center","my-2","text-main","fw-bold"],[1,"container"],[1,"bg-main-light","shadow","rounded-4","my-2","p-2",3,"ngSubmit","formGroup"],[1,"form-group"],["for","details",1,"ms-2"],["id","details","formControlName","details",1,"form-control","rounded-5"],[1,"text-danger"],["for","phone",1,"ms-2"],["id","phone","formControlName","phone",1,"form-control","rounded-5"],["for","city",1,"ms-2"],["id","city","formControlName","city",1,"form-control","rounded-5"],["type","submit",1,"btn","my-3","btn-outline-success","rounded-5",3,"disabled"],["class","text-danger",4,"ngIf"],[4,"ngIf"]],template:function(i,n){if(i&1&&(o(0,"section")(1,"h1",0),m(2,"Order Details"),r(),o(3,"div",1)(4,"form",2),x("ngSubmit",function(){return n.onSubmit()}),o(5,"div",3)(6,"label",4),m(7,"Details:"),r(),h(8,"textarea",5),s(9,M,1,1,"div",6),r(),o(10,"div",3)(11,"label",7),m(12,"Phone Number:"),r(),h(13,"input",8),s(14,L,1,1,"div",6),r(),o(15,"div",3)(16,"label",9),m(17,"City:"),r(),h(18,"input",10),s(19,$,1,1,"div",6),r(),o(20,"button",11),m(21,"Confirm Order"),r()()()()),i&2){let u,_,c;l(4),d("formGroup",n.ordersForm),l(5),g(9,(u=n.ordersForm.get("details"))!=null&&u.errors&&((u=n.ordersForm.get("details"))!=null&&u.touched)&&((u=n.ordersForm.get("details"))!=null&&u.dirty)?9:-1),l(5),g(14,(_=n.ordersForm.get("phone"))!=null&&_.errors&&((_=n.ordersForm.get("phone"))!=null&&_.touched)&&((_=n.ordersForm.get("phone"))!=null&&_.dirty)?14:-1),l(5),g(19,(c=n.ordersForm.get("city"))!=null&&c.errors&&((c=n.ordersForm.get("city"))!=null&&c.touched)&&((c=n.ordersForm.get("city"))!=null&&c.dirty)?19:-1),l(),d("disabled",n.ordersForm.invalid)}},dependencies:[q,I,S,E,O,T,N,F]})}}return e})();export{ee as OrdersComponent};
