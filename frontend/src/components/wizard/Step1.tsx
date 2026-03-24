import { MemberType, SubmitRequest, FormErrors } from "@/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Step1Props = {
    memberTypes: MemberType[]
    formData: SubmitRequest
    errors: FormErrors
    updateField: (field: keyof SubmitRequest, value: string) => void
    onNext: () => void
    setErrors: (errors: FormErrors) => void
}

export default function Step1({ memberTypes, formData, errors, updateField, onNext, setErrors }: Step1Props) {
    function handleNext() {
        if (!formData.memberTypeId) {
            setErrors({ memberTypeId: "Please select a member type" })
            return
        }
        onNext()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select membership type</h2>

            <div className="space-y-3">
                {memberTypes.map(type => (
                    <label
                        key={type.id}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors
              ${formData.memberTypeId === type.id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"}`}
                    >
                        <input
                            type="radio"
                            name="memberType"
                            value={type.id}
                            checked={formData.memberTypeId === type.id}
                            onChange={() => updateField("memberTypeId", type.id)}
                            className="accent-black"
                        />
                        <Label>{type.name}</Label>
                    </label>
                ))}
            </div>

            {errors.memberTypeId && (
                <p className="text-red-500 text-sm">{errors.memberTypeId}</p>
            )}

            <div className="flex justify-end">
                <Button onClick={handleNext}>Next →</Button>
            </div>
        </div>
    )
}