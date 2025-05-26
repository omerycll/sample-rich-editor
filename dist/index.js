'use strict';

var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var BoldIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M7 5h6a3.5 3.5 0 0 1 0 7h-6z" }),
            React.createElement("path", { d: "M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" }))));
};
var ItalicIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M11 5l6 0" }),
            React.createElement("path", { d: "M7 19l6 0" }),
            React.createElement("path", { d: "M14 5l-4 14" }))));
};
var UnderlineIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M7 5v5a5 5 0 0 0 10 0v-5" }),
            React.createElement("path", { d: "M5 19h14" }))));
};
var StrikeIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M5 12l14 0" }),
            React.createElement("path", { d: "M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5" }))));
};
var LinkIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M9 15l6 -6" }),
            React.createElement("path", { d: "M11 6l.463 -.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1 -.001 7.072" }),
            React.createElement("path", { d: "M12.603 18.534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" }),
            React.createElement("path", { d: "M16 19h6" }),
            React.createElement("path", { d: "M19 16v6" }))));
};
var HeadingDropdown = function (_a) {
    var title = _a.title; _a.onClick; var _b = _a.size, size = _b === void 0 ? 24 : _b;
    var _c = React.useState(false), isOpen = _c[0], setIsOpen = _c[1];
    var dropdownRef = React.useRef(null);
    var headings = [
        { level: 'h1', label: 'Başlık 1' },
        { level: 'h2', label: 'Başlık 2' },
        { level: 'h3', label: 'Başlık 3' },
        { level: 'h4', label: 'Başlık 4' },
        { level: 'h5', label: 'Başlık 5' },
        { level: 'h6', label: 'Başlık 6' },
    ];
    React.useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    var handleHeadingSelect = function (level) {
        document.execCommand('formatBlock', false, level);
        setIsOpen(false);
    };
    return (React.createElement("div", { className: "heading-dropdown", ref: dropdownRef },
        React.createElement("button", { onClick: function () { return setIsOpen(!isOpen); }, title: title, className: "dropdown-trigger ".concat(isOpen ? 'active' : '') },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
                React.createElement("path", { d: "M7 12h10" }),
                React.createElement("path", { d: "M7 5v14" }),
                React.createElement("path", { d: "M17 5v14" }),
                React.createElement("path", { d: "M15 19h4" }),
                React.createElement("path", { d: "M15 5h4" }),
                React.createElement("path", { d: "M5 19h4" }),
                React.createElement("path", { d: "M5 5h4" }))),
        isOpen && (React.createElement("div", { className: "dropdown-menu" }, headings.map(function (heading) { return (React.createElement("button", { key: heading.level, onClick: function () { return handleHeadingSelect(heading.level); }, className: "dropdown-item" }, heading.label)); }))),
        React.createElement("style", null, "\n        .heading-dropdown {\n          position: relative;\n          display: inline-block;\n        }\n\n        .dropdown-trigger {\n          padding: 8px;\n          border: 1px solid #e2e8f0;\n          border-radius: 6px;\n          background: white;\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          color: #475569;\n          transition: all 0.2s ease;\n        }\n\n        .dropdown-trigger:hover {\n          background: #f1f5f9;\n          border-color: #e2e8f0;\n          color: #1e293b;\n        }\n\n        .dropdown-trigger.active {\n          background: #e2e8f0;\n        }\n\n        .dropdown-menu {\n          position: absolute;\n          top: 100%;\n          left: 0;\n          margin-top: 4px;\n          background: white;\n          border: 1px solid #e2e8f0;\n          border-radius: 6px;\n          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n          z-index: 1000;\n          min-width: 120px;\n        }\n\n        .dropdown-item {\n          display: block;\n          width: 100%;\n          padding: 8px 12px;\n          border: none;\n          background: none;\n          text-align: left;\n          cursor: pointer;\n          color: #475569;\n          transition: all 0.2s ease;\n        }\n\n        .dropdown-item:hover {\n          background: #f1f5f9;\n          color: #1e293b;\n        }\n      ")));
};
var UnorderedListIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M9 6l11 0" }),
            React.createElement("path", { d: "M9 12l11 0" }),
            React.createElement("path", { d: "M9 18l11 0" }),
            React.createElement("path", { d: "M5 6l0 .01" }),
            React.createElement("path", { d: "M5 12l0 .01" }),
            React.createElement("path", { d: "M5 18l0 .01" }))));
};
var OrderedListIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M11 6h9" }),
            React.createElement("path", { d: "M11 12h9" }),
            React.createElement("path", { d: "M12 18h8" }),
            React.createElement("path", { d: "M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" }),
            React.createElement("path", { d: "M6 10v-6l-2 2" }))));
};
var BlockquoteIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M6 15h15" }),
            React.createElement("path", { d: "M21 19h-15" }),
            React.createElement("path", { d: "M15 11h6" }),
            React.createElement("path", { d: "M21 7h-6" }),
            React.createElement("path", { d: "M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" }),
            React.createElement("path", { d: "M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" }))));
};
var CodeIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M15 12h.01" }),
            React.createElement("path", { d: "M12 12h.01" }),
            React.createElement("path", { d: "M9 12h.01" }),
            React.createElement("path", { d: "M6 19a2 2 0 0 1 -2 -2v-4l-1 -1l1 -1v-4a2 2 0 0 1 2 -2" }),
            React.createElement("path", { d: "M18 19a2 2 0 0 0 2 -2v-4l1 -1l-1 -1v-4a2 2 0 0 0 -2 -2" }))));
};
var ClearFormatIcon = function (_a) {
    var title = _a.title, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement("button", { onClick: onClick, title: title },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M17 15l4 4m0 -4l-4 4" }),
            React.createElement("path", { d: "M7 6v-1h11v1" }),
            React.createElement("path", { d: "M7 19l4 0" }),
            React.createElement("path", { d: "M13 5l-4 14" }))));
};

var defaultTheme = {
    colors: {
        border: '#e2e8f0',
        background: 'white',
        toolbarBackground: '#f8fafc',
        buttonBackground: 'white',
        buttonHoverBackground: '#f1f5f9',
        buttonActiveBackground: '#e2e8f0',
        text: '#1e293b',
        buttonText: '#475569',
        buttonHoverText: '#1e293b',
        heading: '#0f172a',
        link: '#2563eb',
        blockquoteBackground: '#f8fafc',
        blockquoteBorder: '#e2e8f0',
        codeBackground: '#f1f5f9',
    },
    spacing: {
        toolbarPadding: '12px',
        contentPadding: '24px',
        buttonPadding: '8px',
        buttonGap: '8px',
    },
    typography: {
        fontSize: '16px',
        lineHeight: '1.6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    borderRadius: {
        editor: '8px',
        button: '6px',
        code: '3px',
    },
    shadows: {
        editor: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    dimensions: {
        minHeight: '200px',
        buttonMinSize: '36px',
    },
};
var defaultToolbar = [
    ['bold', 'italic', 'underline', 'strike', 'link'],
    ['heading'],
    ['unorderedList', 'orderedList'],
    ['blockquote', 'code', 'clearFormat']
];
var RichTextEditor = function (_a) {
    var _b = _a.initialContent, initialContent = _b === void 0 ? '' : _b, onChange = _a.onChange, className = _a.className, style = _a.style, _c = _a.theme, theme = _c === void 0 ? {} : _c, _d = _a.iconSize, iconSize = _d === void 0 ? 24 : _d, _e = _a.toolbar, toolbar = _e === void 0 ? defaultToolbar : _e;
    var editorRef = React.useRef(null);
    var _f = React.useState(initialContent); _f[0]; var setContent = _f[1];
    var _g = React.useState(false), isInitialized = _g[0], setIsInitialized = _g[1];
    var _h = React.useState(false), isLinkModalOpen = _h[0], setIsLinkModalOpen = _h[1];
    var _j = React.useState(''), linkUrl = _j[0], setLinkUrl = _j[1];
    var _k = React.useState(null), savedSelection = _k[0], setSavedSelection = _k[1];
    var mergedTheme = __assign(__assign(__assign({}, defaultTheme), theme), { colors: __assign(__assign({}, defaultTheme.colors), theme.colors), spacing: __assign(__assign({}, defaultTheme.spacing), theme.spacing), typography: __assign(__assign({}, defaultTheme.typography), theme.typography), borderRadius: __assign(__assign({}, defaultTheme.borderRadius), theme.borderRadius), shadows: __assign(__assign({}, defaultTheme.shadows), theme.shadows), dimensions: __assign(__assign({}, defaultTheme.dimensions), theme.dimensions) });
    React.useEffect(function () {
        if (!isInitialized && editorRef.current) {
            editorRef.current.innerHTML = initialContent;
            setIsInitialized(true);
        }
    }, [initialContent, isInitialized]);
    var execCommand = function (command, value) {
        var _a;
        if (value === void 0) { value = ''; }
        document.execCommand(command, false, value);
        (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var clearFormat = function () {
        var _a, _b;
        // Önce tüm biçimlendirmeleri kaldır
        document.execCommand('removeFormat', false);
        document.execCommand('unlink', false);
        // Blok elementlerini ve başlıkları normal paragrafa çevir
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var container = range.commonAncestorContainer;
            // Seçili alanın tüm blok elementlerini bul
            var blockElements = container.nodeType === Node.ELEMENT_NODE
                ? [container]
                : Array.from(((_a = container.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('h1, h2, h3, blockquote, pre')) || []);
            blockElements.forEach(function (element) {
                var _a;
                if (element.matches('h1, h2, h3, blockquote, pre')) {
                    // Yeni bir paragraf oluştur
                    var p = document.createElement('p');
                    // İçeriği yeni paragrafa taşı
                    p.innerHTML = element.innerHTML;
                    // Eski elementi yeni paragraf ile değiştir
                    (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(p, element);
                }
            });
        }
        // Editörü güncelle
        if (editorRef.current) {
            var newContent = editorRef.current.innerHTML;
            setContent(newContent);
            onChange === null || onChange === void 0 ? void 0 : onChange(newContent);
        }
        (_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.focus();
    };
    var handleInput = function (e) {
        var newContent = e.currentTarget.innerHTML;
        setContent(newContent);
        onChange === null || onChange === void 0 ? void 0 : onChange(newContent);
    };
    var saveSelection = function () {
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            setSavedSelection(selection.getRangeAt(0).cloneRange());
        }
    };
    var restoreSelection = function () {
        if (savedSelection && editorRef.current) {
            var selection = window.getSelection();
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(savedSelection);
        }
    };
    var handleLink = function () {
        var selection = window.getSelection();
        if (selection && selection.toString()) {
            saveSelection();
            setIsLinkModalOpen(true);
        }
        else {
            alert('Lütfen bağlantı eklemek için metin seçin');
        }
    };
    var insertLink = function () {
        if (!linkUrl) {
            alert('Lütfen bir URL girin');
            return;
        }
        try {
            new URL(linkUrl);
        }
        catch (_a) {
            alert('Lütfen geçerli bir URL girin');
            return;
        }
        if (savedSelection && editorRef.current) {
            // Seçimi geri yükle
            restoreSelection();
            // Link oluştur
            var link = document.createElement('a');
            link.href = linkUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            // Seçili metni link içine al
            savedSelection.surroundContents(link);
            // Editörü güncelle
            var newContent = editorRef.current.innerHTML;
            setContent(newContent);
            onChange === null || onChange === void 0 ? void 0 : onChange(newContent);
            // Temizlik
            setLinkUrl('');
            setIsLinkModalOpen(false);
            setSavedSelection(null);
            // Editöre focus'u geri ver
            editorRef.current.focus();
        }
    };
    var handleKeyDown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            insertLink();
        }
        else if (e.key === 'Escape') {
            setIsLinkModalOpen(false);
            setLinkUrl('');
            setSavedSelection(null);
        }
    };
    var renderToolbarButton = function (item) {
        switch (item) {
            case 'bold':
                return React.createElement(BoldIcon, { onClick: function () { return execCommand('bold'); }, title: "Bold", size: iconSize });
            case 'italic':
                return React.createElement(ItalicIcon, { onClick: function () { return execCommand('italic'); }, title: "Italic", size: iconSize });
            case 'underline':
                return React.createElement(UnderlineIcon, { onClick: function () { return execCommand('underline'); }, title: "Underline", size: iconSize });
            case 'strike':
                return React.createElement(StrikeIcon, { onClick: function () { return execCommand('strikeThrough'); }, title: "Strikethrough", size: iconSize });
            case 'link':
                return React.createElement(LinkIcon, { onClick: handleLink, title: "Link", size: iconSize });
            case 'heading':
                return React.createElement(HeadingDropdown, { title: "Ba\u015Fl\u0131k", size: iconSize });
            case 'unorderedList':
                return React.createElement(UnorderedListIcon, { onClick: function () { return execCommand('insertUnorderedList'); }, title: "Unordered List", size: iconSize });
            case 'orderedList':
                return React.createElement(OrderedListIcon, { onClick: function () { return execCommand('insertOrderedList'); }, title: "Ordered List", size: iconSize });
            case 'blockquote':
                return React.createElement(BlockquoteIcon, { onClick: function () { return execCommand('formatBlock', 'blockquote'); }, title: "Blockquote", size: iconSize });
            case 'code':
                return React.createElement(CodeIcon, { onClick: function () { return execCommand('formatBlock', 'pre'); }, title: "Code Block", size: iconSize });
            case 'clearFormat':
                return React.createElement(ClearFormatIcon, { onClick: clearFormat, title: "Clear Format", size: iconSize });
        }
    };
    return (React.createElement("div", { className: "simple-rich-editor ".concat(className || ''), style: style },
        React.createElement("div", { className: "simple-rich-editor-toolbar" },
            React.createElement("div", { className: "toolbar-container" }, toolbar.map(function (group, groupIndex) { return (React.createElement("div", { key: groupIndex, className: "toolbar-group" }, group.map(function (item, itemIndex) { return (React.createElement(React.Fragment, { key: "".concat(groupIndex, "-").concat(itemIndex) }, renderToolbarButton(item))); }))); })),
            isLinkModalOpen && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "link-modal-overlay", onClick: function () {
                        setIsLinkModalOpen(false);
                        setLinkUrl('');
                    } }),
                React.createElement("div", { className: "link-modal" },
                    React.createElement("div", { className: "link-modal-header" },
                        React.createElement("h3", null, "Ba\u011Flant\u0131 Ekle"),
                        React.createElement("button", { className: "close-button", onClick: function () {
                                setIsLinkModalOpen(false);
                                setLinkUrl('');
                            } }, "\u00D7")),
                    React.createElement("div", { className: "link-modal-content" },
                        React.createElement("input", { type: "text", value: linkUrl, onChange: function (e) { return setLinkUrl(e.target.value); }, onKeyDown: handleKeyDown, placeholder: "https://example.com", autoFocus: true }),
                        React.createElement("div", { className: "link-modal-actions" },
                            React.createElement("button", { onClick: function () {
                                    setIsLinkModalOpen(false);
                                    setLinkUrl('');
                                } }, "\u0130ptal"),
                            React.createElement("button", { onClick: insertLink, className: "primary" }, "Ekle"))))))),
        React.createElement("div", { ref: editorRef, contentEditable: true, className: "simple-rich-editor-content", onInput: handleInput }),
        React.createElement("style", null, "\n        .simple-rich-editor {\n          border: 1px solid ".concat(mergedTheme.colors.border, ";\n          border-radius: ").concat(mergedTheme.borderRadius.editor, ";\n          overflow: visible;\n          box-shadow: ").concat(mergedTheme.shadows.editor, ";\n          background: ").concat(mergedTheme.colors.background, ";\n        }\n\n        .simple-rich-editor-toolbar {\n          padding: ").concat(mergedTheme.spacing.toolbarPadding, ";\n          background: ").concat(mergedTheme.colors.toolbarBackground, ";\n          border-bottom: 1px solid ").concat(mergedTheme.colors.border, ";\n          position: relative;\n        }\n\n        .toolbar-container {\n          display: flex;\n          gap: ").concat(mergedTheme.spacing.buttonGap, ";\n          flex-wrap: wrap;\n        }\n\n        .toolbar-group {\n          display: flex;\n          gap: ").concat(mergedTheme.spacing.buttonGap, ";\n          padding-right: ").concat(mergedTheme.spacing.buttonGap, ";\n          border-right: 1px solid ").concat(mergedTheme.colors.border, ";\n        }\n\n        .toolbar-group:last-child {\n          border-right: none;\n          padding-right: 0;\n        }\n\n        .simple-rich-editor-toolbar button {\n          padding: ").concat(mergedTheme.spacing.buttonPadding, ";\n          border: 1px solid ").concat(mergedTheme.colors.border, ";\n          border-radius: ").concat(mergedTheme.borderRadius.button, ";\n          background: ").concat(mergedTheme.colors.buttonBackground, ";\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          color: ").concat(mergedTheme.colors.buttonText, ";\n          transition: all 0.2s ease;\n          min-width: ").concat(mergedTheme.dimensions.buttonMinSize, ";\n          min-height: ").concat(mergedTheme.dimensions.buttonMinSize, ";\n        }\n\n        .simple-rich-editor-toolbar button:hover {\n          background: ").concat(mergedTheme.colors.buttonHoverBackground, ";\n          border-color: ").concat(mergedTheme.colors.border, ";\n          color: ").concat(mergedTheme.colors.buttonHoverText, ";\n        }\n\n        .simple-rich-editor-toolbar button:active {\n          background: ").concat(mergedTheme.colors.buttonActiveBackground, ";\n          transform: translateY(1px);\n        }\n\n        .link-modal-overlay {\n          position: fixed;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          background: rgba(0, 0, 0, 0.5);\n          z-index: 999;\n        }\n\n        .link-modal {\n          position: fixed;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          background: white;\n          border-radius: ").concat(mergedTheme.borderRadius.editor, ";\n          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n          border: 1px solid ").concat(mergedTheme.colors.border, ";\n          z-index: 1000;\n          width: 400px;\n          max-width: calc(100vw - 32px);\n          max-height: calc(100vh - 32px);\n          display: flex;\n          flex-direction: column;\n        }\n\n        .link-modal-header {\n          display: flex;\n          justify-content: space-between;\n          align-items: center;\n          padding: 16px;\n          border-bottom: 1px solid ").concat(mergedTheme.colors.border, ";\n          flex-shrink: 0;\n        }\n\n        .link-modal-header h3 {\n          margin: 0;\n          font-size: 1.1em;\n          color: ").concat(mergedTheme.colors.heading, ";\n        }\n\n        .link-modal-header .close-button {\n          background: none;\n          border: none;\n          font-size: 24px;\n          cursor: pointer;\n          padding: 0;\n          width: 32px;\n          height: 32px;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          color: ").concat(mergedTheme.colors.buttonText, ";\n          border-radius: 50%;\n        }\n\n        .link-modal-header .close-button:hover {\n          background: ").concat(mergedTheme.colors.buttonHoverBackground, ";\n        }\n\n        .link-modal-content {\n          padding: 16px;\n          overflow-y: auto;\n          flex-grow: 1;\n        }\n\n        .link-modal-content input {\n          width: 100%;\n          padding: 8px 12px;\n          border: 1px solid ").concat(mergedTheme.colors.border, ";\n          border-radius: ").concat(mergedTheme.borderRadius.button, ";\n          font-size: 14px;\n          margin-bottom: 16px;\n          box-sizing: border-box;\n        }\n\n        .link-modal-content input:focus {\n          outline: none;\n          border-color: ").concat(mergedTheme.colors.link, ";\n          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);\n        }\n\n        .link-modal-actions {\n          display: flex;\n          justify-content: flex-end;\n          gap: 8px;\n          padding: 16px;\n          border-top: 1px solid ").concat(mergedTheme.colors.border, ";\n          flex-shrink: 0;\n        }\n\n        .link-modal-actions button {\n          padding: 8px 16px;\n          border: 1px solid ").concat(mergedTheme.colors.border, ";\n          border-radius: ").concat(mergedTheme.borderRadius.button, ";\n          background: ").concat(mergedTheme.colors.buttonBackground, ";\n          cursor: pointer;\n          font-size: 14px;\n        }\n\n        .link-modal-actions button.primary {\n          background: ").concat(mergedTheme.colors.link, ";\n          color: white;\n          border-color: ").concat(mergedTheme.colors.link, ";\n        }\n\n        .link-modal-actions button:hover {\n          background: ").concat(mergedTheme.colors.buttonHoverBackground, ";\n        }\n\n        .link-modal-actions button.primary:hover {\n          background: #1d4ed8;\n        }\n\n        .simple-rich-editor-content {\n          min-height: ").concat(mergedTheme.dimensions.minHeight, ";\n          padding: ").concat(mergedTheme.spacing.contentPadding, ";\n          outline: none;\n          color: ").concat(mergedTheme.colors.text, ";\n          line-height: ").concat(mergedTheme.typography.lineHeight, ";\n          font-size: ").concat(mergedTheme.typography.fontSize, ";\n          font-family: ").concat(mergedTheme.typography.fontFamily, ";\n        }\n\n        .simple-rich-editor-content:focus {\n          outline: none;\n        }\n\n        .simple-rich-editor-content p {\n          margin: 0 0 1em 0;\n        }\n\n        .simple-rich-editor-content ul,\n        .simple-rich-editor-content ol {\n          margin: 0 0 1em 1.5em;\n          padding: 0;\n        }\n\n        .simple-rich-editor-content ul li,\n        .simple-rich-editor-content ol li {\n          margin: 0.5em 0;\n        }\n\n        .simple-rich-editor-content h1,\n        .simple-rich-editor-content h2,\n        .simple-rich-editor-content h3,\n        .simple-rich-editor-content h4,\n        .simple-rich-editor-content h5,\n        .simple-rich-editor-content h6 {\n          margin: 1.5em 0 0.5em 0;\n          color: ").concat(mergedTheme.colors.heading, ";\n        }\n\n        .simple-rich-editor-content a {\n          color: ").concat(mergedTheme.colors.link, ";\n          text-decoration: none;\n        }\n\n        .simple-rich-editor-content a:hover {\n          text-decoration: underline;\n        }\n\n        .simple-rich-editor-content blockquote {\n          margin: 1em 0;\n          padding: 0.5em 1em;\n          border-left: 4px solid ").concat(mergedTheme.colors.blockquoteBorder, ";\n          background: ").concat(mergedTheme.colors.blockquoteBackground, ";\n          color: ").concat(mergedTheme.colors.text, ";\n        }\n\n        .simple-rich-editor-content pre {\n          margin: 1em 0;\n          padding: 1em;\n          background: ").concat(mergedTheme.colors.blockquoteBackground, ";\n          border-radius: ").concat(mergedTheme.borderRadius.editor, ";\n          overflow-x: auto;\n        }\n\n        .simple-rich-editor-content code {\n          font-family: monospace;\n          background: ").concat(mergedTheme.colors.codeBackground, ";\n          padding: 0.2em 0.4em;\n          border-radius: ").concat(mergedTheme.borderRadius.code, ";\n          font-size: 0.9em;\n        }\n      "))));
};

exports.RichTextEditor = RichTextEditor;
//# sourceMappingURL=index.js.map
