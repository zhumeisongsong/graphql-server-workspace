// Ensure that the values of all attributes entering the domain layer are valid.
// The constructor is private to prevent direct instantiation of the class.

export class User {
  // Class attributes can be declared and initialized directly in the constructor arguments
  constructor(
    public readonly id: string,
    public readonly email: string,
    public firstName: string | null,
    public lastName: string | null,
  ) {}
}
