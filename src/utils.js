function _getRefs(data, refName) {
  let ref = data;
  let name = refName;
  let props = refName.split('.');
  if(props.length > 0) {
    for(let i = 0; i < props.length - 1; ++i) {
      if(ref[props[i]])
        ref = ref[props[i]];
    }
    name = props[props.length - 1];
  }
  return {ref, name};
}

export function setRefValue(data, refName, value) {
  let {ref, name} = _getRefs(data, refName);
  ref[name] = value;
}

export function getRefValue(data, refName) {
  let {ref, name} = _getRefs(data, refName);
  return ref[name];
}
