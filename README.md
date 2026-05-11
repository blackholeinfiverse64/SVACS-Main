# SVACS Unified Core  
## Secure Verification & Autonomous Control System

SVACS Unified Core is a deterministic, contract-driven, replayable execution pipeline designed for secure orchestration, telemetry monitoring, forensic replay, and mutation-resistant execution validation.

The system simulates a real-world multi-stage intelligence workflow where every execution passes through controlled validation stages before final execution approval.

---

# PROJECT OBJECTIVE 

The primary goal of this project is to create a secure and traceable execution framework capable of:

- deterministic execution
- telemetry monitoring
- replay reconstruction
- contract validation
- mutation detection
- token authorization
- append-only logging
- forensic verification

---

# SYSTEM PIPELINE

The execution pipeline follows a controlled multi-stage architecture:

```text
SIGNAL
  ↓
PERCEPTION
  ↓
INTELLIGENCE
  ↓
STATE
  ↓
RAJYA
  ↓
SARATHI
  ↓
CORE
```

---

# CORE FEATURES

## Multi-Stage Orchestration

The system processes execution through multiple isolated stages.

Each stage generates:

- telemetry events
- execution artifacts
- validation records
- replayable traces

---

## Contract Validation

Execution contracts are validated before pipeline continuation.

Validation includes:

- execution integrity
- required fields
- trace continuity
- mutation detection
- structure verification

---

## Hash Chain Verification

Each execution stores:

- previous_hash
- current_hash

This enables:

- tamper detection
- append-only verification
- forensic continuity validation

---

## Replay Reconstruction

The replay engine reconstructs full execution history including:

- execution payloads
- telemetry traces
- rejection events
- validation states
- forensic artifacts

---

## Real-Time Telemetry

Telemetry events are emitted at every stage.

Telemetry contains:

- execution ID
- trace ID
- stage name
- severity
- timestamps
- execution status

---

## Mutation Rejection

The system actively detects unauthorized execution mutation attempts.

Example:

```text
execution_id mismatch detected
```

Result:

```text
MUTATION_REJECTED
```

---

## Token Validation

Sarathi token management validates execution authorization.

Invalid token attempts trigger:

```text
TOKEN_DENIED
```

---

## Live Dashboard

The Flask dashboard provides:

- live execution monitoring
- telemetry visualization
- rejection tracking
- system metrics
- replay visibility
- execution status tracking

---

# PROJECT STRUCTURE

```text
svacs-unified-core/
│
├── contracts/
│   ├── __init__.py
│   └── execution_contract_validator.py
│
├── core/
│   ├── __init__.py
│   └── core_executor.py
│
├── dashboard/
│   ├── static/
│   │   └── dashboard.js
│   │
│   ├── templates/
│   │   └── dashboard.html
│   │
│   ├── app.py
│   └── dashboard_mapper.py
│
├── intelligence/
│   ├── __init__.py
│   └── intelligence_engine.py
│
├── orchestration/
│   ├── __init__.py
│   └── live_pipeline.py
│
├── perception/
│   ├── __init__.py
│   └── perception_engine.py
│
├── rajya/
│   ├── __init__.py
│   └── rajya_validator.py
│
├── replay/
│   ├── __init__.py
│   └── execution_replay.py
│
├── sarathi/
│   ├── __init__.py
│   └── token_manager.py
│
├── signal_events/
│   ├── __init__.py
│   └── signal_generator.py
│
├── state/
│   ├── __init__.py
│   └── state_engine.py
│
├── telemetry/
│   ├── __init__.py
│   └── telemetry_manager.py
│
├── tests/
│   ├── __init__.py
│   └── test_pipeline.py
│
├── utils/
│   ├── append_only_utils.py
│   └── trace_utils.py
│
├── storage/
│   ├── dashboard/
│   ├── denials/
│   ├── executions/
│   └── telemetry/
│
├── docs/
│   ├── REVIEW_PACKET.md
│   ├── TESTING_PACKET.md
│   └── system_flow.md
│
├── .gitignore
├── requirements.txt
├── README.md
└── main.py
```

---

# INSTALLATION

## 1. Clone Repository

```bash
git clone <repository_url>
cd svacs-unified-core
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# RUNNING THE SYSTEM

## Run Main Pipeline

```bash
python main.py
```

---

## Run Dashboard

```bash
python dashboard/app.py
```

---

# DASHBOARD ACCESS

Open browser:

```text
http://127.0.0.1:5000
```

---

# DASHBOARD APIs

| API | Description |
|---|---|
| `/api/dashboard` | Execution dashboard data |
| `/api/telemetry` | Telemetry events |
| `/api/rejections` | Rejection logs |
| `/api/metrics` | System metrics |

---

# EXECUTION FLOWS

## Successful Execution

```text
SIGNAL → PERCEPTION → INTELLIGENCE → STATE → RAJYA(APPROVED) → SARATHI(TOKEN_GENERATED) → CORE(EXECUTED)
```

---

## High Risk Rejection

```text
INTELLIGENCE(HIGH RISK)
        ↓
RAJYA(REJECTED)
```

Result:

```text
REJECTED
```

---

## Invalid Token Flow

```text
SARATHI(TOKEN_DENIED)
```

Result:

```text
TOKEN_DENIED
```

---

## Mutation Detection Flow

```text
CONTRACT(MUTATION_REJECTED)
```

Result:

```text
MUTATION_REJECTED
```

---

# STORAGE DESIGN

The system uses append-only structured storage.

## Storage Areas

| Directory | Purpose |
|---|---|
| storage/dashboard | Dashboard payloads |
| storage/telemetry | Telemetry logs |
| storage/denials | Rejection logs |
| storage/executions | Execution artifacts |

---

# TELEMETRY EVENTS

Telemetry includes:

```json
{
    "event_id": "uuid",
    "execution_id": "exec_xxxx",
    "trace_id": "trace_xxxx",
    "stage": "STATE",
    "service": "STATE",
    "status": "COMPLETED",
    "severity": "INFO",
    "timestamp": "timestamp"
}
```

---

# REJECTION EVENTS

Example rejection:

```json
{
    "execution_id": "exec_xxxx",
    "trace_id": "trace_xxxx",
    "reason": "Invalid token detected",
    "timestamp": "timestamp"
}
```

---

# FORENSIC REPLAY

Replay engine reconstructs:

- execution chain
- telemetry history
- rejection events
- stage transitions
- forensic traces

Replay verifies:

- append-only integrity
- hash continuity
- execution continuity
- trace validation

---

# SYSTEM METRICS

The dashboard tracks:

- EXECUTED
- REJECTED
- TOKEN_DENIED
- MUTATION_REJECTED

---

# TESTED SCENARIOS

| Scenario | Status |
|---|---|
| Normal execution | PASSED |
| High risk rejection | PASSED |
| Invalid token detection | PASSED |
| Mutation rejection | PASSED |
| Replay reconstruction | PASSED |
| Telemetry monitoring | PASSED |
| Hash verification | PASSED |
| Trace continuity validation | PASSED |

---

# TECHNOLOGIES USED

| Technology | Purpose |
|---|---|
| Python | Core backend |
| Flask | Dashboard server |
| HTML | Dashboard UI |
| CSS | Styling |
| JavaScript | Live updates |
| JSON | Structured storage |

---

# SECURITY FEATURES

The platform supports:

- append-only storage
- forensic replay
- mutation resistance
- trace continuity validation
- token authorization
- deterministic execution
- hash chain verification

---

# SYSTEM CHARACTERISTICS

SVACS Unified Core is:

- modular
- deterministic
- replayable
- telemetry-enabled
- contract-driven
- traceable
- append-only
- forensic-capable

---

# FINAL STATUS

```text
SYSTEM STATUS: OPERATIONAL
PIPELINE STATUS: VERIFIED
REPLAY STATUS: ACTIVE
TELEMETRY STATUS: ACTIVE
HASH CHAIN STATUS: VERIFIED
CONTRACT STATUS: VALIDATED
```

---
