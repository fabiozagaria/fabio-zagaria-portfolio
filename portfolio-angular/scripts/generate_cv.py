from pathlib import Path

import reportlab
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import stringWidth

PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_PATH = PROJECT_DIR / "src" / "assets" / "documents" / "CV.pdf"

W, H = 595.276, 841.89
LEFT, RIGHT, TOP = 44, 44, 42
BLUE = (0.0, 0.34, 0.28)
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
    font_dir = Path(reportlab.__file__).parent / "fonts"
    for name, filename in [("CVSans", "Vera.ttf"), ("CVSans-Bold", "VeraBd.ttf"),
                           ("CVSans-Italic", "VeraIt.ttf"), ("CVSans-BoldItalic", "VeraBI.ttf")]:
        pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT_PATH), pagesize=(W, H))
    pdf.setTitle("CV Fabio Zagaria - Junior Java Backend Developer")
    pdf.setAuthor("Fabio Zagaria")
    pdf.setSubject("Curriculum Vitae")
    pdf.setKeywords("Java, Spring Boot, Angular, MySQL, PostgreSQL, Spring Security, Junior Backend Developer")

    def text(x: float, y: float, value: str, font: str = "F1", size: float = 10, rgb=INK) -> None:
        pdf.setFillColorRGB(*rgb)
        pdf.setFont(font_names[font], size)
        pdf.drawString(x, y, value)

    font_names = {
        "F1": "CVSans",
        "F2": "CVSans-Bold",
        "F3": "CVSans-Italic",
        "F4": "CVSans-BoldItalic",
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
    centered(y, "Junior Java Backend Developer", "F2", 11.6, BLUE)
    y -= 14
    centered(
        y,
        "Roma | +39 366 719 1008 | zagariafabio1999@gmail.com | Patente B",
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
    contact_links = [
        ("fabio-zagaria-portfolio.vercel.app", "https://fabio-zagaria-portfolio.vercel.app/"),
        ("github.com/fabiozagaria", "https://github.com/fabiozagaria"),
        ("linkedin.com/in/fabiozagaria", "https://linkedin.com/in/fabiozagaria"),
    ]
    line = " | ".join(label for label, _ in contact_links)
    link_x = (W - stringWidth(line, "CVSans", 7.9)) / 2
    for label, url in contact_links:
        link_width = stringWidth(label, "CVSans", 7.9)
        pdf.linkURL(url, (link_x, y - 2, link_x + link_width, y + 9), relative=0)
        link_x += link_width + stringWidth(" | ", "CVSans", 7.9)
    y -= 19

    def section(title: str) -> None:
        nonlocal y
        text(LEFT, y, title, "F2", 11.7, BLUE)
        y -= 18.5

    def paragraph(value: str, size: float = 10.7, leading: float = 13.2) -> None:
        nonlocal y
        for current in wrap(value, "CVSans", size, W - LEFT - RIGHT):
            text(LEFT, y, current, "F1", size, INK)
            y -= leading
        y -= 2.0

    def bullet(value: str, size: float = 10.7, leading: float = 14.0) -> None:
        nonlocal y
        lines = wrap(value, "CVSans", size, W - LEFT - RIGHT - 12)
        for index, current in enumerate(lines):
            prefix = "- " if index == 0 else "  "
            text(LEFT + 2, y, prefix + current, "F1", size, INK)
            y -= leading
        y -= 0.7

    def skill_line(label: str, value: str) -> None:
        nonlocal y
        label_text = label + ": "
        label_width = stringWidth(label_text, font_names["F2"], 9.9)
        lines = wrap(value, font_names["F1"], 9.9, W - LEFT - RIGHT - label_width)
        segments(LEFT, y, [(label_text, "F2", INK), (lines[0], "F1", INK)], 9.9)
        y -= 12.0
        for line in lines[1:]:
            text(LEFT + label_width, y, line, "F1", 9.9, INK)
            y -= 12.0

    def project_links(items: list[tuple[str, str]]) -> None:
        nonlocal y
        x = LEFT + 2
        for label, url in items:
            text(x, y, label, "F1", 8.7, BLUE)
            width = stringWidth(label, "CVSans", 8.7)
            pdf.linkURL(url, (x, y - 2, x + width, y + 9), relative=0)
            x += width + 18
        y -= 14

    section("PROFILO PROFESSIONALE")
    paragraph(
        "Junior Java Backend Developer con formazione Full Stack Web di 650 ore. Sviluppo API REST "
        "con Java, Spring Boot e MySQL e interfacce Angular/TypeScript. Nei progetti personali applico "
        "autenticazione, autorizzazione e persistenza; approfondisco PostgreSQL da autodidatta."
    )

    section("COMPETENZE TECNICHE")
    skill_line("Backend", "Java 21, Spring Boot, Spring MVC, Spring Security, JWT, API REST, Maven")
    skill_line("Database", "MySQL, JPA/Hibernate, Spring Data JPA, SQL, transazioni")
    skill_line("Frontend", "TypeScript, JavaScript, Angular 21, Signals, Reactive Forms, HTML5, CSS3")
    skill_line("Strumenti", "Git, GitHub, Maven, Postman")
    skill_line("Studio autodidatta", "PostgreSQL come alternativa a MySQL, applicato in AccessDesk")
    y -= 2

    section("PROGETTI")
    segments(
        LEFT, y,
        [("Expense Tracker - Full stack", "F2", BLUE),
         (" | Angular, Spring Boot, MySQL", "F3", MUTED)],
        9.95,
    )
    y -= 12
    bullet(
        "Applicazione full stack per gestire spese ed entrate personali, con dashboard, ricerca, filtro mensile e paginazione. Interfaccia Angular collegata ad API Spring Boot e persistenza MySQL."
    )
    bullet(
        "Accesso ai soli movimenti del proprio utente: JWT, refresh token HttpOnly e controllo del proprietario sul backend. Registrazione e verifica email; DTO, validazione e stato Angular con Signals."
    )
    project_links([
        ("Demo", "https://gestionale-spese.vercel.app/"),
        ("Codice frontend", "https://github.com/fabiozagaria/expense-tracker-angular"),
        ("Codice backend", "https://github.com/fabiozagaria/expense-tracker-api"),
    ])

    segments(
        LEFT, y,
        [("AccessDesk - Progetto autonomo in sviluppo", "F2", BLUE),
         (" | Java 21, Spring Boot, PostgreSQL", "F3", MUTED)],
        9.95,
    )
    y -= 12
    bullet(
        "API REST per richieste di accesso software: i dipendenti gestiscono le proprie richieste e i manager le approvano o le rifiutano. Autenticazione JWT e autorizzazioni con Spring Security."
    )
    bullet(
        "Persistenza PostgreSQL con JPA/Hibernate, transazioni e locking ottimistico; DTO, validazione, paginazione e gestione centralizzata degli errori. Progetto autonomo in sviluppo."
    )
    project_links([("Codice AccessDesk", "https://github.com/fabiozagaria/accessdesk-api")])

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
        "Percorso pratico su Java, Spring Boot, API REST, Angular, TypeScript e MySQL.",
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
        "Java 8, SQL e sviluppo Android.",
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
    print(f"CV generato: {OUTPUT_PATH}; margine inferiore del testo: {y:.1f} pt")


if __name__ == "__main__":
    build_cv()
