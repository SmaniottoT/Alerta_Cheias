import { BaseHttpException } from "./BaseHttpException";

export class UsernameTakenException extends BaseHttpException {
  constructor() {
    super(400, "USERNAME_TAKEN", "Username já está sendo utilizado, por favor, escolha um username diferente.");
  }
}
