#!/usr/bin/env python3
"""Patch an eBilanz-Online mapping export without rewriting workbook structure.

Use this for small account-to-taxonomy corrections in downloaded mapping files.
It preserves the original OOXML package members and only changes shared-string
references in the mapping sheet, which avoids eBilanz rejecting the upload.
"""

from __future__ import annotations

import argparse
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

NS = {"main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def read_shared_strings(zip_file: ZipFile) -> list[str]:
    root = ET.fromstring(zip_file.read("xl/sharedStrings.xml"))
    strings: list[str] = []
    for item in root.findall("main:si", NS):
        strings.append("".join((t.text or "") for t in item.findall(".//main:t", NS)))
    return strings


def cell_text(cell: ET.Element | None, shared_strings: list[str]) -> str | None:
    if cell is None:
        return None
    value = cell.find("main:v", NS)
    if value is None or value.text is None:
        return None
    if cell.attrib.get("t") == "s":
        return shared_strings[int(value.text)]
    return value.text


def row_values(row: ET.Element, shared_strings: list[str]) -> dict[str, str | None]:
    values: dict[str, str | None] = {}
    for cell in row.findall("main:c", NS):
        ref = cell.attrib.get("r", "")
        col = "".join(ch for ch in ref if ch.isalpha())
        values[col] = cell_text(cell, shared_strings)
    return values


def find_account_row(sheet: ET.Element, shared_strings: list[str], account: str) -> ET.Element:
    matches: list[ET.Element] = []
    for row in sheet.findall(".//main:row", NS):
        values = row_values(row, shared_strings)
        if str(values.get("D") or "").strip() == account:
            matches.append(row)
    if len(matches) != 1:
        rows = [row.attrib.get("r", "?") for row in matches]
        raise SystemExit(f"Expected exactly one row for account {account}, found {rows}")
    return matches[0]


def set_shared_string_ref(row: ET.Element, column: str, shared_string_index: int) -> None:
    row_number = row.attrib["r"]
    ref = f"{column}{row_number}"
    cell = row.find(f"main:c[@r='{ref}']", NS)
    if cell is None:
        raise SystemExit(f"Cell {ref} not found")
    if cell.attrib.get("t") != "s":
        raise SystemExit(f"Cell {ref} is not a shared-string cell")
    value = cell.find("main:v", NS)
    if value is None:
        raise SystemExit(f"Cell {ref} has no value element")
    value.text = str(shared_string_index)


def shared_string_index(strings: list[str], text: str) -> int:
    matches = [index for index, value in enumerate(strings) if value == text]
    if len(matches) != 1:
        raise SystemExit(f"Expected exactly one shared string for {text!r}, found {matches}")
    return matches[0]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Move one account in an eBilanz-Online mapping export to another account's taxonomy row."
    )
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--account", required=True, help="Account number to move, e.g. 1766")
    parser.add_argument(
        "--target-account",
        required=True,
        help="Existing account whose taxonomy/name should be copied, e.g. 1776",
    )
    args = parser.parse_args()

    with ZipFile(args.input, "r") as source_zip:
        shared_strings = read_shared_strings(source_zip)
        sheet_root = ET.fromstring(source_zip.read("xl/worksheets/sheet1.xml"))

        source_row = find_account_row(sheet_root, shared_strings, str(args.account))
        target_row = find_account_row(sheet_root, shared_strings, str(args.target_account))
        target_values = row_values(target_row, shared_strings)

        target_taxonomy = target_values.get("A")
        target_name = target_values.get("B")
        if not target_taxonomy or not target_name:
            raise SystemExit("Target row has no taxonomy/name values")

        set_shared_string_ref(source_row, "A", shared_string_index(shared_strings, target_taxonomy))
        set_shared_string_ref(source_row, "B", shared_string_index(shared_strings, target_name))

        patched_sheet = ET.tostring(sheet_root, encoding="utf-8", xml_declaration=False)

        with ZipFile(args.output, "w") as output_zip:
            for info in source_zip.infolist():
                data = patched_sheet if info.filename == "xl/worksheets/sheet1.xml" else source_zip.read(info.filename)
                output_zip.writestr(info, data)

    print(f"Patched account {args.account} to match account {args.target_account}: {target_taxonomy} / {target_name}")
    print(args.output)


if __name__ == "__main__":
    main()
