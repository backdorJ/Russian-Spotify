import React, {useContext, useState} from "react";
import "./makeSubscriptionModal.css"
import {UserContext} from "../../../../index";
import subscriptionOptions from "../../../../utils/subscription/subscriptionOptions";
import {subscribe} from "../../../../http/subApi";
import MakeSubscriptionDto from "../../../../utils/dto/subscription/makeSubscriptionDto";
import loadUser from "../../../../functions/loadUser";
import {observer} from "mobx-react-lite";


const MakeSubscriptionModal = observer((props: any) => {
    const userStore = useContext(UserContext)
    const {show, onHide} = props
    const [length, setLength] = useState(1)

    let chosenStyle = {
        backgroundColor: "#5d5d5d",
        border: "2px solid #9a9a9a",
        scale: "1.005"
    }

    const handleSubscribe = () => {
        if (length > 0) {
            let makeSubscriptionDto = new MakeSubscriptionDto(length)
            subscribe(makeSubscriptionDto)
                .then(success => {
                    if (success) {
                        loadUser()
                            .then(response => {
                                if (response !== undefined)
                                    userStore.login(response)
                            })
                            .then(_ => alert(`You've successfully subscribed!`))
                        onHide()
                    } else
                        alert("Something went wrong! Please try again")
                })
        }
    }

    return (
        show &&
        <>
            <div className="overlay" onClick={() => {
                onHide()
            }}>
            </div>
            <div className="modal-content">
                <h2>Subscription</h2>
                <div className="modal-hr"></div>
                <div className="make-sub__form">
                    <div className="make-sub__form__left">
                        <h3>
                            Choose subscription length
                        </h3>
                        <ul className="make-sub__form__left__choose">
                            {
                                subscriptionOptions.map(i => (
                                    <li
                                        onClick={() => setLength(i.value)}
                                        style={i.value === length ? chosenStyle : {}}
                                    ><span>{i.span}</span>{i.hint}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="make-sub__form__right">
                        <h3>
                            Subscribe to our music service and get access to the best songs ever!
                        </h3>
                        <input
                            value="Subscribe"
                            type="submit"
                            onClick={handleSubscribe}
                            className="make-sub_-form__right__submit"/>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button
                        className="close-modal"
                        onClick={() => {
                            onHide()
                        }}>
                        Close
                    </button>
                </div>
            </div>
        </>
    )
})

export default MakeSubscriptionModal