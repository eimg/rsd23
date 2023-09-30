function Element(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Custom React"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Item One"), /*#__PURE__*/React.createElement("li", null, "Item Two")));
}
ReactDOM.render( /*#__PURE__*/React.createElement(Element, {
  content: "A React Component"
}), document.getElementById("app"));