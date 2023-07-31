-- SEQ DEFINITION
CREATE SEQUENCE IF NOT EXISTS room_id_seq START 1 INCREMENT 1;

-- Create the Chat Room Table
CREATE TABLE chat_room (
                           room_id INTEGER PRIMARY KEY DEFAULT nextval('room_id_seq'),
                           room_name VARCHAR(50) NOT NULL,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           creator_id INTEGER NOT NULL REFERENCES appuser(user_id)
);
