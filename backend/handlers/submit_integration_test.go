package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSubmitInvalidData(t *testing.T) {
	body, _ := json.Marshal(map[string]string{
		"formId":       "",
		"memberTypeId": "",
		"name":         "",
		"email":        "notanemail",
		"phone":        "123",
		"birthDate":    "2090-01-01",
	})

	req := httptest.NewRequest(http.MethodPost, "/submit", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	Submit(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400 but got %d", w.Code)
	}
}

func TestSubmitEmptyBody(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/submit", bytes.NewBuffer([]byte{}))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	Submit(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400 but got %d", w.Code)
	}
}