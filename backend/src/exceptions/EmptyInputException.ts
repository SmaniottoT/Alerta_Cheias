import { BaseHttpException } from "./BaseHttpException";

export class EmptyInputException extends BaseHttpException {
  constructor() {
    super(400, "EMPTY_INPUT", "Todos os campos devem ser preenchidos.");
  }
}
