module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/AppErrorBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppErrorBoundary",
    ()=>AppErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
class AppErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            resetKey: 0
        };
    }
    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('AppErrorBoundary caught an error:', error, errorInfo);
    }
    handleTryAgain = ()=>{
        this.setState((prev)=>({
                hasError: false,
                resetKey: prev.resetKey + 1
            }));
    };
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "error-boundary",
                role: "alert",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "error-boundary__card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "error-boundary__title",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AppErrorBoundary.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "error-boundary__text",
                            children: "A part of the application failed. You can try again to keep using the app."
                        }, void 0, false, {
                            fileName: "[project]/src/components/AppErrorBoundary.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "error-boundary__button",
                            onClick: this.handleTryAgain,
                            children: "Try again"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AppErrorBoundary.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AppErrorBoundary.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AppErrorBoundary.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "error-boundary__root",
            children: this.props.children
        }, this.state.resetKey, false, {
            fileName: "[project]/src/components/AppErrorBoundary.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/src/constants/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTHOR_BIO",
    ()=>AUTHOR_BIO,
    "AUTHOR_EMAIL",
    ()=>AUTHOR_EMAIL,
    "AUTHOR_GITHUB",
    ()=>AUTHOR_GITHUB,
    "AUTHOR_NAME",
    ()=>AUTHOR_NAME,
    "QUERY_PARAMS",
    ()=>QUERY_PARAMS,
    "QUERY_UI",
    ()=>QUERY_UI,
    "RS_SCHOOL_REACT_COURSE_URL",
    ()=>RS_SCHOOL_REACT_COURSE_URL,
    "SEARCH_TERM_STORAGE_KEY",
    ()=>SEARCH_TERM_STORAGE_KEY,
    "SELECTED_ITEMS_CSV",
    ()=>SELECTED_ITEMS_CSV,
    "SELECTED_ITEMS_FLYOUT",
    ()=>SELECTED_ITEMS_FLYOUT,
    "SWAPI_API_BASE",
    ()=>SWAPI_API_BASE,
    "SWAPI_DEV_PROXY_BASE",
    ()=>SWAPI_DEV_PROXY_BASE,
    "SWAPI_LOCAL_DEV_HOSTNAMES",
    ()=>SWAPI_LOCAL_DEV_HOSTNAMES,
    "SWAPI_PAGE_SIZE",
    ()=>SWAPI_PAGE_SIZE,
    "THEME_MODES",
    ()=>THEME_MODES,
    "THEME_MODE_DARK",
    ()=>THEME_MODE_DARK,
    "THEME_MODE_LIGHT",
    ()=>THEME_MODE_LIGHT,
    "THEME_STORAGE_KEY",
    ()=>THEME_STORAGE_KEY,
    "THEME_TOGGLE",
    ()=>THEME_TOGGLE
]);
const QUERY_PARAMS = {
    page: 'page',
    details: 'details'
};
const SWAPI_API_BASE = 'https://swapi.py4e.com/api';
const SWAPI_DEV_PROXY_BASE = '/swapi';
const SWAPI_LOCAL_DEV_HOSTNAMES = [
    'localhost',
    '127.0.0.1'
];
const SWAPI_PAGE_SIZE = 10;
const SEARCH_TERM_STORAGE_KEY = 'swapi-explorer-search-term';
const THEME_STORAGE_KEY = 'swapi-explorer-theme';
const THEME_MODE_LIGHT = 'light';
const THEME_MODE_DARK = 'dark';
const THEME_MODES = {
    light: THEME_MODE_LIGHT,
    dark: THEME_MODE_DARK
};
const THEME_TOGGLE = {
    groupLabel: 'Theme',
    lightLabel: 'Light',
    darkLabel: 'Dark'
};
const RS_SCHOOL_REACT_COURSE_URL = 'https://rs.school/courses/reactjs';
const AUTHOR_NAME = 'Kiryl Lukashchuk';
const AUTHOR_BIO = 'I run a construction company and am the father of a large family, where patience and multitasking skills are cultivated—ideal qualities for development. In this project, I tried to prove that I can work equally confidently with both building architecture and application architecture.';
const AUTHOR_GITHUB = 'https://github.com/KirrBrest';
const AUTHOR_EMAIL = 'Lukashchuk.Kiryl@gmail.com';
const SELECTED_ITEMS_CSV = {
    header: 'Name,Description,Details URL,SWAPI URL,Person ID',
    filenameSuffix: '_items.csv',
    mimeType: 'text/csv;charset=utf-8;'
};
const QUERY_UI = {
    listLoading: 'Loading data…',
    listRefreshing: 'Updating results…',
    listRefresh: 'Refresh results',
    detailsLoading: 'Loading details…',
    detailsRefreshing: 'Updating details…',
    detailsRefresh: 'Refresh details'
};
const SELECTED_ITEMS_FLYOUT = {
    regionLabel: 'Selected items',
    unselectAllLabel: 'Unselect all',
    downloadLabel: 'Download',
    singleItemCountLabel: '1 item selected',
    pluralCountSuffix: 'items selected'
};
}),
"[project]/src/storage/themeStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeStorage",
    ()=>ThemeStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-ssr] (ecmascript)");
;
function isThemeMode(value) {
    return value === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["THEME_MODES"].light || value === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["THEME_MODES"].dark;
}
function read() {
    if ("TURBOPACK compile-time truthy", 1) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["THEME_MODES"].dark;
    }
    //TURBOPACK unreachable
    ;
}
function write(theme) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
const ThemeStorage = {
    read,
    write
};
}),
"[project]/src/context/ThemeContext.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeContext",
    ()=>ThemeContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
}),
"[project]/src/context/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$themeStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/storage/themeStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeContext.ts [app-ssr] (ecmascript)");
;
;
;
;
function applyThemeToDocument(theme) {
    if (typeof document === 'undefined') {
        return;
    }
    document.documentElement.dataset.theme = theme;
}
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$themeStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeStorage"].read());
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextTheme)=>{
        setThemeState(nextTheme);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$themeStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeStorage"].write(nextTheme);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        applyThemeToDocument(theme);
    }, [
        theme
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            theme,
            setTheme
        }), [
        theme,
        setTheme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeContext"].Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeProvider.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/store/selectedItemsSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSelected",
    ()=>clearSelected,
    "selectIsItemSelected",
    ()=>selectIsItemSelected,
    "selectSelectedCount",
    ()=>selectSelectedCount,
    "selectSelectedItems",
    ()=>selectSelectedItems,
    "selectedItemsReducer",
    ()=>selectedItemsReducer,
    "toggleSelected",
    ()=>toggleSelected
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    items: []
};
function findItemIndex(items, id) {
    return items.findIndex((item)=>item.id === id);
}
const selectedItemsSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'selectedItems',
    initialState,
    reducers: {
        toggleSelected (state, action) {
            const index = findItemIndex(state.items, action.payload.id);
            if (index === -1) {
                state.items.push(action.payload);
                return;
            }
            state.items.splice(index, 1);
        },
        clearSelected (state) {
            state.items = [];
        }
    }
});
const { toggleSelected, clearSelected } = selectedItemsSlice.actions;
const selectedItemsReducer = selectedItemsSlice.reducer;
function selectSelectedItems(state) {
    return state.selectedItems.items;
}
function selectSelectedCount(state) {
    return state.selectedItems.items.length;
}
function selectIsItemSelected(state, id) {
    return state.selectedItems.items.some((item)=>item.id === id);
}
}),
"[project]/src/types/guards/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/src/types/guards/swapiGuards.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSwapiPeopleListResponse",
    ()=>isSwapiPeopleListResponse,
    "isSwapiPerson",
    ()=>isSwapiPerson
]);
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function isNullableString(value) {
    return value === null || typeof value === 'string';
}
function isSwapiPerson(value) {
    if (!isRecord(value)) {
        return false;
    }
    return typeof value.name === 'string' && typeof value.height === 'string' && typeof value.mass === 'string' && typeof value.hair_color === 'string' && typeof value.skin_color === 'string' && typeof value.eye_color === 'string' && typeof value.birth_year === 'string' && typeof value.gender === 'string' && typeof value.url === 'string';
}
function isSwapiPeopleListResponse(value) {
    if (!isRecord(value)) {
        return false;
    }
    return typeof value.count === 'number' && isNullableString(value.next) && isNullableString(value.previous) && Array.isArray(value.results) && value.results.every(isSwapiPerson);
}
}),
"[project]/src/api/fetchSwapiPeople.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwapiPeopleApi",
    ()=>SwapiPeopleApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$guards$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/types/guards/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$guards$2f$swapiGuards$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/guards/swapiGuards.ts [app-ssr] (ecmascript)");
;
;
function apiBase() {
    if ("TURBOPACK compile-time truthy", 1) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SWAPI_API_BASE"];
    }
    //TURBOPACK unreachable
    ;
    const hostname = undefined;
}
async function fetchPeople(rawTerm, page) {
    const term = rawTerm.trim();
    const safePage = page < 1 ? 1 : page;
    const peoplePath = `${apiBase()}/people/`;
    const params = new URLSearchParams();
    if (term !== '') {
        params.set('search', term);
    }
    if (safePage > 1) {
        params.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page, String(safePage));
    }
    const qs = params.toString();
    const url = qs === '' ? peoplePath : `${peoplePath}?${qs}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`SWAPI_HTTP_${res.status}`);
    }
    const payload = await res.json();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$guards$2f$swapiGuards$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSwapiPeopleListResponse"])(payload)) {
        throw new Error('SWAPI_INVALID_RESPONSE');
    }
    return payload;
}
async function fetchPerson(personId) {
    const safeId = personId.trim();
    if (safeId === '') {
        throw new Error('SWAPI_INVALID_PERSON_ID');
    }
    const url = `${apiBase()}/people/${safeId}/`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`SWAPI_HTTP_${res.status}`);
    }
    const payload = await res.json();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$guards$2f$swapiGuards$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSwapiPerson"])(payload)) {
        throw new Error('SWAPI_INVALID_RESPONSE');
    }
    return payload;
}
const SwapiPeopleApi = {
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SWAPI_PAGE_SIZE"],
    fetchPeople,
    fetchPerson
};
}),
"[project]/src/config/queryCacheTtl.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getQueryCacheTtlSeconds",
    ()=>getQueryCacheTtlSeconds
]);
const DEFAULT_QUERY_CACHE_TTL_SECONDS = 300;
function getQueryCacheTtlSeconds() {
    const raw = process.env.NEXT_PUBLIC_QUERY_CACHE_TTL_SECONDS;
    if (raw === undefined || raw === '') {
        return DEFAULT_QUERY_CACHE_TTL_SECONDS;
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return DEFAULT_QUERY_CACHE_TTL_SECONDS;
    }
    return parsed;
}
}),
"[project]/src/utils/personDescription.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwapiPersonDescription",
    ()=>SwapiPersonDescription
]);
function build(person) {
    return [
        `Gender: ${person.gender}`,
        `Birth: ${person.birth_year}`,
        `${person.height} cm · ${person.mass} kg`,
        `Hair: ${person.hair_color} · Eyes: ${person.eye_color} · Skin: ${person.skin_color}`
    ].join(' · ');
}
const SwapiPersonDescription = {
    build
};
}),
"[project]/src/utils/mapSwapiPersonToResult.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwapiPersonResultMapper",
    ()=>SwapiPersonResultMapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$personDescription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/personDescription.ts [app-ssr] (ecmascript)");
;
function toItem(person) {
    return {
        id: person.url,
        name: person.name,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$personDescription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SwapiPersonDescription"].build(person)
    };
}
const SwapiPersonResultMapper = {
    toItem
};
}),
"[project]/src/store/swapiApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "swapiApi",
    ()=>swapiApi,
    "useGetPeopleQuery",
    ()=>useGetPeopleQuery,
    "useGetPersonQuery",
    ()=>useGetPersonQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$fetchSwapiPeople$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/fetchSwapiPeople.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$queryCacheTtl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/queryCacheTtl.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mapSwapiPersonToResult$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mapSwapiPersonToResult.ts [app-ssr] (ecmascript)");
;
;
;
;
const cacheTtlSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$queryCacheTtl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQueryCacheTtlSeconds"])();
function toQueryError(reason) {
    const message = reason instanceof Error ? reason.message : 'SWAPI_UNKNOWN';
    return {
        status: 'CUSTOM_ERROR',
        error: message
    };
}
function peopleListTagId(arg) {
    return `${arg.term.trim()}-${arg.page < 1 ? 1 : arg.page}`;
}
const swapiApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'swapiApi',
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fakeBaseQuery"])(),
    tagTypes: [
        'PeopleList',
        'Person'
    ],
    keepUnusedDataFor: cacheTtlSeconds,
    refetchOnMountOrArgChange: cacheTtlSeconds,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    endpoints: (builder)=>({
            getPeople: builder.query({
                queryFn: async (arg)=>{
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$fetchSwapiPeople$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SwapiPeopleApi"].fetchPeople(arg.term, arg.page);
                        const results = data.results.map((person)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mapSwapiPersonToResult$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SwapiPersonResultMapper"].toItem(person));
                        return {
                            data: {
                                results,
                                listHasNext: data.next !== null,
                                listHasPrev: data.previous !== null,
                                listTotalCount: data.count
                            }
                        };
                    } catch (reason) {
                        return {
                            error: toQueryError(reason)
                        };
                    }
                },
                providesTags: (_result, _error, arg)=>[
                        {
                            type: 'PeopleList',
                            id: peopleListTagId(arg)
                        },
                        {
                            type: 'PeopleList',
                            id: 'LIST'
                        }
                    ]
            }),
            getPerson: builder.query({
                queryFn: async (personId)=>{
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$fetchSwapiPeople$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SwapiPeopleApi"].fetchPerson(personId);
                        return {
                            data
                        };
                    } catch (reason) {
                        return {
                            error: toQueryError(reason)
                        };
                    }
                },
                providesTags: (_result, _error, personId)=>[
                        {
                            type: 'Person',
                            id: personId
                        },
                        {
                            type: 'Person',
                            id: 'DETAIL'
                        }
                    ]
            })
        })
});
const { useGetPeopleQuery, useGetPersonQuery } = swapiApi;
}),
"[project]/src/store/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invalidateAllSwapiCache",
    ()=>invalidateAllSwapiCache,
    "invalidatePeopleListCache",
    ()=>invalidatePeopleListCache,
    "invalidatePersonCache",
    ()=>invalidatePersonCache,
    "resetSwapiApiState",
    ()=>resetSwapiApiState,
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$selectedItemsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/selectedItemsSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/swapiApi.ts [app-ssr] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        selectedItems: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$selectedItemsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectedItemsReducer"],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].middleware)
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupListeners"])(store.dispatch);
;
;
function invalidatePeopleListCache() {
    store.dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].util.invalidateTags([
        'PeopleList'
    ]));
}
function invalidatePersonCache(personId) {
    if (personId !== undefined) {
        store.dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].util.invalidateTags([
            {
                type: 'Person',
                id: personId
            }
        ]));
        return;
    }
    store.dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].util.invalidateTags([
        'Person'
    ]));
}
function invalidateAllSwapiCache() {
    store.dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].util.invalidateTags([
        'PeopleList',
        'Person'
    ]));
}
function resetSwapiApiState() {
    store.dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapiApi"].util.resetApiState());
}
}),
"[project]/src/store/ReduxProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReduxProvider",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-ssr] (ecmascript) <locals>");
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/ReduxProvider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/components/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AppErrorBoundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$ReduxProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/ReduxProvider.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$ReduxProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReduxProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppErrorBoundary"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/Providers.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Providers.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0dda5ch._.js.map