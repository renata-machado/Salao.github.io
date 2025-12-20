import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "../banco/horarios.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = get_connection()
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS horarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dia TEXT,
        horario TEXT,
        disponivel INTEGER
    )
    ''')
    conn.commit()
    conn.close()
