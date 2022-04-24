export interface ModificationRequest<T> {
    add: T[],
    update: T[],
    delete: T[]
}

export type Skill = {
    id: string,
    name?: string
}

export type Language = {
    id: string,
    name: string,
    level: string
}

export type Certificate = {
    id: string,
    from: string,
    to: string,
    title: string,
    issuedBy: string,
    range?: any
}

export type Experience = {
    id: string,
    from: string,
    to: string,
    position: string,
    description: string
    company: Company,
    achievements?: string[],
    responsibilities?: string[],
    range?: any
}

export type Education = {
    id: string,
    from: string,
    to: string,
    university: string,
    degree: string,
    specialization: string,
    range?: any
}

export type SummaryDataChangeRequest = {
    newValue: string,
    oldValue: string,
    userFiled: UserField
}

export type ShareLink = {
    value: string
}

export type Contact = {
    value: string
}

export type User = {
    id: string,
    fullName: string,
    summary: string,
    currentTitle: string,
    currentLocation: string,
    email: string,
    phone: string,
    experience: Experience[]
    education: Education[],
    certificates: Certificate[]
    contacts: Contact[]
    languages: Language[]
    skills: Skill[]
}

export type UserField = "SUMMARY" | "PHOTO" | "CURRENT_TITLE" | "LOCATION" | "EMAIL" | "PHONE" | "FULL_NAME";

export type ShareLinkCommand = "GENERATE" | "DELETE";

type Company = {
    name: string,
    location?: string,
    logo?: string
}
