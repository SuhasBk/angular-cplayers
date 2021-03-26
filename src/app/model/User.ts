export class User {
    name: string;
    username: string;
    email: string;
    password: string;
    dp: string;
    favorites: any[];
    recommendations: any[];

    constructor(username: string, name: string, email: string, pwd: string, dp: string, favorites: any[], recommendations: any[]) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = pwd;
        this.favorites = favorites;
        this.recommendations = recommendations;
    }
}
