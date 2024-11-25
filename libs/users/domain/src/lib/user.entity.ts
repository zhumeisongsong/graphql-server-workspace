export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public firstName: string | null,
    public lastName: string | null,
  ) {}
}
