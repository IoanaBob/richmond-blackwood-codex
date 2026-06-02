# Drive Locations

Status: provisional.
Source: Drive search, Notion company, user instruction on 2026-05-22, 2026-05-24, and 2026-05-25, and Google persona checks on 2026-05-25.
Imported: 2026-05-22.
Review: Create the canonical folder after the approved write persona has access to the parent folder.

## Canonical Client Folder

Target client Drive folder: `19. Techpacito Limited (TPL)`.
Target parent: `02. RB Client Companies` / `https://drive.google.com/drive/folders/1QsXdHqqBc5Qj5vyoDD3k0VhLsEzyU_ro`.
Group/external classification: external client, under the existing RB client-company folder sequence.
Creation status: blocked.
Blocker: user approved folder creation in current format, but the requested `accounting@richmondblackwood.com` Google persona authenticates and cannot access the target parent folder. Google Drive returned `File not found` for parent `1QsXdHqqBc5Qj5vyoDD3k0VhLsEzyU_ro` when using the saved `accounting-richmond-blackwood` persona on 2026-05-25. A full accounting-visible folder listing also did not expose the RB client companies / external parent, though it did expose some standalone accounting-owned client folders. The `ioana-eip` persona can see the parent, but using it for creation needs explicit approval because the user asked for the accounting persona.

Expected top-level subfolders after creation, matching the current template: `2025`, `Correspondance`, `Filings`, and `Secretarial`.

Use Drive for raw documents and evidence. Do not store raw signed contracts, identity documents, bank details, passwords, certificate bundles, or WhatsApp media in git.

## Pending Correspondance Upload

Mercedes-Benz order PDF from Gmail message `19dbf3b04574dbd8` should be uploaded to `Correspondance` after the canonical TPL folder is created with the approved accounting persona. The Gmail attachment was downloaded only to temporary local storage on 2026-05-25 for verification and was not committed to git.

Pending source file:

- Filename: `20260424-1137-Techpacito_Limited-VLE_300_elektrisch-Bestellung.pdf`
- Verified type: PDF 1.7.
- Size: 989,993 bytes.
- SHA-256: `810b41363d260dff70d40a445fe1bfbd2aa3eb64671836447e2936c8f0e3ef3d`.

## Navigation Roots

Use the existing RB finance/accounting Drive tree. Do not duplicate root-folder URLs into each client file unless the client folder itself is the root.

| Root | URL | Use |
| --- | --- | --- |
| External client root | `https://drive.google.com/drive/folders/1Gsuk22nHrqAytDb37i41w7dfK9O1h4oy` | Non-internal-group managed services and external client folders. |
| Group/internal root | pending | Internal group managed services; confirm before use. |
