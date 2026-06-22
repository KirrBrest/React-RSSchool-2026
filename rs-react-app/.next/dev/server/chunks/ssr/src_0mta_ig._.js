module.exports = [
"[project]/src/hooks/useAppDispatch.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDispatch",
    ()=>useAppDispatch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
;
function useAppDispatch() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
}
}),
"[project]/src/hooks/useAppSelector.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppSelector",
    ()=>useAppSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
;
function useAppSelector(selector) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(selector);
}
}),
"[project]/src/hooks/useSelectedItemsStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSelectedItemsStore",
    ()=>useSelectedItemsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$selectedItemsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/selectedItemsSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAppDispatch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAppDispatch.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAppSelector$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAppSelector.ts [app-ssr] (ecmascript)");
;
;
;
;
function useSelectedItemsStore() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAppDispatch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAppSelector$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$selectedItemsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectSelectedItems"]);
    const toggleItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((item)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$selectedItemsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toggleSelected"])(item));
    }, [
        dispatch
    ]);
    const clearItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$selectedItemsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSelected"])());
    }, [
        dispatch
    ]);
    return {
        items,
        count: items.length,
        toggleItem,
        clearItems
    };
}
}),
"[project]/src/utils/buildSearchParamsString.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSearchParamsString",
    ()=>buildSearchParamsString
]);
function buildSearchParamsString(params) {
    const qs = params.toString();
    return qs === '' ? '' : `?${qs}`;
}
}),
"[project]/src/utils/detailsNavigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "closeDetailsLocation",
    ()=>closeDetailsLocation,
    "detailsPanelLocation",
    ()=>detailsPanelLocation,
    "homeLocationWithSearch",
    ()=>homeLocationWithSearch,
    "openDetailsLocation",
    ()=>openDetailsLocation,
    "searchParamsWithoutDetails",
    ()=>searchParamsWithoutDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildSearchParamsString.ts [app-ssr] (ecmascript)");
;
;
function searchParamsWithoutDetails(params) {
    const next = new URLSearchParams(params);
    next.delete('details');
    return next;
}
function closeDetailsLocation(params) {
    return {
        pathname: '/',
        search: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSearchParamsString"])(searchParamsWithoutDetails(params))
    };
}
function openDetailsLocation(params, personId) {
    const next = new URLSearchParams(params);
    next.set('details', personId);
    if (!next.has(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page)) {
        next.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page, '1');
    }
    return {
        pathname: '/details',
        search: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSearchParamsString"])(next)
    };
}
function detailsPanelLocation(params) {
    return {
        pathname: '/details',
        search: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSearchParamsString"])(params)
    };
}
function homeLocationWithSearch(params) {
    return {
        pathname: '/',
        search: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSearchParamsString"])(new URLSearchParams(params))
    };
}
}),
"[project]/src/utils/extractPersonId.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractPersonId",
    ()=>extractPersonId,
    "parseDetailsParam",
    ()=>parseDetailsParam
]);
function extractPersonId(personRef) {
    const trimmed = personRef.trim();
    const match = /\/people\/(\d+)\/?$/.exec(trimmed);
    if (match !== null) {
        return match[1];
    }
    return trimmed;
}
function parseDetailsParam(raw) {
    if (raw === null || raw.trim() === '') {
        return null;
    }
    const id = extractPersonId(raw);
    return id === '' ? null : id;
}
}),
"[project]/src/utils/selectedItemsCsvDownload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectedItemsCsvDownload",
    ()=>SelectedItemsCsvDownload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/detailsNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/extractPersonId.ts [app-ssr] (ecmascript)");
;
;
;
function escapeCsvField(value) {
    if (/[",\n\r]/.test(value)) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}
function buildDetailsUrl(item) {
    const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractPersonId"])(item.id);
    const { pathname, search } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openDetailsLocation"])(new URLSearchParams(), personId);
    const path = `${pathname}${search}`;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return path;
}
function toCsvRow(item) {
    const fields = [
        item.name,
        item.description,
        buildDetailsUrl(item),
        item.id,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractPersonId"])(item.id)
    ];
    return fields.map(escapeCsvField).join(',');
}
function buildCsv(items) {
    const rows = items.map(toCsvRow);
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELECTED_ITEMS_CSV"].header,
        ...rows
    ].join('\n');
}
function buildFilename(itemCount) {
    return `${itemCount}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELECTED_ITEMS_CSV"].filenameSuffix}`;
}
function download(items) {
    if (items.length === 0) {
        return;
    }
    const csv = buildCsv(items);
    const blob = new Blob([
        csv
    ], {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELECTED_ITEMS_CSV"].mimeType
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = buildFilename(items.length);
    link.click();
    URL.revokeObjectURL(objectUrl);
}
const SelectedItemsCsvDownload = {
    buildCsv,
    buildFilename,
    download
};
}),
"[project]/src/components/SelectedItemsFlyout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectedItemsFlyout",
    ()=>SelectedItemsFlyout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSelectedItemsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSelectedItemsStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$selectedItemsCsvDownload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/selectedItemsCsvDownload.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function SelectedItemsFlyout() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('SelectedItemsFlyout');
    const { count, items, clearItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSelectedItemsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelectedItemsStore"])();
    const handleUnselectAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearItems();
    }, [
        clearItems
    ]);
    const handleDownload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$selectedItemsCsvDownload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectedItemsCsvDownload"].download(items);
    }, [
        items
    ]);
    if (count === 0) {
        return null;
    }
    const countLabel = count === 1 ? t('singleItemCountLabel') : t('pluralCountLabel', {
        count
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "selected-items-flyout",
        role: "region",
        "aria-label": t('regionLabel'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "selected-items-flyout__count",
                children: countLabel
            }, void 0, false, {
                fileName: "[project]/src/components/SelectedItemsFlyout.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "selected-items-flyout__actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "selected-items-flyout__button selected-items-flyout__button--secondary",
                        onClick: handleUnselectAll,
                        children: t('unselectAllLabel')
                    }, void 0, false, {
                        fileName: "[project]/src/components/SelectedItemsFlyout.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "selected-items-flyout__button selected-items-flyout__button--primary",
                        onClick: handleDownload,
                        children: t('downloadLabel')
                    }, void 0, false, {
                        fileName: "[project]/src/components/SelectedItemsFlyout.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SelectedItemsFlyout.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SelectedItemsFlyout.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_0mta_ig._.js.map