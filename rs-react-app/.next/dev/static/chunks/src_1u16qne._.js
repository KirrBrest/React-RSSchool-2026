(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/storage/searchTermStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchTermStorage",
    ()=>SearchTermStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
;
function read() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEARCH_TERM_STORAGE_KEY"]);
        if (raw === null) {
            return '';
        }
        return raw.trim();
    } catch  {
        return '';
    }
}
function write(term) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalized = term.trim();
    try {
        if (normalized === '') {
            window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEARCH_TERM_STORAGE_KEY"]);
        } else {
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEARCH_TERM_STORAGE_KEY"], normalized);
        }
    } catch  {
        return;
    }
}
const SearchTermStorage = {
    storageKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEARCH_TERM_STORAGE_KEY"],
    read,
    write
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useSearchTermStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSearchTermStorage",
    ()=>useSearchTermStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$searchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/storage/searchTermStorage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSearchTermStorage() {
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useSearchTermStorage.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$searchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchTermStorage"].read()
    }["useSearchTermStorage.useState"]);
    const persistSearchTerm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSearchTermStorage.useCallback[persistSearchTerm]": (raw)=>{
            const trimmed = raw.trim();
            if (trimmed !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$searchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchTermStorage"].read()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$searchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchTermStorage"].write(trimmed);
            }
            return trimmed;
        }
    }["useSearchTermStorage.useCallback[persistSearchTerm]"], []);
    return {
        searchTerm,
        setSearchTerm,
        persistSearchTerm
    };
}
_s(useSearchTermStorage, "pswetItpvmETIm/9eIuvKCQl8Gs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SearchSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchSection",
    ()=>SearchSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSearchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSearchTermStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SearchSection({ onSearch, onSearchInputChange }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('SearchSection');
    const { searchTerm, setSearchTerm, persistSearchTerm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSearchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchTermStorage"])();
    const handleSearchChange = (event)=>{
        setSearchTerm(event.target.value);
        onSearchInputChange();
    };
    const handleFormSubmit = (event)=>{
        event.preventDefault();
        const trimmed = persistSearchTerm(searchTerm);
        onSearch(trimmed);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "search-section",
        "aria-label": t('sectionLabel'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "search-section__inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "search-section__title",
                    children: t('title')
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchSection.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "search-section__form",
                    onSubmit: handleFormSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-section__field",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "search-query",
                                className: "search-section__input",
                                type: "search",
                                name: "search-query",
                                value: searchTerm,
                                onChange: handleSearchChange,
                                placeholder: t('placeholder'),
                                autoComplete: "off",
                                spellCheck: false,
                                "aria-label": t('queryLabel')
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchSection.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchSection.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "search-section__submit",
                            children: t('submit')
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchSection.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SearchSection.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SearchSection.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SearchSection.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(SearchSection, "0HVDDHfi41fEAFDLf0XmYNlBFY4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSearchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchTermStorage"]
    ];
});
_c = SearchSection;
var _c;
__turbopack_context__.k.register(_c, "SearchSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Card({ id, name, isDetailsSelected, isChecked, onToggleCheck, onOpenDetails }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('Card');
    const personLabel = name || 'person';
    const handleCheckboxChange = (event)=>{
        event.stopPropagation();
        onToggleCheck();
    };
    const handleOpenDetails = (event)=>{
        event.stopPropagation();
        onOpenDetails(id);
    };
    const handleOpenDetailsKeyDown = (event)=>{
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenDetails(id);
        }
    };
    const classNames = [
        'result-card'
    ];
    if (isDetailsSelected) {
        classNames.push('result-card--selected');
    }
    if (isChecked) {
        classNames.push('result-card--checked');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: classNames.join(' '),
        onClick: (event)=>event.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                className: "result-card__checkbox",
                checked: isChecked,
                onChange: handleCheckboxChange,
                "aria-label": t('selectPerson', {
                    name: personLabel
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Card.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "result-card__open",
                "aria-pressed": isDetailsSelected,
                "aria-label": t('viewDetails', {
                    name: personLabel
                }),
                onClick: handleOpenDetails,
                onKeyDown: handleOpenDetailsKeyDown,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "result-card__name",
                    children: name
                }, void 0, false, {
                    fileName: "[project]/src/components/Card.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Card.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Card.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(Card, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CardList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardList",
    ()=>CardList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSelectedItemsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSelectedItemsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/extractPersonId.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function CardList({ items, selectedItemId, onItemSelect }) {
    _s();
    const { items: selectedItems, toggleItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSelectedItemsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedItemsStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "card-list",
        "aria-label": "Search results",
        children: items.map((item)=>{
            const isChecked = selectedItems.some((selected)=>selected.id === item.id);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "card-list__item",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    id: item.id,
                    name: item.name,
                    isDetailsSelected: selectedItemId !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractPersonId"])(item.id) === selectedItemId,
                    isChecked: isChecked,
                    onToggleCheck: ()=>toggleItem(item),
                    onOpenDetails: onItemSelect
                }, void 0, false, {
                    fileName: "[project]/src/components/CardList.tsx",
                    lineNumber: 22,
                    columnNumber: 13
                }, this)
            }, item.id, false, {
                fileName: "[project]/src/components/CardList.tsx",
                lineNumber: 21,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/CardList.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(CardList, "aDBI/I67DszuiNX+M/NQ2F2RNO8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSelectedItemsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedItemsStore"]
    ];
});
_c = CardList;
var _c;
__turbopack_context__.k.register(_c, "CardList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LoadingIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadingIndicator",
    ()=>LoadingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LoadingIndicator() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('LoadingIndicator');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "loading-indicator",
        role: "status",
        "aria-label": t('label')
    }, void 0, false, {
        fileName: "[project]/src/components/LoadingIndicator.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(LoadingIndicator, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = LoadingIndicator;
var _c;
__turbopack_context__.k.register(_c, "LoadingIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PeoplePagination.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PeoplePagination",
    ()=>PeoplePagination
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PeoplePagination({ page, totalCount, hasNext, hasPrev, onNext, onPrev }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('PeoplePagination');
    const totalPages = Math.max(1, Math.ceil(totalCount / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SWAPI_PAGE_SIZE"]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "people-pagination",
        "aria-label": t('navLabel'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "people-pagination__btn",
                disabled: !hasPrev,
                onClick: onPrev,
                children: t('previous')
            }, void 0, false, {
                fileName: "[project]/src/components/PeoplePagination.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "people-pagination__status",
                children: t('pageStatus', {
                    page,
                    totalPages
                })
            }, void 0, false, {
                fileName: "[project]/src/components/PeoplePagination.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "people-pagination__btn",
                disabled: !hasNext,
                onClick: onNext,
                children: t('next')
            }, void 0, false, {
                fileName: "[project]/src/components/PeoplePagination.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PeoplePagination.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(PeoplePagination, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = PeoplePagination;
var _c;
__turbopack_context__.k.register(_c, "PeoplePagination");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ResultsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResultsSection",
    ()=>ResultsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CardList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CardList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadingIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PeoplePagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PeoplePagination.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ResultsSection({ items, hasSearched, isLoading, isFetching, errorMessage, onRefresh, isRefreshDisabled, pagination, selectedItemId, onItemSelect, onMainPanelClick }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('ResultsSection');
    const hasItems = items.length > 0;
    const showError = Boolean(errorMessage);
    const isBusy = isLoading || isFetching;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "results-section",
        "aria-label": t('sectionLabel'),
        "aria-busy": isBusy,
        "aria-live": "polite",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "results-section__inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "results-section__header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "results-section__title",
                            children: t('title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        onRefresh !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "results-section__refresh",
                            "aria-label": t('listRefresh'),
                            disabled: isRefreshDisabled,
                            onClick: (event)=>{
                                event.stopPropagation();
                                onRefresh();
                            },
                            children: t('listRefresh')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ResultsSection.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "results-section__content",
                    onClick: onMainPanelClick,
                    children: [
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "results-section__loading",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingIndicator"], {}, void 0, false, {
                                    fileName: "[project]/src/components/ResultsSection.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "results-section__loading-text",
                                    children: t('listLoading')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ResultsSection.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        !isLoading && !hasSearched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "results-section__placeholder",
                            children: t('initialPlaceholder')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        !isLoading && hasSearched && showError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "results-section__error",
                            role: "alert",
                            children: errorMessage
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this),
                        !isLoading && hasSearched && !showError && !hasItems && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "results-section__placeholder",
                            children: t('emptyResults')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        !isLoading && hasItems && !showError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                isFetching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "results-section__refreshing",
                                    "aria-live": "polite",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingIndicator"], {}, void 0, false, {
                                            fileName: "[project]/src/components/ResultsSection.tsx",
                                            lineNumber: 85,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "results-section__refreshing-text",
                                            children: t('listRefreshing')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsSection.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ResultsSection.tsx",
                                    lineNumber: 81,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CardList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardList"], {
                                    items: items,
                                    selectedItemId: selectedItemId,
                                    onItemSelect: onItemSelect
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ResultsSection.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        !isLoading && hasSearched && !showError && pagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (event)=>event.stopPropagation(),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PeoplePagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PeoplePagination"], {
                                page: pagination.page,
                                totalCount: pagination.totalCount,
                                hasNext: pagination.hasNext,
                                hasPrev: pagination.hasPrev,
                                onNext: pagination.onNext,
                                onPrev: pagination.onPrev
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultsSection.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsSection.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ResultsSection.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ResultsSection.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ResultsSection.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(ResultsSection, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = ResultsSection;
var _c;
__turbopack_context__.k.register(_c, "ResultsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/parsePageParam.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parsePageParam",
    ()=>parsePageParam
]);
function parsePageParam(raw) {
    if (raw === null) {
        return 1;
    }
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return 1;
    }
    return parsed;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useDetailsRouting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDetailsRouting",
    ()=>useDetailsRouting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/detailsNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildSearchParamsString.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/extractPersonId.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parsePageParam$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/parsePageParam.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function toUrlSearchParams(params) {
    return new URLSearchParams(params.toString());
}
function toAppUrl(location) {
    return `${location.pathname}${location.search}`;
}
function useDetailsRouting() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const readonlySearchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDetailsRouting.useMemo[searchParams]": ()=>toUrlSearchParams(readonlySearchParams)
    }["useDetailsRouting.useMemo[searchParams]"], [
        readonlySearchParams
    ]);
    const pageInUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parsePageParam$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePageParam"])(readonlySearchParams.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page));
    const selectedDetailsId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseDetailsParam"])(readonlySearchParams.get('details'));
    const isDetailsOpen = pathname === '/details';
    const updatePageInUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDetailsRouting.useCallback[updatePageInUrl]": (page, options)=>{
            const clearDetails = options?.clearDetails === true;
            const next = toUrlSearchParams(readonlySearchParams);
            next.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page, String(page));
            if (clearDetails) {
                next.delete('details');
            }
            if (clearDetails && pathname === '/details') {
                router.replace(toAppUrl((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeDetailsLocation"])(next)));
                return;
            }
            router.replace(`${pathname}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildSearchParamsString$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSearchParamsString"])(next)}`);
        }
    }["useDetailsRouting.useCallback[updatePageInUrl]"], [
        pathname,
        readonlySearchParams,
        router
    ]);
    const openDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDetailsRouting.useCallback[openDetails]": (personRef)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractPersonId"])(personRef);
            router.push(toAppUrl((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDetailsLocation"])(toUrlSearchParams(readonlySearchParams), id)));
        }
    }["useDetailsRouting.useCallback[openDetails]"], [
        readonlySearchParams,
        router
    ]);
    const closeDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDetailsRouting.useCallback[closeDetails]": ()=>{
            if (!isDetailsOpen) {
                return;
            }
            router.replace(toAppUrl((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeDetailsLocation"])(toUrlSearchParams(readonlySearchParams))));
        }
    }["useDetailsRouting.useCallback[closeDetails]"], [
        isDetailsOpen,
        readonlySearchParams,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDetailsRouting.useEffect": ()=>{
            const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseDetailsParam"])(readonlySearchParams.get('details'));
            const currentSearchParams = toUrlSearchParams(readonlySearchParams);
            if (details !== null && pathname === '/') {
                router.replace(toAppUrl((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detailsPanelLocation"])(currentSearchParams)));
            }
            if (details === null && pathname === '/details') {
                router.replace(toAppUrl((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["homeLocationWithSearch"])(currentSearchParams)));
            }
        }
    }["useDetailsRouting.useEffect"], [
        pathname,
        readonlySearchParams,
        router
    ]);
    return {
        pageInUrl,
        selectedDetailsId,
        isDetailsOpen,
        searchParams,
        updatePageInUrl,
        openDetails,
        closeDetails
    };
}
_s(useDetailsRouting, "Q4hV5yP/PdiZakoE0F/zXB3v0DI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/AppFetchErrorMessage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppFetchErrorMessage",
    ()=>AppFetchErrorMessage
]);
function fromUnknown(reason) {
    if (!(reason instanceof Error)) {
        return 'Something went wrong. Please try again.';
    }
    const { message, name } = reason;
    if (message === 'SWAPI_INVALID_RESPONSE') {
        return 'The server returned data in an unexpected format. Please try again later.';
    }
    if (message === 'SWAPI_INVALID_PERSON_ID') {
        return 'This person could not be loaded because the link is invalid.';
    }
    const httpMatch = /^SWAPI_HTTP_(\d{3})$/.exec(message);
    if (httpMatch) {
        const code = Number(httpMatch[1]);
        if (code >= 400 && code < 500) {
            return `The server could not fulfill this request (HTTP ${code}). Try different keywords or try again later.`;
        }
        if (code >= 500) {
            return `The service is temporarily unavailable (HTTP ${code}). Please try again in a few minutes.`;
        }
    }
    if (name === 'TypeError' || message.includes('Failed to fetch') || message.includes('NetworkError')) {
        return 'Could not reach the server. Check your connection and try again.';
    }
    return 'Something went wrong while loading data. Please try again.';
}
const AppFetchErrorMessage = {
    fromUnknown
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/rtkQueryErrorMessage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rtkQueryErrorMessage",
    ()=>rtkQueryErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$AppFetchErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/AppFetchErrorMessage.ts [app-client] (ecmascript)");
;
function rtkQueryErrorMessage(error) {
    if (error === undefined || error === null) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$AppFetchErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppFetchErrorMessage"].fromUnknown(undefined);
    }
    if (typeof error === 'object') {
        if ('error' in error && typeof error.error === 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$AppFetchErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppFetchErrorMessage"].fromUnknown(new Error(error.error));
        }
        if ('data' in error && typeof error.data === 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$AppFetchErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppFetchErrorMessage"].fromUnknown(new Error(error.data));
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$AppFetchErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppFetchErrorMessage"].fromUnknown(error);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/usePeopleList.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePeopleList",
    ()=>usePeopleList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/swapiApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$searchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/storage/searchTermStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parsePageParam$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/parsePageParam.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rtkQueryErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/rtkQueryErrorMessage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function pageFromSearchParams(searchParams) {
    return searchParams.has(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parsePageParam$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePageParam"])(searchParams.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page)) : 1;
}
function usePeopleList({ searchParams, pageInUrl, isDetailsOpen, updatePageInUrl, closeDetails }) {
    _s();
    const [listTerm, setListTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePeopleList.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$searchTermStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchTermStorage"].read()
    }["usePeopleList.useState"]);
    const [simulateCrash, setSimulateCrash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const homeMountHandledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const listQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "usePeopleList.useMemo[listQuery]": ()=>({
                term: listTerm,
                page: pageFromSearchParams(searchParams)
            })
    }["usePeopleList.useMemo[listQuery]"], [
        listTerm,
        searchParams
    ]);
    const { data, currentData, isLoading, isFetching, isError, error, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPeopleQuery"])(listQuery);
    const hasSearched = isSuccess || isError;
    const listData = isError ? undefined : data ?? currentData;
    const isListLoading = isLoading && listData === undefined;
    const isListFetching = !isError && isFetching && listData !== undefined;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePeopleList.useEffect": ()=>{
            if (homeMountHandledRef.current) {
                return;
            }
            homeMountHandledRef.current = true;
            const page = pageFromSearchParams(searchParams);
            if (!searchParams.has(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_PARAMS"].page)) {
                updatePageInUrl(page);
            }
        }
    }["usePeopleList.useEffect"], [
        searchParams,
        updatePageInUrl
    ]);
    const handleSearchInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[handleSearchInputChange]": ()=>{
            if (isDetailsOpen) {
                closeDetails();
            }
        }
    }["usePeopleList.useCallback[handleSearchInputChange]"], [
        closeDetails,
        isDetailsOpen
    ]);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[handleSearch]": async (trimmedTerm)=>{
            if (isDetailsOpen) {
                closeDetails();
            }
            if (pageInUrl !== 1) {
                updatePageInUrl(1, {
                    clearDetails: true
                });
            }
            setListTerm(trimmedTerm);
        }
    }["usePeopleList.useCallback[handleSearch]"], [
        closeDetails,
        isDetailsOpen,
        pageInUrl,
        updatePageInUrl
    ]);
    const listTotalCount = listData?.listTotalCount ?? 0;
    const totalPages = listTotalCount > 0 ? Math.ceil(listTotalCount / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SWAPI_PAGE_SIZE"]) : 0;
    const listPage = listQuery.page;
    const listHasNext = totalPages > 0 && listPage < totalPages;
    const listHasPrev = listPage > 1;
    const handlePageStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[handlePageStep]": (step)=>{
            const targetPage = pageInUrl + step;
            if (targetPage < 1 || targetPage > totalPages) {
                return;
            }
            updatePageInUrl(targetPage);
        }
    }["usePeopleList.useCallback[handlePageStep]"], [
        pageInUrl,
        totalPages,
        updatePageInUrl
    ]);
    const handlePageNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[handlePageNext]": ()=>{
            handlePageStep(1);
        }
    }["usePeopleList.useCallback[handlePageNext]"], [
        handlePageStep
    ]);
    const handlePagePrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[handlePagePrev]": ()=>{
            handlePageStep(-1);
        }
    }["usePeopleList.useCallback[handlePagePrev]"], [
        handlePageStep
    ]);
    const triggerSimulatedCrash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[triggerSimulatedCrash]": ()=>{
            setSimulateCrash(true);
        }
    }["usePeopleList.useCallback[triggerSimulatedCrash]"], []);
    const handleRefreshList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePeopleList.useCallback[handleRefreshList]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["invalidatePeopleListCache"])();
        }
    }["usePeopleList.useCallback[handleRefreshList]"], []);
    const state = {
        results: listData?.results ?? [],
        hasSearched,
        lastFetchedTerm: listTerm,
        isLoading: isListLoading,
        isFetching: isListFetching,
        errorMessage: isError ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rtkQueryErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rtkQueryErrorMessage"])(error) : null,
        listPage,
        listHasNext,
        listHasPrev,
        listTotalCount,
        simulateCrash
    };
    return {
        state,
        handleSearchInputChange,
        handleSearch,
        handlePageNext,
        handlePagePrev,
        handleRefreshList,
        triggerSimulatedCrash
    };
}
_s(usePeopleList, "3trOZmrPh2iX8QOXzdkzrJw10WU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPeopleQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/views/PersonDetailsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PersonDetailsPanel",
    ()=>PersonDetailsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadingIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/swapiApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/detailsNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/extractPersonId.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rtkQueryErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/rtkQueryErrorMessage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function PersonDetailsContent({ personId }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('PersonDetails');
    const { data: person, currentData, isLoading, isFetching, isError, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPersonQuery"])(personId);
    const displayPerson = isError ? undefined : person ?? currentData;
    const isInitialLoading = isLoading && displayPerson === undefined;
    const isBackgroundFetching = !isError && isFetching && displayPerson !== undefined;
    const errorMessage = isError ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rtkQueryErrorMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rtkQueryErrorMessage"])(error) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isInitialLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "person-details__loading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingIndicator"], {}, void 0, false, {
                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "person-details__loading-text",
                        children: t('detailsLoading')
                    }, void 0, false, {
                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            !isInitialLoading && errorMessage !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "person-details__error",
                role: "alert",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this),
            !isInitialLoading && errorMessage === null && displayPerson !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    isBackgroundFetching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "person-details__refreshing",
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingIndicator"], {}, void 0, false, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "person-details__refreshing-text",
                                children: t('detailsRefreshing')
                            }, void 0, false, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                        lineNumber: 52,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "person-details__list",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('name')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: displayPerson.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('gender')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: displayPerson.gender
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('birthYear')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: displayPerson.birth_year
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('height')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: t('heightUnit', {
                                            value: displayPerson.height
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('mass')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: t('massUnit', {
                                            value: displayPerson.mass
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('hairColor')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: displayPerson.hair_color
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('eyeColor')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: displayPerson.eye_color
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "person-details__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: t('skinColor')
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: displayPerson.skin_color
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true);
}
_s(PersonDetailsContent, "cUkJSGzTnp5cN6SOCnCcHNlM37I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPersonQuery"]
    ];
});
_c = PersonDetailsContent;
function PersonDetailsPanel() {
    _s1();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('PersonDetails');
    const readonlySearchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractPersonId$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseDetailsParam"])(readonlySearchParams.get('details'));
    const { isLoading, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPersonQuery"])(personId ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skipToken"]);
    const isRefreshDisabled = isLoading || isFetching;
    const closeDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PersonDetailsPanel.useCallback[closeDetails]": ()=>{
            const next = new URLSearchParams(readonlySearchParams.toString());
            const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$detailsNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeDetailsLocation"])(next);
            router.replace(`${location.pathname}${location.search}`);
        }
    }["PersonDetailsPanel.useCallback[closeDetails]"], [
        readonlySearchParams,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "person-details",
        "aria-label": t('sectionLabel'),
        "aria-busy": personId !== null,
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "person-details__header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "person-details__title",
                        children: t('title')
                    }, void 0, false, {
                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "person-details__actions",
                        children: [
                            personId !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "person-details__refresh",
                                "aria-label": t('detailsRefresh'),
                                disabled: isRefreshDisabled,
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["invalidatePersonCache"])(personId),
                                children: t('detailsRefresh')
                            }, void 0, false, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "person-details__close",
                                "aria-label": t('closeDetails'),
                                onClick: closeDetails,
                                children: t('close')
                            }, void 0, false, {
                                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            personId === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "person-details__placeholder",
                children: t('noPersonSelected')
            }, void 0, false, {
                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this),
            personId !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PersonDetailsContent, {
                personId: personId
            }, personId, false, {
                fileName: "[project]/src/views/PersonDetailsPanel.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/views/PersonDetailsPanel.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s1(PersonDetailsPanel, "qfkO0acjssVxR6W0VGd5vvdt6N0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$swapiApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPersonQuery"]
    ];
});
_c1 = PersonDetailsPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "PersonDetailsContent");
__turbopack_context__.k.register(_c1, "PersonDetailsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SearchPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchPage",
    ()=>SearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDetailsRouting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDetailsRouting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePeopleList$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePeopleList.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$PersonDetailsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/views/PersonDetailsPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function SearchPage() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('SearchPage');
    const { pageInUrl, selectedDetailsId, isDetailsOpen, searchParams, updatePageInUrl, openDetails, closeDetails } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDetailsRouting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDetailsRouting"])();
    const { state, handleSearchInputChange, handleSearch, handlePageNext, handlePagePrev, handleRefreshList, triggerSimulatedCrash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePeopleList$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePeopleList"])({
        searchParams,
        pageInUrl,
        isDetailsOpen,
        updatePageInUrl,
        closeDetails
    });
    const handleMainPanelClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchPage.useCallback[handleMainPanelClick]": ()=>{
            if (isDetailsOpen) {
                closeDetails();
            }
        }
    }["SearchPage.useCallback[handleMainPanelClick]"], [
        closeDetails,
        isDetailsOpen
    ]);
    const { results, hasSearched, isLoading, isFetching, errorMessage, listPage, listHasNext, listHasPrev, listTotalCount, simulateCrash } = state;
    if (simulateCrash) {
        throw new Error('Simulated application error (error boundary test)');
    }
    const showPagination = hasSearched && !isLoading && errorMessage === null && (listHasNext || listHasPrev);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchSection"], {
                onSearch: handleSearch,
                onSearchInputChange: handleSearchInputChange
            }, void 0, false, {
                fileName: "[project]/src/components/SearchPage.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: isDetailsOpen ? 'app__split app__split--open' : 'app__split',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "app__master",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsSection"], {
                            items: results,
                            hasSearched: hasSearched,
                            isLoading: isLoading,
                            isFetching: isFetching,
                            errorMessage: errorMessage,
                            onRefresh: hasSearched ? handleRefreshList : null,
                            isRefreshDisabled: isLoading || isFetching,
                            pagination: showPagination ? {
                                page: listPage,
                                totalCount: listTotalCount,
                                hasNext: listHasNext,
                                hasPrev: listHasPrev,
                                onNext: handlePageNext,
                                onPrev: handlePagePrev
                            } : null,
                            selectedItemId: selectedDetailsId,
                            onItemSelect: openDetails,
                            onMainPanelClick: handleMainPanelClick
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchPage.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchPage.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    isDetailsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "app__detail",
                        onClick: (event)=>event.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$PersonDetailsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersonDetailsPanel"], {}, void 0, false, {
                            fileName: "[project]/src/components/SearchPage.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchPage.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchPage.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "app__error-test",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "app__error-test-button",
                    onClick: triggerSimulatedCrash,
                    children: t('simulateError')
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchPage.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SearchPage.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SearchPage.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(SearchPage, "iTCv5ejFFuli2v6bJiQQPpfsJZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDetailsRouting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDetailsRouting"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePeopleList$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePeopleList"]
    ];
});
_c = SearchPage;
var _c;
__turbopack_context__.k.register(_c, "SearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1u16qne._.js.map