-- SEQ DEFINITION
CREATE SEQUENCE IF NOT EXISTS appuser_id_seq START 1 INCREMENT 1;

-- Create the User Table if it does not exist
CREATE TABLE IF NOT EXISTS appuser (
    user_id INTEGER PRIMARY KEY DEFAULT nextval('appuser_id_seq'),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
