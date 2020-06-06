import './webslides';
import highlight from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

highlight.initHighlightingOnLoad();
highlight.registerLanguage('typescript', typescript);
