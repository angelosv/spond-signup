package main

import (
	"log"
	"net/http"
	"backend/db"
	"backend/handlers"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	db.Init()
	db.Migrate()
	mux := http.NewServeMux()

	mux.HandleFunc("GET /form", handlers.GetForm)
	mux.HandleFunc("POST /submit", handlers.Submit)

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", corsMiddleware(mux)))
}