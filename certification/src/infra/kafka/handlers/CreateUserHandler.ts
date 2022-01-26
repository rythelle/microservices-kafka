type CreateUserHandlerRequest = {
  name: string;
  email: string;
};

export class CreateUserHandler {
  async handle({ name, email }: CreateUserHandlerRequest): Promise<any> {
    const user = { name, email };

    console.log(user);

    const response = {
      message: "Event processed",
    };

    return response;
  }
}
