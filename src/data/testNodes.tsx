export const testNodes = {
    "nodes": [
        {
            "id": 0,
            "name": "Skiing",
            // "content": "A winter sport involving gliding on snow using skis."
        },
        {
            "id": 1,
            "name": "Types of Skiing",
            // "content": "Different styles and disciplines of skiing."
        },
        {
            "id": 2,
            "name": "Alpine Skiing",
            // "content": "Downhill skiing on groomed slopes with fixed-heel bindings."
        },
        {
            "id": 3,
            "name": "Cross-Country Skiing",
            // "content": "Skiing across flat or gently rolling terrain with free-heel bindings."
        },
        {
            "id": 4,
            "name": "Freestyle Skiing",
            // "content": "Skiing with aerial maneuvers, moguls, and terrain park features."
        },
        {
            "id": 5,
            "name": "Skiing Equipment",
            // "content": "Gear and equipment used in skiing."
        },
        {
            "id": 6,
            "name": "Skiing Techniques",
            // "content": "Fundamental skills and techniques for skiing."
        },
        {
            "id": 7,
            "name": "Ski Resorts",
            // "content": "Locations with facilities for skiing, including accommodations and amenities."
        },
        {
            "id": 8,
            "name": "Skiing Safety",
            // "content": "Safety measures and precautions for skiers."
        }
    ],
    "edges": [
        {
            "sourceId": 0,
            "targetId": 1
        },
        {
            "sourceId": 1,
            "targetId": 0
        },

        {
            "sourceId": 1,
            "targetId": 2
        },
        {
            "sourceId": 1,
            "targetId": 3
        },
        {
            "sourceId": 1,
            "targetId": 4
        },
        {
            "sourceId": 0,
            "targetId": 5
        },
        {
            "sourceId": 0,
            "targetId": 6
        },
        {
            "sourceId": 0,
            "targetId": 7
        },
        {
            "sourceId": 0,
            "targetId": 8
        }
    ]
};
