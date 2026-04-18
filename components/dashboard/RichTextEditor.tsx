"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Strikethrough,
  Underline as UnderlineIcon,
  Image as ImageIcon,
  Type,
} from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start typing...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] max-w-none p-8",
      },
    },
  });

  // Sync content if it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const MenuButton = ({ onClick, isActive, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-all ${
        isActive
          ? "bg-[#0B1221] text-white"
          : "text-[#0B1221]/40 hover:bg-gray-100 hover:text-[#0B1221]"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm focus-within:border-blue-500/50 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-4 bg-gray-50/50 border-b border-black/5">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-2" />

        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={16} />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-2" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-2" />

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-2" />

        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </MenuButton>
      </div>

      {/* Editor Content */}
      <div className="relative">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex items-center gap-1 p-1 bg-[#0B1221] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive("bold") ? "text-blue-400 bg-white/10" : "text-white/60 hover:text-white"}`}
              >
                <Bold size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive("italic") ? "text-blue-400 bg-white/10" : "text-white/60 hover:text-white"}`}
              >
                <Italic size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = window.prompt("Enter URL");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                className={`p-2 rounded-lg transition-all ${editor.isActive("link") ? "text-blue-400 bg-white/10" : "text-white/60 hover:text-white"}`}
              >
                <LinkIcon size={14} />
              </button>
            </div>
          </BubbleMenu>
        )}

        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror {
          outline: none;
        }
        .prose h1 {
          font-weight: 900;
          letter-spacing: -0.05em;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #0b1221;
        }
        .prose h2 {
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 1.8rem;
          margin-top: 2rem;
          color: #0b1221;
        }
        .prose p {
          line-height: 1.8;
          color: #0b1221;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          font-style: italic;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}
