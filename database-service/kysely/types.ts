import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type Absence = {
    userId: string;
    id: Generated<string>;
    lesson: number;
    date: Timestamp;
};
export type User = {
    id: Generated<string>;
    name: string;
};
export type DB = {
    Absence: Absence;
    User: User;
};
