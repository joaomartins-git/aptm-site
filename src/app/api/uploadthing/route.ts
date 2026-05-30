import { createUploadthing, type FileRouter } from "uploadthing/next"
import { createRouteHandler } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  paymentUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 5, },
    pdf: { maxFileSize: "32MB", maxFileCount: 5, },
  })
    .middleware(async () => {
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

//this section was missing previously, must export the handler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
})