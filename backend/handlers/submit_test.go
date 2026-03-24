package handlers

import (
	"testing"
	"backend/models"
)

func TestValidateSubmit(t *testing.T) {
	tests := []struct {
		name     string
		input    models.SubmitRequest
		hasError bool
		field    string
	}{
		{
			name: "valid request",
			input: models.SubmitRequest{
				FormID:       "form123",
				MemberTypeID: "type123",
				Name:         "Jane Doe",
				Email:        "jane@example.com",
				Phone:        "+47 123 45 678",
				BirthDate:    "1990-05-20",
			},
			hasError: false,
		},
		{
			name: "missing name",
			input: models.SubmitRequest{
				FormID:       "form123",
				MemberTypeID: "type123",
				Name:         "",
				Email:        "jane@example.com",
				Phone:        "+47 123 45 678",
				BirthDate:    "1990-05-20",
			},
			hasError: true,
			field:    "name",
		},
		{
			name: "invalid email",
			input: models.SubmitRequest{
				FormID:       "form123",
				MemberTypeID: "type123",
				Name:         "Jane Doe",
				Email:        "notanemail",
				Phone:        "+47 123 45 678",
				BirthDate:    "1990-05-20",
			},
			hasError: true,
			field:    "email",
		},
		{
			name: "future birth date",
			input: models.SubmitRequest{
				FormID:       "form123",
				MemberTypeID: "type123",
				Name:         "Jane Doe",
				Email:        "jane@example.com",
				Phone:        "+47 123 45 678",
				BirthDate:    "2090-01-01",
			},
			hasError: true,
			field:    "birthDate",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			errs := validateSubmit(tt.input)
			if tt.hasError {
				if _, ok := errs[tt.field]; !ok {
					t.Errorf("expected error for field %s but got none", tt.field)
				}
			} else {
				if len(errs) > 0 {
					t.Errorf("expected no errors but got %v", errs)
				}
			}
		})
	}
}