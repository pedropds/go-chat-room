-- SEQ DEFINITION
CREATE SEQUENCE IF NOT EXISTS membership_id_seq START 1 INCREMENT 1;

-- Create the Membership Table
CREATE TABLE IF NOT EXISTS  membership (
                            membership_id INTEGER PRIMARY KEY DEFAULT nextval('membership_id_seq'),
                            room_id INTEGER NOT NULL REFERENCES chat_room(room_id),
                            user_id INTEGER NOT NULL REFERENCES appuser(user_id),
                            joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);