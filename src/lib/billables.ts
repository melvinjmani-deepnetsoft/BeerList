export interface ClubMember {
    id: number;
    name: string;
    linkId: number | null;
    children?: ClubMember[];
    circular?: boolean;
    shouldBilled?: boolean;
};

export const determineBilling = (clubMembers: ClubMember[]): string[] => {
    const billedMembers: string[] = [];
    const visited: Set<number> = new Set();

    const isCircular = (startId: number, currentId: number): boolean => {
        if (visited.has(currentId)) return true;

        visited.add(currentId);
        const member = clubMembers.find(member => member.id === currentId);
        if (!member || member.linkId === null) {
            visited.delete(currentId);
            return false;
        }

        return isCircular(startId, member.linkId);
    };

    const shouldBill = (member: ClubMember): boolean => {
        if (member.linkId === null) return true;

        visited.clear();
        return !isCircular(member.id, member.linkId);
    };

    clubMembers.forEach(member => {
        if (shouldBill(member)) {
            billedMembers.push(member.name);
        }
    });

    return billedMembers;
}

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


export const determineBillingV2 = (members: ClubMember[]): ClubMember[] => {
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
                if (parent.linkId !== null) {
                    // Circular reference detected
                    parent.circular = true;
                    member.circular = true;
                }
                parent?.children?.push(member);
                member.shouldBilled = false;
            }
        }
    });

    return members;
}