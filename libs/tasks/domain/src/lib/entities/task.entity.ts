export class Task {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly categories: string[],
  ) {}

  /**
   * Creates a new task
   */
  static create(
    id: string,
    title: string,
    description: string | null,
    categories: string[],
  ): Task {
    return new Task(id, title, description, categories);
  }
}
