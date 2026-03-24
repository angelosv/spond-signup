export type MemberType = {
    id: string
    name: string
}

export type Form = {
    clubId: string
    formId: string
    title: string
    registrationOpens: string
    memberTypes: MemberType[]
}

export type SubmitRequest = {
    formId: string
    memberTypeId: string
    name: string
    email: string
    phone: string
    birthDate: string
}

export type FormErrors = Partial<Record<keyof SubmitRequest, string>>