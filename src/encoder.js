const encodeForHTML = (input) => {
  if (typeof input === "undefined" || input === null) {
    return "";
  }
  let encodingDiv;
  // no need to create a new div fore every encoding.
  if (typeof document !== "undefined") {
    encodingDiv = document.createElement("div");
  }
  let encoded = "";
  const textNode = document.createTextNode(input);
  encodingDiv.appendChild(textNode);
  encoded = encodingDiv.innerHTML;
  encodingDiv.removeChild(textNode);
  return encoded;
};

export default encodeForHTML;
