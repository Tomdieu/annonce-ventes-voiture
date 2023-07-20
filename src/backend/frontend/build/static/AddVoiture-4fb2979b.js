import{m as X,u as G,r as x,A as E,j as a,D as K,T as F,B as g,I as W,C as J,F as Q,c as Z,a as $,b as q,d as V,G as C,e as c,M as b,f as ee,g as w,h as te,i as ae,k as ne,l as k,n as le,o as oe,S as ie}from"./index-10d1eba3.js";import{R as re}from"./Restore-44624c40.js";function R(h){const f={length:h.length,item(d){return d>=0&&d<h.length?h[d]:null},[Symbol.iterator]:function*(){let d=0;for(;d<h.length;)yield h[d++]}};return h.forEach((d,_)=>{f[_]=d}),f}const se=X(h=>({imageContainer:{display:"flex",alignItems:"center",marginBottom:h.spacing(2)},previewImage:{width:100,height:100,marginRight:h.spacing(2),objectFit:"cover"}})),ce={annee:"",prix:"",description:"",num_chassi:"",km_parcouru:"",model:""},me=h=>{const{userToken:f}=G(),d=se(),[_,P]=x.useState([]),{open:M,onClose:T}=h,[s,B]=x.useState(null),[N,A]=x.useState(!1),[y,z]=x.useState(ce),[O,D]=x.useState([]),[j,L]=x.useState(0),[I,U]=x.useState([]);x.useEffect(()=>{if(s){const l=Array.from(s).map(n=>({url:URL.createObjectURL(n)}));D([...l]),console.log({_images:l}),console.log({images:s})}},[s]),x.useEffect(()=>{if(j){const i=I.find(l=>l.id===j);i&&P(i.modeles),console.log({marque_selectionner:i}),console.log(j),console.log(I),console.log(_)}},[j,I,_]),x.useEffect(()=>{f&&E.listMarque().then(i=>i.json()).then(i=>{console.log(i),U(i)}).catch(i=>console.log(i.message))},[f]);const Y=i=>{D(l=>{const n=[...l];return n.splice(i,1),n}),B(l=>{if(l===null)return null;const n=[...l];return n.splice(i,1),R(n)})},u=i=>{z({...y,[i.target.name]:i.target.value})},H=i=>{var l;i==null||i.preventDefault(),(l=document.getElementById("photos"))==null||l.click()};return a.jsxs(K,{fullScreen:!0,open:M,onClose:()=>T(!1),maxWidth:"lg",fullWidth:!0,TransitionComponent:F,children:[a.jsx(g,{sx:{m:2},children:a.jsx(W,{onClick:()=>T(!1),sx:{borderRadius:2},children:a.jsx(J,{})})}),a.jsx(Q,{initialValues:{annee:"",prix:"",description:"",num_chassi:0,km_parcouru:0,model:"",nombre_de_place:2,nombre_de_chevaux:0,couleur:"",type_carburant:"",type_vehicule:"",boite_vitesse:"",plaque_immatriculation:"",traction:""},validationSchema:Z,onSubmit:i=>console.log("xxx",i),children:({isValid:i,values:l,errors:n,touched:o,handleBlur:p,setFieldValue:m})=>a.jsxs($,{id:"form",method:"post",name:"voiture_form",encType:"multipart/form-data",onSubmit:e=>{e.preventDefault(),A(!0),console.log(e),console.log(y);const t=new FormData;for(const r in y)y.hasOwnProperty(r)&&t.append(r,y[r]);if(s)for(let r=0;r<s.length;r++)t.append("upload_photos",s[r],s[0].name);E.createVoiture(t,f).then(r=>r.json()).then(r=>console.log(r)).catch(r=>console.log(r)).finally(()=>{T(!1),A(!1)})},children:[a.jsx(q,{textAlign:"center",variant:"h4",children:"Ajouter Une Voiture"}),a.jsx(V,{}),a.jsxs(C,{sx:{display:"flex",justifyContent:"center",gap:5,flexDirection:"row",width:"100%",mt:5,p:5},container:!0,children:[a.jsxs(C,{md:5,sm:12,item:!0,sx:{display:"flex",gap:1,flexDirection:"column",alignItems:"flex-start"},children:[a.jsxs(g,{sx:{width:"100%",display:"flex",gap:1},children:[a.jsx(c,{id:"marque",select:!0,label:"Marque",value:j,onChange:e=>L(parseInt(e.target.value)),fullWidth:!0,children:I.map(e=>a.jsx(b,{value:e.id,children:e.nom},e.id))}),a.jsx(c,{id:"type-boite",select:!0,label:"Type de boîte",name:"boite_vitesse",value:l.boite_vitesse,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("boite_vitesse"),helperText:o.boite_vitesse&&n.boite_vitesse,error:!!(o.boite_vitesse&&n.boite_vitesse),fullWidth:!0,children:ee.map(e=>a.jsx(b,{value:e.value,children:e.label},e.value))})]}),a.jsxs(g,{sx:{width:"100%",display:"flex",gap:1},children:[a.jsx(c,{id:"annee",name:"annee",label:"Annee de sortie du vehicule",type:"number",fullWidth:!0,inputProps:{min:"1900",max:new Date().getFullYear()},variant:"outlined",sx:{fontSize:"28px"},onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("annee"),value:l.annee,helperText:o.annee&&n.annee,error:!!(o.annee&&n.annee)}),a.jsx(c,{id:"model",name:"model",label:"Modele du vehicule",type:"text",fullWidth:!0,variant:"outlined",sx:{fontSize:"28px"},select:!0,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("model"),value:l.model,helperText:o.model&&n.model,error:!!(o.model&&n.model),children:_.length>0&&_.map(e=>a.jsx(b,{value:e.id,children:e.nom},e.id))})]}),a.jsxs(g,{sx:{width:"100%",display:"flex",gap:1},children:[a.jsx(c,{label:"Nombre de chevaux",type:"number",name:"nombre_de_chevaux",value:l.nombre_de_chevaux,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("nombre_de_chevaux"),helperText:o.nombre_de_chevaux&&n.nombre_de_chevaux,error:!!(o.nombre_de_chevaux&&n.nombre_de_chevaux),fullWidth:!0}),a.jsx(c,{label:"Nombre de place",type:"number",name:"nombre_de_place",value:l.nombre_de_place,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("nombre_de_place"),helperText:o.nombre_de_place&&n.nombre_de_place,error:!!(o.nombre_de_place&&n.nombre_de_place),fullWidth:!0}),a.jsx(c,{id:"num_chassi",name:"num_chassi",placeholder:"Numeros chassi du vehicule",label:"Num Chassi",type:"text",fullWidth:!0,variant:"outlined",sx:{fontSize:"28px"},InputProps:{startAdornment:a.jsx(w,{position:"start",children:"#"})},onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("num_chassi"),value:l.num_chassi,helperText:o.num_chassi&&n.num_chassi?n.num_chassi:"example : 780578",error:!!(o.num_chassi&&n.num_chassi)})]}),a.jsxs(g,{sx:{width:"100%",display:"flex",gap:1},children:[a.jsx(c,{id:"carburant-type",select:!0,name:"type_carburant",label:"Type Carburant",value:l.type_carburant,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("type_carburant"),helperText:o.type_carburant&&n.type_carburant,error:!!(o.type_carburant&&n.type_carburant),fullWidth:!0,children:te.map(e=>a.jsx(b,{value:e.value,children:e.label},e.value))}),a.jsx(c,{id:"km_parcouru",name:"km_parcouru",label:"km_parcouru",placeholder:"km parcouru par le vehicule",type:"text",fullWidth:!0,variant:"outlined",sx:{fontSize:"28px"},InputProps:{endAdornment:a.jsx(w,{position:"end",children:"KM"})},onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("km_parcouru"),value:l.km_parcouru,helperText:o.km_parcouru&&n.km_parcouru?n.km_parcouru:"example : 5 km",error:!!(o.km_parcouru&&n.km_parcouru)})]}),a.jsxs(g,{sx:{width:"100%",display:"flex",gap:1},children:[a.jsx(c,{id:"vehicle-type",select:!0,label:"Vehicle Type",name:"type_vehicule",value:l.type_vehicule,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("type_vehicule"),helperText:o.type_vehicule&&n.type_vehicule,error:!!(o.type_vehicule&&n.type_vehicule),fullWidth:!0,children:ae.map(e=>a.jsx(b,{value:e.value,children:e.label},e.value))}),a.jsx(c,{id:"prix",name:"prix",label:"Prix du vehicule",type:"text",fullWidth:!0,variant:"outlined",InputProps:{startAdornment:a.jsx(w,{position:"start",children:"XAF"})},sx:{fontSize:"28px"},onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("prix"),value:l.prix,helperText:o.prix&&n.prix?n.prix:"2000000 XAF",error:!!(o.prix&&n.prix)})]}),a.jsxs(g,{sx:{width:"100%",display:"flex",gap:1},children:[a.jsx(c,{id:"vehicle-type",select:!0,label:"Vehicle Type",name:"traction",value:l.traction,onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("traction"),helperText:o.traction&&n.traction,error:!!(o.traction&&n.traction),fullWidth:!0,children:ne.map(e=>a.jsx(b,{value:e.value,children:e.label},e.value))}),a.jsx(c,{id:"plaque_immatriculation",name:"plaque_immatriculation",label:"# D'imatriculation du vehicule",type:"text",fullWidth:!0,variant:"outlined",sx:{fontSize:"28px"},onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("plaque_immatriculation"),value:l.plaque_immatriculation,helperText:o.plaque_immatriculation&&n.plaque_immatriculation,error:!!(o.plaque_immatriculation&&n.plaque_immatriculation)})]})]}),a.jsxs(C,{md:5,sm:12,item:!0,sx:{display:"flex",gap:1,flexDirection:"column"},children:[a.jsx(c,{id:"description",name:"description",label:"Description du vehicule",type:"text",multiline:!0,rows:4,fullWidth:!0,variant:"outlined",sx:{fontSize:"28px"},onChange:e=>{u(e),m(e.target.name,e.target.value,!0).then(t=>{console.log(t)}).catch(t=>console.log(t))},onBlur:p("description"),value:l.description,helperText:o.description&&n.description,error:!!(o.description&&n.description)}),a.jsxs(g,{sx:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},children:[a.jsx(k,{onClick:H,startIcon:a.jsx(le,{}),variant:"contained",sx:{backgroundColor:"#000",color:"#fff","&:hover ":{backgroundColor:"#000",color:"#fff",opacity:.5},width:"110px",borderRadius:2},children:"Images"}),a.jsx(q,{variant:"caption",color:"#f33f4e",children:s&&(s==null?void 0:s.length)<1&&"Selectionner au moin une(1) image"})]}),a.jsx("input",{style:{display:"none"},id:"photos",type:"file",name:"photos",accept:"image/*",multiple:!0,onChange:e=>{const t=e.target.files;B(r=>{const S=[];if(r)for(let v=0;v<(r==null?void 0:r.length);v++)S.push(r[v]);if(t)for(let v=0;v<(t==null?void 0:t.length);v++)S.push(t[v]);return R(S)})}}),a.jsx(C,{md:!0,spacing:2,sx:{display:"flex",gap:1,overflowX:"auto",width:"100%",maxWidth:"480px"},children:O.map((e,t)=>a.jsxs(C,{item:!0,className:d.imageContainer,sx:{position:"relative"},children:[a.jsx("img",{src:e.url,alt:"Preview",className:d.previewImage}),a.jsx(W,{"aria-label":"Remove",color:"error",style:{position:"absolute",top:5,right:5},onClick:()=>Y(t),children:a.jsx(oe,{style:{width:16,height:16}})})]},t))}),a.jsxs(g,{width:"100%",justifyContent:"space-between",display:"flex",gap:5,p:1,children:[a.jsx(k,{onClick:()=>T(!1),color:"error",variant:"contained",startIcon:a.jsx(re,{}),type:"reset",children:"Reset"}),a.jsx(k,{disabled:i&&!!(s&&(s==null?void 0:s.length)<=1)||N,type:"submit",variant:"contained",endIcon:a.jsx(ie,{}),children:"Ajouter"})]})]})]})]})})]})};export{me as default};
