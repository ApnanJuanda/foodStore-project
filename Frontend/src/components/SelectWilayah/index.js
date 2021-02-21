import * as React from "react";
import axios from "axios";
import { config } from "../../config";
import { oneOf, number, oneOfType, string, func, shape } from "prop-types";
import { Select } from "upkit";

const SelectWilayah = ({ tingkat, kodeInduk, onChange, value }) => {
  //definisikan state lokal
  let [data, setData] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  //dapatkan data dari web API
  React.useEffect(() => {
    setIsFetching(true);

    axios
      .get(
        `${config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`
      )
      .then(({ data }) => setData(data))
      .finally((_) => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  return (
    <Select
      options={data.map((wilayah) => ({
        label: wilayah.nama,
        value: wilayah.kode,
      }))}
      onChange={onChange}
      value={value}
      isLoading = {isFetching} //isFetching ini akan bernilai tru jika sedang mengambil data dari WEB API
      isDisabled = {isFetching || !data.length}
    />
  );

};

//set nilai default dari select
SelectWilayah.defaultProps = {
    tingkat: 'provinsi'
}

//definisi propTypes
SelectWilayah.propTypes = {
  tingkat: oneOf(["provinsi", "kabupaten", "kecamatan", "desa"]),
  kodeInduk: oneOfType([number, string]),
  onChange: func,
  value: shape({label: string, value: oneOfType([string, number])})
};

export default SelectWilayah;
