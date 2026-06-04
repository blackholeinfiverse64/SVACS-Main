import json

observation = {
    "length": 154,
    "beam": 21,
    "displacement": 7200
}

matches = [
    {
        "candidate": "Destroyer",
        "confidence": 0.88
    },
    {
        "candidate": "Frigate",
        "confidence": 0.72
    }
]

result = {
    "observation": observation,
    "candidate_matches": matches
}

with open(
    "runtime/sensor_fusion_result.json",
    "w"
) as f:
    json.dump(result, f, indent=2)

print("SENSOR FUSION COMPLETE")
