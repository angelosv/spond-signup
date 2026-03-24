package models

type MemberType struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Form struct {
	ClubID            string       `json:"clubId"`
	MemberTypes       []MemberType `json:"memberTypes"`
	FormID            string       `json:"formId"`
	Title             string       `json:"title"`
	RegistrationOpens string       `json:"registrationOpens"`
}

type SubmitRequest struct {
	FormID       string `json:"formId"`
	MemberTypeID string `json:"memberTypeId"`
	Name         string `json:"name"`
	Email        string `json:"email"`
	Phone        string `json:"phone"`
	BirthDate    string `json:"birthDate"`
}