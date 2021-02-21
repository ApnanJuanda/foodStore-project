//from library
import * as React from "react";
import {LayoutOne, Table, Button, Text} from "upkit";
import {Link} from "react-router-dom"
import FaFileInvoiceDollar from "@meronex/icons/fa/FaFileInvoiceDollar";

//from internal folder
import TopBar from "../../components/TopBar/index";
import StatusLabel from "../../components/StatusLabel/index";
import {formatRupiah} from "../../utils/formatRupiah";
import {sumPrice} from "../../utils/index";
import {getOrders} from "../../api/order";

const columns = [
    {Header: '', id: 'Status', accessor: order =>{
        return (
            <div>
                #{order.order_number}<br />
                <StatusLabel status={order.status} />
            </div>
        )
    }},
    {Header: 'Items', accessor: order => {
        return (
            <div>
                {order.order_items.map(item => {
                    return(
                        <div key={item._id}> 
                            {item.name} {item.qty}
                        </div>
                    )
                })}
            </div>
        )
    }},
    {Header: 'Total', accessor: order => {
        return (
            <div>
                {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}

            </div>
        )
    }},
    {Header: 'Inovice', accessor: order => {
        return (
            <div>
                <Link to={`/invoice/${order._id}`}>
                    <Button color="gray" iconBefore={<FaFileInvoiceDollar />}>
                        Invoice
                    </Button>
                </Link>
            </div>
        )
    }}
]
const UserOrders = () => {
    //memerlukan beberapa state
    let [pesanan, setPesanan] = React.useState([]);
    let [count, setCount] = React.useState(0);
    let [status, setStatus] = React.useState('idle');
    let [page, setPage] = React.useState(1);
    let [limit, setLimit] = React.useState(10);

    const fetchPesanan = React.useCallback(async () => {
        setStatus('process');
        let {data} = await getOrders({limit, page});

        if(data.error) {
            setStatus('error');
            return ;
        }

        setStatus('success');
        setPesanan(data.data);
        setCount(data.count);

    }, [page, limit]);

    React.useEffect(() => {
        fetchPesanan();
    }, [fetchPesanan])

    return (
        <LayoutOne> 
            <TopBar />
            <Text as="h3">Pesanan Anda</Text>
            <br />

            <Table
            // data.data
            items={pesanan}
            totalItems={count}
            columns={columns}
            onPageChange={page => setPage(page)}
            page={page}
            isLoading={status === 'process'}
             /> 

        </LayoutOne>
    )
}

export default UserOrders
 