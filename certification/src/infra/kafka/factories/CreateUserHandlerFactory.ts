import { CreateUserHandler } from "../handlers/CreateUserHandler";

export function makeCreationUserHandler() {
  const createUserHandler = new CreateUserHandler();

  return createUserHandler.handle;
}
