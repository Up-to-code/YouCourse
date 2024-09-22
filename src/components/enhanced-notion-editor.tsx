'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertCircle, Bold, Italic, Underline, Strikethrough, Code, Link as LinkIcon, List, ListOrdered, CheckSquare, Heading1, Heading2, Heading3 } from 'lucide-react'

// Custom extension for modern headings
const CustomHeading = StarterKit.configure({
  heading: {
    levels: [1, 2, 3],
    HTMLAttributes: {
      class: 'font-sans',
    },
  },
})

export function EnhancedNotionEditorComponent() {
  const [savedContent, setSavedContent] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [previewContent, setPreviewContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Initialize the editor
  const editor = useEditor({
    extensions: [
      CustomHeading,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: '<h1>Welcome to your Enhanced Notion-like Editor!</h1>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4',
      },
    },
  })

  // Function to save content
  const saveContent = useCallback(() => {
    if (editor) {
      try {
        const content = editor.getHTML()
        setSavedContent(content)
        // Here you would typically send the content to your database
        console.log('Content saved:', content)
        setError(null)
      } catch (err) {
        setError('Failed to save content. Please try again.')
        console.error('Error saving content:', err)
      }
    }
  }, [editor])

  // Autosave every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveContent()
    }, 30000)

    return () => clearInterval(interval)
  }, [saveContent])

  // Function to open save dialog
  const openSaveDialog = () => {
    if (editor) {
      setPreviewContent(editor.getHTML())
      setIsDialogOpen(true)
    }
  }

  // Function to handle save confirmation
  const handleSave = () => {
    saveContent()
    setIsDialogOpen(false)
  }

  // Function to add a link
  const addLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  // Function to remove a link
  const removeLink = () => {
    editor?.chain().focus().unsetLink().run()
  }

  if (!editor) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border rounded-lg mb-4 min-h-[500px] relative">
        <EditorContent editor={editor} />
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Button onClick={() => editor.chain().focus().toggleBold().run()} className="p-1">
            <Bold className="w-4 h-4" />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-1">
            <Italic className="w-4 h-4" />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleUnderline().run()} className="p-1">
            <Underline className="w-4 h-4" />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleStrike().run()} className="p-1">
            <Strikethrough className="w-4 h-4" />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleCode().run()} className="p-1">
            <Code className="w-4 h-4" />
          </Button>
          <Button onClick={addLink} className="p-1">
            <LinkIcon className="w-4 h-4" />
          </Button>
          {editor.isActive('link') && (
            <Button onClick={removeLink} className="p-1">
              Unlink
            </Button>
          )}
        </BubbleMenu>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={openSaveDialog}>Save</Button>
        <div className="text-sm text-gray-500">
          {savedContent ? 'Content autosaved!' : 'No content saved yet.'}
        </div>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="w-4 h-4 mr-1" /> H1
        </Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4 mr-1" /> H2
        </Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4 mr-1" /> H3
        </Button>
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4 mr-1" /> Bullet List
        </Button>
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4 mr-1" /> Numbered List
        </Button>
        <Button onClick={() => editor.chain().focus().toggleTaskList().run()}>
          <CheckSquare className="w-4 h-4 mr-1" /> Task List
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Content</DialogTitle>
            <DialogDescription>
              Review your content before saving:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[300px] overflow-y-auto border rounded p-4">
            <div dangerouslySetInnerHTML={{ __html: previewContent }} />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave}>Confirm Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}