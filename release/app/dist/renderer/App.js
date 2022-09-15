"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Aqua_Ball_Red_icon_png_1 = __importDefault(require("../../assets/Aqua-Ball-Red-icon.png"));
const Aqua_Ball_Green_icon_png_1 = __importDefault(require("../../assets/Aqua-Ball-Green-icon.png"));
require("./App.css");
const Hello = () => {
    const [icon, setIcon] = (0, react_1.useState)(Aqua_Ball_Red_icon_png_1.default);
    const getHome = () => {
        window.electron
            .onOff()
            .then((response) => {
            console.log(response);
            return '';
        })
            .catch((error) => {
            console.log(`Error: ${error}`);
        });
    };
    const handleSign = (onoff) => {
        console.log('ON/OFF: ', onoff);
        window.electron
            .onOff(null, onoff)
            .then((response) => {
            console.log(response);
            return '';
        })
            .catch((error) => {
            console.log(`Error: ${error}`);
        });
    };
    const updateIcon = () => {
        if (icon === Aqua_Ball_Red_icon_png_1.default) {
            setIcon(Aqua_Ball_Green_icon_png_1.default);
            handleSign('OFF');
        }
        else {
            setIcon(Aqua_Ball_Red_icon_png_1.default);
            handleSign('ON');
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "Hello", children: (0, jsx_runtime_1.jsx)("img", { width: "256", alt: "icon", src: icon, onClick: updateIcon }) }) }));
};
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.MemoryRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Hello, {}) }) }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map