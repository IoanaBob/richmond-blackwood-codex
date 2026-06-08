# Client Project

Status: provisional.
Source: EVG project `https://app.notion.com/p/32fe413013148089b1ffce315e1eb38f`, Everguard Operational project `https://app.notion.com/p/372e4130131480e082dbe27d971a51d3`, and linked task records fetched on 2026-06-08.
Imported: 2026-06-08.
Review: Reconcile project/company relation mismatch and decide whether the operational project should be linked to the EVG Companies row or separate Everguard workspace company.

## Primary Project

| Field | Value |
| --- | --- |
| Name | EVG - Everguard Research - Client Project |
| Notion URL | `https://app.notion.com/p/32fe413013148089b1ffce315e1eb38f` |
| Project ID | PROJ-203 |
| Status | In Progress |
| Parent project | `https://app.notion.com/p/327e4130131480ceb3f9d757a8286559` |

## Data-Quality Issue

The fetched `Companies` relation on the primary project points to a Project Management company page for Richmond Blackwood (`https://app.notion.com/p/2d9e4130131480e68232ce1b2c7c313b`) rather than the Client Databases EVG company record. This mirrors the project-relation issue found for MONO.

The project body also has a placeholder callout saying the project is for task tracking and should store long-term data in the prospective-client/client company record, with a placeholder for the actual company. Update or ignore only after confirming the intended Notion structure.

## Operational Project

| Field | Value |
| --- | --- |
| Name | Everguard Operational |
| Notion URL | `https://app.notion.com/p/372e4130131480e082dbe27d971a51d3` |
| Project ID | PROJ-270 |
| Status | Not Started |
| Due date | 2026-06-01 |

The operational project has only a shell body, but links active EVG operational tasks. It appears to track Everguard operations separately from the EVG client/project shell.

## High-Signal Tasks

| Task | Status | Source | Notes |
| --- | --- | --- | --- |
| Research the Everguard Offering | To Do | `https://app.notion.com/p/34be41301314803b968af3cfa927f542` | Needs research on EVG bond offering, exemptions, reverse solicitation, and authorization/distribution limits. |
| EVG - correct bank/account name to Everguard Research Limited | Done | `https://app.notion.com/p/372e4130131481c0be23e26ec20472ba` | Completed by BOI package task trail on 2026-06-03. |
| Everguard Phillips invoice - verify payment status and asset/payable booking | To Do | `https://app.notion.com/p/36ce413013148166a211c2af21542d29` | Verify payment before booking payable/asset evidence. |
| Close out Ioana London Phillips booking evidence and access | In Progress | `https://app.notion.com/p/371e4130131481339d12deb5c98ab855` | Travel/auction visit closeout. Keep booking IDs, personal contact details, and payment evidence out of git. |
