from .database import get_connection

def listar_horarios():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, dia, horario, disponivel FROM horarios")
    dados = c.fetchall()
    conn.close()
    return [
        {"id": row[0], "dia": row[1], "horario": row[2], "disponivel": bool(row[3])}
        for row in dados
    ]

def agendar_horario(dia, horario):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT disponivel FROM horarios WHERE dia=? AND horario=?", (dia, horario))
    row = c.fetchone()
    if not row:
        conn.close()
        return {"status": "erro", "mensagem": "Horário não existe"}
    if row[0] == 0:
        conn.close()
        return {"status": "erro", "mensagem": "Horário já ocupado"}
    c.execute("UPDATE horarios SET disponivel=0 WHERE dia=? AND horario=?", (dia, horario))
    conn.commit()
    conn.close()
    return {"status": "ok", "mensagem": "Horário reservado com sucesso"}
