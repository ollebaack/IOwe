// Greedy netting: O(n log n)
export type Balance = { user_id: string; amount: number }; // amount >0 creditor, <0 debtor
export type Transfer = { from: string; to: string; amount: number };

export function computeTransfers(balances: Balance[]): Transfer[] {
  const creditors: Balance[] = [];
  const debtors: Balance[] = [];
  for (const b of balances) {
    if (b.amount > 0.005) creditors.push({ ...b });
    else if (b.amount < -0.005) debtors.push({ ...b });
  }
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => a.amount - b.amount); // more negative first
  const out: Transfer[] = [];
  let i = 0,
    j = 0;
  while (i < creditors.length && j < debtors.length) {
    const c = creditors[i];
    const d = debtors[j];
    const amt = Math.min(c.amount, -d.amount);
    out.push({ from: d.user_id, to: c.user_id, amount: round2(amt) });
    c.amount = round2(c.amount - amt);
    d.amount = round2(d.amount + amt);
    if (c.amount <= 0.005) i++;
    if (d.amount >= -0.005) j++;
  }
  return out;
}
const round2 = (n: number) => Math.round(n * 100) / 100;
