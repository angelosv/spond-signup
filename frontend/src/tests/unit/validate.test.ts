import { describe, it, expect } from 'vitest'
import { SubmitRequest } from '@/types'

function validate(formData: SubmitRequest) {
    const errors: Partial<Record<keyof SubmitRequest, string>> = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Enter a valid email"
    if (formData.phone.trim().length < 7) errors.phone = "Enter a valid phone number"

    const birth = new Date(formData.birthDate)
    if (!formData.birthDate || birth >= new Date()) errors.birthDate = "Enter a valid birth date"

    return errors
}

describe('validate Step2', () => {
    it('returns no errors for valid data', () => {
        const data: SubmitRequest = {
            formId: 'form123',
            memberTypeId: 'type123',
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '+47 123 45 678',
            birthDate: '1990-05-20',
        }
        expect(validate(data)).toEqual({})
    })

    it('returns error for empty name', () => {
        const data: SubmitRequest = {
            formId: 'form123',
            memberTypeId: 'type123',
            name: '',
            email: 'jane@example.com',
            phone: '+47 123 45 678',
            birthDate: '1990-05-20',
        }
        expect(validate(data)).toHaveProperty('name')
    })

    it('returns error for invalid email', () => {
        const data: SubmitRequest = {
            formId: 'form123',
            memberTypeId: 'type123',
            name: 'Jane Doe',
            email: 'notanemail',
            phone: '+47 123 45 678',
            birthDate: '1990-05-20',
        }
        expect(validate(data)).toHaveProperty('email')
    })

    it('returns error for future birth date', () => {
        const data: SubmitRequest = {
            formId: 'form123',
            memberTypeId: 'type123',
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '+47 123 45 678',
            birthDate: '2090-01-01',
        }
        expect(validate(data)).toHaveProperty('birthDate')
    })
})