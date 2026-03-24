package handlers

import (
	"encoding/json"
	"net/http"
	"backend/models"
)

func GetForm(w http.ResponseWriter, r *http.Request) {
	form := models.Form{
		ClubID: "britsport",
		MemberTypes: []models.MemberType{
			{ID: "8FE4113D4E4020E0DCF887803A886981", Name: "Active Member"},
			{ID: "4237C55C5CC3B4B082CBF2540612778E", Name: "Social Member"},
		},
		FormID:            "B171388180BC457D9887AD92B6CCFC86",
		Title:             "Coding camp summer 2025",
		RegistrationOpens: "2024-12-16T00:00:00Z",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(form)
}