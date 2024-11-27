const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw new Error('Invalid email address');
    }
    this.value = email;
  }

  static isValid(email: string): boolean {
    return emailRegex.test(email);
  }

  static create(email: Email): Email {
    return new Email(email.value);
  }

  static fromString(value: string): Email {
    return new Email(value);
  }

  toString(): string {
    return this.value;
  }
}
