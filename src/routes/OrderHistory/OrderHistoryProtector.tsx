import ErrorPage from '../../error-routes/error'
import OrderHistory from './OrderHistory'
import rootStore from '../../rootStore';
import { extractParameterFromUrl } from '../../utils/sdk';
const { userStore } = rootStore

function OrderHistoryProtector() {
    return (
        (extractParameterFromUrl(window.location.href) as string) === userStore.user?._id ?
        ( <OrderHistory /> ) :
        ( <ErrorPage/> )
    )
}

export default OrderHistoryProtector