import { BaseHttpException } from "./BaseHttpException";

export class UsernameTakenException extends BaseHttpException {
  constructor() {
    super(400, "USERNAME_TAKEN", "Username already in use. Please, choose a diferent username.");
  }
}
