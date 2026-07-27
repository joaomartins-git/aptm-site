import CompleteProfileForm from '@/components/forms/CompleteProfileForm'
import { requireIncompleteProfile } from '@/lib/auth'

export default async function CompleteProfilePage() {
  await requireIncompleteProfile()

  return (
    <div className="mx-auto max-w-3xl py-10">

      <h1 className="text-3xl font-bold">
        Completar Perfil
      </h1>

      <p className="mt-2 text-muted-foreground">
        Antes de continuar, precisamos de algumas informações.
      </p>

      <div className="mt-8">
        <CompleteProfileForm />
      </div>

    </div>
  );
}