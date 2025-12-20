from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import Agendamento
from . import crud

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/horarios")
def get_horarios():
    return crud.listar_horarios()

@app.post("/agendar")
def post_agendamento(a: Agendamento):
    return crud.agendar_horario(a.dia, a.horario)
