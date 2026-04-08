import { MonthlyReport } from "@/data/site";

import { formatCurrency } from "./format";

type FinancialTableProps = {
  report: MonthlyReport;
};

export function FinancialTable({ report }: FinancialTableProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600">{report.mes}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">
          Total de doações: {formatCurrency(report.totalDoacoes)}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-white">
            <tr className="border-b border-slate-100 text-slate-500">
              <th className="px-5 py-3 font-medium">Categoria</th>
              <th className="px-5 py-3 font-medium">Valor</th>
              <th className="px-5 py-3 font-medium">% do total</th>
            </tr>
          </thead>
          <tbody>
            {report.despesas.map((item) => (
              <tr key={item.categoria} className="border-b border-slate-100 last:border-b-0">
                <td className="px-5 py-3 text-slate-700">{item.categoria}</td>
                <td className="px-5 py-3 font-medium text-slate-900">{formatCurrency(item.valor)}</td>
                <td className="px-5 py-3 text-slate-700">{item.porcentagem}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
