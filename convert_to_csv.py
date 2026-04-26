"""
Convert ALL data files in data/ to proper, well-structured CSV format.
Each CSV will have columns: topic, content
Content is split into meaningful chunks (max ~500 chars) so the RAG
text splitter and CSVLoader can index every piece of knowledge properly.
"""
import os
import re
import csv

DATA_DIR = "data"
MAX_CHUNK = 500  # characters per content cell


def chunk_text(text, max_len=MAX_CHUNK):
    """Split text into chunks at sentence boundaries."""
    sentences = re.split(r'(?<=[।.!?\n])\s*', text)
    chunks, current = [], ""
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        if len(current) + len(s) + 1 > max_len and current:
            chunks.append(current.strip())
            current = s
        else:
            current = (current + " " + s).strip()
    if current.strip():
        chunks.append(current.strip())
    return chunks if chunks else [text.strip()]


def parse_structured_text(text, base_topic):
    """Parse markdown/text with ## and ### headers into (topic, content) rows."""
    rows = []
    # Split by ## headers (level 2)
    sections = re.split(r'\n##\s+', text)

    for i, section in enumerate(sections):
        section = section.strip()
        if not section:
            continue

        lines = section.split('\n', 1)
        header = lines[0].lstrip('#').strip() if lines else base_topic
        body = lines[1].strip() if len(lines) > 1 else ""

        if not body:
            body = header
            header = base_topic

        # Check for ### sub-sections
        subsections = re.split(r'\n###\s+', body)
        for sub in subsections:
            sub = sub.strip()
            if not sub:
                continue
            sub_lines = sub.split('\n', 1)
            sub_header = sub_lines[0].strip()
            sub_body = sub_lines[1].strip() if len(sub_lines) > 1 else sub_header

            # Clean markdown formatting
            clean_body = re.sub(r'\*\*([^*]+)\*\*', r'\1', sub_body)
            clean_body = re.sub(r'\*\s+', '• ', clean_body)
            clean_body = re.sub(r'-\s+', '• ', clean_body)
            clean_body = ' '.join(clean_body.split())

            topic = f"{header} - {sub_header}" if sub_header != header else header

            for chunk in chunk_text(clean_body):
                if len(chunk) > 20:
                    rows.append((topic, chunk))

    return rows


def parse_plain_text(text, base_topic):
    """Parse unstructured text by splitting into paragraphs/sections."""
    rows = []
    # Try splitting by # headers first
    sections = re.split(r'\n#\s+', text)

    if len(sections) > 1:
        for section in sections:
            section = section.strip()
            if not section:
                continue
            lines = section.split('\n', 1)
            header = lines[0].strip()
            body = lines[1].strip() if len(lines) > 1 else header

            clean = ' '.join(body.split())
            for chunk in chunk_text(clean):
                if len(chunk) > 20:
                    rows.append((header, chunk))
    else:
        # Split by double newlines (paragraphs)
        paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
        for para in paragraphs:
            clean = ' '.join(para.split())
            for chunk in chunk_text(clean):
                if len(chunk) > 20:
                    rows.append((base_topic, chunk))

    return rows


def parse_page_based_text(text, base_topic):
    """Parse text that has '--- Page X ---' markers (like farmerbook)."""
    rows = []
    pages = re.split(r'---\s*Page\s+\d+\s*---', text)

    for page in pages:
        page = page.strip()
        if not page or len(page) < 30:
            continue

        # Try to find section headers within pages
        sections = re.split(r'\n(?=\d+\.\d+\.?\s+)', page)
        if len(sections) <= 1:
            sections = re.split(r'\n(?=\d+\.\s+)', page)

        for section in sections:
            section = section.strip()
            if not section or len(section) < 20:
                continue

            # Extract header from numbered sections
            header_match = re.match(r'(\d+\.[\d.]*\s+.+?)(?:\n|$)', section)
            if header_match:
                header = header_match.group(1).strip()
                body = section[header_match.end():].strip()
            else:
                lines = section.split('\n', 1)
                header = lines[0][:80].strip()
                body = lines[1].strip() if len(lines) > 1 else section

            clean = ' '.join(body.split())
            if not clean:
                clean = ' '.join(header.split())

            for chunk in chunk_text(clean):
                if len(chunk) > 20:
                    rows.append((header[:100], chunk))

    return rows


def is_proper_csv(filepath):
    """Check if a file is actually a valid CSV with comma-separated columns."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            first_line = f.readline().strip()
            # A proper CSV header should have commas and no markdown
            if ',' in first_line and not first_line.startswith('#') and not first_line.startswith('*'):
                # Verify it has multiple rows
                reader = csv.reader(f)
                row_count = sum(1 for _ in reader)
                return row_count >= 2  # at least header + 2 data rows
        return False
    except:
        return False


def convert_file(filepath, output_path):
    """Convert any text/markdown file to proper multi-row CSV."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    base_topic = os.path.splitext(os.path.basename(filepath))[0]
    base_topic = base_topic.replace('_', ' ').title()

    # Detect format and parse accordingly
    if '--- Page' in text:
        rows = parse_page_based_text(text, base_topic)
    elif re.search(r'\n##\s+', text):
        rows = parse_structured_text(text, base_topic)
    elif re.search(r'\n#\s+', text):
        rows = parse_plain_text(text, base_topic)
    else:
        rows = parse_plain_text(text, base_topic)

    if rows:
        with open(output_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['topic', 'content'])
            for topic, content in rows:
                writer.writerow([topic, content])
        return len(rows)
    return 0


def main():
    converted = 0
    skipped = 0
    total_rows = 0

    for lang in ['english', 'hindi', 'bhojpuri']:
        lang_path = os.path.join(DATA_DIR, lang)
        if not os.path.exists(lang_path):
            continue

        print(f"\n📁 Processing {lang}/")

        for filename in sorted(os.listdir(lang_path)):
            filepath = os.path.join(lang_path, filename)
            if not os.path.isfile(filepath):
                continue

            ext = os.path.splitext(filename)[1].lower()

            # Skip non-text files
            if ext not in ['.txt', '.csv', '.md']:
                print(f"  ⏩ {filename} — skipping (not text/csv/md)")
                skipped += 1
                continue

            # Check if it's already a proper CSV with multiple good rows
            if ext == '.csv' and is_proper_csv(filepath):
                # Even proper CSVs - check if they have enough rows
                with open(filepath, 'r', encoding='utf-8') as f:
                    reader = csv.reader(f)
                    rows = list(reader)
                if len(rows) > 3:
                    print(f"  ✅ {filename} — proper CSV ({len(rows)-1} rows), keeping")
                    skipped += 1
                    continue
                # If only 1-2 data rows, it was badly converted — reconvert
                print(f"  ⚠️  {filename} — only {len(rows)-1} data rows, reconverting...")

            # Read the raw content (even from .csv files that are actually text)
            new_name = os.path.splitext(filename)[0] + '.csv'
            output_path = os.path.join(lang_path, new_name)

            count = convert_file(filepath, output_path)

            if count > 0:
                print(f"  🔄 {filename} → {new_name} ({count} rows)")
                converted += 1
                total_rows += count
                # Remove old source file if we created a new .csv
                if ext in ['.txt', '.md'] and os.path.exists(output_path):
                    os.remove(filepath)
            else:
                print(f"  ⚠️  {filename} — could not parse")

    print(f"\n{'='*50}")
    print(f"✅ Converted: {converted} files")
    print(f"📊 Total rows: {total_rows}")
    print(f"⏩ Skipped: {skipped} files (already proper CSV)")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
