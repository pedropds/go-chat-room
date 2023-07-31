-- SEQ DEFINITION
CREATE SEQUENCE IF NOT EXISTS message_id_seq START 1 INCREMENT 1;

-- Create the Message Table
CREATE TABLE message (
                         message_id INTEGER PRIMARY KEY DEFAULT nextval('message_id_seq'),
                         room_id INTEGER NOT NULL REFERENCES chat_room(room_id),
                         user_id INTEGER NOT NULL REFERENCES appuser(user_id),
                         content TEXT NOT NULL,
                         sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);