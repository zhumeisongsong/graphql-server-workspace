export class Task {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
  ) {}

  /**
   * Creates a new task
   */
  static create(
    id: string,
    title: string,
    description: string | null,
  ): Task {
    return new Task(id, title, description);
  }
}
