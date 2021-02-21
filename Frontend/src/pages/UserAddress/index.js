import * as React from "react";
import { Link } from "react-router-dom";
import { LayoutOne, Table, Text, Button } from "upkit";

import TopBar from "../../components/TopBar/index";
import { useAddressData } from "../../hooks/address";

const columns = [
  { Header: "Nama", accessor: "nama" },
  {
    Header: "Detail",
    accessor: (alamat) => {
      return (
        <div>
          {alamat.provinsi}, {alamat.kabupatem}, {alamat.kecamatan},{" "}
          {alamat.kelurahan}
          <br />
          {alamat.detail}
        </div>
      );
    },
  },
];

const UserAddress = () => {
  let { data, limit, page, status, count, setPage } = useAddressData();

  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as="h3">Alamat Pengiriman</Text>
        <br />

        <div>
          <Link to="alamat-pengiriman/tambah">
            <Button>Tambah Alamat Baru</Button>
          </Link>
          <br />
          <br />

          <Table
            items={data}
            columns={columns}
            totalItems={count}
            page={page}
            isLoading={status === "process"}
            perPage={limit}
            onPageChange={(page) => setPage(page)}
          />
        </div>
        
        {status === "success" && !data.length ? (
          <div className="text-center p-10">
            Kamu belum menambahkan alamat pengiriman. <br />
            <Link to="alamat-pengiriman/tambah">
              <Button>Tambah alamat baru</Button>
            </Link>
          </div>
        ) : null}
      </div>
    </LayoutOne>
  );
};

export default UserAddress;
