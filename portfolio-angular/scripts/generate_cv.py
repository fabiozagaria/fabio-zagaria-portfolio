from pathlib import Path

from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_PATH = PROJECT_DIR / "src" / "assets" / "documents" / "CV.pdf"

W, H = 595.276, 841.89
LEFT, RIGHT, TOP = 44, 44, 42
BLUE = (0.075, 0.266, 0.459)
INK = (0.08, 0.10, 0.13)
MUTED = (0.34, 0.38, 0.42)


def wrap(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def build_cv() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT_PATH), pagesize=(W, H))
    pdf.setTitle("CV Fabio Zagaria - Junior Backend Developer")
    pdf.setAuthor("Fabio Zagaria")
    pdf.setSubject("Curriculum Vitae")
    pdf.setKeywords("Java, Spring Boot, Angular, MySQL, Junior Backend Developer")

    def text(x: float, y: float, value: str, font: str = "F1", size: float = 9, rgb=INK) -> None:
        pdf.setFillColorRGB(*rgb)
        pdf.setFont(font_names[font], size)
        pdf.drawString(x, y, value)

    font_names = {
        "F1": "Helvetica",
        "F2": "Helvetica-Bold",
        "F3": "Helvetica-Oblique",
        "F4": "Helvetica-BoldOblique",
    }

    def centered(y: float, value: str, font: str, size: float, rgb) -> None:
        x = (W - stringWidth(value, font_names[font], size)) / 2
        text(x, y, value, font, size, rgb)

    def segments(x: float, y: float, values: list[tuple[str, str, tuple]], size: float) -> None:
        current_x = x
        for value, font, rgb in values:
            text(current_x, y, value, font, size, rgb)
            current_x += stringWidth(value, font_names[font], size)

    y = H - TOP
    centered(y, "Fabio Zagaria", "F2", 21.0, INK)
    y -= 21
    centered(y, "Junior Backend Developer | Full Stack Developer", "F2", 11.6, BLUE)
    y -= 14
    centered(
        y,
        "Roma | +39 366 719 1008 | fabiozagaria@proton.me | Patente B",
        "F1",
        8.8,
        INK,
    )
    y -= 12
    centered(
        y,
        "fabio-zagaria-portfolio.vercel.app | github.com/fabiozagaria | linkedin.com/in/fabiozagaria",
        "F1",
        7.9,
        BLUE,
    )
    y -= 19

    def section(title: str) -> None:
        nonlocal y
        text(LEFT, y, title, "F2", 11.7, BLUE)
        y -= 16.5

    def paragraph(value: str, size: float = 10.2, leading: float = 12.2) -> None:
        nonlocal y
        for current in wrap(value, "Helvetica", size, W - LEFT - RIGHT):
            text(LEFT, y, current, "F1", size, INK)
            y -= leading
        y -= 2.0

    def bullet(value: str, size: float = 9.75, leading: float = 11.7) -> None:
        nonlocal y
        lines = wrap(value, "Helvetica", size, W - LEFT - RIGHT - 12)
        for index, current in enumerate(lines):
            prefix = "- " if index == 0 else "  "
            text(LEFT + 2, y, prefix + current, "F1", size, INK)
            y -= leading
        y -= 0.7

    def skill_line(label: str, value: str) -> None:
        nonlocal y
        segments(
            LEFT,
            y,
            [(label + ":", "F2", INK), (" " + value, "F1", INK)],
            9.9,
        )
        y -= 12.0

    section("PROFILO PROFESSIONALE")
    paragraph(
        "Junior Backend Developer con formazione Full Stack Web di 650 ore, orientato a Java e Spring Boot. "
        "Sviluppo API REST e applicazioni full stack con MySQL, JPA/Hibernate, Angular e TypeScript, con attenzione "
        "a validazione, sicurezza, gestione degli errori e separazione dei layer. Porto inoltre oltre cinque anni "
        "di esperienza operativa al Policlinico Gemelli, in un contesto con priorità variabili e lavoro sotto pressione."
    )

    section("COMPETENZE TECNICHE")
    skill_line("Backend", "Java 21, Spring Boot, Spring MVC, Spring Security, JWT, API REST, Maven")
    skill_line("Database", "MySQL, JPA/Hibernate, Spring Data JPA, EntityManager, transazioni")
    skill_line("Frontend", "TypeScript, JavaScript, Angular 21, Signals, Reactive Forms, HTML5, CSS3")
    skill_line("Pratiche e strumenti", "Git, GitHub, Postman, DTO, Bean Validation, exception handling, architettura a layer")
    y -= 2

    section("PROGETTI")
    segments(
        LEFT,
        y,
        [
            ("Expense Tracker - In verifica", "F2", BLUE),
            (" | Java 21, Spring Boot, Angular 21, MySQL, JPA/Hibernate", "F3", MUTED),
        ],
        9.95,
    )
    y -= 11
    bullet(
        "Applicazione full stack per gestire spese personali, con frontend Angular collegato alle API Spring Boot tramite HttpClient."
    )
    bullet(
        "Backend REST con DTO, Bean Validation, gestione centralizzata degli errori, persistenza JPA e controllo di ownership; autenticazione con JWT, refresh token e verifica email."
    )
    bullet(
        "Frontend con Signals, Reactive Forms, validazioni personalizzate e sincronizzazione dello stato dopo le risposte HTTP."
    )
    y -= 1

    segments(
        LEFT,
        y,
        [
            ("JobFlow - In sviluppo", "F2", BLUE),
            (" | Java 21, Spring Boot", "F3", MUTED),
        ],
        9.95,
    )
    y -= 11
    bullet(
        "Progetto backend in sviluppo per elaborare job asincroni e approfondire architetture backend oltre il CRUD tradizionale."
    )
    bullet(
        "Implementati dominio Job, stati e GeneratePdfWork; POST /jobs con validazione e persistenza JPA/MySQL. Worker, processor PDF ed esecuzione asincrona sono i prossimi slice."
    )

    section("FORMAZIONE IT")
    segments(
        LEFT,
        y,
        [
            ("Developer Full Stack Web - LabForWeb", "F2", BLUE),
            (" | Gen 2026 - Ago 2026 | 650 ore | completato", "F3", MUTED),
        ],
        9.95,
    )
    y -= 11
    paragraph(
        "HTML, CSS, JavaScript, TypeScript, Angular, MySQL, Java, Java EE/Jakarta EE, Spring, Spring Boot e Git. "
        "Percorso pratico su CRUD, API REST, SPA, database e sicurezza applicativa.",
        9.7,
        11.6,
    )
    segments(
        LEFT,
        y,
        [
            ("Master Java - PC Academy", "F2", BLUE),
            (" | Set 2019 - Apr 2020 | 300 ore", "F3", MUTED),
        ],
        9.95,
    )
    y -= 11
    paragraph(
        "Java 8, OOP, REST, SQL, Android, Clean Code e principi di architettura software.",
        9.7,
        11.6,
    )

    section("ESPERIENZA PROFESSIONALE")
    segments(
        LEFT,
        y,
        [
            ("Portantino - Eraclya, Policlinico Gemelli", "F2", BLUE),
            (" | Roma | Giu 2021 - in corso", "F3", MUTED),
        ],
        9.95,
    )
    y -= 11
    bullet(
        "Trasporto pazienti e supporto operativo nel rispetto di procedure, urgenze e priorità variabili; coordinamento quotidiano con personale sanitario, tecnico e amministrativo."
    )
    y -= 1

    section("ISTRUZIONE E LINGUE")
    skill_line(
        "Diploma",
        "Informatica e Telecomunicazioni - ITIS A. Einstein | 2018 | 75/100 | Telecomunicazioni",
    )
    skill_line(
        "Lingue",
        "Italiano madrelingua | Inglese: comprensione B2, produzione e interazione B1",
    )
    y -= 1
    text(
        LEFT,
        y,
        "Autorizzo il trattamento dei dati personali presenti nel CV ai sensi del Regolamento UE 2016/679 (GDPR) e della normativa italiana vigente.",
        "F1",
        6.4,
        MUTED,
    )

    if y < 34:
        raise RuntimeError(f"Il contenuto supera la pagina: y={y:.2f}")

    pdf.save()


if __name__ == "__main__":
    build_cv()
