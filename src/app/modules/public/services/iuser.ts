export interface IUser {
    id?: number;
    mail: string;
    password: string;
    name: string;
    birthDate: Date;
    country?: string;
    city?: string;
    role?: string;
    registered?: Date;
}
