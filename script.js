let monthChanger = 0;
const calendar = document.querySelector('.calendar__body');
const navTitle = document.querySelector('.header__nav__title');
generateCalendar();

function generateCalendar() {
    const date = new Date;
    if (monthChanger != 0) {
        date.setDate(1);
        // Definir o dia para 1 evita que o código pule meses
        // em casos onde o dia atual (ex: 31) não exista nos meses adjacentes,
        // fazendo os meses serem pulados até um mês compatível com 31 dias.
        date.setMonth(date.getMonth() + monthChanger);
    }

    const dayToday = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = date.toLocaleString('pt-br', { month: 'long' });
    const year = date.getFullYear();

    // Primeiro dia da semana (domingo == 0)
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    // Total de dias no mês
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    // Altera o título do mês
    navTitle.textContent = `${monthName} ${year}`;

    calendar.innerHTML = ''; // Limpa o corpo do calendário
    const totalCells = firstWeekday + daysInMonth;

    let daysInPrevMonth = date;
    daysInPrevMonth.setDate(0);
    let dayValue = '';
    let cellCount = 1;
    while (cellCount <= totalCells) {
        const newRow = document.createElement('tr');

        // Loop interno para 7 colunas
        for (let weekDays = 1; weekDays <= 7; weekDays++) {
            // Cria a célula
            const newCell = document.createElement('td');
            newCell.classList.add('calendar__body__cell');

            if (cellCount <= firstWeekday) {
                // Dias do mês anterior
                dayValue = (daysInPrevMonth.getDate() - firstWeekday) + cellCount;
                newCell.classList.add('calendar__body__cell--preview');
            }
            else if (cellCount > firstWeekday && cellCount <= totalCells) {
                // Dias do mês atual
                dayValue = cellCount - firstWeekday;
                if (dayValue == dayToday && monthChanger == 0) {
                    newCell.classList.add('calendar__body__cell--today');
                }
            } else {
                // Dias do mês seguinte
                dayValue = cellCount - totalCells;
                newCell.classList.add('calendar__body__cell--preview');
            }
            newCell.innerHTML = `<p>${dayValue}</p>`;
            newRow.appendChild(newCell);
            cellCount++;
        }
        calendar.appendChild(newRow);
    }
}

function alterMonth(changeNum) {
    monthChanger += changeNum;
    generateCalendar();
}
