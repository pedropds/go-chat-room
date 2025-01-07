-- SEQ DEFINITION
CREATE SEQUENCE IF NOT EXISTS friendship_id_seq START 1 INCREMENT 1;

-- Create the Friendship Table
CREATE TABLE IF NOT EXISTS  friendships (
                             friendship_id INTEGER PRIMARY KEY DEFAULT nextval('friendship_id_seq'),
                             user1_id INTEGER NOT NULL REFERENCES appuser(user_id),
                             user2_id INTEGER NOT NULL REFERENCES appuser(user_id),
                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             UNIQUE (user1_id, user2_id) -- Ensures that friendships are unique (no duplicates)
);
