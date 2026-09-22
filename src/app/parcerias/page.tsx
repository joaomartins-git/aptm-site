import Image from "next/image"
import Link from "next/link"
import { partnerships } from "@/data/partnerships"

export default function PartnershipsPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 pt-32 pb-20">
      {/* Header */}
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Parcerias e Colaborações
        </h1>

        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          A APTM valoriza a colaboração com entidades e organizações
          relacionadas com a Terapia da Mão e com o desenvolvimento dos
          profissionais da área.
        </p>
      </section>

      {/* Partnerships */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerships.map((partnership) => (
            <article
              key={partnership.name}
              className="group flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Logo */}
              <div className="flex h-52 items-center justify-center bg-white p-8">
                <Image
                  src={partnership.logoUrl}
                  alt={`Logótipo ${partnership.name}`}
                  width={320}
                  height={180}
                  className="max-h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold">
                  {partnership.name}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {partnership.description}
                </p>

                {partnership.websiteUrl && (
                  <div className="mt-auto pt-6">
                    <Link
                      href={partnership.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Visitar website →
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}