import { createGlobalStyle } from 'styled-components';
import MobileDetect from 'mobile-detect';

const deviceDetailsGb = new MobileDetect(navigator.userAgent);

const deviceDetails = {
  mobile: deviceDetailsGb.mobile(),
  tablet: deviceDetailsGb.tablet(),
  os: deviceDetailsGb.os()
};

export const minSupportedWidth = 1024;
export const maxSupportedWidth = 1366;

let { innerWidth } = window;
if (innerWidth < minSupportedWidth) {
  innerWidth = minSupportedWidth;
} else if (innerWidth > maxSupportedWidth) {
  innerWidth = maxSupportedWidth;
}

export const scaleFactor = deviceDetails.mobile ? 1 : innerWidth / 1366;

const GlobalStyle = createGlobalStyle`
body, html {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: ${props => props.theme.color.base_90};
  color: ${props => props.theme.color.base_20};
  font-size: ${props => props.theme.dim._14px};
  margin: 0;
  height: 100%;
  scrollbar-width: none !important;
  overscroll-behavior: none;
}
body.copy * {
  cursor: copy !important;
}
textarea {
   font-family: inherit;
   font-size: inherit;
}
input {
   font-family: inherit;
   font-size: inherit;
}
button {
   font-family: inherit;
   font-size: inherit;
   user-select: none;
  }
  img {
    user-select: none;
  }
a {
    text-decoration: none;
    :active, :visited {
      color: ${props => props.color || props.theme.color.blue_50};
    }
}
* {
    outline: none;
}
#feedback-root {
  ${
    !deviceDetails.mobile &&
    `
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
    `
  };
}
.loaderContainer {
    background: ${props => props.theme.color.transparent};
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.loaderWrapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
  .loader {
    color: ${props => props.theme.color.tomato};
    font-size: ${props => props.theme.dim._8px};
    width: 1em;
    height: 1em;
    border-radius: 50%;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
}
  @-webkit-keyframes load4 {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
}
@keyframes load4 {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
}
.icon {
    height: ${props => props.theme.dim._24px};
    width: ${props => props.theme.dim._24px};
}
.global-dropDown-container {
    cursor: default;
    position: relative;
}
.commonDropDownContainer {
  z-index: 9;
}
.showDropDownUp {
    right: 0;
    bottom: ${props => props.theme.dim._32px};
}
.quarterDropDownLeft {
    position: absolute;
    width: max-content;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1),
      0 32px 32px 0 rgba(134, 139, 143, 0.2);
    right: ${props => props.theme.dim._scale(135)};
}
.showDropDownNormal {
    right: 0;
}
.react-tooltip-lite {
  background: #333;
  color: white;
  padding: ${props => props.theme.dim._4px} ${props =>
  props.theme.dim._10px} !important;
  border-radius: 2px;
  font-size: ${props => props.theme.dim._12px};
  width: auto !important;
  max-width: ${props => props.theme.dim._scale(300)} !important;
}
.react-tooltip-lite-arrow {
  border-color: #333;
}
.tooltipContent {
  .react-tooltip-lite {
    width: ${props => props.theme.dim._scale(180)} !important;
  }
}
.privateTooltip {
  .react-tooltip-lite {
    white-space: pre;
  }
}
.viewAlignmentTooltip {
  width: fit-content;
}
.userboardTooltip {
  .react-tooltip-lite {
  padding: ${props => props.theme.dim._54px} ${props => props.theme.dim._16px};
  font-size: ${props => props.theme.dim._14px};
  max-width: none !important;
  a {
    color: ${props => props.theme.color.button_hover_blue};
  }
  }
}

// font ---------------
.title56  {
    font-size: ${props => props.theme.dim._56px};
    font-weight: normal;
    line-height: 1.14;
    letter-spacing: -${props => props.theme.dim._scale(1.12)};
    font-family: inherit;
}
  
.header40 {
    font-size: ${props => props.theme.dim._40px};
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: normal;
    font-family: inherit;
}
.header32 {
    font-size: ${props => props.theme.dim._32px};
    font-weight: normal;
    line-height: 1.25;
    letter-spacing: normal;
    font-family: inherit;
}
.header24 {
    font-size: ${props => props.theme.dim._24px};
    font-weight: normal;
    line-height: 1.17;
    letter-spacing: normal;
    font-family: inherit;
}
.header18 {
    font-size: ${props => props.theme.dim._18px};
    font-weight: 600;
    line-height: 1.33;
    letter-spacing: ${props => props.theme.dim._scale(0.24)};
    font-family: inherit;
}
.header14 {
    font-size: ${props => props.theme.dim._14px};
    font-weight: 500;
    line-height: 1.43;
    letter-spacing: ${props => props.theme.dim._scale(0.24)};
    font-family: inherit;
}
.header12 {
    font-size: ${props => props.theme.dim._12px};
    font-weight: 600;
    line-height: 1.33;
    letter-spacing: ${props => props.theme.dim._scale(0.24)};
    font-family: inherit;
}
.header10 {
    font-size: ${props => props.theme.dim._10px};
    font-weight: 500;
    line-height: 1.33;
    letter-spacing: ${props => props.theme.dim._scale(0.2)};
    font-family: inherit;
}
  
.subHeader20 {
  font-size: ${props => props.theme.dim._20px};
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: normal;
  font-family: inherit;
}
.header20 {
  font-size: ${props => props.theme.dim._20px};
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: normal;
  font-family: inherit;
}
.header16 {
  font-size: ${props => props.theme.dim._16px};
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: normal;
  font-family: inherit;
}
.body16 {
  font-size: ${props => props.theme.dim._16px};
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: normal;
  font-family: inherit;
}
.button16 {
  font-size: ${props => props.theme.dim._16px};
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: normal;
  font-family: inherit;
}
.button14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: ${props => props.theme.dim._scale(0.28)};
  font-family: inherit;
}
.tag14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: normal;
  line-height: 1.43;
  letter-spacing: normal;
  font-family: inherit;
}
.text14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 500;
  line-height: 1.14;
  letter-spacing: ${props => props.theme.dim._scale(0.28)};
  font-family: inherit;
}
.text14weight400 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 400;
  line-height: 1.14;
  letter-spacing: ${props => props.theme.dim._scale(0.28)};
  font-family: inherit;
}
.note14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 600;
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}
.note16 {
  font-size: ${props => props.theme.dim._16px};
  font-weight: 600;
  line-height: 1;
  font-family: inherit;
}
.text12 {
  font-size:  ${props => props.theme.dim._12px};
  font-weight: 500;
  line-height: 1;
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}
.textNormal12 {
  font-size:  ${props => props.theme.dim._12px};
  font-weight: normal;
  line-height: 1.67;
  letter-spacing: normal;
  font-family: inherit;
}
.timeStamp12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.textBold12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}
.textItalic12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: 500;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
}
.label12 {
  font-size: ${props => props.theme.dim._12px};
  font-style: normal;
  font-weight: 400;
  line-height: ${props => props.theme.dim._16px};
  letter-spacing: 0em;
}
.label10 {
  font-size: ${props => props.theme.dim._10px};
  font-weight: 500;
  line-height: ${props => props.theme.dim._12px};
  letter-spacing: ${props => props.theme.dim._scale(0.2)};
  font-family: inherit;
}
.timeStamp10 {
  font-size: ${props => props.theme.dim._10px};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.no-user-select{
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none;
}
.baseStyles__BaseModalBackground-sc-12bzkqq-0 {
  height: 100% !important;
  width: 100% !important;
  overflow: scroll;
}
.__react_component_tooltip.type-dark.place-bottom:after,
.__react_component_tooltip.type-dark.place-bottom:before {
    content: none;
}
input[type=number]::-webkit-inner-spin-button, /* remove up down button from input number */
  input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.showDarkBg {
  cursor: default;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  background-color: rgba(0,0,0,0);
  align-items: center;
  justify-content: center;
}
.pagination {
  margin: ${props => props.theme.dim._24px} auto;
  display: flex;
  justify-content: center;
  align-content: center;
  list-style: none;
  outline: none;
}
.pagination > .active > a{
  background-color: ${props => props.theme.color.blue_50} ;
  border-color: ${props => props.theme.color.blue_50} ;
  color: #fff;
}
.pagination > li > a{
  border: 1px solid ${props => props.theme.color.blue_50} ;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
}
.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus{
  background-color: ${props => props.theme.color.blue_50};
  border-color: ${props => props.theme.color.blue_50};
  outline: none ;
}
.pagination > li > a, .pagination > li > span{
  color: ${props => props.theme.color.blue_50}
}
.pagination > li:first-child > a, .pagination > li:first-child > span, .pagination > li:last-child > a, .pagination > li:last-child > span{
  border-radius: unset
}
em{
  background-color: rgba(249,179,18,0.5);
  font-style: normal;
}
`;

export default GlobalStyle;
