"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Type as type, File } from 'lucide-react'
import Image from "next/image"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  maxSize?: number // in MB
  acceptedFormats?: string[]
}

export default function DragDropFileUpload({
  onFilesChange,
  maxSize = 50,
  acceptedFormats = ["image/jpeg", "image/png", "image/gif", "application/pdf"],
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [filePreviews, setFilePreviews] = useState<{ [key: number]: string }>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    processFiles(selectedFiles)
  }

  const processFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (!acceptedFormats.includes(file.type)) {
        console.warn(`File ${file.name} has unsupported format`)
        return false
      }
      if (file.size > maxSize * 1024 * 1024) {
        console.warn(`File ${file.name} exceeds max size of ${maxSize}MB`)
        return false
      }
      return true
    })

    const currentLength = files.length
    const updatedFiles = [...files, ...validFiles]

    validFiles.forEach((file, idx) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreviews((prev) => ({
            ...prev,
            [currentLength + idx]: e.target?.result as string,
          }))
        }
        reader.readAsDataURL(file)
      }
    })

    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)

    const newPreviews = { ...filePreviews }
    delete newPreviews[index]
    setFilePreviews(newPreviews)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return "🖼️"
    }
    if (file.type === "application/pdf") {
      return "📄"
    }
    return "📎"
  }

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed transition-colors p-8 text-center cursor-pointer ${
          isDragging ? "border-primary bg-primary/10" : "border-border bg-input/50 hover:border-primary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          accept={acceptedFormats.join(",")}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-2 w-full"
        >
          <Upload className="w-8 h-8 text-primary" />
          <div>
            <p className="text-foreground font-medium">Drag files here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: JPG, PNG, GIF, PDF (Max {maxSize}MB per file)
            </p>
          </div>
        </button>
      </div>

      {/* File List with Previews */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Uploaded files ({files.length})</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {filePreviews[index] ? (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-input border border-border flex-shrink-0">
                      <img
                        src={filePreviews[index] || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-input border border-border flex items-center justify-center text-xl flex-shrink-0">
                      {getFileIcon(file)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
