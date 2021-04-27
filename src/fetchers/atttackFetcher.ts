import { API_URL, TAKE } from "../constants";
import { Attack } from "../types/attack";

export interface AttackFetcherProps {
  data: Attack[];
  count: number;
  error?: string;
}
export const fetchAttacks = async (
  variables = { take: TAKE, skip: 0, keyword: "" }
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
