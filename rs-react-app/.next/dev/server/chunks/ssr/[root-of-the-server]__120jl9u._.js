module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/constants/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTHOR_EMAIL",
    ()=>AUTHOR_EMAIL,
    "AUTHOR_GITHUB",
    ()=>AUTHOR_GITHUB,
    "AUTHOR_NAME",
    ()=>AUTHOR_NAME,
    "QUERY_PARAMS",
    ()=>QUERY_PARAMS,
    "RS_SCHOOL_REACT_COURSE_URL",
    ()=>RS_SCHOOL_REACT_COURSE_URL,
    "SEARCH_TERM_STORAGE_KEY",
    ()=>SEARCH_TERM_STORAGE_KEY,
    "SELECTED_ITEMS_CSV",
    ()=>SELECTED_ITEMS_CSV,
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
    ()=>THEME_STORAGE_KEY
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
const RS_SCHOOL_REACT_COURSE_URL = 'https://rs.school/courses/reactjs';
const AUTHOR_NAME = 'Kiryl Lukashchuk';
const AUTHOR_GITHUB = 'https://github.com/KirrBrest';
const AUTHOR_EMAIL = 'Lukashchuk.Kiryl@gmail.com';
const SELECTED_ITEMS_CSV = {
    header: 'Name,Description,Details URL,SWAPI URL,Person ID',
    filenameSuffix: '_items.csv',
    mimeType: 'text/csv;charset=utf-8;'
};
}),
"[project]/src/views/AboutPage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AboutPage",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getTranslations.js [app-rsc] (ecmascript) <export default as getTranslations>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-rsc] (ecmascript)");
;
;
;
;
async function AboutPage() {
    const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__["getTranslations"])('About');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "about-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "about-page__main",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "about-page__title",
                    children: t('title')
                }, void 0, false, {
                    fileName: "[project]/src/views/AboutPage.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "about-page__author",
                    "aria-labelledby": "about-author-heading",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "about-author-heading",
                            className: "about-page__heading",
                            children: t('authorHeading')
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "about-page__author-name",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTHOR_NAME"]
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "about-page__bio",
                            children: t('bio')
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/AboutPage.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "about-page__links",
                    "aria-labelledby": "about-links-heading",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "about-links-heading",
                            className: "about-page__heading",
                            children: t('linksHeading')
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "about-page__link-item",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "about-page__external-link",
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTHOR_GITHUB"],
                                target: "_blank",
                                rel: "noreferrer",
                                children: t('githubProfile')
                            }, void 0, false, {
                                fileName: "[project]/src/views/AboutPage.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "about-page__link-item",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "about-page__external-link",
                                href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTHOR_EMAIL"]}`,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTHOR_EMAIL"]
                            }, void 0, false, {
                                fileName: "[project]/src/views/AboutPage.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "about-page__link-item",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "about-page__external-link",
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RS_SCHOOL_REACT_COURSE_URL"],
                                target: "_blank",
                                rel: "noreferrer",
                                children: t('rsSchoolCourse')
                            }, void 0, false, {
                                fileName: "[project]/src/views/AboutPage.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/views/AboutPage.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/AboutPage.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/AboutPage.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/views/AboutPage.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/[locale]/(shell)/about/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutRoutePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/views/AboutPage.tsx [app-rsc] (ecmascript)");
;
;
function AboutRoutePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AboutPage"], {}, void 0, false, {
        fileName: "[project]/src/app/[locale]/(shell)/about/page.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/[locale]/(shell)/about/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/(shell)/about/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__120jl9u._.js.map