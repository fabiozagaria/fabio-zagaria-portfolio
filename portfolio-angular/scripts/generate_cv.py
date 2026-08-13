from pathlib import Path
from io import BytesIO

from PIL import Image as PillowImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_PATH = PROJECT_DIR / "src" / "assets" / "documents" / "CV.pdf"
PORTRAIT_PATH = PROJECT_DIR / "src" / "assets" / "img" / "io.png"

NAVY = colors.HexColor("#213A57")
INK = colors.HexColor("#17212B")
MUTED = colors.HexColor("#4A5968")


class CircularPortrait(Flowable):
    def __init__(self, image_path: Path, size: float):
        super().__init__()
        self.width = size
        self.height = size
        portrait = PillowImage.open(image_path).convert("RGB")
        portrait.thumbnail((480, 480), PillowImage.Resampling.LANCZOS)
        self.image_data = BytesIO()
        portrait.save(self.image_data, format="JPEG", quality=90, optimize=True)
        self.image_data.seek(0)
        self.image = ImageReader(self.image_data)

    def draw(self):
        canvas = self.canv
        canvas.saveState()
        clip = canvas.beginPath()
        clip.circle(self.width / 2, self.height / 2, self.width / 2)
        canvas.clipPath(clip, stroke=0, fill=0)
        canvas.drawImage(
            self.image,
            0,
            0,
            width=self.width,
            height=self.height,
            preserveAspectRatio=True,
            anchor="c",
            mask="auto",
        )
        canvas.restoreState()
        canvas.setStrokeColor(NAVY)
        canvas.setLineWidth(1)
        canvas.circle(self.width / 2, self.height / 2, self.width / 2, stroke=1, fill=0)


def section_heading(text: str, style: ParagraphStyle) -> Table:
    table = Table([[Paragraph(text, style)]], colWidths=[None])
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
                ("LINEBELOW", (0, 0), (-1, -1), 0.8, NAVY),
            ]
        )
    )
    return table


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"- {text}", style)


def add_page_number(canvas, document):
    canvas.saveState()
    canvas.setTitle("CV - Fabio Zagaria")
    canvas.setAuthor("Fabio Zagaria")
    canvas.setSubject("Curriculum Vitae - Junior Backend Developer")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 6.5)
    page_label = f"Fabio Zagaria | Curriculum Vitae | Pagina {document.page}"
    canvas.drawRightString(A4[0] - 14 * mm, 8 * mm, page_label)
    canvas.restoreState()


def build_cv():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    document = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=11 * mm,
        bottomMargin=12 * mm,
        title="CV - Fabio Zagaria",
        author="Fabio Zagaria",
    )

    sample = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=sample["Normal"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=23,
            textColor=NAVY,
            spaceAfter=1.5 * mm,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=sample["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=13.5,
            textColor=NAVY,
            spaceAfter=1.2 * mm,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=10.3,
            textColor=INK,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=sample["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=12,
            textColor=NAVY,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.2,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=0.7 * mm,
        ),
        "compact": ParagraphStyle(
            "Compact",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=10.2,
            textColor=INK,
            spaceAfter=0.35 * mm,
        ),
        "item_title": ParagraphStyle(
            "ItemTitle",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=10.8,
            textColor=INK,
            spaceAfter=0.5 * mm,
        ),
        "legal": ParagraphStyle(
            "Legal",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=6.2,
            leading=7.4,
            textColor=MUTED,
        ),
    }

    story = []

    header_text = [
        Paragraph("Fabio Zagaria", styles["name"]),
        Paragraph("Junior Backend Developer | Full Stack Developer", styles["role"]),
        Paragraph(
            "Roma, Italia | +39 366 719 1008 | "
            '<link href="mailto:fabiozagaria@proton.me" color="#213A57">fabiozagaria@proton.me</link> | Patente B',
            styles["contact"],
        ),
        Paragraph(
            '<link href="https://fabio-zagaria-portfolio.vercel.app/" color="#213A57">Portfolio</link> | '
            '<link href="https://github.com/fabiozagaria" color="#213A57">GitHub</link> | '
            '<link href="https://www.linkedin.com/in/fabiozagaria" color="#213A57">LinkedIn</link>',
            styles["contact"],
        ),
    ]

    header = Table(
        [[header_text, CircularPortrait(PORTRAIT_PATH, 27 * mm)]],
        colWidths=[document.width - 31 * mm, 27 * mm],
        hAlign="LEFT",
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 4 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.extend([header, Spacer(1, 2.2 * mm)])

    story.extend(
        [
            section_heading("PROFILO PROFESSIONALE", styles["section"]),
            Spacer(1, 1.2 * mm),
            Paragraph(
                "Junior Backend Developer backend-oriented con formazione Full Stack Web di 650 ore completata. "
                "Sviluppo API REST con Java, Spring Boot, Spring JDBC e MySQL, applicando architettura a layer, "
                "validazione degli input e gestione centralizzata degli errori. Conosco Angular e TypeScript per "
                "integrare frontend e backend. Cerco un ruolo junior in cui crescere su backend, API e sicurezza applicativa.",
                styles["body"],
            ),
            Spacer(1, 0.7 * mm),
            section_heading("COMPETENZE TECNICHE", styles["section"]),
            Spacer(1, 1.1 * mm),
        ]
    )

    skills_left = [
        Paragraph("<b>Linguaggi:</b> Java, TypeScript, JavaScript, SQL", styles["compact"]),
        Paragraph("<b>Frontend:</b> Angular, HTML5, CSS3, Bootstrap, Reactive Forms", styles["compact"]),
        Paragraph("<b>Tooling:</b> Git, GitHub, Maven, Vercel", styles["compact"]),
    ]
    skills_right = [
        Paragraph("<b>Backend e API:</b> Spring Boot, REST API, Spring JDBC, validazione, transazioni", styles["compact"]),
        Paragraph("<b>Database:</b> MySQL, SQL, modellazione relazionale, operazioni CRUD", styles["compact"]),
        Paragraph("<b>Principi:</b> OOP, architettura a layer, Clean Code, OWASP awareness", styles["compact"]),
    ]
    skills = Table(
        [[skills_left, skills_right]],
        colWidths=[document.width / 2 - 2 * mm, document.width / 2 + 2 * mm],
    )
    skills.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 3 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 3 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.extend([skills, Spacer(1, 1.3 * mm), section_heading("PROGETTI", styles["section"]), Spacer(1, 1 * mm)])

    projects = [
        (
            "<b>Student Management API</b> | <i>MVP completato</i> | Java 21, Spring Boot, Spring JDBC, MySQL",
            [
                "Progettata un'API REST CRUD per la gestione persistente degli studenti con endpoint versionati e risposte HTTP coerenti.",
                "Separati controller, service e repository; aggiunte validazioni, transazioni e gestione centralizzata degli errori 400, 404 e 409.",
            ],
        ),
        (
            "<b>Gestionale Spese</b> | <i>In sviluppo</i> | Angular, TypeScript, Spring Boot",
            [
                "Realizzata un'app web per inserimento, modifica e riepilogo delle spese con componenti riutilizzabili e servizi dedicati.",
                "Implementati Reactive Forms, validazioni frontend e aggiornamento dinamico dei riepiloghi; integrazione persistente e autenticazione in evoluzione.",
            ],
        ),
        (
            "<b>Portfolio personale</b> | 2026 | Angular, TypeScript, GitHub, Vercel",
            [
                "Creato e pubblicato un sito responsive con progetti selezionati, metadati per route, test automatici e CI.",
            ],
        ),
    ]
    for title, project_bullets in projects:
        block = [Paragraph(title, styles["item_title"])]
        block.extend(bullet(text, styles["compact"]) for text in project_bullets)
        block.append(Spacer(1, 0.45 * mm))
        story.append(KeepTogether(block))

    story.extend([Spacer(1, 0.3 * mm), section_heading("FORMAZIONE IT", styles["section"]), Spacer(1, 1 * mm)])
    education = [
        Paragraph(
            "<b>Developer Full Stack Web</b> | LabForWeb | 19 gennaio 2026 - 7 agosto 2026 | 650 ore",
            styles["item_title"],
        ),
        Paragraph(
            "Percorso pratico su HTML, CSS, JavaScript, TypeScript, Angular, MySQL, Java, Java EE, Spring, "
            "Spring Boot, Git/GitHub, sviluppo CRUD, frontend e backend.",
            styles["compact"],
        ),
        Spacer(1, 0.6 * mm),
        Paragraph(
            "<b>Master Java</b> | PC Academy | Settembre 2019 - Aprile 2020 | 300 ore",
            styles["item_title"],
        ),
        Paragraph(
            "Java 8, OOP, REST, SQL, Android, Clean Code e principi di architettura software.",
            styles["compact"],
        ),
    ]
    story.extend([KeepTogether(education), Spacer(1, 1.1 * mm)])

    story.extend([section_heading("ESPERIENZA PROFESSIONALE", styles["section"]), Spacer(1, 1 * mm)])
    experience = [
        Paragraph(
            "<b>Portantino</b> | Eraclya - Policlinico Gemelli | Roma | Giugno 2021 - in corso",
            styles["item_title"],
        ),
        bullet(
                "Gestisco trasporto pazienti e supporto operativo in un contesto sanitario complesso, rispettando procedure e priorità operative.",
            styles["compact"],
        ),
        bullet(
                "Collaboro con personale sanitario, tecnico e amministrativo, mantenendo precisione, comunicazione chiara e affidabilità sotto pressione.",
            styles["compact"],
        ),
    ]
    story.extend([KeepTogether(experience), Spacer(1, 1.1 * mm)])

    story.extend([section_heading("ISTRUZIONE E LINGUE", styles["section"]), Spacer(1, 1 * mm)])
    story.extend(
        [
            Paragraph(
                "<b>Istruzione:</b> Diploma tecnico - Informatica e Telecomunicazioni | ITIS A. Einstein | 2018 | 75/100 | Articolazione Telecomunicazioni",
                styles["compact"],
            ),
            Paragraph(
                "<b>Lingue:</b> Italiano madrelingua | Inglese: comprensione B2, produzione e interazione B1",
                styles["compact"],
            ),
            Spacer(1, 1.2 * mm),
            Paragraph(
                "Autorizzo il trattamento dei dati personali presenti nel CV ai sensi del Regolamento UE 2016/679 (GDPR) e della normativa italiana vigente.",
                styles["legal"],
            ),
        ]
    )

    document.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)


if __name__ == "__main__":
    build_cv()
