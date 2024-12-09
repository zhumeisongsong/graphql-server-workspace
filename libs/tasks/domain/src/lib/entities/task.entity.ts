export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly categories: string[],
  ) {}
}
