import { BaseHttpException } from "./BaseHttpException";

export class UnauthorizedUserException extends BaseHttpException {
  constructor() {
    super(401, "UNAUTHORIZED", "Usuário não está autenticado");
  }
}
