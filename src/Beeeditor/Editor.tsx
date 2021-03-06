// react
import React, { forwardRef } from 'react'
// third
import LexicalComposer from '@lexical/react/LexicalComposer'
import ContentEditable from '@lexical/react/LexicalContentEditable'
import { TRANSFORMERS } from '@lexical/markdown'

import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import AutoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin'
import LinkPlugin from '@lexical/react/LexicalLinkPlugin'
import ListPlugin from '@lexical/react/LexicalListPlugin'
import LexicalMarkdownShortcutPlugin from '@lexical/react/LexicalMarkdownShortcutPlugin'
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin'

import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'

// project
import GetStartPlugin from './plugins/GetStartPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import CodeLanguagePlugin from './plugins/CodeLanguagePlugin'
import { getTheme } from '.'
import './styles/index.css'
import type { EditorInstance, Props } from '../../types/beeeditor'

const Editor = forwardRef<EditorInstance, Props>((props, ref) => {
  const theme = getTheme({
    isReadonly: props.isReadonly
  })

  const editorConfig = {
    theme,

    onError(error: Error) {
      throw error
    },

    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode
    ]
  }

  const onChange = () => {}

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <>{props.children}</>
      <RichTextPlugin contentEditable={<ContentEditable className='beeeditor-input' />} placeholder={null} />
      <GetStartPlugin defaultValue={props.defaultValue} ref={ref} isReadonly={props.isReadonly} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListPlugin />
      <LinkPlugin />
      <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <LexicalOnChangePlugin onChange={onChange} />
      <CodeHighlightPlugin />
      <CodeLanguagePlugin />
    </LexicalComposer>
  )
})

export default Editor
