import { TAKE } from "../constants";
import { Attack } from "../types/attack";
import { PaginationType } from "../types/PaginationType";

export interface AttackFetcherProps {
  data: Attack[];
  count: number;
  error: string | undefined;
}
export const fetchAttacks = async (
  variables: PaginationType = { take: TAKE, skip: 0, keyword: "" }
): Promise<AttackFetcherProps> => {
  const serverUrl = process.env.API_URL || "http://localhost:5000";
  const url =
    serverUrl +
    "/api/attacks?take=" +
    variables.take +
    "&skip=" +
    variables.skip +
    "&keyword=" +
    variables.keyword;
  console.log(url);
  const res = await fetch(url, { method: "POST" });
  return res.json();
};
