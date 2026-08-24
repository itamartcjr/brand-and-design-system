const app=document.getElementById('app');

const esc=(value='')=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const params=()=>new URLSearchParams(location.search);
const isPart=()=>Boolean(params().get('part'));
const isMotion=()=>params().get('page')==='motion';
let scheduled=false;

function sectionByTitle(title){
  return [...app.querySelectorAll(':scope > .doc-section')].find(section=>section.querySelector('.doc-section-head h2')?.textContent.trim()===title)||null;
}

function readTechTokens(){
  const tech=sectionByTitle('Informações técnicas');
  if(!tech)return [];
  return [...tech.querySelectorAll('.tech-row')].map(row=>{
    const cells=row.children;
    return {token:cells[0]?.textContent.trim()||'',value:cells[1]?.textContent.trim()||'',usage:cells[2]?.textContent.trim()||''};
  }).filter(item=>item.token);
}

function slug(value='component'){
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'component';
}

function className(value='Component'){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,' ').trim().split(/\s+/).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join('')||'Component';
}

function cssTokenName(token){return `--${token.replace(/[^a-zA-Z0-9-]+/g,'-')}`;}
function tokenValue(tokens,fragment,fallback){return tokens.find(item=>item.token.toLowerCase().includes(fragment.toLowerCase()))?.value||fallback;}
function tokenPrelude(tokens){
  if(!tokens.length)return '';
  return `/* Tokens documentados nesta página */\n:root {\n${tokens.map(item=>`  ${cssTokenName(item.token)}: ${item.value};`).join('\n')}\n}\n\n`;
}
function tokenObjects(title,tokens){
  const name=className(title);
  const rows=tokens.length?tokens:[{token:`${slug(title)}.default`,value:'project-token'}];
  return {
    rn:`export const ${name}Tokens = {\n${rows.map(item=>`  '${item.token}': '${String(item.value).replace(/'/g,"\\'")}',`).join('\n')}\n};`,
    flutter:`class ${name}Tokens {\n  static const Map<String, String> values = {\n${rows.map(item=>`    '${item.token}': '${String(item.value).replace(/'/g,"\\'")}',`).join('\n')}\n  };\n}`
  };
}

function foundationSnippets(title,tokens){
  const key=slug(title),objects=tokenObjects(title,tokens);
  const cssVars=tokenPrelude(tokens);
  const map={
    'layout-grid':{
      css:`${cssVars}.layout-grid {\n  width: min(1280px, calc(100% - 160px));\n  margin-inline: auto;\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: 24px;\n}\n@media (max-width: 1024px) { .layout-grid { width: calc(100% - 64px); grid-template-columns: repeat(8,1fr); } }\n@media (max-width: 600px) { .layout-grid { width: calc(100% - 32px); grid-template-columns: repeat(4,1fr); gap: 16px; } }`,
      rn:`import { StyleSheet, useWindowDimensions, View } from 'react-native';\n\nexport function Grid({children}) {\n  const {width}=useWindowDimensions();\n  const columns=width>=1024?12:width>=600?8:4;\n  const margin=width>=1024?80:width>=600?32:16;\n  return <View style={[styles.grid,{paddingHorizontal:margin}]}>{children({columns})}</View>;\n}\nconst styles=StyleSheet.create({grid:{width:'100%',gap:24}});`,
      flutter:`import 'package:flutter/material.dart';\n\nclass ResponsiveGrid extends StatelessWidget {\n  const ResponsiveGrid({super.key, required this.builder});\n  final Widget Function(BuildContext context, int columns) builder;\n  @override Widget build(BuildContext context) => LayoutBuilder(builder: (context, box) {\n    final columns=box.maxWidth>=1024?12:box.maxWidth>=600?8:4;\n    final margin=box.maxWidth>=1024?80.0:box.maxWidth>=600?32.0:16.0;\n    return Padding(padding: EdgeInsets.symmetric(horizontal: margin), child: builder(context, columns));\n  });\n}`
    },
    'sizes-spacing':{
      css:`${cssVars}.stack { display:flex; flex-direction:column; gap:var(--space-6,24px); }\n.cluster { display:flex; flex-wrap:wrap; gap:var(--space-4,16px); }\n.card { padding:var(--space-6,24px); }`,
      rn:`${objects.rn}\n\nexport const spacing={xs:4,sm:8,md:16,lg:24,xl:32};\n// <View style={{padding:spacing.lg,gap:spacing.md}} />`,
      flutter:`${objects.flutter}\n\nabstract final class Space {\n  static const xs=4.0, sm=8.0, md=16.0, lg=24.0, xl=32.0;\n}\n// Padding(padding: const EdgeInsets.all(Space.lg), child: ...)`
    },
    typography:{
      css:`${cssVars}.display { font-size:clamp(48px,6vw,64px); line-height:1.06; font-weight:700; letter-spacing:-.04em; }\n.h1 { font-size:clamp(36px,5vw,48px); line-height:1.16; font-weight:700; }\n.body { font-size:16px; line-height:1.5; font-weight:400; }`,
      rn:`import { StyleSheet } from 'react-native';\n${objects.rn}\nexport const type=StyleSheet.create({display:{fontSize:64,lineHeight:68,fontWeight:'700'},h1:{fontSize:48,lineHeight:56,fontWeight:'700'},body:{fontSize:16,lineHeight:24,fontWeight:'400'}});`,
      flutter:`import 'package:flutter/material.dart';\n${objects.flutter}\nconst appTextTheme=TextTheme(displayLarge:TextStyle(fontSize:64,height:68/64,fontWeight:FontWeight.w700),headlineLarge:TextStyle(fontSize:48,height:56/48,fontWeight:FontWeight.w700),bodyMedium:TextStyle(fontSize:16,height:1.5));`
    },
    colours:{
      css:`${cssVars}.surface { background:var(--color-background-canvas,#f3f4f6); color:var(--color-text-primary,#20242b); }\n.action { background:var(--color-action-primary,#536dfe); color:#fff; }\n.status-success { color:var(--color-success,#22a06b); }`,
      rn:`${objects.rn}\nexport const colors={action:'#536DFE',text:'#20242B',canvas:'#F3F4F6',success:'#22A06B',error:'#E24B4A'};`,
      flutter:`import 'package:flutter/material.dart';\n${objects.flutter}\nabstract final class AppColors { static const action=Color(0xFF536DFE), text=Color(0xFF20242B), canvas=Color(0xFFF3F4F6), success=Color(0xFF22A06B), error=Color(0xFFE24B4A); }`
    },
    icons:{
      css:`${cssVars}.icon { width:24px; height:24px; display:inline-block; flex:none; }\n.icon--sm { width:16px; height:16px; }\n.icon--lg { width:48px; height:48px; }\n.icon svg { width:100%; height:100%; stroke:currentColor; stroke-width:1.5; }`,
      rn:`import { Text } from 'react-native';\nexport function Icon({glyph='＋',size=24,label}) { return <Text accessibilityLabel={label} accessible={Boolean(label)} style={{fontSize:size,width:size,height:size}}>{glyph}</Text>; }`,
      flutter:`import 'package:flutter/material.dart';\nclass AppIcon extends StatelessWidget { const AppIcon(this.icon,{super.key,this.size=24,this.label}); final IconData icon; final double size; final String? label; @override Widget build(BuildContext context)=>Semantics(label:label,child:Icon(icon,size:size)); }`
    },
    effects:{
      css:`${cssVars}.surface-raised { border-radius:20px; box-shadow:0 16px 40px rgba(15,23,42,.14); }\n.overlay { background:rgba(15,23,42,.44); backdrop-filter:blur(4px); }`,
      rn:`import { StyleSheet } from 'react-native';\nexport const effects=StyleSheet.create({raised:{borderRadius:20,shadowColor:'#0F172A',shadowOpacity:.14,shadowRadius:20,shadowOffset:{width:0,height:8},elevation:8}});`,
      flutter:`import 'package:flutter/material.dart';\nconst raisedDecoration=BoxDecoration(borderRadius:BorderRadius.all(Radius.circular(20)),boxShadow:[BoxShadow(color:Color(0x240F172A),blurRadius:40,offset:Offset(0,16))]);`
    }
  };
  return map[key]||null;
}

function identitySnippets(title,tokens){
  const key=slug(title),objects=tokenObjects(title,tokens),cssVars=tokenPrelude(tokens);
  const map={
    logo:{
      css:`${cssVars}.brand-logo { display:block; width:auto; height:32px; object-fit:contain; }\n.brand-logo--mark { width:32px; height:32px; }\n@media (max-width:600px) { .brand-logo { height:24px; } }`,
      rn:`import { Image } from 'react-native';\nexport function BrandLogo(){ return <Image source={require('./brand-logo.png')} resizeMode="contain" style={{width:160,height:32}} accessibilityLabel="Marca" />; }`,
      flutter:`import 'package:flutter/material.dart';\nclass BrandLogo extends StatelessWidget { const BrandLogo({super.key}); @override Widget build(BuildContext context)=>Image.asset('assets/brand-logo.png',height:32,fit:BoxFit.contain,semanticLabel:'Marca'); }`
    },
    illustrations:{
      css:`${cssVars}.illustration { width:min(240px,100%); height:auto; display:block; }\n.illustration[aria-hidden="true"] { pointer-events:none; user-select:none; }`,
      rn:`import { Image } from 'react-native';\nexport function Illustration({source,decorative=false}){ return <Image source={source} resizeMode="contain" accessible={!decorative} accessibilityLabel={decorative?undefined:'Ilustração'} style={{width:240,height:240}} />; }`,
      flutter:`import 'package:flutter/material.dart';\nclass Illustration extends StatelessWidget { const Illustration(this.asset,{super.key,this.semanticLabel}); final String asset; final String? semanticLabel; @override Widget build(BuildContext context)=>Image.asset(asset,width:240,height:240,fit:BoxFit.contain,semanticLabel:semanticLabel); }`
    },
    avatars:{
      css:`${cssVars}.avatar { width:40px; height:40px; display:grid; place-items:center; overflow:hidden; border-radius:50%; background:#20242b; color:#fff; font-weight:700; }\n.avatar img { width:100%; height:100%; object-fit:cover; }`,
      rn:`import { Image, StyleSheet, Text, View } from 'react-native';\nexport function Avatar({uri,initials='AB'}){ return <View style={styles.avatar}>{uri?<Image source={{uri}} style={StyleSheet.absoluteFill}/>:<Text style={styles.text}>{initials}</Text>}</View>; }\nconst styles=StyleSheet.create({avatar:{width:40,height:40,borderRadius:20,overflow:'hidden',alignItems:'center',justifyContent:'center',backgroundColor:'#20242B'},text:{color:'#fff',fontWeight:'700'}});`,
      flutter:`import 'package:flutter/material.dart';\nCircleAvatar(radius:20,backgroundColor:const Color(0xFF20242B),foregroundImage:imageUrl==null?null:NetworkImage(imageUrl!),child:imageUrl==null?Text(initials):null)`
    }
  };
  return map[key]||null;
}

function componentSnippets(title,tokens){
  const key=slug(title),cssVars=tokenPrelude(tokens);
  const buttonHeight=tokenValue(tokens,'height.md','40px');
  const radius=tokenValue(tokens,'radius','8px');
  const map={
    buttons:{
      css:`${cssVars}.button { min-height:${buttonHeight}; padding:0 16px; display:inline-flex; align-items:center; justify-content:center; gap:8px; border:1px solid transparent; border-radius:${radius}; font:inherit; font-weight:700; cursor:pointer; transition:transform 160ms cubic-bezier(.2,0,0,1),background 160ms cubic-bezier(.2,0,0,1),box-shadow 240ms cubic-bezier(.2,0,0,1); }\n.button--primary { background:#536DFE; color:#fff; }\n.button--primary:hover { background:#3D55E8; }\n.button:active { transform:scale(.98); }\n.button:focus-visible { outline:2px solid #536DFE; outline-offset:2px; }\n.button:disabled { opacity:.45; cursor:not-allowed; transform:none; }`,
      rn:`import { Pressable, StyleSheet, Text } from 'react-native';\nexport function Button({label,onPress,disabled=false}){ return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({pressed})=>[styles.button,pressed&&styles.pressed,disabled&&styles.disabled]}><Text style={styles.label}>{label}</Text></Pressable>; }\nconst styles=StyleSheet.create({button:{minHeight:40,paddingHorizontal:16,borderRadius:8,alignItems:'center',justifyContent:'center',backgroundColor:'#536DFE'},label:{color:'#fff',fontWeight:'700'},pressed:{transform:[{scale:.98}],backgroundColor:'#3D55E8'},disabled:{opacity:.45}});`,
      flutter:`import 'package:flutter/material.dart';\nclass PrimaryButton extends StatelessWidget { const PrimaryButton({super.key,required this.label,this.onPressed}); final String label; final VoidCallback? onPressed; @override Widget build(BuildContext context)=>FilledButton(style:FilledButton.styleFrom(minimumSize:const Size(0,40),padding:const EdgeInsets.symmetric(horizontal:16),shape:RoundedRectangleBorder(borderRadius:BorderRadius.circular(8))),onPressed:onPressed,child:Text(label)); }`
    },
    'icon-buttons':{
      css:`${cssVars}.icon-button { width:40px; height:40px; display:grid; place-items:center; border:1px solid #DDE1E7; border-radius:50%; background:#fff; color:#20242B; cursor:pointer; transition:transform 160ms cubic-bezier(.2,0,0,1),background 160ms ease; }\n.icon-button:hover { background:#F5F6F8; } .icon-button:active { transform:scale(.96); } .icon-button:focus-visible { outline:2px solid #536DFE; outline-offset:2px; }`,
      rn:`import { Pressable, StyleSheet, Text } from 'react-native';\nexport function IconButton({icon='＋',label,onPress}){ return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({pressed})=>[styles.root,pressed&&styles.pressed]}><Text style={styles.icon}>{icon}</Text></Pressable>; }\nconst styles=StyleSheet.create({root:{width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#F5F6F8'},pressed:{transform:[{scale:.96}]},icon:{fontSize:20}});`,
      flutter:`IconButton(icon:const Icon(Icons.add,size:20),tooltip:'Adicionar',onPressed:(){},style:IconButton.styleFrom(minimumSize:const Size(40,40),shape:const CircleBorder()))`
    },
    'selection-controls':{
      css:`${cssVars}.control { display:flex; align-items:center; gap:10px; }\n.control input { width:20px; height:20px; accent-color:#536DFE; }\n.switch { appearance:none; width:40px!important; height:24px!important; border-radius:999px; background:#C5CCD4; position:relative; transition:background 160ms ease; }\n.switch::after { content:''; position:absolute; width:18px; height:18px; top:3px; left:3px; border-radius:50%; background:#fff; transition:transform 160ms ease; }\n.switch:checked { background:#536DFE; } .switch:checked::after { transform:translateX(16px); }`,
      rn:`import { Switch, Text, View } from 'react-native';\nexport function ToggleRow({value,onChange}){ return <View style={{flexDirection:'row',alignItems:'center',gap:10}}><Switch value={value} onValueChange={onChange} trackColor={{false:'#C5CCD4',true:'#536DFE'}}/><Text>Notificações</Text></View>; }`,
      flutter:`Row(children:[Switch(value:enabled,onChanged:(value)=>setState(()=>enabled=value)),const SizedBox(width:10),const Text('Notificações')])\n// Para seleção múltipla: Checkbox(value:checked,onChanged:...)`
    },
    slider:{
      css:`${cssVars}.range { width:100%; accent-color:#536DFE; cursor:pointer; }\n.range:focus-visible { outline:2px solid #536DFE; outline-offset:4px; }\n.range:disabled { opacity:.45; cursor:not-allowed; }\n/* <input class="range" type="range" min="0" max="100" value="42"> */`,
      rn:`import Slider from '@react-native-community/slider';\nexport function Range({value,onChange}){ return <Slider minimumValue={0} maximumValue={100} value={value} onValueChange={onChange} minimumTrackTintColor="#536DFE" maximumTrackTintColor="#DCE1E6" thumbTintColor="#536DFE" accessibilityLabel="Valor"/>; }`,
      flutter:`Slider(min:0,max:100,value:value,onChanged:(next)=>setState(()=>value=next),label:value.round().toString())`
    },
    tags:{
      css:`${cssVars}.tag { min-height:28px; padding:0 10px; display:inline-flex; align-items:center; gap:6px; border-radius:999px; background:#F5F6F8; color:#20242B; font-size:12px; font-weight:700; }\n.tag--success { background:#E7F6EF; color:#16794D; } .tag--error { background:#FDECEC; color:#B42318; }`,
      rn:`import { StyleSheet, Text, View } from 'react-native';\nexport function Tag({label,tone='neutral'}){ return <View style={[styles.tag,tone==='success'&&styles.success]}><Text style={styles.label}>{label}</Text></View>; }\nconst styles=StyleSheet.create({tag:{minHeight:28,paddingHorizontal:10,borderRadius:999,alignSelf:'flex-start',justifyContent:'center',backgroundColor:'#F5F6F8'},success:{backgroundColor:'#E7F6EF'},label:{fontSize:12,fontWeight:'700'}});`,
      flutter:`Chip(label:const Text('Ativo'),padding:const EdgeInsets.symmetric(horizontal:10),visualDensity:VisualDensity.compact,shape:const StadiumBorder())`
    },
    navigation:{
      css:`${cssVars}.site-nav { min-height:64px; display:flex; align-items:center; gap:24px; }\n.site-nav__links { margin-left:auto; display:flex; align-items:center; gap:24px; }\n.site-nav a[aria-current="page"] { font-weight:700; }\n@media(max-width:768px){ .site-nav__links { display:none; } .site-nav__menu { display:grid; } }`,
      rn:`import { Pressable, Text, View } from 'react-native';\nexport function Navigation({active='Home'}){ return <View style={{flexDirection:'row',gap:24,alignItems:'center'}}>{['Home','Work','About'].map(item=><Pressable key={item} accessibilityRole="button"><Text style={{fontWeight:item===active?'700':'400'}}>{item}</Text></Pressable>)}</View>; }`,
      flutter:`NavigationBar(selectedIndex:index,onDestinationSelected:(next)=>setState(()=>index=next),destinations:const [NavigationDestination(icon:Icon(Icons.home_outlined),selectedIcon:Icon(Icons.home),label:'Home'),NavigationDestination(icon:Icon(Icons.work_outline),label:'Work')])`
    },
    tabs:{
      css:`${cssVars}.tabs { display:flex; gap:4px; border-bottom:1px solid #DDE1E7; }\n.tab { min-height:40px; padding:0 14px; border:0; border-bottom:2px solid transparent; background:transparent; cursor:pointer; }\n.tab[aria-selected="true"] { border-bottom-color:#536DFE; color:#253DA7; font-weight:700; }\n.tab:focus-visible { outline:2px solid #536DFE; outline-offset:-2px; }`,
      rn:`import { Pressable, Text, View } from 'react-native';\nexport function Tabs({items,active,onChange}){ return <View accessibilityRole="tablist" style={{flexDirection:'row'}}>{items.map(item=><Pressable key={item} accessibilityRole="tab" accessibilityState={{selected:item===active}} onPress={()=>onChange(item)} style={{padding:12,borderBottomWidth:2,borderBottomColor:item===active?'#536DFE':'transparent'}}><Text>{item}</Text></Pressable>)}</View>; }`,
      flutter:`DefaultTabController(length:3,child:Column(children:const [TabBar(tabs:[Tab(text:'Overview'),Tab(text:'Analytics'),Tab(text:'Settings')]),Expanded(child:TabBarView(children:[OverviewView(),AnalyticsView(),SettingsView()]))]))`
    },
    'header-links':{
      css:`${cssVars}.header-link { min-height:36px; display:inline-flex; align-items:center; gap:8px; color:inherit; text-decoration:none; border-bottom:1px solid transparent; }\n.header-link:hover,.header-link[aria-current="page"] { border-bottom-color:currentColor; }\n.header-link:focus-visible { outline:2px solid #536DFE; outline-offset:2px; }`,
      rn:`import { Pressable, Text } from 'react-native';\nexport function HeaderLink({label,onPress,active=false}){ return <Pressable accessibilityRole="link" onPress={onPress} style={{minHeight:36,justifyContent:'center'}}><Text style={{fontWeight:active?'700':'500',textDecorationLine:active?'underline':'none'}}>{label}</Text></Pressable>; }`,
      flutter:`TextButton(onPressed:(){},child:const Text('Documentação'),style:TextButton.styleFrom(minimumSize:const Size(0,36)))`
    },
    forms:{
      css:`${cssVars}.field { display:grid; gap:6px; }\n.field label { font-size:13px; font-weight:700; }\n.input,.select,.textarea { width:100%; min-height:40px; padding:0 12px; border:1px solid #DDE1E7; border-radius:8px; background:#fff; color:#20242B; font:inherit; transition:border-color 160ms ease,box-shadow 160ms ease; }\n.textarea { min-height:112px; padding-block:10px; resize:vertical; }\n.input:focus,.select:focus,.textarea:focus { outline:0; border-color:#536DFE; box-shadow:0 0 0 2px rgba(83,109,254,.18); }\n.input[aria-invalid="true"] { border-color:#E24B4A; }\n.input:disabled { background:#F5F6F8; opacity:.65; }`,
      rn:`import { StyleSheet, Text, TextInput, View } from 'react-native';\nexport function Field({label,error,value,onChangeText}){ return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} accessibilityLabel={label} accessibilityState={{disabled:false}} style={[styles.input,error&&styles.error]}/>{error?<Text accessibilityLiveRegion="polite" style={styles.errorText}>{error}</Text>:null}</View>; }\nconst styles=StyleSheet.create({field:{gap:6},label:{fontSize:13,fontWeight:'700'},input:{minHeight:44,paddingHorizontal:12,borderWidth:1,borderColor:'#DDE1E7',borderRadius:8},error:{borderColor:'#E24B4A'},errorText:{fontSize:12,color:'#B42318'}});`,
      flutter:`TextField(controller:controller,decoration:InputDecoration(labelText:'E-mail',hintText:'nome@empresa.com',errorText:error,border:OutlineInputBorder(borderRadius:BorderRadius.circular(8))),onChanged:(value){})\n// TextFormField + validator para validação de formulário.`
    },
    cards:{
      css:`${cssVars}.card { padding:24px; display:grid; gap:16px; border:1px solid #DDE1E7; border-radius:20px; background:#fff; transition:transform 160ms ease,box-shadow 240ms ease,border-color 240ms ease; }\n.card--interactive { cursor:pointer; } .card--interactive:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(15,23,42,.12); } .card--interactive:focus-visible { outline:2px solid #536DFE; outline-offset:2px; }`,
      rn:`import { Pressable, StyleSheet, Text } from 'react-native';\nexport function Card({title,onPress}){ return <Pressable accessibilityRole="button" onPress={onPress} style={({pressed})=>[styles.card,pressed&&styles.pressed]}><Text style={styles.title}>{title}</Text><Text>Conteúdo de apoio do card.</Text></Pressable>; }\nconst styles=StyleSheet.create({card:{padding:24,gap:16,borderRadius:20,borderWidth:1,borderColor:'#DDE1E7'},pressed:{transform:[{scale:.99}],opacity:.9},title:{fontSize:18,fontWeight:'700'}});`,
      flutter:`Card(shape:RoundedRectangleBorder(borderRadius:BorderRadius.circular(20)),child:InkWell(borderRadius:BorderRadius.circular(20),onTap:(){},child:const Padding(padding:EdgeInsets.all(24),child:Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Text('Título',style:TextStyle(fontWeight:FontWeight.w700)),SizedBox(height:8),Text('Conteúdo de apoio do card.')]))))`
    },
    tables:{
      css:`${cssVars}.data-table { width:100%; border-collapse:collapse; }\n.data-table th,.data-table td { min-height:48px; padding:12px 16px; border-bottom:1px solid #DDE1E7; text-align:left; }\n.data-table th { font-size:12px; font-weight:700; background:#F5F6F8; }\n.data-table tbody tr:hover { background:#F8F9FB; }`,
      rn:`import { FlatList, Text, View } from 'react-native';\nexport function DataList({rows}){ return <FlatList data={rows} keyExtractor={item=>item.id} ListHeaderComponent={<View style={{flexDirection:'row',padding:12}}><Text style={{flex:1,fontWeight:'700'}}>Nome</Text><Text>Status</Text></View>} renderItem={({item})=><View style={{flexDirection:'row',padding:12,borderBottomWidth:1,borderColor:'#DDE1E7'}}><Text style={{flex:1}}>{item.name}</Text><Text>{item.status}</Text></View>}/>; }`,
      flutter:`DataTable(columns:const [DataColumn(label:Text('Nome')),DataColumn(label:Text('Status'))],rows:rows.map((row)=>DataRow(cells:[DataCell(Text(row.name)),DataCell(Text(row.status))])).toList())`
    },
    'modals-popups':{
      css:`${cssVars}.dialog { width:min(560px,calc(100% - 32px)); padding:24px; border:0; border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,.24); }\n.dialog::backdrop { background:rgba(15,23,42,.44); }\n.dialog[open] { animation:dialog-in 360ms cubic-bezier(.2,.8,.2,1); }\n@keyframes dialog-in { from { opacity:0; transform:translateY(24px) scale(.98); } to { opacity:1; transform:none; } }`,
      rn:`import { Modal, Pressable, Text, View } from 'react-native';\nexport function AppModal({visible,onClose}){ return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><View style={{flex:1,backgroundColor:'rgba(15,23,42,.44)',alignItems:'center',justifyContent:'center',padding:16}}><View style={{width:'100%',maxWidth:560,padding:24,borderRadius:20,backgroundColor:'#fff'}}><Text style={{fontSize:20,fontWeight:'700'}}>Título</Text><Pressable onPress={onClose}><Text>Fechar</Text></Pressable></View></View></Modal>; }`,
      flutter:`Future<void> openDialog(BuildContext context)=>showDialog(context:context,builder:(context)=>AlertDialog(title:const Text('Título'),content:const Text('Conteúdo do modal.'),actions:[TextButton(onPressed:()=>Navigator.pop(context),child:const Text('Cancelar')),FilledButton(onPressed:()=>Navigator.pop(context),child:const Text('Confirmar'))]));`
    },
    'banners-messaging':{
      css:`${cssVars}.banner { min-height:48px; padding:12px 16px; display:flex; align-items:flex-start; gap:10px; border:1px solid #DDE1E7; border-radius:8px; }\n.banner--success { border-color:#22A06B; background:#E7F6EF; } .banner--warning { border-color:#F59E0B; background:#FFF6DD; } .banner--error { border-color:#E24B4A; background:#FDECEC; }`,
      rn:`import { Text, View } from 'react-native';\nexport function Banner({message}){ return <View accessible accessibilityLiveRegion="polite" style={{minHeight:48,padding:12,borderRadius:8,backgroundColor:'#E7F6EF'}}><Text>{message}</Text></View>; }`,
      flutter:`Semantics(liveRegion:true,child:Container(padding:const EdgeInsets.all(12),decoration:BoxDecoration(color:const Color(0xFFE7F6EF),borderRadius:BorderRadius.circular(8)),child:const Text('Alterações salvas com sucesso.')))`
    }
  };
  return map[key]||null;
}

function genericSnippets(title,tokens){
  const key=slug(title),name=className(title),objects=tokenObjects(title,tokens);
  return {
    css:`${tokenPrelude(tokens)}.ds-${key} {\n  display:block;\n  transition:transform 160ms cubic-bezier(.2,0,0,1), opacity 160ms cubic-bezier(.2,0,0,1);\n}\n.ds-${key}:active { transform:scale(.98); }\n@media (prefers-reduced-motion:reduce) { .ds-${key} { transition-duration:.01ms; } }`,
    'react-native':`${objects.rn}\n\nexport function ${name}(){ return null; }`,
    flutter:`${objects.flutter}\n\n// Aplique os tokens acima ao widget correspondente do projeto.`
  };
}

function motionSnippets(){
  return {
    css:`:root {\n  --motion-fast:160ms;\n  --motion-base:240ms;\n  --motion-slow:360ms;\n  --motion-standard:cubic-bezier(.2,0,0,1);\n}\n.motion-enter { animation:motion-enter var(--motion-slow) var(--motion-standard); }\n@keyframes motion-enter { from { opacity:0; transform:translateY(24px) scale(.985); } to { opacity:1; transform:none; } }\n@media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; } }`,
    'react-native':`import { Animated, Easing } from 'react-native';\nexport function enter(value){ value.setValue(0); Animated.timing(value,{toValue:1,duration:360,easing:Easing.bezier(.2,0,0,1),useNativeDriver:true}).start(); }\nexport const enterStyle=value=>({opacity:value,transform:[{translateY:value.interpolate({inputRange:[0,1],outputRange:[24,0]})}]});`,
    flutter:`import 'package:flutter/material.dart';\nTweenAnimationBuilder<double>(duration:const Duration(milliseconds:360),curve:Curves.easeOutCubic,tween:Tween(begin:0,end:1),builder:(context,value,child)=>Opacity(opacity:value,child:Transform.translate(offset:Offset(0,24*(1-value)),child:child)),child:const Text('Motion'))`
  };
}

function snippetsFor(title,tokens){
  if(isMotion())return motionSnippets();
  return foundationSnippets(title,tokens)||identitySnippets(title,tokens)||componentSnippets(title,tokens)||genericSnippets(title,tokens);
}

function copyText(text){
  if(navigator.clipboard?.writeText)return navigator.clipboard.writeText(text);
  const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();return Promise.resolve();
}

function codeBox(snippets,title){
  return `<div class="runtime-code-box carbon-code-box" data-carbon-code><div class="runtime-code-toolbar"><div role="tablist" aria-label="Código de ${esc(title)}"><button class="active" role="tab" aria-selected="true" data-carbon-lang="css">CSS</button><button role="tab" aria-selected="false" data-carbon-lang="react-native">React Native</button><button role="tab" aria-selected="false" data-carbon-lang="flutter">Flutter</button></div><button class="runtime-copy" type="button" data-carbon-copy>Copiar código</button></div><pre><code data-carbon-output>${esc(snippets.css)}</code></pre><p>Exemplo pronto para copiar. Ajuste conteúdo e tokens quando o projeto definir valores diferentes do template.</p></div>`;
}

function bindCodeBox(box,snippets){
  if(!box||box.dataset.carbonBound)return;
  box.dataset.carbonBound='true';let language='css';const output=box.querySelector('[data-carbon-output]');
  box.querySelectorAll('[data-carbon-lang]').forEach(tab=>tab.addEventListener('click',()=>{
    language=tab.dataset.carbonLang;
    box.querySelectorAll('[data-carbon-lang]').forEach(button=>{const active=button===tab;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
    output.textContent=snippets[language];
  }));
  box.querySelector('[data-carbon-copy]')?.addEventListener('click',async event=>{await copyText(snippets[language]);const button=event.currentTarget,original=button.textContent;button.textContent='Copiado';setTimeout(()=>button.textContent=original,1200);});
}

function ensureCodeSection(){
  let code=sectionByTitle('Implementação')||sectionByTitle('Código pronto para copiar')||sectionByTitle('Code');
  if(code)return code;
  if(isPart())return null;
  const references=sectionByTitle('Referências');
  if(!references)return null;
  const title=app.querySelector('.doc-hero h1')?.textContent.trim()||'Design System';
  const snippets=snippetsFor(title,readTechTokens());
  code=document.createElement('section');
  code.className='doc-section carbon-generated-code';
  code.dataset.carbonGeneratedCode='true';
  code.innerHTML=`<div class="doc-section-head"><p class="section-kicker">04</p><h2>Implementação</h2><p>Exemplo pronto para uso em CSS, React Native ou Flutter, inclusive para componentes simples como buttons, inputs, tags e controles.</p></div>${codeBox(snippets,title)}`;
  references.before(code);
  const kicker=references.querySelector('.section-kicker');if(kicker)kicker.textContent='05';
  bindCodeBox(code.querySelector('[data-carbon-code]'),snippets);
  return code;
}

function installTabs(container,hero,panels,title){
  if(!container||!hero||panels.length<2||container.querySelector(':scope > .ds-page-tabs'))return;
  const prefix=slug(title);
  const tabs=document.createElement('div');tabs.className='ds-page-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',`Seções de ${title}`);
  tabs.innerHTML=panels.map(([id,label],index)=>`<button type="button" role="tab" id="ds-tab-${prefix}-${id}" aria-controls="ds-panel-${prefix}-${id}" aria-selected="${index===0?'true':'false'}" tabindex="${index===0?'0':'-1'}" data-ds-tab="${id}" class="${index===0?'active':''}">${label}</button>`).join('');
  hero.after(tabs);container.classList.add('ds-tabbed-detail');
  panels.forEach(([id,,panel],index)=>{panel.dataset.dsTabPanel=id;panel.id=`ds-panel-${prefix}-${id}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`ds-tab-${prefix}-${id}`);panel.hidden=index!==0;});
  const activate=(id,focus=false)=>{
    if(!panels.some(([panelId])=>panelId===id))return;
    tabs.querySelectorAll('[data-ds-tab]').forEach(button=>{const active=button.dataset.dsTab===id;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;if(active&&focus)button.focus();});
    panels.forEach(([panelId,,panel])=>panel.hidden=panelId!==id);
  };
  const buttons=[...tabs.querySelectorAll('[data-ds-tab]')];
  buttons.forEach((button,index)=>{
    button.addEventListener('click',()=>activate(button.dataset.dsTab));
    button.addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='ArrowRight')next=(index+1)%buttons.length;if(event.key==='ArrowLeft')next=(index-1+buttons.length)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;activate(buttons[next].dataset.dsTab,true);});
  });
}

function tabifyOverview(){
  const root=app?.querySelector(':scope > .runtime-overview');
  if(!root||root.querySelector(':scope > .ds-page-tabs'))return false;
  const hero=root.querySelector(':scope > .runtime-overview-hero');
  const stats=root.querySelector(':scope > .runtime-stats');
  const sections=[...root.querySelectorAll(':scope > .doc-section')];
  const find=kicker=>sections.find(section=>section.querySelector('.section-kicker')?.textContent.trim()===kicker)||null;
  const panels=[
    ['overview','Overview',stats],
    ['architecture','Architecture',find('Architecture')],
    ['principles','Principles',find('Operating principles')],
    ['templates','Templates',find('Templates & Parts')],
    ['motion','Motion',find('Motion')]
  ].filter(([, ,panel])=>panel);
  installTabs(root,hero,panels,'Design System Overview');
  return true;
}

function tabifyDetail(){
  if(!app||!app.querySelector(':scope > .doc-hero')||app.querySelector(':scope > .ds-page-tabs'))return;
  const title=app.querySelector('.doc-hero h1')?.textContent.trim()||'Documentação';
  const purpose=sectionByTitle('Para que serve');
  const usage=sectionByTitle('Exemplo real');
  const tokens=sectionByTitle('Informações técnicas');
  let code=ensureCodeSection();
  const references=sectionByTitle('Referências');
  code=code||sectionByTitle('Implementação')||sectionByTitle('Código pronto para copiar')||sectionByTitle('Code');
  const panels=[
    ['overview','Overview',purpose],
    ['usage','Usage',usage],
    ['tokens','Tokens',tokens],
    ['code','Code',code],
    ['references','References',references]
  ].filter(([, ,panel])=>panel);
  installTabs(app,app.querySelector(':scope > .doc-hero'),panels,title);
  if(code?.dataset.carbonGeneratedCode==='true')bindCodeBox(code.querySelector('[data-carbon-code]'),snippetsFor(title,readTechTokens()));
}

function tabify(){
  if(!app)return;
  if(tabifyOverview())return;
  tabifyDetail();
}

function schedule(){
  if(scheduled)return;scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;tabify();});
}

const observer=new MutationObserver(schedule);
if(app)observer.observe(app,{childList:true,subtree:true});
window.addEventListener('hashchange',schedule);
window.addEventListener('popstate',schedule);
schedule();
