package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"backend/models"
)

func TestGetForm(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/form", nil)
	w := httptest.NewRecorder()

	GetForm(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200 but got %d", w.Code)
	}

	var form models.Form
	if err := json.NewDecoder(w.Body).Decode(&form); err != nil {
		t.Fatalf("could not decode response: %v", err)
	}

	if form.ClubID != "britsport" {
		t.Errorf("expected clubId 'britsport' but got '%s'", form.ClubID)
	}

	if len(form.MemberTypes) != 2 {
		t.Errorf("expected 2 member types but got %d", len(form.MemberTypes))
	}
}