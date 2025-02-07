import { AgentConfig } from "../../types";

export const agent: AgentConfig =
{
    "overlayCount": 1,
    "sounds": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    "framesize": [180, 180],
    "animations": {
        "Standing": {
            "frames": [{
                "duration": 100,
                "images": [
                    [1, 1]
                ],
                "sound": "15"
            }]
        },
        "Looking": {
            "frames": [{
                "duration": 100,
                "images": [
                    [201, 1]
                ],
                "sound": "15"
            }]
        },
        "Boombox": {
            "frames": [{
                "duration": 100,
                "images": [
                    [401, 1]
                ],
                "sound": "15"
            }]
        },
        "Thinking": {
            "frames": [{
                "duration": 100,
                "images": [
                    [601, 1]
                ],
                "sound": "15"
            }]
        },
        "Spa": {
            "frames": [{
                "duration": 100,
                "images": [
                    [801, 1]
                ],
                "sound": "15"
            }]
        },
        "Timing": {
            "frames": [{
                "duration": 100,
                "images": [
                    [1001, 1]
                ],
                "sound": "15"
            }]
        },
        "Writing": {
            "frames": [{
                "duration": 100,
                "images": [
                    [1201, 1]
                ],
                "sound": "15"
            }]
        }
    }
}
