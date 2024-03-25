export interface RegisterInput {
    email:string;
    username:string;
    password:string;
    image?:string;
}

export interface LoginInput {
    email:string;
    password:string;
}