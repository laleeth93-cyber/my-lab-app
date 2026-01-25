// FILE: app/components/RichTextEditor.tsx
"use client";

// BLOCK IMPORTS OPEN
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="h-full flex flex-col border border-slate-300 rounded-lg overflow-hidden relative z-0">
      <Editor
        // CRITICAL: Use the CDN link. This bypasses the API Key entirely.
        tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js"
        
        value={value}
        onEditorChange={(content: string) => onChange(content)}
        init={{
          // These settings ensure it finds the CSS files it needs to work
          base_url: "https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3",
          suffix: '.min',
          
          height: '100%',
          menubar: false,
          statusbar: false,
          promotion: false, 
          branding: false, 
          
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          
          toolbar: 'undo redo | blocks | fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | table image | removeformat',
          
          content_style: 'body { font-family:Inter,sans-serif; font-size:14px }',
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
          
          placeholder: placeholder,
        }}
      />
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE