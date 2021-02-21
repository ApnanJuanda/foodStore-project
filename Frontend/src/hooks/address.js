import * as React from "react";
import { getAddress } from "../api/address";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const useAddressData = () => {
  let [data, setData] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState(statusList.idle);
  let [page, setPage] = React.useState(1);
  let [limit, setLimit] = React.useState(10);

  let fetchAddress = React.useCallback(async function () {
    //Ubah Status Menjadi Proses
    setStatus(statusList.process);

    //Request data Alamat pengiriman dari WEB API
    let {
      data: { data, count, error },
    } = await getAddress({ page, limit });

    //cek error dari pemanggilan data
    if (error) {
      setStatus(statusList.error);
      return;
    }

    //jika data berhasil didapat
    setStatus(statusList.success);
    setData(data);
    setCount(count);
  }, [page, limit]);

  React.useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return {
      data,
      count,
      status,
      page,
      limit,
      setPage,
      setLimit
  }
};

export { useAddressData };
