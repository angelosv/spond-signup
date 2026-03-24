package db

import "log"

func Migrate() {
	query := `
	CREATE TABLE IF NOT EXISTS submissions (
		id             SERIAL PRIMARY KEY,
		form_id        VARCHAR(100) NOT NULL,
		member_type_id VARCHAR(100) NOT NULL,
		name           VARCHAR(255) NOT NULL,
		email          VARCHAR(255) NOT NULL,
		phone          VARCHAR(50)  NOT NULL,
		birth_date     DATE         NOT NULL,
		created_at     TIMESTAMP    DEFAULT NOW()
	);`

	if _, err := DB.Exec(query); err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Migration OK")
}