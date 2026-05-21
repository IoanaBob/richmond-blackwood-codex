# RB Calling Bot Test Plan

Status: provisional.
Source: user instruction on 2026-05-08, 2026-05-11, and 2026-05-12; n8n workflows `RB Calls`, `RB Calls Slack Replies`, `RB Calls Voice Execution`, `RB Calls Live Help`, and `RB Calls ElevenLabs Events`; ElevenLabs agent `agent_2001kq39ea0hf5yb86c4a7hj9gp1`; Notion Calls and Call Notes database schema updates; Internal Knowledge Base mirror at `https://www.notion.so/35ae4130131481b8b52ed5e1438f8585`.
Imported: 2026-05-08.
Review: run only with non-client or synthetic data until RB approves disclosure, consent, recording, retention, authority-call policy, and telephony setup.

## Preconditions

- ElevenLabs phone number is added or connected.
- n8n variable `ELEVENLABS_AGENT_PHONE_NUMBER_ID` is set.
- n8n `Make ElevenLabs Outbound Call` has a valid ElevenLabs credential selected. The current workflow uses n8n's predefined `ElevenLabs API` credential type; if using an HTTP Header Auth fallback, it must send header `xi-api-key`.
- The three new n8n workflows are active in n8n; keep all candidate Calls unapproved unless deliberately running a controlled test.
- ElevenLabs `RB Call Bot` has `request_creator_help` and `check_creator_help` attached.
- Slack app interactivity and channel permissions are confirmed for the RB calls channel. For private channels, the n8n Slack credential must include `groups:history`; otherwise `check_creator_help` cannot read thread replies even when the reply is visible in Slack.
- Test Calls, Company, Individual, Contact, and Call Notes rows use synthetic data.

## Schema Tests

1. Confirm Calls has `ElevenLabs Conversation ID`, `Twilio Call SID`, `Next Call At`, `Last Call Attempt At`, `Retry Count`, `Last Picked Up At`, `Voice Error`, `Live Help Status`, and `Context Pack`.
2. Confirm Calls `Subject` includes `Contact`, `Company`, and `Individual`.
3. Confirm Companies has `Company PoA`.
4. Confirm Individuals has `Individual PoA`.
5. Confirm Call Notes has `ElevenLabs Conversation ID`, `Twilio Call SID`, `Event Type`, `Help Request ID`, `Help Question`, `Help Answer`, and `Outcome Status`.

Expected result: all fields exist with the intended Notion property types and select/status options.

## n8n Build Tests

1. Validate `RB Calls Voice Execution` through n8n MCP.
2. Validate `RB Calls Live Help` through n8n MCP.
3. Validate `RB Calls ElevenLabs Events` through n8n MCP.
4. Confirm all three new workflows are active only for controlled testing and that no real candidate Calls are both `Reviewed` and `Approved`.
5. Confirm webhook trigger paths:
   - `/webhook/rb-calls-live-help`
   - `/webhook/rb-calls-elevenlabs-events`
6. Run pinned n8n logic tests without external calls/posts:
   - `RB Calls Live Help` start path.
   - `RB Calls Live Help` check path with `answer:` reply.
   - `RB Calls Live Help` invalid start payload.
   - `RB Calls Live Help` pending Call Note relation value remains array-shaped.
   - `RB Calls ElevenLabs Events` post-call Call Note relation value remains array-shaped.
   - `RB Calls Voice Execution` missing-relation preflight block.
   - `RB Calls Voice Execution` normalized successful ElevenLabs response without relying only on `success: true`.
   - `RB Calls Voice Execution` normalized failed ElevenLabs response into `Call Unanswered` and structured `Voice Error`.
   - `RB Calls Voice Execution` `Build Voice Payload` includes the live-help startup sentinels required by ElevenLabs tools.
   - `RB Calls Voice Execution` owner routing resolves `Reviewer` or fallback `Submitter` through the People Directory `Slack Member ID`.
   - `RB Calls Voice Execution` fetches Company-linked Filing Registrations, Tax Payments, and Tax Prepayments before `Build Voice Payload`.
   - `RB Calls Voice Execution` generates `tax_reference_summary`, `linked_context_json`, and a public-safe `context_pack` without relying on a manually enriched Call `Context Pack`.
   - `RB Calls Voice Execution` builds a filtered linked-record queue from relation properties on the Call, Company, Individual, Contact, Filing Registration, Tax Payment, and Tax Prepayment pages, limited to tax registrations, tax filings, contracts, correspondence, bank accounts, tax payments/prepayments, assets, and Call Notes.
   - `RB Calls Voice Execution` fetches each deduplicated linked record with `Get Linked Record` without relying on paired-item lookup metadata, and includes full normalized non-file JSON in `all_linked_records_json`, `linked_context_json`, and `relation_coverage_json`.
   - `RB Calls Voice Execution` sends attached Call Notes in `call_notes_summary`, `call_notes_context_json`, and `past_call_notes`, including useful summary/help/outcome/transcript-excerpt fields but not file bodies.
   - `RB Calls Voice Execution` excludes Notion file properties from linked-record `properties`; file names, file URLs, file bodies, and Notion file objects must not be sent in dynamic variables.
   - `RB Calls Voice Execution` computes `correspondence_context_json`, `latest_correspondence_json`, and `latest_correspondence_summary` from linked correspondence/background metadata before calling ElevenLabs.
   - `RB Calls Voice Execution` sends full normalized non-file JSON for Company, Individual, and Contact through `company_context_json`, `individual_context_json`, and `contact_context_json`.
   - `RB Calls Voice Execution` keeps identifiers raw in n8n output; no `spoken` field, `Say as:` line, or n8n-generated pronunciation transform should appear in dynamic variables.
   - `RB Calls Voice Execution` clears stale `ElevenLabs Conversation ID` and `Twilio Call SID` when claiming a new call attempt lock.
   - `RB Calls Voice Execution` and `RB Calls ElevenLabs Events` do not contain active Slack post nodes for routine lifecycle/status paths; only `RB Calls Live Help` posts Slack when it needs a human answer.
   - `RB Calls Live Help` check path with invalid or placeholder `slack_thread_ts` recovers the parent help thread from recent Slack channel history and reads a plain human reply.
   - `RB Calls ElevenLabs Events` no-answer watchdog maps an initiated zero-message conversation older than two minutes to `Call Unanswered`, creates a sweep Call Note, and does not post a Slack status alert.
   - `RB Calls ElevenLabs Events` no-answer watchdog maps an in-progress zero-duration/zero-message conversation older than two minutes to `Call Unanswered`, creates a sweep Call Note, and does not post a Slack status alert.
   - `RB Calls ElevenLabs Events` claim-only sweep maps a `Call Started` record with an `rb-call-lock:` `Voice Error` token and no conversation ID to `Call Unanswered` after two minutes, creates a sweep Call Note, and avoids using any old conversation ID.

Expected result: validation passes, workflow details match the map, and live dialing remains controlled by Notion call approval.

## PoA Gate Tests

1. Company subject, `Requires PoA?` checked, no `Company PoA`: call is blocked, `Voice Error` explains missing Company PoA, and no routine Slack blocked-call notice is posted.
2. Company subject, `Requires PoA?` checked, one `Company PoA` file: call passes the PoA gate.
3. Individual subject, `Requires PoA?` checked, no `Individual PoA`: call is blocked, `Voice Error` explains missing Individual PoA.
4. Individual subject, `Requires PoA?` checked, one `Individual PoA` file: call passes the PoA gate.
5. Any subject, `Requires PoA?` unchecked: no PoA file is required.

Expected result: one file is sufficient only when the file lives on the subject being represented.

## Context Pack Tests

1. Run the voice workflow with a synthetic reviewed and approved Call.
2. Inspect the generated Notion `Context Pack`.
3. Confirm dynamic variables include `company_context_json`, `individual_context_json`, `contact_context_json`, `correspondence_context_json`, `latest_correspondence_json`, `linked_context_json`, `structured_context_json`, `context_pack`, `past_call_notes`, `poa_subject`, `poa_validated`, `main_question`, `desired_outcome`, `reason_for_call`, `live_help_request_id`, `live_help_slack_thread_ts`, `live_help_note_page_id`, `live_help_expires_at`, `live_help_status`, and `live_help_answer`.
4. Confirm dynamic variables include caller/representative fields: `caller_name`, `represented_subject`, `representative_entity`, `representative_role`, `representation_authority`, and `poa_speech_rule`.
5. Confirm dynamic variables include owner/message routing fields: `message_topic`, `owner_name`, `owner_role`, `owner_mention`, and `owner_slack_member_id`.
6. Confirm the setup/review packet includes a `Relation Map` with every included Company, Individual, Contact, and Call relation, counts, fetched record names, extracted facts, and any high-volume relation intentionally summarized.
7. Confirm linked Filing Registration, Tax Payment, Tax Prepayment, and authority-reference records are dereferenced by `RB Calls Voice Execution` before the ElevenLabs payload is built.
8. Confirm blank direct tax fields and linked registration facts are both represented. Example expected behavior: direct `Company.German VAT No` can be blank while a linked Filing Registration still surfaces the relevant reference in `tax_reference_summary`.
9. Confirm `company_context_json`, `individual_context_json`, and `contact_context_json` include full normalized page JSON with page ID, URL, title, timestamps, and all simplified non-file properties.
10. Confirm linked correspondence records are represented as full normalized JSON, not only summaries. A synthetic Finanzamt correspondence dated `2026-05-09` should appear in `correspondence_context_json`, `latest_correspondence_json`, `latest_correspondence_summary`, and the public-safe `context_pack`.
11. Confirm `relation_coverage_json` reports linked-record counts by source page label and relation-property name, including correspondence/back-office relations.
12. Confirm Notion file properties are not included as file objects, file names, file URLs, or file bodies in any dynamic variable; only file-property counts may appear.
11. Confirm linked-record metadata does not include file properties. File names, file URLs, raw file content, and Notion file objects must be absent; a file-property count is acceptable only as coverage metadata.
12. Confirm Konvi-style references are raw in n8n output: `3989866OH` and `DE345068258` should appear exactly as stored. Confirm `tax_reference_summary`, `linked_context_json`, `related_context_json`, and `context_pack` contain no `spoken` field, no `Say as:` line, and no n8n-generated pronunciation transform.
13. Confirm the Call `Context Pack` sent to ElevenLabs is public-safe. It must not include raw Notion/database/source labels, workflow/tool names, Slack/n8n/ElevenLabs internals, `Relation Map`, `linked record`, `linked filing registration`, `direct field`, or phrases such as `our records`.
14. Confirm the private setup review packet and n8n private debug context retain enough source-backed detail for review, but the voice-facing `Context Pack` uses external/plain-language wording only.
15. Confirm no raw credential, phone-number secret, webhook secret, full transcript, raw file content, or file URL is written to git or sent to ElevenLabs.

Expected result: the agent gets a public-safe voice brief with call-critical raw identifiers, latest correspondence metadata, and safe uncertainty language, while the private review packet keeps the full dereferenced relation map and raw evidence remains in Notion/Drive. Relation IDs alone are not an acceptable final context pack for authority calls, raw internal/source labels are not acceptable in the voice-facing context, and n8n must not own pronunciation formatting. Pinned n8n execution `3388` is the passing structural reference for the raw tax-context path; pinned n8n execution `3570` is the passing structural reference for linked correspondence metadata and file-property exclusion.

## Live Help Tests

1. Confirm the agent-level `dynamic_variable_placeholders` includes `call_id`, `call_public_id`, `linked_context_json`, `live_help_request_id`, `live_help_slack_thread_ts`, `live_help_note_page_id`, `live_help_expires_at`, `live_help_status`, and `live_help_answer`. ElevenLabs conversation startup can fail before any webhook call if a tool references a dynamic variable that is not registered at agent level.
2. Confirm the n8n outbound-call payload also sends `live_help_request_id`, `live_help_slack_thread_ts`, `live_help_note_page_id`, `live_help_expires_at`, `live_help_status`, and `live_help_answer` in `conversation_initiation_client_data.dynamic_variables`. Agent-level placeholders alone are not sufficient when tools require startup variables.
3. Confirm ElevenLabs tool `request_creator_help` exists as `tool_0701krd392jge1z9q058dvh25kn7`, points at `/webhook/rb-calls-live-help`, sends `action: start`, and assigns `live_help_request_id`, `live_help_slack_thread_ts`, `live_help_note_page_id`, `live_help_expires_at`, and `live_help_status`.
4. Confirm ElevenLabs tool `check_creator_help` exists as `tool_7901krd392jhefv9x4btx1jmxfdb`, points at `/webhook/rb-calls-live-help`, sends `action: check`, and assigns `live_help_status` and `live_help_answer`.
5. Confirm the agent prompt `tool_ids` and explicit workflow tool nodes do not reference stale/deleted tool IDs `tool_0001kqfd5skhfn3vnpww2s6fnt6r` or `tool_5801krbamtebe6zvs5qfa023x9eh`.
6. Trigger the live-help webhook in test mode with a synthetic payload.
7. Confirm Slack receives a thread with standard first-line routing: `[<call_public_id>] [live-help] Owner: <@owner_slack_member_id>`.
8. Confirm the live-help Slack thread includes `Topic:`, `Call:`, `ElevenLabs conversation:`, `Help request ID:`, the question, readable transcript excerpt, and `answer:` instructions.
9. Confirm the start response is immediate and returns `status: pending`, `help_request_id`, `slack_thread_ts`, `note_page_id`, `started_at`, `expires_at`, `check_after_seconds: 30`, and `max_wait_seconds: 300`.
10. Call the check path with those IDs before any Slack reply and confirm it returns `status: pending` without posting another Slack message.
11. Confirm the n8n Slack credential can read the target thread. If the credential is missing private-channel read scope, the check path should return controlled `status: read_error` with `slack_read_error`, not an unhandled tool failure; production credentials must not remain in this state.
12. Call the check path with `slack_thread_ts: not_started` or another placeholder while a matching recent parent help message exists; confirm the workflow recovers the thread from channel history, reports `thread_recovery_source: channel_history`, and reads the answer.
13. Confirm the Slack timestamp parser recognizes timestamps like `1778553279.917809`; the workflow must use a numeric `[0-9]` pattern rather than a de-escaped `\d` regex in SDK-generated code.
14. Confirm the pending check path waits 30 seconds in n8n, re-reads the same Slack thread after the wait, and only then returns `pending` with `check_again_in_seconds: 30`. This catches replies that arrive during the wait and makes rapid ElevenLabs retries harmless.
15. Confirm the ElevenLabs agent prompt/tool/workflow instructions require 30-second quiet-hold mode: after one initial hold phrase, the agent keeps the contact quietly on hold and must not say "still checking", "checking now", "still here", "I am checking", `None`, or tool/status values while pending.
16. Confirm raw ElevenLabs transcript-history JSON is not posted to Slack; it must be converted to speaker-labeled lines.
17. Reply in the original thread with `answer: synthetic answer`.
18. Call the check path again and confirm it returns `status: answered` with the answer immediately, without the pending Wait node.
19. Reply in the original thread without the `answer:` prefix from the call owner and confirm the plain answer is accepted.
20. Reply in the original thread without the `answer:` prefix from the call owner where the parent Slack mention is formatted as `<@USER|Name>` and confirm the workflow normalizes it to the bare owner user ID before accepting the reply.
21. Add an older valid reply and then a newer valid reply; confirm the newest valid reply wins.
22. If `RB_CALLS_LIVE_HELP_APPROVED_SLACK_USERS` is configured, confirm replies from non-approved Slack users are ignored and replies from approved users are accepted.
23. Repeat without a reply and confirm that checks remain pending for ten 30-second periods until the five-minute expiry, then return the conservative fallback.
24. Post `answer:` after expiry and confirm the late answer is ignored.
25. Send malformed start/check requests and confirm the workflow returns HTTP 400 `invalid_request` without posting Slack or writing a partial Notion note.
26. Confirm Call Notes records pending, answered, read-error, and timed-out help requests.
27. Confirm the pending Call Note's `Call` relation is passed as an array expression, not a bare string, so n8n's Notion node does not throw `relationValue.filter is not a function`.

Expected result: the agent can ask the call creator/team for help mid-call, keep the caller on hold for up to five minutes, poll the same Slack thread without duplicate Slack posts, and receive either a human answer or a conservative fallback.

## ElevenLabs Agent Tests

1. Fetch `RB Call Bot` (`agent_2001kq39ea0hf5yb86c4a7hj9gp1`) and confirm `max_duration_seconds` is at least `1200`.
2. Confirm the agent prompt mentions `check_creator_help` and the five-minute hold loop.
3. Confirm the agent prompt says to wait at least 60 seconds of real silence before asking whether the person is still there.
4. Confirm the agent prompt says n8n sends raw identifiers only and that pronunciation is prompt-controlled: preserve the exact raw value, spell letters one by one, and say numbers, registration numbers, tax references, phone numbers, and alphanumeric strings much, much slower than normal speech.
5. Confirm the prompt includes the `Slow Number Delivery - Hard Rule`: important identifiers should be introduced with "I'll say that slowly", broken into tiny chunks with clear pauses, grouped into two or three digits at most, and repeated even slower when requested. Prompt examples should include slow forms for `DE345068258`, `3989866OH`, and `IE6388047V`.
6. Confirm the first audible message is the static `Hello`, with no dynamic placeholders.
7. Confirm the first substantive response after the contact answers identifies Alexander Gulin and the represented Company/Individual before mentioning Richmond Blackwood Limited.
8. Confirm the prompt says Richmond Blackwood Limited must not be mentioned in the first substantive sentence.
9. Confirm company-subject calls use the company-secretary representative position before PoA/Vollmacht, and PoA/Vollmacht is used only when marked required or when the authority insists.
10. Confirm native ElevenLabs settings have `turn_timeout: 30`, `turn_eagerness: patient`, `tts.speed: 1.0`, and global background music disabled.
11. Confirm the global prompt custom `tool_ids` list is empty.
12. Confirm stale/deleted live-help tool IDs `tool_0001kqfd5skhfn3vnpww2s6fnt6r` and `tool_5801krbamtebe6zvs5qfa023x9eh` are absent from the prompt `tool_ids` and workflow tool nodes.
13. Confirm the agent prompt includes the Public Disclosure Boundary and forbids public mention of internal context labels, Notion, Slack, n8n, ElevenLabs, tools, workflows, relation maps, linked records, direct fields, and "our records".
14. Confirm the agent prompt includes Conversation Continuity rules so it does not end the call when the contact is still asking for an identifier, tax number, route, deadline, or clarification.
15. Confirm the agent prompt includes Pronunciation And Spelling rules for V-A-T, P-O-A, U-B-O, R-B-O, E-O-R-I, P-P-S-N, U-T-R, T-A-I-N, R-O-S, H-M-R-C, C-R-O, I-D, and R-B.
16. Confirm the workflow graph has 17 nodes, 42 edges, and `prevent_subagent_loops` enabled.
17. Confirm the workflow includes stages for call opening, authority/PoA handling, IVR/menu navigation, main authority conversation, routing/callback details, the visible `Continue via Correct Route` return bridge, context lookup tool, context lookup result handling, live-help start, live-help hold, live-help check, live-help result handling, conservative fallback, voicemail/no-human handling, outcome capture, and end call.
18. Confirm `Context Lookup Tool` / `node_rb_lookup_tool_v1` has only `lookup_call_context`, and `Context Lookup Result` / `node_rb_lookup_result_v1` has no direct tools.
19. Confirm `lookup_call_context` has `execution_mode: immediate` and interruptions disabled, so the agent can speak briefly while lookup runs and still use the result.
20. Confirm `Live Help Start` has only `request_creator_help`, and `Live Help Check` has only `check_creator_help`.
21. Confirm `Routing / Callback Details` visibly connects to `Continue via Correct Route`, then back to `Main Authority Conversation` when the discovered route lets the substantive authority conversation continue.
22. Confirm `Routing / Callback Details` -> `Outcome Capture & Confirmation` is reserved for final routing/callback/document-submission outcomes where no same-call substantive conversation remains.
23. Confirm `Call Opening & Scope`, `Main Authority Conversation`, and `Routing / Callback Details` can route to `IVR / Menu Navigation`.
24. Confirm `IVR / Menu Navigation` can route through `Continue via Correct Route`, context lookup, live help, conservative fallback, or outcome capture.
25. Confirm the built-in `play_keypad_touch_tone` and `end_call` system tools are enabled.
26. In a synthetic call, force a missing approved-category detail and confirm the agent uses `lookup_call_context` through `Context Lookup Tool` before any Slack live-help request. Interrupt the agent while lookup is pending and confirm it keeps the caller on the line and still uses the lookup result when it arrives.
27. In a synthetic call, force a missing detail outside the approved lookup categories and confirm the agent calls `request_creator_help` only once for that issue, then calls `check_creator_help` silently while n8n throttles pending responses with the 30-second Wait node.
28. In a synthetic call, ask for a tax number after the agent provides a company number and confirm the agent continues with a clarification, lookup, or live-help path instead of ending the call.
29. In a synthetic call, ask for V-A-T, U-B-O, E-O-R-I, P-O-A, and alphanumeric identifiers and confirm letters are enunciated individually and numeric/alphanumeric identifiers are delivered slowly enough to write down, with audible breaks between chunks.

Expected result: ElevenLabs has enough runtime duration and tool access to keep the contact on hold without creating duplicate Slack help requests.

## IVR Tests

1. Play a synthetic IVR menu where option 2 clearly maps to VAT/tax/registrations and confirm the agent uses `play_keypad_touch_tone` once with the correct digit.
2. Play a synthetic IVR menu where the correct option is unclear and confirm the agent listens once, chooses operator/general enquiries if available, or starts live help if needed.
3. Ask for a sensitive identifier not present in the context pack and confirm the agent does not enter one.
4. Ask for a reference number that is present in the context pack and confirm the agent uses it only after the IVR explicitly requests it.
5. Confirm the agent records menu path, keypad choices, transfer destination, and any blockage in outcome capture.
6. Confirm voicemail/automated mailbox is routed to `Voicemail / No Human`, not IVR.

Expected result: IVR navigation gets the call to a human or safe route when possible and otherwise falls back without disclosing or inventing sensitive details.

## ElevenLabs Event Tests

1. Send a synthetic post-call transcription event with `dynamic_variables.call_id`.
2. Confirm a Call Note is created with summary/transcript excerpt and event type `Post-call`.
3. Confirm the Call row receives outcome, conversation ID, call SID, and follow-up flag.
4. Send a synthetic call-initiation-failure event.
5. Confirm Call status becomes `Call Unanswered` and the note event type is `Error`.
6. Send an event without `call_id`.
7. Confirm no Slack alert is posted for the missing `call_id`; the webhook should still return a non-error acknowledgement.
8. Confirm the webhook returns a non-error acknowledgement.
9. Create or select a synthetic `Call Started` row older than two minutes with an ElevenLabs conversation ID whose conversation is `initiated`, or `in-progress` with zero duration and zero messages. Run the no-answer watchdog and confirm the Call becomes `Call Unanswered`, follow-up is required, a `No answer sweep` Call Note is created, `Voice Error` is written, and no Slack status alert is posted.
10. Temporarily remove or invalidate the ElevenLabs credential on `RB Calls ElevenLabs Events` -> `Get ElevenLabs Conversation` in a non-production clone and confirm the watchdog skips outcome mutation instead of falsely marking a call unanswered on a 401/403 response.
11. Run the watchdog against a completed IVR-only conversation that ends with the remote party saying Goodbye before a live agent is reached, and confirm it becomes `Call Unanswered` with follow-up required.
12. Run the no-answer watchdog on a started Call with a still-active conversation newer than the unanswered threshold and confirm it is skipped.

Expected result: post-call and failure events update Notion without losing unmatched callbacks.

## Slack Message Policy Tests

1. Trigger the voice preflight-block path and confirm no Slack message is posted.
2. Trigger the voice blocked path after relation fetches and confirm no Slack message is posted.
3. Trigger a normalized successful outbound-call response and confirm no Slack message is posted.
4. Trigger a normalized failed outbound-call response and confirm no Slack message is posted.
5. Trigger an ElevenLabs event without `call_id` and confirm no Slack message is posted.
6. Trigger a stale-started/no-answer sweep and confirm no Slack message is posted.
7. Trigger live-help start and confirm the thread starts with `[<call_public_id>] [live-help] Owner: ...`.
8. Confirm live-help Slack messages include `Topic:`, `Call:`, `ElevenLabs conversation:`, `Help request ID:`, the question, and readable speaker-labeled transcript context.

Expected result: Slack is quiet for routine lifecycle/status changes and posts only when the caller is waiting for a human answer.

## End-To-End Synthetic Test

1. Create a synthetic Company, Individual, Contact, and Call row.
2. Move the Call through the existing review flow: `Not started` -> `Reviewing` -> Slack approval -> `Reviewed`.
3. Run `RB Calls Voice Execution` manually or wait for the active schedule in a controlled test window.
4. Confirm ElevenLabs starts the outbound call to an internal test number.
5. During the call, ask a question that forces live help.
6. Confirm the agent calls `request_creator_help` once, then calls `check_creator_help` repeatedly while keeping the caller on hold.
7. Reply from Slack and confirm the voice agent receives the answer from the next check call.
8. End the call and confirm ElevenLabs posts the transcript event.
9. Confirm Notion Call Notes and Call outcome fields are complete.

Expected result: the full Notion -> n8n -> ElevenLabs -> Slack live help -> ElevenLabs webhook -> Notion loop works on synthetic data.

## Edge Cases

- Missing Contact relation.
- Missing Company relation.
- Missing Individual relation.
- Invalid phone number or non-E.164 phone number.
- Contact unavailable by schedule.
- `Reviewed` but `Approved` unchecked.
- Authority reaches voicemail.
- Authority reaches an IVR/menu before a human.
- IVR option is unclear.
- IVR asks for sensitive identifiers not present in context.
- IVR loops, disconnects, or transfers to voicemail.
- Authority asks for payment, legal/tax commitments, or documents outside the context pack.
- Live help answer arrives after timeout.
- Live help check arrives with a missing, stale, or placeholder `slack_thread_ts` but the original help thread exists in recent channel history.
- ElevenLabs agent references stale/deleted live-help tool IDs.
- Slack timestamp parsing fails because SDK-generated code de-escaped a `\d` regex.
- Slack reply does not start with `answer:` and comes from the owner or approved helper.
- Slack reply does not start with `answer:` and comes from a non-owner/non-approved user.
- Slack reply comes from a non-approved user when `RB_CALLS_LIVE_HELP_APPROVED_SLACK_USERS` is configured.
- Raw ElevenLabs history arrives as JSON in a live-help request.
- Direct Company/Individual tax fields are blank but linked Filing Registration pages contain the relevant tax reference.
- Linked correspondence/background records contain the latest authority date but direct Company/Call fields are blank.
- Linked record has file properties; the workflow should send metadata and counts only, not file names, file URLs, file bodies, or Notion file objects.
- Linked relation records are too numerous to fully dereference in one workflow run.
- Linked relation records include records for a different Company through second-order tax-payment relations; the workflow should omit those off-subject records from the ElevenLabs payload when an explicit Company relation exists.
- Linked relation records are numerous enough to create a large ElevenLabs dynamic-variable payload; the workflow should keep the voice-facing `context_pack` capped, cap high-volume linked categories, and still retain focused full JSON variables for Company, Individual, Contact, correspondence, and allowed same-company linked records.
- Relevant records exist only as one-way backlinks from another database and are not exposed as relation properties on the call-scope pages.
- Voice agent says internal context labels such as "our records", "linked registration", "direct field", "Notion", "Slack", "n8n", "ElevenLabs", "workflow", or "Context Pack" during a public call.
- Voice agent ends a call while the contact is still asking for an identifier or clarification.
- Voice agent pronounces V-A-T, P-O-A, U-B-O, R-B-O, E-O-R-I, U-T-R, T-A-I-N, or alphanumeric tax references as words instead of spelling them out.
- Voice agent says registration numbers, tax numbers, case references, phone numbers, or alphanumeric strings too quickly to write down, or groups too many digits without pauses.
- Two scheduler runs pick up the same `Reviewed` call near-simultaneously.
- ElevenLabs outbound-call response returns a conversation ID without `success: true`.
- ElevenLabs outbound-call response returns 4xx/5xx or malformed body.
- Duplicate ElevenLabs event delivery.
- ElevenLabs event has conversation ID but no call ID.
- `Call Started` remains locked after the phone rings but is not picked up.
- ElevenLabs conversation status is `initiated`, has no messages, and no final webhook arrives.
- ElevenLabs tool references a dynamic variable missing from either the agent placeholder registry or the n8n outbound payload.
- ElevenLabs startup fails after the outbound-call endpoint returns a conversation ID but before any tool calls; inspect first-message placeholders, tool dynamic-variable placeholders, and payload-size pressure before changing business call wording.
- n8n credential missing.
- n8n phone-number variable missing.
- Slack API outage or permission failure.
- Notion API rate limit or property mismatch.

Expected result: each edge case either blocks before the call, records a clear `Voice Error`, or defers to manual follow-up without committing RB or the client to an unsafe position.

## Activation Checklist

1. Complete all tests above with synthetic data.
2. Confirm legal/consent/disclosure/recording/retention policy.
3. Configure telephony and n8n runtime secret slots.
4. Confirm `RB Calls Live Help`, `RB Calls ElevenLabs Events`, and `RB Calls Voice Execution` are active only during controlled testing.
5. Monitor the first five test executions and inspect Notion, Slack, and ElevenLabs logs.

Rollback: deactivate the three new n8n workflows or pause all candidate Calls in Notion, detach the ElevenLabs `request_creator_help` and `check_creator_help` tools if needed, and clear the ElevenLabs post-call webhook from the agent until fixed.
