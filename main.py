from orchestration.live_pipeline import run_pipeline
from replay.execution_replay import replay_execution

import os

 
# =====================================================
# CLEAR OLD STORAGE LOGS
# =====================================================

LOG_FILES = [

    "storage/dashboard/dashboard_payloads.json",

    "storage/telemetry/telemetry_logs.json",

    "storage/denials/denial_logs.json"
]

for log_file in LOG_FILES:

    os.makedirs(
        os.path.dirname(log_file),
        exist_ok=True
    )

    open(log_file, "w").close()


# =====================================================
# SYSTEM METRICS
# =====================================================

metrics = {

    "EXECUTED": 0,

    "REJECTED": 0,

    "TOKEN_DENIED": 0,

    "MUTATION_REJECTED": 0
}


# =====================================================
# HELPER
# =====================================================

def replay_if_exists(execution):

    if (
        execution
        and isinstance(execution, dict)
        and execution.get("execution_id")
    ):

        replay_execution(
            execution["execution_id"]
        )


# =====================================================
# STATUS DETECTION
# =====================================================

def detect_status(execution):

    if not execution:
        return "UNKNOWN"

    # =========================================
    # MUTATION REJECTION
    # =========================================

    if execution.get(
        "mutation_attempt"
    ):

        return "MUTATION_REJECTED"

    # =========================================
    # TOKEN DENIED
    # =========================================

    sarathi_token = execution.get(
        "sarathi_token",
        {}
    )

    if sarathi_token.get(
        "token"
    ) == "fake_token":

        return "TOKEN_DENIED"

    # =========================================
    # RAJYA REJECTION
    # =========================================

    rajya_verdict = execution.get(
        "rajya_verdict",
        {}
    )

    if rajya_verdict.get(
        "status"
    ) == "REJECTED":

        return "REJECTED"

    # =========================================
    # SUCCESSFUL EXECUTION
    # =========================================

    if execution.get(
        "core_execution"
    ):

        return "EXECUTED"

    return "UNKNOWN"


# =====================================================
# UPDATE METRICS
# =====================================================

def update_metrics(execution):

    status = detect_status(
        execution
    )

    if status in metrics:

        metrics[status] += 1


# =====================================================
# APPROVED FLOW
# =====================================================

print("\n===== APPROVED FLOW =====\n")

approved_execution = run_pipeline(
    risk_level="LOW"
)

update_metrics(
    approved_execution
)

replay_if_exists(
    approved_execution
)


# =====================================================
# REJECT FLOW
# =====================================================

print("\n===== REJECT FLOW =====\n")

rejected_execution = run_pipeline(
    risk_level="HIGH"
)

update_metrics(
    rejected_execution
)

replay_if_exists(
    rejected_execution
)


# =====================================================
# INVALID TOKEN FLOW
# =====================================================

print("\n===== INVALID TOKEN FLOW =====\n")

invalid_token_execution = run_pipeline(
    risk_level="LOW",
    invalid_token=True
)

update_metrics(
    invalid_token_execution
)

replay_if_exists(
    invalid_token_execution
)


# =====================================================
# MUTATION REJECTION FLOW
# =====================================================

print("\n===== MUTATION REJECTION FLOW =====\n")

mutation_execution = run_pipeline(
    risk_level="LOW",
    mutation_test=True
)

update_metrics(
    mutation_execution
)

replay_if_exists(
    mutation_execution
)


# =====================================================
# OPTIONAL SCHEMA FAILURE TEST
# =====================================================

# Uncomment only for schema validation testing

# print("\n===== SCHEMA FAILURE FLOW =====\n")

# schema_failure_execution = run_pipeline(
#     schema_failure_test=True
# )

# update_metrics(
#     schema_failure_execution
# )

# replay_if_exists(
#     schema_failure_execution
# )


# =====================================================
# FINAL SYSTEM METRICS
# =====================================================

print("\n===== SYSTEM METRICS =====\n")

for key, value in metrics.items():

    print(f"{key}: {value}")


# =====================================================
# PIPELINE COMPLETE
# =====================================================

print("\n===== SVACS PIPELINE COMPLETE =====\n")
