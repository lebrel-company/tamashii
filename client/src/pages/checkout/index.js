'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import CheckoutComponent from '../../components/checkout/checkout.comp'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(el)

//==============================================================================

function cart() {
    return (
        <ClientLayout>

            <div className="flex flex-row w-full justify-center pt-20">
                <div>
                    <CheckoutComponent/>
                </div>
            </div>

        </ClientLayout>
    )
}

export default cart
