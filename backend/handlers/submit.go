package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"
	"backend/db"
	"backend/models"
)

func Submit(w http.ResponseWriter, r *http.Request) {
	var req models.SubmitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if errs := validateSubmit(req); len(errs) > 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errs)
		return
	}

	birthDate, err := time.Parse("2006-01-02", req.BirthDate)
	if err != nil {
		http.Error(w, "Invalid birth date format", http.StatusBadRequest)
		return
	}

	submission := db.Submission{
		FormID:       req.FormID,
		MemberTypeID: req.MemberTypeID,
		Name:         req.Name,
		Email:        req.Email,
		Phone:        req.Phone,
		BirthDate:    birthDate,
	}

	if err := db.SaveSubmission(submission); err != nil {
		http.Error(w, "Failed to save submission", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func validateSubmit(req models.SubmitRequest) map[string]string {
	errors := map[string]string{}

	if strings.TrimSpace(req.FormID) == "" {
		errors["formId"] = "formId is required"
	}
	if strings.TrimSpace(req.Name) == "" {
		errors["name"] = "name is required"
	}
	if !strings.Contains(req.Email, "@") {
		errors["email"] = "invalid email"
	}
	if len(strings.TrimSpace(req.Phone)) < 7 {
		errors["phone"] = "invalid phone number"
	}
	if strings.TrimSpace(req.MemberTypeID) == "" {
		errors["memberTypeId"] = "memberTypeId is required"
	}
	birth, err := time.Parse("2006-01-02", req.BirthDate)
	if err != nil || birth.After(time.Now()) {
		errors["birthDate"] = "invalid birth date"
	}

	return errors
}