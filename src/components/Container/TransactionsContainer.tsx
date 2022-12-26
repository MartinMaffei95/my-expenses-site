import { useEffect, useState } from "react";
import { Transaction } from "../../Interfaces/Transaction.interface";
import { getAllTransactions } from "../../services/Transaction.services";
import { mapApiToTransaction } from "../../utils/mapApiToTransaction";
import { SingleTransaction } from "../Pure/SingleTransaction";

export const TransactionContainer = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  useEffect(() => {
    getAllTransactions()
      .then((allT) => {
        if (allT?.data?.length <= 0) return;
        const trax = mapApiToTransaction(allT);
        setTransactions(trax);
      })
      .catch(console.log);
  }, []);
  return (
    <div>
      <div>
        {!transactions ? (
          <p> No hay transferencias creadas</p>
        ) : (
          transactions?.map((t) => <SingleTransaction transaction={t} />)
        )}
      </div>
    </div>
  );
};
