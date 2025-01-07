-- SEQ DEFINITION
CREATE SEQUENCE IF NOT EXISTS friendship_request_id_seq START 1 INCREMENT 1;

-- Create the Friendship Request Table
CREATE TABLE IF NOT EXISTS  friendship_requests (
                                     request_id INTEGER PRIMARY KEY DEFAULT nextval('message_id_seq'),
                                     sender_id INTEGER NOT NULL REFERENCES appuser(user_id),
                                     receiver_id INTEGER NOT NULL REFERENCES appuser(user_id),
                                     status VARCHAR(50) NOT NULL, -- Status can be "pending," "accepted," or "rejected"
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);