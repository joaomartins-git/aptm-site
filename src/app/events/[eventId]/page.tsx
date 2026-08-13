import { notFound } from "next/navigation"
import { eventService} from '@/lib/services/eventService'

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ eventId: string }>
}) {

  const { eventId } = await params

  const event = await eventService.getEventById(eventId)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto py-20">

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full max-h-[500px] object-cover rounded-xl mb-8"
        />
      )}

      {/* <h1 className="text-4xl font-bold mb-4">
        {training.title}
      </h1> */}

      <p>{event.description}</p>

      <div className="mt-8 space-y-2">

        <p>
          <strong>Data:</strong>{" "}
          {event.startDate?.toLocaleDateString("pt-PT")}
        </p>

        <p>
          <strong>Local:</strong>{" "}
          {event.location}
        </p>

        <p>
          <strong>Duração:</strong>{" "}
          {event.duration}
        </p>

        <p>
          <strong>Formador:</strong>{" "}
          {event.speaker}
        </p>

        <p>
          <strong>Tipo:</strong>{" "}
          {event.type}
        </p>

        <p>
          <strong>Nível:</strong>{" "}
          {event.level}
        </p>

        <p>
          <strong>Preço:</strong>{" "}
          {event.price}
        </p>

      </div>

    {/* {training.highlights && (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Destaques
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          {training.highlights
            .split("|")
            .map((item, index) => (
              <li key={index}>
                {item}
              </li>
          ))}
        </ul>
      </div>
    )} */}

      {event.registrationUrl && (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Inscrever-se
        </a>
      )}
    </div>
  )
}