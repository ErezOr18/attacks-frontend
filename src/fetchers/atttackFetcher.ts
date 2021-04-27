import { API_URL, TAKE } from "../constants";
import { Attack } from "../types/attack";

export interface AttackFetcherProps {
  data: Attack[];
  count: number;
}
export const fetchAttacks = async (
  variables = { take: TAKE, skip: 0, keyword: "" }
): Promise<AttackFetcherProps> => {
  const res = await fetch(
    API_URL +
      "/api/attacks?take=" +
      variables.take +
      "&skip=" +
      variables.skip +
      "&keyword=" +
      variables.keyword,
    { method: "POST" }
  );
  return res.json();
};
