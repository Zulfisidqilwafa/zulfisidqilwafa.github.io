from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "zulfi-sidqil-wafa-cv-2026.pdf"
WEB_COPY = ROOT / "cv" / "zulfisidqilwafa.pdf"

INK = HexColor("#0B1110")
PAPER = HexColor("#F7F4EC")
MINT = HexColor("#71F7C1")
MINT_DARK = HexColor("#148763")
MUTED = HexColor("#5E6A67")
LINE = HexColor("#D8D6CE")
WHITE = HexColor("#FFFDF7")


def wrap_text(text, font_name, font_size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font="Helvetica", size=8.4, leading=12, color=MUTED):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap_text(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def section_label(c, label, x, y, width):
    c.setFillColor(MINT_DARK)
    c.setFont("Courier-Bold", 7.4)
    c.drawString(x, y, label.upper())
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x, y - 7, x + width, y - 7)
    return y - 22


def entry(c, title, subtitle, body, x, y, width):
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10.2)
    c.drawString(x, y, title)
    y -= 13
    c.setFillColor(MINT_DARK)
    c.setFont("Helvetica-Bold", 7.7)
    c.drawString(x, y, subtitle)
    y -= 13
    y = draw_wrapped(c, body, x, y, width, size=8.1, leading=11)
    return y - 10


def skill_pill(c, label, x, y, width):
    c.setFillColor(WHITE)
    c.roundRect(x, y - 14, width, 20, 8, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Courier-Bold", 7.2)
    c.drawCentredString(x + width / 2, y - 7, label.upper())


def build_cv(path):
    path.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(path), pagesize=A4)
    page_width, page_height = A4

    c.setTitle("Zulfi Sidqil Wafa - CV 2026")
    c.setAuthor("Zulfi Sidqil Wafa")
    c.setSubject("IT, PPIC, and Full-stack Development")

    c.setFillColor(PAPER)
    c.rect(0, 0, page_width, page_height, fill=1, stroke=0)

    header_height = 176
    c.setFillColor(INK)
    c.rect(0, page_height - header_height, page_width, header_height, fill=1, stroke=0)

    c.setFillColor(MINT)
    c.circle(488, page_height - 82, 78, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#27403A"))
    c.circle(488, page_height - 82, 91, fill=0, stroke=1)

    portrait = ImageReader(str(ROOT / "images" / "zulfi-1.png"))
    c.drawImage(
        portrait,
        419,
        page_height - 151,
        width=138,
        height=138,
        preserveAspectRatio=True,
        mask="auto",
    )

    left = 38
    c.setFillColor(MINT)
    c.setFont("Courier-Bold", 8)
    c.drawString(left, page_height - 42, "IT / PPIC / FULL-STACK DEVELOPMENT")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 27)
    c.drawString(left, page_height - 79, "ZULFI SIDQIL")
    c.drawString(left, page_height - 108, "WAFA")
    c.setFillColor(HexColor("#A7B5B1"))
    c.setFont("Helvetica", 8.2)
    c.drawString(left, page_height - 137, "PHP + SQL | Excel & PPIC | IT Systems | Network")

    contact_y = page_height - 159
    contact_items = [
        ("EMAIL", "zulfisidqilwafa@gmail.com"),
        ("PHONE", "+62 821 1583 4047"),
        ("WEB", "zulfisidqilwafa.github.io"),
    ]
    contact_x = left
    for label, value in contact_items:
        c.setFillColor(MINT)
        c.setFont("Courier-Bold", 6.4)
        c.drawString(contact_x, contact_y, label)
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 7.3)
        c.drawString(contact_x + 31, contact_y, value)
        contact_x += 150 if label != "PHONE" else 140

    content_top = page_height - header_height - 30
    main_x = 38
    main_width = 338
    side_x = 400
    side_width = 157

    y = section_label(c, "Profile", main_x, content_top, main_width)
    profile = (
        "IT and PPIC professional in plastic manufacturing with a computer-network foundation. "
        "I connect application development, operational data, production planning, inventory "
        "control, devices, software, and networks."
    )
    y = draw_wrapped(c, profile, main_x, y, main_width, size=8.5, leading=12, color=INK) - 13

    y = section_label(c, "Experience", main_x, y, main_width)
    y = entry(
        c,
        "Staff IT & PPIC",
        "PT POLYTA GLOBAL MANDIRI | MANUFACTURING OPERATIONS",
        "Supporting IT systems, users, production planning, inventory control, and operational data tracking in a plastic manufacturing environment.",
        main_x,
        y,
        main_width,
    )
    y = entry(
        c,
        "Technology & Systems",
        "NIBBLIUM | PRODUCT",
        "Supporting a snack business transformation through a connected digital product and more adaptive operational systems.",
        main_x,
        y,
        main_width,
    )

    y = section_label(c, "Selected Work", main_x, y, main_width)
    projects = [
        (
            "Polyta Internal Apps",
            "Internal application and database foundation using PHP, SQL, and Laragon.",
        ),
        (
            "Nibblium Digital Experience",
            "Product website, catalog, brand story, team profile, and contact flow.",
        ),
        (
            "Excel & Cloud Data Operations",
            "Operational tracking, formulas, conditional formatting, and cloud backup.",
        ),
        (
            "Kerupuk Nusantara",
            "Responsive culinary catalog built with HTML, CSS, and JavaScript.",
        ),
    ]
    for title, body in projects:
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8.9)
        c.drawString(main_x, y, title)
        y -= 11
        y = draw_wrapped(c, body, main_x, y, main_width, size=7.7, leading=10) - 6

    side_y = section_label(c, "Core Skills", side_x, content_top, side_width)
    pill_width = 74
    pills = ["PHP", "SQL", "Excel", "PPIC", "Golang", "React", "Networking", "Hardware"]
    for index, label in enumerate(pills):
        column = index % 2
        row = index // 2
        skill_pill(c, label, side_x + column * 80, side_y - row * 27, pill_width)
    side_y -= 118

    side_y = section_label(c, "Education", side_x, side_y, side_width)
    side_y = entry(
        c,
        "Information Systems",
        "BACHELOR PROGRAM | JAKARTA",
        "Requirements analysis, system design, project management, and business communication.",
        side_x,
        side_y,
        side_width,
    )
    side_y = entry(
        c,
        "Computer & Network Engineering",
        "SMKN PARUNGPONTENG",
        "Computer components, cabling, network configuration, infrastructure, and servers.",
        side_x,
        side_y,
        side_width,
    )

    side_y = section_label(c, "Links", side_x, side_y, side_width)
    links = [
        ("GITHUB", "github.com/Zulfisidqilwafa", "https://github.com/Zulfisidqilwafa"),
        ("PRODUCT", "nibblium.com", "https://nibblium.com"),
        ("PORTFOLIO", "zulfisidqilwafa.github.io", "https://zulfisidqilwafa.github.io"),
    ]
    for label, value, url in links:
        c.setFillColor(MINT_DARK)
        c.setFont("Courier-Bold", 6.5)
        c.drawString(side_x, side_y, label)
        side_y -= 10
        c.setFillColor(INK)
        c.setFont("Helvetica", 7.5)
        c.drawString(side_x, side_y, value)
        c.linkURL(url, (side_x, side_y - 2, side_x + side_width, side_y + 8), relative=0)
        side_y -= 19

    panel_x = 38
    panel_y = 67
    panel_width = page_width - 76
    panel_height = 124
    c.setFillColor(INK)
    c.roundRect(panel_x, panel_y, panel_width, panel_height, 8, fill=1, stroke=0)
    c.setFillColor(MINT)
    c.setFont("Courier-Bold", 7.4)
    c.drawString(panel_x + 16, panel_y + panel_height - 22, "VALUE I BRING")

    value_items = [
        (
            "BUILD",
            "Turn business needs into clear product flows and practical web implementations.",
        ),
        (
            "OPERATE",
            "Keep devices, software, and network infrastructure dependable day to day.",
        ),
        (
            "PLAN",
            "Connect production planning, inventory control, and operational data into actionable work.",
        ),
    ]
    value_width = 151
    for index, (label, body) in enumerate(value_items):
        value_x = panel_x + 16 + index * 164
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(value_x, panel_y + 72, label)
        draw_wrapped(
            c,
            body,
            value_x,
            panel_y + 56,
            value_width,
            size=7.5,
            leading=10,
            color=HexColor("#A7B5B1"),
        )

    c.setStrokeColor(LINE)
    c.line(38, 35, page_width - 38, 35)
    c.setFillColor(MUTED)
    c.setFont("Courier", 6.5)
    c.drawString(38, 22, "ZULFI SIDQIL WAFA / CV 2026")
    c.drawRightString(page_width - 38, 22, "INDONESIA / UTC+7")

    c.showPage()
    c.save()


if __name__ == "__main__":
    build_cv(OUTPUT)
    WEB_COPY.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
    print(WEB_COPY)
