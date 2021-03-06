import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind } from "graphql";

@Scalar("Date", () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = "Date custom scalar type";

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: any): Date {
    return new Date(ast.value);
  }
}
