'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface ApartmentImage {
  id: string
  url: string
  order: number
  isCover: boolean
}

interface ImageUploaderProps {
  apartmentId: string
  images: ApartmentImage[]
  onImagesChange: (images: ApartmentImage[]) => void
}

export default function ImageUploader({ apartmentId, images, onImagesChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to upload')
        return null
      }

      const data = await res.json()
      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      return null
    }
  }

  const saveImageToDb = async (url: string) => {
    try {
      const res = await fetch(`/api/admin/apartments/${apartmentId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, isCover: images.length === 0 }),
      })

      if (res.ok) {
        const newImage = await res.json()
        onImagesChange([...images, newImage])
      }
    } catch (error) {
      console.error('Error saving image:', error)
    }
  }

  const handleFiles = async (files: FileList) => {
    setUploading(true)

    for (const file of Array.from(files)) {
      const url = await uploadFile(file)
      if (url) {
        await saveImageToDb(url)
      }
    }

    setUploading(false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [images])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const deleteImage = async (imageId: string) => {
    if (!confirm('Удалить это фото?')) return

    try {
      const res = await fetch(`/api/admin/apartments/${apartmentId}/images?imageId=${imageId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        const newImages = images.filter(img => img.id !== imageId)
        // If deleted cover, make first image cover
        if (newImages.length > 0 && !newImages.some(img => img.isCover)) {
          newImages[0].isCover = true
        }
        onImagesChange(newImages)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const setCover = async (imageId: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isCover: img.id === imageId,
    }))

    try {
      const res = await fetch(`/api/admin/apartments/${apartmentId}/images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: updatedImages }),
      })

      if (res.ok) {
        onImagesChange(updatedImages)
      }
    } catch (error) {
      console.error('Error setting cover:', error)
    }
  }

  const moveImage = async (imageId: string, direction: 'up' | 'down') => {
    const index = images.findIndex(img => img.id === imageId)
    if (index === -1) return
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === images.length - 1) return

    const newImages = [...images]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newImages[index]
    newImages[index] = newImages[swapIndex]
    newImages[swapIndex] = temp

    // Update order values
    newImages.forEach((img, i) => {
      img.order = i
    })

    try {
      const res = await fetch(`/api/admin/apartments/${apartmentId}/images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: newImages }),
      })

      if (res.ok) {
        onImagesChange(newImages)
      }
    } catch (error) {
      console.error('Error reordering images:', error)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleInputChange}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer block"
        >
          <div className="text-4xl mb-2">
            {uploading ? '...' : '📷'}
          </div>
          <div className="text-gray-600">
            {uploading ? 'Загрузка...' : 'Перетащите фото сюда или нажмите для выбора'}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            JPEG, PNG, WebP, GIF до 5MB
          </div>
        </label>
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`
                relative group rounded-xl overflow-hidden border-2
                ${image.isCover ? 'border-blue-500' : 'border-transparent'}
              `}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.url}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Cover badge */}
              {image.isCover && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Обложка
                </div>
              )}

              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!image.isCover && (
                  <button
                    onClick={() => setCover(image.id)}
                    className="p-2 bg-white rounded-full hover:bg-blue-100 transition"
                    title="Сделать обложкой"
                  >
                    ⭐
                  </button>
                )}
                <button
                  onClick={() => moveImage(image.id, 'up')}
                  disabled={index === 0}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                  title="Переместить влево"
                >
                  ←
                </button>
                <button
                  onClick={() => moveImage(image.id, 'down')}
                  disabled={index === images.length - 1}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                  title="Переместить вправо"
                >
                  →
                </button>
                <button
                  onClick={() => deleteImage(image.id)}
                  className="p-2 bg-white rounded-full hover:bg-red-100 transition"
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center text-gray-400 py-4">
          Фотографии пока не добавлены
        </div>
      )}
    </div>
  )
}
