import { useState } from "react"
import { Form, SubmitRequest, FormErrors } from "@/types"

const INITIAL_DATA: SubmitRequest = {
    formId: "",
    memberTypeId: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
}

export function useWizard() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<SubmitRequest>(INITIAL_DATA)
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    function updateField(field: keyof SubmitRequest, value: string) {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    async function submit() {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Submit failed")
            setSubmitted(true)
        } catch {
            setErrors({ formId: "Something went wrong. Please try again." })
        } finally {
            setLoading(false)
        }
    }

    return {
        step,
        formData,
        errors,
        submitted,
        loading,
        updateField,
        nextStep: () => setStep(p => p + 1),
        prevStep: () => setStep(p => p - 1),
        submit,
        setErrors,
        setFormData,
    }
}