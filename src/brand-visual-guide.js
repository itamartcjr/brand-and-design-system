import { itemVisualGuide } from './brand-item-visuals.js';

export function moduleVisualGuide(module){
  if(!module)return'';
  const parts=location.hash.replace(/^#\//,'').split('/');
  const rawIndex=parts[0]==='module'&&parts[1]===module.id?Number(parts[2]):0;
  const index=Number.isInteger(rawIndex)&&rawIndex>=0&&rawIndex<(module.fields?.length||0)?rawIndex:0;
  return itemVisualGuide(module,module.fields?.[index]);
}
