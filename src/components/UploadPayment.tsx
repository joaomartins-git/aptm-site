"use client"

import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/route"

type Props = {
  onUpload: (urls: string[]) => void
  // multiple?: boolean
}

export default function UploadPayment({
  onUpload,
  // multiple = false
}: Props) {
  return (
    <UploadButton<OurFileRouter, "paymentUploader">
      endpoint="paymentUploader"
      // multiple={multiple}
      onClientUploadComplete={(res) => {
        const urls = res.map((file) => file.url)

        onUpload(urls)
      }}
      onUploadError={(error: Error) => {
        alert(`Upload failed: ${error.message}`)
      }}
    />
  )
}