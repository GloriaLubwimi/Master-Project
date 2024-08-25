import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React from 'react';

const MyModal = (props) => {

    return (
        <Modal open={props.open} onClose={props.onCloseModal} center>
            {
                props.children
            }
         </Modal>
    )
}
export default MyModal
