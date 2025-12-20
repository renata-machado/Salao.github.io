from pydantic import BaseModel

class Agendamento(BaseModel):
    dia: str
    horario: str
