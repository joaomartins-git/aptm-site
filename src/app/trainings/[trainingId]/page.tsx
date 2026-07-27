import { notFound } from "next/navigation"
import { trainingService} from '@/lib/services/trainingService'

export default async function TrainingDetailPage({
  params
}: {
  params: Promise<{ trainingId: string }>
}) {

  const { trainingId } = await params

  const training = await trainingService.getTrainingsById(trainingId)

  if (!training) {
    notFound()
  }

  return (
    <div className="container mx-auto py-20">

      {training.imageUrl && (
        <img
          src={training.imageUrl}
          alt={training.title}
          className="w-full max-h-[500px] object-cover rounded-xl mb-8"
        />
      )}

      {/* <h1 className="text-4xl font-bold mb-4">
        {training.title}
      </h1> */}

      <p>{training.description}</p>

      <div className="mt-8 space-y-2">

        <p>
          <strong>Data:</strong>{" "}
          {training.startDate?.toLocaleDateString("pt-PT")}
        </p>

        <p>
          <strong>Local:</strong>{" "}
          {training.location}
        </p>

        <p>
          <strong>Duração:</strong>{" "}
          {training.duration}
        </p>

        <p>
          <strong>Formador:</strong>{" "}
          {training.instructor}
        </p>

        <p>
          <strong>Módulos:</strong>{" "}
          {training.modules}
        </p>

        <p>
          <strong>Formato:</strong>{" "}
          {training.format}
        </p>

        <p>
          <strong>Nível:</strong>{" "}
          {training.level}
        </p>

        <p>
          <strong>Preço:</strong>{" "}
          {training.price}
        </p>

      </div>

    {training.highlights && (
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
    )}

      {training.registrationUrl && (
        <a
          href={training.registrationUrl}
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