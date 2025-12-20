document.addEventListener('DOMContentLoaded', () => {
  const calendarDates = document.querySelector('.calendar-dates');

  if (!calendarDates) {
    console.error('Elemento .calendar-dates não encontrado');
    return; // agora é VÁLIDO
  }

  async function gerarCalendario() {
    const res = await fetch('http://127.0.0.1:8000/horarios');
    const dados = await res.json();

    const dias = calendarDates.querySelectorAll('div');
    dias.forEach(dia => dia.classList.remove('disponivel', 'selected'));

    const diasDisponiveis = [...new Set(
      dados.filter(h => h.disponivel).map(h => String(h.dia))
    )];

    dias.forEach(div => {
      if (diasDisponiveis.includes(div.textContent.trim())) {
        div.classList.add('disponivel');

        div.addEventListener('click', () => {
          dias.forEach(d => d.classList.remove('selected'));
          div.classList.add('selected');
          console.log('Dia selecionado:', div.textContent);
        });
      }
    });
  }

  gerarCalendario();
});
