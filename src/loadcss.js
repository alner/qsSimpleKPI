export default function loadCSS(url, onload, onerror) {
    var link = document.createElement("link");
    //link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    if(typeof onload === "function")
      link.onload = onload;
    if(typeof onerror === "function")
      link.onerror = onerror;
    document.getElementsByTagName("head")[0].appendChild(link);
}
