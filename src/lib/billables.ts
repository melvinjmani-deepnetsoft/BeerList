export interface ClubMember {
    id: number;
    name: string;
    linkId: number | null;
    children?: ClubMember[];
    circular?: boolean;
    shouldBilled?: boolean;
    parent?: ClubMember | null;
};

export const clubMembers: ClubMember[] = [
    { "id": 1, "name": "member A", "linkId": 3 },
    { "id": 2, "name": "member B", "linkId": 1 },
    { "id": 3, "name": "member C", "linkId": 2 },
    { "id": 4, "name": "member D", "linkId": null },
    { "id": 5, "name": "member E", "linkId": null },
    { "id": 6, "name": "member F", "linkId": 1 },
    { "id": 7, "name": "member G", "linkId": 9 },
    { "id": 8, "name": "member H", "linkId": 9 },
    { "id": 9, "name": "member I", "linkId": null },
    { "id": 10, "name": "member J", "linkId": 10 },
    { "id": 11, "name": "member K", "linkId": null }
];


export const determineBilling = (members: ClubMember[]): ClubMember[] => {
    const memberMap: Map<number, ClubMember> = new Map();

    // Create a map of members for easy access by id
    members.forEach(member => {
        member.children = [];
        member.circular = false;
        member.shouldBilled = true;
        memberMap.set(member.id, member);
    });

    // Update children arrays and circular flags
    members.forEach(member => {
        if (member.linkId !== null) {
            const parent = memberMap.get(member.linkId);
            if (parent) {
                // Check for circular references
                let currentNode: ClubMember | null = parent;
                while (currentNode !== null) {
                    if (currentNode.id === member.id) {
                        // Circular reference detected
                        member.circular = true;
                        member.shouldBilled = true;
                        break;
                    }
                    currentNode = currentNode.parent || null;
                }

                if (!member.circular) {
                    parent.children?.push(member);
                    member.shouldBilled = false;
                    member.parent = parent;
                }
            }
        }
    });

    return members;
}

