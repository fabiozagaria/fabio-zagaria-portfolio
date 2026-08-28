from pathlib import Path

from reportlab.pdfbase.pdfmetrics import stringWidth

PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_PATH = PROJECT_DIR / "src" / "assets" / "documents" / "CV.pdf"

W, H = 595.276, 841.89
LEFT, RIGHT, TOP = 42, 42, 44
BLUE = (0.075, 0.266, 0.459)
INK = (0.03, 0.03, 0.03)
MUTED = (0.35, 0.35, 0.35)


def pdf_escape(text: str) -> str:
    data = text.encode("cp1252", errors="replace")
    result = []
    for value in data:
        if value in (40, 41, 92):
            result.append("\\" + chr(value))
        elif 32 <= value <= 126:
            result.append(chr(value))
        else:
            result.append(f"\\{value:03o}")
    return "".join(result)


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
    output: list[str] = []

    def fill(rgb: tuple[float, float, float]) -> None:
        output.append(f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} rg")

    def stroke(rgb: tuple[float, float, float]) -> None:
        output.append(f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} RG")

    def text(x: float, y: float, value: str, font: str = "F1", size: float = 9, rgb=INK) -> None:
        fill(rgb)
        output.append(
            f"BT /{font} {size:.2f} Tf {x:.2f} {y:.2f} Td ({pdf_escape(value)}) Tj ET"
        )

    font_names = {
        "F1": "Helvetica",
        "F2": "Helvetica-Bold",
        "F3": "Helvetica-Oblique",
        "F4": "Helvetica-BoldOblique",
    }

    def centered(y: float, value: str, font: str, size: float, rgb) -> None:
        x = (W - stringWidth(value, font_names[font], size)) / 2
        text(x, y, value, font, size, rgb)

    def line(y: float) -> None:
        stroke(BLUE)
        output.append(f"0.8 w {LEFT:.2f} {y:.2f} m {W - RIGHT:.2f} {y:.2f} l S")

    def segments(x: float, y: float, values: list[tuple[str, str, tuple]], size: float) -> None:
        current_x = x
        for value, font, rgb in values:
            text(current_x, y, value, font, size, rgb)
            current_x += stringWidth(value, font_names[font], size)

    y = H - TOP
    centered(y, "Fabio Zagaria", "F2", 18.5, BLUE)
    y -= 18
    centered(y, "Junior Backend Developer | Full Stack Developer", "F2", 10.1, BLUE)
    y -= 12
    centered(y, "Roma, Italia | +39 366 719 1008 | fabiozagaria@proton.me | Patente B", "F1", 7.9, INK)
    y -= 10
    centered(y, "Portfolio: fabio-zagaria-portfolio.vercel.app | GitHub: github.com/fabiozagaria | LinkedIn: linkedin.com/in/fabiozagaria", "F1", 7.5, INK)
    y -= 15

    def section(title: str) -> None:
        nonlocal y
        text(LEFT, y, title, "F2", 9.5, BLUE)
        line(y - 3)
        y -= 13

    def paragraph(value: str, size: float = 7.6, leading: float = 9.15) -> None:
        nonlocal y
        for current in wrap(value, "Helvetica", size, W - LEFT - RIGHT):
            text(LEFT, y, current, "F1", size, INK)
            y -= leading
        y -= 1.5

    def bullet(value: str, size: float = 7.35, leading: float = 8.8) -> None:
        nonlocal y
        lines = wrap(value, "Helvetica", size, W - LEFT - RIGHT - 10)
        for index, current in enumerate(lines):
            prefix = "- " if index == 0 else "  "
            text(LEFT, y, prefix + current, "F1", size, INK)
            y -= leading
        y -= 0.2

    section("PROFILO PROFESSIONALE")
    paragraph(
        "Junior Backend Developer backend-oriented con formazione Full Stack Web di 650 ore completata. "
        "Sviluppo API REST e applicazioni full stack con Java, Spring Boot, MySQL, JPA/Hibernate, Angular e TypeScript, "
        "con attenzione a validazione, gestione degli errori, separazione dei layer e sicurezza applicativa. "
        "Porto inoltre oltre cinque anni di esperienza lavorativa in un contesto sanitario complesso, con responsabilità operative, "
        "priorità e lavoro sotto pressione."
    )

    section("COMPETENZE TECNICHE")
    skills = [
        ("Linguaggi:", " Java, TypeScript, JavaScript, SQL"),
        ("Backend e API:", " Spring Boot, Spring MVC, API REST, DTO, Bean Validation, exception handling, Spring Security"),
        ("Persistenza:", " MySQL, JPA/Hibernate, Spring Data JPA, EntityManager, transazioni"),
        ("Frontend:", " Angular 21, Signals, Reactive Forms, HttpClient, HTML5, CSS3, Bootstrap"),
        ("Tooling:", " Git, GitHub, Maven, Postman, Vercel"),
        ("Principi:", " OOP, separazione delle responsabilità, architettura a layer, autenticazione/autorizzazione, ownership delle risorse"),
    ]
    for label, value in skills:
        segments(LEFT, y, [(label, "F2", INK), (value, "F1", INK)], 7.45)
        y -= 8.9
    y -= 2

    section("PROGETTI")
    segments(
        LEFT,
        y,
        [
            ("Expense Tracker - Gestionale Spese", "F2", BLUE),
            (" | In sviluppo | ", "F1", INK),
            ("Angular 21, TypeScript, Java 21, Spring Boot, MySQL, JPA/Hibernate", "F3", INK),
        ],
        7.8,
    )
    y -= 10
    bullet("Applicazione full stack per inserire, modificare e riepilogare spese personali; frontend Angular collegato alle API Spring Boot tramite HttpClient.")
    bullet("Frontend con Signals, Reactive Forms, validazioni custom e sincronizzazione dello stato dopo risposte HTTP; gestione della data coerente con LocalDate backend.")
    bullet("Backend REST con DTO e mapping, service/controller/repository, Bean Validation, gestione centralizzata degli errori, CORS locale e persistenza MySQL; uso pratico di EntityManager e dirty checking.")

    segments(
        LEFT,
        y,
        [
            ("Task Manager API - Security Lab", "F2", BLUE),
            (" | ", "F1", INK),
            ("Java 21, Spring Boot, Spring Security, JPA/Hibernate, MySQL", "F3", INK),
        ],
        7.8,
    )
    y -= 10
    bullet("CRUD di task associati all'utente autenticato, con controllo di ownership per impedire accessi o modifiche alle risorse di altri utenti.")
    bullet("Registrazione utenti con BCrypt e CustomUserDetailsService; autenticazione stateless con JWT access token e refresh token casuali salvati come hash. Rinnovo, rotazione, revoca e test di sicurezza sono ancora in sviluppo.")
    y -= 2

    section("FORMAZIONE IT")
    segments(
        LEFT,
        y,
        [
            ("Developer Full Stack Web - LabForWeb", "F2", BLUE),
            (" | Gennaio 2026 - Agosto 2026 | 650 ore | completato", "F3", INK),
        ],
        7.8,
    )
    y -= 10
    paragraph("HTML, CSS, JavaScript, TypeScript, Angular, MySQL, Java, Java EE/Jakarta EE, Spring, Spring Boot e Git. Percorso pratico su CRUD, API REST, frontend SPA, database e basi di sicurezza applicativa.", 7.2, 8.6)

    segments(
        LEFT,
        y,
        [
            ("Sviluppo continuo - Metodo CARAC", "F2", BLUE),
            (" | post-corso", "F3", INK),
        ],
        7.8,
    )
    y -= 10
    paragraph(
        "Comprendi, Applica, Ricostruisci, Autonomizza, Consolida: studio continuo con richiamo attivo, "
        "esercizi autonomi e progetti reali; strumenti AI usati come tutor, per code review e debugging mirato.",
        7.0,
        8.3,
    )

    segments(LEFT, y, [("Master Java - PC Academy", "F2", BLUE), (" | Settembre 2019 - Aprile 2020 | 300 ore", "F3", INK)], 7.8)
    y -= 10
    paragraph("Java 8, OOP, REST, SQL, Android, Clean Code, separazione delle responsabilità e principi di architettura software.", 7.2, 8.6)

    section("ESPERIENZA PROFESSIONALE")
    segments(LEFT, y, [("Portantino - Eraclya, Policlinico Gemelli", "F2", BLUE), (" | Roma | Giugno 2021 - in corso", "F3", INK)], 7.8)
    y -= 10
    bullet("Gestione del trasporto pazienti e del supporto operativo in un contesto sanitario complesso, rispettando procedure e priorità variabili.", 7.2, 8.6)
    bullet("Coordinamento quotidiano con personale sanitario, tecnico e amministrativo, con comunicazione chiara e affidabile.", 7.2, 8.6)
    bullet("Attività sotto vincoli di tempo e urgenze, con attenzione alle procedure, adattamento rapido e problem solving operativo.", 7.2, 8.6)
    y -= 1

    section("ISTRUZIONE E LINGUE")
    segments(LEFT, y, [("Diploma:", "F2", INK), (" Informatica e Telecomunicazioni - ITIS A. Einstein | 2018 | 75/100 | Articolazione Telecomunicazioni", "F1", INK)], 7.2)
    y -= 9
    segments(LEFT, y, [("Lingue:", "F2", INK), (" Italiano madrelingua | Inglese: comprensione B2, produzione/interazione B1", "F1", INK)], 7.2)
    y -= 11
    text(LEFT, y, "Autorizzo il trattamento dei dati personali presenti nel CV ai sensi del Regolamento UE 2016/679 (GDPR) e della normativa italiana vigente.", "F1", 5.6, MUTED)

    content = "\n".join(output) + "\n"
    objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.276 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R /F4 7 0 R >> >> /Contents 8 0 R >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-BoldOblique /Encoding /WinAnsiEncoding >>",
        f"<< /Length {len(content.encode('ascii'))} >>\nstream\n{content}endstream",
    ]

    parts = ["%PDF-1.4\n%ASCII\n"]
    offsets = [0]
    position = len(parts[0].encode("ascii"))
    for index, obj in enumerate(objects, 1):
        offsets.append(position)
        block = f"{index} 0 obj\n{obj}\nendobj\n"
        parts.append(block)
        position += len(block.encode("ascii"))

    xref_position = position
    xref = ["xref\n0 9\n", "0000000000 65535 f \n"]
    xref.extend(f"{offset:010d} 00000 n \n" for offset in offsets[1:])
    trailer = f"trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n{xref_position}\n%%EOF\n"

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text("".join(parts) + "".join(xref) + trailer, encoding="ascii", newline="\n")


if __name__ == "__main__":
    build_cv()
