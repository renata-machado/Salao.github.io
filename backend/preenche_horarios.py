from .database import get_connection, init_db

def preencher_horarios():
    init_db()
    conn = get_connection()
    c = conn.cursor()

    dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
    horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00']

    # Limpa tabela antes de preencher
    c.execute("DELETE FROM horarios")

    for dia in dias:
        for horario in horarios:
            c.execute("INSERT INTO horarios (dia, horario, disponivel) VALUES (?, ?, ?)", (dia, horario, 1))

    conn.commit()
    conn.close()
    print("Horários preenchidos com sucesso!")

if __name__ == "__main__":
    preencher_horarios()
