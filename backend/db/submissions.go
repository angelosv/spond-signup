package db

import "time"

type Submission struct {
	FormID       string
	MemberTypeID string
	Name         string
	Email        string
	Phone        string
	BirthDate    time.Time
}

func SaveSubmission(s Submission) error {
	query := `
	INSERT INTO submissions (form_id, member_type_id, name, email, phone, birth_date)
	VALUES ($1, $2, $3, $4, $5, $6)`

	_, err := DB.Exec(query, s.FormID, s.MemberTypeID, s.Name, s.Email, s.Phone, s.BirthDate)
	return err
}