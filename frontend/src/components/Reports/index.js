import { jsPDF } from 'jspdf';

export default async function ReportsComponent(alunos) {
 const nomes = ['jose', 'maria', 'claidson']
    const report = new jsPDF({
      orientation: 'portrait',
      unit: 'cm',
      format: 'a4'
    });

    report.setFontSize(20);
    report.setFont("times", "normal")


    report.text(4, 2, `${alunos[0]}`)

    report.save(`Lista de Participantes.pdf`);
}

