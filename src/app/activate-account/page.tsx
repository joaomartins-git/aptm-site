import ActivateAccountForm from '@/components/auth/ActivateAccountForm'

export default function ActivateAccountPage() {
  return (
    <main className="mx-auto max-w-md py-16">
      <h1 className="mb-8 text-3xl font-bold">
        Ativar Conta
      </h1>

      <ActivateAccountForm />
    </main>
  )
}