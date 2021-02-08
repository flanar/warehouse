export interface User {
    user_id: number
    user_login: string
    user_name: string
    user_surname: string
    user_email: string
}

export interface Region {
    region_id: number
    region_name: string
}

export interface Type {
    type_id: number
    type_name: string
}

export interface Subtype {
    subtype_id: number
    subtype_name: string
    type_id: number
}

export interface Costume {
    costume_id: number
    costume_number: string
    costume_tag: string
    region_id: number
    subtype_id: number
    costume_gender: boolean
    costume_availability: boolean
}