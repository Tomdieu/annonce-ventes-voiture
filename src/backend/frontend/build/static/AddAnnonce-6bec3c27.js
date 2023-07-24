import{p as R,j as e,q as _,s as S,t as b,_ as I,m as U,r as d,u as K,A as D,R as Y,D as Z,T as Q,B as x,I as ee,F as te,a as oe,b as ie,G as v,P as w,e as p,M as ne,g as ae,v as se,l as A,S as re,w as le,x as ce,N as de,y as ue,z as pe,C as z}from"./index-f68b7882.js";import{C as ge,R as xe}from"./Restore-84a2913a.js";const me=R(e.jsx("path",{d:"M22 13c.55 0 1-.45 1-1s-.45-1-1-1h-1.06c-.46-4.17-3.77-7.48-7.94-7.94V2c0-.55-.45-1-1-1s-1 .45-1 1v1.06c-.98.11-1.91.38-2.77.78l1.53 1.53C10.46 5.13 11.22 5 12 5c3.87 0 7 3.13 7 7 0 .79-.13 1.54-.37 2.24l1.53 1.53c.4-.86.67-1.79.78-2.77H22zm-1.56 5.88L5.12 3.56a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L5.04 6.3C3.97 7.62 3.26 9.23 3.06 11H2c-.55 0-1 .45-1 1s.45 1 1 1h1.06c.46 4.17 3.77 7.48 7.94 7.94V22c0 .55.45 1 1 1s1-.45 1-1v-1.06c1.77-.2 3.38-.91 4.69-1.98l1.33 1.33c.39.39 1.02.39 1.41 0 .4-.39.4-1.02.01-1.41zM12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81C15.09 18.45 13.61 19 12 19z"}),"LocationDisabledRounded"),he=R(e.jsx("path",{d:"M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V2c0-.55-.45-1-1-1s-1 .45-1 1v1.06C6.83 3.52 3.52 6.83 3.06 11H2c-.55 0-1 .45-1 1s.45 1 1 1h1.06c.46 4.17 3.77 7.48 7.94 7.94V22c0 .55.45 1 1 1s1-.45 1-1v-1.06c4.17-.46 7.48-3.77 7.94-7.94H22c.55 0 1-.45 1-1s-.45-1-1-1h-1.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}),"MyLocationRounded"),fe=_().shape({titre:S().required("Le Titre de l'annonce est obligatoire"),description:S().required("La description est obligatoire"),prix:b().min(1e5,"Le prix doit être supérieur à "+I(1e5,{space:!0})+" XAF").max(1e10,"Le prix max c'est "+I(1e10,{space:!0})+" XAF").required("La prix est obligatoire"),voiture:b().required("La Voiture est obligatoire. selectionner au moin une"),latitude:b(),longitude:b(),address:S().required("L'address est obligatoire")}),be=U(()=>({dialog:{"&  .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthLg.MuiDialog-paperFullWidth.MuiDialog-paperFullScreen.css-m9glnp-MuiPaper-root-MuiDialog-paper":{backgroundColor:"#e2fefe"}}})),je={width:500,height:400,latitude:0,longitude:0,zoom:3},ve=k=>{const{open:B,onClose:j,onCreate:W}=k,F=!0,P=be(),V="lg",C=d.useRef(),{userToken:m}=K(),[i,g]=d.useState({longitude:0,latitude:0,zoom:2}),[y,q]=d.useState([]),[L,h]=d.useState(""),[E,N]=d.useState([]),G=()=>{j(!1),h(""),g({longitude:0,latitude:0,zoom:2})};d.useEffect(()=>{var n;i.latitude!==0&&i.longitude!==0&&((n=C.current)==null||n.flyTo({center:[i.longitude,i.latitude],duration:500,zoom:14}))},[i]),d.useEffect(()=>{m&&D.listVoiture(m).then(n=>n.json()).then(n=>q(n)).catch(n=>console.log(n))},[m]);const $=async n=>{if(h(n),n)try{if(n.length>=3){const c=(await z.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${n}&limit=5&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`)).data.features.map(t=>({label:t.properties.formatted,latitude:t.properties.lat,longitude:t.properties.lon}));N(c)}}catch(s){console.error(s)}else g({longitude:0,latitude:0,zoom:2})};d.useEffect(()=>{if(i&&i.latitude!==0&&i.longitude!==0){const{longitude:n,latitude:s}=i;(async()=>{try{const t=await z.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${s}&lon=${n}&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`),{formatted:a}=t.data.features[0].properties;h(a)}catch(t){console.error(t)}})().catch(t=>console.log(t))}},[i]);const[f,M]=Y.useState(!1),H=()=>{M(!0)};return e.jsxs(Z,{fullScreen:!0,open:B,onClose:G,TransitionComponent:Q,fullWidth:F,maxWidth:V,className:P.dialog,children:[e.jsx(x,{sx:{m:2},children:e.jsx(ee,{onClick:()=>j(!1),sx:{borderRadius:2},children:e.jsx(ge,{})})}),e.jsx(te,{initialValues:{titre:"",description:"",prix:0,voiture:"",latitude:0,longitude:0,address:""},validationSchema:fe,onSubmit:console.log,children:({values:n,handleChange:s,handleBlur:c,errors:t,touched:a,isValid:J,handleReset:O})=>e.jsxs(oe,{method:"post",onSubmit:o=>{o.preventDefault();const r=new FormData(o.currentTarget),u={};for(const[l,T]of r.entries())l==="prix"?u[l]=parseInt(T.toString()):u[l]=T;u.latitude=i.latitude,u.longitude=i.longitude;const X=JSON.stringify(u);D.createAnnonce(X,m).then(l=>l.json()).then(l=>{console.log(l),W(l),O(o)}).catch(l=>{console.log(l.message),console.log(l)}).finally(()=>j(!1))},children:[e.jsx(ie,{variant:"h2",textAlign:"center",sx:{fontSize:"3rem"},children:"Cree une annonce"}),e.jsxs(v,{sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:5,flexDirection:"row",width:"100%",mt:5},container:!0,p:3,children:[e.jsxs(v,{md:5,sm:12,xs:12,item:!0,sx:{display:"flex",gap:1,flexDirection:"column",alignItems:"flex-start"},component:w,p:1,children:[e.jsx(p,{label:"Titre",name:"titre",value:n.titre,onChange:s("titre"),onBlur:c("titre"),error:!!(a.titre&&t.titre),helperText:a.titre&&t.titre.toString(),fullWidth:!0}),e.jsx(p,{label:"Voiture",name:"voiture",value:n.voiture,onChange:s("voiture"),onBlur:c("voiture"),error:!!(a.voiture&&t.voiture),helperText:a.voiture&&t.voiture.toString(),fullWidth:!0,select:!0,children:y==null?void 0:y.map(o=>{var r;return e.jsxs(ne,{value:o.id,children:[(r=o.model.marque)==null?void 0:r.nom," ",o.model.nom," ",o.type_carburant," ",o.annee]},o.id)})}),e.jsx(p,{label:"Prix",InputProps:{startAdornment:e.jsx(ae,{position:"start",children:"XAF"})},name:"prix",type:"number",value:n.prix,onChange:s("prix"),onBlur:c("prix"),error:!!(a.prix&&t.prix),helperText:a.prix&&t.prix.toString(),fullWidth:!0}),e.jsx(p,{label:"Description",multiline:!0,rows:4,name:"description",value:n.description,onChange:s("description"),onBlur:c("description"),error:!!(a.description&&t.description),helperText:a.description&&t.description.toString(),fullWidth:!0}),e.jsx(se,{freeSolo:!0,options:E,getOptionLabel:o=>o.label,inputValue:L,onInputChange:(o,r)=>{$(r).catch(u=>console.log(u))},onChange:(o,r)=>{h(r?r.label:""),g({...i,longitude:r.longitude,latitude:r.latitude})},fullWidth:!0,renderInput:o=>e.jsx(p,{...o,name:"address",label:"Address",variant:"outlined"})}),e.jsxs(x,{style:{width:"100%",display:"flex",gap:5},children:[e.jsx(p,{label:"Latitude",name:"latitude",value:i.latitude,disabled:!0,fullWidth:!0,onChange:s("latitude"),onBlur:c("latitude"),error:!!(a.latitude&&t.latitude),helperText:!!a.latitude&&t.latitude.toString()}),e.jsx(p,{label:"Longitude",name:"longitude",value:i.longitude,disabled:!0,fullWidth:!0,onChange:s("longitude"),onBlur:c("longitude"),error:!!(a.longitude&&t.longitude),helperText:a.longitude&&t.longitude.toString()})]}),e.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:[e.jsx(A,{startIcon:e.jsx(xe,{}),size:"large",color:"error",variant:"contained",type:"reset",children:"Renitailiser"}),e.jsx(A,{startIcon:e.jsx(re,{}),size:"large",color:"success",variant:"contained",type:"submit",disabled:!J&&L===""||i.latitude===0||i.longitude===0,children:"Cree"})]})]}),e.jsxs(v,{md:5,sm:12,xs:12,item:!0,component:w,sx:{position:"relative"},children:[e.jsx(x,{sx:{position:"absolute",top:8,left:8,zIndex:999},children:e.jsx(le,{sx:{borderRadius:2},onClick:()=>M(!f),children:e.jsx(x,{sx:{p:1,borderRadius:2,backgroundColor:"rgba(255,255,255,1)",border:"1px solid #ddd"},children:f?e.jsx(he,{}):e.jsx(me,{})})})}),e.jsxs(ce,{ref:C,initialViewState:je,style:{width:"100%",height:500},mapStyle:"mapbox://styles/mapbox/streets-v9",mapboxAccessToken:"pk.eyJ1IjoiaXZhbnRvbSIsImEiOiJjbDJnMGlwNnYwZm9zM2duYnQ0a3c2bXFvIn0.x29uaFl79xgLW6nCs15JWw",children:[e.jsx(de,{}),e.jsx(ue,{positionOptions:{enableHighAccuracy:!0},trackUserLocation:f,showUserLocation:f,onGeolocate:o=>{H(),g({...i,longitude:o.coords.longitude,latitude:o.coords.latitude})}}),e.jsx(pe,{onDragEnd:o=>g({...i,latitude:o.lngLat.lat,longitude:o.lngLat.lng}),draggable:!0,longitude:i.longitude,latitude:i.latitude,anchor:"bottom"})]})]})]})]})})]})};export{ve as default};
