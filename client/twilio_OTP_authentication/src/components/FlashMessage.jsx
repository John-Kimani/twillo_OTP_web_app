import { useContext } from "react";
import Alert from 'react-bootstrap/Alert';
import Collapse from "react-bootstrap/esm/Collapse";
import { FlashContext } from "../context/Flashprovider";

export default function FlashMessage(){
    const { flashMessage, visible, hideFlash } = useContext(FlashContext);

    return (
        <Collapse in={visible}>
            <div>
                <Alert variant={flashMessage.type || 'info'} dismissible
                onClose={hideFlash}>
                    {flashMessage.message}
                </Alert>
            </div>
        </Collapse>
    )
}