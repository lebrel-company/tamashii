'use strict';
// libraries:
import {useContext, useState} from 'react'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
import {AuthContext} from '../../context/AuthContext'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import ClientLayout from '../../layout/Client';
import AddressEditor from '../../components/client/addressEditor'
import Orders from '../../components/client/orders'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function Profile() {
    var [component, setComponent] = useState('address')
    var authContext = useContext(AuthContext)
    var _u = authContext.authState.userInfo

    function componentSelection(componentTag) {
        let result = null
        switch (componentTag) {
            case 'orders':
                result = (
                    <div className={`container mx-auto`}>
                        <Orders/>
                    </div>
                )
                break;
            default:
                result = (
                    <div className={`container mx-auto`}>
                        <AddressEditor/>
                    </div>
                )
        }
        return result
    }

    function switchComponent(value) {
        return function soWhile(event) {
            event.preventDefault
            setComponent(value)
        }
    }

    return (
        <ClientLayout>
            <div className={`w-full h-full m-10`}>
                <div className="">
                    <div className="container mx-auto flex justify-center m-10">
                        <div className="text-4xl font-deco font-dark">
                            {
                                `Bienvenido Jair Anguiano Porras`
                            }
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-center p-4">

                            <button
                                onClick={switchComponent('address')}
                                className="button-section">
                                Direcciones
                            </button>
                            <button
                                onClick={switchComponent('orders')}
                                className="button-section">
                                Historial de pedidos
                            </button>
                        </div>

                        {
                            componentSelection(component)
                        }

                    </div>
                </div>
            </div>
        </ClientLayout>
    )

}

 