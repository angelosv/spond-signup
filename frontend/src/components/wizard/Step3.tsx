import { MemberType, SubmitRequest, FormErrors } from "@/types"
import { Button } from "@/components/ui/button"

type Step3Props = {
    formData: SubmitRequest
    memberTypes: MemberType[]
    errors: FormErrors
    loading: boolean
    onBack: () => void
    onSubmit: () => void
}

export default function Step3({ formData, memberTypes, errors, loading, onBack, onSubmit }: Step3Props) {
    const memberType = memberTypes.find(t => t.id === formData.memberTypeId)

    const rows = [
        { label: "Member type", value: memberType?.name },
        { label: "Full name", value: formData.name },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
        { label: "Birth date", value: formData.birthDate },
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review your information</h2>

            <dl className="divide-y border rounded-lg">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex justify-between px-4 py-3">
                        <dt className="text-gray-500 text-sm">{label}</dt>
                        <dd className="font-medium text-sm">{value}</dd>
                    </div>
                ))}
            </dl>

            {errors.formId && (
                <p className="text-red-500 text-sm">{errors.formId}</p>
            )}

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack} disabled={loading}>← Back</Button>
                <Button onClick={onSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit ✓"}
                </Button>
            </div>
        </div>
    )
}