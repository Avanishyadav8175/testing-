'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Strikethrough,
  Subscript,
  Superscript,
  Type,
  Underline
} from 'lucide-react';
import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Synchronize editor content with value prop without causing caret jumps
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      // Only update if content is actually different to avoid unnecessary resets
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const execCommand = (command: string, cmdValue?: string) => {
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
        {/* Style selection */}
        <select
          onChange={(e) => execCommand('formatBlock', e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 outline-none"
        >
          <option value="<p>">Normal</option>
          <option value="<h1>">Heading 1</option>
          <option value="<h2>">Heading 2</option>
          <option value="<h3>">Heading 3</option>
          <option value="<pre>">Code Block</option>
        </select>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('strikeThrough')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('subscript')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Subscript"
        >
          <Subscript className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('superscript')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Superscript"
        >
          <Superscript className="h-4 w-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={insertLink}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        <div className="flex-grow" />

        <button
          type="button"
          onClick={() => execCommand('removeFormat')}
          className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
          title="Clear Formatting"
        >
          <Eraser className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Surface */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[250px] p-6 focus:outline-none prose prose-blue max-w-none text-gray-800"
        style={{ wordBreak: 'break-word' }}
        data-placeholder={placeholder || 'Start typing details here...'}
      />

      <style jsx>{`
        [contentEditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </div>
  );
}