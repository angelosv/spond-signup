"use client"

import { useEffect, useState } from "react"
import { Form } from "@/types"
import { useWizard } from "@/hooks/useWizard"
import Step1 from "@/components/wizard/Step1"
import Step2 from "@/components/wizard/Step2"
import Step3 from "@/components/wizard/Step3"
import Banner from "@/components/Banner"
import ProgressBar from "@/components/ProgressBar"

export default function Home() {
  const [formConfig, setFormConfig] = useState<Form | null>(null)
  const [loadError, setLoadError] = useState(false)
  const wizard = useWizard()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/form`)
      .then(r => r.json())
      .then((data: Form) => {
        setFormConfig(data)
        wizard.setFormData(prev => ({ ...prev, formId: data.formId }))
      })
      .catch(() => setLoadError(true))
  }, [])

  if (loadError) return (
    <main className="max-w-2xl mx-auto mt-16 px-4 md:px-8">
      <Banner type="error" message="Could not load form. Please try again later." />
    </main>
  )

  if (!formConfig) return (
    <main className="max-w-6xl mx-auto mt-16 px-4 md:px-8">
      <p className="text-gray-500">Loading...</p>
    </main>
  )

  const registrationOpen = new Date(formConfig.registrationOpens) <= new Date()

  if (!registrationOpen) return (
    <main className="max-w-2xl mx-auto mt-16 px-4 md:px-8">
      <Banner
        type="info"
        message={`Registration opens on ${new Date(formConfig.registrationOpens).toLocaleDateString()}`}
      />
    </main>
  )

  if (wizard.submitted) return (
    <main className="max-w-2xl mx-auto mt-16 px-4 md:px-8">
      <Banner type="success" message="You're registered! We'll be in touch soon." />
    </main>
  )

  return (
    <main className="w-full max-w-[600px] mx-auto mt-16 px-4" >
      <div className="bg-white border rounded-xl shadow-sm p-6 md:p-12 w-full min-h-[520px]">
        <h1 className="text-2xl font-bold mb-2">{formConfig.title}</h1>
        <p className="text-gray-500 mb-8">Complete the form below to register.</p>

        <ProgressBar current={wizard.step} total={3} />

        {wizard.step === 1 && (
          <Step1
            memberTypes={formConfig.memberTypes}
            formData={wizard.formData}
            errors={wizard.errors}
            updateField={wizard.updateField}
            onNext={wizard.nextStep}
            setErrors={wizard.setErrors}
          />
        )}
        {wizard.step === 2 && (
          <Step2
            formData={wizard.formData}
            errors={wizard.errors}
            updateField={wizard.updateField}
            onNext={wizard.nextStep}
            onBack={wizard.prevStep}
            setErrors={wizard.setErrors}
          />
        )}
        {wizard.step === 3 && (
          <Step3
            formData={wizard.formData}
            memberTypes={formConfig.memberTypes}
            errors={wizard.errors}
            loading={wizard.loading}
            onBack={wizard.prevStep}
            onSubmit={wizard.submit}
          />
        )}
      </div>
    </main>
  )
}