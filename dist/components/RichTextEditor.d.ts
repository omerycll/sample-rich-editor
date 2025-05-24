import React from 'react';
export type ToolbarItem = 'bold' | 'italic' | 'underline' | 'strike' | 'link' | 'heading' | 'unorderedList' | 'orderedList' | 'blockquote' | 'code' | 'clearFormat';
export interface RichTextEditorTheme {
    colors: {
        border: string;
        background: string;
        toolbarBackground: string;
        buttonBackground: string;
        buttonHoverBackground: string;
        buttonActiveBackground: string;
        text: string;
        buttonText: string;
        buttonHoverText: string;
        heading: string;
        link: string;
        blockquoteBackground: string;
        blockquoteBorder: string;
        codeBackground: string;
    };
    spacing: {
        toolbarPadding: string;
        contentPadding: string;
        buttonPadding: string;
        buttonGap: string;
    };
    typography: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
    };
    borderRadius: {
        editor: string;
        button: string;
        code: string;
    };
    shadows: {
        editor: string;
    };
    dimensions: {
        minHeight: string;
        buttonMinSize: string;
    };
}
export declare const defaultTheme: RichTextEditorTheme;
export interface RichTextEditorProps {
    initialContent?: string;
    onChange?: (content: string) => void;
    className?: string;
    style?: React.CSSProperties;
    theme?: Partial<RichTextEditorTheme>;
    iconSize?: number;
    toolbar?: ToolbarItem[][];
}
export declare const defaultToolbar: ToolbarItem[][];
export declare const RichTextEditor: React.FC<RichTextEditorProps>;
