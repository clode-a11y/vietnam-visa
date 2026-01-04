'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'

interface Amenity {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
  icon: string
}

interface District {
  nameRu: string
  nameEn: string
  nameVi: string
}

interface ApartmentData {
  id: string
  titleRu: string
  titleEn: string
  titleVi: string
  descriptionRu: string
  descriptionEn: string
  descriptionVi: string
  priceUsd: number
  priceVnd: number
  rooms: number
  area: number
  floor: number | null
  totalFloors: number | null
  address: string
  isAvailable: boolean
  district: District
  amenities: { amenity: Amenity }[]
  images: { url: string }[]
}

interface ExportPdfButtonProps {
  apartment: ApartmentData
  locale: string
  className?: string
}

const LABELS = {
  ru: {
    export: 'Скачать PDF',
    exporting: 'Создание...',
    title: 'Квартира в аренду',
    price: 'Цена',
    perMonth: '/мес',
    district: 'Район',
    address: 'Адрес',
    rooms: 'Комнат',
    studio: 'Студия',
    area: 'Площадь',
    floor: 'Этаж',
    status: 'Статус',
    available: 'Свободна',
    occupied: 'Занята',
    description: 'Описание',
    amenities: 'Удобства',
    contact: 'Контакты для просмотра',
    website: 'Сайт',
    generated: 'Документ создан',
  },
  en: {
    export: 'Download PDF',
    exporting: 'Creating...',
    title: 'Apartment for rent',
    price: 'Price',
    perMonth: '/mo',
    district: 'District',
    address: 'Address',
    rooms: 'Rooms',
    studio: 'Studio',
    area: 'Area',
    floor: 'Floor',
    status: 'Status',
    available: 'Available',
    occupied: 'Occupied',
    description: 'Description',
    amenities: 'Amenities',
    contact: 'Contact for viewing',
    website: 'Website',
    generated: 'Document generated',
  },
  vi: {
    export: 'Tải PDF',
    exporting: 'Đang tạo...',
    title: 'Căn hộ cho thuê',
    price: 'Giá',
    perMonth: '/th',
    district: 'Quận',
    address: 'Địa chỉ',
    rooms: 'Phòng',
    studio: 'Studio',
    area: 'Diện tích',
    floor: 'Tầng',
    status: 'Tình trạng',
    available: 'Còn trống',
    occupied: 'Đã thuê',
    description: 'Mô tả',
    amenities: 'Tiện nghi',
    contact: 'Liên hệ xem nhà',
    website: 'Website',
    generated: 'Tài liệu được tạo',
  },
}

export function ExportPdfButton({ apartment, locale, className }: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const t = LABELS[locale as keyof typeof LABELS] || LABELS.en

  const getTitle = () => {
    if (locale === 'vi') return apartment.titleVi
    if (locale === 'en') return apartment.titleEn
    return apartment.titleRu
  }

  const getDescription = () => {
    if (locale === 'vi') return apartment.descriptionVi
    if (locale === 'en') return apartment.descriptionEn
    return apartment.descriptionRu
  }

  const getDistrict = () => {
    if (locale === 'vi') return apartment.district.nameVi
    if (locale === 'en') return apartment.district.nameEn
    return apartment.district.nameRu
  }

  const getAmenityName = (a: Amenity) => {
    if (locale === 'vi') return a.nameVi
    if (locale === 'en') return a.nameEn
    return a.nameRu
  }

  const generatePdf = async () => {
    setIsExporting(true)

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      const contentWidth = pageWidth - margin * 2
      let y = 20

      // Header
      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text('VietVisa.rent', margin, y)
      doc.text(t.title, pageWidth - margin, y, { align: 'right' })

      y += 15

      // Title
      doc.setFontSize(20)
      doc.setTextColor(0)
      const titleLines = doc.splitTextToSize(getTitle(), contentWidth)
      doc.text(titleLines, margin, y)
      y += titleLines.length * 8 + 5

      // Price
      doc.setFontSize(16)
      doc.setTextColor(59, 130, 246) // Blue
      doc.text(`$${apartment.priceUsd}${t.perMonth}`, margin, y)
      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text(`(${apartment.priceVnd.toLocaleString()} VND)`, margin + 50, y)

      y += 15

      // Info grid
      doc.setFontSize(11)
      doc.setTextColor(0)

      const infoItems = [
        { label: t.district, value: getDistrict() },
        { label: t.address, value: apartment.address },
        { label: t.rooms, value: apartment.rooms === 0 ? t.studio : String(apartment.rooms) },
        { label: t.area, value: `${apartment.area} m²` },
      ]

      if (apartment.floor && apartment.totalFloors) {
        infoItems.push({ label: t.floor, value: `${apartment.floor}/${apartment.totalFloors}` })
      }

      infoItems.push({
        label: t.status,
        value: apartment.isAvailable ? t.available : t.occupied
      })

      infoItems.forEach(item => {
        doc.setTextColor(100)
        doc.text(`${item.label}:`, margin, y)
        doc.setTextColor(0)
        doc.text(item.value, margin + 35, y)
        y += 7
      })

      y += 10

      // Description
      doc.setFontSize(12)
      doc.setTextColor(0)
      doc.text(t.description, margin, y)
      y += 8

      doc.setFontSize(10)
      doc.setTextColor(60)
      const descLines = doc.splitTextToSize(getDescription(), contentWidth)

      // Check if we need a new page
      if (y + descLines.length * 5 > 270) {
        doc.addPage()
        y = 20
      }

      doc.text(descLines, margin, y)
      y += descLines.length * 5 + 10

      // Amenities
      if (apartment.amenities.length > 0) {
        // Check if we need a new page
        if (y > 250) {
          doc.addPage()
          y = 20
        }

        doc.setFontSize(12)
        doc.setTextColor(0)
        doc.text(t.amenities, margin, y)
        y += 8

        doc.setFontSize(10)
        doc.setTextColor(60)

        const amenityNames = apartment.amenities.map(a => `${a.amenity.icon} ${getAmenityName(a.amenity)}`)
        const amenityText = amenityNames.join('  •  ')
        const amenityLines = doc.splitTextToSize(amenityText, contentWidth)
        doc.text(amenityLines, margin, y)
        y += amenityLines.length * 5 + 15
      }

      // Contact section
      if (y > 250) {
        doc.addPage()
        y = 20
      }

      doc.setFillColor(240, 249, 255) // Light blue background
      doc.rect(margin, y, contentWidth, 25, 'F')

      y += 8
      doc.setFontSize(11)
      doc.setTextColor(0)
      doc.text(t.contact, margin + 5, y)

      y += 7
      doc.setFontSize(10)
      doc.setTextColor(59, 130, 246)
      doc.text('Telegram: @vietvisa_rent', margin + 5, y)
      doc.text('WhatsApp: +84 xxx xxx xxx', margin + 70, y)

      y += 7
      doc.setTextColor(100)
      doc.text(`${t.website}: visa-beta-azure.vercel.app/rent/apartments/${apartment.id}`, margin + 5, y)

      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 15
      doc.setFontSize(8)
      doc.setTextColor(150)
      doc.text(`${t.generated}: ${new Date().toLocaleDateString()}`, margin, footerY)
      doc.text('VietVisa.rent', pageWidth - margin, footerY, { align: 'right' })

      // Save
      const fileName = `apartment-${apartment.id.slice(-6)}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={generatePdf}
      disabled={isExporting}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition disabled:opacity-50 ${className || ''}`}
    >
      <span>📄</span>
      {isExporting ? t.exporting : t.export}
    </button>
  )
}
