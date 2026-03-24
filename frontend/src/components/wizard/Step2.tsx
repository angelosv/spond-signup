import { SubmitRequest, FormErrors } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Step2Props = {
    formData: SubmitRequest
    errors: FormErrors
    updateField: (field: keyof SubmitRequest, value: string) => void
    onNext: () => void
    onBack: () => void
    setErrors: (errors: FormErrors) => void
}

function validate(formData: SubmitRequest): FormErrors {
    const errors: FormErrors = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Enter a valid email"
    if (formData.phone.trim().length < 7) errors.phone = "Enter a valid phone number"

    const birth = new Date(formData.birthDate)
    if (!formData.birthDate || birth >= new Date()) errors.birthDate = "Enter a valid birth date"

    return errors
}

export default function Step2({ formData, errors, updateField, onNext, onBack, setErrors }: Step2Props) {
    function handleNext() {
        const errs = validate(formData)
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        onNext()
    }

    const fields: { key: keyof SubmitRequest; label: string; type: string }[] = [
        { key: "name", label: "Full name", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone number", type: "tel" },
        { key: "birthDate", label: "Date of birth", type: "date" },
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your information</h2>

            <div className="space-y-4">
                {fields.map(({ key, label, type }) => (
                    <div key={key} className="space-y-1">
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                            id={key}
                            type={type}
                            value={formData[key]}
                            onChange={e => updateField(key, e.target.value)}
                            className={errors[key] ? "border-red-500" : ""}
                        />
                        {errors[key] && (
                            <p className="text-red-500 text-sm">{errors[key]}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>← Back</Button>
                <Button onClick={handleNext}>Next →</Button>
            </div>
        </div>
    )
}