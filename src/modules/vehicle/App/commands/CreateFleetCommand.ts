class CreateFleetCommand {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

export default CreateFleetCommand;
